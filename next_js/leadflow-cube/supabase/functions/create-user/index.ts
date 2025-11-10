import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface CreateUserRequest {
  email: string;
  password: string;
  fullName: string;
  modules: string[];
  companyId?: string;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify user is authenticated
    const authHeader = req.headers.get('Authorization');
    if (!authHeader) {
      throw new Error('Missing authorization header');
    }

    // Create Supabase client with service role key for admin operations
    const supabaseAdmin = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
      {
        auth: {
          autoRefreshToken: false,
          persistSession: false,
        },
      }
    );

    // Verify the requesting user is an admin
    const token = authHeader.replace('Bearer ', '');
    const { data: { user }, error: authError } = await supabaseAdmin.auth.getUser(token);

    if (authError || !user) {
      console.error('Auth error:', authError);
      throw new Error('Unauthorized');
    }

    // Check if user has admin role using the database function
    const { data: isAdmin, error: roleError } = await supabaseAdmin
      .rpc('has_role', { _user_id: user.id, _role: 'admin' });

    if (roleError || !isAdmin) {
      console.error('Role check failed:', roleError);
      throw new Error('Insufficient permissions - admin role required');
    }

    // Parse request body
    const { email, password, fullName, modules, companyId }: CreateUserRequest = await req.json();

    if (!email || !password || !fullName) {
      throw new Error('Missing required fields: email, password, or fullName');
    }

    if (!companyId) {
      throw new Error('Missing company_id - user must belong to a company');
    }

    console.log('Creating user:', email, 'for company:', companyId);

    // Create or fetch existing user with admin API
    let userId: string | null = null;
    let userJustCreated = false;

    const { data: authData, error: createUserError } = await supabaseAdmin.auth.admin.createUser({
      email,
      password,
      email_confirm: true,
      user_metadata: {
        full_name: fullName,
        company_id: companyId,
      },
    });

    if (createUserError) {
      console.error('Error creating user:', createUserError);
      const code = (createUserError as any)?.code || (createUserError as any)?.status;
      const message = (createUserError as any)?.message || String(createUserError);

      // If the email is already registered, fetch the existing user id via profiles
      if (code === 'email_exists' || code === 422 || /already been registered/i.test(message)) {
        console.log('User already exists, fetching by email:', email);
        const { data: existingProfile, error: findProfileError } = await supabaseAdmin
          .from('profiles')
          .select('id')
          .eq('email', email)
          .maybeSingle();

        if (findProfileError) {
          console.error('Error fetching existing profile by email:', findProfileError);
          throw new Error('User already exists but could not fetch profile');
        }

        if (!existingProfile?.id) {
          throw new Error('User already exists but profile not found');
        }

        userId = existingProfile.id;
        userJustCreated = false;
      } else {
        throw createUserError;
      }
    } else {
      if (!authData.user) {
        throw new Error('Failed to create user - no user data returned');
      }
      userId = authData.user.id;
      userJustCreated = true;
    }

    console.log('Proceeding with user ID:', userId, userJustCreated ? '(created)' : '(existing)');

    // Sync module permissions: replace current modules with provided set
    if (modules && modules.length > 0) {
      const { error: delErr } = await supabaseAdmin
        .from('user_module_permissions')
        .delete()
        .eq('user_id', userId);
      if (delErr) {
        console.error('Error clearing existing module permissions:', delErr);
        throw new Error(`Failed to clear existing modules: ${delErr.message}`);
      }

      const { error: insErr } = await supabaseAdmin
        .from('user_module_permissions')
        .insert(modules.map((module) => ({ user_id: userId, module })));
      if (insErr) {
        console.error('Error assigning modules:', insErr);
        throw new Error(`Failed to assign modules: ${insErr.message}`);
      }
      console.log('Modules synced:', modules);
    } else {
      console.log('No modules provided, skipping modules sync');
    }

    // Post-processing complete. Skipping duplicate logs and legacy module assignment.

    if (!userId) {
      throw new Error('Unable to determine user id');
    }

    return new Response(
      JSON.stringify({
        success: true,
        user: {
          id: userId,
          email,
        },
        action: userJustCreated ? 'created' : 'updated',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    );
  } catch (error: any) {
    console.error('Error in create-user function:', error);
    return new Response(
      JSON.stringify({
        error: error?.message || 'Internal server error',
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    );
  }
});
