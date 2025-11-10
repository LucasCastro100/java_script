-- Inserir leads de exemplo para o dashboard
INSERT INTO public.leads (
  user_id,
  company_id,
  nome,
  produto,
  whatsapp_atendente,
  whatsapp_lead,
  localidade,
  status,
  valor_estimado,
  observacoes,
  seller_id
) VALUES
-- Leads Novos
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Carlos Mendes', 'Sistema de Gestão Empresarial', '(11) 98765-4321', '(11) 91234-5678', 'São Paulo - SP', 'novo', 45000.00, 'Lead veio do site, interessado em demo', 'bedd795b-0f4f-4577-ac39-e495bf17bfd7'),
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Fernanda Lima', 'CRM Personalizado', '(11) 98765-4321', '(21) 99876-5432', 'Rio de Janeiro - RJ', 'novo', 32000.00, 'Indicação de cliente atual', 'e8d2b4e1-132f-4430-9cd5-ee794128d34f'),
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Roberto Santos', 'Automação de Marketing', '(11) 98765-4321', '(31) 98765-1234', 'Belo Horizonte - MG', 'novo', 28000.00, 'Solicitou proposta por email', 'ec68d124-c22c-4515-af2a-ea81705a55e9'),

-- Leads em Contato
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Marina Oliveira', 'Plataforma de E-commerce', '(11) 98765-4321', '(41) 99123-4567', 'Curitiba - PR', 'contato', 55000.00, 'Já teve duas reuniões, muito interessada', 'bedd795b-0f4f-4577-ac39-e495bf17bfd7'),
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Paulo Ferreira', 'Sistema de Estoque', '(11) 98765-4321', '(51) 98234-5678', 'Porto Alegre - RS', 'contato', 38000.00, 'Aguardando retorno sobre dúvidas técnicas', 'e8d2b4e1-132f-4430-9cd5-ee794128d34f'),
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Juliana Costa', 'App Mobile Corporativo', '(11) 98765-4321', '(85) 99345-6789', 'Fortaleza - CE', 'contato', 42000.00, 'Primeira reunião realizada', 'ec68d124-c22c-4515-af2a-ea81705a55e9'),

-- Leads em Proposta
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'André Silva', 'Portal Web Institucional', '(11) 98765-4321', '(71) 98456-7890', 'Salvador - BA', 'proposta', 35000.00, 'Proposta enviada, aguardando análise', 'bedd795b-0f4f-4577-ac39-e495bf17bfd7'),
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Beatriz Almeida', 'Sistema de RH', '(11) 98765-4321', '(61) 99567-8901', 'Brasília - DF', 'proposta', 48000.00, 'Proposta técnica aprovada, aguardando comercial', 'e8d2b4e1-132f-4430-9cd5-ee794128d34f'),
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Ricardo Gomes', 'Dashboard Analytics', '(11) 98765-4321', '(62) 98678-9012', 'Goiânia - GO', 'proposta', 41000.00, 'Segunda versão da proposta enviada', 'ec68d124-c22c-4515-af2a-ea81705a55e9'),

-- Leads em Negociação
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Camila Rodrigues', 'ERP Integrado', '(11) 98765-4321', '(81) 99789-0123', 'Recife - PE', 'negociacao', 75000.00, 'Negociando prazo e forma de pagamento', 'bedd795b-0f4f-4577-ac39-e495bf17bfd7'),
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Gustavo Martins', 'Sistema de Vendas', '(11) 98765-4321', '(48) 98890-1234', 'Florianópolis - SC', 'negociacao', 52000.00, 'Ajustando escopo do projeto', 'e8d2b4e1-132f-4430-9cd5-ee794128d34f'),
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Patricia Souza', 'Integração com APIs', '(11) 98765-4321', '(92) 99901-2345', 'Manaus - AM', 'negociacao', 39000.00, 'Última fase de negociação', 'ec68d124-c22c-4515-af2a-ea81705a55e9'),

-- Leads Ganhos
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Lucas Barbosa', 'Website Responsivo', '(11) 98765-4321', '(19) 98012-3456', 'Campinas - SP', 'ganho', 25000.00, 'Contrato assinado - Projeto iniciado', 'bedd795b-0f4f-4577-ac39-e495bf17bfd7'),
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Amanda Pereira', 'Sistema de Atendimento', '(11) 98765-4321', '(27) 99123-4567', 'Vitória - ES', 'ganho', 33000.00, 'Fechado! Cliente muito satisfeito', 'e8d2b4e1-132f-4430-9cd5-ee794128d34f'),
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Daniel Carvalho', 'App de Delivery', '(11) 98765-4321', '(84) 98234-5678', 'Natal - RN', 'ganho', 44000.00, 'Projeto em desenvolvimento', 'ec68d124-c22c-4515-af2a-ea81705a55e9'),
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Renata Lima', 'Sistema de Reservas', '(11) 98765-4321', '(47) 99345-6789', 'Joinville - SC', 'ganho', 37000.00, 'Implementação concluída', 'bedd795b-0f4f-4577-ac39-e495bf17bfd7'),

-- Leads Perdidos
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Marcelo Dias', 'Plataforma SaaS', '(11) 98765-4321', '(65) 98456-7890', 'Cuiabá - MT', 'perdido', 58000.00, 'Cliente optou por concorrente', 'e8d2b4e1-132f-4430-9cd5-ee794128d34f'),
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Vanessa Melo', 'Sistema Logístico', '(11) 98765-4321', '(82) 99567-8901', 'Maceió - AL', 'perdido', 46000.00, 'Orçamento acima do esperado', 'ec68d124-c22c-4515-af2a-ea81705a55e9'),
('4640efc5-e021-47b7-8571-1a056422cbc2', 'ce95b0c6-77bb-4b4f-a112-cf6be8a10927', 'Thiago Rocha', 'Portal de Notícias', '(11) 98765-4321', '(98) 98678-9012', 'São Luís - MA', 'perdido', 29000.00, 'Projeto cancelado pelo cliente', 'bedd795b-0f4f-4577-ac39-e495bf17bfd7');