# TRUSTGRID.AI — GOOGLE APPS SCRIPT SETUP & DEPLOYMENT GUIDE

This guide provides step-by-step instructions for setting up the **TWO SEPARATE** Google Apps Script systems and connecting them to the TrustGrid.ai website.

---

## ARCHITECTURE OVERVIEW

```
[ TrustGrid.ai Website ] (Primary: AI Diagnostic, Contact, Newsletter, Partners, Careers)
         │
         ▼  (POST JSON with UTM & telemetry metadata)
┌────────────────────────────────────────────────────────────────────────┐
│ SCRIPT 1: TRUSTGRID FORM DATA CAPTURE (TRUSTGRID_FORM_CAPTURE.gs)       │
│ - Sanitization (anti-formula injection) & Validation                   │
│ - Unique ID generation: TG-YYYYMMDD-XXXX                               │
│ - Configurable Lead Scoring Engine (HIGH / MEDIUM / LOW)               │
│ - Enterprise HTML internal notification to: poojasri.trustgrid@gmail.com│
│ - Confirmation email to lead                                           │
└────────────────────────────────────────────────────────────────────────┘
         │
         ▼ (Stores raw records)
┌────────────────────────────────────────────────────────────────────────┐
│ GOOGLE SHEET #1: TRUSTGRID.AI — FORM DATA                               │
│ Sheets: Leads (34 master columns), AI Diagnostic Leads, Contact Leads, │
│         Newsletter Leads, Partnership Leads, Career Leads, Email Log,  │
│         Configuration                                                  │
└────────────────────────────────────────────────────────────────────────┘
         │
         ▼ (Periodic read & aggregation)
┌────────────────────────────────────────────────────────────────────────┐
│ SCRIPT 2: TRUSTGRID ANALYTICS + REPORTING (TRUSTGRID_ANALYTICS.gs)      │
│ - Executive KPI calculations & automated charts                        │
│ - UTM, Geo, Industry, AI Maturity, Device, and Funnel analytics        │
│ - Automated Daily, Weekly, and Monthly HTML email dispatch             │
│ - Idempotent time triggers (Asia/Kolkata)                              │
└────────────────────────────────────────────────────────────────────────┘
         │
         ▼
┌────────────────────────────────────────────────────────────────────────┐
│ GOOGLE SHEET #2: TRUSTGRID.AI — ANALYTICS & DASHBOARD                  │
│ Sheets: Executive Dashboard, Lead Analytics, Form Analytics, Traffic,  │
│         UTM Analytics, Industry, AI Maturity, Funnel, Trends, etc.     │
└────────────────────────────────────────────────────────────────────────┘
```

---

## STEP-BY-STEP DEPLOYMENT

### PART 1: SETUP GOOGLE SHEET #1 & APPS SCRIPT #1 (FORM DATA CAPTURE)

1. **Create Google Sheet #1**:
   - Go to [Google Sheets](https://sheets.new) and create a new spreadsheet.
   - Rename the spreadsheet to: **`TRUSTGRID.AI — FORM DATA`**
   - Copy the Spreadsheet ID from the URL:
     `https://docs.google.com/spreadsheets/d/`**`<SPREADSHEET_ID_1>`**`/edit`

2. **Open Apps Script Editor**:
   - In Google Sheet #1, click **Extensions** > **Apps Script**.
   - Rename the Apps Script project to: **`TRUSTGRID_FORM_CAPTURE`**

3. **Paste Code**:
   - Delete any default code in `Code.gs`.
   - Copy and paste the entire content of [`google-apps-script/TRUSTGRID_FORM_CAPTURE.gs`](file:///c:/Users/srimp/Downloads/TRUSTGRID.NEW/google-apps-script/TRUSTGRID_FORM_CAPTURE.gs).

4. **Configure Script Properties**:
   - In the left sidebar of the Apps Script editor, click **Project Settings** (gear icon ⚙️).
   - Scroll down to **Script Properties** and click **Add script property**:
     - `SPREADSHEET_ID` = `<SPREADSHEET_ID_1>`
     - `REPORT_EMAIL` = `poojasri.trustgrid@gmail.com`
     - `COMPANY_NAME` = `TrustGrid.ai`
     - `TIMEZONE` = `Asia/Kolkata`
   - Click **Save script properties**.

5. **Run Initial Setup**:
   - In the editor toolbar dropdown, select the function **`setupFormCaptureSpreadsheet`**.
   - Click **Run**.
   - Review and grant the necessary Google permissions when prompted.
   - Check Google Sheet #1: All 8 sheets (`Leads`, `AI Diagnostic Leads`, `Contact Leads`, etc.) and the 34 master headers will be automatically created with navy enterprise formatting.

6. **Deploy as Web App**:
   - In the top right corner, click **Deploy** > **New deployment**.
   - Click the gear icon next to "Select type" and choose **Web app**.
   - Set the following configuration:
     - **Description**: `TrustGrid Production Form Webhook v1`
     - **Execute as**: `Me (your Google account)`
     - **Who has access**: `Anyone` *(Crucial so website visitors can submit forms)*
   - Click **Deploy**.
   - Copy the **Web App URL** (e.g., `https://script.google.com/macros/s/AKfycbx.../exec`).

---

### PART 2: CONNECT WEB APP URL TO NEXT.JS WEBSITE

1. In the root directory of your project, create or edit `.env.local`:
   ```env
   NEXT_PUBLIC_TRUSTGRID_FORM_API_URL=https://script.google.com/macros/s/YOUR_SCRIPT_1_DEPLOYMENT_ID/exec
   ```
2. Restart your development server or redeploy to production (e.g. Vercel):
   ```bash
   npm run build
   ```

---

### PART 3: SETUP GOOGLE SHEET #2 & APPS SCRIPT #2 (ANALYTICS & REPORTING)

1. **Create Google Sheet #2**:
   - Open a new tab and go to [Google Sheets](https://sheets.new).
   - Rename the spreadsheet to: **`TRUSTGRID.AI — ANALYTICS & DASHBOARD`**
   - Copy the Spreadsheet ID from the URL:
     `https://docs.google.com/spreadsheets/d/`**`<SPREADSHEET_ID_2>`**`/edit`

2. **Open Apps Script Editor for Script #2**:
   - In Google Sheet #2, click **Extensions** > **Apps Script**.
   - Rename the project to: **`TRUSTGRID_ANALYTICS`**

3. **Paste Code**:
   - Delete default code in `Code.gs`.
   - Copy and paste the entire content of [`google-apps-script/TRUSTGRID_ANALYTICS.gs`](file:///c:/Users/srimp/Downloads/TRUSTGRID.NEW/google-apps-script/TRUSTGRID_ANALYTICS.gs).

4. **Configure Script Properties for Script #2**:
   - In **Project Settings** (⚙️), add:
     - `DATA_SPREADSHEET_ID` = `<SPREADSHEET_ID_1>` *(ID of Sheet #1)*
     - `ANALYTICS_SPREADSHEET_ID` = `<SPREADSHEET_ID_2>` *(ID of Sheet #2)*
     - `REPORT_EMAIL` = `poojasri.trustgrid@gmail.com`
     - `TIMEZONE` = `Asia/Kolkata`
   - Click **Save script properties**.

5. **Run Initial Refresh & Trigger Setup**:
   - In the editor toolbar dropdown, select the function **`setupTriggers`** and click **Run**. Grant permissions when prompted.
   - In the dropdown, select **`refreshAnalytics`** and click **Run**.
   - Check Google Sheet #2: The Executive Dashboard, KPI cards, charts, and all analytics sheets will populate automatically.

---

## AUTOMATED SCHEDULES

Script #2 creates the following automated triggers:
- **Daily Report**: Everyday at 08:00 AM IST (Summary of today's leads + pipeline)
- **Weekly Intelligence Report**: Every Monday at 08:00 AM IST
- **Monthly Enterprise Report**: 1st of every month at 08:00 AM IST

---

## VERIFICATION CHECKLIST

- [x] AI Diagnostic Form submission at `/book-ai-diagnostic`
- [x] General Inquiry submission at `/contact`
- [x] Newsletter Subscription at `/insights`
- [x] Partnership Proposal at `/partners`
- [x] Career Application at `/careers`
- [x] Automatic UTM parameter extraction from URL (`?utm_source=...`)
- [x] Formula injection prevention (sanitizing `=`, `+`, `-`, `@`)
- [x] Lead score calculation (0–100) and HIGH/MEDIUM/LOW badge
- [x] Instant notification email sent to `poojasri.trustgrid@gmail.com`
- [x] User confirmation email with `TG-YYYYMMDD-XXXX` reference ID
- [x] Analytics refresh and dashboard charts in Sheet #2
