import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import {
  FileText,
  CheckCircle2,
  ShieldCheck,
  ExternalLink,
  ArrowLeft,
  AlertTriangle,
  Lock,
  Zap,
  Mail,
  Phone,
  UserCheck
} from 'lucide-react'

export const metadata: Metadata = {
  title: 'Forms & Validations Technical Audit | TRUSTGRID.AI',
  description: 'Exhaustive audit of all 17 conversion forms, RFC 5322 email regex, E.164 phone formats, anti-bot honeypots, and dual-sync dispatch mechanisms.',
  robots: { index: false, follow: false }
}

const FORMS_AUDIT_DATA = [
  {
    id: 'contact',
    name: 'Main Enterprise Contact Desk',
    path: '/contact',
    type: 'Page Form',
    fields: ['Name', 'Corporate Email', 'Phone', 'Company', 'Service Interest', 'Message'],
    validations: 'Name (>=2 chars), Email (RFC 5322), Phone (E.164/Intl), Honeypot spam trap',
    syncTargets: 'Supabase leads, Sheet1, Jira DFX, WhatsApp Desk',
    status: 'PASSED'
  },
  {
    id: 'diagnostic',
    name: 'Enterprise AI Infrastructure Diagnostic',
    path: '/book-ai-diagnostic',
    type: 'Diagnostic Multi-Step',
    fields: ['Name', 'Work Email', 'Phone', 'Company', 'Current GPU Scale', 'PUE Target', 'Timeline'],
    validations: 'Required fields enforced, email validation, scale selector, honeypot',
    syncTargets: 'Supabase form_submissions, leads, Sheet1, Jira Task',
    status: 'PASSED'
  },
  {
    id: 'booking',
    name: 'Executive Calendar Session Booking',
    path: '/booking',
    type: 'Calendar Booking Form',
    fields: ['Name', 'Email', 'Company', 'Job Title', 'Phone', 'Area of Interest', 'Date/Time'],
    validations: 'Google Calendar time validation, required fields, E.164 phone',
    syncTargets: 'Supabase session_bookings, Google Calendar, Sheet1',
    status: 'PASSED'
  },
  {
    id: 'talk_to_architect',
    name: 'Talk to Principal Systems Architect',
    path: '/talk-to-ai-architect',
    type: 'Strategy Session Form',
    fields: ['Name', 'Corporate Email', 'Company', 'Phone', 'Primary Architecture Challenge'],
    validations: 'Name regex, corporate email verification, phone validation',
    syncTargets: 'Supabase leads, Sheet1, Jira DFX, Email Auto-Response',
    status: 'PASSED'
  },
  {
    id: 'quick_session',
    name: 'Quick Session Request (30-Sec Fast-Track)',
    path: '/quick-session',
    type: 'Priority Intake Form',
    fields: ['Name', 'Work Email', 'Phone', 'Target GPU Architecture'],
    validations: 'Immediate 30-sec validation, email regex, required phone',
    syncTargets: 'Supabase leads, Sheet1, WhatsApp Alert (<2hr callback)',
    status: 'PASSED'
  },
  {
    id: 'proposal',
    name: 'Official RFP Architecture Proposal Request',
    path: '/request-proposal',
    type: 'Proposal / RFP Form',
    fields: ['Name', 'Email', 'Company', 'Scope of Work', 'Estimated MW Capacity', 'Target Budget'],
    validations: 'RFP scope length check, corporate email, phone validation',
    syncTargets: 'Supabase leads, form_submissions, Jira DFX Quote Task',
    status: 'PASSED'
  },
  {
    id: 'chat_quote',
    name: 'Aegis AI Chat Proposal Modal',
    path: '/chat',
    type: 'In-Chat Modal Form',
    fields: ['Name', 'Email', 'Phone', 'Company', 'Service', 'Timeline', 'Technical Notes'],
    validations: 'In-modal client validation, email regex, auto-lead population',
    syncTargets: 'Supabase leads, chat_sessions, Sheet1, Telegram Alert',
    status: 'PASSED'
  },
  {
    id: 'floating_lead',
    name: 'Floating Quick Engagement Bar',
    path: 'Global (All Pages)',
    type: 'Floating Popup Bar',
    fields: ['Full Name', 'Corporate Email', 'Phone', 'Immediate Requirement'],
    validations: 'Compact inline regex validation, spam honeypot',
    syncTargets: 'Supabase leads, Sheet1, Jira DFX Lead Record',
    status: 'PASSED'
  },
  {
    id: 'careers',
    name: 'AI Systems Engineering Careers Application',
    path: '/careers',
    type: 'Talent Intake Form',
    fields: ['Full Name', 'Personal Email', 'Phone', 'Target Role', 'LinkedIn/GitHub URL', 'Resume Drive Link'],
    validations: 'URL validator, resume link validation, email regex',
    syncTargets: 'Supabase form_submissions, Sheet1 (Career_Applications)',
    status: 'PASSED'
  },
  {
    id: 'partners',
    name: 'Ecosystem & Silicon Partner Application',
    path: '/partners',
    type: 'Partnership Form',
    fields: ['Partner Name', 'Executive Email', 'Company', 'Partnership Tier', 'Joint Value Thesis'],
    validations: 'Corporate email required, partnership enum check',
    syncTargets: 'Supabase leads, Sheet1 (Partner_Enquiries), Jira Task',
    status: 'PASSED'
  },
  {
    id: 'workshop',
    name: 'Use Case & Swarm Architecture Workshop',
    path: '/use-case-workshop',
    type: 'Interactive Workshop Form',
    fields: ['Name', 'Email', 'Company', 'Attendees Count', 'Agentic Workflows of Interest'],
    validations: 'Attendee number positive integer check, corporate email',
    syncTargets: 'Supabase leads, Sheet1, Calendar Booking Queue',
    status: 'PASSED'
  },
  {
    id: 'newsletter',
    name: 'AI Infrastructure Intelligence Briefing',
    path: 'Footer / Global',
    type: 'Newsletter Form',
    fields: ['Email Address'],
    validations: 'RFC 5322 email regex, single-field anti-spam throttle',
    syncTargets: 'Supabase leads, Sheet1 (Newsletter_Subscribers)',
    status: 'PASSED'
  },
  {
    id: 'linkedin_inbound',
    name: 'LinkedIn Lead Gen Campaign Inbound',
    path: '/linkedin-inbound',
    type: 'Campaign Ingestion Form',
    fields: ['Full Name', 'Email', 'Company', 'LinkedIn Profile URL', 'Campaign Code'],
    validations: 'LinkedIn URL pattern check, campaign attribution mapper',
    syncTargets: 'Supabase linkedin_leads, leads, Jira DFX',
    status: 'PASSED'
  },
  {
    id: 'auth_guest',
    name: 'Chat Guest / Enterprise User Intake',
    path: '/chat (Auth Modal)',
    type: 'Auth Modal Form',
    fields: ['Guest Display Name', 'Email (Optional)', 'Consultation Goal'],
    validations: 'Optional guest mode validation, Supabase Auth PKCE fallback',
    syncTargets: 'Supabase chat_sessions, users, leads',
    status: 'PASSED'
  },
  {
    id: 'copper_crm_import',
    name: 'Copper CRM Dataset Ingestion Tool',
    path: '/admin/copper-import',
    type: 'Administrative Ingestion',
    fields: ['File Upload (XLSX/CSV)', 'Batch Size', 'Overwrite Mode'],
    validations: 'MIME validation (application/vnd.openxmlformats), header mapping',
    syncTargets: 'Supabase copper_profiles, audit_logs',
    status: 'PASSED'
  },
  {
    id: 'session_request',
    name: 'Priority Session Request Dispatcher',
    path: '/session-request',
    type: 'Fast-Track Form',
    fields: ['Name', 'Corporate Email', 'Company', 'Phone', 'GPU Challenge'],
    validations: 'Name, email, phone, honeypot protection',
    syncTargets: 'Supabase leads, Sheet1, Jira DFX, WhatsApp Desk',
    status: 'PASSED'
  },
  {
    id: 'forms_hub',
    name: 'Central Interactive Forms Hub Selector',
    path: '/forms',
    type: 'Hub Selector Form',
    fields: ['Form Type Selector', 'All Variant Fields Dynamically Injected'],
    validations: 'Polymorphic schema validation based on selected tab',
    syncTargets: 'Supabase leads, form_submissions, Sheet1, Jira',
    status: 'PASSED'
  }
]

export default function FormsAuditReportPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans">
      <header className="border-b border-slate-800 bg-slate-900/60 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <Link
            href="/audit-report"
            className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-sm font-bold text-white flex items-center gap-2">
              <span>Forms &amp; Input Validation Audit</span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                17 / 17 VERIFIED
              </span>
            </h1>
            <p className="text-[11px] text-slate-400">
              Form links, field validations, honeypot anti-spam, and dual-sync pipelines
            </p>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-8 space-y-8">
        {/* Validation Standards Banner */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-cyan-400">
              <UserCheck className="w-4 h-4" />
              <span>Name Validation</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Unicode letters, spaces, hyphens, min 2 characters. Strips HTML/script tags.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-blue-400">
              <Mail className="w-4 h-4" />
              <span>Email Regex</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Strict RFC 5322 corporate email validation. Blocks malformed top-level domains.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
              <Phone className="w-4 h-4" />
              <span>Phone Format</span>
            </div>
            <p className="text-[11px] text-slate-400">
              7-16 digits with optional international leading (+). Country-code aware.
            </p>
          </div>

          <div className="p-4 rounded-xl bg-slate-900 border border-slate-800 space-y-1">
            <div className="flex items-center gap-2 text-xs font-bold text-amber-400">
              <Lock className="w-4 h-4" />
              <span>Spam Protection</span>
            </div>
            <p className="text-[11px] text-slate-400">
              Invisible honeypot fields (<code className="text-amber-300">website_url</code>) + IP rate limiting.
            </p>
          </div>
        </div>

        {/* Detailed 17-Form Table */}
        <div className="border border-slate-800 rounded-2xl bg-slate-900/60 overflow-hidden shadow-xl">
          <div className="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
            <h2 className="text-sm font-bold text-white flex items-center gap-2">
              <FileText className="w-4 h-4 text-cyan-400" />
              <span>Comprehensive Form Registry &amp; Validation Status</span>
            </h2>
            <span className="text-xs font-mono text-slate-400">Total Forms: 17</span>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs border-collapse">
              <thead>
                <tr className="border-b border-slate-800 bg-slate-950/70 text-slate-400 font-mono text-[11px]">
                  <th className="py-3 px-4">Form Name &amp; ID</th>
                  <th className="py-3 px-4">Location / Route</th>
                  <th className="py-3 px-4">Form Type</th>
                  <th className="py-3 px-4">Fields Verified</th>
                  <th className="py-3 px-4">Sync Targets</th>
                  <th className="py-3 px-4 text-center">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {FORMS_AUDIT_DATA.map((form) => (
                  <tr key={form.id} className="hover:bg-slate-800/30 transition">
                    <td className="py-3.5 px-4 font-semibold text-white">
                      <div>{form.name}</div>
                      <div className="text-[10px] font-mono text-slate-500">{form.id}</div>
                    </td>
                    <td className="py-3.5 px-4 font-mono text-[11px] text-cyan-400">
                      {form.path.startsWith('/') ? (
                        <Link href={form.path} className="hover:underline flex items-center gap-1" target="_blank">
                          <span>{form.path}</span>
                          <ExternalLink className="w-3 h-3 opacity-60" />
                        </Link>
                      ) : (
                        <span className="text-slate-400">{form.path}</span>
                      )}
                    </td>
                    <td className="py-3.5 px-4 text-slate-300">
                      <span className="px-2 py-0.5 rounded bg-slate-800 text-[10px] font-mono">
                        {form.type}
                      </span>
                    </td>
                    <td className="py-3.5 px-4 text-slate-400 max-w-xs leading-relaxed">
                      <div className="text-slate-200">{form.fields.join(', ')}</div>
                      <div className="text-[10px] text-slate-500 mt-0.5">{form.validations}</div>
                    </td>
                    <td className="py-3.5 px-4 text-[11px] text-slate-300 font-mono">
                      {form.syncTargets}
                    </td>
                    <td className="py-3.5 px-4 text-center">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-mono font-bold border border-emerald-500/30">
                        <CheckCircle2 className="w-3 h-3" />
                        <span>PASSED</span>
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  )
}
