# TRUSTGRID.AI — Enterprise Lead Handling & Qualification Standard Operating Procedure (SOP)

**Document Version:** 1.0.0 (Enterprise)  
**Effective Date:** November 2026  
**Target Audience:** Solutions Architects, Sales Engineering Leads, Executive Advisory, RevOps, Support  
**Systems Covered:** Web App Forms, Supabase DB, Google Sheets (`LEADS_MASTER`), Jira Cloud (`DFX`), WhatsApp/Telegram, SMTP  

---

## 1. OBJECTIVE & PURPOSE

This document establishes the Standard Operating Procedure (SOP) for capturing, validating, scoring, routing, and following up on all inbound business enquiries and consultative leads generated across the TRUSTGRID.AI digital presence.

Every inbound inquiry represents a potential enterprise engagement involving GPU compute clusters, agentic multi-agent systems, AI networking, or post-quantum cybersecurity. Strict adherence to this SOP ensures zero data loss, sub-hour SLA response times, and maximum conversion from inquiry to booked technical consultation.

---

## 2. INBOUND CHANNELS & CAPTURE ARCHITECTURE

All leads enter the system through authenticated, sanitized pipelines:

| Channel | Entry Point | Primary Destination | Jira Issue Type |
|---|---|---|---|
| **Website Contact Form** | `/contact` (`#contact-form-section`) | Supabase + `LEADS_MASTER` | `Task` (Lead) |
| **AI Diagnostic Assessment** | `/book-ai-diagnostic` | Supabase + `LEADS_MASTER` + `AI_Diagnostic_Leads` | `Task` (Diagnostic) |
| **Consulting Session Booking** | `/book-session`, `/booking` | Supabase + `LEADS_MASTER` + `Consulting_Sessions` | `Task` (Consulting) |
| **Direct Architect Call** | `/talk-to-ai-architect` | Supabase + `LEADS_MASTER` + `Talk_To_Architect` | `Task` (Architect Call) |
| **Enterprise RFP / Proposal** | `/request-proposal` | Supabase + `LEADS_MASTER` + `RFP_Proposals` | `Task` (RFP) |
| **LinkedIn Inbound** | `/linkedin-inbound`, `/api/leads` | Supabase + `LEADS_MASTER` + `LinkedIn_Leads` | `Task` (LinkedIn) |
| **Direct WhatsApp Inbound** | India (`+91 95130 88612`), US (`+1 650 772 4145`) | WhatsApp Advisory + Supabase | `Task` (Direct Chat) |
| **Careers & Fellowships** | `/careers` | Supabase + Google Drive (Resume) | `Task` (Candidate) |

---

## 3. LEAD VALIDATION & SANITIZATION LAYER

Before any lead is persisted or alerted, it passes through the server-side validation pipeline (`lib/validation.ts`):

1. **Anti-Spam Honeypot Gate:**
   - Hidden honeypot fields (`website_trap`, `bot_check`) are inspected. If filled, the request is immediately dropped with HTTP 400 (`SPAM_REJECTED`) without notifying the bot or writing to CRM.
2. **Name Sanitization:**
   - Minimum 2 characters, Unicode letter regex, stripped of `<script>`, SQL syntax, and HTML tags.
3. **RFC 5322 Email Validation:**
   - Strict corporate email syntax. Disposable temporary email domains (`mailinator`, `10minutemail`, `tempmail`) are flagged.
4. **E.164 Phone Format:**
   - Requires valid 7–16 digits with country dialing code prefix (e.g., `+91`, `+1`, `+65`).
5. **Rate Limiting:**
   - Sliding-window IP rate limiter permits a maximum of 120 requests/minute per client IP to eliminate brute-force form exhaustion.

---

## 4. 100-POINT LEAD SCORING ALGORITHM

Every validated lead is scored dynamically (0–100) via `lib/lead-scoring.ts`:

```
┌─────────────────────────────────────────────────────────────┐
│ CRITERIA                                           POINTS   │
├─────────────────────────────────────────────────────────────┤
│ Corporate Business Email Domain (Non-consumer)     +10 pts  │
│ Company Name Provided & Verified                   +10 pts  │
│ C-Suite / VP / Director / Architect Designation    +5 pts   │
│ Enterprise AI Context (GPU, RoCE, PQC, RAG, etc.)  +20 pts  │
│ Diagnostic / Architect Consultation Requested      +20 pts  │
│ Detailed Project Scope Provided (>50 chars)        +10 pts  │
│ Direct Phone Contact Line Provided                 +5 pts   │
│ High-Intent Architecture Solution Page Inbound     +10 pts  │
│ Prior Whitepaper or Case Study Engagement          +10 pts  │
├─────────────────────────────────────────────────────────────┤
│ TOTAL MAXIMUM QUALIFICATION SCORE                  100 pts  │
└─────────────────────────────────────────────────────────────┘
```

### Priority Classification & Response SLAs

| Score Band | Priority Tier | SLA Response Window | Assigned Owner | Action Protocol |
|---|---|---|---|---|
| **70 – 100** | **HIGH (Hot Prospect)** | **&le; 1 Hour** | Principal Solutions Architect | Immediate phone/WhatsApp outreach + Calendar invite |
| **40 – 69** | **MEDIUM (Verified Intent)** | **&le; 4 Business Hours** | Senior Systems Engineer | Detailed technical response email + Capability deck |
| **0 – 39** | **LOW (Warm Lead)** | **&le; 24 Hours** | Technical Advisory Queue | Automated case study follow-up + Diagnostic self-assessment |

---

## 5. DUAL-WRITE SYNCHRONIZATION WORKFLOW

```
                  ┌──────────────────────────────┐
                  │ Inbound Lead Form Submission │
                  └──────────────┬───────────────┘
                                 │
                   ┌─────────────▼────────────┐
                   │   Next.js API Layer      │
                   │ (/api/forms, /api/leads) │
                   └─────────────┬────────────┘
                                 │
       ┌─────────────────────────┼─────────────────────────┐
       │                         │                         │
┌──────▼──────┐           ┌──────▼──────┐           ┌──────▼──────┐
│  Supabase   │           │ Google Sheet│           │ Jira Cloud  │
│ PostgreSQL  │           │LEADS_MASTER │           │     DFX     │
│  (Indexed)  │           │ (31 Columns)│           │ (Rest API)  │
└──────┬──────┘           └──────┬──────┘           └──────┬──────┘
       │                         │                         │
       └─────────────────────────┼─────────────────────────┘
                                 │
                   ┌─────────────▼────────────┐
                   │    Real-Time Alerts      │
                   │ • Email Acknowledgement  │
                   │ • WhatsApp Executive Ping│
                   │ • Telegram Broadcast     │
                   └──────────────────────────┘
```

1. **Supabase Persistence:** Stored with UUID, hashed IP, Lead Code (`TG-YYYYMMDD-XXXX`), full UTM attribution, and lead score.
2. **Google Sheets (`LEADS_MASTER`):** Synchronously written with 31 columns:
   `Lead_ID`, `Capture_Date`, `Capture_Time`, `Full_Name`, `Business_Email`, `Phone_Number`, `Company`, `Designation`, `Industry`, `Location`, `Service_Interest`, `Message`, `Source`, `Source_Page`, `Landing_Page`, `UTM_Source`, `UTM_Medium`, `UTM_Campaign`, `UTM_Term`, `UTM_Content`, `Device_Type`, `Session_ID`, `CTA_Source`, `Lead_Status`, `Lead_Score`, `Assigned_To`, `JIRA_Issue_ID`, `Email_Status`, `Followup_Status`, `Notes`, `Last_Updated`.
3. **Jira Cloud Synchronization:** JQL checks for existing contact. If existing, posts new engagement comment; if new, creates `Task` under project `DFX`.
4. **Retry Mechanism:** Failed sheet writes retry 2 times with exponential backoff (800ms, 1600ms). Telemetry logs failures into `google_sheet_sync_logs`.
5. **Decoupled Reliability:** A lead is never dropped if Jira or email delivery encounters third-party latency. Supabase and Google Sheet confirm persistence first.

---

## 6. LEAD LIFECYCLE & STATUS PROGRESSION

Every lead follows this state machine:

```
[ NEW ] ──> [ CONTACTED ] ──> [ QUALIFIED ] ──> [ PROPOSAL_SENT ] ──> [ NEGOTIATING ] ──> [ CONVERTED ]
   │
   └──> [ UNQUALIFIED / SPAM ]
```

- **NEW:** Initial capture. Awaiting architect review.
- **CONTACTED:** Architect or advisory lead has sent introductory technical response or conducted outreach call.
- **QUALIFIED:** Enterprise budget, timeline (&le; 6 months), and technical stack (GPU, LLM, Networking) confirmed.
- **PROPOSAL_SENT:** Architecture blueprint, DBOT quote, or diagnostic report issued.
- **NEGOTIATING:** MSA, security review (NIST / EU AI Act), or SOW scoping in progress.
- **CONVERTED:** Signed agreement or scheduled pilot workshop.

Updates via `PATCH /api/leads` automatically synchronize status across Supabase, Google Sheets, and Jira.

---

## 7. AUTOMATED REPORTING SCHEDULE

- **Daily Production Report (09:00 UTC):**
  - Generated via `GET /api/reports?type=daily`.
  - Dispatched to: `poojasri.trustgrid@gmail.com`, `bv@trustflow.in`.
  - Summarizes: New leads, qualified leads, source breakdown, and response SLA metrics.
- **Weekly Executive Digest (Mondays 08:00 UTC):**
  - Generated via `GET /api/reports?type=weekly`.
  - Dispatched to executive leadership.
  - Summarizes: Full funnel conversion, channel ROI, top solution drivers, and conversion rates.
- **Monthly Strategic Intelligence Report:**
  - Generated via `GET /api/reports?type=monthly`.
  - 30-day trend analysis, lead velocity, and enterprise deal-flow summary.
