-- Vincular usuário Vianei@inthegrath.com.br à empresa Inthegra
UPDATE public.profiles
SET company_id = '11111111-1111-1111-1111-111111111112'::uuid
WHERE email = 'Vianei@inthegrath.com.br';

-- Garantir que o usuário tenha role de admin
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM public.profiles
WHERE email = 'Vianei@inthegrath.com.br'
ON CONFLICT (user_id, role) DO NOTHING;

-- Garantir que o usuário tenha permissões nos módulos
INSERT INTO public.user_module_permissions (user_id, module)
SELECT id, 'leads'::app_module
FROM public.profiles
WHERE email = 'Vianei@inthegrath.com.br'
ON CONFLICT DO NOTHING;

INSERT INTO public.user_module_permissions (user_id, module)
SELECT id, 'goals'::app_module
FROM public.profiles
WHERE email = 'Vianei@inthegrath.com.br'
ON CONFLICT DO NOTHING;