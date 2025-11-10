import { LayoutDashboard, Users, Settings, Target, Package } from "lucide-react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";
import { usePermissions, AppModule } from "@/hooks/usePermissions";

const menuItems: { title: string; url: string; icon: any; module: AppModule }[] = [
  { title: "Dashboard", url: "/dashboard", icon: LayoutDashboard, module: "dashboard" },
  { title: "Leads", url: "/leads", icon: Users, module: "leads" },
  { title: "Metas", url: "/goals", icon: Target, module: "goals" },
  { title: "Produtos", url: "/products", icon: Package, module: "products" },
  { title: "Configurações", url: "/settings", icon: Settings, module: "settings" },
];

export function AppSidebar() {
  const { open } = useSidebar();
  const { permissions, isLoading } = usePermissions();
  const location = useLocation();

  const allowedItems = menuItems.filter((item) => permissions.includes(item.module));

  if (isLoading) {
    return (
      <Sidebar collapsible="icon">
        <SidebarContent>
          <div className="flex items-center justify-center p-4">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-primary" />
          </div>
        </SidebarContent>
      </Sidebar>
    );
  }

  return (
    <Sidebar collapsible="icon" className="border-r border-sidebar-border bg-sidebar">
      <SidebarContent className="bg-sidebar">
        <SidebarGroup>
          {/* Logo/Brand Section - Only show when open */}
          {open && (
            <div className="flex items-center justify-center px-6 py-8 border-b border-sidebar-border/50">
              <div className="flex flex-col items-center gap-1">
                <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                  ExceFy
                </h1>
                <p className="text-xs text-muted-foreground">Gestão de Leads</p>
              </div>
            </div>
          )}
          
          {/* Menu Items */}
          <SidebarGroupContent className={open ? "px-3 py-6" : "px-2 py-6"}>
            <SidebarMenu className="gap-2">
              {allowedItems.map((item) => {
                const active = location.pathname === item.url;
                const Icon = item.icon;
                
                return (
                  <SidebarMenuItem key={item.title}>
                    <SidebarMenuButton 
                      asChild 
                      tooltip={item.title} 
                      isActive={active}
                      className={`transition-all duration-200 hover:scale-[1.02] ${open ? '' : 'justify-center gap-0 w-full px-0 pl-0 pr-0'}`}
                    >
                      <NavLink 
                        to={item.url} 
                        end
                        className={`
                          relative overflow-hidden rounded-lg transition-all flex items-center
                          ${open ? 'px-3 py-2.5' : 'px-0 py-2.5 w-full justify-center'}
                          ${active 
                            ? 'bg-sidebar-accent shadow-sm' 
                            : 'hover:bg-sidebar-accent/50'
                          }
                        `}
                      >
                        <Icon className={`
                          block h-5 w-5 shrink-0 transition-colors
                          ${!open && 'mx-auto'}
                          ${active ? 'text-sidebar-primary' : 'text-sidebar-foreground/70'}
                        `} />
                        {open && (
                          <span className={`
                            font-medium truncate transition-colors
                            ${active ? 'text-sidebar-primary' : 'text-sidebar-foreground'}
                          `}>
                            {item.title}
                          </span>
                        )}
                        {active && open && (
                          <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-primary to-accent rounded-r-full" />
                        )}
                      </NavLink>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                );
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}
