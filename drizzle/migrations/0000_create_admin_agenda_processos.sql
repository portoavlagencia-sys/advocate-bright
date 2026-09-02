CREATE TABLE public.appointments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  title text NOT NULL,
  client text,
  location text,
  notes text,
  starts_at timestamptz NOT NULL,
  done boolean NOT NULL DEFAULT false,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.appointments TO authenticated;
GRANT ALL ON public.appointments TO service_role;
ALTER TABLE public.appointments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own appointments select" ON public.appointments FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own appointments insert" ON public.appointments FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own appointments update" ON public.appointments FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own appointments delete" ON public.appointments FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE TABLE public.cases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL DEFAULT auth.uid(),
  number text,
  client text NOT NULL,
  area text,
  status text NOT NULL DEFAULT 'em andamento',
  next_step text,
  next_step_at date,
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

GRANT SELECT, INSERT, UPDATE, DELETE ON public.cases TO authenticated;
GRANT ALL ON public.cases TO service_role;
ALTER TABLE public.cases ENABLE ROW LEVEL SECURITY;

CREATE POLICY "own cases select" ON public.cases FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "own cases insert" ON public.cases FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own cases update" ON public.cases FOR UPDATE TO authenticated USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own cases delete" ON public.cases FOR DELETE TO authenticated USING (auth.uid() = user_id);

CREATE INDEX appointments_user_start_idx ON public.appointments (user_id, starts_at);
CREATE INDEX cases_user_idx ON public.cases (user_id, created_at DESC);