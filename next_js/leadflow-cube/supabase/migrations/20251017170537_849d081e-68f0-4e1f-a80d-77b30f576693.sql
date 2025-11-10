-- Insert sample leads data
-- Note: This will insert leads for the currently authenticated user
INSERT INTO public.leads (user_id, nome, produto, whatsapp_atendente, whatsapp_lead, localidade, status, valor_estimado, observacoes)
SELECT 
  auth.uid(),
  nome,
  produto,
  whatsapp_atendente,
  whatsapp_lead,
  localidade,
  status::lead_status,
  valor_estimado,
  observacoes
FROM (VALUES
  ('João Silva', 'Sistema de Gestão Empresarial', '+55 11 98765-4321', '+55 11 91234-5678', 'São Paulo, SP', 'novo', 45000.00, 'Cliente interessado em solução completa para gestão'),
  ('Maria Santos', 'Aplicativo Mobile', '+55 21 98765-4321', '+55 21 91234-5678', 'Rio de Janeiro, RJ', 'contato', 28000.00, 'Primeira reunião agendada para próxima semana'),
  ('Pedro Costa', 'Website Institucional', '+55 31 98765-4321', '+55 31 91234-5678', 'Belo Horizonte, MG', 'proposta', 12000.00, 'Proposta enviada, aguardando retorno'),
  ('Ana Oliveira', 'E-commerce Completo', '+55 41 98765-4321', '+55 41 91234-5678', 'Curitiba, PR', 'negociacao', 65000.00, 'Negociando valores e prazos de entrega'),
  ('Carlos Ferreira', 'Sistema CRM', '+55 51 98765-4321', '+55 51 91234-5678', 'Porto Alegre, RS', 'ganho', 38000.00, 'Contrato assinado, início em 15 dias'),
  ('Juliana Lima', 'Landing Page', '+55 85 98765-4321', '+55 85 91234-5678', 'Fortaleza, CE', 'ganho', 5000.00, 'Projeto entregue e aprovado'),
  ('Roberto Alves', 'Consultoria TI', '+55 71 98765-4321', '+55 71 91234-5678', 'Salvador, BA', 'perdido', 15000.00, 'Cliente optou por outra solução'),
  ('Fernanda Souza', 'Sistema de Vendas', '+55 61 98765-4321', '+55 61 91234-5678', 'Brasília, DF', 'novo', 32000.00, 'Lead qualificado, aguardando primeiro contato'),
  ('Lucas Martins', 'Automação de Marketing', '+55 81 98765-4321', '+55 81 91234-5678', 'Recife, PE', 'contato', 22000.00, 'Segunda ligação marcada'),
  ('Patrícia Rocha', 'Dashboard Analytics', '+55 47 98765-4321', '+55 47 91234-5678', 'Joinville, SC', 'proposta', 18000.00, 'Apresentação da proposta realizada')
) AS sample_data(nome, produto, whatsapp_atendente, whatsapp_lead, localidade, status, valor_estimado, observacoes)
WHERE auth.uid() IS NOT NULL;