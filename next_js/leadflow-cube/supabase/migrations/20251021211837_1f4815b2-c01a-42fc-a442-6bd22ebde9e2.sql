-- Add 'products' module permission to all existing users
INSERT INTO public.user_module_permissions (user_id, module)
SELECT DISTINCT user_id, 'products'::app_module
FROM public.user_module_permissions
WHERE NOT EXISTS (
  SELECT 1 FROM public.user_module_permissions 
  WHERE user_id = user_module_permissions.user_id 
  AND module = 'products'
);