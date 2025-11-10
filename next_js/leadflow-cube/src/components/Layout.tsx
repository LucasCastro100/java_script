import { Outlet } from 'react-router-dom';
import { SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import { Button } from '@/components/ui/button';
import { LogOut, Building2, Moon, Sun } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useCompany } from '@/contexts/CompanyContext';
import { useState } from 'react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { useTheme } from 'next-themes';

export const Layout = () => {
  const { signOut, user } = useAuth();
  const { company, updateCompanyName } = useCompany();
  const { toast } = useToast();
  const { theme, setTheme } = useTheme();
  const [isEditCompanyOpen, setIsEditCompanyOpen] = useState(false);
  const [companyName, setCompanyName] = useState("");

  const getUserInitials = () => {
    if (user?.user_metadata?.full_name) {
      const names = user.user_metadata.full_name.split(' ');
      return names.length > 1 
        ? `${names[0][0]}${names[names.length - 1][0]}`.toUpperCase()
        : names[0].slice(0, 2).toUpperCase();
    }
    return user?.email?.slice(0, 2).toUpperCase() || 'U';
  };

  const getUserDisplayName = () => {
    return user?.user_metadata?.full_name || user?.email || 'Usuário';
  };

  const handleEditCompany = () => {
    setCompanyName(company?.name || "");
    setIsEditCompanyOpen(true);
  };

  const handleSaveCompanyName = async () => {
    if (!companyName.trim()) {
      toast({ title: "Nome inválido", description: "Digite o nome da empresa", variant: "destructive" });
      return;
    }

    try {
      await updateCompanyName(companyName.trim());
      toast({ title: "Sucesso!", description: "Nome da empresa atualizado" });
      setIsEditCompanyOpen(false);
    } catch (error: any) {
      toast({ title: "Erro", description: error.message, variant: "destructive" });
    }
  };

  return (
    <SidebarProvider defaultOpen>
      <div className="min-h-screen flex w-full bg-background">
        <AppSidebar />
        <main className="flex-1 flex flex-col min-w-0">
          <header className="sticky top-0 z-10 border-b border-border bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 shadow-sm">
            <div className="flex items-center justify-between gap-4 px-4 md:px-6 py-3 md:py-4">
              <div className="flex items-center gap-2">
                <SidebarTrigger className="hover:bg-muted" />
                {company && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleEditCompany}
                    className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
                  >
                    <Building2 className="h-4 w-4" />
                    <span className="font-medium hidden sm:inline">{company.name}</span>
                  </Button>
                )}
              </div>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
                  className="hover:bg-muted"
                >
                  <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                  <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                  <span className="sr-only">Alternar tema</span>
                </Button>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="flex items-center gap-2 px-2 py-1 h-auto hover:bg-muted">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback className="bg-primary text-primary-foreground text-xs font-semibold">
                          {getUserInitials()}
                        </AvatarFallback>
                      </Avatar>
                      <span className="text-sm font-medium hidden md:inline text-foreground">
                        {getUserDisplayName()}
                      </span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-56">
                    <DropdownMenuLabel>Minha Conta</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={signOut} className="cursor-pointer text-destructive focus:text-destructive">
                      <LogOut className="h-4 w-4 mr-2" />
                      Sair
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </header>
          <div className="flex-1 p-4 md:p-6 overflow-auto">
            <Outlet />
          </div>
        </main>
      </div>

      <Dialog open={isEditCompanyOpen} onOpenChange={setIsEditCompanyOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Editar Nome da Empresa</DialogTitle>
            <DialogDescription>
              Altere o nome da sua empresa aqui. Todos os usuários verão a atualização.
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 pt-4">
            <div className="space-y-2">
              <Label htmlFor="companyName">Nome da Empresa</Label>
              <Input
                id="companyName"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                placeholder="Digite o nome da empresa"
              />
            </div>
            <div className="flex gap-2 justify-end">
              <Button variant="outline" onClick={() => setIsEditCompanyOpen(false)}>
                Cancelar
              </Button>
              <Button onClick={handleSaveCompanyName}>
                Salvar
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </SidebarProvider>
  );
};
