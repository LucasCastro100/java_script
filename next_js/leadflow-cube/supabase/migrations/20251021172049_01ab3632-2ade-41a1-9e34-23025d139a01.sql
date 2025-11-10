-- Adicionar 'products' ao enum app_module
ALTER TYPE app_module ADD VALUE IF NOT EXISTS 'products';

-- Criar tabela de produtos
CREATE TABLE public.products (
  id uuid NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  company_id uuid NOT NULL,
  user_id uuid NOT NULL,
  nome text NOT NULL,
  descricao text,
  preco numeric NOT NULL DEFAULT 0,
  created_at timestamp with time zone NOT NULL DEFAULT now(),
  updated_at timestamp with time zone NOT NULL DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;

-- Políticas RLS
CREATE POLICY "Users can view products from their company"
ON public.products
FOR SELECT
USING (company_id = get_user_company_id(auth.uid()));

CREATE POLICY "Users can create products for their company"
ON public.products
FOR INSERT
WITH CHECK (
  auth.uid() = user_id 
  AND company_id = get_user_company_id(auth.uid())
);

CREATE POLICY "Users can update their own products"
ON public.products
FOR UPDATE
USING (
  auth.uid() = user_id 
  AND company_id = get_user_company_id(auth.uid())
);

CREATE POLICY "Users can delete their own products"
ON public.products
FOR DELETE
USING (
  auth.uid() = user_id 
  AND company_id = get_user_company_id(auth.uid())
);

-- Trigger para updated_at
CREATE TRIGGER update_products_updated_at
BEFORE UPDATE ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.handle_updated_at();

-- Trigger para definir company_id automaticamente
CREATE TRIGGER set_products_company_id
BEFORE INSERT ON public.products
FOR EACH ROW
EXECUTE FUNCTION public.set_company_id();