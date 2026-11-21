-- ============================================================================
-- TRUSTGRID.AI — MASTER SUPABASE DATABASE ARCHITECTURE & SETUP SCRIPT
-- Project ID: ndalgvpvpzwrqoikkpyb (WebMinning_DB_TG)
-- Base API: https://ndalgvpvpzwrqoikkpyb.supabase.co
-- Instructions: Copy and paste this entire script into:
-- Supabase Dashboard -> SQL Editor (https://supabase.com/dashboard/project/ndalgvpvpzwrqoikkpyb/sql/new)
-- and click "RUN".
-- ============================================================================

-- 0. ENABLE REQUIRED EXTENSIONS
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- ============================================================================
-- 1. USERS TABLE (Internal Operators, Architects, CRM Admins)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.users (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  email TEXT NOT NULL UNIQUE,
  full_name TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'architect' CHECK (role IN ('admin', 'architect', 'sales_engineer', 'ops', 'viewer')),
  department TEXT NOT NULL DEFAULT 'Engineering',
  is_active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_users_email ON public.users(email);
CREATE INDEX IF NOT EXISTS idx_users_role ON public.users(role);

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public all on users" ON public.users;
CREATE POLICY "Allow public all on users" ON public.users FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- 2. COMPANIES TABLE (Enterprise Accounts, Hyperscalers, Clients)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.companies (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  domain TEXT UNIQUE,
  industry TEXT DEFAULT 'Artificial Intelligence',
  employee_range TEXT DEFAULT '50-200',
  annual_revenue TEXT DEFAULT 'Undisclosed',
  gpu_capacity_mw NUMERIC(8,2) DEFAULT 0.00,
  country TEXT DEFAULT 'United States',
  city TEXT DEFAULT '',
  website TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_companies_name ON public.companies(name);
CREATE INDEX IF NOT EXISTS idx_companies_domain ON public.companies(domain);

ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public all on companies" ON public.companies;
CREATE POLICY "Allow public all on companies" ON public.companies FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- 3. CONTACTS TABLE (Stakeholders, CxOs, Systems Directors)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.contacts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  phone TEXT DEFAULT '',
  job_title TEXT DEFAULT '',
  linkedin_url TEXT DEFAULT '',
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_contacts_email ON public.contacts(email);
CREATE INDEX IF NOT EXISTS idx_contacts_company ON public.contacts(company_id);

ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public all on contacts" ON public.contacts;
CREATE POLICY "Allow public all on contacts" ON public.contacts FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- 4. CAMPAIGNS TABLE (Marketing, Ads, Organic, LinkedIn, Inbound)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.campaigns (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  code TEXT NOT NULL UNIQUE,
  channel TEXT NOT NULL DEFAULT 'Website',
  utm_source TEXT DEFAULT '',
  utm_medium TEXT DEFAULT '',
  utm_campaign TEXT DEFAULT '',
  budget NUMERIC(12,2) DEFAULT 0.00,
  spend NUMERIC(12,2) DEFAULT 0.00,
  impressions INTEGER DEFAULT 0,
  clicks INTEGER DEFAULT 0,
  leads_count INTEGER DEFAULT 0,
  conversions_count INTEGER DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'ACTIVE' CHECK (status IN ('DRAFT', 'ACTIVE', 'PAUSED', 'COMPLETED')),
  start_date DATE,
  end_date DATE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_campaigns_code ON public.campaigns(code);
CREATE INDEX IF NOT EXISTS idx_campaigns_utm ON public.campaigns(utm_campaign, utm_source);

ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public all on campaigns" ON public.campaigns;
CREATE POLICY "Allow public all on campaigns" ON public.campaigns FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- 5. ACTIVITIES TABLE (Interactions, Touchpoints, Chat, Calls, Sync Events)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id TEXT,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  metadata_json JSONB DEFAULT '{}'::jsonb,
  performed_by TEXT DEFAULT 'System',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activities_lead ON public.activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_activities_type ON public.activities(type);
CREATE INDEX IF NOT EXISTS idx_activities_created ON public.activities(created_at DESC);

ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public all on activities" ON public.activities;
CREATE POLICY "Allow public all on activities" ON public.activities FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- 6. TASKS TABLE (SLA Follow-Up Workflows, Action Items)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id TEXT,
  assigned_to UUID REFERENCES public.users(id) ON DELETE SET NULL,
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  due_date TIMESTAMPTZ,
  priority TEXT NOT NULL DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')),
  status TEXT NOT NULL DEFAULT 'PENDING' CHECK (status IN ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED')),
  jira_subtask_key TEXT DEFAULT '',
  completed_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_tasks_lead ON public.tasks(lead_id);
CREATE INDEX IF NOT EXISTS idx_tasks_assigned ON public.tasks(assigned_to);
CREATE INDEX IF NOT EXISTS idx_tasks_status ON public.tasks(status);

ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public all on tasks" ON public.tasks;
CREATE POLICY "Allow public all on tasks" ON public.tasks FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- 7. WEBSITE_EVENTS TABLE (Behavioral Analytics: Clicks, Scroll, Dwell, Telemetry)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.website_events (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  event_id UUID DEFAULT uuid_generate_v4(),
  session_id TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  event_type TEXT NOT NULL,
  page_path TEXT NOT NULL,
  page_title TEXT DEFAULT '',
  element_id TEXT DEFAULT '',
  element_text TEXT DEFAULT '',
  scroll_depth_percent INTEGER DEFAULT 0,
  time_on_page_seconds INTEGER DEFAULT 0,
  metadata_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_web_events_session ON public.website_events(session_id);
CREATE INDEX IF NOT EXISTS idx_web_events_visitor ON public.website_events(visitor_id);
CREATE INDEX IF NOT EXISTS idx_web_events_type ON public.website_events(event_type);
CREATE INDEX IF NOT EXISTS idx_web_events_path ON public.website_events(page_path);
CREATE INDEX IF NOT EXISTS idx_web_events_created ON public.website_events(created_at DESC);

ALTER TABLE public.website_events ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public all on website_events" ON public.website_events;
CREATE POLICY "Allow public all on website_events" ON public.website_events FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- 8. JIRA_SYNC_LOGS TABLE (Jira Ticket, Subtask, & Status Synchronization Ledger)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.jira_sync_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id TEXT,
  action TEXT NOT NULL,
  status TEXT NOT NULL,
  jira_issue_key TEXT DEFAULT '',
  request_payload JSONB DEFAULT '{}'::jsonb,
  response_payload JSONB DEFAULT '{}'::jsonb,
  retry_count INTEGER DEFAULT 0,
  error_message TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_jira_sync_lead ON public.jira_sync_logs(lead_id);
CREATE INDEX IF NOT EXISTS idx_jira_sync_status ON public.jira_sync_logs(status);
CREATE INDEX IF NOT EXISTS idx_jira_sync_created ON public.jira_sync_logs(created_at DESC);

ALTER TABLE public.jira_sync_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public all on jira_sync_logs" ON public.jira_sync_logs;
CREATE POLICY "Allow public all on jira_sync_logs" ON public.jira_sync_logs FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- 9. GOOGLE_SHEET_SYNC_LOGS TABLE (Google Sheets Real-Time Sync & Retry Queue)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.google_sheet_sync_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id TEXT,
  sheet_name TEXT NOT NULL DEFAULT 'Sheet1',
  status TEXT NOT NULL,
  row_id TEXT DEFAULT '',
  request_payload JSONB DEFAULT '{}'::jsonb,
  response_payload JSONB DEFAULT '{}'::jsonb,
  retry_count INTEGER DEFAULT 0,
  error_message TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sheet_sync_lead ON public.google_sheet_sync_logs(lead_id);
CREATE INDEX IF NOT EXISTS idx_sheet_sync_status ON public.google_sheet_sync_logs(status);
CREATE INDEX IF NOT EXISTS idx_sheet_sync_created ON public.google_sheet_sync_logs(created_at DESC);

ALTER TABLE public.google_sheet_sync_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public all on google_sheet_sync_logs" ON public.google_sheet_sync_logs;
CREATE POLICY "Allow public all on google_sheet_sync_logs" ON public.google_sheet_sync_logs FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- 10. AUDIT_LOGS TABLE (Immutable Change & Governance Ledger)
-- ============================================================================
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL,
  actor TEXT DEFAULT 'System',
  old_state JSONB DEFAULT NULL,
  new_state JSONB DEFAULT NULL,
  ip_address TEXT DEFAULT '127.0.0.1',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_entity ON public.audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_action ON public.audit_logs(action);
CREATE INDEX IF NOT EXISTS idx_audit_created ON public.audit_logs(created_at DESC);

ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;
DROP POLICY IF EXISTS "Allow public all on audit_logs" ON public.audit_logs;
CREATE POLICY "Allow public all on audit_logs" ON public.audit_logs FOR ALL USING (true) WITH CHECK (true);

-- ============================================================================
-- 11. AUTOMATION PROCEDURES & TRIGGERS
-- ============================================================================
CREATE OR REPLACE FUNCTION public.fn_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_timestamp ON public.users;
CREATE TRIGGER trg_users_timestamp BEFORE UPDATE ON public.users
FOR EACH ROW EXECUTE FUNCTION public.fn_set_timestamp();

DROP TRIGGER IF EXISTS trg_companies_timestamp ON public.companies;
CREATE TRIGGER trg_companies_timestamp BEFORE UPDATE ON public.companies
FOR EACH ROW EXECUTE FUNCTION public.fn_set_timestamp();

DROP TRIGGER IF EXISTS trg_contacts_timestamp ON public.contacts;
CREATE TRIGGER trg_contacts_timestamp BEFORE UPDATE ON public.contacts
FOR EACH ROW EXECUTE FUNCTION public.fn_set_timestamp();

DROP TRIGGER IF EXISTS trg_campaigns_timestamp ON public.campaigns;
CREATE TRIGGER trg_campaigns_timestamp BEFORE UPDATE ON public.campaigns
FOR EACH ROW EXECUTE FUNCTION public.fn_set_timestamp();

DROP TRIGGER IF EXISTS trg_tasks_timestamp ON public.tasks;
CREATE TRIGGER trg_tasks_timestamp BEFORE UPDATE ON public.tasks
FOR EACH ROW EXECUTE FUNCTION public.fn_set_timestamp();

-- ============================================================================
-- 12. SEED DEFAULT ADMIN & CAMPAIGN DATA (Idempotent ON CONFLICT DO NOTHING)
-- ============================================================================
INSERT INTO public.users (email, full_name, role, department)
VALUES
  ('poojasri@trustgrid.ai', 'Poojasri Lead Architect', 'admin', 'Architecture Leadership'),
  ('system@trustgrid.ai', 'TRUSTGRID Automation Engine', 'ops', 'Infrastructure Ops')
ON CONFLICT (email) DO NOTHING;

INSERT INTO public.campaigns (name, code, channel, utm_source, utm_campaign, status)
VALUES
  ('Inbound Direct Website', 'CMP-DIRECT-WEB', 'Website', 'direct', 'general_inbound', 'ACTIVE'),
  ('GPU Cluster Engineering Campaign', 'CMP-GPU-500MW', 'Search & LinkedIn', 'linkedin', 'gpu_cluster_500mw', 'ACTIVE'),
  ('Lossless 800G Networking Whitepaper', 'CMP-800G-ROCEV2', 'Whitepaper', 'organic', 'lossless_rocev2_fabrics', 'ACTIVE')
ON CONFLICT (code) DO NOTHING;

-- ============================================================================
-- 13. VERIFICATION QUERY
-- ============================================================================
SELECT
  table_name,
  (SELECT count(*) FROM information_schema.columns WHERE table_name = t.table_name) AS column_count
FROM information_schema.tables t
WHERE table_schema = 'public'
  AND table_name IN (
    'users', 'companies', 'contacts', 'campaigns', 'activities',
    'tasks', 'website_events', 'jira_sync_logs', 'google_sheet_sync_logs', 'audit_logs'
  )
ORDER BY table_name;
