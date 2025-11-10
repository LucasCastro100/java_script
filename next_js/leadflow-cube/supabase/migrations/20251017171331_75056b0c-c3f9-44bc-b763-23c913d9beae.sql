-- Create enum for modules
CREATE TYPE public.app_module AS ENUM ('dashboard', 'leads', 'settings');

-- Create table for user module permissions
CREATE TABLE public.user_module_permissions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  module app_module NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  UNIQUE(user_id, module)
);

-- Enable RLS
ALTER TABLE public.user_module_permissions ENABLE ROW LEVEL SECURITY;

-- Create function to check module permission
CREATE OR REPLACE FUNCTION public.has_module_permission(_user_id UUID, _module app_module)
RETURNS BOOLEAN
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_module_permissions
    WHERE user_id = _user_id
      AND module = _module
  )
$$;

-- Admins can manage all permissions
CREATE POLICY "Admins can manage user module permissions"
ON public.user_module_permissions
FOR ALL
USING (has_role(auth.uid(), 'admin'));

-- Users can view their own permissions
CREATE POLICY "Users can view their own module permissions"
ON public.user_module_permissions
FOR SELECT
USING (auth.uid() = user_id);

-- Create index for performance
CREATE INDEX idx_user_module_permissions_user_id ON public.user_module_permissions(user_id);
CREATE INDEX idx_user_module_permissions_module ON public.user_module_permissions(module);

-- Grant all modules to existing admin users by default
INSERT INTO public.user_module_permissions (user_id, module)
SELECT ur.user_id, m.module
FROM public.user_roles ur
CROSS JOIN (
  SELECT unnest(enum_range(NULL::app_module)) AS module
) m
WHERE ur.role = 'admin'
ON CONFLICT (user_id, module) DO NOTHING;