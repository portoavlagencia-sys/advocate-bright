CREATE TABLE public.team_members (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  role text NOT NULL DEFAULT 'assistente' CHECK (role IN ('dono','gerente','marketing','financeiro','assistente')),
  name text,
  email text,
  avatar_url text,
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT ON public.team_members TO authenticated;
GRANT UPDATE (name, avatar_url) ON public.team_members TO authenticated;
GRANT ALL ON public.team_members TO service_role;
ALTER TABLE public.team_members ENABLE ROW LEVEL SECURITY;

CREATE OR REPLACE FUNCTION public.team_role(_uid uuid) RETURNS text
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT COALESCE(
    (SELECT role FROM public.team_members WHERE user_id = _uid),
    CASE WHEN public.has_role(_uid,'admin') THEN 'dono' END
  )
$$;

CREATE OR REPLACE FUNCTION public.can_access(_uid uuid, _area text) RETURNS boolean
LANGUAGE sql STABLE SECURITY DEFINER SET search_path = public AS $$
  SELECT CASE public.team_role(_uid)
    WHEN 'dono' THEN true
    WHEN 'gerente' THEN true
    WHEN 'marketing' THEN _area IN ('agenda')
    WHEN 'financeiro' THEN _area IN ('financeiro')
    WHEN 'assistente' THEN _area IN ('agenda','processos')
    ELSE false END
$$;

CREATE POLICY "team read own" ON public.team_members FOR SELECT TO authenticated
  USING (user_id = auth.uid() OR public.can_access(auth.uid(),'equipe'));
CREATE POLICY "team update own" ON public.team_members FOR UPDATE TO authenticated
  USING (user_id = auth.uid()) WITH CHECK (user_id = auth.uid());

INSERT INTO public.team_members (user_id, role, email)
SELECT ur.user_id, 'dono', u.email FROM public.user_roles ur JOIN auth.users u ON u.id = ur.user_id
WHERE ur.role = 'admin' ON CONFLICT DO NOTHING;

CREATE POLICY "team agenda" ON public.appointments FOR ALL TO authenticated
  USING (public.can_access(auth.uid(),'agenda')) WITH CHECK (public.can_access(auth.uid(),'agenda'));
CREATE POLICY "team processos" ON public.cases FOR ALL TO authenticated
  USING (public.can_access(auth.uid(),'processos')) WITH CHECK (public.can_access(auth.uid(),'processos'));
CREATE POLICY "team crm" ON public.clients FOR ALL TO authenticated
  USING (public.can_access(auth.uid(),'crm')) WITH CHECK (public.can_access(auth.uid(),'crm'));
CREATE POLICY "team clients read for fin" ON public.clients FOR SELECT TO authenticated
  USING (public.can_access(auth.uid(),'financeiro'));
CREATE POLICY "team financeiro" ON public.transactions FOR ALL TO authenticated
  USING (public.can_access(auth.uid(),'financeiro')) WITH CHECK (public.can_access(auth.uid(),'financeiro'));
CREATE POLICY "team site read" ON public.site_content FOR SELECT TO authenticated USING (public.can_access(auth.uid(),'site'));
CREATE POLICY "team site insert" ON public.site_content FOR INSERT TO authenticated WITH CHECK (public.can_access(auth.uid(),'site'));
CREATE POLICY "team site update" ON public.site_content FOR UPDATE TO authenticated USING (public.can_access(auth.uid(),'site')) WITH CHECK (public.can_access(auth.uid(),'site'));
CREATE POLICY "team blog" ON public.posts FOR ALL TO authenticated
  USING (public.can_access(auth.uid(),'blog')) WITH CHECK (public.can_access(auth.uid(),'blog'));
CREATE POLICY "team media insert" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-media' AND public.can_access(auth.uid(),'site'));
CREATE POLICY "team media update" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'site-media' AND public.can_access(auth.uid(),'site'));
CREATE POLICY "team media delete" ON storage.objects FOR DELETE TO authenticated
  USING (bucket_id = 'site-media' AND public.can_access(auth.uid(),'site'));
CREATE POLICY "avatar insert own" ON storage.objects FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'site-media' AND name LIKE 'avatars/' || auth.uid()::text || '/%');
CREATE POLICY "avatar update own" ON storage.objects FOR UPDATE TO authenticated
  USING (bucket_id = 'site-media' AND name LIKE 'avatars/' || auth.uid()::text || '/%');