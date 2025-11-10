-- Create companies table
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS on companies
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;

-- Add company_id to profiles
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE;

-- Add company_id to leads
ALTER TABLE public.leads ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE;

-- Add company_id to tags
ALTER TABLE public.tags ADD COLUMN IF NOT EXISTS company_id UUID REFERENCES public.companies(id) ON DELETE CASCADE;

-- Create index for better performance
CREATE INDEX IF NOT EXISTS idx_profiles_company_id ON public.profiles(company_id);
CREATE INDEX IF NOT EXISTS idx_leads_company_id ON public.leads(company_id);
CREATE INDEX IF NOT EXISTS idx_tags_company_id ON public.tags(company_id);

-- RLS Policies for companies table
CREATE POLICY "Users can view their own company" ON public.companies
FOR SELECT USING (
  id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "Admins can update their own company" ON public.companies
FOR UPDATE USING (
  id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
  AND public.has_role(auth.uid(), 'admin')
);

-- Update profiles RLS policies to include company isolation
DROP POLICY IF EXISTS "Users can view their own profile" ON public.profiles;
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

CREATE POLICY "Users can view their own profile" ON public.profiles
FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Admins can view profiles from same company" ON public.profiles
FOR SELECT USING (
  public.has_role(auth.uid(), 'admin')
  AND company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
);

-- Update leads RLS policies for company isolation
DROP POLICY IF EXISTS "Users can view their own leads" ON public.leads;
DROP POLICY IF EXISTS "Users can create their own leads" ON public.leads;
DROP POLICY IF EXISTS "Users can update their own leads" ON public.leads;
DROP POLICY IF EXISTS "Users can delete their own leads" ON public.leads;

CREATE POLICY "Users can view leads from their company" ON public.leads
FOR SELECT USING (
  company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "Users can create leads for their company" ON public.leads
FOR INSERT WITH CHECK (
  auth.uid() = user_id
  AND company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "Users can update their own leads" ON public.leads
FOR UPDATE USING (
  auth.uid() = user_id
  AND company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "Users can delete their own leads" ON public.leads
FOR DELETE USING (
  auth.uid() = user_id
  AND company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
);

-- Update tags RLS policies for company isolation
DROP POLICY IF EXISTS "Users can view their own tags" ON public.tags;
DROP POLICY IF EXISTS "Users can create their own tags" ON public.tags;
DROP POLICY IF EXISTS "Users can update their own tags" ON public.tags;
DROP POLICY IF EXISTS "Users can delete their own tags" ON public.tags;

CREATE POLICY "Users can view tags from their company" ON public.tags
FOR SELECT USING (
  company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "Users can create tags for their company" ON public.tags
FOR INSERT WITH CHECK (
  auth.uid() = user_id
  AND company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "Users can update their own tags" ON public.tags
FOR UPDATE USING (
  auth.uid() = user_id
  AND company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
);

CREATE POLICY "Users can delete their own tags" ON public.tags
FOR DELETE USING (
  auth.uid() = user_id
  AND company_id IN (SELECT company_id FROM public.profiles WHERE id = auth.uid())
);

-- Update trigger to set company_id when creating leads/tags
CREATE OR REPLACE FUNCTION public.set_company_id()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.company_id IS NULL THEN
    NEW.company_id := (SELECT company_id FROM public.profiles WHERE id = auth.uid());
  END IF;
  RETURN NEW;
END;
$$;

CREATE TRIGGER set_lead_company_id
BEFORE INSERT ON public.leads
FOR EACH ROW
EXECUTE FUNCTION public.set_company_id();

CREATE TRIGGER set_tag_company_id
BEFORE INSERT ON public.tags
FOR EACH ROW
EXECUTE FUNCTION public.set_company_id();

-- Update handle_new_user to create company for first user or assign existing
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  user_company_id UUID;
BEGIN
  -- Get company_id from metadata if provided, otherwise create new company
  user_company_id := (NEW.raw_user_meta_data->>'company_id')::UUID;
  
  IF user_company_id IS NULL THEN
    -- Create new company for this user
    INSERT INTO public.companies (name)
    VALUES (COALESCE(NEW.raw_user_meta_data->>'company_name', 'Minha Empresa'))
    RETURNING id INTO user_company_id;
  END IF;
  
  -- Insert profile with company_id
  INSERT INTO public.profiles (id, email, full_name, company_id)
  VALUES (
    NEW.id,
    NEW.email,
    NEW.raw_user_meta_data->>'full_name',
    user_company_id
  );
  
  -- Assign default 'user' role
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, 'user');
  
  RETURN NEW;
END;
$$;