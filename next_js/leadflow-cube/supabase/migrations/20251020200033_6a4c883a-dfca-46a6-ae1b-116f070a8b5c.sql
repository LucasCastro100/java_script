-- Link user by case-insensitive email to Inthegra and grant permissions
DO $$
DECLARE
  v_company_id uuid := '11111111-1111-1111-1111-111111111112'::uuid; -- Inthegra
  v_user_id uuid;
BEGIN
  SELECT id INTO v_user_id
  FROM public.profiles
  WHERE lower(email) = lower('Vianei@inthegrath.com.br')
  LIMIT 1;

  IF v_user_id IS NULL THEN
    RAISE NOTICE 'Profile for email not found. Nothing to update.';
    RETURN;
  END IF;

  -- Update company link
  UPDATE public.profiles
  SET company_id = v_company_id
  WHERE id = v_user_id;

  -- Ensure admin role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (v_user_id, 'admin'::app_role)
  ON CONFLICT (user_id, role) DO NOTHING;

  -- Ensure module permissions
  INSERT INTO public.user_module_permissions (user_id, module)
  VALUES (v_user_id, 'dashboard'::app_module)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.user_module_permissions (user_id, module)
  VALUES (v_user_id, 'leads'::app_module)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.user_module_permissions (user_id, module)
  VALUES (v_user_id, 'goals'::app_module)
  ON CONFLICT DO NOTHING;

  INSERT INTO public.user_module_permissions (user_id, module)
  VALUES (v_user_id, 'settings'::app_module)
  ON CONFLICT DO NOTHING;
END $$;