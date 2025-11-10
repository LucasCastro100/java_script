-- Atualizar o usuário atual para admin
UPDATE public.user_roles 
SET role = 'admin' 
WHERE user_id = '4640efc5-e021-47b7-8571-1a056422cbc2';

-- Garantir que o admin tenha acesso a todos os módulos
INSERT INTO public.user_module_permissions (user_id, module)
SELECT '4640efc5-e021-47b7-8571-1a056422cbc2', unnest(enum_range(NULL::app_module))
ON CONFLICT (user_id, module) DO NOTHING;