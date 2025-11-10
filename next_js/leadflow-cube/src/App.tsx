import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import Index from "./pages/Index";
import Dashboard from "./pages/Dashboard";
import Leads from "./pages/Leads";
import Goals from "./pages/Goals";
import Products from "./pages/Products";
import Settings from "./pages/Settings";
import Auth from "./pages/Auth";
import NotFound from "./pages/NotFound";
import { Layout } from "./components/Layout";
import { AuthProvider } from "./contexts/AuthContext";
import { CompanyProvider } from "./contexts/CompanyContext";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { ModuleProtectedRoute } from "./components/ModuleProtectedRoute";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <AuthProvider>
            <CompanyProvider>
              <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/auth" element={<Auth />} />
                <Route element={<ProtectedRoute><Layout /></ProtectedRoute>}>
                  <Route path="/dashboard" element={<ModuleProtectedRoute module="dashboard"><Dashboard /></ModuleProtectedRoute>} />
                  <Route path="/leads" element={<ModuleProtectedRoute module="leads"><Leads /></ModuleProtectedRoute>} />
                  <Route path="/goals" element={<ModuleProtectedRoute module="goals"><Goals /></ModuleProtectedRoute>} />
                  <Route path="/products" element={<ModuleProtectedRoute module="products"><Products /></ModuleProtectedRoute>} />
                  <Route path="/settings" element={<ModuleProtectedRoute module="settings"><Settings /></ModuleProtectedRoute>} />
                </Route>
                {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                <Route path="*" element={<NotFound />} />
              </Routes>
            </CompanyProvider>
          </AuthProvider>
        </BrowserRouter>
      </TooltipProvider>
    </ThemeProvider>
  </QueryClientProvider>
);

export default App;
