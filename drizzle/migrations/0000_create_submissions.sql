CREATE TABLE public.registrations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  team_name text NOT NULL, leader_name text NOT NULL, department text NOT NULL, semester text NOT NULL,
  phone text NOT NULL, email text NOT NULL, team_members text NOT NULL, idea text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.partner_inquiries (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  organization text NOT NULL, contact_name text NOT NULL, email text NOT NULL, phone text, message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
CREATE TABLE public.contact_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL, email text NOT NULL, message text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.registrations, public.partner_inquiries, public.contact_messages TO anon, authenticated;
GRANT ALL ON public.registrations, public.partner_inquiries, public.contact_messages TO service_role;
ALTER TABLE public.registrations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.partner_inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contact_messages ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can register" ON public.registrations FOR INSERT TO anon, authenticated WITH CHECK (length(team_name) BETWEEN 1 AND 100 AND length(idea) <= 500);
CREATE POLICY "Anyone can send partner inquiry" ON public.partner_inquiries FOR INSERT TO anon, authenticated WITH CHECK (length(message) <= 2000);
CREATE POLICY "Anyone can send contact message" ON public.contact_messages FOR INSERT TO anon, authenticated WITH CHECK (length(message) <= 2000);