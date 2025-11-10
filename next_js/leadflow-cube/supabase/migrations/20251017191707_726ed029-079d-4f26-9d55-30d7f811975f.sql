-- Adicionar coluna seller_id na tabela leads
ALTER TABLE public.leads
ADD COLUMN seller_id uuid REFERENCES public.sellers(id) ON DELETE SET NULL;

-- Criar índice para melhor performance
CREATE INDEX idx_leads_seller_id ON public.leads(seller_id);