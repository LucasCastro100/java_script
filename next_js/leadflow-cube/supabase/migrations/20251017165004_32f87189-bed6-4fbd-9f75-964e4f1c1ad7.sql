-- Create enum for lead status
CREATE TYPE public.lead_status AS ENUM ('novo', 'contato', 'proposta', 'negociacao', 'ganho', 'perdido');

-- Create leads table
CREATE TABLE public.leads (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nome TEXT NOT NULL,
  produto TEXT NOT NULL,
  whatsapp_atendente TEXT,
  whatsapp_lead TEXT,
  localidade TEXT,
  status lead_status DEFAULT 'novo' NOT NULL,
  valor_estimado DECIMAL(10, 2),
  observacoes TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create index for faster queries
CREATE INDEX idx_leads_user_id ON public.leads(user_id);
CREATE INDEX idx_leads_status ON public.leads(status);
CREATE INDEX idx_leads_created_at ON public.leads(created_at DESC);

-- Enable RLS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;

-- RLS Policies for leads
CREATE POLICY "Users can view their own leads"
  ON public.leads
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own leads"
  ON public.leads
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own leads"
  ON public.leads
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own leads"
  ON public.leads
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create activities/notes table
CREATE TABLE public.lead_activities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE NOT NULL,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  tipo TEXT NOT NULL, -- 'nota', 'ligacao', 'email', 'reuniao', 'whatsapp'
  descricao TEXT NOT NULL,
  data_atividade TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL
);

-- Create index for activities
CREATE INDEX idx_activities_lead_id ON public.lead_activities(lead_id);
CREATE INDEX idx_activities_user_id ON public.lead_activities(user_id);

-- Enable RLS
ALTER TABLE public.lead_activities ENABLE ROW LEVEL SECURITY;

-- RLS Policies for activities
CREATE POLICY "Users can view activities of their leads"
  ON public.lead_activities
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.leads
      WHERE leads.id = lead_activities.lead_id
      AND leads.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can create activities for their leads"
  ON public.lead_activities
  FOR INSERT
  WITH CHECK (
    auth.uid() = user_id
    AND EXISTS (
      SELECT 1 FROM public.leads
      WHERE leads.id = lead_activities.lead_id
      AND leads.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can update their own activities"
  ON public.lead_activities
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own activities"
  ON public.lead_activities
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create tags table
CREATE TABLE public.tags (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  nome TEXT NOT NULL,
  cor TEXT DEFAULT '#3b82f6',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  UNIQUE(user_id, nome)
);

-- Enable RLS
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for tags
CREATE POLICY "Users can view their own tags"
  ON public.tags
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own tags"
  ON public.tags
  FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own tags"
  ON public.tags
  FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own tags"
  ON public.tags
  FOR DELETE
  USING (auth.uid() = user_id);

-- Create lead_tags junction table (many-to-many)
CREATE TABLE public.lead_tags (
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE NOT NULL,
  tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW() NOT NULL,
  PRIMARY KEY (lead_id, tag_id)
);

-- Enable RLS
ALTER TABLE public.lead_tags ENABLE ROW LEVEL SECURITY;

-- RLS Policies for lead_tags
CREATE POLICY "Users can view tags of their leads"
  ON public.lead_tags
  FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.leads
      WHERE leads.id = lead_tags.lead_id
      AND leads.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can add tags to their leads"
  ON public.lead_tags
  FOR INSERT
  WITH CHECK (
    EXISTS (
      SELECT 1 FROM public.leads
      WHERE leads.id = lead_tags.lead_id
      AND leads.user_id = auth.uid()
    )
  );

CREATE POLICY "Users can remove tags from their leads"
  ON public.lead_tags
  FOR DELETE
  USING (
    EXISTS (
      SELECT 1 FROM public.leads
      WHERE leads.id = lead_tags.lead_id
      AND leads.user_id = auth.uid()
    )
  );

-- Trigger for updating leads.updated_at
CREATE TRIGGER set_leads_updated_at
  BEFORE UPDATE ON public.leads
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Function to get lead statistics for dashboard
CREATE OR REPLACE FUNCTION public.get_lead_stats(p_user_id UUID)
RETURNS JSON
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  result JSON;
BEGIN
  SELECT json_build_object(
    'total', COUNT(*),
    'novo', COUNT(*) FILTER (WHERE status = 'novo'),
    'contato', COUNT(*) FILTER (WHERE status = 'contato'),
    'proposta', COUNT(*) FILTER (WHERE status = 'proposta'),
    'negociacao', COUNT(*) FILTER (WHERE status = 'negociacao'),
    'ganho', COUNT(*) FILTER (WHERE status = 'ganho'),
    'perdido', COUNT(*) FILTER (WHERE status = 'perdido'),
    'valor_total_ganho', COALESCE(SUM(valor_estimado) FILTER (WHERE status = 'ganho'), 0)
  )
  INTO result
  FROM public.leads
  WHERE user_id = p_user_id;
  
  RETURN result;
END;
$$;