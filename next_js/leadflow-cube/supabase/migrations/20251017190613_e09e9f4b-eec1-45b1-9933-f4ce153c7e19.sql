-- Criar tabela de vendedores
CREATE TABLE public.sellers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  company_id UUID NOT NULL,
  nome TEXT NOT NULL,
  email TEXT NOT NULL,
  telefone TEXT,
  ativo BOOLEAN NOT NULL DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Criar tabela de metas
CREATE TABLE public.goals (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  seller_id UUID NOT NULL REFERENCES public.sellers(id) ON DELETE CASCADE,
  company_id UUID NOT NULL,
  periodo TEXT NOT NULL, -- formato: YYYY-MM
  valor_meta NUMERIC NOT NULL,
  valor_atingido NUMERIC DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(seller_id, periodo)
);

-- Habilitar RLS nas tabelas
ALTER TABLE public.sellers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.goals ENABLE ROW LEVEL SECURITY;

-- Policies para sellers
CREATE POLICY "Users can view sellers from their company"
  ON public.sellers FOR SELECT
  USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Admins can create sellers for their company"
  ON public.sellers FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin') AND company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Admins can update sellers from their company"
  ON public.sellers FOR UPDATE
  USING (has_role(auth.uid(), 'admin') AND company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Admins can delete sellers from their company"
  ON public.sellers FOR DELETE
  USING (has_role(auth.uid(), 'admin') AND company_id = get_user_company_id(auth.uid()));

-- Policies para goals
CREATE POLICY "Users can view goals from their company"
  ON public.goals FOR SELECT
  USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Admins can create goals for their company"
  ON public.goals FOR INSERT
  WITH CHECK (has_role(auth.uid(), 'admin') AND company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Admins can update goals from their company"
  ON public.goals FOR UPDATE
  USING (has_role(auth.uid(), 'admin') AND company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Admins can delete goals from their company"
  ON public.goals FOR DELETE
  USING (has_role(auth.uid(), 'admin') AND company_id = get_user_company_id(auth.uid()));

-- Trigger para atualizar updated_at
CREATE TRIGGER update_sellers_updated_at
  BEFORE UPDATE ON public.sellers
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

CREATE TRIGGER update_goals_updated_at
  BEFORE UPDATE ON public.goals
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Índices para performance
CREATE INDEX idx_sellers_company_id ON public.sellers(company_id);
CREATE INDEX idx_sellers_user_id ON public.sellers(user_id);
CREATE INDEX idx_goals_seller_id ON public.goals(seller_id);
CREATE INDEX idx_goals_company_id ON public.goals(company_id);
CREATE INDEX idx_goals_periodo ON public.goals(periodo);