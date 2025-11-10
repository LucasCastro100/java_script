import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Checkbox } from '@/components/ui/checkbox';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Pencil, Trash2, Shield } from 'lucide-react';
import { AppModule } from '@/hooks/usePermissions';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

interface UserCardProps {
  user: {
    id: string;
    email: string;
    full_name: string | null;
    role: string;
    modules: AppModule[];
  };
  modules: { id: AppModule; label: string; description: string }[];
  onUpdateModules: (userId: string, modules: AppModule[]) => void;
  onUpdateRole: (userId: string, role: 'admin' | 'user') => void;
  onUpdateUser: (userId: string, data: { fullName: string; email: string }) => void;
  onDeleteUser: (userId: string) => void;
  currentUserId: string;
}

const editUserSchema = z.object({
  fullName: z.string().trim().min(2, 'Nome deve ter ao menos 2 caracteres').max(100),
  email: z.string().trim().email('Email inválido').max(255),
  role: z.enum(['admin', 'user']),
});

export function UserCard({ user, modules, onUpdateModules, onUpdateRole, onUpdateUser, onDeleteUser, currentUserId }: UserCardProps) {
  const { toast } = useToast();
  const [editingModules, setEditingModules] = useState(false);
  const [editingDetails, setEditingDetails] = useState(false);
  const [deletingUser, setDeletingUser] = useState(false);
  const [selectedModules, setSelectedModules] = useState<AppModule[]>(user.modules);
  const [editedUser, setEditedUser] = useState({
    fullName: user.full_name || '',
    email: user.email,
    role: user.role as 'admin' | 'user',
  });

  const isCurrentUser = user.id === currentUserId;

  const handleModuleToggle = (module: AppModule) => {
    setSelectedModules(prev =>
      prev.includes(module)
        ? prev.filter(m => m !== module)
        : [...prev, module]
    );
  };

  const handleSaveModules = () => {
    onUpdateModules(user.id, selectedModules);
    setEditingModules(false);
  };

  const handleSaveDetails = () => {
    const parsed = editUserSchema.safeParse(editedUser);
    
    if (!parsed.success) {
      toast({
        title: 'Dados inválidos',
        description: parsed.error.issues[0]?.message,
        variant: 'destructive',
      });
      return;
    }

    // Atualizar informações básicas
    onUpdateUser(user.id, {
      fullName: parsed.data.fullName.trim(),
      email: parsed.data.email.trim(),
    });

    // Atualizar role se mudou
    if (parsed.data.role !== user.role) {
      onUpdateRole(user.id, parsed.data.role);
    }

    setEditingDetails(false);
  };

  const handleDelete = () => {
    if (isCurrentUser) {
      toast({
        title: 'Ação não permitida',
        description: 'Você não pode excluir seu próprio usuário.',
        variant: 'destructive',
      });
      return;
    }
    onDeleteUser(user.id);
    setDeletingUser(false);
  };

  return (
    <>
      <Card className="bg-muted/30">
        <CardContent className="p-4">
          <div className="flex items-start justify-between mb-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-1">
                <h3 className="font-semibold">{user.full_name || 'Sem nome'}</h3>
                <Badge variant={user.role === 'admin' ? 'default' : 'secondary'}>
                  {user.role}
                </Badge>
                {isCurrentUser && (
                  <Badge variant="outline" className="text-xs">
                    Você
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">{user.email}</p>
            </div>
            <div className="flex gap-2">
              <Button
                size="sm"
                variant="outline"
                onClick={() => setEditingDetails(true)}
              >
                <Pencil className="h-4 w-4 mr-1" />
                Editar
              </Button>
              {!isCurrentUser && (
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setDeletingUser(true)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              )}
            </div>
          </div>

          {editingModules ? (
            <div className="space-y-3">
              {modules.map((module) => (
                <div
                  key={module.id}
                  className="flex items-start space-x-3 p-3 bg-background rounded-lg"
                >
                  <Checkbox
                    id={`${user.id}-${module.id}`}
                    checked={selectedModules.includes(module.id)}
                    onCheckedChange={() => handleModuleToggle(module.id)}
                  />
                  <div className="flex-1">
                    <label
                      htmlFor={`${user.id}-${module.id}`}
                      className="text-sm font-medium leading-none cursor-pointer"
                    >
                      {module.label}
                    </label>
                    <p className="text-sm text-muted-foreground mt-1">
                      {module.description}
                    </p>
                  </div>
                </div>
              ))}
              <div className="flex gap-2 pt-2">
                <Button size="sm" onClick={handleSaveModules}>
                  Salvar Permissões
                </Button>
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => {
                    setSelectedModules(user.modules);
                    setEditingModules(false);
                  }}
                >
                  Cancelar
                </Button>
              </div>
            </div>
          ) : (
            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium flex items-center gap-2">
                  <Shield className="h-4 w-4" />
                  Módulos de Acesso
                </Label>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => setEditingModules(true)}
                >
                  Editar Permissões
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {user.modules.length > 0 ? (
                  user.modules.map((moduleId) => {
                    const module = modules.find((m) => m.id === moduleId);
                    return (
                      <Badge key={moduleId} variant="outline">
                        {module?.label}
                      </Badge>
                    );
                  })
                ) : (
                  <p className="text-sm text-muted-foreground">
                    Nenhum módulo atribuído
                  </p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      <Dialog open={editingDetails} onOpenChange={setEditingDetails}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Usuário</DialogTitle>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="edit-fullName">Nome Completo</Label>
              <Input
                id="edit-fullName"
                value={editedUser.fullName}
                onChange={(e) => setEditedUser({ ...editedUser, fullName: e.target.value })}
                placeholder="Nome completo"
                maxLength={100}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-email">Email</Label>
              <Input
                id="edit-email"
                type="email"
                value={editedUser.email}
                onChange={(e) => setEditedUser({ ...editedUser, email: e.target.value })}
                placeholder="email@exemplo.com"
                maxLength={255}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="edit-role">Tipo de Usuário</Label>
              <Select
                value={editedUser.role}
                onValueChange={(value: 'admin' | 'user') => setEditedUser({ ...editedUser, role: value })}
                disabled={isCurrentUser}
              >
                <SelectTrigger id="edit-role">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="user">Usuário</SelectItem>
                  <SelectItem value="admin">Administrador</SelectItem>
                </SelectContent>
              </Select>
              {isCurrentUser && (
                <p className="text-xs text-muted-foreground">
                  Você não pode alterar seu próprio tipo de usuário
                </p>
              )}
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setEditingDetails(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveDetails}>
                Salvar Alterações
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      <AlertDialog open={deletingUser} onOpenChange={setDeletingUser}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmar exclusão</AlertDialogTitle>
            <AlertDialogDescription>
              Tem certeza que deseja excluir o usuário "{user.full_name || user.email}"?
              Esta ação não pode ser desfeita e removerá todos os dados associados.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
