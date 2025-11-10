import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { useCompany } from '@/contexts/CompanyContext';

export type AppModule = 'dashboard' | 'leads' | 'goals' | 'products' | 'settings';

export function usePermissions() {
  const { user } = useAuth();
  const queryClient = useQueryClient();

  const { data: permissions = [], isLoading } = useQuery({
    queryKey: ['user-permissions', user?.id],
    queryFn: async () => {
      if (!user) return [];

      const { data, error } = await supabase
        .from('user_module_permissions')
        .select('module')
        .eq('user_id', user.id);

      if (error) throw error;
      return (data || []).map(p => p.module as AppModule);
    },
    enabled: !!user,
  });

  const hasPermission = (module: AppModule) => {
    return permissions.includes(module);
  };

  return {
    permissions,
    isLoading,
    hasPermission,
  };
}

export function useUserManagement() {
  const queryClient = useQueryClient();
  const { company } = useCompany();

  const { data: users = [], isLoading: usersLoading } = useQuery({
    queryKey: ['users-with-permissions'],
    queryFn: async () => {
      const { data: profiles, error: profilesError } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false });

      if (profilesError) throw profilesError;

      const { data: roles, error: rolesError } = await supabase
        .from('user_roles')
        .select('user_id, role');

      if (rolesError) throw rolesError;

      const { data: permissions, error: permissionsError } = await supabase
        .from('user_module_permissions')
        .select('user_id, module');

      if (permissionsError) throw permissionsError;

      return profiles.map(profile => {
        const userRoles = roles
          .filter(r => r.user_id === profile.id)
          .map(r => r.role);
        const role = userRoles.includes('admin') ? 'admin' : 'user';
        return {
          ...profile,
          role,
          modules: permissions
            .filter(p => p.user_id === profile.id)
            .map(p => p.module as AppModule),
        };
      });
    },
  });

  const updateUserModules = useMutation({
    mutationFn: async ({
      userId,
      modules,
    }: {
      userId: string;
      modules: AppModule[];
    }) => {
      // Delete existing permissions
      await supabase
        .from('user_module_permissions')
        .delete()
        .eq('user_id', userId);

      // Insert new permissions
      if (modules.length > 0) {
        const { error } = await supabase
          .from('user_module_permissions')
          .insert(
            modules.map(module => ({
              user_id: userId,
              module,
            })) as any
          );

        if (error) throw error;
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-with-permissions'] });
    },
  });

  const updateUserRole = useMutation({
    mutationFn: async ({
      userId,
      role,
    }: {
      userId: string;
      role: 'admin' | 'user';
    }) => {
      // Delete existing role
      await supabase
        .from('user_roles')
        .delete()
        .eq('user_id', userId);

      // Insert new role
      const { error } = await supabase
        .from('user_roles')
        .insert({
          user_id: userId,
          role: role,
        });

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-with-permissions'] });
    },
  });

  const updateUserDetails = useMutation({
    mutationFn: async ({
      userId,
      fullName,
      email,
    }: {
      userId: string;
      fullName: string;
      email: string;
    }) => {
      const { error } = await supabase
        .from('profiles')
        .update({
          full_name: fullName,
          email: email,
        })
        .eq('id', userId);

      if (error) throw error;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-with-permissions'] });
    },
  });

  const deleteUser = useMutation({
    mutationFn: async (userId: string) => {
      // Get the current session to pass the auth token
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }

      const { data, error } = await supabase.functions.invoke('delete-user', {
        body: { userId },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error || 'Failed to delete user');

      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-with-permissions'] });
    },
  });

  const createUser = useMutation({
    mutationFn: async ({
      email,
      password,
      fullName,
      modules,
    }: {
      email: string;
      password: string;
      fullName: string;
      modules: AppModule[];
    }) => {
      if (!company?.id) {
        throw new Error('Company not found');
      }

      // Get the current session to pass the auth token
      const { data: { session } } = await supabase.auth.getSession();
      
      if (!session) {
        throw new Error('No active session');
      }

      const { data, error } = await supabase.functions.invoke('create-user', {
        body: {
          email,
          password,
          fullName,
          modules,
          companyId: company.id,
        },
        headers: {
          Authorization: `Bearer ${session.access_token}`,
        },
      });

      if (error) throw error;
      if (!data.success) throw new Error(data.error || 'Failed to create user');

      return { ...data.user, action: data.action };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users-with-permissions'] });
    },
  });

  return {
    users,
    usersLoading,
    updateUserModules: updateUserModules.mutate,
    updateUserRole: updateUserRole.mutate,
    updateUserDetails: updateUserDetails.mutate,
    deleteUser: deleteUser.mutate,
    createUser: createUser.mutate,
    isCreating: createUser.isPending,
    isUpdating: updateUserModules.isPending,
  };
}
