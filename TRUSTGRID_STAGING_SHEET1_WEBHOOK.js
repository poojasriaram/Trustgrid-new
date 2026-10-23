/**
 * =========================================================================================
 * TRUSTGRID.AI - STAGING & VERCEL / LOCALHOST WEBHOOK ENGINE (SHEET 1 - STAGING)
 * =========================================================================================
 * Dedicated Webhook Receiver & Test Pipeline for:
 * 1. Vercel Preview Deployments (*.vercel.app)
 * 2. Localhost Development (localhost:3000)
 * 3. QA, Automated CI & Test Submissions
 * 
 * ⚠️ PURPOSE: Keeps test, bot, and staging traffic 100% ISOLATED from the Production
 * Google Sheet (trustgrid.ai / trustgrid.in).
 * 
 * =========================================================================================
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Create a NEW Google Sheet named "TRUSTGRID.AI - Staging & Vercel QA"
 * 2. In Google Sheets: Extensions > Apps Script
 * 3. Delete any default code and paste this entire script.
 * 4. (Optional) Put your new Sheet ID below in STAGING_CONFIG.SPREADSHEET_ID
 *    or leave it blank to auto-bind to the active spreadsheet!
 * 5. Click "Deploy" > "New deployment"
 * 6. Select Type: "Web app"
 *    - Description: "TrustGrid Staging Vercel Webhook"
 *    - Execute as: "Me"
 *    - Who has access: "Anyone"
 * 7. Click Deploy, Authorize, and Copy the Web App URL.
 * 8. Add to your .env.local and Vercel Environment Variables:
 *    NEXT_PUBLIC_TRUSTGRID_STAGING_WEBHOOK_URL=https://script.google.com/macros/s/AKfycbybp6YMsPeTshbmWSJVhW1K-yaInEoHVIheg9dHisYsv8apkUcOhL1KKR-7s5E9ZubIKQ/exec
 * 
 * ACTIVE DEPLOYMENT DETAILS:
 * - Deployment ID: AKfycbybp6YMsPeTshbmWSJVhW1K-yaInEoHVIheg9dHisYsv8apkUcOhL1KKR-7s5E9ZubIKQ
 * - Web App URL: https://script.google.com/macros/s/AKfycbybp6YMsPeTshbmWSJVhW1K-yaInEoHVIheg9dHisYsv8apkUcOhL1KKR-7s5E9ZubIKQ/exec
 * - Staging Spreadsheet ID: 1vc6sAUAH1Id7-mPEuwRtX7MaZ45uFdGAm9ppRYrAcOo
 * =========================================================================================
 */

const STAGING_CONFIG = {
  // Staging Spreadsheet ID (TRUSTGRID.AI - Staging & Vercel QA)
  SPREADSHEET_ID: "1vc6sAUAH1Id7-mPEuwRtX7MaZ45uFdGAm9ppRYrAcOo", 

  ENVIRONMENT_NAME: "STAGING (Vercel & Localhost)",
  AUTHORIZED_ORIGINS: ["vercel.app", "localhost", "127.0.0.1", "preview"],

  EMAIL_NOTIFICATIONS: {
    enabled: true,
    recipients: [
      "poojasri.trustgrid@gmail.com",
      "bv@trustflow.in"
    ],
    subjectPrefix: "[STAGING / VERCEL TEST] "
  }
};

/**
 * Handle incoming POST requests from Vercel & Localhost
 */
function doPost(e) {
  var lock = LockService.getScriptLock();
  var lockAcquired = false;

  try {
    lockAcquired = lock.tryLock(15000);
    if (!lockAcquired) {
      return createJsonResponse({ status: "busy", message: "Lock acquisition timeout" }, 429);
    }

    var payload = null;
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    if (!payload || Object.keys(payload).length === 0) {
      return createJsonResponse({ status: "empty_payload", message: "No data received" }, 400);
    }

    var ss = getStagingSpreadsheet();
    var timestamp = new Date();
    var formattedDate = Utilities.formatDate(timestamp, "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss 'IST'");

    // Determine event classification
    var isTelemetry = payload.event_type === "telemetry_95" || payload.event_name || payload.sheetName === "Live_Traffic_Events";
    var isConsultation = payload.form_type === "CONSULTATION" || payload.sheetName === "Contact_Leads" || payload.consultationSlot || payload.meetingType;
    var isCareer = payload.form_type === "CAREER" || payload.sheetName === "Career_Applications";

    var targetTabName = "Staging_Contact_Leads";
    if (isTelemetry) {
      targetTabName = "Staging_Traffic_Events";
    } else if (isConsultation) {
      targetTabName = "Staging_Consultation_Bookings";
    } else if (isCareer) {
      targetTabName = "Staging_Career_Applications";
    }

    var sheet = getOrCreateTab(ss, targetTabName);

    if (isTelemetry) {
      recordStagingTelemetry(sheet, payload, formattedDate);
    } else {
      recordStagingLead(sheet, payload, formattedDate, targetTabName);
      sendStagingAlertEmail(payload, targetTabName, formattedDate);
    }

    return ContentService.createTextOutput("Saved to Staging")
      .setMimeType(ContentService.MimeType.TEXT);

  } catch (err) {
    console.error("Staging Webhook Error: " + err.toString());
    return createJsonResponse({ status: "error", message: err.toString() }, 500);
  } finally {
    if (lockAcquired) {
      try { lock.releaseLock(); } catch (lErr) {}
    }
  }
}

/**
 * Handle GET requests for health check
 */
function doGet(e) {
  return createJsonResponse({
    status: "ok",
    service: "TRUSTGRID.AI Staging Webhook Engine",
    environment: STAGING_CONFIG.ENVIRONMENT_NAME,
    timestamp: new Date().toISOString(),
    supportedEndpoints: [
      "Staging_Contact_Leads",
      "Staging_Consultation_Bookings",
      "Staging_Traffic_Events",
      "Staging_Career_Applications"
    ]
  }, 200);
}

function formatPhoneForSheet(rawPhone) {
  if (rawPhone == null) return "";
  var str = String(rawPhone).trim();
  if (!str) return "";
  if (str.charAt(0) === "'") return str;
  return "'" + str;
}

/**
 * Record a Staging Lead or Consultation Booking
 */
function recordStagingLead(sheet, p, dateStr, tabName) {
  var name = p.fullName || p.name || "Test User";
  var email = p.work_email || p.email || p.userEmail || "test@example.com";
  var rawPhone = p.phone || p.mobile || p.phoneNumber || p.phone_number || "";
  var phone = formatPhoneForSheet(rawPhone);
  var company = p.company || p.currentPreviousCompany || "";
  var role = p.role || p.designation || p.jobTitle || "";
  var companySize = p.companySize || "";
  var industry = p.industry || "";
  var interest = p.areaOfInterest || p.partnershipType || p.requirement || "";
  var challenge = p.businessChallenge || p.challenges || p.message || "";
  var meetingType = p.meetingType || "Google Meet";
  var slot = p.consultationSlot || p.preferredTimeline || "";
  var timezone = p.clientTimezone || p.timezone || "IST";
  var pageUrl = p.page_url || p.pageUrl || "";
  var source = p.leadSource || p.ctaSource || p.utm_source || "Vercel / Localhost QA";
  var submissionId = p.submissionId || p.lead_id || ("TG-TEST-" + Date.now());

  var row = [
    dateStr,
    submissionId,
    name,
    email,
    phone,
    company,
    role,
    companySize,
    industry,
    interest,
    challenge,
    meetingType,
    slot,
    timezone,
    source,
    pageUrl,
    "STAGING_VERCEL"
  ];

  sheet.appendRow(row);
  styleDataRow(sheet, sheet.getLastRow());
}

/**
 * Record Staging Telemetry / Page View / Behavior Event
 */
function recordStagingTelemetry(sheet, p, dateStr) {
  var row = [
    dateStr,
    p.session_id || "",
    p.user_id || "",
    p.event_name || "page_view",
    p.page || p.page_url || "",
    p.page_title || "",
    p.traffic_source || "direct",
    p.utm_source || "",
    p.utm_medium || "",
    p.utm_campaign || "",
    p.device_type || "",
    p.browser || "",
    p.operating_system || "",
    p.time_on_page ? Math.round(p.time_on_page / 1000) : 0,
    p.scroll_percentage || 0,
    p.ip_address || "127.0.0.1",
    "STAGING_TEST"
  ];

  sheet.appendRow(row);
}

/**
 * Dispatch an email alert for test submissions on Vercel/localhost
 */
function sendStagingAlertEmail(p, tabName, dateStr) {
  if (!STAGING_CONFIG.EMAIL_NOTIFICATIONS.enabled) return;

  var recipients = STAGING_CONFIG.EMAIL_NOTIFICATIONS.recipients.join(",");
  var name = p.fullName || p.name || "Test User";
  var email = p.work_email || p.email || "test@example.com";
  var phone = p.phone || p.mobile || "N/A";
  var company = p.company || "Test Company";
  var slot = p.consultationSlot || "N/A";
  var challenge = p.businessChallenge || p.message || "N/A";

  var subject = STAGING_CONFIG.EMAIL_NOTIFICATIONS.subjectPrefix + name + " (" + company + ")";

  var htmlBody = `
    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background: #f59e0b; padding: 12px 20px; color: #ffffff; font-weight: 700; font-size: 14px; text-transform: uppercase; letter-spacing: 0.5px;">
        ⚠️ Test Submission — Vercel / Staging Environment
      </div>
      <div style="padding: 24px; background: #ffffff;">
        <p style="margin: 0 0 16px; color: #475569; font-size: 13px;">
          This lead was submitted from a <strong>Vercel preview build or localhost</strong> and has been recorded in the <strong>Staging Sheet</strong>. It does not contaminate production records.
        </p>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b; width: 140px;">Full Name:</td><td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${name}</td></tr>
          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Business Email:</td><td style="padding: 8px 0; font-weight: 600; color: #0f172a;"><a href="mailto:${email}">${email}</a></td></tr>
          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Mobile:</td><td style="padding: 8px 0; color: #0f172a;">${phone}</td></tr>
          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Company:</td><td style="padding: 8px 0; color: #0f172a;">${company}</td></tr>
          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Consultation Slot:</td><td style="padding: 8px 0; color: #2563eb; font-weight: 600;">${slot}</td></tr>
          <tr style="border-bottom: 1px solid #f1f5f9;"><td style="padding: 8px 0; color: #64748b;">Business Challenge:</td><td style="padding: 8px 0; color: #0f172a;">${challenge}</td></tr>
          <tr><td style="padding: 8px 0; color: #64748b;">Received:</td><td style="padding: 8px 0; color: #64748b; font-size: 12px;">${dateStr}</td></tr>
        </table>
      </div>
      <div style="background: #f8fafc; padding: 12px 20px; font-size: 11px; color: #94a3b8; text-align: center; border-top: 1px solid #e2e8f0;">
        TRUSTGRID.AI Automated QA & Staging Webhook Pipeline
      </div>
    </div>
  `;

  try {
    MailApp.sendEmail({
      to: recipients,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (mailErr) {
    console.error("Failed to send staging alert email: " + mailErr.toString());
  }
}

/**
 * Get or initialize tab with headers
 */
function getOrCreateTab(ss, tabName) {
  var sheet = ss.getSheetByName(tabName);
  if (!sheet) {
    sheet = ss.insertSheet(tabName);
    var headers = [];

    if (tabName === "Staging_Traffic_Events") {
      headers = [
        "Timestamp", "Session ID", "User ID", "Event Name", "Page URL", "Page Title",
        "Traffic Source", "UTM Source", "UTM Medium", "UTM Campaign", "Device",
        "Browser", "OS", "Dwell Time (s)", "Scroll Depth (%)", "IP Address", "Environment"
      ];
    } else {
      headers = [
        "Timestamp", "Submission ID", "Full Name", "Business Email", "Mobile Number",
        "Company Name", "Job Title", "Company Size", "Industry", "Area of Interest",
        "Business Challenge", "Meeting Type", "Selected Slot", "Timezone", "Lead Source",
        "Page URL", "Environment"
      ];
    }

    sheet.appendRow(headers);

    // Style Header Row (Amber / Orange theme to signify Staging)
    var headerRange = sheet.getRange(1, 1, 1, headers.length);
    headerRange.setBackground("#d97706");
    headerRange.setFontColor("#ffffff");
    headerRange.setFontWeight("bold");
    headerRange.setFontSize(10);
    headerRange.setHorizontalAlignment("center");
    sheet.setFrozenRows(1);
  }
  return sheet;
}

/**
 * Subtle border and zebra stripe for lead rows
 */
function styleDataRow(sheet, rowIdx) {
  try {
    var range = sheet.getRange(rowIdx, 1, 1, sheet.getLastColumn());
    var bg = (rowIdx % 2 === 0) ? "#fef3c7" : "#ffffff";
    range.setBackground(bg);
    range.setFontSize(9.5);
  } catch (e) {}
}

/**
 * Get Spreadsheet instance
 */
function getStagingSpreadsheet() {
  if (STAGING_CONFIG.SPREADSHEET_ID && STAGING_CONFIG.SPREADSHEET_ID.trim().length > 10) {
    return SpreadsheetApp.openById(STAGING_CONFIG.SPREADSHEET_ID.trim());
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

/**
 * Helper JSON response
 */
function createJsonResponse(data, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Run this function once from the script editor to initialize all tabs
 */
function setupStagingSheetTabs() {
  var ss = getStagingSpreadsheet();
  getOrCreateTab(ss, "Staging_Contact_Leads");
  getOrCreateTab(ss, "Staging_Consultation_Bookings");
  getOrCreateTab(ss, "Staging_Traffic_Events");
  getOrCreateTab(ss, "Staging_Career_Applications");
  Logger.log("✅ All Staging Sheet tabs created successfully!");
}
