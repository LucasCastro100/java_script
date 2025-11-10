import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { UserPlus } from 'lucide-react';
import { AppModule } from '@/hooks/usePermissions';
import { z } from 'zod';
import { useToast } from '@/hooks/use-toast';

interface CreateUserDialogProps {
  modules: { id: AppModule; label: string; description: string }[];
  onCreateUser: (data: { fullName: string; email: string; password: string; modules: AppModule[] }) => void;
  isCreating: boolean;
}

const newUserSchema = z.object({
  fullName: z.string().trim().min(2, 'Nome deve ter ao menos 2 caracteres').max(100),
  email: z.string().trim().email('Email inválido').max(255),
  password: z.string().min(8, 'Senha deve ter ao menos 8 caracteres').max(128),
  modules: z.array(z.enum(['dashboard', 'leads', 'settings', 'goals'] as const)).default([]),
});

export function CreateUserDialog({ modules, onCreateUser, isCreating }: CreateUserDialogProps) {
  const { toast } = useToast();
  const [isOpen, setIsOpen] = useState(false);
  const [newUser, setNewUser] = useState({
    fullName: '',
    email: '',
    password: '',
    modules: [] as AppModule[],
  });

  const handleCreate = () => {
    const parsed = newUserSchema.safeParse(newUser);

    if (!parsed.success) {
      toast({
        title: 'Dados inválidos',
        description: parsed.error.issues[0]?.message,
        variant: 'destructive',
      });
      return;
    }

    onCreateUser({
      fullName: parsed.data.fullName.trim(),
      email: parsed.data.email.trim(),
      password: parsed.data.password,
      modules: parsed.data.modules,
    });

    setNewUser({ fullName: '', email: '', password: '', modules: [] });
    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button className="gap-2">
          <UserPlus className="h-4 w-4" />
          Novo Usuário
        </Button>
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Criar Novo Usuário</DialogTitle>
          <DialogDescription>
            Preencha os dados do novo usuário e selecione os módulos que ele terá acesso
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-4 pt-4">
          <div className="space-y-2">
            <Label htmlFor="fullName">Nome Completo</Label>
            <Input
              id="fullName"
              value={newUser.fullName}
              onChange={(e) => setNewUser({ ...newUser, fullName: e.target.value })}
              placeholder="João Silva"
              maxLength={100}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={newUser.email}
              onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
              placeholder="usuario@exemplo.com"
              maxLength={255}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="password">Senha</Label>
            <Input
              id="password"
              type="password"
              value={newUser.password}
              onChange={(e) => setNewUser({ ...newUser, password: e.target.value })}
              placeholder="••••••••"
              maxLength={128}
            />
            <p className="text-xs text-muted-foreground">Mínimo de 8 caracteres</p>
          </div>
          <div className="space-y-3">
            <Label>Módulos de Acesso</Label>
            {modules.map((module) => (
              <div key={module.id} className="flex items-start space-x-3 p-3 bg-muted/30 rounded-lg">
                <Checkbox
                  id={`new-${module.id}`}
                  checked={newUser.modules.includes(module.id)}
                  onCheckedChange={(checked) => {
                    setNewUser({
                      ...newUser,
                      modules: checked
                        ? [...newUser.modules, module.id]
                        : newUser.modules.filter((m) => m !== module.id),
                    });
                  }}
                />
                <div className="flex-1">
                  <label
                    htmlFor={`new-${module.id}`}
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
          </div>
          <Button onClick={handleCreate} className="w-full" disabled={isCreating}>
            {isCreating ? 'Criando...' : 'Criar Usuário'}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
