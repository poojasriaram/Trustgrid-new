# TRUSTGRID.AI / ISIVX3 — Production Deployment Guide

## 🚀 Overview
This package contains the complete production-ready build and source code for the **TRUSTGRID.AI (ISIVX3)** enterprise platform.

- **Release Date**: 24-10-2026
- **Release Version**: Production (ISIVX3-24-10-2026)
- **Framework**: Next.js 16.3.3 (Turbopack) & React 19
- **Build Status**: Verified (318/318 Static & Dynamic Routes Generated Successfully)

---

## 📋 Prerequisites
- **Node.js**: `>= 18.18.0` (Node 20+ recommended)
- **npm** or **yarn** or **pnpm**
- **Hosting Platforms**: Vercel, AWS Amplify, Docker, or Node.js VM/Server

---

## ⚙️ Environment Configuration

Copy `.env.example` to `.env.local` or configure the variables in your production hosting platform:

```bash
cp .env.example .env.local
```

### Key Environment Variables:
```env
# Google Apps Script Webhooks
TRUSTGRID_SHEET1_WEBHOOK_URL="https://script.google.com/macros/s/AKfycbxZ9QvaSdgCGE8t6btfwTSmfklZ6j5F0o_CPyqFJPvm7LMncLS85xQVP2ObqkWNy803/exec"
NEXT_PUBLIC_TRUSTGRID_SHEET1_WEBHOOK_URL="https://script.google.com/macros/s/AKfycbxZ9QvaSdgCGE8t6btfwTSmfklZ6j5F0o_CPyqFJPvm7LMncLS85xQVP2ObqkWNy803/exec"

# JIRA Lead Pipeline (DFX Project)
JIRA_BASE_URL="https://trustworkz.atlassian.net"
JIRA_USER_EMAIL="bv@trustflow.in"
JIRA_API_TOKEN="ATATT3xFfGF0h79-u6Gq55eWp1tK7QZzP8r6f5t3g4"
JIRA_PROJECT_KEY="DFX"

# Google Sheets IDs
MAIN_SPREADSHEET_ID="1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0"
SHEET2_ANALYTICS_SPREADSHEET_ID="1jC53QN1qiuiRFLzdneA46TECBztER5btTo7qGphb5TM"
```

---

## 🛠️ Deployment Instructions

### Option 1: Vercel (Recommended)
1. Push the code to GitHub (`main` branch).
2. Connect the repository in the Vercel dashboard.
3. Configure the environment variables in **Project Settings > Environment Variables**.
4. Build command: `npm run build`
5. Output directory: `.next`

### Option 2: Node.js VM / Docker Container
1. Extract the release archive:
   ```bash
   tar -xvf ISIVX3-24-10-2026.tar
   ```
2. Install production dependencies:
   ```bash
   npm ci --production
   ```
3. Start the production server:
   ```bash
   npm run start
   ```
   The application will listen on port `3000` (or `PORT` env variable).

---

## 🔍 Validation Checklist
- [x] Full production build verified (`next build` - 318 routes)
- [x] Lead generation pipelines active (Contact, Consultation, AI Diagnostic, RFP, Talk to Expert)
- [x] Dual Google Sheets integration operational (Data Collection Sheet 1 + Executive Analytics Sheet 2)
- [x] JIRA lead ticket automation enabled (DFX project)
- [x] SEO & Social graph verified (Sitemap, Robots.txt, OpenGraph metadata)
- [x] Responsive layout & Dark/Light mode verified
