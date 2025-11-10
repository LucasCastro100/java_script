-- Adicionar permissão de módulo 'goals' para todos os usuários existentes
INSERT INTO public.user_module_permissions (user_id, module)
SELECT DISTINCT p.id, 'goals'::app_module
FROM public.profiles p
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_module_permissions ump
  WHERE ump.user_id = p.id AND ump.module = 'goals'::app_module
);