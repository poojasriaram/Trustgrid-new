-- ============================================================================
-- TRUSTGRID.AI DIGITAL PRESENCE MANAGEMENT SYSTEM
-- Schema Migration: 20261120000000_digital_presence_management_system.sql
-- Enterprise Multi-Entity Architecture: Leads, Companies, Contacts, Campaigns,
-- Behavior Tracking, Dual-Sync Logging (Jira + Sheets), and Master Audit Trails
-- ============================================================================

-- Enable UUID extension if not already enabled
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ----------------------------------------------------------------------------
-- 1. USERS (Internal Operators, Architects, CRM Admins)
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 2. COMPANIES (Enterprise Accounts, Hyperscalers, Clients)
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 3. CONTACTS (Stakeholders, CxOs, Systems Directors)
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 4. CAMPAIGNS (Marketing, Ads, Organic, LinkedIn, Webinars)
-- ----------------------------------------------------------------------------
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

-- ----------------------------------------------------------------------------
-- 5. LEADS (Central Unified Ingestion & CRM Pipeline)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.leads (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_code TEXT UNIQUE,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT DEFAULT '',
  company_name TEXT DEFAULT '',
  company_id UUID REFERENCES public.companies(id) ON DELETE SET NULL,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  campaign_id UUID REFERENCES public.campaigns(id) ON DELETE SET NULL,
  source TEXT NOT NULL DEFAULT 'Website Forms',
  channel TEXT NOT NULL DEFAULT 'Inbound',
  service_interest TEXT DEFAULT 'Enterprise AI Infrastructure',
  message TEXT DEFAULT '',
  utm_source TEXT DEFAULT '',
  utm_medium TEXT DEFAULT '',
  utm_campaign TEXT DEFAULT '',
  utm_term TEXT DEFAULT '',
  utm_content TEXT DEFAULT '',
  page_url TEXT DEFAULT '',
  referrer TEXT DEFAULT '',
  ip_masked TEXT DEFAULT '0.0.***.***',
  visitor_id TEXT DEFAULT '',
  session_id TEXT DEFAULT '',
  status TEXT NOT NULL DEFAULT 'NEW' CHECK (status IN ('NEW', 'CONTACTED', 'QUALIFIED', 'PROPOSAL_SENT', 'NEGOTIATING', 'CONVERTED', 'UNQUALIFIED')),
  priority TEXT NOT NULL DEFAULT 'MEDIUM' CHECK (priority IN ('LOW', 'MEDIUM', 'HIGH', 'URGENT')),
  estimated_value NUMERIC(14,2) DEFAULT 0.00,
  jira_issue_key TEXT DEFAULT '',
  jira_status TEXT DEFAULT 'PENDING',
  google_sheet_row_id TEXT DEFAULT '',
  google_sheet_status TEXT DEFAULT 'SYNCED',
  is_test_lead BOOLEAN DEFAULT FALSE,
  metadata_json JSONB DEFAULT '{}'::jsonb,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_leads_email ON public.leads(email);
CREATE INDEX IF NOT EXISTS idx_leads_status ON public.leads(status);
CREATE INDEX IF NOT EXISTS idx_leads_source ON public.leads(source);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON public.leads(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_leads_campaign ON public.leads(campaign_id);
CREATE INDEX IF NOT EXISTS idx_leads_company ON public.leads(company_id);
CREATE INDEX IF NOT EXISTS idx_leads_jira ON public.leads(jira_issue_key);

-- ----------------------------------------------------------------------------
-- 6. ACTIVITIES (Interactions, Touchpoints, Chat, Calls, Sync Events)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.activities (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  contact_id UUID REFERENCES public.contacts(id) ON DELETE SET NULL,
  type TEXT NOT NULL CHECK (type IN ('PAGE_VIEW', 'FORM_SUBMIT', 'CHAT_MESSAGE', 'CALENDAR_BOOKING', 'CALL', 'EMAIL', 'JIRA_SYNC', 'SHEET_SYNC', 'STATUS_CHANGE', 'NOTE')),
  title TEXT NOT NULL,
  description TEXT DEFAULT '',
  metadata_json JSONB DEFAULT '{}'::jsonb,
  performed_by TEXT DEFAULT 'System',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_activities_lead ON public.activities(lead_id);
CREATE INDEX IF NOT EXISTS idx_activities_type ON public.activities(type);
CREATE INDEX IF NOT EXISTS idx_activities_created ON public.activities(created_at DESC);

-- ----------------------------------------------------------------------------
-- 7. TASKS (SLA 7-Step Follow-Up Workflows, Action Items)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.tasks (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
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

-- ----------------------------------------------------------------------------
-- 8. WEBSITE_EVENTS (Behavioral Analytics: Clicks, Scroll, Dwell, Downloads)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.website_events (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  event_id UUID DEFAULT uuid_generate_v4() UNIQUE,
  session_id TEXT NOT NULL,
  visitor_id TEXT NOT NULL,
  event_type TEXT NOT NULL CHECK (event_type IN ('PAGE_VIEW', 'BUTTON_CLICK', 'DOWNLOAD', 'SCROLL_DEPTH', 'FORM_START', 'FORM_COMPLETE', 'EXIT_PAGE', 'DWELL_TIME', 'CHAT_ENGAGE')),
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

-- ----------------------------------------------------------------------------
-- 9. FORM_SUBMISSIONS (Immutable Raw Ingestion Ledger & Anti-Spam Gate)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.form_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE SET NULL,
  form_id TEXT NOT NULL,
  form_name TEXT NOT NULL,
  form_variant TEXT DEFAULT 'standard',
  page_url TEXT NOT NULL,
  payload_json JSONB NOT NULL DEFAULT '{}'::jsonb,
  validation_status TEXT NOT NULL DEFAULT 'VALID' CHECK (validation_status IN ('VALID', 'INVALID', 'SPAM_REJECTED')),
  spam_score NUMERIC(4,2) DEFAULT 0.00,
  is_honeypot_caught BOOLEAN DEFAULT FALSE,
  ip_masked TEXT DEFAULT '0.0.***.***',
  user_agent TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_form_sub_lead ON public.form_submissions(lead_id);
CREATE INDEX IF NOT EXISTS idx_form_sub_form ON public.form_submissions(form_id);
CREATE INDEX IF NOT EXISTS idx_form_sub_created ON public.form_submissions(created_at DESC);

-- ----------------------------------------------------------------------------
-- 10. JIRA_SYNC_LOGS (Jira Ticket, Subtask, & Status Synchronization Ledger)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.jira_sync_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  action TEXT NOT NULL CHECK (action IN ('CREATE_ISSUE', 'UPDATE_ISSUE', 'CREATE_SUBTASK', 'STATUS_SYNC', 'WEBHOOK_CALLBACK', 'RETRY')),
  status TEXT NOT NULL CHECK (status IN ('PENDING', 'SUCCESS', 'FAILED', 'RETRYING', 'SKIPPED')),
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

-- ----------------------------------------------------------------------------
-- 11. GOOGLE_SHEET_SYNC_LOGS (Google Sheets Dual-Write Ledger & Retry Queue)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.google_sheet_sync_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  lead_id UUID REFERENCES public.leads(id) ON DELETE CASCADE,
  sheet_name TEXT NOT NULL DEFAULT 'Sheet1',
  row_id TEXT DEFAULT '',
  action TEXT NOT NULL DEFAULT 'INSERT' CHECK (action IN ('INSERT', 'UPDATE', 'RESYNC')),
  status TEXT NOT NULL CHECK (status IN ('SUCCESS', 'FAILED', 'RETRYING')),
  retry_count INTEGER DEFAULT 0,
  error_message TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_sheet_sync_lead ON public.google_sheet_sync_logs(lead_id);
CREATE INDEX IF NOT EXISTS idx_sheet_sync_status ON public.google_sheet_sync_logs(status);

-- ----------------------------------------------------------------------------
-- 12. AUDIT_LOGS (Master Enterprise Compliance & Security Change Ledger)
-- ----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  action TEXT NOT NULL CHECK (action IN ('CREATE', 'UPDATE', 'DELETE', 'STATUS_TRANSITION', 'SYNC_DISPATCH', 'SECURITY_ALERT')),
  actor TEXT NOT NULL DEFAULT 'System',
  actor_role TEXT DEFAULT 'system',
  old_state JSONB DEFAULT NULL,
  new_state JSONB DEFAULT NULL,
  ip_address TEXT DEFAULT '',
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_entity ON public.audit_logs(entity_type, entity_id);
CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON public.audit_logs(created_at DESC);

-- ============================================================================
-- AUTOMATED TRIGGERS & LIFECYCLE PROCEDURES
-- ============================================================================

-- A. Generic Timestamp Updater Trigger
CREATE OR REPLACE FUNCTION public.fn_set_timestamp()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_users_timestamp ON public.users;
CREATE TRIGGER trg_users_timestamp BEFORE UPDATE ON public.users FOR EACH ROW EXECUTE FUNCTION public.fn_set_timestamp();

DROP TRIGGER IF EXISTS trg_companies_timestamp ON public.companies;
CREATE TRIGGER trg_companies_timestamp BEFORE UPDATE ON public.companies FOR EACH ROW EXECUTE FUNCTION public.fn_set_timestamp();

DROP TRIGGER IF EXISTS trg_contacts_timestamp ON public.contacts;
CREATE TRIGGER trg_contacts_timestamp BEFORE UPDATE ON public.contacts FOR EACH ROW EXECUTE FUNCTION public.fn_set_timestamp();

DROP TRIGGER IF EXISTS trg_campaigns_timestamp ON public.campaigns;
CREATE TRIGGER trg_campaigns_timestamp BEFORE UPDATE ON public.campaigns FOR EACH ROW EXECUTE FUNCTION public.fn_set_timestamp();

DROP TRIGGER IF EXISTS trg_leads_timestamp ON public.leads;
CREATE TRIGGER trg_leads_timestamp BEFORE UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.fn_set_timestamp();

DROP TRIGGER IF EXISTS trg_tasks_timestamp ON public.tasks;
CREATE TRIGGER trg_tasks_timestamp BEFORE UPDATE ON public.tasks FOR EACH ROW EXECUTE FUNCTION public.fn_set_timestamp();

-- B. Lead Activity & Audit Auto-Logger Trigger
CREATE OR REPLACE FUNCTION public.fn_lead_lifecycle_tracker()
RETURNS TRIGGER AS $$
BEGIN
  -- On Insert
  IF (TG_OP = 'INSERT') THEN
    INSERT INTO public.activities (lead_id, type, title, description, performed_by)
    VALUES (
      NEW.id,
      'FORM_SUBMIT',
      'Lead Created via ' || NEW.source,
      'New inbound lead captured for ' || COALESCE(NEW.company_name, 'Enterprise Partner'),
      'LeadOrchestrator'
    );
    INSERT INTO public.audit_logs (entity_type, entity_id, action, actor, new_state)
    VALUES ('LEAD', NEW.id::text, 'CREATE', 'System', to_jsonb(NEW));
  END IF;

  -- On Update (Status change)
  IF (TG_OP = 'UPDATE' AND OLD.status IS DISTINCT FROM NEW.status) THEN
    INSERT INTO public.activities (lead_id, type, title, description, performed_by)
    VALUES (
      NEW.id,
      'STATUS_CHANGE',
      'Status Changed: ' || OLD.status || ' → ' || NEW.status,
      'Lifecycle stage updated.',
      'CRM System'
    );
    INSERT INTO public.audit_logs (entity_type, entity_id, action, actor, old_state, new_state)
    VALUES ('LEAD', NEW.id::text, 'STATUS_TRANSITION', 'CRM System', to_jsonb(OLD), to_jsonb(NEW));
  END IF;

  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_lead_lifecycle ON public.leads;
CREATE TRIGGER trg_lead_lifecycle AFTER INSERT OR UPDATE ON public.leads FOR EACH ROW EXECUTE FUNCTION public.fn_lead_lifecycle_tracker();

-- ============================================================================
-- ANALYTICAL REPORTING VIEWS
-- ============================================================================

-- 1. Campaign & Lead Attribution Summary View
CREATE OR REPLACE VIEW public.v_lead_attribution_summary AS
SELECT
  COALESCE(c.name, l.utm_campaign, 'Direct / Organic') AS campaign_name,
  l.source,
  l.utm_source,
  l.utm_medium,
  COUNT(l.id) AS total_leads,
  COUNT(CASE WHEN l.status = 'CONVERTED' THEN 1 END) AS converted_leads,
  ROUND(COUNT(CASE WHEN l.status = 'CONVERTED' THEN 1 END)::NUMERIC / NULLIF(COUNT(l.id), 0) * 100, 2) AS conversion_rate_percent,
  COALESCE(SUM(l.estimated_value), 0.00) AS total_pipeline_value
FROM public.leads l
LEFT JOIN public.campaigns c ON l.campaign_id = c.id
GROUP BY 1, 2, 3, 4;

-- 2. Daily Conversion Metrics View
CREATE OR REPLACE VIEW public.v_daily_conversion_metrics AS
SELECT
  DATE_TRUNC('day', created_at)::DATE AS date_day,
  COUNT(id) AS total_leads_captured,
  COUNT(DISTINCT email) AS unique_prospects,
  COUNT(CASE WHEN status IN ('QUALIFIED', 'PROPOSAL_SENT', 'CONVERTED') THEN 1 END) AS qualified_leads,
  COUNT(CASE WHEN status = 'CONVERTED' THEN 1 END) AS closed_deals
FROM public.leads
GROUP BY 1
ORDER BY 1 DESC;

-- 3. Dual-Sync Health & Failure Queue View
CREATE OR REPLACE VIEW public.v_sync_health_overview AS
SELECT
  'Jira Integration' AS service_name,
  COUNT(id) AS total_dispatches,
  COUNT(CASE WHEN status = 'SUCCESS' THEN 1 END) AS successful_syncs,
  COUNT(CASE WHEN status = 'FAILED' THEN 1 END) AS failed_syncs,
  ROUND(COUNT(CASE WHEN status = 'SUCCESS' THEN 1 END)::NUMERIC / NULLIF(COUNT(id), 0) * 100, 2) AS health_percent
FROM public.jira_sync_logs
UNION ALL
SELECT
  'Google Sheets Dual-Write' AS service_name,
  COUNT(id) AS total_dispatches,
  COUNT(CASE WHEN status = 'SUCCESS' THEN 1 END) AS successful_syncs,
  COUNT(CASE WHEN status = 'FAILED' THEN 1 END) AS failed_syncs,
  ROUND(COUNT(CASE WHEN status = 'SUCCESS' THEN 1 END)::NUMERIC / NULLIF(COUNT(id), 0) * 100, 2) AS health_percent
FROM public.google_sheet_sync_logs;

-- ============================================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================================

ALTER TABLE public.users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.companies ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.contacts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.campaigns ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.activities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tasks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.form_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.jira_sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.google_sheet_sync_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.audit_logs ENABLE ROW LEVEL SECURITY;

-- Anonymous users (Website visitors) can insert leads, form submissions, and analytics events
CREATE POLICY p_anon_insert_leads ON public.leads FOR INSERT TO anon WITH CHECK (TRUE);
CREATE POLICY p_anon_insert_forms ON public.form_submissions FOR INSERT TO anon WITH CHECK (TRUE);
CREATE POLICY p_anon_insert_events ON public.website_events FOR INSERT TO anon WITH CHECK (TRUE);

-- Authenticated internal operators have full CRUD on CRM entities
CREATE POLICY p_auth_all_leads ON public.leads FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_auth_all_companies ON public.companies FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_auth_all_contacts ON public.contacts FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_auth_all_campaigns ON public.campaigns FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_auth_all_activities ON public.activities FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_auth_all_tasks ON public.tasks FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_auth_all_sync_jira ON public.jira_sync_logs FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_auth_all_sync_sheets ON public.google_sheet_sync_logs FOR ALL TO authenticated USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_auth_all_audit ON public.audit_logs FOR SELECT TO authenticated USING (TRUE);

-- Service role has unrestricted administrative access across all tables
CREATE POLICY p_service_all_users ON public.users FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_service_all_leads ON public.leads FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_service_all_companies ON public.companies FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_service_all_contacts ON public.contacts FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_service_all_campaigns ON public.campaigns FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_service_all_activities ON public.activities FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_service_all_tasks ON public.tasks FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_service_all_events ON public.website_events FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_service_all_forms ON public.form_submissions FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_service_all_jira_sync ON public.jira_sync_logs FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_service_all_sheet_sync ON public.google_sheet_sync_logs FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
CREATE POLICY p_service_all_audit ON public.audit_logs FOR ALL TO service_role USING (TRUE) WITH CHECK (TRUE);
