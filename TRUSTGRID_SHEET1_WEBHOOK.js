/**
 * =========================================================================================
 * TRUSTGRID.AI - APPS SCRIPT WEBHOOK & AUTOMATION ENGINE (SHEET 1)
 * =========================================================================================
 * Clean, lightweight, dedicated webhook engine for TrustGrid.AI forms & telemetry:
 * 1. Contact Submissions (Contact & Architect Consultations)
 * 2. AI Diagnostics (Assessment, Proposal RFP, Readiness & Use-Case Workshop)
 * 3. Ecosystem Partner Applications
 * 4. Career & Fellowship Applications (with Google Drive Resume Archiving)
 * 5. Research & Whitepapers Insights Subscriptions
 * 6. Traffic & User Behavior Telemetry
 * 7. Executive HTML Notification Emails & Confirmation Auto-responders
 * 8. Daily, Weekly & Monthly Scheduled Automated Digests
 * =========================================================================================
 */

// =========================================================================================
// 1. GLOBAL CONFIGURATION
// =========================================================================================

const CONFIG = {
  // Main TrustGrid Spreadsheet ID (Auto-detected if bound, or paste ID)
  MAIN_SPREADSHEET_ID: SpreadsheetApp.getActiveSpreadsheet() ? SpreadsheetApp.getActiveSpreadsheet().getId() : "1cK4aA9usPB5lIWDlPEdV04zB_mOrHTLUYEys1p8gb80",

  // Google Drive folder to store candidate resumes
  CAREER_RESUMES_FOLDER_NAME: "TrustGrid_Career_Resumes",
  CAREER_RESUMES_FOLDER_ID: ""
};

const EMAIL_CONFIG = {
  name: "TrustGrid AI Intelligence",
  website: "https://www.trustgrid.ai",
  replyTo: "hello@trustgrid.ai",

  // Primary Notification Recipient
  primaryAdmin: "poojasri.aram@gmail.com",

  // Sales & Diagnostic Inquiries
  salesEmails: [
    "poojasri.aram@gmail.com"
  ],

  // Career Applications & Resumes
  careerEmails: [
    "poojasri.aram@gmail.com"
  ],

  // Automated Daily & Weekly Reports
  reportEmails: [
    "poojasri.aram@gmail.com"
  ]
};

// =========================================================================================
// =========================================================================================
// 2. DATABASE TABLE CONFIGURATIONS & HEADERS
// =========================================================================================

var TAB_CONFIGS = {
  // 1. Contact & AI Architect Consultations
  "contact_submissions": [
    "Submission ID", "Name", "Email", "Company", "Designation", "Phone",
    "Service Interest", "Subject", "Message",
    "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 2. AI Diagnostics, Readiness, Workshop & Proposal Requests
  "ai_diagnostics": [
    "Submission ID", "Name", "Email", "Company", "Role", "Company Size", "Industry",
    "AI Maturity Level", "Primary Objectives", "Selected Solutions", "Preferred Timeline", "Message",
    "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 3. Strategic & Ecosystem Partner Applications
  "partner_applications": [
    "Submission ID", "Name", "Email", "Company", "Designation", "Phone",
    "Partnership Type", "Expertise / Domain", "Collaboration Model", "Message",
    "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 4. Engineering & Fellowship Career Applications
  "career_applications": [
    "Submission ID", "Name", "Email", "Phone", "Role", "Experience",
    "LinkedIn Profile", "Portfolio URL", "Resume File Name", "Resume Drive Link", "Drive File ID", "Cover Note",
    "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 5. Whitepapers & Insights Subscriptions
  "insights_subscriptions": [
    "Email", "Name", "Company", "Industry", "Topic Preferences",
    "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "IP Location", "IP Address", "Timestamp"
  ],

  // 6. Essential Website Visitors & Traffic
  "traffic_analytics": [
    "Session ID", "Visitor ID", "Page Path", "Page Title", "Referrer", "Traffic Source",
    "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Device", "Browser", "Operating System", "Screen Size",
    "Organization", "IP Location", "IP Address", "Timestamp"
  ]
};

var SHEET_NAME_ALIASES = {
  // Contact
  "contactform": "contact_submissions", "contact_submissions": "contact_submissions", "contact_form": "contact_submissions", "contact": "contact_submissions", "contactinquiry": "contact_submissions", "contacts": "contact_submissions", "talktoaiarchitect": "contact_submissions", "architectconsultations": "contact_submissions",
  // AI Diagnostic
  "aidiagnostic": "ai_diagnostics", "ai_diagnostics": "ai_diagnostics", "ai_diagnostic": "ai_diagnostics", "aidiagnosticform": "ai_diagnostics", "bookaidiagnostic": "ai_diagnostics", "diagnostic": "ai_diagnostics", "requestproposal": "ai_diagnostics", "proposalrequests": "ai_diagnostics", "aireadiness": "ai_diagnostics", "usecaseworkshops": "ai_diagnostics",
  // Partner Applications
  "partnerapps": "partner_applications", "partner_applications": "partner_applications", "partner_application": "partner_applications", "partners": "partner_applications", "partnership": "partner_applications", "partnershipinquiry": "partner_applications",
  // Career Applications
  "careerapplications": "career_applications", "career_applications": "career_applications", "career_application": "career_applications", "careers": "career_applications", "career": "career_applications", "jobs": "career_applications",
  // Insights & Newsletter
  "insightssubscriptions": "insights_subscriptions", "insights_subscriptions": "insights_subscriptions", "insights_subscription": "insights_subscriptions", "newsletter": "insights_subscriptions", "insights": "insights_subscriptions", "subscribers": "insights_subscriptions",
  // Telemetry & Visitor Traffic
  "trafficanalytics": "traffic_analytics", "traffic_analytics": "traffic_analytics", "traffic": "traffic_analytics", "visitors": "traffic_analytics", "website_visitors": "traffic_analytics", "telemetry": "traffic_analytics"
};

function findSheetFlexible(spreadsheet, requestedName) {
  if (!spreadsheet || !requestedName) return null;
  var sheet = spreadsheet.getSheetByName(requestedName);
  if (sheet) return sheet;

  var norm = requestedName.toLowerCase().replace(/[\s\-_]/g, '');
  var canonical = SHEET_NAME_ALIASES[norm] || requestedName;
  sheet = spreadsheet.getSheetByName(canonical);
  if (sheet) return sheet;

  var allSheets = spreadsheet.getSheets();
  for (var i = 0; i < allSheets.length; i++) {
    var curNorm = allSheets[i].getName().toLowerCase().replace(/[\s\-_]/g, '');
    if (curNorm === norm || curNorm === canonical.toLowerCase().replace(/[\s\-_]/g, '')) {
      return allSheets[i];
    }
  }
  return null;
}

// =========================================================================================
// 3. MAIN WEBHOOK HANDLER (doPost & doGet)
// =========================================================================================

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: "online",
    service: "TrustGrid.AI Webhook Engine",
    activeForms: ["contact_submissions", "ai_diagnostics", "partner_applications", "career_applications", "insights_subscriptions"],
    timestamp: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

function doPost(e) {
  if (!e || !e.postData || !e.postData.contents) {
    return ContentService.createTextOutput(JSON.stringify({ status: "ok", message: "TrustGrid Webhook Active" }))
                         .setMimeType(ContentService.MimeType.JSON);
  }

  try {
    var rawPayload = e.postData.contents;
    var data = JSON.parse(rawPayload);

    if (data.metadata && typeof data.metadata === "object") {
      for (var key in data.metadata) {
        if (data[key] === undefined) data[key] = data.metadata[key];
      }
    }

    var sheetName = data.sheetName || data.formName || (data.eventType ? "traffic_analytics" : "contact_submissions");
    var normName = sheetName.toLowerCase().replace(/[\s\-_]/g, '');
    var canonicalSheetName = SHEET_NAME_ALIASES[normName] || sheetName;

    // Handle telemetry events
    if (data.eventType) {
      handleTelemetryEvent(data);
      return ContentService.createTextOutput("Telemetry Logged").setMimeType(ContentService.MimeType.TEXT);
    }

    // Ingest into Sheet 1
    var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
    var sheet = findSheetFlexible(ss, canonicalSheetName);

    if (!sheet) {
      sheet = ss.insertSheet(canonicalSheetName);
      var defaultHeaders = TAB_CONFIGS[canonicalSheetName] || Object.keys(data).filter(function(k) { return k !== 'sheetName' && k !== 'metadata'; });
      sheet.getRange(1, 1, 1, defaultHeaders.length)
           .setValues([defaultHeaders])
           .setFontWeight("bold")
           .setBackground("#0f172a")
           .setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    } else if (sheet.getLastRow() === 0) {
      var defaultHeaders = TAB_CONFIGS[canonicalSheetName] || Object.keys(data).filter(function(k) { return k !== 'sheetName' && k !== 'metadata'; });
      sheet.getRange(1, 1, 1, defaultHeaders.length)
           .setValues([defaultHeaders])
           .setFontWeight("bold")
           .setBackground("#0f172a")
           .setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }

    // Career Applications: Save Resume to Google Drive if provided
    var resumeDriveUrl = "";
    var resumeFileId = "";
    if (canonicalSheetName === "career_applications" && (data.resumeBlob || data.resumeBase64)) {
      try {
        var driveFile = saveResumeToDrive(data);
        if (driveFile) {
          resumeDriveUrl = driveFile.getUrl();
          resumeFileId = driveFile.getId();
          data.resumeDriveLink = resumeDriveUrl;
          data.driveFileId = resumeFileId;
        }
      } catch (driveErr) {
        console.error("Resume storage notice:", driveErr.toString());
      }
    }

    var lastCol = Math.max(sheet.getLastColumn(), 1);
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    var newRow = headers.map(function(h) {
      if (h === "Resume Drive Link" || h === "resumeDriveLink") return resumeDriveUrl;
      if (h === "Drive File ID" || h === "driveFileId") return resumeFileId;
      if (h === "Resume Blob" || h === "resumeBlob") return "Archived in Drive";
      return resolveField(h, data);
    });

    sheet.appendRow(newRow);

    var LEAD_FORMS = [
      "contact_submissions", "ai_diagnostics", "partner_applications", "career_applications", "insights_subscriptions"
    ];

    if (LEAD_FORMS.indexOf(canonicalSheetName) !== -1) {
      sendLeadEmails(data, canonicalSheetName, ss.getUrl());
    }

    return ContentService.createTextOutput(JSON.stringify({ success: true, message: "Submission captured successfully" }))
                         .setMimeType(ContentService.MimeType.JSON);

  } catch (err) {
    console.error("doPost error:", err.toString());
    return ContentService.createTextOutput(JSON.stringify({ success: false, error: err.toString() }))
                         .setMimeType(ContentService.MimeType.JSON);
  }
}

function handleTelemetryEvent(data) {
  try {
    var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
    var tSheet = findSheetFlexible(ss, "traffic_analytics");
    if (!tSheet) {
      tSheet = ss.insertSheet("traffic_analytics");
      var hd = TAB_CONFIGS["traffic_analytics"];
      tSheet.getRange(1, 1, 1, hd.length).setValues([hd]).setFontWeight("bold").setBackground("#0f172a").setFontColor("#38bdf8");
      tSheet.setFrozenRows(1);
    }
    var tHeaders = tSheet.getRange(1, 1, 1, Math.max(tSheet.getLastColumn(), 1)).getValues()[0];
    var tRow = tHeaders.map(function(h) { return resolveField(h, data); });
    tSheet.appendRow(tRow);
  } catch (e) {
    console.error("Telemetry error:", e.toString());
  }
}

// =========================================================================================
// 4. GOOGLE DRIVE RESUME STORAGE
// =========================================================================================

function saveResumeToDrive(data) {
  var b64 = data.resumeBlob || data.resumeBase64 || data.resume;
  if (!b64) return null;
  if (b64.includes(",")) b64 = b64.split(",")[1];

  var folder;
  if (CONFIG.CAREER_RESUMES_FOLDER_ID) {
    try { folder = DriveApp.getFolderById(CONFIG.CAREER_RESUMES_FOLDER_ID); } catch(e){}
  }
  if (!folder) {
    var folders = DriveApp.getFoldersByName(CONFIG.CAREER_RESUMES_FOLDER_NAME);
    if (folders.hasNext()) {
      folder = folders.next();
    } else {
      folder = DriveApp.createFolder(CONFIG.CAREER_RESUMES_FOLDER_NAME);
    }
  }

  var candidateName = (data.name || data.Name || "Candidate").replace(/[^a-zA-Z0-9_\s]/g, "");
  var rawFileName = data.resumeFileName || data.resumeName || (candidateName + "_Resume.pdf");
  var mimeType = "application/pdf";

  if (rawFileName.endsWith(".docx")) mimeType = "application/vnd.openxmlformats-officedocument.wordprocessingml.document";
  else if (rawFileName.endsWith(".doc")) mimeType = "application/msword";

  var decodedBytes = Utilities.base64Decode(b64);
  var timeStr = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyyMMdd_HHmm");
  var finalName = candidateName.replace(/\s+/g, "_") + "_" + timeStr + "_" + rawFileName;

  var blob = Utilities.newBlob(decodedBytes, mimeType, finalName);
  var file = folder.createFile(blob);
  file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
  return file;
}

// =========================================================================================
// 5. EXECUTIVE NOTIFICATION EMAILS
// =========================================================================================

function sendLeadEmails(data, sheetName, sheetUrl) {
  var leadMeta = getLeadCategoryMeta(sheetName, data);
  var subjectInternal = leadMeta.internalSubject;
  var htmlInternal = buildInternalLeadHtml(leadMeta, data, sheetUrl);

  var userEmail = data.email || data.Email || data.workEmail;
  var subjectUser = leadMeta.userSubject;
  var htmlUser = buildUserConfirmationHtml(leadMeta.leadName, leadMeta.categoryName, leadMeta.userMessage);

  var attachments = [];
  if (sheetName === "career_applications" && (data.resumeBlob || data.resumeBase64)) {
    try {
      var b64 = data.resumeBlob || data.resumeBase64;
      if (b64.includes(",")) b64 = b64.split(",")[1];
      var candidateName = (data.name || "Candidate").replace(/[^a-zA-Z0-9_\s]/g, "");
      var rawName = data.resumeFileName || (candidateName + "_Resume.pdf");
      var blob = Utilities.newBlob(Utilities.base64Decode(b64), "application/pdf", rawName);
      if (blob.getBytes().length < 15 * 1024 * 1024) {
        attachments.push(blob);
      }
    } catch(e) {}
  }

  if (userEmail) {
    try {
      MailApp.sendEmail({
        to: userEmail,
        subject: subjectUser,
        htmlBody: htmlUser,
        name: EMAIL_CONFIG.name,
        replyTo: EMAIL_CONFIG.replyTo
      });
    } catch(e) {}
  }

  try {
    leadMeta.recipients.forEach(function(email) {
      var mailOptions = {
        to: email,
        subject: subjectInternal,
        htmlBody: htmlInternal,
        name: "TrustGrid Engine • " + leadMeta.categoryName
      };
      if (attachments.length > 0) mailOptions.attachments = attachments;
      MailApp.sendEmail(mailOptions);
    });
  } catch(e) {}
}

function getLeadCategoryMeta(sheetName, data) {
  var name = data.name || data.Name || data["Full Name"] || data.fullName || "";
  var company = data.company || data.Company || data.companyName || data["Company Name"] || "";
  var role = data.role || data.jobTitle || data["Role"] || data["Designation"] || "";
  var phone = data.phone || data.Phone || data["Phone Number"] || "";

  switch (sheetName) {
    case "ai_diagnostics":
    case "AIDiagnostic":
      return {
        categoryName: "Enterprise AI Diagnostic Request",
        badgeText: "🧠 AI DIAGNOSTIC STRATEGY",
        badgeBg: "#6366f1",
        badgeColor: "#ffffff",
        leadName: name || "Enterprise Executive",
        leadCompany: company || "Corporate Client",
        leadPhone: phone,
        internalSubject: "🧠 [AI Diagnostic Request] " + (company ? company + " (" + name + ")" : name || "New Enterprise Prospect"),
        userSubject: "✅ AI Diagnostic Session Confirmed – TrustGrid.AI",
        userMessage: "Thank you for scheduling an Enterprise AI Diagnostic with TrustGrid. Our Principal AI Architect has received your infrastructure details and will connect with you to review your AI roadmap.",
        recipients: EMAIL_CONFIG.salesEmails
      };

    case "contact_submissions":
    case "ContactForm":
      return {
        categoryName: "General Inbound Contact",
        badgeText: "💬 DIRECT INBOUND INQUIRY",
        badgeBg: "#0284c7",
        badgeColor: "#ffffff",
        leadName: name || "Website Visitor",
        leadCompany: company || "Direct Lead",
        leadPhone: phone,
        internalSubject: "💬 [Contact Form] " + (name ? name + (company ? " - " + company : "") : "New Website Inquiry"),
        userSubject: "✅ Message Received – TrustGrid.AI",
        userMessage: "Thank you for contacting TrustGrid.AI. Our leadership team has received your message and will respond shortly.",
        recipients: EMAIL_CONFIG.salesEmails
      };

    case "partner_applications":
    case "PartnerApps":
      return {
        categoryName: "Ecosystem Partner Application",
        badgeText: "🤝 AI ECOSYSTEM PARTNER",
        badgeBg: "#a855f7",
        badgeColor: "#ffffff",
        leadName: name || "Partner Applicant",
        leadCompany: company || "Partner Organization",
        leadPhone: phone,
        internalSubject: "🤝 [Partner Application] " + (company || name || "New Partner"),
        userSubject: "🤝 Partner Network Application Received – TrustGrid.AI",
        userMessage: "Thank you for your interest in the TrustGrid AI Alliance. Our Strategic Partnerships team will review your capabilities and schedule an exploratory discussion.",
        recipients: EMAIL_CONFIG.salesEmails
      };

    case "career_applications":
    case "CareerApplications":
      return {
        categoryName: "AI Talent & Career Application",
        badgeText: "📄 CAREER APPLICATION & RESUME",
        badgeBg: "#4f46e5",
        badgeColor: "#ffffff",
        leadName: name || "Candidate",
        leadCompany: "Applied for: " + (role || "AI Engineering Role"),
        leadPhone: phone,
        internalSubject: "📄 [Career Application] " + (name || "Candidate") + " – " + (role || "AI Specialist"),
        userSubject: "📄 Career Application Received – TrustGrid.AI Careers",
        userMessage: "Thank you for applying to TrustGrid.AI. Our Talent Engineering team is reviewing your profile and will contact you if there is an alignment with our current mission openings.",
        recipients: EMAIL_CONFIG.careerEmails
      };

    case "insights_subscriptions":
    case "InsightsSubscriptions":
      return {
        categoryName: "AI Insights & Research Subscription",
        badgeText: "📬 INSIGHTS SUBSCRIBER",
        badgeBg: "#06b6d4",
        badgeColor: "#ffffff",
        leadName: name || "Subscriber",
        leadCompany: company || "Research Reader",
        leadPhone: phone,
        internalSubject: "📬 [Insights Subscription] New Subscriber: " + (data.email || "Reader"),
        userSubject: "⚡ Welcome to TrustGrid AI Executive Insights",
        userMessage: "Thank you for subscribing to TrustGrid AI Insights. You will receive our monthly executive research papers, agentic AI blueprints, and enterprise architecture breakdowns.",
        recipients: EMAIL_CONFIG.salesEmails
      };

    default:
      return {
        categoryName: sheetName + " Submission",
        badgeText: "🔔 " + sheetName.toUpperCase() + " LEAD",
        badgeBg: "#475569",
        badgeColor: "#ffffff",
        leadName: name || "Website User",
        leadCompany: company || "General Inquiry",
        leadPhone: phone,
        internalSubject: "🔔 [" + sheetName + "] " + (name || "New Submission"),
        userSubject: "✅ Request Received – TrustGrid.AI",
        userMessage: "We have received your submission and our team will follow up with you shortly.",
        recipients: EMAIL_CONFIG.salesEmails
      };
  }
}

// =========================================================================================
// 6. HIGH-END RESPONSIVE HTML EMAIL TEMPLATES
// =========================================================================================

function buildInternalLeadHtml(meta, data, sheetUrl) {
  var utmSource   = data.utmSource   || data.utm_source   || "";
  var utmMedium   = data.utmMedium   || data.utm_medium   || "";
  var utmCampaign = data.utmCampaign || data.utm_campaign || "";
  var ipLoc       = data.location    || data.ipLocation   || data["IP Location"] || "United States / Global";

  var utmBadgeHtml = "";
  if (utmSource || utmCampaign) {
    utmBadgeHtml = '<div style="margin-top: 15px; padding: 12px; background: #0b1329; border: 1px solid #1e293b; border-radius: 8px;">' +
                   '<span style="font-size: 11px; font-weight: 700; color: #94a3b8; text-transform: uppercase;">Attribution: </span>' +
                   '<span style="display: inline-block; background: #334155; color: #f8fafc; font-size: 11px; padding: 2px 8px; border-radius: 4px; margin-right: 4px;">Source: ' + (utmSource || 'direct') + '</span>' +
                   '<span style="display: inline-block; background: #334155; color: #f8fafc; font-size: 11px; padding: 2px 8px; border-radius: 4px;">Campaign: ' + (utmCampaign || 'organic') + '</span>' +
                   '</div>';
  }

  var detailsRows = "";
  var skipKeys = ["sheetName", "metadata", "resumeBlob", "resumeBase64", "eventType", "password"];
  
  for (var key in data) {
    if (skipKeys.indexOf(key) !== -1) continue;
    var val = data[key];
    if (val === "" || val === null || val === undefined) continue;
    if (typeof val === "object") val = JSON.stringify(val);

    var label = key.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); });
    
    detailsRows += '<tr style="border-bottom: 1px solid #1e293b;">' +
                   '<td style="padding: 10px 14px; font-size: 13px; font-weight: 600; color: #94a3b8; width: 35%; background: #090e1a;">' + label + '</td>' +
                   '<td style="padding: 10px 14px; font-size: 13px; color: #f1f5f9; background: #0f172a;">' + val + '</td>' +
                   '</tr>';
  }

  return [
    '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin: 0; padding: 20px; background-color: #030712; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">',
    '<div style="max-width: 650px; margin: 0 auto; background: #0b1120; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden;">',
    '  <div style="background: linear-gradient(135deg, #0f172a 0%, #1e1b4b 100%); padding: 24px; border-bottom: 1px solid #312e81;">',
    '    <div style="display: inline-block; padding: 4px 10px; background: ' + meta.badgeBg + '; color: ' + meta.badgeColor + '; font-size: 11px; font-weight: 800; border-radius: 6px; letter-spacing: 0.5px; margin-bottom: 10px;">' + meta.badgeText + '</div>',
    '    <h1 style="color: #ffffff; font-size: 20px; margin: 0 0 6px 0; font-weight: 700;">' + meta.categoryName + '</h1>',
    '    <p style="color: #94a3b8; font-size: 13px; margin: 0;">Captured on ' + new Date().toLocaleString() + ' • Location: <strong>' + ipLoc + '</strong></p>',
    '  </div>',
    '  <div style="padding: 24px;">',
    '    <table style="width: 100%; border-collapse: collapse; border: 1px solid #1e293b; border-radius: 8px; overflow: hidden;">',
    '      <tbody>' + detailsRows + '</tbody>',
    '    </table>',
    utmBadgeHtml,
    '    <div style="margin-top: 24px; text-align: center;">',
    '      <a href="' + sheetUrl + '" style="display: inline-block; padding: 11px 24px; background: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 13px; font-weight: 700;">Open Master Data Sheet</a>',
    '    </div>',
    '  </div>',
    '  <div style="background: #090e1a; padding: 14px 24px; border-top: 1px solid #1e293b; text-align: center; font-size: 12px; color: #64748b;">',
    '    TrustGrid.AI Automation Engine • Confidential Internal Notification',
    '  </div>',
    '</div></body></html>'
  ].join('\n');
}

function buildUserConfirmationHtml(name, categoryName, customMessage) {
  var firstName = name ? name.split(' ')[0] : 'there';
  return [
    '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin: 0; padding: 25px; background: #030712; font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Helvetica, Arial, sans-serif;">',
    '<div style="max-width: 600px; margin: 0 auto; background: #0b1120; border: 1px solid #1e293b; border-radius: 12px; overflow: hidden;">',
    '  <div style="background: #0f172a; padding: 28px; text-align: center; border-bottom: 1px solid #1e293b;">',
    '    <div style="font-size: 22px; font-weight: 800; color: #ffffff; letter-spacing: -0.5px;">TRUSTGRID<span style="color:#6366f1;">.AI</span></div>',
    '    <p style="color: #94a3b8; font-size: 13px; margin: 6px 0 0 0;">Enterprise AI Operating System & Architecture</p>',
    '  </div>',
    '  <div style="padding: 30px 28px; color: #cbd5e1; line-height: 1.6; font-size: 14px;">',
    '    <h2 style="color: #f8fafc; font-size: 18px; margin: 0 0 14px 0;">Hello ' + firstName + ',</h2>',
    '    <p style="margin: 0 0 16px 0;">' + customMessage + '</p>',
    '    <div style="background: #090e1a; border-left: 3px solid #6366f1; padding: 16px 20px; border-radius: 0 8px 8px 0; margin: 20px 0;">',
    '      <div style="font-size: 12px; color: #818cf8; font-weight: 700; text-transform: uppercase;">Next Steps</div>',
    '      <p style="font-size: 13px; color: #94a3b8; margin: 4px 0 0 0;">Our Principal AI Systems Engineer is reviewing your technical parameters. We typically respond within 2 to 4 business hours.</p>',
    '    </div>',
    '    <div style="margin-top: 28px; text-align: center;">',
    '      <a href="' + EMAIL_CONFIG.website + '" style="display: inline-block; padding: 12px 28px; background: #4f46e5; color: #ffffff; text-decoration: none; border-radius: 6px; font-size: 13.5px; font-weight: 700;">Explore TrustGrid Architecture</a>',
    '    </div>',
    '  </div>',
    '  <div style="background: #090e1a; padding: 18px 25px; text-align: center; font-size: 12px; color: #64748b; border-top: 1px solid #1e293b;">',
    '    &copy; ' + new Date().getFullYear() + ' TrustGrid Technologies. All rights reserved.',
    '  </div>',
    '</div></body></html>'
  ].join('\n');
}

// =========================================================================================
// 7. MONTHLY CAREER CANDIDATE RESUMES DIGEST
// =========================================================================================

function forwardMonthlyCareerApplications() {
  var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  var sheet = findSheetFlexible(ss, "career_applications") || ss.getSheetByName("career_applications");
  if (!sheet) return;

  var data = sheet.getDataRange().getValues();
  if (data.length < 2) return;

  var headers = data[0];
  var nameCol       = headers.indexOf("Name");
  var emailCol      = headers.indexOf("Email");
  var phoneCol      = headers.indexOf("Phone");
  var roleCol       = headers.indexOf("Role");
  var resumeNameCol = headers.indexOf("Resume File Name");
  var driveLinkCol  = headers.indexOf("Resume Drive Link");
  var driveIdCol    = headers.indexOf("Drive File ID");
  var tsCol         = headers.indexOf("Timestamp");

  var now = new Date();
  var thirtyDaysAgo = new Date(now.getTime() - 31 * 24 * 60 * 60 * 1000);

  var candidates = [];
  var attachments = [];
  var totalAttachmentSize = 0;
  var MAX_BYTES = 20 * 1024 * 1024;

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var ts = parseSheetDate(row[tsCol]);
    if (ts && ts >= thirtyDaysAgo) {
      var candidate = {
        name: row[nameCol] || "Applicant",
        email: row[emailCol] || "",
        phone: row[phoneCol] || "",
        role: row[roleCol] || "AI Role",
        resumeName: row[resumeNameCol] || "Resume.pdf",
        driveLink: (driveLinkCol !== -1 ? row[driveLinkCol] : "") || "",
        driveId: (driveIdCol !== -1 ? row[driveIdCol] : "") || "",
        date: Utilities.formatDate(ts, "Asia/Kolkata", "dd-MMM-yyyy")
      };

      if (candidate.driveId) {
        try {
          var file = DriveApp.getFileById(candidate.driveId);
          var blob = file.getBlob();
          var size = blob.getBytes().length;
          if (totalAttachmentSize + size < MAX_BYTES) {
            blob.setName(candidate.name.replace(/[^a-zA-Z0-9_\s]/g, "") + "_" + (candidate.resumeName || "Resume.pdf"));
            attachments.push(blob);
            totalAttachmentSize += size;
          }
        } catch (e) {}
      }
      candidates.push(candidate);
    }
  }

  if (candidates.length === 0) return;

  var monthLabel = Utilities.formatDate(now, "Asia/Kolkata", "MMMM yyyy");
  var candidateRows = candidates.map(function(c, idx) {
    var resumeCell = c.driveLink 
      ? '<a href="' + c.driveLink + '" target="_blank" style="color:#38bdf8;font-weight:bold;text-decoration:none;">📄 View in Drive</a>'
      : '<span style="color:#64748b;">Attached</span>';

    return '<tr style="background:' + (idx % 2 === 0 ? '#0f172a' : '#1e293b') + ';">' +
           '<td style="padding:10px;border-bottom:1px solid #334155;font-weight:700;color:#f8fafc;font-size:13px;">' + c.name + '</td>' +
           '<td style="padding:10px;border-bottom:1px solid #334155;color:#818cf8;font-weight:600;font-size:12px;">' + c.role + '</td>' +
           '<td style="padding:10px;border-bottom:1px solid #334155;color:#cbd5e1;font-size:12px;">' + c.email + '<br>' + c.phone + '</td>' +
           '<td style="padding:10px;border-bottom:1px solid #334155;color:#94a3b8;font-size:11px;">' + c.date + '</td>' +
           '<td style="padding:10px;border-bottom:1px solid #334155;font-size:12px;text-align:center;">' + resumeCell + '</td>' +
           '</tr>';
  }).join('');

  var emailHtml = [
    '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="font-family:sans-serif;background:#030712;padding:25px;">',
    '<div style="max-width:700px;margin:0 auto;background:#0b1120;border-radius:14px;border:1px solid #1e293b;overflow:hidden;">',
    '  <div style="background:linear-gradient(135deg,#1e1b4b 0%,#4338ca 100%);padding:25px;color:#fff;">',
    '    <div style="background:#6366f1;display:inline-block;padding:3px 10px;border-radius:12px;font-size:11px;font-weight:800;margin-bottom:8px;">MONTHLY TALENT PIPELINE</div>',
    '    <h2 style="margin:0;">TrustGrid AI - Monthly Career Digest</h2>',
    '    <p style="margin:5px 0 0 0;color:#c7d2fe;font-size:13px;">Applications for ' + monthLabel + ' • Total: <strong>' + candidates.length + ' Candidates</strong></p>',
    '  </div>',
    '  <div style="padding:25px;">',
    '    <table style="width:100%;border-collapse:collapse;border:1px solid #334155;">',
    '      <thead><tr style="background:#020617;color:#94a3b8;font-size:11px;"><th style="padding:10px;text-align:left;">Candidate</th><th style="padding:10px;text-align:left;">Role</th><th style="padding:10px;text-align:left;">Contact</th><th style="padding:10px;text-align:left;">Date</th><th style="padding:10px;text-align:center;">Resume</th></tr></thead>',
    '      <tbody>' + candidateRows + '</tbody>',
    '    </table>',
    '  </div>',
    '</div></body></html>'
  ].join('\n');

  EMAIL_CONFIG.careerEmails.forEach(function(email) {
    var mailOptions = {
      to: email,
      subject: "📁 [Career Applications] Monthly Resumes Digest – " + monthLabel + " (" + candidates.length + " Applicants)",
      htmlBody: emailHtml,
      name: "TrustGrid Talent Engine"
    };
    if (attachments.length > 0) mailOptions.attachments = attachments;
    MailApp.sendEmail(mailOptions);
  });
}

// =========================================================================================
// 8. AUTOMATED DAILY & WEEKLY ANALYTICS DIGESTS
// =========================================================================================

function dailyReport() {
  var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  var trafficSheet = findSheetFlexible(ss, "traffic_analytics") || ss.getSheetByName("traffic_analytics");
  if (!trafficSheet) return;

  var yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  var dayBefore = new Date(); dayBefore.setDate(dayBefore.getDate() - 2);
  var targetDateISO = Utilities.formatDate(yesterday, "Asia/Kolkata", "yyyy-MM-dd");
  var prevDateISO   = Utilities.formatDate(dayBefore, "Asia/Kolkata", "yyyy-MM-dd");

  var data = trafficSheet.getDataRange().getValues();
  var headers = data[0];
  var tsCol   = headers.indexOf("Timestamp");
  var ipCol   = headers.indexOf("IP Address");
  var pathCol = headers.indexOf("Page Path");
  var srcCol  = headers.indexOf("Traffic Source");

  var stats = {
    current: { sess: 0, ips: new Set(), pages: {}, sources: {} },
    previous: { sess: 0, ips: new Set() }
  };

  for (var i = 1; i < data.length; i++) {
    var rd = parseSheetDate(data[i][tsCol]);
    if (!rd) continue;
    var rdStr = Utilities.formatDate(rd, "Asia/Kolkata", "yyyy-MM-dd");
    if (rdStr === targetDateISO) {
      stats.current.sess++;
      if (data[i][ipCol]) stats.current.ips.add(data[i][ipCol]);
      var p = data[i][pathCol] || "/";
      stats.current.pages[p] = (stats.current.pages[p] || 0) + 1;
      var src = data[i][srcCol] || "Direct";
      stats.current.sources[src] = (stats.current.sources[src] || 0) + 1;
    } else if (rdStr === prevDateISO) {
      stats.previous.sess++;
      if (data[i][ipCol]) stats.previous.ips.add(data[i][ipCol]);
    }
  }

  var leadsCount = countLeadsInPeriod(ss, yesterday, yesterday);
  var topPagesList = Object.keys(stats.current.pages).sort(function(a,b){ return stats.current.pages[b]-stats.current.pages[a]; }).slice(0,5).map(function(p){ return { path: p, visits: stats.current.pages[p] }; });
  var sourcesList = Object.keys(stats.current.sources).sort(function(a,b){ return stats.current.sources[b]-stats.current.sources[a]; }).slice(0,5).map(function(s){ return { source: s, count: stats.current.sources[s] }; });

  var emailHtml = buildExecutiveDashboardReportHtml({
    reportType: "DAILY AI ANALYTICS DIGEST",
    reportTitle: "TrustGrid Daily Traffic & Acquisition Intelligence",
    reportSubtitle: "Activity for " + targetDateISO + " (vs prior day)",
    periodLabel: targetDateISO,
    kpis: [
      { label: "Total Sessions", value: stats.current.sess, delta: calculateChange(stats.current.sess, stats.previous.sess), icon: "📈" },
      { label: "Unique Visitors", value: stats.current.ips.size, delta: calculateChange(stats.current.ips.size, stats.previous.ips.size), icon: "👥" },
      { label: "Leads Captured", value: leadsCount.total, delta: null, icon: "🔥" },
      { label: "Top Solution Visited", value: (topPagesList[0] ? topPagesList[0].path : "/"), delta: null, icon: "🏆" }
    ],
    leads: leadsCount,
    topPages: topPagesList,
    sources: sourcesList,
    totalSessions: stats.current.sess,
    dashboardUrl: ss.getUrl()
  });

  EMAIL_CONFIG.reportEmails.forEach(function(em) {
    MailApp.sendEmail(em, "📊 [Daily Analytics] TrustGrid Performance – " + targetDateISO, "", { htmlBody: emailHtml, name: "TrustGrid Intelligence Engine" });
  });
}

function weeklyReport() {
  var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  var trafficSheet = findSheetFlexible(ss, "traffic_analytics") || ss.getSheetByName("traffic_analytics");
  if (!trafficSheet) return;

  var now = new Date();
  var w1Start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  var w2Start = new Date(w1Start.getTime() - 7 * 24 * 60 * 60 * 1000);

  var data = trafficSheet.getDataRange().getValues();
  var headers = data[0];
  var tsCol   = headers.indexOf("Timestamp");
  var ipCol   = headers.indexOf("IP Address");
  var pathCol = headers.indexOf("Page Path");
  var srcCol  = headers.indexOf("Traffic Source");

  var w1 = { sess: 0, ips: new Set(), pages: {}, sources: {} };
  var w2 = { sess: 0, ips: new Set() };

  for (var i = 1; i < data.length; i++) {
    var ts = parseSheetDate(data[i][tsCol]);
    if (!ts) continue;
    if (ts >= w1Start && ts <= now) {
      w1.sess++;
      if (data[i][ipCol]) w1.ips.add(data[i][ipCol]);
      var p = data[i][pathCol] || "/";
      w1.pages[p] = (w1.pages[p] || 0) + 1;
      var src = data[i][srcCol] || "Direct";
      w1.sources[src] = (w1.sources[src] || 0) + 1;
    } else if (ts >= w2Start && ts < w1Start) {
      w2.sess++;
      if (data[i][ipCol]) w2.ips.add(data[i][ipCol]);
    }
  }

  var leadsCount = countLeadsInPeriod(ss, w1Start, now);
  var topPagesList = Object.keys(w1.pages).sort(function(a,b){ return w1.pages[b]-w1.pages[a]; }).slice(0,6).map(function(p){ return { path: p, visits: w1.pages[p] }; });
  var sourcesList = Object.keys(w1.sources).sort(function(a,b){ return w1.sources[b]-w1.sources[a]; }).slice(0,5).map(function(s){ return { source: s, count: w1.sources[s] }; });
  var startDate = Utilities.formatDate(w1Start, "Asia/Kolkata", "dd-MMM-yyyy");
  var endDate   = Utilities.formatDate(now, "Asia/Kolkata", "dd-MMM-yyyy");

  var emailHtml = buildExecutiveDashboardReportHtml({
    reportType: "WEEKLY EXECUTIVE REPORT",
    reportTitle: "TrustGrid Weekly AI Growth & Lead Pipeline",
    reportSubtitle: "Activity for " + startDate + " to " + endDate + " (vs prior week)",
    periodLabel: startDate + " – " + endDate,
    kpis: [
      { label: "Weekly Sessions", value: w1.sess, delta: calculateChange(w1.sess, w2.sess), icon: "📈" },
      { label: "Unique Visitors", value: w1.ips.size, delta: calculateChange(w1.ips.size, w2.ips.size), icon: "👥" },
      { label: "Leads Generated", value: leadsCount.total, delta: null, icon: "🔥" },
      { label: "Top Visited Solution", value: (topPagesList[0] ? topPagesList[0].path : "/"), delta: null, icon: "🏆" }
    ],
    leads: leadsCount,
    topPages: topPagesList,
    sources: sourcesList,
    totalSessions: w1.sess,
    dashboardUrl: ss.getUrl()
  });

  EMAIL_CONFIG.reportEmails.forEach(function(em) {
    MailApp.sendEmail(em, "📅 [Weekly Analytics] TrustGrid Summary (" + startDate + " to " + endDate + ")", "", { htmlBody: emailHtml, name: "TrustGrid Intelligence Engine" });
  });
}

function countLeadsInPeriod(ss, startDate, endDate) {
  var counts = { diagnostic: 0, contact: 0, career: 0, partner: 0, insights: 0, total: 0 };
  var formSheetMap = {
    "ai_diagnostics": "diagnostic",
    "contact_submissions": "contact",
    "career_applications": "career",
    "partner_applications": "partner",
    "insights_subscriptions": "insights"
  };

  for (var sheetName in formSheetMap) {
    var sh = findSheetFlexible(ss, sheetName);
    if (!sh) continue;
    var data = sh.getDataRange().getValues();
    if (data.length < 2) continue;
    var tsCol = data[0].indexOf("Timestamp");
    if (tsCol === -1) continue;

    for (var r = 1; r < data.length; r++) {
      var ts = parseSheetDate(data[r][tsCol]);
      if (ts && ts >= startDate && ts <= endDate) {
        var key = formSheetMap[sheetName];
        counts[key] = (counts[key] || 0) + 1;
        counts.total++;
      }
    }
  }

  return counts;
}

function buildExecutiveDashboardReportHtml(params) {
  var kpiCards = params.kpis.map(function(k) {
    var deltaBadge = k.delta ? '<span style="display:inline-block;padding:2px 8px;border-radius:12px;font-size:11px;font-weight:700;' + (k.delta.startsWith('+') ? 'background:#065f46;color:#34d399;' : 'background:#7f1d1d;color:#f87171;') + '">' + k.delta + '</span>' : '';
    return '<div style="flex:1;min-width:130px;background:#0f172a;border:1px solid #1e293b;border-radius:10px;padding:16px;text-align:center;">' +
           '<div style="font-size:18px;margin-bottom:6px;">' + k.icon + '</div>' +
           '<div style="color:#94a3b8;font-size:11px;font-weight:700;text-transform:uppercase;">' + k.label + '</div>' +
           '<div style="color:#ffffff;font-size:22px;font-weight:800;margin:6px 0 4px 0;">' + k.value + '</div>' +
           deltaBadge +
           '</div>';
  }).join('');

  var leadRows = [
    { name: "Enterprise AI Diagnostics", count: params.leads.diagnostic || 0, color: "#6366f1" },
    { name: "Direct Contact Inquiries", count: params.leads.contact || 0, color: "#0284c7" },
    { name: "Ecosystem Partner Proposals", count: params.leads.partner || 0, color: "#a855f7" },
    { name: "Engineering Career Applicants", count: params.leads.career || 0, color: "#4f46e5" },
    { name: "Research Insights Subscribers", count: params.leads.insights || 0, color: "#06b6d4" }
  ].map(function(l) {
    return '<tr>' +
           '<td style="padding:8px 12px;border-bottom:1px solid #1e293b;color:#f1f5f9;font-size:12.5px;"><span style="display:inline-block;width:8px;height:8px;border-radius:50%;background:' + l.color + ';margin-right:8px;"></span>' + l.name + '</td>' +
           '<td style="padding:8px 12px;border-bottom:1px solid #1e293b;color:#ffffff;font-weight:700;font-size:13px;text-align:right;">' + l.count + '</td>' +
           '</tr>';
  }).join('');

  var pageRows = params.topPages.map(function(p, i) {
    return '<tr>' +
           '<td style="padding:7px 10px;border-bottom:1px solid #1e293b;color:#94a3b8;font-size:11px;width:24px;">#' + (i+1) + '</td>' +
           '<td style="padding:7px 10px;border-bottom:1px solid #1e293b;color:#cbd5e1;font-size:12px;font-family:monospace;">' + p.path + '</td>' +
           '<td style="padding:7px 10px;border-bottom:1px solid #1e293b;color:#38bdf8;font-weight:700;font-size:12px;text-align:right;">' + p.visits + '</td>' +
           '</tr>';
  }).join('');

  var sourceRows = params.sources.map(function(s) {
    return '<tr>' +
           '<td style="padding:7px 10px;border-bottom:1px solid #1e293b;color:#cbd5e1;font-size:12px;">' + s.source + '</td>' +
           '<td style="padding:7px 10px;border-bottom:1px solid #1e293b;color:#34d399;font-weight:700;font-size:12px;text-align:right;">' + s.count + '</td>' +
           '</tr>';
  }).join('');

  return [
    '<!DOCTYPE html><html><head><meta charset="utf-8"></head><body style="margin:0;padding:20px;background:#030712;font-family:sans-serif;">',
    '<div style="max-width:700px;margin:0 auto;background:#0b1120;border:1px solid #1e293b;border-radius:14px;overflow:hidden;">',
    '  <div style="background:linear-gradient(135deg,#0f172a 0%,#1e1b4b 100%);padding:24px;border-bottom:1px solid #312e81;">',
    '    <div style="display:inline-block;padding:3px 10px;background:#4f46e5;color:#ffffff;font-size:10.5px;font-weight:800;border-radius:6px;margin-bottom:8px;">' + params.reportType + '</div>',
    '    <h1 style="color:#ffffff;font-size:20px;margin:0 0 4px 0;">' + params.reportTitle + '</h1>',
    '    <p style="color:#94a3b8;font-size:12.5px;margin:0;">' + params.reportSubtitle + '</p>',
    '  </div>',
    '  <div style="padding:22px;">',
    '    <div style="display:flex;flex-wrap:wrap;gap:12px;margin-bottom:22px;">' + kpiCards + '</div>',
    '    <div style="background:#090e1a;border:1px solid #1e293b;border-radius:10px;padding:16px;margin-bottom:18px;">',
    '      <div style="font-size:12px;font-weight:700;color:#f8fafc;text-transform:uppercase;margin-bottom:10px;">Pipeline & Inbound Conversions</div>',
    '      <table style="width:100%;border-collapse:collapse;">' + leadRows + '</table>',
    '    </div>',
    '    <div style="display:flex;gap:14px;flex-wrap:wrap;">',
    '      <div style="flex:1;min-width:260px;background:#090e1a;border:1px solid #1e293b;border-radius:10px;padding:14px;">',
    '        <div style="font-size:11.5px;font-weight:700;color:#f8fafc;text-transform:uppercase;margin-bottom:8px;">Top High-Intent Pages</div>',
    '        <table style="width:100%;border-collapse:collapse;">' + pageRows + '</table>',
    '      </div>',
    '      <div style="flex:1;min-width:260px;background:#090e1a;border:1px solid #1e293b;border-radius:10px;padding:14px;">',
    '        <div style="font-size:11.5px;font-weight:700;color:#f8fafc;text-transform:uppercase;margin-bottom:8px;">Traffic Channels</div>',
    '        <table style="width:100%;border-collapse:collapse;">' + sourceRows + '</table>',
    '      </div>',
    '    </div>',
    '    <div style="margin-top:22px;text-align:center;">',
    '      <a href="' + params.dashboardUrl + '" style="display:inline-block;padding:11px 26px;background:#4f46e5;color:#ffffff;text-decoration:none;border-radius:6px;font-size:13px;font-weight:700;">Open Master Data Sheet</a>',
    '    </div>',
    '  </div>',
    '  <div style="background:#090e1a;padding:14px 20px;border-top:1px solid #1e293b;text-align:center;font-size:11.5px;color:#64748b;">',
    '    TrustGrid.AI Executive Intelligence Engine • Confidential',
    '  </div>',
    '</div></body></html>'
  ].join('\n');
}

// =========================================================================================
// 9. HELPER RESOLVERS & PARSERS
// =========================================================================================

function resolveField(header, data) {
  var explicitMap = {
    "Submission ID":          data.submissionId  || data.id || "",
    "Name":                   data.name          || data.Name || data["Full Name"] || data.fullName || "",
    "Full Name":              data.name          || data.Name || data["Full Name"] || data.fullName || "",
    "Email":                  data.email         || data.Email || data.workEmail || "",
    "Work Email":             data.email         || data.Email || data.workEmail || "",
    "Phone":                  data.phone         || data.Phone || data["Phone Number"] || "",
    "Phone Number":           data.phone         || data.Phone || data["Phone Number"] || "",
    "Company":                data.company       || data.Company || data.companyName || "",
    "Company Name":           data.company       || data.Company || data.companyName || "",
    "Designation":            data.designation   || data.role || data.jobTitle || "",
    "Role":                   data.role          || data.designation || data.jobTitle || "",
    "Company Size":           data.companySize   || "",
    "Industry":               data.industry      || "",
    "AI Maturity Level":      data.aiMaturity    || "",
    "Primary Objectives":     data.objective     || data.objectives || "",
    "Selected Solutions":     Array.isArray(data.selectedSolutions) ? data.selectedSolutions.join(', ') : (data.selectedSolutions || ""),
    "Preferred Timeline":     data.preferredTimeline || data.timeline || "",
    "Message":                data.message       || data.notes || "",
    "Subject":                data.subject       || "",
    "Partnership Type":       data.partnershipType || "",
    "Experience":             data.experience    || "",
    "LinkedIn Profile":       data.linkedIn      || "",
    "Portfolio URL":          data.portfolio     || "",
    "Resume File Name":       data.resumeFileName || "",
    "Cover Note":             data.message       || "",
    "Topic Preferences":      data.topicPreferences || "All Enterprise Research Papers",
    "Status":                 "New Lead",
    "Session ID":             data.sessionId     || data["Session ID"] || "",
    "Visitor ID":             data.visitorId     || data["Visitor ID"] || "",
    "Page Path":              data.pagePath      || data["Page Path"] || data.path || "/",
    "Page Title":             data.pageTitle     || data["Page Title"] || "",
    "Traffic Source":         data.trafficSource || data["Traffic Source"] || data.source || "Direct",
    "Landing Page":           data.landingPage   || data["Landing Page"] || "",
    "Referrer":               data.referrer      || data["Referrer"] || "",
    "Device":                 data.device        || data["Device"] || "",
    "Browser":                data.browser       || data["Browser"] || "",
    "Operating System":       data.operatingSystem || data.os || "",
    "Screen Size":            data.screenSize    || data.screenResolution || "",
    "UTM Source":             data.utmSource     || data.utm_source || "",
    "UTM Medium":             data.utmMedium     || data.utm_medium || "",
    "UTM Campaign":           data.utmCampaign   || data.utm_campaign || "",
    "UTM Term":               data.utmTerm       || data.utm_term || "",
    "UTM Content":            data.utmContent    || data.utm_content || "",
    "IP Location":            data.location      || data.ipLocation || data["IP Location"] || "",
    "IP Address":             data.ipAddress     || data["IP Address"] || "",
    "Timestamp":              normalizeTimestamp(data.timestamp || data.Timestamp)
  };

  if (explicitMap.hasOwnProperty(header)) {
    var val = explicitMap[header];
    return (val !== null && typeof val === 'object') ? JSON.stringify(val) : (val === undefined ? "" : val);
  }

  var slug = header.replace(/\(.*?\)/g, '').trim().split(' ').map(function(w, i){ return i===0 ? w.toLowerCase() : w.charAt(0).toUpperCase()+w.slice(1); }).join('');
  var value = data[slug] !== undefined ? data[slug] : data[header];
  return (value !== null && typeof value === 'object') ? JSON.stringify(value) : (value === undefined ? "" : value);
}

function normalizeTimestamp(ts) {
  if (!ts) return new Date().toISOString();
  if (typeof ts === 'string' && ts.includes('IST')) return ts;
  var ms = Date.now();
  if (typeof ts === 'number' || (typeof ts === 'string' && /^\d{10,13}$/.test(ts))) {
    ms = Number(ts);
    if (ms < 1e12) ms = ms * 1000;
  } else if (ts instanceof Date) {
    ms = ts.getTime();
  }
  var istOffset = 5.5 * 60 * 60 * 1000;
  var ist = new Date(ms + istOffset);
  var yyyy = ist.getUTCFullYear();
  var mm   = String(ist.getUTCMonth() + 1).padStart(2, '0');
  var dd   = String(ist.getUTCDate()).padStart(2, '0');
  var hh   = String(ist.getUTCHours()).padStart(2, '0');
  var min  = String(ist.getUTCMinutes()).padStart(2, '0');
  var ss   = String(ist.getUTCSeconds()).padStart(2, '0');
  return yyyy + '-' + mm + '-' + dd + ' ' + hh + ':' + min + ':' + ss + ' IST';
}

function calculateChange(current, previous) {
  if (previous === 0) return current > 0 ? "+100%" : "0%";
  var change = ((current - previous) / previous) * 100;
  return (change >= 0 ? "+" : "") + change.toFixed(1) + "%";
}

function parseSheetDate(val) {
  if (!val) return null;
  if (val instanceof Date) return val;
  var str = String(val);
  if (str.match(/^\d{4}-\d{2}-\d{2}/)) return new Date(str.substring(0, 10));
  return new Date(str);
}

// =========================================================================================
// 10. AUTOMATED SCHEDULED TRIGGERS SETUP
// =========================================================================================

function setupAllTrustGridTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(t) { ScriptApp.deleteTrigger(t); });

  ScriptApp.newTrigger("dailyReport").timeBased().everyDays(1).atHour(8).create();
  ScriptApp.newTrigger("weeklyReport").timeBased().onWeekDay(ScriptApp.WeekDay.FRIDAY).atHour(8).create();
  ScriptApp.newTrigger("forwardMonthlyCareerApplications").timeBased().onMonthDay(1).atHour(9).create();

  console.log("✅ All TrustGrid automation triggers registered successfully!");
}

// =========================================================================================
// 11. ONE-CLICK DATABASE TABLES INITIALIZER
// =========================================================================================

function initializeAllDatabaseTables() {
  var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  console.log("🛠️ Initializing database tables in Sheet 1: " + ss.getUrl());

  for (var tableName in TAB_CONFIGS) {
    var existing = findSheetFlexible(ss, tableName);
    if (!existing) {
      existing = ss.insertSheet(tableName);
      var headers = TAB_CONFIGS[tableName];
      existing.getRange(1, 1, 1, headers.length)
              .setValues([headers])
              .setFontWeight("bold")
              .setBackground("#0f172a")
              .setFontColor("#ffffff");
      existing.setFrozenRows(1);
      console.log("  ✅ Created table: " + tableName);
    } else {
      console.log("  ℹ️ Table already exists: " + existing.getName());
    }
  }

  console.log("🎉 All TrustGrid database tables initialized successfully!");
}

// =========================================================================================
// 12. ONE-CLICK EMAIL PREVIEW SUITE (TESTS ALL SAMPLES SENT TO POOJA)
// =========================================================================================

function sendAllSamplePreviewEmailsToPooja() {
  var targetEmail = "poojasri.aram@gmail.com";
  var mockSheetUrl = "https://docs.google.com/spreadsheets/d/" + CONFIG.MAIN_SPREADSHEET_ID + "/edit";
  console.log("📨 Generating all TrustGrid sample preview emails to: " + targetEmail);

  var samplePdf = Utilities.newBlob("Sample Candidate Resume Content - TrustGrid AI Engineering", "application/pdf", "Candidate_Resume_Sample.pdf");

  // 1. AI Diagnostic Sample
  var diagData = {
    name: "Vikram Malhotra",
    company: "FinScale Technologies",
    email: "vikram@finscale.io",
    phone: "+91 98200 11223",
    aiMaturity: "Piloting RAG & LLMs",
    selectedSolutions: "Agentic Workflows, Enterprise RAG, Private LLM Hosting",
    preferredTimeline: "Immediate (Next 30 Days)",
    location: "Bengaluru, Karnataka",
    timestamp: new Date().toISOString()
  };
  var diagMeta = getLeadCategoryMeta("ai_diagnostics", diagData);
  MailApp.sendEmail({
    to: targetEmail,
    subject: "🧠 [SAMPLE PREVIEW] " + diagMeta.internalSubject,
    htmlBody: buildInternalLeadHtml(diagMeta, diagData, mockSheetUrl),
    name: "TrustGrid Engine • " + diagMeta.categoryName
  });

  // 2. Inbound Contact Sample
  var contactData = {
    name: "Dr. Arvind Swaminathan",
    company: "Apex Global Logistics",
    email: "arvind.s@apexlogistics.com",
    subject: "Enterprise RAG & Guardrails Deployment",
    message: "Seeking private inference infrastructure audit and throughput optimization.",
    location: "Hyderabad, Telangana",
    timestamp: new Date().toISOString()
  };
  var contactMeta = getLeadCategoryMeta("contact_submissions", contactData);
  MailApp.sendEmail({
    to: targetEmail,
    subject: "💬 [SAMPLE PREVIEW] " + contactMeta.internalSubject,
    htmlBody: buildInternalLeadHtml(contactMeta, contactData, mockSheetUrl),
    name: "TrustGrid Engine • " + contactMeta.categoryName
  });

  // 3. Career Application Sample
  var careerData = {
    name: "Suresh Reddy",
    email: "suresh.reddy.ai@gmail.com",
    phone: "+91 94401 23456",
    role: "Lead Agentic AI Systems Architect",
    experience: "8+ years in distributed ML, LangGraph & vLLM inference orchestration",
    resumeFileName: "Suresh_Reddy_Resume.pdf",
    location: "Hyderabad, India",
    timestamp: new Date().toISOString()
  };
  var careerMeta = getLeadCategoryMeta("career_applications", careerData);
  MailApp.sendEmail({
    to: targetEmail,
    subject: "📄 [SAMPLE PREVIEW] " + careerMeta.internalSubject,
    htmlBody: buildInternalLeadHtml(careerMeta, careerData, mockSheetUrl),
    name: "TrustGrid Engine • " + careerMeta.categoryName,
    attachments: [samplePdf]
  });

  // 4. Partner Application Sample
  var partnerData = {
    name: "Marcus Vance",
    company: "Silicon GPU Systems",
    email: "m.vance@partnercorp.com",
    partnershipType: "Compute & Cloud Infrastructure Partner",
    message: "Bare-metal H100 cluster integration for sovereign AI workloads.",
    location: "San Francisco, USA",
    timestamp: new Date().toISOString()
  };
  var partnerMeta = getLeadCategoryMeta("partner_applications", partnerData);
  MailApp.sendEmail({
    to: targetEmail,
    subject: "🤝 [SAMPLE PREVIEW] " + partnerMeta.internalSubject,
    htmlBody: buildInternalLeadHtml(partnerMeta, partnerData, mockSheetUrl),
    name: "TrustGrid Engine • " + partnerMeta.categoryName
  });

  // 5. User Auto-Confirmation Sample
  MailApp.sendEmail({
    to: targetEmail,
    subject: "✅ [SAMPLE PREVIEW] AI Diagnostic Session Confirmed – TrustGrid.AI",
    htmlBody: buildUserConfirmationHtml("Pooja Sri", "Enterprise AI Diagnostic", "Thank you for expressing interest in TrustGrid AI solutions. Our Principal Architect has received your request and will connect with you shortly."),
    name: EMAIL_CONFIG.name,
    replyTo: EMAIL_CONFIG.replyTo
  });

  console.log("🎉 Sample emails successfully delivered to " + targetEmail);
}
