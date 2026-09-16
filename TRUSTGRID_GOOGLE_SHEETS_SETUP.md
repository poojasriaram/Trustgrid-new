# 🚀 TrustGrid.AI — Google Sheets & Analytics Setup Guide

This guide explains how to configure your 2-Sheet system for **TrustGrid.AI**.

---

## 📁 Generated Script Files in Workspace

| Script File | Target Sheet | Purpose |
| :--- | :--- | :--- |
| [`TRUSTGRID_SHEET1_WEBHOOK.js`](file:///c:/Users/srimp/Downloads/TRUSTGRID.NEW/TRUSTGRID_SHEET1_WEBHOOK.js) | **Sheet 1** (Data Collection & Webhook) | Captures form submissions, telemetry, UTM tracking, saves resumes to Google Drive, routes Ad leads, sends category-specific TrustGrid HTML notification emails & scheduled digests. |
| [`TRUSTGRID_SHEET2_ANALYTICS.js`](file:///c:/Users/srimp/Downloads/TRUSTGRID.NEW/TRUSTGRID_SHEET2_ANALYTICS.js) | **Sheet 2** (Analytics & Intelligence) | Reads raw data from Sheet 1, filters localhost/dev traffic, and builds 16 automated dashboard tabs (Mission Control, KPIs, Heatmaps, Sankey Flows, Lead Scoring, Leads & Conversions, etc.). |

---

## 🔗 Active Live Deployment References

### Sheet 1 (Data Collection & Webhook Database)
* **Spreadsheet ID**: `1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0`
* **Deployment ID**: `AKfycbxZ9QvaSdgCGE8t6btfwTSmfklZ6j5F0o_CPyqFJPvm7LMncLS85xQVP2ObqkWNy803`
* **Web App URL**: `https://script.google.com/macros/s/AKfycbxZ9QvaSdgCGE8t6btfwTSmfklZ6j5F0o_CPyqFJPvm7LMncLS85xQVP2ObqkWNy803/exec`

### Sheet 2 (Executive Analytics & Intelligence Hub)
* **Spreadsheet ID**: `1jC53QN1qiuiRFLzdneA46TECBztER5btTo7qGphb5TM`
* **Deployment ID**: `AKfycbwJdB7zxd15Ti92powzWdwHzQPe-qlPBLDeKxNazgKkQjajK8IXjUWQ6OTkPP5N_wOavQ`
* **Web App URL**: `https://script.google.com/macros/s/AKfycbwJdB7zxd15Ti92powzWdwHzQPe-qlPBLDeKxNazgKkQjajK8IXjUWQ6OTkPP5N_wOavQ/exec`
* **Connected `DATA_SHEET_ID`**: `1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0`

---

## ⚙️ Step-by-Step Deployment Instructions

### 1️⃣ Sheet 1 Configuration
1. Open your **Sheet 1 Spreadsheet** (`1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0`).
2. Go to **Extensions $\rightarrow$ Apps Script**.
3. Ensure [`TRUSTGRID_SHEET1_WEBHOOK.js`](file:///c:/Users/srimp/Downloads/TRUSTGRID.NEW/TRUSTGRID_SHEET1_WEBHOOK.js) is pasted.
4. **Pre-Create Database Tables**: In the function dropdown, select `initializeAllDatabaseTables` and click **Run**. This auto-creates all 18 dedicated tabs:
   - `Contact Leads` *(General contact inquiries & consultation requests)*
   - `AI Diagnostic Leads` *(Executive AI Diagnostic bookings)*
   - `AI Readiness Leads` *(AI Readiness & infrastructure assessments)*
   - `Workshop Requests` *(AI Use-Case & Value workshops)*
   - `RFP Proposals` *(Enterprise Request for Proposal / Scope)*
   - `Talk to Architect` *(Direct Senior AI Architect technical consultation)*
   - `Chatbot Leads` *(AI Architect Interactive Chatbot lead captures)*
   - `Career Applications` *(Engineering & Fellowships with Google Drive resume link)*
   - `Partner Applications` *(Ecosystem & Strategic SI / Cloud Partnerships)*
   - `Newsletter Subscribers` *(Executive Insights & Whitepapers subscriptions)*
   - `Form Submissions` *(Master Consolidated Backup of EVERY form submission)*
   - `Page Views`, `Sessions`, `CTA Clicks`, `UTM Data`, `Website Events`, `Errors` *(visitor telemetry)*
   - `Spam Blocked` *(honeypot & heuristic spam blocked for audit)*
5. *(Optional Test)* Select `sendAllSamplePreviewEmailsToPooja` and click **Run** to verify email delivery to `poojasri.aram@gmail.com`.
6. *(Optional Cleanup)* Select `deleteOldUnwantedTabs` and click **Run** to ensure all active tabs are clean and formatted.

---

### 2️⃣ Sheet 2 Configuration (16-Tab Analytics Engine)
1. Open your **Sheet 2 Spreadsheet** (`1jC53QN1qiuiRFLzdneA46TECBztER5btTo7qGphb5TM`).
2. Go to **Extensions $\rightarrow$ Apps Script**.
3. Ensure [`TRUSTGRID_SHEET2_ANALYTICS.js`](file:///c:/Users/srimp/Downloads/TRUSTGRID.NEW/TRUSTGRID_SHEET2_ANALYTICS.js) is pasted.
4. `DATA_SHEET_ID` is set to `"1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0"`.
5. Run `PULL_DATA_AND_BUILD_ALL_DASHBOARDS` or refresh the sheet and use the toolbar menu:
   **🚀 TRUSTGRID ANALYTICS $\rightarrow$ 🔄 Refresh All 16 Dashboards**.
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
   - `📋 Leads & Conversions`
