# 🧠 TrustGrid.AI — Advanced Website Intelligence & Analytics Architecture

This document details the comprehensive **Website Intelligence & Analytics System** integrated directly into the **TRUSTGRID.AI** platform.

---

## 🏗️ 1. Architecture Overview

```
                      ┌────────────────────────────────────────┐
                      │    Client Browser / Visitor Session     │
                      │  (Intl Timezone, Screen, Referrer, UTM)│
                      └──────────────────┬─────────────────────┘
                                         │
                   navigator.sendBeacon / POST (fetch)
                                         │
                                         ▼
                      ┌────────────────────────────────────────┐
                      │      Next.js Route Handlers (Edge)      │
                      │   POST /api/analytics/events           │
                      │   - Trusted Server IP Resolution       │
                      │   - Security & Rate Limit Evaluation   │
                      │   - Geo & Network ASN Profiling        │
                      │   - Traffic Attribution Classification │
                      │   - Session Lifecycle & Bounce Math    │
                      └──────────────────┬─────────────────────┘
                                         │
                                         ▼
                 ┌──────────────────────────────────────────────────┐
                 │     Embedded Relational Database (node:sqlite)   │
                 │              WAL Mode High-Throughput            │
                 │  - analytics_events     - analytics_sessions     │
                 │  - traffic_attribution  - network_intelligence   │
                 │  - security_events      - privacy_consent        │
                 └───────────────────────┬──────────────────────────┘
                                         │
                    GET /api/analytics/dashboard?timezone=...
                                         │
                                         ▼
                 ┌──────────────────────────────────────────────────┐
                 │      Unified TrustGrid Intelligence Suite        │
                 │          (/analytics Protected Dashboard)        │
                 │  - Mission Control      - Executive KPIs         │
                 │  - Ad Intelligence      - Geo Traffic Map        │
                 │  - Daily 7x24 Heatmap   - IP & Network Intel     │
                 │  - Funnel & Conversions - RFC 4180 CSV Reports   │
                 └──────────────────────────────────────────────────┘
```

---

## 🧩 2. Core Intelligence Modules

### 1. ⏱️ Session Intelligence
- **Session Identification**: Unique session identifier (`tg_sess_<timestamp>_<hash>`) generated per visitor session.
- **Inactivity Timeout**: Configured for 30 minutes of inactivity; sessions resuming after 30 minutes trigger a fresh session ID.
- **Duration & Dwell Time**: Cumulative engagement time measured in seconds across page transitions.
- **Bounce Rate Methodology**: Formally defined as sessions where `pages_count <= 1`, `duration_sec < 15`, and no conversion event occurred.
- **Exit & Entry Tracking**: Entry pages and exit pages captured on navigation changes and window `beforeunload` lifecycle events.

### 2. 🚦 Traffic & Attribution Intelligence
- **Strict Channel Classification**:
  - **Paid Search**: Explicit `cpc`, `ppc`, `paid`, or `paidsearch` mediums.
  - **Organic Search**: Verified search engine referrers (`Google`, `Bing`, `DuckDuckGo`, `Yahoo`, `Baidu`, `Yandex`).
  - **Social**: Verified social referrers (`LinkedIn`, `X / Twitter`, `Reddit`, `YouTube`, `Facebook`, `Instagram`).
  - **Email**: Newsletter mediums or webmail client referrers.
  - **Referral**: Verified external non-search, non-social domains.
  - **Campaign**: Custom UTM campaign parameters.
  - **Direct / Unattributed**: No external referrer and no UTM campaign (never fabricated as organic or paid).
- **Attribution Models**: First-touch and last-touch attribution parameters stored for marketing ROI reporting.

### 3. 🌍 Geographic Intelligence
- **Approximate Geolocation**: Derived server-side using edge headers (`x-vercel-ip-country`, `x-vercel-ip-city`, `cf-ipcountry`) with high-speed IP intelligence fallback.
- **Strict Privacy**: Zero browser Geolocation API permissions requested; never describes IP coordinates as exact physical addresses.
- **Breakdown**: Country, region/state, and city distribution with engagement scores and conversion rates.

### 4. 🌐 Time Zone Intelligence
- **UTC Ground Truth**: All database events and session timestamps are stored in UTC (ISO 8601).
- **Dual Timezone Observation**:
  - `timezone_browser`: Configured browser time zone from `Intl.DateTimeFormat().resolvedOptions().timeZone`.
  - `timezone_ip`: Time zone inferred server-side from IP location.
- **Admin Timezone Conversion**: Live dashboard reports (including the 7x24 Day × Hour matrix) can be viewed in the administrator's chosen time zone (e.g., UTC, America/New_York, Europe/London, Asia/Kolkata, Asia/Tokyo).

### 5. 🛡️ IP & Network Security Intelligence
- **Trusted Server-Side IP Extraction**: Parses `cf-connecting-ip`, `x-forwarded-for` (leftmost untrusted client IP), or `x-real-ip`.
- **IP Masking**: Zero raw IP addresses are ever transmitted to frontend code or third-party trackers; addresses are anonymized to `/16` subnets (e.g. `198.51.***.***`).
- **Autonomous System Numbers (ASN)**: Profiles ISPs, organizations, and connection types (Broadband, Mobile, Datacenter).
- **Abuse & Threat Detection**:
  - Rate-limit thresholds (120 req/min per IP subnet).
  - Malicious scanner User-Agent detection (`sqlmap`, `nikto`, `masscan`).
  - Vulnerability path probe tracking (`.env`, `wp-login`, `etc/passwd`).
  - Incidents recorded in `security_events` table for administrator investigation.

---

## 📊 3. Database Schema Reference

The system utilizes an embedded SQLite WAL-mode relational database stored at `data/trustgrid_analytics.db`:

| Table Name | Purpose | Primary Key |
| :--- | :--- | :--- |
| `analytics_events` | Granular chronological user interactions, pageviews, CTAs, and rage clicks | `id` (Auto) / `event_id` (Unique) |
| `analytics_sessions` | Stitched visitor sessions with duration, pages visited, bounce status, and conversion | `session_id` |
| `traffic_attribution` | Campaign UTM tracking and multi-touch referral records | `id` (Auto) |
| `network_intelligence` | ASN, ISP, organization, connection type, and datacenter flags | `asn` |
| `security_events` | Threat incident log, rate-limiting violations, and scanner blocks | `id` (Auto) |
| `privacy_consent` | User cookie and analytics consent preferences | `user_id` |

---

## 📡 4. API Endpoints

- `POST /api/analytics/events`: Ingests single or batch telemetry events, executes geo/network enrichment, manages sessions, and writes to SQLite.
- `GET /api/analytics/dashboard`: Computes aggregated metrics with date filtering (`all`, `today`, `yesterday`, `7d`, `30d`), channel filtering, and timezone conversion.
- `GET /api/analytics/reports/export`: Generates downloadable RFC 4180 CSV exports for sessions, traffic sources, geo distribution, and security events.
- `GET /api/analytics/security`: Returns network ASN intelligence, threat summaries, and security incident logs.
- `POST /api/analytics/consent`: Records visitor privacy preferences.

---

## 🔒 5. Accessing the Dashboard

1. Navigate to `/analytics` on your deployed site or local dev environment.
2. In the header bar, click **Intelligence Suite** or access directly at `http://localhost:3000/analytics`.
3. Enter the administrator authorization key:
   - `trustgrid2026` (or `isi2026` / `admin`)
4. Switch between the 18 specialized intelligence tabs, choose your reporting timezone from the header dropdown, or download audit-ready CSV exports.
