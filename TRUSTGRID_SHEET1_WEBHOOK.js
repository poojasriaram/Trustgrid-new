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
  MAIN_SPREADSHEET_ID: "1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0",

  // Drive folder for candidate resumes
  CAREER_RESUMES_FOLDER_NAME: "TrustGrid_Career_Resumes",
  CAREER_RESUMES_FOLDER_ID: "",

  // Honeypot field name(s) — real visitors never fill these (keep hidden via CSS on the form)
  HONEYPOT_FIELDS: ["honeypot", "_gotcha", "website_url", "hp_field"],

  // Seconds within which an identical (email + formType) resubmission is treated as a duplicate
  DUPLICATE_WINDOW_SECONDS: 30,

  // Hard caps to stop payload / spam abuse
  MAX_TEXT_FIELD_LENGTH: 5000,
  MAX_URLS_IN_MESSAGE: 4
};

const EMAIL_CONFIG = {
  name: "TrustGrid AI Intelligence",
  primaryAdmin: "poojasri.trustgrid@gmail.com",
  replyTo: "hello@trustgrid.ai",
  website: "https://www.trustgrid.ai"
};

// =========================================================================================
// 2. TAB SCHEMAS (EXACT SHEET 1 STRUCTURE)
// =========================================================================================

var TAB_CONFIGS = {
  // ── VISITOR TELEMETRY TABS ───────────────────────────────────────────────
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

  // 4. Form Submissions (Master Consolidated Backup of EVERY form submission)
  "Form Submissions": [
    "Submission ID", "Form Name", "Name", "Email", "Company / Org", "Role", "Phone",
    "Message / Details", "Resume Drive Link", "Drive File ID",
    "UTM Source", "UTM Campaign", "IP Location", "IP Address", "Timestamp", "Visitor ID", "Session ID"
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

  // ── SEPARATE DEDICATED FORM TABS ─────────────────────────────────────────
  // 8. Contact Leads (General contact inquiries & consultation requests)
  "Contact Leads": [
    "Submission ID", "Name", "Email", "Company", "Designation", "Phone",
    "Subject", "Service Interest", "Message",
    "UTM Source", "UTM Medium", "UTM Campaign", "IP Location", "Status", "Timestamp", "Visitor ID", "Session ID"
  ],

  // 9. AI Diagnostic Leads (Dedicated enterprise AI diagnostic bookings)
  "AI Diagnostic Leads": [
    "Submission ID", "Name", "Email", "Company", "Role", "Company Size", "Industry",
    "AI Maturity Level", "Primary Objectives", "Selected Solutions", "Preferred Timeline", "Notes",
    "UTM Source", "UTM Medium", "UTM Campaign", "IP Location", "Status", "Timestamp", "Visitor ID", "Session ID"
  ],

  // 10. AI Readiness Leads (AI readiness & infrastructure maturity assessments)
  "AI Readiness Leads": [
    "Submission ID", "Name", "Email", "Company", "Role", "Company Size", "Industry",
    "AI Maturity Level", "Key Challenges", "Selected Solutions", "Preferred Timeline", "Notes",
    "UTM Source", "UTM Medium", "UTM Campaign", "IP Location", "Status", "Timestamp", "Visitor ID", "Session ID"
  ],

  // 11. Workshop Requests (AI Use-Case & Value workshops)
  "Workshop Requests": [
    "Submission ID", "Name", "Email", "Company", "Role", "Company Size", "Industry",
    "Selected Solutions", "Preferred Timeline", "Workshop Objectives / Notes",
    "UTM Source", "UTM Medium", "UTM Campaign", "IP Location", "Status", "Timestamp", "Visitor ID", "Session ID"
  ],

  // 12. RFP Proposals (Enterprise Request for Proposal / Scope)
  "RFP Proposals": [
    "Submission ID", "Name", "Email", "Company", "Role", "Company Size", "Industry",
    "Project Scope / Solutions", "Preferred Timeline", "Proposal Requirements / Notes",
    "UTM Source", "UTM Medium", "UTM Campaign", "IP Location", "Status", "Timestamp", "Visitor ID", "Session ID"
  ],

  // 13. Talk to Architect (Direct Senior AI Architect technical consultation)
  "Talk to Architect": [
    "Submission ID", "Name", "Email", "Company", "Role", "Phone",
    "Architecture Focus / Solutions", "Technical Requirements / Notes",
    "UTM Source", "UTM Medium", "UTM Campaign", "IP Location", "Status", "Timestamp", "Visitor ID", "Session ID"
  ],

  // 14. Chatbot Leads (AI Architect Interactive Chatbot lead captures)
  "Chatbot Leads": [
    "Submission ID", "Name", "Email", "Company", "Role", "Phone",
    "Conversation Summary", "Selected Solutions",
    "UTM Source", "UTM Medium", "UTM Campaign", "IP Location", "Status", "Timestamp", "Visitor ID", "Session ID"
  ],

  // 15. Career Applications (Engineering / fellowship candidates with Google Drive resume link)
  "Career Applications": [
    "Submission ID", "Name", "Email", "Phone", "Role Applied For", "Experience",
    "LinkedIn", "Portfolio", "Resume Link", "Drive File ID", "Cover Note / Message",
    "UTM Source", "UTM Medium", "UTM Campaign", "IP Location", "Status", "Timestamp", "Visitor ID", "Session ID"
  ],

  // 16. Partner Applications (Ecosystem & Strategic SI / Cloud Partnerships)
  "Partner Applications": [
    "Submission ID", "Name", "Email", "Company", "Designation", "Phone", "Partnership Type", "Message / Value Proposition",
    "UTM Source", "UTM Medium", "UTM Campaign", "IP Location", "Status", "Timestamp", "Visitor ID", "Session ID"
  ],

  // 17. Newsletter Subscribers (Executive Insights & Whitepapers opt-ins)
  "Newsletter Subscribers": [
    "Submission ID", "Name", "Email", "Company", "Industry",
    "UTM Source", "UTM Medium", "UTM Campaign", "IP Location", "Timestamp", "Visitor ID", "Session ID"
  ],

  // 18. Spam Blocked (Honeypot & heuristic spam blocked for audit)
  "Spam Blocked": [
    "Submission ID", "Form Type", "Name", "Email", "Reason", "Message Snippet", "IP Address", "Timestamp"
  ]
};

// Aliases to route incoming submissions flexibly
var SHEET_NAME_ALIASES = {
  "contact": "Contact Leads", "contactform": "Contact Leads", "contact_leads": "Contact Leads", "leads": "Contact Leads", "contact_submissions": "Contact Leads",
  "aidiagnosticleads": "AI Diagnostic Leads", "ai_diagnostics": "AI Diagnostic Leads", "aidiagnostic": "AI Diagnostic Leads", "bookaidiagnostic": "AI Diagnostic Leads", "diagnostic": "AI Diagnostic Leads",
  "aireadiness": "AI Readiness Leads", "readiness": "AI Readiness Leads", "ai_readiness": "AI Readiness Leads", "aireadinessassessment": "AI Readiness Leads", "readinessassessment": "AI Readiness Leads",
  "workshop": "Workshop Requests", "workshoprequests": "Workshop Requests", "usecaseworkshop": "Workshop Requests", "ai_workshop": "Workshop Requests", "workshop_requests": "Workshop Requests",
  "proposal": "RFP Proposals", "rfp": "RFP Proposals", "requestproposal": "RFP Proposals", "rfpproposals": "RFP Proposals", "rfp_proposals": "RFP Proposals",
  "talktoarchitect": "Talk to Architect", "talk_to_architect": "Talk to Architect", "talktoaiarchitect": "Talk to Architect", "architect": "Talk to Architect", "talk_to_ai_architect": "Talk to Architect",
  "chatlead": "Chatbot Leads", "chat_lead": "Chatbot Leads", "chatbot": "Chatbot Leads", "ai_chatbot": "Chatbot Leads", "chatbotleads": "Chatbot Leads", "chatbot_leads": "Chatbot Leads",
  "careerapplications": "Career Applications", "career_applications": "Career Applications", "careers": "Career Applications", "career": "Career Applications", "fellowship": "Career Applications",
  "partnerapplications": "Partner Applications", "partner_applications": "Partner Applications", "partners": "Partner Applications", "partner": "Partner Applications", "ecosystem": "Partner Applications",
  "newslettersubscribers": "Newsletter Subscribers", "newsletter_subscribers": "Newsletter Subscribers", "newsletter": "Newsletter Subscribers", "insights": "Newsletter Subscribers", "subscriptions": "Newsletter Subscribers",
  "formsubmissions": "Form Submissions", "form_submissions": "Form Submissions", "forms": "Form Submissions",
  "pageviews": "Page Views", "page_views": "Page Views", "trafficanalytics": "Page Views", "traffic_analytics": "Page Views",
  "sessions": "Sessions", "ctaclicks": "CTA Clicks", "cta_clicks": "CTA Clicks",
  "utmdata": "UTM Data", "utm_data": "UTM Data", "websiteevents": "Website Events", "website_events": "Website Events", "errors": "Errors", "spamblocked": "Spam Blocked"
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

// 🚀 Pre-creates all configured tabs in Sheet 1 with dark header formatting
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
// 3.5 SECURITY, VALIDATION & SPAM PROTECTION
// =========================================================================================

function escapeHtml(str) {
  if (str === null || str === undefined) return "";
  return String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function isValidEmail(email) {
  if (!email) return false;
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(String(email).trim());
}

// Strips tags and trims oversized text before it ever reaches a sheet or outbound email
function sanitizeText(value) {
  if (value === null || value === undefined) return "";
  var str = String(value).replace(/<[^>]*>/g, "").trim();
  if (str.length > CONFIG.MAX_TEXT_FIELD_LENGTH) {
    str = str.substring(0, CONFIG.MAX_TEXT_FIELD_LENGTH) + "…";
  }
  return str;
}

function isHoneypotTriggered(data) {
  for (var i = 0; i < CONFIG.HONEYPOT_FIELDS.length; i++) {
    var field = CONFIG.HONEYPOT_FIELDS[i];
    if (data[field] && String(data[field]).trim() !== "") return true;
  }
  return false;
}

// Lightweight heuristic: excessive links or a URL stuffed into the name field are classic spam tells
function isLikelySpam(data) {
  var text = [data.message, data.notes, data.coverNote].filter(Boolean).join(" ");
  var urlMatches = text.match(/https?:\/\//gi);
  if (urlMatches && urlMatches.length > CONFIG.MAX_URLS_IN_MESSAGE) return true;
  if (data.fullName && /https?:\/\//i.test(data.fullName)) return true;
  if (data.name && /https?:\/\//i.test(data.name)) return true;
  return false;
}

// Uses CacheService (per-script) to block rapid duplicate resubmissions (double-click, retries, bots)
function isDuplicateSubmission(email, formType) {
  var cache = CacheService.getScriptCache();
  var key = "dup_" + (email || "anon").toLowerCase() + "_" + (formType || "").toLowerCase();
  if (cache.get(key)) return true;
  cache.put(key, "1", CONFIG.DUPLICATE_WINDOW_SECONDS);
  return false;
}

function logSpamBlocked(reason, data, ipAddress) {
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
    var sheet = getOrCreateTab(ss, "Spam Blocked");
    sheet.appendRow([
      "SPB-" + Date.now().toString(36),
      data.formType || data.formName || data.type || "unknown",
      data.fullName || data.name || "",
      data.email || "",
      reason,
      sanitizeText(data.message || data.notes || "").substring(0, 200),
      ipAddress || "",
      new Date()
    ]);
  } catch (e) {}
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
    var submitterEmail = data.email || "";

    // ── Spam / bot defenses ──
    if (isHoneypotTriggered(data)) {
      logSpamBlocked("Honeypot field filled", data, ipAddress);
      return ContentService.createTextOutput(JSON.stringify({ success: true, submissionId: submissionId })).setMimeType(ContentService.MimeType.JSON);
    }
    if (isLikelySpam(data)) {
      logSpamBlocked("Heuristic spam pattern (excess links / suspicious name)", data, ipAddress);
      return ContentService.createTextOutput(JSON.stringify({ success: true, submissionId: submissionId })).setMimeType(ContentService.MimeType.JSON);
    }
    if (isDuplicateSubmission(submitterEmail, formType)) {
      return ContentService.createTextOutput(JSON.stringify({ success: true, submissionId: submissionId, duplicate: true })).setMimeType(ContentService.MimeType.JSON);
    }

    // Sanitize free-text fields before they ever reach a sheet or outbound email
    var cleanMessage = sanitizeText(data.message || data.notes || data.coverNote || (Array.isArray(data.challenges) ? data.challenges.join(", ") : ""));
    var emailLooksValid = !submitterEmail || isValidEmail(submitterEmail);
    var leadStatus = emailLooksValid ? "New" : "Needs Review (Invalid Email)";

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
      submitterEmail,
      data.company || data.organization || "",
      data.role || data.designation || data.position || "",
      data.phone || "",
      cleanMessage,
      resumeDriveInfo ? resumeDriveInfo.viewUrl : (data.resumeUrl || data.resume || ""),
      resumeDriveInfo ? resumeDriveInfo.fileId : "",
      utmSource, utmCampaign, ipLocation, ipAddress, timestamp,
      visitorId, sessionId
    ]);

    // ── DEDICATED SEPARATE FORM ROUTING ──────────────────────────────────
    // 2. AI Readiness Leads (AI readiness & infrastructure maturity)
    if (normForm.indexOf('readiness') > -1 || normForm.indexOf('assessment') > -1) {
      var readinessSheet = getOrCreateTab(ss, "AI Readiness Leads");
      readinessSheet.appendRow([
        submissionId,
        data.fullName || data.name || "",
        submitterEmail,
        data.company || data.organization || "",
        data.role || data.designation || "",
        data.companySize || data.organizationSize || "",
        data.industry || "",
        data.aiMaturityLevel || data.maturityLevel || data.aiMaturity || "",
        Array.isArray(data.challenges) ? data.challenges.join(", ") : (data.challenges || ""),
        Array.isArray(data.selectedSolutions) ? data.selectedSolutions.join(", ") : (data.selectedSolutions || ""),
        data.preferredTimeline || data.timeline || "",
        cleanMessage,
        utmSource, utmMedium, utmCampaign, ipLocation, leadStatus, timestamp,
        visitorId, sessionId
      ]);
      sendExecutiveAlert("AI Readiness Assessment: " + (data.company || data.fullName || "Enterprise Lead"), data);
    }

    // 3. Workshop Requests (AI Use-Case & Value Workshop)
    else if (normForm.indexOf('workshop') > -1) {
      var workshopSheet = getOrCreateTab(ss, "Workshop Requests");
      workshopSheet.appendRow([
        submissionId,
        data.fullName || data.name || "",
        submitterEmail,
        data.company || data.organization || "",
        data.role || data.designation || "",
        data.companySize || data.organizationSize || "",
        data.industry || "",
        Array.isArray(data.selectedSolutions) ? data.selectedSolutions.join(", ") : (data.selectedSolutions || ""),
        data.preferredTimeline || data.timeline || "",
        cleanMessage,
        utmSource, utmMedium, utmCampaign, ipLocation, leadStatus, timestamp,
        visitorId, sessionId
      ]);
      sendExecutiveAlert("AI Workshop Request: " + (data.company || data.fullName || "Enterprise Lead"), data);
    }

    // 4. RFP Proposals (Enterprise Request for Proposal)
    else if (normForm.indexOf('proposal') > -1 || normForm.indexOf('rfp') > -1) {
      var rfpSheet = getOrCreateTab(ss, "RFP Proposals");
      rfpSheet.appendRow([
        submissionId,
        data.fullName || data.name || "",
        submitterEmail,
        data.company || data.organization || "",
        data.role || data.designation || "",
        data.companySize || data.organizationSize || "",
        data.industry || "",
        Array.isArray(data.selectedSolutions) ? data.selectedSolutions.join(", ") : (data.selectedSolutions || ""),
        data.preferredTimeline || data.timeline || "",
        cleanMessage,
        utmSource, utmMedium, utmCampaign, ipLocation, leadStatus, timestamp,
        visitorId, sessionId
      ]);
      sendExecutiveAlert("RFP Proposal Request: " + (data.company || data.fullName || "Enterprise Lead"), data);
    }

    // 5. AI Diagnostic Dedicated Leads Tab
    else if (normForm.indexOf('diagnostic') > -1) {
      var diagSheet = getOrCreateTab(ss, "AI Diagnostic Leads");
      diagSheet.appendRow([
        submissionId,
        data.fullName || data.name || "",
        submitterEmail,
        data.company || data.organization || "",
        data.role || data.designation || "",
        data.companySize || data.organizationSize || "",
        data.industry || "",
        data.aiMaturityLevel || data.maturityLevel || "",
        Array.isArray(data.primaryObjectives) ? data.primaryObjectives.join(", ") : (data.primaryObjectives || data.challenges || ""),
        Array.isArray(data.selectedSolutions) ? data.selectedSolutions.join(", ") : (data.selectedSolutions || ""),
        data.preferredTimeline || data.timeline || "",
        cleanMessage,
        utmSource, utmMedium, utmCampaign, ipLocation, leadStatus, timestamp,
        visitorId, sessionId
      ]);
      sendExecutiveAlert("AI Diagnostic Request: " + (data.company || data.fullName || "Enterprise Lead"), data);
    }

    // 6. Chatbot Leads (AI Architect Interactive Chatbot lead capture)
    else if (normForm.indexOf('chat') > -1 || normForm.indexOf('bot') > -1) {
      var chatSheet = getOrCreateTab(ss, "Chatbot Leads");
      chatSheet.appendRow([
        submissionId,
        data.fullName || data.name || "",
        submitterEmail,
        data.company || data.organization || "",
        data.role || data.designation || "",
        data.phone || "",
        cleanMessage || data.summary || "Interactive Chatbot Inquiry",
        Array.isArray(data.selectedSolutions) ? data.selectedSolutions.join(", ") : (data.selectedSolutions || ""),
        utmSource, utmMedium, utmCampaign, ipLocation, leadStatus, timestamp,
        visitorId, sessionId
      ]);
      sendExecutiveAlert("AI Chatbot Lead: " + (data.fullName || data.company || "Interactive Visitor"), data);
    }

    // 7. Talk to Architect (Direct technical consultation)
    else if (normForm.indexOf('architect') > -1) {
      var archSheet = getOrCreateTab(ss, "Talk to Architect");
      archSheet.appendRow([
        submissionId,
        data.fullName || data.name || "",
        submitterEmail,
        data.company || data.organization || "",
        data.role || data.designation || "",
        data.phone || "",
        Array.isArray(data.selectedSolutions) ? data.selectedSolutions.join(", ") : (data.selectedSolutions || data.serviceInterest || "AI Architecture"),
        cleanMessage,
        utmSource, utmMedium, utmCampaign, ipLocation, leadStatus, timestamp,
        visitorId, sessionId
      ]);
      sendExecutiveAlert("Talk to AI Architect: " + (data.company || data.fullName || "Senior Lead"), data);
    }

    // 8. Career Applications (dedicated tab, incl. Drive resume link)
    else if (normForm.indexOf('career') > -1 || normForm.indexOf('job') > -1 || normForm.indexOf('fellowship') > -1 || normForm.indexOf('resume') > -1) {
      var careerSheet = getOrCreateTab(ss, "Career Applications");
      careerSheet.appendRow([
        submissionId,
        data.fullName || data.name || "",
        submitterEmail,
        data.phone || "",
        data.role || data.designation || data.position || "",
        data.experience || "",
        data.linkedIn || data.linkedin || "",
        data.portfolio || "",
        resumeDriveInfo ? resumeDriveInfo.viewUrl : (data.resumeUrl || data.resume || ""),
        resumeDriveInfo ? resumeDriveInfo.fileId : "",
        cleanMessage,
        utmSource, utmMedium, utmCampaign, ipLocation, leadStatus, timestamp,
        visitorId, sessionId
      ]);
      sendExecutiveAlert("Career Application: " + (data.fullName || data.name || "New Applicant"), data, resumeDriveInfo);
    }

    // 9. Partner Applications (ecosystem & strategic SI partnerships)
    else if (normForm.indexOf('partner') > -1 || normForm.indexOf('ecosystem') > -1) {
      var partnerSheet = getOrCreateTab(ss, "Partner Applications");
      partnerSheet.appendRow([
        submissionId,
        data.fullName || data.name || "",
        submitterEmail,
        data.company || data.organization || "",
        data.designation || data.role || data.position || "",
        data.phone || "",
        data.partnershipType || data.engagementModel || "",
        cleanMessage,
        utmSource, utmMedium, utmCampaign, ipLocation, leadStatus, timestamp,
        visitorId, sessionId
      ]);
      sendExecutiveAlert("Partnership Inquiry: " + (data.company || data.fullName || "New Partner Lead"), data);
    }

    // 10. Newsletter / Insights Subscribers (dedicated tab, low-priority)
    else if (normForm.indexOf('newsletter') > -1 || normForm.indexOf('insight') > -1 || normForm.indexOf('subscri') > -1) {
      var newsletterSheet = getOrCreateTab(ss, "Newsletter Subscribers");
      newsletterSheet.appendRow([
        submissionId,
        data.fullName || data.name || "",
        submitterEmail,
        data.company || data.organization || "",
        data.industry || "",
        utmSource, utmMedium, utmCampaign, ipLocation, timestamp,
        visitorId, sessionId
      ]);
    }

    // 11. Contact Leads (default: general inquiries & consultations)
    else {
      var contactSheet = getOrCreateTab(ss, "Contact Leads");
      contactSheet.appendRow([
        submissionId,
        data.fullName || data.name || "",
        submitterEmail,
        data.company || data.organization || "",
        data.designation || data.role || data.position || "",
        data.phone || "",
        data.subject || "Website Submission",
        data.serviceInterest || data.services || "",
        cleanMessage,
        utmSource, utmMedium, utmCampaign, ipLocation, leadStatus, timestamp,
        visitorId, sessionId
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
    var ignoredKeys = ["resumeBase64", "resumeData", "resumeBlob", "metadata", "ipInfo", "utm"].concat(CONFIG.HONEYPOT_FIELDS);

    for (var key in data) {
      if (ignoredKeys.indexOf(key) === -1 && data[key] !== "" && data[key] !== null && data[key] !== undefined) {
        var label = escapeHtml(key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }));
        var rawVal = Array.isArray(data[key]) ? data[key].join(", ") : data[key].toString();
        var val = escapeHtml(rawVal);
        rowsHtml += '<tr><td style="padding: 10px 14px; font-weight: 600; color: #475569; width: 35%; border-bottom: 1px solid #f1f5f9; background: #fafafa;">' + label + '</td>' +
                    '<td style="padding: 10px 14px; color: #0f172a; border-bottom: 1px solid #f1f5f9;">' + val + '</td></tr>';
      }
    }

    if (resumeInfo) {
      rowsHtml += '<tr><td style="padding: 10px 14px; font-weight: 600; color: #475569; border-bottom: 1px solid #f1f5f9; background: #fafafa;">Resume Attachment</td>' +
                  '<td style="padding: 10px 14px; border-bottom: 1px solid #f1f5f9;"><a href="' + resumeInfo.viewUrl + '" style="color: #4f46e5; font-weight: 600; text-decoration: underline;">📄 View in Google Drive (' + escapeHtml(resumeInfo.fileName) + ')</a></td></tr>';
    }

    var htmlBody = '<div style="font-family: Inter, -apple-system, sans-serif; max-width: 620px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 12px rgba(0,0,0,0.05);">' +
      '<div style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 24px 28px; color: #ffffff;">' +
        '<div style="font-size: 11px; font-weight: 700; letter-spacing: 1.5px; text-transform: uppercase; color: #818cf8; margin-bottom: 6px;">TRUSTGRID.AI INTELLIGENCE</div>' +
        '<div style="font-size: 20px; font-weight: 700; color: #ffffff;">' + escapeHtml(subjectTitle) + '</div>' +
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

// 🚀 1-Click Multi-Form Sample Submissions Generator
// Populates all 10 dedicated lead tabs with realistic sample enterprise data and sends HTML alert emails to poojasri.trustgrid@gmail.com
function sendAllSampleSubmissionsToPooja() {
  var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  initializeAllDatabaseTables();

  var sampleDataList = [
    {
      formType: "Contact Leads",
      data: {
        formType: "Contact Leads",
        fullName: "Marcus Vance",
        email: "poojasri.trustgrid@gmail.com",
        company: "Global Nexus Bank",
        designation: "Chief Information Officer",
        phone: "+1 (415) 890-2341",
        subject: "Enterprise AI Infrastructure Modernization",
        serviceInterest: "AI Infra & Data Center Engineering",
        message: "We are scaling our on-premise GPU cluster to 256 H100 nodes and require immediate architecture review for liquid cooling and RoCEv2 fabric.",
        utm_source: "linkedin",
        utm_medium: "cpc",
        utm_campaign: "enterprise_q3"
      }
    },
    {
      formType: "AI Diagnostic Leads",
      data: {
        formType: "AI Diagnostic Leads",
        fullName: "Elena Rostova",
        email: "poojasri.trustgrid@gmail.com",
        company: "Aether Health Systems",
        role: "VP of Enterprise AI",
        companySize: "1,000–5,000 employees",
        industry: "Healthcare & Life Sciences",
        aiMaturityLevel: "Multiple Pilot Deployments",
        primaryObjectives: ["GPU Infrastructure Scalability", "Inference Latency & Token Economics", "EU AI Act Governance"],
        selectedSolutions: ["AI Infra & Data Center", "Trusted AI Engineering"],
        preferredTimeline: "Immediate (Next 1–2 weeks)",
        notes: "Evaluating regulatory guardrails for clinical decision support models with strict latency SLAs.",
        utm_source: "google",
        utm_medium: "search",
        utm_campaign: "diagnostic_intent"
      }
    },
    {
      formType: "AI Readiness Leads",
      data: {
        formType: "AI Readiness Leads",
        fullName: "David Chen",
        email: "poojasri.trustgrid@gmail.com",
        company: "Apex Autonomous Logistics",
        role: "Head of AI Architecture",
        companySize: "501–1,000 employees",
        industry: "Manufacturing & Robotics",
        aiMaturityLevel: "Active Proof of Concept (POC)",
        challenges: ["GPU Utilization & Thermals", "Multi-Agent System Orchestration"],
        selectedSolutions: ["Agentic Enterprise", "AI Networking"],
        preferredTimeline: "Within 30 Days",
        notes: "Assessing readiness for deploying 40+ autonomous supply-chain execution agents.",
        utm_source: "direct",
        utm_campaign: "readiness_assessment"
      }
    },
    {
      formType: "Workshop Requests",
      data: {
        formType: "Workshop Requests",
        fullName: "Sarah Jenkins",
        email: "poojasri.trustgrid@gmail.com",
        company: "Vanguard Aerospace",
        role: "Director of Systems Engineering",
        companySize: "5,000+ Enterprise",
        industry: "Aerospace & Defense",
        selectedSolutions: ["AI Value Engineering", "AI Cybersecurity"],
        preferredTimeline: "Next Quarter (Q1/Q2)",
        notes: "Requesting a 2-day on-site value engineering workshop for 15 technical leads to map token cost reduction.",
        utm_source: "referral",
        utm_campaign: "defense_summit"
      }
    },
    {
      formType: "RFP Proposals",
      data: {
        formType: "RFP Proposals",
        fullName: "Robert Sterling",
        email: "poojasri.trustgrid@gmail.com",
        company: "Nordic Energy Grid",
        role: "Chief Technology Officer",
        companySize: "5,000+ Enterprise",
        industry: "Energy & Utilities",
        selectedSolutions: ["AI Infra & Data Center", "AI Networking"],
        preferredTimeline: "Within 30 Days",
        notes: "RFP for turnkey design of a 4MW high-density data center with direct liquid cooling and lossless RoCEv2 fabrics.",
        utm_source: "email",
        utm_campaign: "rfp_submission"
      }
    },
    {
      formType: "Talk to Architect",
      data: {
        formType: "Talk to Architect",
        fullName: "Aarav Patel",
        email: "poojasri.trustgrid@gmail.com",
        company: "FinScale Trading",
        role: "Principal Quant Architect",
        phone: "+44 20 7946 0912",
        selectedSolutions: ["AI Networking", "AI Infra & Data Center"],
        notes: "Need direct consultation on sub-microsecond inference optimization and NCCL collective communication tuning.",
        utm_source: "website",
        utm_campaign: "architect_chat"
      }
    },
    {
      formType: "Chatbot Leads",
      data: {
        formType: "Chatbot Leads",
        fullName: "Chloe Dubois",
        email: "poojasri.trustgrid@gmail.com",
        company: "Luxe Retail Group",
        role: "VP Digital Transformation",
        phone: "+33 1 42 68 55 00",
        summary: "Inquired about Agentic Enterprise and multi-agent customer personalization fleets.",
        selectedSolutions: ["Agentic Enterprise", "AI Value Engineering"],
        utm_source: "organic",
        utm_campaign: "chatbot_conversion"
      }
    },
    {
      formType: "Career Applications",
      data: {
        formType: "Career Applications",
        fullName: "Vikram Malhotra",
        email: "poojasri.trustgrid@gmail.com",
        phone: "+1 (650) 555-0199",
        role: "Principal AI Infrastructure Engineer",
        experience: "12+ Years (Distributed GPU Systems, NCCL, Liquid Cooling)",
        linkedIn: "https://linkedin.com/in/vikram-ai-infra",
        portfolio: "https://github.com/vikram-systems",
        message: "Excited about TrustGrid's AI Factory architectures and high-density liquid cooling designs.",
        utm_source: "careers_page",
        utm_campaign: "talent_drive"
      }
    },
    {
      formType: "Partner Applications",
      data: {
        formType: "Partner Applications",
        fullName: "Hanna Lindqvist",
        email: "poojasri.trustgrid@gmail.com",
        company: "Nordic Silicon Systems",
        designation: "Head of Global Alliances",
        phone: "+46 8 123 4567",
        partnershipType: "Hardware / Silicon OEM Vendor",
        message: "Proposal to integrate next-gen NPU acceleration hardware into TrustGrid's turn-key AI Factory stack.",
        utm_source: "partnerships",
        utm_campaign: "ecosystem_outreach"
      }
    },
    {
      formType: "Newsletter Subscribers",
      data: {
        formType: "Newsletter Subscribers",
        fullName: "Julian Thorne",
        email: "poojasri.trustgrid@gmail.com",
        company: "Thorne Capital",
        industry: "Financial Services",
        utm_source: "insights_whitepaper",
        utm_campaign: "q3_macro_report"
      }
    }
  ];

  var sentCount = 0;
  sampleDataList.forEach(function (sample) {
    var mockEvent = {
      postData: {
        contents: JSON.stringify(sample.data)
      }
    };
    doPost(mockEvent);
    sentCount++;
  });

  var alertMsg = "✅ SUCCESS! " + sentCount + " sample submissions created across all 10 separate tabs.\n\nExecutive notification emails sent to: " + EMAIL_CONFIG.primaryAdmin;
  try {
    SpreadsheetApp.getUi().alert("🚀 Sample Submissions Sent", alertMsg, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch (e) {}

  return { success: true, count: sentCount, email: EMAIL_CONFIG.primaryAdmin };
}

// 🗑️ 1-Click Cleaner: Deletes all previous/unwanted sheets, keeping only the approved tabs
function deleteOldUnwantedTabs() {
  var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  var validTabNames = Object.keys(TAB_CONFIGS);

  // 1. Ensure all valid tabs exist first
  initializeAllDatabaseTables();

  var allSheets = ss.getSheets();
  var deleted = [];

  // 2. Iterate and delete any sheet that isn't in the valid tab list
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
    : "No unwanted sheets found. All active tabs are clean!";
  
  try {
    SpreadsheetApp.getUi().alert("🧹 Cleanup Complete", msg, SpreadsheetApp.getUi().ButtonSet.OK);
  } catch(e) {}

  return { success: true, deleted: deleted };
}

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🚀 TrustGrid Admin")
    .addItem("📊 Pre-Create All 18 Tabs", "initializeAllDatabaseTables")
    .addItem("📨 Send All 10 Sample Submissions to Pooja", "sendAllSampleSubmissionsToPooja")
    .addItem("🧬 Migrate Visitor/Session Columns", "migrateAddVisitorTrackingColumns")
    .addItem("🔀 Migrate Legacy Leads to Per-Form Tabs", "migrateLeadsToPerFormSheets")
    .addItem("🧹 Delete Old / Unwanted Sheets", "deleteOldUnwantedTabs")
    .addSeparator()
    .addItem("⏰ Setup Daily/Weekly/Monthly Triggers", "setupAllTrustGridTriggers")
    .addItem("📬 Send Daily Digest Now", "sendDailyDigest")
    .addItem("📈 Send Weekly Digest Now", "sendWeeklyDigest")
    .addItem("📁 Send Monthly Resume Digest Now", "sendMonthlyResumeDigest")
    .addToUi();
}

// =========================================================================================
// 6. SCHEMA MIGRATION (adds Visitor ID / Session ID tracking columns to already-live tabs)
// =========================================================================================

function migrateAddVisitorTrackingColumns() {
  var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  var targets = ["Contact Leads", "AI Diagnostic Leads", "Career Applications", "Partner Applications", "Newsletter Subscribers", "Form Submissions", "Leads"];
  var updated = [];

  targets.forEach(function (tabName) {
    var sheet = ss.getSheetByName(tabName);
    if (!sheet) return;
    var lastCol = sheet.getLastColumn();
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    var missing = ["Visitor ID", "Session ID"].filter(function (h) { return headers.indexOf(h) === -1; });
    if (missing.length > 0) {
      sheet.getRange(1, lastCol + 1, 1, missing.length).setValues([missing]);
      styleHeaderRow(sheet, lastCol + missing.length);
      updated.push(tabName + " (+" + missing.join(", ") + ")");
    }
  });

  var msg = updated.length > 0 ? "Migrated:\n" + updated.join("\n") : "All tabs already have Visitor ID / Session ID columns.";
  try { SpreadsheetApp.getUi().alert("🧬 Schema Migration", msg, SpreadsheetApp.getUi().ButtonSet.OK); } catch (e) {}
  return { success: true, updated: updated };
}

// Redistributes rows from the old consolidated "Leads" tab into the new per-form tabs
// (Contact Leads / Career Applications / Partner Applications / Newsletter Subscribers).
function migrateLeadsToPerFormSheets() {
  var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  var oldSheet = ss.getSheetByName("Leads");
  if (!oldSheet || oldSheet.getLastRow() < 2) {
    try { SpreadsheetApp.getUi().alert("🔀 Migration", "No legacy 'Leads' tab data found to migrate.", SpreadsheetApp.getUi().ButtonSet.OK); } catch (e) {}
    return { success: true, migrated: 0 };
  }

  var data = oldSheet.getDataRange().getValues();
  var h = data[0];
  var idx = {
    submissionId: h.indexOf("Submission ID"), name: h.indexOf("Name"), email: h.indexOf("Email"),
    company: h.indexOf("Company"), designation: h.indexOf("Designation"), phone: h.indexOf("Phone"),
    formType: h.indexOf("Form Type"), serviceInterest: h.indexOf("Service Interest"), subject: h.indexOf("Subject"),
    message: h.indexOf("Message"), utmSource: h.indexOf("UTM Source"), utmMedium: h.indexOf("UTM Medium"),
    utmCampaign: h.indexOf("UTM Campaign"), ipLocation: h.indexOf("IP Location"), status: h.indexOf("Status"),
    timestamp: h.indexOf("Timestamp"), visitorId: h.indexOf("Visitor ID"), sessionId: h.indexOf("Session ID")
  };
  var get = function (row, key) { return idx[key] > -1 ? row[idx[key]] : ""; };

  var migrated = 0;
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var normForm = String(get(row, "formType") || "").toLowerCase().replace(/[\s\-_]/g, '');
    var targetTab = normForm.indexOf('career') > -1 ? "Career Applications"
      : normForm.indexOf('partner') > -1 ? "Partner Applications"
      : (normForm.indexOf('newsletter') > -1 || normForm.indexOf('insight') > -1 || normForm.indexOf('subscri') > -1) ? "Newsletter Subscribers"
      : "Contact Leads";

    var sheet = getOrCreateTab(ss, targetTab);
    if (targetTab === "Career Applications") {
      sheet.appendRow([get(row, "submissionId"), get(row, "name"), get(row, "email"), get(row, "phone"), get(row, "designation"), "", "", "", "", get(row, "message"), get(row, "utmSource"), get(row, "utmMedium"), get(row, "utmCampaign"), get(row, "ipLocation"), get(row, "status"), get(row, "timestamp"), get(row, "visitorId"), get(row, "sessionId")]);
    } else if (targetTab === "Partner Applications") {
      sheet.appendRow([get(row, "submissionId"), get(row, "name"), get(row, "email"), get(row, "company"), get(row, "designation"), get(row, "phone"), get(row, "serviceInterest"), get(row, "message"), get(row, "utmSource"), get(row, "utmMedium"), get(row, "utmCampaign"), get(row, "ipLocation"), get(row, "status"), get(row, "timestamp"), get(row, "visitorId"), get(row, "sessionId")]);
    } else if (targetTab === "Newsletter Subscribers") {
      sheet.appendRow([get(row, "submissionId"), get(row, "name"), get(row, "email"), get(row, "company"), "", get(row, "utmSource"), get(row, "utmMedium"), get(row, "utmCampaign"), get(row, "ipLocation"), get(row, "timestamp"), get(row, "visitorId"), get(row, "sessionId")]);
    } else {
      sheet.appendRow([get(row, "submissionId"), get(row, "name"), get(row, "email"), get(row, "company"), get(row, "designation"), get(row, "phone"), get(row, "subject"), get(row, "serviceInterest"), get(row, "message"), get(row, "utmSource"), get(row, "utmMedium"), get(row, "utmCampaign"), get(row, "ipLocation"), get(row, "status"), get(row, "timestamp"), get(row, "visitorId"), get(row, "sessionId")]);
    }
    migrated++;
  }

  var msg = "Migrated " + migrated + " legacy lead(s) into Contact Leads / Career Applications / Partner Applications / Newsletter Subscribers.\n\nYou can now delete the old 'Leads' tab via '🧹 Delete Old / Unwanted Sheets'.";
  try { SpreadsheetApp.getUi().alert("🔀 Migration Complete", msg, SpreadsheetApp.getUi().ButtonSet.OK); } catch (e) {}
  return { success: true, migrated: migrated };
}

// =========================================================================================
// 7. TIME-DRIVEN TRIGGERS & EXECUTIVE DIGESTS
// =========================================================================================

function setupAllTrustGridTriggers() {
  deleteAllTrustGridTriggers();
  ScriptApp.newTrigger("sendDailyDigest").timeBased().atHour(8).everyDays(1).create();
  ScriptApp.newTrigger("sendWeeklyDigest").timeBased().atHour(8).onWeekDay(ScriptApp.WeekDay.MONDAY).create();
  ScriptApp.newTrigger("sendMonthlyResumeDigest").timeBased().atHour(9).onMonthDay(1).create();
  try { SpreadsheetApp.getUi().alert("⏰ Triggers Installed", "Daily digest (8am), Weekly digest (Mon 8am) and Monthly resume digest (1st, 9am) are now scheduled.", SpreadsheetApp.getUi().ButtonSet.OK); } catch (e) {}
  return { success: true };
}

function deleteAllTrustGridTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  var digestFns = ["sendDailyDigest", "sendWeeklyDigest", "sendMonthlyResumeDigest"];
  triggers.forEach(function (t) {
    if (digestFns.indexOf(t.getHandlerFunction()) > -1) ScriptApp.deleteTrigger(t);
  });
}

function getRowsSince(sheet, sinceDate) {
  if (!sheet || sheet.getLastRow() < 2) return { headers: [], rows: [] };
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var tsCol = headers.indexOf("Timestamp");
  if (tsCol === -1) return { headers: headers, rows: [] };
  var rows = data.slice(1).filter(function (row) {
    var ts = row[tsCol];
    return ts && new Date(ts) >= sinceDate;
  });
  return { headers: headers, rows: rows };
}

function buildDigestSummaryHtml(title, sinceLabel, ss) {
  var since = new Date();
  if (sinceLabel === "24 hours") since.setDate(since.getDate() - 1);
  else since.setDate(since.getDate() - 7);

  var leadTabs = [
    "Contact Leads", "AI Diagnostic Leads", "AI Readiness Leads", "Workshop Requests",
    "RFP Proposals", "Talk to Architect", "Chatbot Leads", "Career Applications",
    "Partner Applications", "Newsletter Subscribers"
  ];

  var totalLeadCount = 0;
  leadTabs.forEach(function (tab) {
    var r = getRowsSince(ss.getSheetByName(tab), since);
    totalLeadCount += r.rows.length;
  });

  var diag = getRowsSince(ss.getSheetByName("AI Diagnostic Leads"), since);
  var forms = getRowsSince(ss.getSheetByName("Form Submissions"), since);
  var views = getRowsSince(ss.getSheetByName("Page Views"), since);

  var statRow = function (label, value, color) {
    return '<td style="padding:16px;text-align:center;background:#f8fafc;border-radius:8px;">' +
      '<div style="font-size:11px;font-weight:700;color:#64748b;text-transform:uppercase;letter-spacing:0.5px;">' + escapeHtml(label) + '</div>' +
      '<div style="font-size:28px;font-weight:800;color:' + color + ';margin-top:4px;">' + value + '</div></td>';
  };

  var html = '<div style="font-family:Inter,-apple-system,sans-serif;max-width:640px;margin:0 auto;background:#ffffff;border-radius:12px;overflow:hidden;border:1px solid #e2e8f0;">' +
    '<div style="background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%);padding:24px 28px;color:#fff;">' +
      '<div style="font-size:11px;font-weight:700;letter-spacing:1.5px;text-transform:uppercase;color:#818cf8;">TRUSTGRID.AI INTELLIGENCE</div>' +
      '<div style="font-size:20px;font-weight:700;">' + escapeHtml(title) + '</div>' +
      '<div style="font-size:12px;color:#cbd5e1;margin-top:4px;">Window: past ' + escapeHtml(sinceLabel) + '</div>' +
    '</div>' +
    '<div style="padding:24px 28px;">' +
      '<table style="width:100%;border-spacing:8px 0;"><tr>' +
        statRow("Total Leads", totalLeadCount, "#4f46e5") +
        statRow("Diagnostic Requests", diag.rows.length, "#ef4444") +
        statRow("Form Submissions", forms.rows.length, "#10b981") +
        statRow("Page Views", views.rows.length, "#0ea5e9") +
      '</tr></table>' +
      '<div style="text-align:center;margin-top:24px;">' +
        '<a href="https://docs.google.com/spreadsheets/d/' + CONFIG.MAIN_SPREADSHEET_ID + '" style="display:inline-block;padding:12px 24px;background:#4f46e5;color:#fff;text-decoration:none;border-radius:8px;font-weight:600;font-size:14px;">Open Sheet 1 Database</a>' +
      '</div>' +
    '</div>' +
    '<div style="background:#f8fafc;padding:16px 28px;text-align:center;font-size:12px;color:#64748b;border-top:1px solid #f1f5f9;">Automated ' + escapeHtml(sinceLabel) + ' digest from TrustGrid.AI</div>' +
  '</div>';

  return html;
}

function sendDailyDigest() {
  var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  var html = buildDigestSummaryHtml("📬 Daily Executive Digest", "24 hours", ss);
  MailApp.sendEmail({ to: EMAIL_CONFIG.primaryAdmin, subject: "📬 [TrustGrid.AI] Daily Digest — " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MMM d, yyyy"), htmlBody: html });
}

function sendWeeklyDigest() {
  var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  var html = buildDigestSummaryHtml("📈 Weekly Executive Digest", "7 days", ss);
  MailApp.sendEmail({ to: EMAIL_CONFIG.primaryAdmin, subject: "📈 [TrustGrid.AI] Weekly Digest — Week of " + Utilities.formatDate(new Date(), Session.getScriptTimeZone(), "MMM d, yyyy"), htmlBody: html });
}

function sendMonthlyResumeDigest() {
  var ss = SpreadsheetApp.getActiveSpreadsheet() || SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  var sheet = ss.getSheetByName("Form Submissions");
  if (!sheet || sheet.getLastRow() < 2) return;

  var since = new Date();
  since.setMonth(since.getMonth() - 1);
  var data = sheet.getDataRange().getValues();
  var headers = data[0];
  var tsCol = headers.indexOf("Timestamp"), linkCol = headers.indexOf("Resume Drive Link"), nameCol = headers.indexOf("Name"), roleCol = headers.indexOf("Role");

  var rowsHtml = "";
  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    if (!row[linkCol] || !row[tsCol] || new Date(row[tsCol]) < since) continue;
    rowsHtml += '<tr><td style="padding:8px 14px;border-bottom:1px solid #f1f5f9;">' + escapeHtml(row[nameCol]) + '</td>' +
      '<td style="padding:8px 14px;border-bottom:1px solid #f1f5f9;">' + escapeHtml(row[roleCol]) + '</td>' +
      '<td style="padding:8px 14px;border-bottom:1px solid #f1f5f9;"><a href="' + row[linkCol] + '">View Resume</a></td></tr>';
  }
  if (!rowsHtml) return;

  var html = '<div style="font-family:Inter,-apple-system,sans-serif;max-width:640px;margin:0 auto;">' +
    '<h2 style="color:#0f172a;">📁 Monthly Candidate Resume Digest</h2>' +
    '<table style="width:100%;border-collapse:collapse;font-size:14px;">' +
      '<tr><th style="text-align:left;padding:8px 14px;background:#0f172a;color:#fff;">Candidate</th><th style="text-align:left;padding:8px 14px;background:#0f172a;color:#fff;">Role</th><th style="text-align:left;padding:8px 14px;background:#0f172a;color:#fff;">Resume</th></tr>' +
      rowsHtml +
    '</table></div>';

  MailApp.sendEmail({ to: EMAIL_CONFIG.primaryAdmin, subject: "📁 [TrustGrid.AI] Monthly Resume Digest", htmlBody: html });
}
