-- Fix infinite recursion in profiles RLS policies
-- Drop the problematic policy
DROP POLICY IF EXISTS "Admins can view profiles from same company" ON public.profiles;

-- Create a security definer function to get user's company
CREATE OR REPLACE FUNCTION public.get_user_company_id(_user_id uuid)
RETURNS uuid
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT company_id FROM public.profiles WHERE id = _user_id;
$$;

-- Recreate the admin policy using the security definer function
CREATE POLICY "Admins can view profiles from same company" ON public.profiles
FOR SELECT USING (
  public.has_role(auth.uid(), 'admin')
  AND company_id = public.get_user_company_id(auth.uid())
);

-- Update leads policies to use the security definer function
DROP POLICY IF EXISTS "Users can view leads from their company" ON public.leads;
DROP POLICY IF EXISTS "Users can create leads for their company" ON public.leads;
DROP POLICY IF EXISTS "Users can update their own leads" ON public.leads;
DROP POLICY IF EXISTS "Users can delete their own leads" ON public.leads;

CREATE POLICY "Users can view leads from their company" ON public.leads
FOR SELECT USING (
  company_id = public.get_user_company_id(auth.uid())
);

CREATE POLICY "Users can create leads for their company" ON public.leads
FOR INSERT WITH CHECK (
  auth.uid() = user_id
  AND company_id = public.get_user_company_id(auth.uid())
);

CREATE POLICY "Users can update their own leads" ON public.leads
FOR UPDATE USING (
  auth.uid() = user_id
  AND company_id = public.get_user_company_id(auth.uid())
);

CREATE POLICY "Users can delete their own leads" ON public.leads
FOR DELETE USING (
  auth.uid() = user_id
  AND company_id = public.get_user_company_id(auth.uid())
);

-- Update tags policies to use the security definer function
DROP POLICY IF EXISTS "Users can view tags from their company" ON public.tags;
DROP POLICY IF EXISTS "Users can create tags for their company" ON public.tags;
DROP POLICY IF EXISTS "Users can update their own tags" ON public.tags;
DROP POLICY IF EXISTS "Users can delete their own tags" ON public.tags;

CREATE POLICY "Users can view tags from their company" ON public.tags
FOR SELECT USING (
  company_id = public.get_user_company_id(auth.uid())
);

CREATE POLICY "Users can create tags for their company" ON public.tags
FOR INSERT WITH CHECK (
  auth.uid() = user_id
  AND company_id = public.get_user_company_id(auth.uid())
);

CREATE POLICY "Users can update their own tags" ON public.tags
FOR UPDATE USING (
  auth.uid() = user_id
  AND company_id = public.get_user_company_id(auth.uid())
);

CREATE POLICY "Users can delete their own tags" ON public.tags
FOR DELETE USING (
  auth.uid() = user_id
  AND company_id = public.get_user_company_id(auth.uid())
);

-- Update companies policy
DROP POLICY IF EXISTS "Users can view their own company" ON public.companies;

CREATE POLICY "Users can view their own company" ON public.companies
FOR SELECT USING (
  id = public.get_user_company_id(auth.uid())
);

-- Backfill company_id for existing users
-- Create a default company for existing users without one
DO $$
DECLARE
  default_company_id UUID;
BEGIN
  -- Create default company if there are users without company
  IF EXISTS (SELECT 1 FROM public.profiles WHERE company_id IS NULL) THEN
    INSERT INTO public.companies (name)
    VALUES ('Empresa Padrão')
    RETURNING id INTO default_company_id;
    
    -- Assign all users without company to the default company
    UPDATE public.profiles
    SET company_id = default_company_id
    WHERE company_id IS NULL;
    
    -- Update leads to match user's company
    UPDATE public.leads l
    SET company_id = p.company_id
    FROM public.profiles p
    WHERE l.user_id = p.id AND l.company_id IS NULL;
    
    -- Update tags to match user's company
    UPDATE public.tags t
    SET company_id = p.company_id
    FROM public.profiles p
    WHERE t.user_id = p.id AND t.company_id IS NULL;
  END IF;
END $$;