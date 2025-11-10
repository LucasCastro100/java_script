import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.75.1';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface DeleteUserRequest {
  userId: string;
}

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    console.log('Delete user request received');

    const authHeader = req.headers.get('Authorization') || '';
    const token = authHeader.replace('Bearer ', '').trim();
    if (!token) {
      throw new Error('Unauthorized');
    }

    const supabaseUrl = Deno.env.get('SUPABASE_URL') ?? '';
    const anonKey = Deno.env.get('SUPABASE_ANON_KEY') ?? '';
    const serviceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '';

    // Admin client (bypasses RLS where needed)
    const supabaseAdmin = createClient(supabaseUrl, serviceKey);

    // Get requester user from JWT using admin client
    const { data: authUser, error: getUserError } = await supabaseAdmin.auth.getUser(token);
    if (getUserError || !authUser?.user) {
      console.error('Error getting user:', getUserError);
      throw new Error('Unauthorized');
    }
    const requester = authUser.user;
    console.log('Current user:', requester.id);

    // Check admin role
    const { data: roleData, error: roleError } = await supabaseAdmin
      .from('user_roles')
      .select('role')
      .eq('user_id', requester.id)
      .maybeSingle();

    if (roleError || roleData?.role !== 'admin') {
      console.error('User is not admin:', roleError);
      throw new Error('Only admins can delete users');
    }

    // Parse body
    const { userId }: DeleteUserRequest = await req.json();
    if (!userId) throw new Error('User ID is required');
    if (userId === requester.id) throw new Error('You cannot delete your own account');

    console.log('Deleting user:', userId);

    // Clean permissions
    const { error: permissionsError } = await supabaseAdmin
      .from('user_module_permissions')
      .delete()
      .eq('user_id', userId);
    if (permissionsError) console.error('Error deleting permissions:', permissionsError);

    // Clean roles
    const { error: rolesError } = await supabaseAdmin
      .from('user_roles')
      .delete()
      .eq('user_id', userId);
    if (rolesError) console.error('Error deleting roles:', rolesError);

    // Nullify references
    const { error: leadsError } = await supabaseAdmin
      .from('leads')
      .update({ user_id: null, seller_id: null })
      .eq('user_id', userId);
    if (leadsError) console.error('Error updating leads:', leadsError);

    const { error: sellersError } = await supabaseAdmin
      .from('sellers')
      .update({ user_id: null })
      .eq('user_id', userId);
    if (sellersError) console.error('Error updating sellers:', sellersError);

    // Delete profile
    const { error: profileError } = await supabaseAdmin
      .from('profiles')
      .delete()
      .eq('id', userId);
    if (profileError) {
      console.error('Error deleting profile:', profileError);
      throw new Error('Failed to delete user profile');
    }

    // Delete auth user
    const { error: authError } = await supabaseAdmin.auth.admin.deleteUser(userId);
    if (authError) {
      console.error('Error deleting auth user:', authError);
      throw new Error('Failed to delete user from auth');
    }

    console.log('User deleted successfully');
    return new Response(JSON.stringify({ success: true }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200,
    });
  } catch (error) {
    console.error('Error in delete-user function:', error);
    return new Response(
      JSON.stringify({ success: false, error: error instanceof Error ? error.message : 'Unknown error' }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 400 }
    );
  }
});
