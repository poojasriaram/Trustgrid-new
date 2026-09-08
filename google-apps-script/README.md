# TRUSTGRID.AI — Google Apps Script Integration Guide

This guide explains how to connect the **TRUSTGRID.AI** web application to Google Sheets and automate **Daily**, **Weekly**, and **Monthly** executive reports sent directly to **poojasri.aram@gmail.com**.

---

## 🚀 1. Create Your Google Sheet & Open Apps Script

1. Go to [Google Sheets](https://sheets.new) and create a new spreadsheet.
2. Name it: `TRUSTGRID.AI — Diagnostic & Enterprise Pipeline`.
3. In the top menu, click **Extensions** → **Apps Script**.

---

## 📝 2. Paste the Script Code

1. Delete any boilerplate code inside the `Code.gs` editor.
2. Copy the full script content from `google-apps-script/TrustGrid_GoogleAppsScript.js` and paste it into `Code.gs`.
3. Click the **Save** icon (💾) or press `Ctrl + S` / `Cmd + S`.

---

## 🌐 3. Deploy as a Web App (Webhook Endpoint)

1. In the Apps Script editor, click **Deploy** (top right) → **New deployment**.
2. Click the **Gear icon (⚙️)** next to "Select type" and select **Web app**.
3. Fill in the deployment details:
   - **Description:** `TrustGrid AI Diagnostic Webhook v1`
   - **Execute as:** `Me (your email)`
   - **Who has access:** `Anyone` *(Crucial so the website form can submit data)*
4. Click **Deploy**.
5. Grant permissions if prompted (Click *Advanced* → *Go to project (unsafe)* → *Allow*).
6. **Copy the Web App URL** (it looks like `https://script.google.com/macros/s/AKfycb.../exec`).

---

## 🔗 4. Connect Web App URL to the Next.js Website

In the root of your `TRUSTGRID.NEW` project, add the Web App URL to your `.env.local` file:

```env
NEXT_PUBLIC_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbYOUR_DEPLOYMENT_ID/exec
```

Whenever a client submits the **Book Your AI Diagnostic** form on the website:
- A new row is automatically appended into the **"Diagnostic Leads"** tab in Google Sheets.
- An **instant alert email** is dispatched to `poojasri.aram@gmail.com`.

---

## ⏰ 5. Automate Daily, Weekly & Monthly Reports (1-Click)

In the Apps Script editor:
1. Select the function **`setupTriggers`** from the function dropdown at the top toolbar.
2. Click **Run**.
3. Review and grant permissions if prompted.

### Scheduled Automated Reports:
- **Daily Executive Report:** Automatically runs every morning at **8:00 AM** and emails a summary of the last 24 hours of submissions.
- **Weekly Summary Report:** Automatically runs every **Monday at 9:00 AM** with 7-day cumulative metrics, top solution domains, and industry breakdowns.
- **Monthly Strategic Report:** Automatically runs on the **1st of every month at 10:00 AM** with 30-day analytics and pipeline synthesis.

---

## 🧪 6. Test the Reports Manually

You can test any report immediately by selecting:
- `sendDailyReport` → Click **Run**
- `sendWeeklyReport` → Click **Run**
- `sendMonthlyReport` → Click **Run**

Check your inbox at `poojasri.aram@gmail.com` to see the formatted HTML email reports!
