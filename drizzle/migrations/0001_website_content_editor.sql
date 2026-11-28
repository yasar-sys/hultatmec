CREATE TABLE public.site_content (
 id text PRIMARY KEY DEFAULT 'main',
 content jsonb NOT NULL DEFAULT '{}'::jsonb,
 revision integer NOT NULL DEFAULT 1,
 updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.site_content TO anon, authenticated;
GRANT ALL ON public.site_content TO service_role;
ALTER TABLE public.site_content ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Read public website content" ON public.site_content FOR SELECT TO anon, authenticated USING (id = 'main');
INSERT INTO public.site_content (id, content) VALUES ('main', '{}');
CREATE TABLE public.admin_login_attempts (
 key text PRIMARY KEY,
 attempts integer NOT NULL DEFAULT 0,
 window_start timestamptz NOT NULL DEFAULT now()
);
GRANT ALL ON public.admin_login_attempts TO service_role;
ALTER TABLE public.admin_login_attempts ENABLE ROW LEVEL SECURITY;
CREATE FUNCTION public.check_admin_login_limit(attempt_key text) RETURNS boolean LANGUAGE plpgsql SET search_path = public AS $$
DECLARE current_attempts integer;
BEGIN
 INSERT INTO public.admin_login_attempts (key, attempts) VALUES (attempt_key, 1)
 ON CONFLICT (key) DO UPDATE SET
 attempts = CASE WHEN admin_login_attempts.window_start < now() - interval '15 minutes' THEN 1 ELSE admin_login_attempts.attempts + 1 END,
 window_start = CASE WHEN admin_login_attempts.window_start < now() - interval '15 minutes' THEN now() ELSE admin_login_attempts.window_start END
 RETURNING attempts INTO current_attempts;
 RETURN current_attempts <= 10;
END;
$$;
REVOKE EXECUTE ON FUNCTION public.check_admin_login_limit(text) FROM public, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.check_admin_login_limit(text) TO service_role;