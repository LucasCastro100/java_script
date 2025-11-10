import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useUserManagement, AppModule } from '@/hooks/usePermissions';
import { useToast } from '@/hooks/use-toast';
import { Settings2, Shield } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';
import { UserCard } from '@/components/settings/UserCard';
import { CreateUserDialog } from '@/components/settings/CreateUserDialog';

const modules: { id: AppModule; label: string; description: string }[] = [
  { id: 'dashboard', label: 'Dashboard', description: 'Visualizar estatísticas e métricas' },
  { id: 'leads', label: 'Leads', description: 'Gerenciar leads e pipeline de vendas' },
  { id: 'goals', label: 'Metas', description: 'Gerenciar vendedores e metas de vendas' },
  { id: 'settings', label: 'Configurações', description: 'Gerenciar usuários e permissões' },
];

const Settings = () => {
  const { user } = useAuth();
  const { users, usersLoading, updateUserModules, updateUserRole, updateUserDetails, deleteUser, createUser, isCreating } = useUserManagement();
  const { toast } = useToast();
  const [isAdmin, setIsAdmin] = useState(false);
  const [checkingRole, setCheckingRole] = useState(true);

  useEffect(() => {
    const checkAdminRole = async () => {
      if (!user) {
        setCheckingRole(false);
        return;
      }

      const { data, error } = await supabase.rpc('has_role', {
        _user_id: user.id,
        _role: 'admin',
      });

      if (!error && data === true) {
        setIsAdmin(true);
      }
      setCheckingRole(false);
    };

    checkAdminRole();
  }, [user]);

  const handleUpdateModules = (userId: string, newModules: AppModule[]) => {
    updateUserModules(
      { userId, modules: newModules },
      {
        onSuccess: () => {
          toast({
            title: 'Permissões atualizadas!',
            description: 'As permissões do usuário foram atualizadas com sucesso.',
          });
        },
        onError: (error: any) => {
          toast({
            title: 'Erro ao atualizar permissões',
            description: error.message,
            variant: 'destructive',
          });
        },
      }
    );
  };

  const handleUpdateRole = (userId: string, role: 'admin' | 'user') => {
    updateUserRole(
      { userId, role },
      {
        onSuccess: () => {
          toast({
            title: 'Tipo de usuário atualizado!',
            description: 'O tipo de usuário foi atualizado com sucesso.',
          });
        },
        onError: (error: any) => {
          toast({
            title: 'Erro ao atualizar tipo',
            description: error.message,
            variant: 'destructive',
          });
        },
      }
    );
  };

  const handleUpdateUser = (userId: string, data: { fullName: string; email: string }) => {
    updateUserDetails(
      { userId, ...data },
      {
        onSuccess: () => {
          toast({
            title: 'Usuário atualizado!',
            description: 'Os dados do usuário foram atualizados com sucesso.',
          });
        },
        onError: (error: any) => {
          toast({
            title: 'Erro ao atualizar usuário',
            description: error.message,
            variant: 'destructive',
          });
        },
      }
    );
  };

  const handleDeleteUser = (userId: string) => {
    deleteUser(userId, {
      onSuccess: () => {
        toast({
          title: 'Usuário excluído!',
          description: 'O usuário foi removido com sucesso.',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Erro ao excluir usuário',
          description: error.message,
          variant: 'destructive',
        });
      },
    });
  };

  const handleCreateUser = (data: { fullName: string; email: string; password: string; modules: AppModule[] }) => {
    createUser(data, {
      onSuccess: (result: any) => {
        const action = result?.action === 'updated' ? 'atualizado' : 'criado';
        toast({
          title: `Usuário ${action}!`,
          description: 'Operação realizada com sucesso.',
        });
      },
      onError: (error: any) => {
        toast({
          title: 'Erro ao criar usuário',
          description: error?.message || 'Falha ao criar usuário',
          variant: 'destructive',
        });
      },
    });
  };

  if (checkingRole || usersLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!isAdmin) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <Card className="max-w-md">
          <CardContent className="pt-6">
            <div className="text-center space-y-2">
              <Shield className="h-12 w-12 mx-auto text-muted-foreground" />
              <h2 className="text-xl font-semibold">Acesso Restrito</h2>
              <p className="text-muted-foreground">
                Você não tem permissão para acessar as configurações do sistema.
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (usersLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Settings2 className="h-8 w-8" />
            Configurações
          </h1>
          <p className="text-muted-foreground mt-2">
            Gerencie usuários e permissões do sistema
          </p>
        </div>

        <CreateUserDialog
          modules={modules}
          onCreateUser={handleCreateUser}
          isCreating={isCreating}
        />
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="h-5 w-5" />
            Usuários e Permissões
          </CardTitle>
          <CardDescription>
            Configure os dados e permissões de cada usuário
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {users.map((userData) => (
              <UserCard
                key={userData.id}
                user={userData}
                modules={modules}
                onUpdateModules={handleUpdateModules}
                onUpdateRole={handleUpdateRole}
                onUpdateUser={handleUpdateUser}
                onDeleteUser={handleDeleteUser}
                currentUserId={user?.id || ''}
              />
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Settings;
