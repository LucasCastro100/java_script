-- Corrigir a função get_lead_stats para filtrar por company_id em vez de user_id
CREATE OR REPLACE FUNCTION public.get_lead_stats(p_user_id uuid)
RETURNS json
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path TO 'public'
AS $$
DECLARE
  result JSON;
  v_company_id uuid;
BEGIN
  -- Obter o company_id do usuário
  SELECT company_id INTO v_company_id
  FROM public.profiles
  WHERE id = p_user_id;
  
  -- Retornar estatísticas filtradas por company_id
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
  WHERE company_id = v_company_id;
  
  RETURN result;
END;
$$;