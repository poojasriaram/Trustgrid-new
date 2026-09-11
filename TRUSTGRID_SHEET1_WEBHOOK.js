/**
 * =========================================================================================
 * TRUSTGRID.AI - DATA COLLECTION & WEBHOOK ENGINE (SHEET 1)
 * =========================================================================================
 * Focused, lightweight, production-grade webhook receiver for TrustGrid.AI:
 * 1. Form Submissions: Leads (Contact), AI Diagnostic Leads, Careers, Partners, Insights
 * 2. Visitor Telemetry: Page Views, Sessions, CTA Clicks, UTM Data, Website Events, Errors
 * 3. Drive Resume Archiving for Career applicants
 * 4. Executive HTML alerts to poojasri.aram@gmail.com
 * =========================================================================================
 */

// =========================================================================================
// 1. CONFIGURATION
// =========================================================================================

const CONFIG = {
  // Main TrustGrid Spreadsheet ID (Sheet 1)
  MAIN_SPREADSHEET_ID: "1cK4aA9usPB5lIWDlPEdV04zB_mOrHTLUYEys1p8gb80",

  // Drive folder for candidate resumes
  CAREER_RESUMES_FOLDER_NAME: "TrustGrid_Career_Resumes",
  CAREER_RESUMES_FOLDER_ID: ""
};

const EMAIL_CONFIG = {
  name: "TrustGrid AI Intelligence",
  primaryAdmin: "poojasri.aram@gmail.com",
  replyTo: "hello@trustgrid.ai",
  website: "https://www.trustgrid.ai"
};

// =========================================================================================
// 2. TAB SCHEMAS (EXACT SHEET 1 STRUCTURE)
// =========================================================================================

var TAB_CONFIGS = {
  // 1. Website Events (General interactions, navigation, scroll milestones)
  "Website Events": [
    "Session ID", "Visitor ID", "Event Type", "Element", "Element Text", "Page Path",
    "Scroll Depth", "Time on Page", "Device", "Timestamp"
  ],

  // 2. Page Views (Every visitor page hit)
  "Page Views": [
    "Session ID", "Visitor ID", "Page Path", "Page Title", "Referrer", "Traffic Source",
    "UTM Source", "UTM Medium", "UTM Campaign", "Device", "Browser", "OS", "IP Location", "Timestamp"
  ],

  // 3. CTA Clicks (Button & link interactions)
  "CTA Clicks": [
    "Session ID", "Visitor ID", "CTA Name", "Destination URL", "Section", "Page Path",
    "Device", "Timestamp"
  ],

  // 4. Form Submissions (Consolidated form log with Drive resume link for Careers)
  "Form Submissions": [
    "Submission ID", "Form Name", "Name", "Email", "Company / Org", "Role", "Phone",
    "Message / Details", "Resume Drive Link", "Drive File ID",
    "UTM Source", "UTM Campaign", "IP Location", "IP Address", "Timestamp"
  ],

  // 5. Sessions (Unique visitor sessions)
  "Sessions": [
    "Session ID", "Visitor ID", "Landing Page", "Referrer", "Traffic Source",
    "UTM Source", "UTM Campaign", "Device", "Browser", "OS", "Screen Size", "IP Location", "Timestamp"
  ],

  // 6. UTM Data (Campaign tracking)
  "UTM Data": [
    "Session ID", "Visitor ID", "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Landing Page", "Referrer", "Timestamp"
  ],

  // 7. Errors (Client & form error logs)
  "Errors": [
    "Session ID", "Error Message", "Error Stack", "Page URL", "Device", "IP Address", "Timestamp"
  ],

  // 8. Leads (Inbound contact inquiries, partners, careers)
  "Leads": [
    "Submission ID", "Name", "Email", "Company", "Designation", "Phone",
    "Form Type", "Service Interest", "Subject", "Message",
    "UTM Source", "UTM Medium", "UTM Campaign", "IP Location", "Status", "Timestamp"
  ],

  // 9. AI Diagnostic Leads (Dedicated enterprise diagnostic submissions)
  "AI Diagnostic Leads": [
    "Submission ID", "Name", "Email", "Company", "Role", "Company Size", "Industry",
    "AI Maturity Level", "Primary Objectives", "Selected Solutions", "Preferred Timeline", "Notes",
    "UTM Source", "UTM Medium", "UTM Campaign", "IP Location", "Status", "Timestamp"
  ]
};

// Aliases to route incoming submissions flexibly
var SHEET_NAME_ALIASES = {
  "leads": "Leads", "contact": "Leads", "contactform": "Leads", "contact_submissions": "Leads", "talktoaiarchitect": "Leads",
  "aidiagnosticleads": "AI Diagnostic Leads", "ai_diagnostics": "AI Diagnostic Leads", "aidiagnostic": "AI Diagnostic Leads", "bookaidiagnostic": "AI Diagnostic Leads", "diagnostic": "AI Diagnostic Leads", "requestproposal": "AI Diagnostic Leads",
  "formsubmissions": "Form Submissions", "form_submissions": "Form Submissions", "forms": "Form Submissions", "careerapplications": "Form Submissions", "career_applications": "Form Submissions", "partnerapplications": "Form Submissions", "partner_applications": "Form Submissions", "insightssubscriptions": "Form Submissions",
  "pageviews": "Page Views", "page_views": "Page Views", "trafficanalytics": "Page Views", "traffic_analytics": "Page Views",
  "sessions": "Sessions", "ctaclicks": "CTA Clicks", "cta_clicks": "CTA Clicks",
  "utmdata": "UTM Data", "utm_data": "UTM Data", "websiteevents": "Website Events", "website_events": "Website Events", "errors": "Errors"
};

function getOrCreateTab(spreadsheet, tabName) {
  var sheet = spreadsheet.getSheetByName(tabName);
  if (!sheet) {
    var sheets = spreadsheet.getSheets();
    for (var i = 0; i < sheets.length; i++) {
      if (sheets[i].getName().toLowerCase().replace(/[\s\-_]/g, '') === tabName.toLowerCase().replace(/[\s\-_]/g, '')) {
        return sheets[i];
      }
    }
    sheet = spreadsheet.insertSheet(tabName);
    var headers = TAB_CONFIGS[tabName];
    if (headers && headers.length > 0) {
      sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
      styleHeaderRow(sheet, headers.length);
    }
  }
  return sheet;
}

function styleHeaderRow(sheet, numCols) {
  var headerRange = sheet.getRange(1, 1, 1, numCols);
  headerRange.setBackground("#0f172a");
  headerRange.setFontColor("#f8fafc");
  headerRange.setFontWeight("bold");
  headerRange.setFontFamily("Inter");
  headerRange.setFontSize(10);
  headerRange.setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
}

// 🚀 Pre-creates all 9 requested tabs in Sheet 1 with dark header formatting
function initializeAllDatabaseTables() {
  var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  var created = [];

  for (var tabName in TAB_CONFIGS) {
    var sheet = getOrCreateTab(ss, tabName);
    created.push(sheet.getName());
  }

  return { success: true, tables: created };
}

// =========================================================================================
// 3. GOOGLE DRIVE RESUME ARCHIVING
// =========================================================================================

function getOrCreateResumeFolder() {
  if (CONFIG.CAREER_RESUMES_FOLDER_ID && CONFIG.CAREER_RESUMES_FOLDER_ID.trim() !== "") {
    try {
      return DriveApp.getFolderById(CONFIG.CAREER_RESUMES_FOLDER_ID.trim());
    } catch (e) {}
  }
  var folders = DriveApp.getFoldersByName(CONFIG.CAREER_RESUMES_FOLDER_NAME);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(CONFIG.CAREER_RESUMES_FOLDER_NAME);
}

function saveResumeToDrive(base64Data, originalFileName, candidateName, role) {
  try {
    if (!base64Data || typeof base64Data !== 'string') return null;

    var cleanBase64 = base64Data;
    var mimeType = "application/pdf";

    if (base64Data.indexOf(';base64,') > -1) {
      var parts = base64Data.split(';base64,');
      if (parts[0].indexOf('data:') === 0) mimeType = parts[0].substring(5);
      cleanBase64 = parts[1];
    }

    var decoded = Utilities.base64Decode(cleanBase64);
    var blob = Utilities.newBlob(decoded, mimeType, originalFileName || "resume.pdf");

    var safeCandidate = (candidateName || "Candidate").replace(/[^a-zA-Z0-9_-]/g, '_');
    var safeRole = (role || "Applicant").replace(/[^a-zA-Z0-9_-]/g, '_');
    var dateStamp = Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "yyyyMMdd_HHmmss");
    var extension = (originalFileName && originalFileName.indexOf('.') > -1) ? originalFileName.substring(originalFileName.lastIndexOf('.')) : ".pdf";

    var finalFileName = safeCandidate + "_" + safeRole + "_" + dateStamp + extension;
    blob.setName(finalFileName);

    var folder = getOrCreateResumeFolder();
    var file = folder.createFile(blob);
    file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);

    return {
      fileId: file.getId(),
      fileName: finalFileName,
      viewUrl: file.getUrl()
    };
  } catch (err) {
    return null;
  }
}

// =========================================================================================
// 4. WEBHOOK INTAKE ENGINE (doPost & doGet)
// =========================================================================================

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "active",
    engine: "TrustGrid.AI Sheet 1 Data Intake",
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  try {
    var data = {};
    if (e && e.postData && e.postData.contents) {
      data = JSON.parse(e.postData.contents);
    } else if (e && e.parameter) {
      data = e.parameter;
    }

    var timestamp = new Date();
    var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);

    // Merge metadata if present
    if (data.metadata && typeof data.metadata === 'object') {
      for (var k in data.metadata) {
        if (data[k] === undefined) data[k] = data.metadata[k];
      }
    }

    var utm = data.utm || {};
    var utmSource = data.utm_source || utm.source || data.utmSource || "";
    var utmMedium = data.utm_medium || utm.medium || data.utmMedium || "";
    var utmCampaign = data.utm_campaign || utm.campaign || data.utmCampaign || "";
    var utmTerm = data.utm_term || utm.term || data.utmTerm || "";
    var utmContent = data.utm_content || utm.content || data.utmContent || "";

    var ipLocation = data.ipLocation || data.location || "";
    var ipAddress = data.ipAddress || data.ip || "";
    var sessionId = data.sessionId || ("SES-" + Date.now().toString(36));
    var visitorId = data.visitorId || sessionId;

    // ── A. TELEMETRY & VISITOR EVENTS ──────────────────────────────────────────
    if (data.eventType) {
      var eventType = data.eventType;

      // 1. Page View
      if (eventType === "PAGE_VIEW") {
        var pvSheet = getOrCreateTab(ss, "Page Views");
        pvSheet.appendRow([
          sessionId, visitorId,
          data.pagePath || data.pageUrl || "",
          data.pageTitle || "",
          data.referrer || "",
          data.trafficSource || (data.referrer ? "Referral" : "Direct"),
          utmSource, utmMedium, utmCampaign,
          data.device || "Desktop",
          data.browser || "Unknown",
          data.operatingSystem || data.os || "Unknown",
          ipLocation, timestamp
        ]);

        // Log to Sessions tab
        var sessSheet = getOrCreateTab(ss, "Sessions");
        sessSheet.appendRow([
          sessionId, visitorId,
          data.landingPage || data.pageUrl || data.pagePath || "",
          data.referrer || "",
          data.trafficSource || "Direct",
          utmSource, utmCampaign,
          data.device || "Desktop",
          data.browser || "Unknown",
          data.operatingSystem || data.os || "Unknown",
          data.screenSize || "",
          ipLocation, timestamp
        ]);
      }

      // 2. CTA Click
      else if (eventType === "CTA_CLICK") {
        var ctaSheet = getOrCreateTab(ss, "CTA Clicks");
        ctaSheet.appendRow([
          sessionId, visitorId,
          data.elementText || data.ctaName || "CTA Button",
          data.destination || "",
          data.section || "",
          data.pagePath || data.pageUrl || "",
          data.device || "Desktop",
          timestamp
        ]);
      }

      // 3. Error Event
      else if (eventType === "ERROR" || eventType === "CLIENT_ERROR") {
        var errSheet = getOrCreateTab(ss, "Errors");
        errSheet.appendRow([
          sessionId,
          data.errorMessage || data.message || "Unknown error",
          data.errorStack || "",
          data.pageUrl || data.pagePath || "",
          data.device || "",
          ipAddress, timestamp
        ]);
      }

      // 4. All Website Events
      var weSheet = getOrCreateTab(ss, "Website Events");
      weSheet.appendRow([
        sessionId, visitorId, eventType,
        data.element || "",
        data.elementText || "",
        data.pagePath || data.pageUrl || "",
        data.scrollDepth || "",
        data.timeOnPage || "",
        data.device || "Desktop",
        timestamp
      ]);

      // 5. UTM Tracking
      if (utmSource || utmCampaign) {
        var utmSheet = getOrCreateTab(ss, "UTM Data");
        utmSheet.appendRow([
          sessionId, visitorId,
          utmSource, utmMedium, utmCampaign, utmTerm, utmContent,
          data.landingPage || data.pageUrl || "",
          data.referrer || "",
          timestamp
        ]);
      }

      return ContentService.createTextOutput(JSON.stringify({ success: true, logged: eventType })).setMimeType(ContentService.MimeType.JSON);
    }

    // ── B. FORM SUBMISSIONS ──────────────────────────────────────────────────
    var formType = data.formType || data.formName || data.type || "contact";
    var normForm = formType.toLowerCase().replace(/[\s\-_]/g, '');
    var submissionId = data.submissionId || ("TG-" + Utilities.formatDate(timestamp, "GMT", "yyyyMMdd-HHmmss-") + Math.floor(Math.random() * 1000));

    var resumeDriveInfo = null;
    if (data.resumeBase64 || data.resumeData || data.resumeBlob) {
      resumeDriveInfo = saveResumeToDrive(data.resumeBase64 || data.resumeData || data.resumeBlob, data.resumeFileName || data.fileName, data.fullName || data.name, data.position || data.role);
    }

    // 1. Raw Form Submissions Master Log
    var formSubSheet = getOrCreateTab(ss, "Form Submissions");
    formSubSheet.appendRow([
      submissionId,
      formType,
      data.fullName || data.name || "",
      data.email || "",
      data.company || data.organization || "",
      data.role || data.designation || data.position || "",
      data.phone || "",
      data.message || data.notes || data.coverNote || (Array.isArray(data.challenges) ? data.challenges.join(", ") : ""),
      resumeDriveInfo ? resumeDriveInfo.viewUrl : (data.resumeUrl || ""),
      resumeDriveInfo ? resumeDriveInfo.fileId : "",
      utmSource, utmCampaign, ipLocation, ipAddress, timestamp
    ]);

    // 2. AI Diagnostic Dedicated Leads Tab
    if (normForm.indexOf('diagnostic') > -1 || normForm.indexOf('readiness') > -1 || normForm.indexOf('proposal') > -1 || normForm.indexOf('workshop') > -1) {
      var diagSheet = getOrCreateTab(ss, "AI Diagnostic Leads");
      diagSheet.appendRow([
        submissionId,
        data.fullName || data.name || "",
        data.email || "",
        data.company || data.organization || "",
        data.role || data.designation || "",
        data.companySize || data.organizationSize || "",
        data.industry || "",
        data.aiMaturityLevel || data.maturityLevel || "",
        Array.isArray(data.primaryObjectives) ? data.primaryObjectives.join(", ") : (data.primaryObjectives || data.challenges || ""),
        Array.isArray(data.selectedSolutions) ? data.selectedSolutions.join(", ") : (data.selectedSolutions || ""),
        data.preferredTimeline || data.timeline || "",
        data.message || data.notes || "",
        utmSource, utmMedium, utmCampaign, ipLocation, "New", timestamp
      ]);
      sendExecutiveAlert("AI Diagnostic Request: " + (data.company || data.fullName || "Enterprise Lead"), data);
    }

    // 3. Consolidated Inbound Leads Tab
    else {
      var leadsSheet = getOrCreateTab(ss, "Leads");
      leadsSheet.appendRow([
        submissionId,
        data.fullName || data.name || "",
        data.email || "",
        data.company || data.organization || "",
        data.designation || data.role || data.position || "",
        data.phone || "",
        formType,
        data.serviceInterest || data.services || data.partnershipType || "",
        data.subject || "Website Submission",
        data.message || data.coverNote || "",
        utmSource, utmMedium, utmCampaign, ipLocation, "New", timestamp
      ]);
      sendExecutiveAlert(formType + " Lead: " + (data.fullName || data.company || "New Lead"), data, resumeDriveInfo);
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true, submissionId: submissionId })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: error.toString() })).setMimeType(ContentService.MimeType.JSON);
  }
}

// =========================================================================================
// 5. EXECUTIVE HTML EMAIL ALERTS
// =========================================================================================

function sendExecutiveAlert(subjectTitle, data, resumeInfo) {
  try {
    var recipient = EMAIL_CONFIG.primaryAdmin;
    var subject = "🚀 [TrustGrid.AI] " + subjectTitle;

    var rowsHtml = "";
    var ignoredKeys = ["resumeBase64", "resumeData", "resumeBlob", "metadata", "ipInfo", "utm"];

    for (var key in data) {
      if (ignoredKeys.indexOf(key) === -1 && data[key] !== "" && data[key] !== null && data[key] !== undefined) {
        var label = key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
        var val = Array.isArray(data[key]) ? data[key].join(", ") : data[key].toString();
        rowsHtml += '<tr><td style="padding: 10px 14px; font-weight: 600; color: #475569; width: 35%; border-bottom: 1px solid #f1f5f9; background: #fafafa;">' + label + '</td>' +
                    '<td style="padding: 10px 14px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">' + val + '</td></tr>';
      }
    }

    if (resumeInfo) {
      rowsHtml += '<tr><td style="padding: 10px 14px; font-weight: 600; color: #475569; border-bottom: 1px solid #f1f5f9; background: #fafafa;">Resume Attachment</td>' +
                  '<td style="padding: 10px 14px; border-bottom: 1px solid #f1f5f9;"><a href="' + resumeInfo.viewUrl + '" style="color: #4f46e5; font-weight: 600; text-decoration: underline;">📄 View in Google Drive (' + resumeInfo.fileName + ')</a></td></tr>';
    }

    var htmlBody = '<div style="font-family: Inter, -apple-system, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">' +
      '<div style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 24px 28px; color: #ffffff;">' +
        '<div style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #818cf8; margin-bottom: 6px;">TRUSTGRID.AI INTELLIGENCE</div>' +
        '<div style="font-size: 20px; font-weight: 700; color: #ffffff;">' + subjectTitle + '</div>' +
      '</div>' +
      '<div style="padding: 24px 28px;">' +
        '<table style="width: 100%; border-collapse: collapse; font-size: 14px; margin-bottom: 20px;">' +
          rowsHtml +
        '</table>' +
        '<div style="text-align: center; margin-top: 24px;">' +
          '<a href="https://docs.google.com/spreadsheets/d/' + CONFIG.MAIN_SPREADSHEET_ID + '" style="display: inline-block; padding: 12px 24px; background: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 600; font-size: 14px;">Open Sheet 1 Database</a>' +
        '</div>' +
      '</div>' +
      '<div style="background: #f8fafc; padding: 16px 28px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #f1f5f9;">' +
        'Automated notification from TrustGrid.AI Sheet 1 Intake Engine' +
      '</div>' +
    '</div>';

    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (err) {}
}

function sendAllSamplePreviewEmailsToPooja() {
  sendExecutiveAlert("TEST: AI Diagnostic Assessment", {
    fullName: "Pooja Sri",
    email: "poojasri.aram@gmail.com",
    company: "Enterprise AI Labs",
    role: "VP of Enterprise Infrastructure",
    companySize: "1,000 - 5,000 employees",
    industry: "Fintech",
    primaryObjectives: ["AI Infrastructure Scalability", "Low-Latency Model Serving"],
    selectedSolutions: ["Custom Model Inference", "High-Throughput Vector DB"]
  });
}

// 🗑️ 1-Click Cleaner: Deletes all previous/unwanted sheets, keeping only the 9 approved tabs
function deleteOldUnwantedTabs() {
  var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  var validTabNames = Object.keys(TAB_CONFIGS);

  // 1. Ensure all 9 valid tabs exist first
  initializeAllDatabaseTables();

  var allSheets = ss.getSheets();
  var deleted = [];

  // 2. Iterate and delete any sheet that isn't in the 9 valid tabs
  for (var i = 0; i < allSheets.length; i++) {
    var sheet = allSheets[i];
    var name = sheet.getName();
    if (validTabNames.indexOf(name) === -1 && allSheets.length - deleted.length > 1) {
      ss.deleteSheet(sheet);
      deleted.push(name);
    }
  }

  var msg = deleted.length > 0 
    ? "Deleted " + deleted.length + " old sheets:\n" + deleted.join(", ") 
    : "No unwanted sheets found. All 9 active tabs are clean!";
  
  try {
    SpreadsheetApp.getUi().alert("🧹 Cleanup Complete", msg, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch(e) {}

  return { success: true, deleted: deleted };
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🚀 TrustGrid Admin")
    .addItem("📊 Pre-Create All 9 Tabs", "initializeAllDatabaseTables")
    .addItem("🧹 Delete Old / Unwanted Sheets", "deleteOldUnwantedTabs")
    .addItem("📧 Send Sample Preview Email", "sendAllSamplePreviewEmailsToPooja")
    .addToUi();
}
