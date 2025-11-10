-- Inserir vendedores de teste
INSERT INTO public.sellers (nome, email, telefone, company_id, ativo)
SELECT 
  'João Silva', 
  'joao.silva@empresa.com', 
  '(11) 98765-4321',
  c.id,
  true
FROM public.companies c
LIMIT 1;

INSERT INTO public.sellers (nome, email, telefone, company_id, ativo)
SELECT 
  'Maria Santos', 
  'maria.santos@empresa.com', 
  '(11) 97654-3210',
  c.id,
  true
FROM public.companies c
LIMIT 1;

INSERT INTO public.sellers (nome, email, telefone, company_id, ativo)
SELECT 
  'Pedro Oliveira', 
  'pedro.oliveira@empresa.com', 
  '(11) 96543-2109',
  c.id,
  true
FROM public.companies c
LIMIT 1;

INSERT INTO public.sellers (nome, email, telefone, company_id, ativo)
SELECT 
  'Ana Costa', 
  'ana.costa@empresa.com', 
  '(11) 95432-1098',
  c.id,
  false
FROM public.companies c
LIMIT 1;

-- Inserir metas de vendas para os vendedores
INSERT INTO public.goals (seller_id, periodo, valor_meta, valor_atingido, company_id)
SELECT 
  s.id,
  '2025-01',
  50000.00,
  38500.00,
  c.id
FROM public.sellers s
CROSS JOIN public.companies c
WHERE s.nome = 'João Silva'
LIMIT 1;

INSERT INTO public.goals (seller_id, periodo, valor_meta, valor_atingido, company_id)
SELECT 
  s.id,
  '2025-01',
  45000.00,
  52000.00,
  c.id
FROM public.sellers s
CROSS JOIN public.companies c
WHERE s.nome = 'Maria Santos'
LIMIT 1;

INSERT INTO public.goals (seller_id, periodo, valor_meta, valor_atingido, company_id)
SELECT 
  s.id,
  '2025-01',
  40000.00,
  28000.00,
  c.id
FROM public.sellers s
CROSS JOIN public.companies c
WHERE s.nome = 'Pedro Oliveira'
LIMIT 1;

INSERT INTO public.goals (seller_id, periodo, valor_meta, valor_atingido, company_id)
SELECT 
  s.id,
  '2025-02',
  55000.00,
  12000.00,
  c.id
FROM public.sellers s
CROSS JOIN public.companies c
WHERE s.nome = 'João Silva'
LIMIT 1;

INSERT INTO public.goals (seller_id, periodo, valor_meta, valor_atingido, company_id)
SELECT 
  s.id,
  '2025-02',
  50000.00,
  18500.00,
  c.id
FROM public.sellers s
CROSS JOIN public.companies c
WHERE s.nome = 'Maria Santos'
LIMIT 1;

-- Atualizar alguns leads existentes com vendedores
UPDATE public.leads
SET seller_id = (SELECT id FROM public.sellers WHERE nome = 'João Silva' LIMIT 1)
WHERE id IN (
  SELECT id FROM public.leads 
  WHERE status IN ('novo', 'contato')
  LIMIT 2
);

UPDATE public.leads
SET seller_id = (SELECT id FROM public.sellers WHERE nome = 'Maria Santos' LIMIT 1)
WHERE id IN (
  SELECT id FROM public.leads 
  WHERE status IN ('proposta', 'negociacao')
  AND seller_id IS NULL
  LIMIT 2
);

UPDATE public.leads
SET seller_id = (SELECT id FROM public.sellers WHERE nome = 'Pedro Oliveira' LIMIT 1)
WHERE id IN (
  SELECT id FROM public.leads 
  WHERE status IN ('ganho')
  AND seller_id IS NULL
  LIMIT 1
);

-- Inserir alguns leads novos com vendedores já vinculados
INSERT INTO public.leads (user_id, nome, produto, whatsapp_lead, whatsapp_atendente, localidade, status, valor_estimado, seller_id, company_id)
SELECT 
  u.id,
  'Tech Solutions Ltda',
  'Sistema de Gestão Empresarial',
  '(11) 3333-4444',
  '(11) 98888-7777',
  'São Paulo, SP',
  'proposta',
  85000.00,
  s.id,
  c.id
FROM auth.users u
CROSS JOIN public.sellers s
CROSS JOIN public.companies c
WHERE s.nome = 'João Silva'
LIMIT 1;

INSERT INTO public.leads (user_id, nome, produto, whatsapp_lead, whatsapp_atendente, localidade, status, valor_estimado, seller_id, company_id)
SELECT 
  u.id,
  'Comércio do Brasil',
  'Consultoria de Marketing Digital',
  '(21) 4444-5555',
  '(21) 97777-6666',
  'Rio de Janeiro, RJ',
  'negociacao',
  42000.00,
  s.id,
  c.id
FROM auth.users u
CROSS JOIN public.sellers s
CROSS JOIN public.companies c
WHERE s.nome = 'Maria Santos'
LIMIT 1;

INSERT INTO public.leads (user_id, nome, produto, whatsapp_lead, whatsapp_atendente, localidade, status, valor_estimado, seller_id, company_id)
SELECT 
  u.id,
  'Indústria ABC',
  'Automação Industrial',
  '(19) 5555-6666',
  '(19) 96666-5555',
  'Campinas, SP',
  'ganho',
  125000.00,
  s.id,
  c.id
FROM auth.users u
CROSS JOIN public.sellers s
CROSS JOIN public.companies c
WHERE s.nome = 'Maria Santos'
LIMIT 1;

INSERT INTO public.leads (user_id, nome, produto, whatsapp_lead, whatsapp_atendente, localidade, status, valor_estimado, seller_id, company_id)
SELECT 
  u.id,
  'Startups Inovadoras',
  'Desenvolvimento de Software',
  '(11) 6666-7777',
  '(11) 95555-4444',
  'São Paulo, SP',
  'contato',
  68000.00,
  s.id,
  c.id
FROM auth.users u
CROSS JOIN public.sellers s
CROSS JOIN public.companies c
WHERE s.nome = 'Pedro Oliveira'
LIMIT 1;