# TrustGrid.AI — Enterprise Google Sheets Intelligence Integration Guide

This guide details the complete integration between the TrustGrid Web Intelligence Suite and the user's dual Google Spreadsheets.

---

## 📊 Dual-Sheet Architecture

| Component | Target Spreadsheet | Google Sheet ID | Primary Script | Role |
| :--- | :--- | :--- | :--- | :--- |
| **Sheet 1** | **TrustGrid - Data Ingestion & Webhook** | `1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0` | [`TRUSTGRID_SHEET1_WEBHOOK.js`](../TRUSTGRID_SHEET1_WEBHOOK.js) | Ingests real-time form leads, 95-column telemetry, session lifecycles, traffic attribution, and network security logs. |
| **Sheet 2** | **TrustGrid - Executive Analytics Dashboard** | `1jC53QN1qiuiRFLzdneA46TECBztER5btTo7qGphb5TM` | [`TRUSTGRID_SHEET2_ANALYTICS.js`](../TRUSTGRID_SHEET2_ANALYTICS.js) | Pulls raw telemetry from Sheet 1, filters development noise, and builds 20 automated executive intelligence dashboards. |

---

## 🗂️ Sheet 1: Dedicated Intelligence Tabs

When events occur on the TrustGrid web application or when synchronization is initiated, Sheet 1 automatically provisions and logs into the following tabs:

1. **`Sessions_Intelligence`**:
   - `Session ID`, `User ID`, `Start Time (UTC)`, `Last Activity (UTC)`, `Duration (Sec)`, `Pages Visited`, `Entry Page`, `Exit Page`, `Traffic Channel`, `Campaign`, `Country`, `City`, `Timezone`, `Masked IP`, `Bounce`, `Converted`, `User Type`, `Timestamp`
2. **`Traffic_Attribution`**:
   - `Timestamp (UTC)`, `Session ID`, `User ID`, `Channel`, `Source`, `Medium`, `Campaign`, `Term`, `Content`, `Referrer Domain`, `Landing Page`, `Converted`
3. **`Geo_Intelligence`**:
   - `Timestamp (UTC)`, `Masked IP`, `Country`, `Country Code`, `Region`, `City`, `Latitude`, `Longitude`, `Timezone`, `ISP`, `Organization`, `ASN`
4. **`Network_Security_Log`**:
   - `Timestamp (UTC)`, `Masked IP`, `Threat Category`, `Severity`, `Description`, `Target Path`, `Blocked`, `Action Taken`
5. **`Live_Traffic_Events`**:
   - Complete 95-attribute granular telemetry schema (click coordinates, scroll depth, Web Vitals, rage clicks).
6. **Form Submissions**:
   - Dedicated tabs for `Form_Inbound_Leads`, `Form_Consultation_Bookings`, `Form_Expert_Consulting`, `Form_Diagnostic_Assessments`, `Form_Partner_Applications`, `Form_Career_Applications`, `Form_Chatbot_Conversations`.

---

## 📈 Sheet 2: Executive Intelligence Dashboards (20 Tabs)

In Sheet 2, open the custom menu:
👉 **`🛡️ TRUSTGRID INTELLIGENCE` > `🔄 Pull Data & Refresh All 20 Dashboards`**

The 20 executive intelligence tabs built automatically include:
1. `🛰️ Mission Control`: Global traffic, unique users, retention gauge, average engagement.
2. `🚦 Executive KPIs`: Lead velocity, pipeline value, bounce rates, daily volume.
3. `🗺️ Geo Map`: Country & city penetration table with global distribution.
4. `📏 Pareto (80-20)`: 80/20 rule breakdown of pages driving majority engagement.
5. `🕒 Daily Heatmap`: Hour-by-hour visitor activity density.
6. `📈 Growth & Momentum`: Week-over-week velocity metrics.
7. `👥 Visitor Ratio`: New vs returning visitor retention curve.
8. `📱 Tech Profile`: Browser engines, OS platforms, viewport resolutions.
9. `🔗 Identity Linker`: Cross-device user identity graph.
10. `📊 Std Deviation`: Behavioral engagement dispersion.
11. `🌊 Sankey Flow`: User navigation pathways and drop-offs.
12. `🤖 Broken Link QA`: 404 and routing error diagnostics.
13. `🔀 Co-Occurrence`: Multi-page content correlation matrix.
14. `🔻 Funnel Drops`: Conversion funnel milestone drop-off rates.
15. `🎯 Lead Scoring`: Intent-weighted buyer scoring algorithm.
16. `📋 Leads & Conversions`: Consolidated lead table and candidate resume archive.
17. **`🕹️ Sessions Intelligence`** *(NEW)*: Session duration distribution, bounce classification, entry/exit page audits.
18. **`🎯 Traffic Attribution`** *(NEW)*: Multi-touch channel attribution, UTM campaign ROI leaderboard, referring domains.
19. **`🛡️ Network Security Intelligence`** *(NEW)*: Strict `/16` subnet distribution, zero raw IP leak audit, threat incident forensics.
20. **`🌐 Geo & Timezone Matrix`** *(NEW)*: 24-hour global engagement distribution mapped across UTC, EST (US East), and IST (India).

---

## ⚡ Deployment & Setup Steps

### 1. Update Sheet 1 (Data Ingestion Webhook)
1. Open [Google Sheet 1](https://docs.google.com/spreadsheets/d/1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0).
2. Go to **Extensions** > **Apps Script**.
3. Replace the editor contents with the code from [`TRUSTGRID_SHEET1_WEBHOOK.js`](../TRUSTGRID_SHEET1_WEBHOOK.js).
4. Click **Deploy** > **Manage deployments** > **Edit** (pencil icon):
   - Choose **New version**.
   - Ensure *Execute as* is set to **Me** and *Who has access* is set to **Anyone**.
   - Click **Deploy**.

### 2. Update Sheet 2 (Executive Analytics Dashboard)
1. Open [Google Sheet 2](https://docs.google.com/spreadsheets/d/1jC53QN1qiuiRFLzdneA46TECBztER5btTo7qGphb5TM).
2. Go to **Extensions** > **Apps Script**.
3. Replace the editor contents with the code from [`TRUSTGRID_SHEET2_ANALYTICS.js`](../TRUSTGRID_SHEET2_ANALYTICS.js).
4. Save the project (Ctrl+S / Cmd+S).
5. Refresh Google Sheet 2 in your browser.
6. The custom menu **`🛡️ TRUSTGRID INTELLIGENCE`** will appear in the top menu bar.
7. Click **`🔄 Pull Data & Refresh All 20 Dashboards`** to generate the executive reports.

---

## 🔄 Bidirectional Synchronization from Web App

TrustGrid includes a live synchronization endpoint and in-app controller:
- **API Endpoint**: `POST /api/analytics/sheets/sync`
- **In-App Controller**: Navigate to `/analytics` > **Reports & Export** > **Push Local Intelligence to Google Sheets** button or click the **Sheets Sync** button in the header toolbar.
