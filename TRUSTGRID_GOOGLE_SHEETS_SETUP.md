# 🚀 TrustGrid.AI — Google Sheets & Analytics Setup Guide

This guide explains how to configure your 2-Sheet system for **TrustGrid.AI**.

---

## 📁 Generated Script Files in Workspace

| Script File | Target Sheet | Purpose |
| :--- | :--- | :--- |
| [`TRUSTGRID_SHEET1_WEBHOOK.js`](file:///c:/Users/srimp/Downloads/TRUSTGRID.NEW/TRUSTGRID_SHEET1_WEBHOOK.js) | **Sheet 1** (Data Collection & Webhook) | Captures form submissions, telemetry, UTM tracking, saves resumes to Google Drive, routes Ad leads, sends category-specific TrustGrid HTML notification emails & scheduled digests. |
| [`TRUSTGRID_SHEET2_ANALYTICS.js`](file:///c:/Users/srimp/Downloads/TRUSTGRID.NEW/TRUSTGRID_SHEET2_ANALYTICS.js) | **Sheet 2** (Analytics & Intelligence) | Reads raw data from Sheet 1, filters localhost/dev traffic, and builds 15 automated dashboard tabs (Mission Control, KPIs, Heatmaps, Sankey Flows, Lead Scoring, etc.). |

---

## 🔗 Active Live Deployment References

### Sheet 1 (Data Collection & Webhook Database)
* **Spreadsheet ID**: `1cK4aA9usPB5lIWDlPEdV04zB_mOrHTLUYEys1p8gb80`
* **Deployment ID**: `AKfycbxwUkYylflGO1ylxVtgb_qn9FlEuf4NP23CEqDX_FVXGbwg46q5bcXE71BErLTBIGCG`
* **Web App URL**: `https://script.google.com/macros/s/AKfycbxwUkYylflGO1ylxVtgb_qn9FlEuf4NP23CEqDX_FVXGbwg46q5bcXE71BErLTBIGCG/exec`

### Sheet 2 (Executive Analytics & Intelligence Hub)
* **Spreadsheet ID**: `1KZBlfQWnKbPg05F3GiVanKPXN0TJzGaiBHqHDsPiTRA`
* **Deployment ID**: `AKfycbwLAtJv5XdhUqaX834nYAA1bzQJnrqIPBe-Z6pNjvBxSPY8NUAF77kZqCKMs5jm53jA`
* **Web App URL**: `https://script.google.com/macros/s/AKfycbwLAtJv5XdhUqaX834nYAA1bzQJnrqIPBe-Z6pNjvBxSPY8NUAF77kZqCKMs5jm53jA/exec`
* **Connected `DATA_SHEET_ID`**: `1cK4aA9usPB5lIWDlPEdV04zB_mOrHTLUYEys1p8gb80`

---

## ⚙️ Step-by-Step Deployment Instructions

### 1️⃣ Sheet 1 Configuration
1. Open your **Sheet 1 Spreadsheet** (`1cK4aA9usPB5lIWDlPEdV04zB_mOrHTLUYEys1p8gb80`).
2. Go to **Extensions $\rightarrow$ Apps Script**.
3. Ensure [`TRUSTGRID_SHEET1_WEBHOOK.js`](file:///c:/Users/srimp/Downloads/TRUSTGRID.NEW/TRUSTGRID_SHEET1_WEBHOOK.js) is pasted.
4. **Pre-Create Database Tables**: In the function dropdown, select `initializeAllDatabaseTables` and click **Run**. This auto-creates the essential tables:
   - `contact_submissions` *(Contact Page & AI Architect Consultations)*
   - `ai_diagnostics` *(Book AI Diagnostic, AI Readiness, Use-Case Workshop & Proposal RFP)*
   - `partner_applications` *(Ecosystem & Strategic Partnerships)*
   - `career_applications` *(Engineering Careers & Fellowships with Drive resume archiving)*
   - `insights_subscriptions` *(Whitepapers & Research Newsletter Subscriptions)*
   - `traffic_analytics` *(Visitors, page views, referrers & UTM campaign parameters)*
5. *(Optional Test)* Select `sendAllSamplePreviewEmailsToPooja` and click **Run** to verify email delivery to `poojasri.aram@gmail.com`.
6. Select `setupAllTrustGridTriggers` and click **Run** to enable daily/weekly automated digests and monthly candidate resume digests.

---

### 2️⃣ Sheet 2 Configuration (15-Tab Analytics Engine)
1. Open your **Sheet 2 Spreadsheet** (`1KZBlfQWnKbPg05F3GiVanKPXN0TJzGaiBHqHDsPiTRA`).
2. Go to **Extensions $\rightarrow$ Apps Script**.
3. Ensure [`TRUSTGRID_SHEET2_ANALYTICS.js`](file:///c:/Users/srimp/Downloads/TRUSTGRID.NEW/TRUSTGRID_SHEET2_ANALYTICS.js) is pasted.
4. `DATA_SHEET_ID` is set to `"1cK4aA9usPB5lIWDlPEdV04zB_mOrHTLUYEys1p8gb80"`.
5. Run `buildAll15ExecutiveTabs` or refresh the sheet and use the toolbar menu:
   **🚀 TRUSTGRID ANALYTICS $\rightarrow$ 🔄 Refresh All 15 Dashboards**.
   - `🛰️ Mission Control`
   - `🚦 Executive KPIs`
   - `🗺️ Geo Map`
   - `📏 Pareto (80-20)`
   - `🕒 Daily Heatmap`
   - `📈 Growth & Momentum`
   - `👥 Visitor Ratio`
   - `📱 Tech Profile`
   - `🔗 Identity Linker`
   - `📊 Std Deviation`
   - `🌊 Sankey Flow`
   - `🤖 Broken Link QA`
   - `🔀 Co-Occurrence`
   - `🔻 Funnel Drops`
   - `🎯 Lead Scoring`
