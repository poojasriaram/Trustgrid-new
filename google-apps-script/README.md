# TrustGrid.AI — Google Apps Script Backend Engines

This folder contains two enterprise-grade Google Apps Script engines designed to capture all form submissions, chatbot leads, traffic attribution, and funnel telemetry across the entire TRUSTGRID.AI platform.

---

## 📂 Available Scripts

| Script File | Purpose | Tabs Handled |
| :--- | :--- | :--- |
| **`Data_Collection_Engine.gs`** (Script 1) | **High-Intent Form & Lead Capture** | `Leads`, `Chatbot Leads`, `Careers` |
| **`Traffic_Analytics_Engine.gs`** (Script 2) | **Traffic & Behavior Telemetry** | `Traffic`, `Form Events`, `CTA Events`, `WhatsApp Events`, `Scroll Depth` |
| **`Code.gs`** (Unified Script) | **All-in-One Engine** | All 6 tabs combined in one script |

---

## 🚀 Deployment Guide (for New Google Sheet)

### Option A: Using 2 Separate Sheets / Web Apps (Recommended)

1. **For Form & Lead Collection**:
   - Create a Google Sheet named `TrustGrid - Leads & Inquiries`.
   - Go to **Extensions** > **Apps Script**.
   - Paste the code from [`Data_Collection_Engine.gs`](./Data_Collection_Engine.gs).
   - Click **Deploy** > **New deployment** > Type: **Web app**:
     - *Execute as*: **Me**
     - *Who has access*: **Anyone**
   - Copy the Web App URL and set it as `NEXT_PUBLIC_TRUSTGRID_FORM_API_URL`.

2. **For Traffic & Behavior Analytics**:
   - Create a Google Sheet named `TrustGrid - Analytics & Telemetry`.
   - Go to **Extensions** > **Apps Script**.
   - Paste the code from [`Traffic_Analytics_Engine.gs`](./Traffic_Analytics_Engine.gs).
   - Deploy as Web App (**Anyone** access).
   - Copy the Web App URL and set it as `NEXT_PUBLIC_TRUSTGRID_ANALYTICS_API_URL`.

---

### Option B: Using 1 Unified Master Sheet

- If you want all 6 tabs in a single Google Sheet, paste [`Code.gs`](./Code.gs) into your Google Sheet's Apps Script editor and deploy it.
- Use the single deployment URL for both `NEXT_PUBLIC_TRUSTGRID_FORM_API_URL` and `NEXT_PUBLIC_TRUSTGRID_ANALYTICS_API_URL`.

---

## 🛡️ Reliability & Security Features

- **Auto-Initialization**: Tabs and formatted dark headers (`#060e22` background with `#38bdf8` cyan text) are created automatically on the first submission.
- **LockService Concurrency**: Prevents race conditions and dropped submissions during traffic spikes.
- **Anti-Duplicate Filter**: Debounces duplicate form submissions within a 10-row window.
- **Full Attribution**: Records first-touch, last-touch, UTM parameters, device, browser, and landing page.
