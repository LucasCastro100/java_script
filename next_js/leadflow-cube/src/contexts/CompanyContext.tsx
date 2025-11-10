import { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useAuth } from './AuthContext';
import { supabase } from '@/integrations/supabase/client';

interface Company {
  id: string;
  name: string;
}

interface CompanyContextType {
  company: Company | null;
  loading: boolean;
  updateCompanyName: (name: string) => Promise<void>;
}

const CompanyContext = createContext<CompanyContextType | undefined>(undefined);

export function CompanyProvider({ children }: { children: ReactNode }) {
  const { user } = useAuth();
  const [company, setCompany] = useState<Company | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCompany = async () => {
      if (!user) {
        setCompany(null);
        setLoading(false);
        return;
      }

      try {
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('company_id')
          .eq('id', user.id)
          .single();

        if (profileError) throw profileError;

        if (profile?.company_id) {
          const { data: companyData, error: companyError } = await supabase
            .from('companies')
            .select('id, name')
            .eq('id', profile.company_id)
            .single();

          if (companyError) throw companyError;

          setCompany(companyData);
        }
      } catch (error) {
        console.error('Error fetching company:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCompany();
  }, [user]);

  const updateCompanyName = async (name: string) => {
    if (!company) return;

    const { error } = await supabase
      .from('companies')
      .update({ name })
      .eq('id', company.id);

    if (error) throw error;

    setCompany({ ...company, name });
  };

  return (
    <CompanyContext.Provider value={{ company, loading, updateCompanyName }}>
      {children}
    </CompanyContext.Provider>
  );
}

export function useCompany() {
  const context = useContext(CompanyContext);
  if (context === undefined) {
    throw new Error('useCompany must be used within a CompanyProvider');
  }
  return context;
}
