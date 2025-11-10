-- Criar empresa de teste Zilio Company
INSERT INTO public.companies (id, name, created_at, updated_at)
VALUES (
  '11111111-1111-1111-1111-111111111111'::uuid,
  'Zilio Company',
  now(),
  now()
)
ON CONFLICT (id) DO NOTHING;

-- Inserir vendedores de teste para Zilio Company
INSERT INTO public.sellers (id, company_id, nome, email, telefone, user_id, ativo, created_at, updated_at)
VALUES 
  ('22222222-2222-2222-2222-222222222221'::uuid, '11111111-1111-1111-1111-111111111111'::uuid, 'Carlos Silva', 'carlos@ziliocompany.com', '(11) 98765-4321', NULL, true, now(), now()),
  ('22222222-2222-2222-2222-222222222222'::uuid, '11111111-1111-1111-1111-111111111111'::uuid, 'Ana Santos', 'ana@ziliocompany.com', '(11) 97654-3210', NULL, true, now(), now()),
  ('22222222-2222-2222-2222-222222222223'::uuid, '11111111-1111-1111-1111-111111111111'::uuid, 'Pedro Costa', 'pedro@ziliocompany.com', '(21) 96543-2109', NULL, true, now(), now())
ON CONFLICT (id) DO NOTHING;

-- Inserir metas de teste para os vendedores
INSERT INTO public.goals (id, company_id, seller_id, periodo, valor_meta, valor_atingido, created_at, updated_at)
VALUES 
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111'::uuid, '22222222-2222-2222-2222-222222222221'::uuid, '2025-01', 150000.00, 95000.00, now(), now()),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111'::uuid, '22222222-2222-2222-2222-222222222222'::uuid, '2025-01', 120000.00, 66000.00, now(), now()),
  (gen_random_uuid(), '11111111-1111-1111-1111-111111111111'::uuid, '22222222-2222-2222-2222-222222222223'::uuid, '2025-01', 180000.00, 103000.00, now(), now())
ON CONFLICT (id) DO NOTHING;

-- Criar função para inserir usuário e dados de teste
CREATE OR REPLACE FUNCTION public.setup_josue_test_user()
RETURNS text
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  josue_user_id uuid;
  result_message text;
BEGIN
  -- Buscar o user_id do Josué
  SELECT id INTO josue_user_id FROM public.profiles WHERE email = 'josue@ziliocompany.com' LIMIT 1;
  
  IF josue_user_id IS NULL THEN
    result_message := 'ATENÇÃO: Usuário josue@ziliocompany.com ainda não existe. 
    
Passos para criar:
1. Vá para Authentication > Users no Supabase
2. Clique em "Add user" > "Create new user"
3. Email: josue@ziliocompany.com
4. Senha: admin
5. Metadata (User Metadata - formato JSON):
   {
     "full_name": "Josué Silva",
     "company_id": "11111111-1111-1111-1111-111111111111"
   }
6. Marque "Auto Confirm User"
7. Após criar, execute novamente: SELECT public.setup_josue_test_user();';
    RETURN result_message;
  END IF;

  -- Inserir tags de teste (agora com user_id)
  INSERT INTO public.tags (id, nome, cor, user_id, company_id, created_at)
  VALUES 
    ('33333333-3333-3333-3333-333333333331'::uuid, 'Prioridade Alta', '#ef4444', josue_user_id, '11111111-1111-1111-1111-111111111111'::uuid, now()),
    ('33333333-3333-3333-3333-333333333332'::uuid, 'Cliente VIP', '#8b5cf6', josue_user_id, '11111111-1111-1111-1111-111111111111'::uuid, now()),
    ('33333333-3333-3333-3333-333333333333'::uuid, 'Follow-up Urgente', '#f59e0b', josue_user_id, '11111111-1111-1111-1111-111111111111'::uuid, now()),
    ('33333333-3333-3333-3333-333333333334'::uuid, 'Potencial Alto', '#10b981', josue_user_id, '11111111-1111-1111-1111-111111111111'::uuid, now())
  ON CONFLICT (id) DO NOTHING;

  -- Dar permissões de módulos ao usuário
  INSERT INTO public.user_module_permissions (user_id, module)
  VALUES 
    (josue_user_id, 'leads'),
    (josue_user_id, 'goals')
  ON CONFLICT DO NOTHING;

  -- Inserir leads de teste
  INSERT INTO public.leads (id, user_id, company_id, nome, produto, status, valor_estimado, whatsapp_lead, whatsapp_atendente, localidade, observacoes, seller_id, created_at, updated_at)
  VALUES 
    (gen_random_uuid(), josue_user_id, '11111111-1111-1111-1111-111111111111'::uuid, 'João Oliveira', 'Sistema ERP', 'novo', 45000.00, '(11) 99887-6655', '(11) 98765-4321', 'São Paulo - SP', 'Lead quente, solicitou demonstração', '22222222-2222-2222-2222-222222222221'::uuid, now() - interval '2 days', now()),
    (gen_random_uuid(), josue_user_id, '11111111-1111-1111-1111-111111111111'::uuid, 'Maria Ferreira', 'Consultoria Tech', 'contato', 28000.00, '(21) 98776-5544', '(11) 97654-3210', 'Rio de Janeiro - RJ', 'Primeira reunião marcada para semana que vem', '22222222-2222-2222-2222-222222222222'::uuid, now() - interval '5 days', now()),
    (gen_random_uuid(), josue_user_id, '11111111-1111-1111-1111-111111111111'::uuid, 'Ricardo Almeida', 'Desenvolvimento Web', 'proposta', 65000.00, '(31) 97665-4433', '(21) 96543-2109', 'Belo Horizonte - MG', 'Proposta enviada, aguardando retorno', '22222222-2222-2222-2222-222222222223'::uuid, now() - interval '7 days', now()),
    (gen_random_uuid(), josue_user_id, '11111111-1111-1111-1111-111111111111'::uuid, 'Juliana Costa', 'App Mobile', 'negociacao', 52000.00, '(41) 96554-3322', '(11) 98765-4321', 'Curitiba - PR', 'Em negociação de preço e prazo', '22222222-2222-2222-2222-222222222221'::uuid, now() - interval '10 days', now()),
    (gen_random_uuid(), josue_user_id, '11111111-1111-1111-1111-111111111111'::uuid, 'Fernando Souza', 'Infraestrutura Cloud', 'ganho', 95000.00, '(48) 95443-2211', '(11) 97654-3210', 'Florianópolis - SC', 'Contrato assinado! Cliente satisfeito', '22222222-2222-2222-2222-222222222222'::uuid, now() - interval '15 days', now()),
    (gen_random_uuid(), josue_user_id, '11111111-1111-1111-1111-111111111111'::uuid, 'Patrícia Lima', 'Automação', 'ganho', 38000.00, '(85) 94332-1100', '(21) 96543-2109', 'Fortaleza - CE', 'Projeto concluído com sucesso', '22222222-2222-2222-2222-222222222223'::uuid, now() - interval '20 days', now()),
    (gen_random_uuid(), josue_user_id, '11111111-1111-1111-1111-111111111111'::uuid, 'Roberto Dias', 'Sistema CRM', 'perdido', 42000.00, '(71) 93221-0099', '(11) 98765-4321', 'Salvador - BA', 'Cliente optou por concorrente', '22222222-2222-2222-2222-222222222221'::uuid, now() - interval '25 days', now()),
    (gen_random_uuid(), josue_user_id, '11111111-1111-1111-1111-111111111111'::uuid, 'Camila Rocha', 'Marketing Digital', 'novo', 18000.00, '(61) 92110-9988', '(11) 97654-3210', 'Brasília - DF', 'Lead novo, aguardando primeiro contato', '22222222-2222-2222-2222-222222222222'::uuid, now() - interval '1 day', now()),
    (gen_random_uuid(), josue_user_id, '11111111-1111-1111-1111-111111111111'::uuid, 'Lucas Martins', 'E-commerce', 'contato', 72000.00, '(51) 91009-8877', '(21) 96543-2109', 'Porto Alegre - RS', 'Segunda reunião agendada', '22222222-2222-2222-2222-222222222223'::uuid, now() - interval '3 days', now()),
    (gen_random_uuid(), josue_user_id, '11111111-1111-1111-1111-111111111111'::uuid, 'Amanda Silva', 'BI e Analytics', 'proposta', 88000.00, '(62) 90998-7766', '(11) 98765-4321', 'Goiânia - GO', 'Proposta customizada enviada', '22222222-2222-2222-2222-222222222221'::uuid, now() - interval '8 days', now());

  result_message := 'Sucesso! Dados de teste criados para josue@ziliocompany.com:
  
- 10 leads de teste (vários status)
- 4 tags
- 3 vendedores
- 3 metas
- Permissões de módulos: leads, goals

O usuário pode fazer login com:
Email: josue@ziliocompany.com
Senha: admin';
  
  RETURN result_message;
END;
$$;

COMMENT ON FUNCTION public.setup_josue_test_user() IS 'Configura dados de teste para o usuário josue@ziliocompany.com. Execute: SELECT public.setup_josue_test_user();';
