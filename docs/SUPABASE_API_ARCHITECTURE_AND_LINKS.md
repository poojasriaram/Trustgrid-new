# TRUSTGRID.AI Digital Presence — Supabase API Architecture & Implemented Links

This document details the complete **Next.js API Directory Structure** (`app/api/*`), the **Supabase Persistence Layer** (`lib/supabase/*` & `lib/services/*`), the **Supabase Database Tables & PostgREST Endpoints** (`ndalgvpvpzwrqoikkpyb` / `WebMinning_DB_TG`), and all **Live / Local API URLs**.

---

## 1. Supabase Project & Dashboard Links

- **Supabase Project Name**: `WebMinning_DB_TG`
- **Project Reference ID**: `ndalgvpvpzwrqoikkpyb`
- **Base API URL**: `https://ndalgvpvpzwrqoikkpyb.supabase.co`
- **PostgREST Base Endpoint**: `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1`
- **Supabase Project Dashboard**: https://supabase.com/dashboard/project/ndalgvpvpzwrqoikkpyb
- **Supabase Edge Functions Dashboard**: https://supabase.com/dashboard/project/ndalgvpvpzwrqoikkpyb/functions
- **Supabase Table Editor**: https://supabase.com/dashboard/project/ndalgvpvpzwrqoikkpyb/editor
- **Supabase SQL Editor**: https://supabase.com/dashboard/project/ndalgvpvpzwrqoikkpyb/sql/new
- **Supabase API Docs**: https://supabase.com/dashboard/project/ndalgvpvpzwrqoikkpyb/api
- **Supabase RLS Policies**: https://supabase.com/dashboard/project/ndalgvpvpzwrqoikkpyb/auth/policies

---

## 1B. Live Deployed Supabase Edge Function Agents (`supabase/functions/*`)

These 5 Edge Function Agents are deployed live on Supabase (`verify_jwt: false`) and open directly in any browser tab (`GET`) or accept `POST`/`DELETE` requests from static hosting without needing a Next.js server:

| Agent Name | Local Source File | Live Public Supabase Edge Function URL (Click to Open) | Replaces Next.js Route(s) |
| :--- | :--- | :--- | :--- |
| **`chat-architect-agent`** | `supabase/functions/chat-architect-agent/index.ts` | https://ndalgvpvpzwrqoikkpyb.supabase.co/functions/v1/chat-architect-agent | `/api/chat`, `/api/chat/session` |
| **`lead-intake-agent`** | `supabase/functions/lead-intake-agent/index.ts` | https://ndalgvpvpzwrqoikkpyb.supabase.co/functions/v1/lead-intake-agent | `/api/leads`, `/api/leads/stats`, `/api/leads/inbound-linkedin`, `/api/reports` |
| **`calendar-booking-agent`** | `supabase/functions/calendar-booking-agent/index.ts` | https://ndalgvpvpzwrqoikkpyb.supabase.co/functions/v1/calendar-booking-agent | `/api/calendar/availability`, `/api/calendar/book` |
| **`analytics-intel-agent`** | `supabase/functions/analytics-intel-agent/index.ts` | https://ndalgvpvpzwrqoikkpyb.supabase.co/functions/v1/analytics-intel-agent | `/api/analytics/events`, `/api/analytics/dashboard`, `/api/analytics/security`, `/api/analytics/consent` |
| **`linkedin-publisher-agent`** | `supabase/functions/linkedin-publisher-agent/index.ts` | https://ndalgvpvpzwrqoikkpyb.supabase.co/functions/v1/linkedin-publisher-agent | `/api/linkedin/post`, `/api/linkedin/posts`, `/api/linkedin/schedule`, `/api/linkedin/status` |

---

## 2. Implemented Codebase Files (Migrations, Stores & Services)

| Layer | File | Purpose |
| :--- | :--- | :--- |
| **Supabase DDL Migration** | `supabase/migrations/20261116000000_create_digital_presence_api_tables.sql` | Creates the 12 core API backend tables (`analytics_events`, `analytics_sessions`, `network_intelligence`, `security_events`, `privacy_consent`, `leads`, `session_bookings`, `linkedin_connections`, `oauth_states`, `linkedin_posts`, `chat_sessions`, `chat_messages`) with indexes and RLS policies. |
| **Supabase Sheet-1 DDL** | `data/create_remaining_tables.sql` | Creates the 31 Google Sheet #1 lead & telemetry tables in Supabase. |
| **Supabase API Store** | `lib/supabase/api-store.ts` | Unified PostgREST upsert/select/update client connecting `/api/chat`, `/api/leads`, `/api/calendar`, `/api/linkedin`, and `/api/analytics` to Supabase. |
| **Supabase Leads & Telemetry Service** | `lib/services/supabase-leads.ts` | Dual-writes every website form lead and 95-column telemetry event into `form_submissions`, `live_traffic_events`, and dedicated form tables. |
| **Chat Memory Store** | `lib/chat/memory-store.ts` | Triple-write conversation store (Supabase `chat_sessions` & `chat_messages` + Redis Cloud + In-Memory fallback). |
| **Leads & LinkedIn DB Store** | `lib/db/leads.ts` | SQLite + Supabase dual-write store for `leads`, `linkedin_connections`, `oauth_states`, and `linkedin_posts`. |
| **Calendar Bookings DB Store** | `lib/db/bookings.ts` | SQLite + Supabase dual-write store for `session_bookings`. |
| **Sheet-1 Sync Script** | `scripts/sync-all-sheet1-to-supabase.mjs` | Synchronizes all 31 Google Sheet #1 CSV tabs to Supabase. |
| **Derived Tables Backfill Script** | `scripts/populate-derived-sheet1-tables.mjs` | Populates derived analytics and lead tables in Supabase. |

---

## 3. Complete API Directory Structure & Route Links (`app/api/*`)

### A. Analytics & Security Intelligence (`/api/analytics/*`)
| Route File | HTTP Method | Production Endpoint | Local Endpoint | Supabase Table(s) |
| :--- | :--- | :--- | :--- | :--- |
| `app/api/analytics/events/route.ts` | `POST` | `https://trustgrid.ai/api/analytics/events` | `http://localhost:3000/api/analytics/events` | `analytics_events`, `analytics_sessions`, `live_traffic_events`, `page_views`, `cta_clicks`, `traffic_attribution` |
| `app/api/analytics/dashboard/route.ts` | `GET` | `https://trustgrid.ai/api/analytics/dashboard` | `http://localhost:3000/api/analytics/dashboard` | `analytics_events`, `analytics_sessions`, `daily_traffic_snapshots`, `sessions_intelligence` |
| `app/api/analytics/[module]/route.ts` | `GET` | `https://trustgrid.ai/api/analytics/mission-control` | `http://localhost:3000/api/analytics/mission-control` | `analytics_events`, `analytics_sessions`, `geo_intelligence` |
| `app/api/analytics/security/route.ts` | `GET` | `https://trustgrid.ai/api/analytics/security` | `http://localhost:3000/api/analytics/security` | `network_intelligence`, `security_events`, `network_security_log` |
| `app/api/analytics/consent/route.ts` | `POST` | `https://trustgrid.ai/api/analytics/consent` | `http://localhost:3000/api/analytics/consent` | `privacy_consent` |
| `app/api/analytics/reports/export/route.ts` | `GET` | `https://trustgrid.ai/api/analytics/reports/export?type=sessions` | `http://localhost:3000/api/analytics/reports/export?type=sessions` | `analytics_sessions`, `analytics_events`, `traffic_attribution`, `security_events` |
| `app/api/analytics/sheets/sync/route.ts` | `GET`, `POST` | `https://trustgrid.ai/api/analytics/sheets/sync` | `http://localhost:3000/api/analytics/sheets/sync` | `analytics_sessions`, `traffic_attribution`, `analytics_events`, `security_events` |

### B. Central Leads & Attribution (`/api/leads/*`)
| Route File | HTTP Method | Production Endpoint | Local Endpoint | Supabase Table(s) |
| :--- | :--- | :--- | :--- | :--- |
| `app/api/leads/route.ts` | `GET`, `POST` | `https://trustgrid.ai/api/leads` | `http://localhost:3000/api/leads` | `leads`, `form_submissions`, `archived_test_leads`, + 17 dedicated form tables |
| `app/api/leads/inbound-linkedin/route.ts` | `GET`, `POST` | `https://trustgrid.ai/api/leads/inbound-linkedin` | `http://localhost:3000/api/leads/inbound-linkedin` | `linkedin_leads`, `leads`, `form_submissions` |
| `app/api/leads/stats/route.ts` | `GET` | `https://trustgrid.ai/api/leads/stats` | `http://localhost:3000/api/leads/stats` | `leads`, `form_submissions` |
| `app/api/leads/retry/route.ts` | `POST` | `https://trustgrid.ai/api/leads/retry` | `http://localhost:3000/api/leads/retry` | `leads` |

### C. Executive Calendar Booking (`/api/calendar/*`)
| Route File | HTTP Method | Production Endpoint | Local Endpoint | Supabase Table(s) |
| :--- | :--- | :--- | :--- | :--- |
| `app/api/calendar/availability/route.ts` | `GET` | `https://trustgrid.ai/api/calendar/availability?date=2026-11-16` | `http://localhost:3000/api/calendar/availability?date=2026-11-16` | `session_bookings` |
| `app/api/calendar/book/route.ts` | `POST` | `https://trustgrid.ai/api/calendar/book` | `http://localhost:3000/api/calendar/book` | `session_bookings`, `talk_to_architect`, `form_consultation_bookings`, `consulting_sessions`, `form_submissions` |

### D. AI Architect Chatbot & Session Memory (`/api/chat/*`)
| Route File | HTTP Method | Production Endpoint | Local Endpoint | Supabase Table(s) |
| :--- | :--- | :--- | :--- | :--- |
| `app/api/chat/route.ts` | `GET`, `POST`, `DELETE` | `https://trustgrid.ai/api/chat` | `http://localhost:3000/api/chat` | `chat_sessions`, `chat_messages`, `chatbot_leads`, `form_chatbot_conversations` |
| `app/api/chat/session/route.ts` | `GET`, `DELETE` | `https://trustgrid.ai/api/chat/session` | `http://localhost:3000/api/chat/session` | `chat_sessions`, `chat_messages` |

### E. LinkedIn OAuth & Publishing Automation (`/api/linkedin/*` & `/api/services/linkedin/*`)
| Route File | HTTP Method | Production Endpoint | Local Endpoint | Supabase Table(s) |
| :--- | :--- | :--- | :--- | :--- |
| `app/api/linkedin/auth/route.ts` | `GET` | `https://trustgrid.ai/api/linkedin/auth` | `http://localhost:3000/api/linkedin/auth` | `oauth_states` |
| `app/api/linkedin/callback/route.ts` | `GET` | `https://trustgrid.ai/api/linkedin/callback` | `http://localhost:3000/api/linkedin/callback` | `linkedin_connections`, `oauth_states` |
| `app/api/linkedin/post/route.ts` | `POST` | `https://trustgrid.ai/api/linkedin/post` | `http://localhost:3000/api/linkedin/post` | `linkedin_posts`, `linkedin_connections` |
| `app/api/linkedin/posts/route.ts` | `GET`, `POST`, `DELETE` | `https://trustgrid.ai/api/linkedin/posts` | `http://localhost:3000/api/linkedin/posts` | `linkedin_posts` |
| `app/api/linkedin/schedule/route.ts` | `GET`, `POST` | `https://trustgrid.ai/api/linkedin/schedule` | `http://localhost:3000/api/linkedin/schedule` | `linkedin_posts` |
| `app/api/linkedin/status/route.ts` | `GET`, `POST` | `https://trustgrid.ai/api/linkedin/status` | `http://localhost:3000/api/linkedin/status` | `linkedin_connections`, `linkedin_posts` |
| `app/api/services/linkedin/profile/route.ts` | `GET` | `https://trustgrid.ai/api/services/linkedin/profile` | `http://localhost:3000/api/services/linkedin/profile` | `linkedin_connections` |
| `app/api/services/linkedin/status/route.ts` | `GET` | `https://trustgrid.ai/api/services/linkedin/status` | `http://localhost:3000/api/services/linkedin/status` | `linkedin_connections` |

### F. Executive Reporting (`/api/reports`)
| Route File | HTTP Method | Production Endpoint | Local Endpoint | Supabase Table(s) |
| :--- | :--- | :--- | :--- | :--- |
| `app/api/reports/route.ts` | `GET` | `https://trustgrid.ai/api/reports?type=daily` | `http://localhost:3000/api/reports?type=daily` | `leads`, `form_submissions`, `archived_test_leads` |

---

## 4. Direct Browser-Clickable Supabase PostgREST Table Endpoints (All 43 Tables)

### A. 12 Core API Backend Tables
1. **Analytics Events** (499 rows): https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/analytics_events?select=*&limit=25&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv
2. **Analytics Sessions** (298 rows): https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/analytics_sessions?select=*&limit=25&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv
3. **Network Intelligence** (35 rows): https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/network_intelligence?select=*&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv
4. **Security Events** (6 rows): https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/security_events?select=*&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv
5. **Privacy Consent** (198 rows): https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/privacy_consent?select=*&limit=25&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv
6. **Leads** (20 rows): https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/leads?select=*&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv
7. **Session Bookings** (2 rows): https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/session_bookings?select=*&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv
8. **LinkedIn Connections**: https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/linkedin_connections?select=*&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv
9. **OAuth States**: https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/oauth_states?select=*&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv
10. **LinkedIn Posts** (1 row): https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/linkedin_posts?select=*&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv
11. **Chat Sessions** (13 rows): https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/chat_sessions?select=*&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv
12. **Chat Messages** (26 rows): https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/chat_messages?select=*&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv

### B. 31 Sheet-1 Lead & Telemetry Tables
13. **Live Traffic Events** (2,419 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/live_traffic_events?select=*&limit=50`
14. **Daily Traffic Snapshots** (15 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/daily_traffic_snapshots?select=*`
15. **Consulting Sessions** (2,406 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/consulting_sessions?select=*&limit=50`
16. **Form Submissions** (20 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/form_submissions?select=*`
17. **Contact Leads** (7 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/contact_leads?select=*`
18. **AI Diagnostic Leads** (2 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/ai_diagnostic_leads?select=*`
19. **AI Readiness Leads** (1 row): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/ai_readiness_leads?select=*`
20. **Workshop Requests** (1 row): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/workshop_requests?select=*`
21. **RFP Proposals** (1 row): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/rfp_proposals?select=*`
22. **Talk To Architect** (2 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/talk_to_architect?select=*`
23. **Form Consultation Bookings** (1 row): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/form_consultation_bookings?select=*`
24. **Form Diagnostic Assessments** (1 row): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/form_diagnostic_assessments?select=*`
25. **Form Inbound Leads** (3 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/form_inbound_leads?select=*`
26. **Partner Applications** (1 row): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/partner_applications?select=*`
27. **Form Partner Applications** (1 row): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/form_partner_applications?select=*`
28. **Career Applications** (1 row): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/career_applications?select=*`
29. **Form Career Applications** (1 row): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/form_career_applications?select=*`
30. **Chatbot Leads** (13 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/chatbot_leads?select=*`
31. **Form Chatbot Conversations** (13 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/form_chatbot_conversations?select=*`
32. **Quick Enquiry Leads** (2 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/quick_enquiry_leads?select=*`
33. **LinkedIn Leads** (4 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/linkedin_leads?select=*`
34. **Newsletter Subscribers** (19 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/newsletter_subscribers?select=*`
35. **Google Ad Leads** (5 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/google_ad_leads?select=*`
36. **Page Views** (390 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/page_views?select=*&limit=50`
37. **Sessions** (298 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/sessions?select=*&limit=50`
38. **CTA Clicks** (886 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/cta_clicks?select=*&limit=50`
39. **Sessions Intelligence** (298 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/sessions_intelligence?select=*&limit=50`
40. **Traffic Attribution** (298 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/traffic_attribution?select=*&limit=50`
41. **Geo Intelligence** (107 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/geo_intelligence?select=*`
42. **Network Security Log** (6 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/network_security_log?select=*`
43. **Archived Test Leads** (35 rows): `https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/archived_test_leads?select=*`

### C. Copper Profiles Master Database (`COPPER` Stage — 66,425 Verified Rows)
44. **Copper Profiles (Sample 25 Rows)**: https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/copper_profiles?select=*&limit=25&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv
45. **Copper Profiles — EEPC Sheet (`10,469` rows)**: https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/copper_profiles?source_sheet=eq.EEPC&select=*&limit=25&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv
46. **Copper Profiles — Sheet2 + Sheet6 Merged (`1,256` rows)**: https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/copper_profiles?source_sheet=eq.Sheet2&select=*&limit=25&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv
47. **Copper Profiles — Sheet4 (`25,000` rows)**: https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/copper_profiles?source_sheet=eq.Sheet4&select=*&limit=25&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv
48. **Copper Profiles — Sheet5 (`29,500` rows)**: https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/copper_profiles?source_sheet=eq.Sheet5&select=*&limit=25&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv
49. **Copper Profiles — Top 100 Manufacturing ERP India (`100` rows)**: https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/copper_profiles?source_sheet=eq.Top_100_Manufacturing_ERP_India&select=*&limit=25&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv
50. **Copper Profiles — ISO Consultants 5 Cities (`100` rows)**: https://ndalgvpvpzwrqoikkpyb.supabase.co/rest/v1/copper_profiles?source_sheet=eq.ISO_Consultants_5_Cities&select=*&limit=25&apikey=sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv


