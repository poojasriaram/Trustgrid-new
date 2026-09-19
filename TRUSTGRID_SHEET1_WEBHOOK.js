/**
 * =========================================================================================
 * PROFIT MACHINES - APPS SCRIPT WEBHOOK & EXECUTIVE AUTOMATION ENGINE (V7 - ULTRA PRO)
 * =========================================================================================
 * Production Webhook Receiver & Executive Automation Engine for PROFIT MACHINES
 * 
 * Sender Identity: Profit Machines Executive Analytics <poojasri.aram@gmail.com>
 * Organization: PROFIT MACHINES
 * 
 * Features:
 * 1. Dedicated Ad Campaign & Inbound Routing: Isolates and routes Ad/Campaign leads seamlessly.
 * 2. High-End Executive Cyber-Theme Email UI: Profit Machines glassmorphism badges, UTM pills & quick actions.
 * 3. Drive Resume Archiving: Automatically stores career applicant resumes into Google Drive.
 * 4. Monthly Career Digest: Monthly scheduled forwarder of candidate applications & resumes.
 * 5. Advanced Analytics & Reporting: Daily & weekly automated digests with KPI cards and metrics.
 * 6. Strict Recipient Routing: Exclusively delivers to poojasri.aram@gmail.com & bv@trustflow.in.
 * =========================================================================================
 */

// =========================================================================================
// 1. GLOBAL CONFIGURATION & RECIPIENTS
// =========================================================================================

const CONFIG = {
  // Main Profit Machines Data Collection & Multi-Form Tracking Spreadsheet ID (Sheet 1)
  MAIN_SPREADSHEET_ID: "1fdZl2it4O86OUB92DvBaeeEM75fXue1yqjcvLq51gVs",

  // Dedicated Analytics & Intelligence Spreadsheet ID (Sheet 2)
  ANALYTICS_SPREADSHEET_ID: "1NSnGji4KqVuWaM1jGEjX87mkjFsoVN9u5SG6TJ0qZoU",

  // Google Drive folder used to archive candidate resumes
  CAREER_RESUMES_FOLDER_NAME: "ProfitMachines_Career_Resumes"
};

const EMAIL_CONFIG = {
  name: "PROFIT MACHINES Business Intelligence",
  companyName: "PROFIT MACHINES",
  website: "", // Set production website URL once deployed
  replyTo: "poojasri.aram@gmail.com",
  adminEmail: "poojasri.aram@gmail.com",
  
  // Recipients for Lead & Sales Inquiries (Strictly limited to authorized team)
  salesEmails: [
    "poojasri.aram@gmail.com",
    "bv@trustflow.in"
  ],
  
  // Recipients for Ad Campaign Lead Generation
  adCampaignEmails: [
    "poojasri.aram@gmail.com",
    "bv@trustflow.in"
  ],

  // Recipients for Career Applications & Monthly Resumes
  careerEmails: [
    "poojasri.aram@gmail.com",
    "bv@trustflow.in"
  ],

  // Recipients for Daily, Weekly & Monthly Analytics Reports
  reportEmails: [
    "poojasri.aram@gmail.com",
    "bv@trustflow.in"
  ],

  // Same WhatsApp line used on the live site (components/ui/whatsapp-cta.tsx)
  whatsappNumber: "9513088611",

  // Self-serve booking slot offered to Consulting Sessions leads
  consultingCalendarUrl: "https://calendar.app.google/ZZF7cW8GVX8r6Bwf6"
};

// =========================================================================================
// 2. SHEET TAB HEADERS & CONFIGURATION
// =========================================================================================

var masterMetrics = [
  "Session ID","Visitor ID","Organization","IP Address","IP Location","Variant",
  "Viewport","OS","Screen Resolution","Connection Type","Language","Dark Theme",
  "Time Zone","Page Depth","Active Tab","Session Age","Initial Source","Landing Page",
  "UTM Source","UTM Medium","UTM Campaign","UTM Term","UTM Content","Referrer Host","Search Engine","First Visit Date",
  "Returning User","Cursor Velocity","Rage Clicks","Scroll Velocity","Max Scroll Depth",
  "Total Click Count","Average Dwell Time","Total Active Time","Idle Time","Tab Switches",
  "Exit Intent Triggered","Interaction Frequency","Last Active Timestamp","Lead Generated",
  "Form Started","Form Abandoned","Form Last Field","Whitepaper Downloaded",
  "Diagnostic Requested","Partner Inquiry Count","Career Inquiry Count",
  "Chatbot Interactions","CTA Conversion Rate",
  "Interest Agent Governance","Interest Red Teaming","Interest Compliance Audits",
  "Interest AI Readiness","Interest Custom Guardrails","Interest Model Security",
  "Weighted Rank","Engagement Score","Segment","Hot Lead Flag","Intent Rank","Dwell Time","Interactions","Timestamp"
];

var SCHEMA_95_HEADERS = [
  "ip_address", "geo_country", "geo_state", "geo_city", "geo_latitude", "geo_longitude",
  "user_id", "user_name", "user_email", "user_type", "returning_user",
  "first_visit_timestamp", "last_visit_timestamp", "total_sessions", "total_time_spent", "avg_session_duration",
  "session_id", "session_number", "session_start_time", "session_end_time", "total_session_duration", "total_pages_visited", "bounce",
  "traffic_source", "referrer_url", "campaign_name", "utm_source", "utm_medium", "utm_campaign", "utm_term", "utm_content",
  "page", "page_url", "previous_page", "next_page", "entry_page", "exit_page", "page_title", "time_on_page", "scroll_percentage", "max_scroll_depth", "interaction_count", "inactivity_time",
  "event_id", "event_name", "event_category", "event_action", "event_label", "section", "element_type", "element_id", "element_class", "element_text", "click_position_x", "click_position_y",
  "form_id", "form_field_name", "form_completion_status", "form_abandonment", "goal_name", "goal_completed", "conversion_id", "conversion_value", "funnel_step",
  "device_type", "device_brand", "device_model", "operating_system", "browser", "browser_version", "screen_width", "screen_height", "viewport_width", "viewport_height", "language", "timezone",
  "network_type", "connection_speed", "page_load_time", "dom_load_time", "first_contentful_paint", "largest_contentful_paint", "time_to_interactive",
  "js_error_message", "api_error_message", "http_status_code", "cpu_cores", "memory_size", "tab_visibility_status", "back_button_used", "copy_event", "paste_event", "rage_click_detected", "user_segment", "timestamp"
];

var TAB_CONFIGS = {
  // Master 95-Column Live Behavioral Telemetry for Profit Machines
  "Live_Traffic_Events": SCHEMA_95_HEADERS,

  // 1. Inbound Leads / Quick Diagnostics (LeadCaptureSection.tsx)
  "Form_Inbound_Leads": [
    "Submission ID", "Full Name", "Work Email", "Phone", "Company Name",
    "Interest / Solution", "Annual Revenue", "Timeline", "Primary Challenge",
    "Source", "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 2. Executive Consultation Bookings (BookConsultation.tsx & BookDemo.tsx)
  "Form_Consultation_Bookings": [
    "Submission ID", "Full Name", "Work Email", "Phone", "Company Name",
    "Designation / Role", "Transformation Interest", "Annual Revenue", "Primary Challenge", "Target Timeline",
    "Message / Scope", "Source", "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 3. Talk to Growth / AI Expert (TalkToExpert.tsx)
  "Form_Expert_Consulting": [
    "Submission ID", "Full Name", "Work Email", "Phone", "Company Name",
    "Focus Area", "Urgency / Timeline", "Message",
    "Source", "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 4. Profit Pool Discovery Diagnostics (DiscoveryPage.tsx)
  "Form_Diagnostic_Assessments": [
    "Submission ID", "Full Name", "Work Email", "Phone", "Company Name",
    "Industry", "Current Revenue", "Primary Leakage Area", "Estimated Leakage",
    "Diagnostic Score", "Answers Summary", "Message",
    "Source", "UTM Source", "UTM Medium", "UTM Campaign",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 5. Partner Applications (Partners.tsx)
  "Form_Partner_Applications": [
    "Submission ID", "Name", "Work Email", "Phone", "Company Name",
    "Partner Type", "Primary Region", "Value Proposition / Proposal",
    "Source", "UTM Source", "UTM Medium", "UTM Campaign",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 6. Career Applications (Career.tsx)
  "Form_Career_Applications": [
    "Submission ID", "Full Name", "Email", "Phone", "Role Applied",
    "Experience Level", "Portfolio / LinkedIn", "Resume Drive Link", "Drive File ID",
    "Cover Note / Message", "Source", "UTM Source", "UTM Medium", "UTM Campaign",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 7. Chatbot Virtual Assistant Inquiries (ChatBot.tsx)
  "Form_Chatbot_Conversations": [
    "Submission ID", "Name", "Email", "Phone", "Company",
    "Topic / Intent", "Chat Summary", "Source",
    "UTM Source", "UTM Medium", "UTM Campaign",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 8. Consolidated Form Submissions Master Log
  "Form_Submissions": [
    "Submission ID", "Form Name", "Name", "Email", "Company", "Role", "Phone",
    "Message / Details", "Resume Link", "Drive File ID",
    "UTM Source", "UTM Campaign", "IP Location", "IP Address", "Timestamp"
  ],

  // 9. Page Views Telemetry
  "Page_Views": [
    "Session ID", "Visitor ID", "Page Path", "Page Title", "Referrer", "Traffic Source",
    "UTM Source", "UTM Medium", "UTM Campaign", "Device", "Browser", "OS", "IP Location", "Timestamp"
  ],

  // 10. Sessions Telemetry
  "Sessions": [
    "Session ID", "Visitor ID", "Landing Page", "Referrer", "Traffic Source",
    "UTM Source", "UTM Campaign", "Device", "Browser", "OS", "Screen Size", "IP Location", "Timestamp"
  ],

  // 11. CTA & Interaction Clicks
  "CTA_Clicks": [
    "Session ID", "Visitor ID", "CTA Name", "Destination URL", "Section", "Page Path", "Device", "Timestamp"
  ]
};

// Aliases mapping incoming form sheetNames to canonical tab names
var SHEET_NAME_ALIASES = {
  // Master 95-Column Live Behavioral Telemetry
  "telemetry_95": "Live_Traffic_Events",
  "telemetry": "Live_Traffic_Events",
  "livetrafficevents": "Live_Traffic_Events",
  "live_traffic_events": "Live_Traffic_Events",
  "livecontent": "Live_Traffic_Events",
  "live_content": "Live_Traffic_Events",
  "mastertelemetry": "Live_Traffic_Events",
  "master_telemetry": "Live_Traffic_Events",

  // 1. Inbound Leads / Quick Diagnostics
  "inboundleads": "Form_Inbound_Leads",
  "inbound_leads": "Form_Inbound_Leads",
  "inbound": "Form_Inbound_Leads",
  "leads": "Form_Inbound_Leads",
  "quickdiagnostic": "Form_Inbound_Leads",
  "quick_diagnostic": "Form_Inbound_Leads",
  "contact": "Form_Inbound_Leads",
  "contactleads": "Form_Inbound_Leads",
  "contact_leads": "Form_Inbound_Leads",

  // 2. Consultation & Transformation Strategy Bookings
  "bookforconsultation": "Form_Consultation_Bookings",
  "book_for_consultation": "Form_Consultation_Bookings",
  "bookforconsulting": "Form_Consultation_Bookings",
  "book_for_consulting": "Form_Consultation_Bookings",
  "consultation": "Form_Consultation_Bookings",
  "consultationbookings": "Form_Consultation_Bookings",
  "consultation_bookings": "Form_Consultation_Bookings",
  "demo": "Form_Consultation_Bookings",
  "bookdemo": "Form_Consultation_Bookings",
  "book_demo": "Form_Consultation_Bookings",

  // 3. Talk to Growth Expert
  "talktoexpert": "Form_Expert_Consulting",
  "talk_to_expert": "Form_Expert_Consulting",
  "expert": "Form_Expert_Consulting",
  "expertconsulting": "Form_Expert_Consulting",
  "expert_consulting": "Form_Expert_Consulting",

  // 4. Profit Pool Discovery Diagnostic
  "diagnosticforms": "Form_Diagnostic_Assessments",
  "diagnostic_forms": "Form_Diagnostic_Assessments",
  "diagnostic": "Form_Diagnostic_Assessments",
  "diagnostics": "Form_Diagnostic_Assessments",
  "profitpooldiscovery": "Form_Diagnostic_Assessments",
  "profit_pool_discovery": "Form_Diagnostic_Assessments",
  "assessment": "Form_Diagnostic_Assessments",

  // 5. Partner Applications
  "partners": "Form_Partner_Applications",
  "partner": "Form_Partner_Applications",
  "partnerapplications": "Form_Partner_Applications",
  "partner_applications": "Form_Partner_Applications",

  // 6. Career Applications
  "jobapplications": "Form_Career_Applications",
  "job_applications": "Form_Career_Applications",
  "careerapplications": "Form_Career_Applications",
  "career_applications": "Form_Career_Applications",
  "careers": "Form_Career_Applications",
  "career": "Form_Career_Applications",
  "jobs": "Form_Career_Applications",

  // 7. Chatbot Inquiries
  "chatbot": "Form_Chatbot_Conversations",
  "chatbotleads": "Form_Chatbot_Conversations",
  "chatbot_leads": "Form_Chatbot_Conversations",
  "chatbot_conversations": "Form_Chatbot_Conversations",

  // 8. Consolidated Master Form Submissions
  "formsubmissions": "Form_Submissions",
  "form_submissions": "Form_Submissions",
  "submissions": "Form_Submissions",

  // Telemetry
  "trafficanalytics": "Traffic_Analytics",
  "traffic_analytics": "Traffic_Analytics",
  "pageviews": "Page_Views",
  "page_views": "Page_Views",
  "sessions": "Sessions",
  "ctaclicks": "CTA_Clicks",
  "cta_clicks": "CTA_Clicks"
};

/**
 * Intelligently finds a tab in the spreadsheet matching exact name, alias, or case-insensitive name.
 */
function findSheetFlexible(spreadsheet, requestedName) {
  if (!spreadsheet || !requestedName) return null;

  // 1. Direct exact match
  var sheet = spreadsheet.getSheetByName(requestedName);
  if (sheet) return sheet;

  // 2. Normalized alias match
  var norm = requestedName.toLowerCase().replace(/[\s\-_]/g, '');
  var canonical = SHEET_NAME_ALIASES[norm] || requestedName;
  sheet = spreadsheet.getSheetByName(canonical);
  if (sheet) return sheet;

  // 3. Normalized alias matching with space replacement
  var spacedCanonical = canonical.replace(/_/g, ' ');
  sheet = spreadsheet.getSheetByName(spacedCanonical);
  if (sheet) return sheet;

  // 4. Scan all tabs in spreadsheet and compare normalized names
  var allSheets = spreadsheet.getSheets();
  for (var i = 0; i < allSheets.length; i++) {
    var curName = allSheets[i].getName();
    var curNorm = curName.toLowerCase().replace(/[\s\-_]/g, '');
    if (curNorm === norm || curNorm === (canonical || '').toLowerCase().replace(/[\s\-_]/g, '')) {
      return allSheets[i];
    }
  }

  return null;
}

// =========================================================================================
// 3. MAIN WEBHOOK ENDPOINT (doPost)
// =========================================================================================

function doPost(e) {
  // Manual mode testing fallback
  if (!e || !e.postData || !e.postData.contents) {
    console.warn("Running in Manual Mode: Initializing Mock Payload for Testing...");
    e = {
      postData: {
        contents: JSON.stringify({
          sheetName: "Traffic_Analytics",
          sessionId: "MOCK_TG_" + Date.now(),
          visitorId: "MOCK_VISITOR_" + Date.now(),
          pagePath: "/manual-test",
          ipAddress: "1.1.1.1",
          location: "Bengaluru, India",
          timestamp: new Date().toISOString()
        })
      }
    };
  }

  try {
    var data;
    try {
      data = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return ContentService.createTextOutput("Error: Invalid JSON payload.").setMimeType(ContentService.MimeType.TEXT);
    }
    
    // lib/analytics.ts telemetry beacons (page views, clicks, CTA, visibility) only set
    // event_type: 'telemetry_95' — without this fallback every beacon was silently rejected
    // here and NEVER reached Live_Traffic_Events, starving Sessions/Visitors of real data.
    var rawSheetName = data.sheetName || data.formType || data.type || data.event_type || "";
    if (!rawSheetName) {
      return ContentService.createTextOutput("Error: Missing sheetName or formType parameter").setMimeType(ContentService.MimeType.TEXT);
    }

    var norm = rawSheetName.toLowerCase().replace(/[\s\-_]/g, '');
    var canonicalName = SHEET_NAME_ALIASES[norm] || rawSheetName;

    // Candidate profile-video link submission updates an existing Career_Applications row
    // instead of writing to a sheet of its own — handled and returned before the generic flow.
    if (canonicalName === "Career_Video_Submission") {
      var videoResult = handleCareerVideoSubmission(data);
      return ContentService.createTextOutput(videoResult.message).setMimeType(ContentService.MimeType.TEXT);
    }

    var isAdLead = (canonicalName === "Google_Ad_Leads" || norm.indexOf("adcampaign") !== -1 || norm.indexOf("googlead") !== -1);
    var isCareerApp = (canonicalName === "Career_Applications" || norm.indexOf("career") !== -1 || norm.indexOf("job") !== -1);

    var LEAD_FORMS = [
      "Contact_Leads", "AI_Diagnostic_Leads", "AI_Readiness_Leads", "Workshop_Requests",
      "RFP_Proposals", "Talk_To_Architect", "Chatbot_Leads", "Career_Applications",
      "Partner_Applications", "Google_Ad_Leads", "Newsletter_Subscribers", "Quick_Enquiry_Leads"
    ];

    var isLeadForm = (LEAD_FORMS.indexOf(canonicalName) !== -1) || isCareerApp || isAdLead;

    // =====================================================================================
    // STEP 1: DISPATCH EMAILS & RESUME ATTACHMENTS IMMEDIATELY (ZERO-DELAY EMAIL PRIORITY)
    // =====================================================================================
    var emailSent = false;
    var emailResult = { sent: false, delivered: 0, failed: 0, driveLink: "", driveFileId: "", message: "" };

    if (isLeadForm) {
      try {
        var defaultSheetUrl = "https://docs.google.com/spreadsheets/d/" + CONFIG.MAIN_SPREADSHEET_ID;
        emailResult = sendLeadEmails(data, canonicalName, defaultSheetUrl) || emailResult;
        emailSent = !!emailResult.sent;
        if (emailSent) {
          console.log("⚡ [Email Priority] Email successfully dispatched for: " + canonicalName + " (" + emailResult.delivered + " delivered)");
        } else {
          console.warn("⚠️ [Email Priority] Email not delivered for: " + canonicalName + " — " + (emailResult.message || "unknown reason") + ".");
        }
      } catch (emailErr) {
        console.error("❌ Failed to dispatch email in Step 1:", emailErr.toString());
      }
    }

    // =====================================================================================
    // STEP 2: LOG DATA TO GOOGLE SHEETS
    // =====================================================================================
    var rowSaved = false;

    try {
      var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
      var targetSheet = findSheetFlexible(ss, canonicalName) || findSheetFlexible(ss, rawSheetName);

      // Auto-create tab if not present
      if (!targetSheet) {
        var createName = canonicalName.replace(/_/g, ' ');
        targetSheet = ss.insertSheet(createName);
        var defaultHeaders = TAB_CONFIGS[canonicalName] || TAB_CONFIGS[rawSheetName] || Object.keys(data).filter(function(k) { return k !== 'sheetName'; });
        targetSheet.getRange(1, 1, 1, defaultHeaders.length)
                   .setValues([defaultHeaders])
                   .setFontWeight("bold")
                   .setBackground("#0f172a")
                   .setFontColor("#ffffff");
        targetSheet.setFrozenRows(1);
      } else if (targetSheet.getLastRow() === 0) {
        var defaultHeaders = TAB_CONFIGS[canonicalName] || TAB_CONFIGS[rawSheetName] || Object.keys(data).filter(function(k) { return k !== 'sheetName'; });
        targetSheet.getRange(1, 1, 1, defaultHeaders.length)
                   .setValues([defaultHeaders])
                   .setFontWeight("bold")
                   .setBackground("#0f172a")
                   .setFontColor("#ffffff");
        targetSheet.setFrozenRows(1);
      }

      var lastCol = Math.max(targetSheet.getLastColumn(), 1);
      var headers = targetSheet.getRange(1, 1, 1, lastCol).getValues()[0];

      var hasResumeBlob = !!(data.resumeBlob || data.resume || data.resumeBase64 || data.fileBlob || data.attachmentBlob);
      var newRow = headers.map(function(header) {
        if (header === "Resume Blob" || header === "resumeBlob") {
          return data.resumeDriveLink ? "Archived in Drive" : (hasResumeBlob ? (emailSent ? "Attached to Email" : "Decode/Archive Failed") : "None");
        }
        if (header === "Resume Drive Link" || header === "resumeDriveLink" || header === "Resume Link") {
          return data.resumeDriveLink || emailResult.driveLink || (hasResumeBlob && emailSent ? "Attached to Email" : (hasResumeBlob ? "Unavailable" : "None"));
        }
        if (header === "Drive File ID" || header === "driveFileId") {
          return data.driveFileId || emailResult.driveFileId || "";
        }
        return resolveField(header, data);
      });

      // Also log to Master Form Submissions if it's a lead form
      if (isLeadForm && canonicalName !== "Form_Submissions") {
        try {
          var masterSheet = findSheetFlexible(ss, "Form_Submissions") || findSheetFlexible(ss, "Form Submissions");
          if (masterSheet && masterSheet.getLastRow() > 0) {
            var mHeaders = masterSheet.getRange(1, 1, 1, Math.max(masterSheet.getLastColumn(), 1)).getValues()[0];
            var mRow = mHeaders.map(function(h) {
              if (h === "Form Name") return canonicalName.replace(/_/g, ' ');
              if (h === "Resume Drive Link") return data.resumeDriveLink || emailResult.driveLink || "";
              if (h === "Drive File ID") return data.driveFileId || emailResult.driveFileId || "";
              return resolveField(h, data);
            });
            masterSheet.appendRow(mRow);
          }
        } catch (mErr) {
          console.warn("Could not log to master Form Submissions tab:", mErr.toString());
        }
      }

      // Upsert / Dedup logic for Telemetry
      var shouldUpsert = (canonicalName === "User_Behavior_Library" || canonicalName === "Engagement_Metrics");
      var shouldDedup  = (canonicalName === "Traffic_Analytics" || canonicalName === "Page_Views");
      var lastRow = targetSheet.getLastRow();

      if ((shouldUpsert || shouldDedup) && lastRow > 1) {
        var sessionCol = targetSheet.getRange(2, 1, lastRow - 1, 1).getValues().flat();
        if (shouldUpsert) {
          var rowIndex = sessionCol.indexOf(data.sessionId);
          if (rowIndex !== -1) {
            targetSheet.getRange(rowIndex + 2, 1, 1, newRow.length).setValues([newRow]);
            rowSaved = true;
          }
        }
        if (!rowSaved && shouldDedup) {
          var pagePathColIndex = headers.indexOf("Page Path");
          if (pagePathColIndex !== -1 && data.sessionId && data.pagePath) {
            var pageCol = targetSheet.getRange(2, pagePathColIndex + 1, lastRow - 1, 1).getValues().flat();
            for (var i = 0; i < sessionCol.length; i++) {
              if (sessionCol[i] === data.sessionId && pageCol[i] === data.pagePath) {
                targetSheet.getRange(i + 2, 1, 1, newRow.length).setValues([newRow]);
                rowSaved = true;
                break;
              }
            }
          }
        }
      }

      if (!rowSaved) {
        targetSheet.appendRow(newRow);
        rowSaved = true;
      }
    } catch (sheetErr) {
      console.warn("⚠️ Google Sheets service error: " + sheetErr.toString());
    }

    var statusMsg = emailSent
      ? "Email Sent & Processed"
      : (rowSaved ? (emailResult.message ? "Saved (" + emailResult.message + ")" : "Saved") : "OK");
    return ContentService.createTextOutput(statusMsg).setMimeType(ContentService.MimeType.TEXT);
    
  } catch (err) {
    console.error("doPost critical error:", err.toString());
    return ContentService.createTextOutput("Error: " + err.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}

// =========================================================================================
// 4. RESUME ATTACHMENT DECODER + DRIVE ARCHIVE
// =========================================================================================

function escapeHtml(str) {
  return String(str == null ? "" : str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function uniqueEmails(list) {
  var seen = {};
  var out = [];
  (list || []).forEach(function(addr) {
    if (!addr || typeof addr !== "string") return;
    var clean = addr.trim().toLowerCase();
    if (!clean || clean.indexOf("@") === -1 || seen[clean]) return;
    seen[clean] = true;
    out.push(addr.trim());
  });
  return out;
}

function isEmailQuotaError(err) {
  var s = String(err || "").toLowerCase();
  return s.indexOf("too many times for one day") !== -1 ||
         s.indexOf("service invoked too many times") !== -1 ||
         s.indexOf("quota") !== -1 ||
         s.indexOf("limit exceeded") !== -1;
}

function getRemainingEmailQuota() {
  try {
    return MailApp.getRemainingDailyQuota();
  } catch (e) {
    return -1;
  }
}

function extractCleanBase64(raw) {
  if (raw && typeof raw !== "string" && raw.getBytes) {
    return null;
  }
  if (!raw || typeof raw !== "string") return null;
  var str = raw.trim();
  var commaIdx = str.indexOf("base64,");
  if (commaIdx !== -1) {
    str = str.substring(commaIdx + 7);
  } else if (str.indexOf("data:") === 0 && str.indexOf(",") !== -1) {
    str = str.split(",")[1];
  }
  str = str.replace(/[\r\n\s"']/g, "");
  str = str.replace(/-/g, "+").replace(/_/g, "/");
  str = str.replace(/=+$/, "");
  str = str.replace(/=/g, "");
  str = str.replace(/[^A-Za-z0-9+/]/g, "");
  while (str.length % 4 !== 0) {
    str += "=";
  }
  return str.length > 10 ? str : null;
}

function decodeBase64Bytes(cleanBase64) {
  if (!cleanBase64) return null;
  var attempts = [
    function() { return Utilities.base64Decode(cleanBase64); },
    function() { return Utilities.base64DecodeWebSafe(cleanBase64.replace(/\+/g, "-").replace(/\//g, "_")); }
  ];
  for (var i = 0; i < attempts.length; i++) {
    try {
      var bytes = attempts[i]();
      if (bytes && bytes.length > 0) return bytes;
    } catch (e) {
      if (i === attempts.length - 1) throw e;
    }
  }
  return null;
}

function getAttachmentBlobs(data, defaultName) {
  var attachments = [];
  if (!data || typeof data !== "object") return attachments;

  var rawPayload = data.resumeBlob || data.resume || data.resumeBase64 || data.fileBlob ||
                   data.attachmentBlob || data.attachment || data.ResumeBlob || data.Resume ||
                   data["Resume Blob"] || data.resume_blob || "";

  var candidateName = String(data.name || data.Name || data["Full Name"] || data.fullName || defaultName || "Candidate")
    .replace(/[^a-zA-Z0-9_\s]/g, "").trim() || "Candidate";
  var origFileName = data.resumeFileName || data.fileName || data.filename || data["Resume File Name"] ||
                     data.ResumeFileName || data.resumefilename || (candidateName + "_Resume.pdf");
  var cleanFileName = String(origFileName).replace(/[/\\?%*:|"<>]/g, "_").trim();
  if (!cleanFileName) cleanFileName = candidateName + "_Resume.pdf";

  var ext = "";
  var extMatch = cleanFileName.match(/\.([0-9a-zA-Z]+)$/i);
  if (extMatch) ext = extMatch[1].toLowerCase();
  var mimeMap = {
    "pdf": "application/pdf",
    "doc": "application/msword",
    "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    "png": "image/png",
    "jpg": "image/jpeg",
    "jpeg": "image/jpeg",
    "txt": "text/plain"
  };
  var mime = data.resumeMimeType || data.mimeType || data.ResumeMimeType || (ext ? mimeMap[ext] : null) || "application/pdf";

  if (rawPayload && typeof rawPayload !== "string" && rawPayload.getBytes) {
    try {
      attachments.push(Utilities.newBlob(rawPayload.getBytes(), mime, cleanFileName));
      return attachments;
    } catch (blobErr) {
      console.warn("Resume payload was a blob but could not be copied: " + blobErr.toString());
    }
  }

  var cleanBase64 = extractCleanBase64(rawPayload);
  if (!cleanBase64) return attachments;

  try {
    var decodedBytes = decodeBase64Bytes(cleanBase64);
    if (decodedBytes && decodedBytes.length > 0) {
      attachments.push(Utilities.newBlob(decodedBytes, mime, cleanFileName));
      console.log("📎 Resume decoded: " + cleanFileName + " (" + decodedBytes.length + " bytes, " + mime + ")");
    }
  } catch (err) {
    console.error("❌ Failed to decode resume attachment: " + err.toString());
  }
  return attachments;
}

function getOrCreateResumeFolder() {
  var folderName = CONFIG.CAREER_RESUMES_FOLDER_NAME || "ProfitMachines_Career_Resumes";
  var folders = DriveApp.getFoldersByName(folderName);
  if (folders.hasNext()) return folders.next();
  return DriveApp.createFolder(folderName);
}

function archiveResumeToDrive(attachments, data) {
  var result = { driveFileId: "", driveLink: "" };
  if (!attachments || attachments.length === 0) return result;
  try {
    var folder = getOrCreateResumeFolder();
    var file = folder.createFile(attachments[0].copyBlob());
    try {
      file.setSharing(DriveApp.Access.ANYONE_WITH_LINK, DriveApp.Permission.VIEW);
    } catch (shareErr) {
      console.warn("Resume Drive sharing could not be set: " + shareErr.toString());
    }
    result.driveFileId = file.getId();
    result.driveLink = file.getUrl();
    data.driveFileId = result.driveFileId;
    data.resumeDriveLink = result.driveLink;
    console.log("💾 Resume archived to Drive: " + result.driveLink);
  } catch (err) {
    console.error("❌ Drive resume archive failed: " + err.toString());
  }
  return result;
}

function sendEmailOnce(options) {
  try {
    GmailApp.sendEmail(options.to, options.subject, options.body || "", {
      htmlBody: options.htmlBody,
      name: options.name || EMAIL_CONFIG.name,
      replyTo: options.replyTo || EMAIL_CONFIG.replyTo,
      attachments: options.attachments
    });
    return { ok: true, via: "GmailApp" };
  } catch (gmailErr) {
    if (isEmailQuotaError(gmailErr)) {
      return { ok: false, quota: true, error: gmailErr.toString() };
    }
    try {
      MailApp.sendEmail({
        to: options.to,
        subject: options.subject,
        htmlBody: options.htmlBody,
        body: options.body || "",
        name: options.name || EMAIL_CONFIG.name,
        replyTo: options.replyTo || EMAIL_CONFIG.replyTo,
        attachments: options.attachments
      });
      return { ok: true, via: "MailApp" };
    } catch (mailErr) {
      return { ok: false, quota: isEmailQuotaError(mailErr), error: mailErr.toString() };
    }
  }
}

// =========================================================================================
// 5. ENHANCED EMAIL DISPATCHER (PROFIT MACHINES)
// =========================================================================================

/**
 * Dispatches notification emails with resume attachments exclusively to authorized team members.
 */
function sendLeadEmails(data, sheetName, spreadsheetUrl) {
  var result = {
    sent: false,
    delivered: 0,
    failed: 0,
    driveLink: "",
    driveFileId: "",
    quotaRemaining: getRemainingEmailQuota(),
    message: ""
  };

  var userEmail = data.email || data.Email || data["Work Email"] || data.workEmail || data["work_email"] || "";
  var userName  = data.name || data.Name || data["Full Name"] || data.fullName || "Valued Enterprise Prospect";
  var leadMeta = getLeadCategoryMeta(sheetName, data);
  var attachments = getAttachmentBlobs(data, userName);
  var driveMeta = archiveResumeToDrive(attachments, data);
  result.driveLink = driveMeta.driveLink;
  result.driveFileId = driveMeta.driveFileId;

  var subjectUser = leadMeta.userSubject;
  var htmlUser = buildUserConfirmationHtml(userName, leadMeta.categoryName, leadMeta.userMessage, leadMeta.leadPhone);
  var subjectInternal = leadMeta.internalSubject;
  var htmlInternal = buildInternalLeadHtml(leadMeta, data, spreadsheetUrl);

  var isTest = data.testMode === true || data.isInternalTest === true || data.testMode === "true";
  
  // Strict recipient routing: poojasri.aram@gmail.com and bv@trustflow.in
  var targetRecipients = uniqueEmails(isTest
    ? [userEmail || EMAIL_CONFIG.reportEmails[0]]
    : (leadMeta.recipients || EMAIL_CONFIG.salesEmails));

  var quota = getRemainingEmailQuota();
  result.quotaRemaining = quota;

  if (quota === 0) {
    result.message = "email quota exhausted";
    console.error("❌ Daily email quota is 0. Data archived to Sheet and Drive.");
    return result;
  }

  var skipUserConfirm = isTest || !userEmail || userEmail.indexOf("@") === -1;

  // 1. User confirmation
  if (!skipUserConfirm && quota > 1) {
    var userSend = sendEmailOnce({
      to: userEmail,
      subject: subjectUser,
      htmlBody: htmlUser,
      name: EMAIL_CONFIG.name,
      replyTo: EMAIL_CONFIG.replyTo
    });
    if (userSend.ok) {
      result.delivered++;
      console.log("✅ Sent user confirmation via " + userSend.via + " to: " + userEmail);
      // Career applicants get a second email asking for their profile video as the next step
      if (sheetName === "Career_Applications") {
        sendCareerVideoRequestEmail(userEmail, userName);
      }
    } else {
      result.failed++;
      console.error("Failed to send user confirmation: " + userSend.error);
    }
  }

  // 2. Batched internal alert to Poojasri & BV
  if (targetRecipients.length > 0) {
    var recipientBlobs = [];
    if (attachments && attachments.length > 0) {
      recipientBlobs = attachments.map(function(blob) {
        try {
          return Utilities.newBlob(blob.getBytes(), blob.getContentType(), blob.getName());
        } catch (bErr) {
          return blob;
        }
      });
    }

    var driveNote = data.resumeDriveLink
      ? "\nResume Drive copy: " + data.resumeDriveLink
      : (recipientBlobs.length ? "" : "\n(No resume attachment could be decoded.)");
    var plainTextBody = "Name: " + userName + "\n" +
                        "Email: " + (userEmail || "N/A") + "\n" +
                        "Company: " + (data.company || data.organization || "N/A") + "\n" +
                        "Details: " + (data.message || data.requirement || "New Submission") + "\n" +
                        driveNote;

    var mailOptions = {
      to: targetRecipients.join(","),
      subject: (isTest ? "[TEST] " : "") + subjectInternal,
      body: plainTextBody,
      htmlBody: htmlInternal,
      name: EMAIL_CONFIG.name,
      replyTo: (userEmail && userEmail.indexOf("@") !== -1) ? userEmail : EMAIL_CONFIG.replyTo
    };
    if (recipientBlobs.length > 0) {
      mailOptions.attachments = recipientBlobs;
    }

    var teamSend = sendEmailOnce(mailOptions);
    if (teamSend.ok) {
      result.delivered++;
      result.sent = true;
      console.log("✅ Internal alert via " + teamSend.via + " to: " + mailOptions.to);
    } else {
      result.failed++;
      result.message = teamSend.quota ? "email quota exhausted" : (teamSend.error || "internal email failed");
      console.error("❌ Internal alert failed: " + teamSend.error);
    }
  }

  if (!result.sent && result.delivered > 0) result.sent = true;
  return result;
}

/**
 * Returns customized category labels, badges, recipient lists, and subject lines for Profit Machines.
 */
function getLeadCategoryMeta(sheetName, data) {
  var name = data.name || data.Name || data["Full Name"] || data.fullName || "";
  var company = data.company || data.Company || data.companyName || data["Company Name"] || data.organization || "";
  var role = data.jobTitle || data["Job Title"] || data.designation || "";
  var phone = data.phone || data.Phone || data["Phone Number"] || "";

  switch (sheetName) {
    case "AI_Diagnostic_Leads":
      return {
        categoryName: "Consulting Sessions",
        badgeText: "CONSULTING SESSIONS",
        badgeBg: "#6366f1",
        badgeColor: "#ffffff",
        leadName: name || "Enterprise Leader",
        leadCompany: company || "AI Enterprise",
        leadPhone: phone,
        internalSubject: "[TG Consulting Sessions] " + (company ? company + " - " + name : name || "New Enterprise Diagnostic"),
        userSubject: "Profit Machines - Consulting Session Confirmed",
        userMessage: "Thank you for requesting an Executive AI Diagnostic session with Profit Machines. Our Principal AI Architect is reviewing your requirements and will connect with your team shortly.",
        recipients: EMAIL_CONFIG.salesEmails
      };

    case "AI_Readiness_Leads":
      return {
        categoryName: "Consulting Sessions",
        badgeText: "CONSULTING SESSIONS",
        badgeBg: "#0ea5e9",
        badgeColor: "#ffffff",
        leadName: name || "Technology Executive",
        leadCompany: company || "Enterprise",
        leadPhone: phone,
        internalSubject: "[TG Consulting Sessions] " + (company ? company + " (" + name + ")" : name || "New Readiness Audit"),
        userSubject: "Profit Machines - AI Readiness Audit Confirmation",
        userMessage: "We have received your AI Readiness assessment request. Our Solution Architects will analyze your tech stack and provide the governance roadmap.",
        recipients: EMAIL_CONFIG.salesEmails
      };

    case "Workshop_Requests":
      return {
        categoryName: "Consulting Sessions",
        badgeText: "CONSULTING SESSIONS",
        badgeBg: "#8b5cf6",
        badgeColor: "#ffffff",
        leadName: name || "Team Lead",
        leadCompany: company || "Organization",
        leadPhone: phone,
        internalSubject: "[TG Consulting Sessions] " + (company ? company + " - " + name : name || "New Workshop Booking"),
        userSubject: "Profit Machines - AI Governance Workshop Request Received",
        userMessage: "Thank you for scheduling an AI Governance & Agentic Trust workshop. We will customize the curriculum for your engineering and compliance teams.",
        recipients: EMAIL_CONFIG.salesEmails
      };

    case "RFP_Proposals":
      return {
        categoryName: "Consulting Sessions",
        badgeText: "CONSULTING SESSIONS",
        badgeBg: "#dc2626",
        badgeColor: "#ffffff",
        leadName: name || "Procurement Lead",
        leadCompany: company || "Enterprise Client",
        leadPhone: phone,
        internalSubject: "[TG Consulting Sessions] " + (company || name || "New Technical RFP"),
        userSubject: "Profit Machines - RFP Proposal Received",
        userMessage: "Thank you for submitting your RFP to Profit Machines. Our solutions engineering division is reviewing the scope of work and compliance specifications.",
        recipients: EMAIL_CONFIG.salesEmails
      };

    case "Talk_To_Architect":
      return {
        categoryName: "Consulting Sessions",
        badgeText: "CONSULTING SESSIONS",
        badgeBg: "#14b8a6",
        badgeColor: "#ffffff",
        leadName: name || "Engineering Leader",
        leadCompany: company || "Tech Team",
        leadPhone: phone,
        internalSubject: "[TG Consulting Sessions] " + (name ? name + (company ? " (" + company + ")" : "") : "New Consultation"),
        userSubject: "Profit Machines - Consultation Confirmed",
        userMessage: "Your technical consultation request with a Senior AI Architect has been scheduled. We look forward to discussing your agentic architecture and guardrails.",
        recipients: EMAIL_CONFIG.salesEmails
      };

    case "Career_Applications":
      return {
        categoryName: "Career Applications",
        badgeText: "CAREER APPLICATION",
        badgeBg: "#10b981",
        badgeColor: "#ffffff",
        leadName: name || "Candidate Applicant",
        leadCompany: role || "Engineering Role",
        leadPhone: phone,
        internalSubject: "[TG Career Application] " + (name || "Applicant") + " - " + (role || "AI Engineer"),
        userSubject: "Profit Machines - Application Received",
        userMessage: "Thank you for applying to join Profit Machines. Our Talent Acquisition & Research team is reviewing your profile and credentials.",
        recipients: EMAIL_CONFIG.careerEmails
      };

    case "Partner_Applications":
      return {
        categoryName: "Partner Applications",
        badgeText: "PARTNER APPLICATION",
        badgeBg: "#a855f7",
        badgeColor: "#ffffff",
        leadName: name || "Partner Representative",
        leadCompany: company || "Partner Agency",
        leadPhone: phone,
        internalSubject: "[TG Partner Application] " + (company || name || "New Strategic Partner"),
        userSubject: "Profit Machines - Partnership Application Received",
        userMessage: "Thank you for your interest in joining the Profit Machines Partner Ecosystem. Our Strategic Alliances team will reach out to discuss onboarding.",
        recipients: EMAIL_CONFIG.salesEmails
      };

    case "Google_Ad_Leads":
      return {
        categoryName: "Consulting Sessions",
        badgeText: "CONSULTING SESSIONS",
        badgeBg: "#f59e0b",
        badgeColor: "#ffffff",
        leadName: name || "Campaign Lead",
        leadCompany: company || "Business Prospect",
        leadPhone: phone,
        internalSubject: "[TG Consulting Sessions] " + (name ? name + (company ? " (" + company + ")" : "") : "New Campaign Lead"),
        userSubject: "Profit Machines - Consultation Request Received",
        userMessage: "Thank you for expressing interest in Profit Machines. An Enterprise AI Consultant will connect with you promptly.",
        recipients: EMAIL_CONFIG.adCampaignEmails
      };

    case "Chatbot_Leads":
      return {
        categoryName: "Chatbot Inquiries",
        badgeText: "CHATBOT INQUIRY",
        badgeBg: "#0284c7",
        badgeColor: "#ffffff",
        leadName: name || "Chatbot Visitor",
        leadCompany: company || "Interactive Inquirer",
        leadPhone: phone,
        internalSubject: "[TG Chatbot Lead] " + (name || "Visitor") + (company ? " (" + company + ")" : ""),
        userSubject: "Profit Machines - Thank You for Connecting",
        userMessage: "Thank you for chatting with the Profit Machines virtual assistant. An AI Governance Advisor will follow up with your specific query.",
        recipients: EMAIL_CONFIG.salesEmails
      };

    case "Newsletter_Subscribers":
      return {
        categoryName: "Newsletter Subscribers",
        badgeText: "NEWSLETTER SUBSCRIBER",
        badgeBg: "#475569",
        badgeColor: "#ffffff",
        leadName: "Subscriber",
        leadCompany: "Industry Reader",
        leadPhone: "",
        internalSubject: "[TG Newsletter Subscriber] " + (data.email || "New Insights Reader"),
        userSubject: "Profit Machines - Welcome to Executive Insights",
        userMessage: "Thank you for subscribing to Profit Machines Executive Briefings. You will receive our latest research on AI agent safety, EU AI Act compliance, and LLM red teaming.",
        recipients: EMAIL_CONFIG.salesEmails
      };

    case "Quick_Enquiry_Leads":
      return {
        categoryName: "Quick Forms",
        badgeText: "QUICK FORMS",
        badgeBg: "#0ea5e9",
        badgeColor: "#ffffff",
        leadName: name || "Quick Prospect",
        leadCompany: company || "Direct Inquirer",
        leadPhone: phone,
        internalSubject: "[TG Quick Forms] " + (name ? name + (company ? " (" + company + ")" : "") : "New Quick Lead"),
        userSubject: "Profit Machines - Quick Enquiry Received",
        userMessage: "Thank you for reaching out to Profit Machines via our Quick Enquiry form. Our enterprise solutions advisor will follow up with you promptly.",
        recipients: EMAIL_CONFIG.salesEmails
      };

    case "Contact_Leads":
    default:
      return {
        categoryName: "Consulting Sessions",
        badgeText: "CONSULTING SESSIONS",
        badgeBg: "#3b82f6",
        badgeColor: "#ffffff",
        leadName: name || "Website Visitor",
        leadCompany: company || "Direct Inquirer",
        leadPhone: phone,
        internalSubject: "[TG Consulting Sessions] " + (name ? name + (company ? " (" + company + ")" : "") : "New Web Lead"),
        userSubject: "Profit Machines - Inquiry Received",
        userMessage: "Thank you for reaching out to Profit Machines. Our solutions team has received your inquiry and will respond within 24 hours.",
        recipients: EMAIL_CONFIG.salesEmails
      };
  }
}

// =========================================================================================
// 6. MODERN EXECUTIVE HTML EMAIL TEMPLATES (PROFIT MACHINES BRANDING)
// =========================================================================================

/**
 * Builds a modern, high-conversion executive HTML email for internal team alerts.
 */
function buildInternalLeadHtml(meta, data, spreadsheetUrl) {
  var phone = data.phone || data.Phone || data["Phone Number"] || data.phoneNumber || "";
  var email = data.email || data.Email || data["Work Email"] || data.workEmail || "";
  var name  = data.name || data.Name || data["Full Name"] || data.fullName || "Prospective Client / Partner";
  var location = data.location || data.ipLocation || data["IP Location"] || data["City"] || "Global";
  var timestamp = normalizeTimestamp(data.timestamp || data.Timestamp);
  var resumeName = data.resumeFileName || data.fileName || data["Resume File Name"] || "";
  var coverLetter = data.coverLetter || data["Cover Letter"] || "";
  var jobTitle = data.jobTitle || data["Job Title"] || data.designation || meta.leadCompany || "";

  var seenKeys = {};
  var formRows = "";
  var utmRows = "";

  function normalizeKey(k) {
    return k.toLowerCase().replace(/[\s\-_]/g, '');
  }

  var ignoredKeys = [
    "sheetname", "resumeblob", "resumemimetype", "targetemail", "notifyemail", "emailto",
    "drivefileid", "resumedrivelink", "resume", "resumebase64", "fileblob", "attachmentblob", "attachment",
    "testmode", "isinternaltest"
  ];

  for (var rawKey in data) {
    var normKey = normalizeKey(rawKey);
    if (ignoredKeys.indexOf(normKey) !== -1) continue;
    if (seenKeys[normKey]) continue;
    
    var val = data[rawKey];
    if (val === undefined || val === null || val === "" || typeof val === "object") continue;

    seenKeys[normKey] = true;

    var isUtm = normKey.indexOf("utm") !== -1;
    var prettyKey = rawKey.replace(/([A-Z])/g, ' $1').replace(/^./, function(str){ return str.toUpperCase(); }).replace(/_/g, ' ').trim();

    if (normKey === "submissionid") prettyKey = "Submission ID";
    if (normKey === "workemail") prettyKey = "Work Email";
    if (normKey === "companyname") prettyKey = "Company Name";
    if (normKey === "primaryaistack") prettyKey = "Primary AI Stack";
    if (normKey === "governancepriority") prettyKey = "Governance Priority";
    if (normKey === "ipaddress") prettyKey = "IP Address";

    var valStr = escapeHtml(String(val)).replace(/\n/g, "<br>");

    if (isUtm) {
      utmRows += '<div style="margin-bottom:6px;font-size:12px;color:#334155;">' +
                 '<strong style="color:#0f172a;">' + prettyKey + ':</strong> ' +
                 '<span style="background:#e2e8f0;padding:2px 8px;border-radius:4px;font-family:monospace;">' + valStr + '</span></div>';
    } else {
      formRows += '<tr>' +
                  '<td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;font-size:13px;width:35%;vertical-align:top;">' + prettyKey + '</td>' +
                  '<td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:13px;font-weight:500;">' + valStr + '</td>' +
                  '</tr>';
    }
  }

  // Action Buttons
  var actionButtons = '<div style="margin-top:25px;">';
  if (email) {
    actionButtons += '<a href="mailto:' + email + '?subject=Re: ' + encodeURIComponent(meta.categoryName + ' - Profit Machines') + '" style="background:#6366f1;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:bold;font-size:13px;display:inline-block;margin-right:8px;margin-bottom:8px;">Reply to Prospect</a>';
  }
  if (phone) {
    actionButtons += '<a href="tel:' + phone + '" style="background:#0f172a;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:bold;font-size:13px;display:inline-block;margin-right:8px;margin-bottom:8px;">Call ' + phone + '</a>';
  }
  if (spreadsheetUrl) {
    actionButtons += '<a href="' + spreadsheetUrl + '" target="_blank" style="background:#334155;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:bold;font-size:13px;display:inline-block;margin-bottom:8px;margin-right:8px;">Open Google Sheet</a>';
  }
  if (data.resumeDriveLink) {
    actionButtons += '<a href="' + escapeHtml(data.resumeDriveLink) + '" target="_blank" style="background:#059669;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:bold;font-size:13px;display:inline-block;margin-bottom:8px;">View Resume in Drive</a>';
  }
  actionButtons += '</div>';

  var resumeAttachmentNotice = "";
  var driveLink = data.resumeDriveLink || data.driveLink || "";
  if (resumeName || data.resumeBlob || driveLink) {
    var driveBtn = driveLink
      ? '<div style="margin-top:6px;"><a href="' + escapeHtml(driveLink) + '" target="_blank" style="color:#059669;font-weight:700;font-size:12px;">Open resume in Google Drive</a></div>'
      : '<div style="color:#059669;font-size:12px;margin-top:2px;">Download from email attachments.</div>';
    resumeAttachmentNotice =
      '<div style="background:#ecfdf5;border:1px solid #a7f3d0;border-radius:8px;padding:12px 16px;margin-bottom:20px;">' +
      '  <div style="font-weight:700;color:#065f46;font-size:13px;">Candidate Resume Attached</div>' +
      '  <div style="color:#047857;font-size:12px;margin-top:2px;"><strong>Document:</strong> ' + escapeHtml(resumeName || 'Candidate_Resume.pdf') + '</div>' +
      driveBtn +
      '</div>';
  }

  var coverLetterSection = "";
  if (coverLetter) {
    coverLetterSection = 
      '<div style="margin-bottom:20px;padding:16px;background:#f8fafc;border-left:4px solid #6366f1;border-radius:4px;">' +
      '  <h4 style="margin:0 0 6px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#4338ca;font-weight:700;">Candidate Cover Letter</h4>' +
      '  <div style="font-size:13px;color:#334155;line-height:1.6;font-style:italic;">"' + escapeHtml(String(coverLetter)).replace(/\n/g, '<br>') + '"</div>' +
      '</div>';
  }

  var utmSection = utmRows ? (
    '<div style="margin-top:20px;padding:15px;background:#f8fafc;border-radius:10px;border:1px solid #e2e8f0;">' +
    '<h4 style="margin:0 0 10px 0;font-size:12px;text-transform:uppercase;letter-spacing:0.05em;color:#64748b;">Campaign Attribution &amp; Traffic Context</h4>' +
    utmRows +
    '</div>'
  ) : '';

  return [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '</head>',
    '<body style="font-family: \'Segoe UI\', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 25px 15px;">',
    '  <div style="max-width: 640px; margin: 0 auto; background: #ffffff; border-radius: 14px; overflow: hidden; box-shadow: 0 10px 30px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">',
    '    ',
    '    <!-- HEADER -->',
    '    <div style="background: linear-gradient(135deg, #090d16 0%, #1e1b4b 50%, #312e81 100%); padding: 30px 25px; color: #ffffff;">',
    '      <div style="display: inline-block; background: ' + meta.badgeBg + '; color: ' + meta.badgeColor + '; font-size: 11px; font-weight: 800; padding: 4px 12px; border-radius: 20px; letter-spacing: 0.06em; margin-bottom: 12px;">',
    '        ' + meta.badgeText,
    '      </div>',
    '      <h2 style="margin: 0; font-size: 22px; font-weight: 700; color: #ffffff; letter-spacing: -0.02em;">' + meta.categoryName + '</h2>',
    '      <p style="margin: 6px 0 0 0; color: #a5b4fc; font-size: 13px;">Captured live from PROFIT MACHINES Platform</p>',
    '    </div>',
    '',
    '    <!-- SUMMARY CARD -->',
    '    <div style="padding: 25px 25px 10px 25px;">',
    '      <div style="background: #f8fafc; border-left: 4px solid #6366f1; border-radius: 8px; padding: 16px 20px; margin-bottom: 20px;">',
    '        <div style="font-size: 18px; font-weight: 700; color: #0f172a;">' + escapeHtml(name) + '</div>',
    '        <div style="color: #475569; font-size: 14px; margin-top: 4px;">' + (jobTitle ? escapeHtml(jobTitle) + ' &bull; ' : '') + escapeHtml(location) + '</div>',
    '        <div style="color: #64748b; font-size: 12px; margin-top: 6px;">' + timestamp + '</div>',
    '      </div>',
    '',
    '      <!-- RESUME ATTACHMENT BANNER -->',
    '      ' + resumeAttachmentNotice,
    '',
    '      <!-- COVER LETTER (IF PROVIDED) -->',
    '      ' + coverLetterSection,
    '',
    '      <!-- FORM DATA TABLE -->',
    '      <h4 style="margin: 0 0 10px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #4338ca; font-weight: 700;">Submission Parameters</h4>',
    '      <table style="width: 100%; border-collapse: collapse; border: 1px solid #f1f5f9; border-radius: 8px; overflow: hidden;">',
    '        <tbody>' + formRows + '</tbody>',
    '      </table>',
    '',
    '      <!-- UTM CONTEXT -->',
    '      ' + utmSection,
    '',
    '      <!-- ACTION BUTTONS -->',
    '      ' + actionButtons,
    '    </div>',
    '',
    '    <!-- FOOTER -->',
    '    <div style="background: #f8fafc; padding: 20px 25px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center; line-height: 1.5;">',
    '      &copy; ' + new Date().getFullYear() + ' PROFIT MACHINES. All rights reserved.<br>',
    '      Direct Inquiries: <strong>poojasri.aram@gmail.com</strong><br>',
    '      Confidential Notification &bull; Distributed to authorized Profit Machines team members only.',
    '    </div>',
    '  </div>',
    '</body>',
    '</html>'
  ].join('\n');
}

/**
 * Normalizes a phone number to wa.me format, defaulting to India's country code for bare
 * 10-digit mobile numbers (matches components/ui/whatsapp-cta.tsx's number format).
 */
function formatWhatsAppNumber(num) {
  var digits = String(num || "").replace(/[^0-9]/g, "");
  if (digits.length === 10) digits = "91" + digits;
  return digits;
}

/**
 * Builds a branded, professional auto-confirmation email for end-users.
 */
function buildUserConfirmationHtml(name, categoryName, messageStr, phone) {
  var isQuickOrConsulting = (categoryName === "Quick Forms" || categoryName === "Consulting Sessions");
  var contactRecapSection = "";
  if (isQuickOrConsulting) {
    var waNumber = formatWhatsAppNumber(EMAIL_CONFIG.whatsappNumber);
    var waText = encodeURIComponent("Hi Profit Machines team, following up on my request (" + name + ").");
    var waUrl = "https://wa.me/" + waNumber + "?text=" + waText;
    contactRecapSection = [
      '<div style="background: #1f2937; padding: 20px; border-radius: 10px; border: 1px solid #374151; margin: 25px 0;">',
      '  <h3 style="color: #f3f4f6; font-size: 15px; margin: 0 0 12px 0; font-weight: 700;">We\'ve Got Your Details</h3>',
      '  <table style="width:100%;font-size:13px;color:#d1d5db;border-collapse:collapse;">',
      '    <tr><td style="padding:4px 0;color:#9ca3af;width:40%;">Name</td><td style="padding:4px 0;font-weight:700;color:#f3f4f6;">' + escapeHtml(name) + '</td></tr>',
      (phone ? '    <tr><td style="padding:4px 0;color:#9ca3af;">Mobile Number</td><td style="padding:4px 0;font-weight:700;color:#f3f4f6;">' + escapeHtml(phone) + '</td></tr>' : ''),
      '    <tr><td style="padding:4px 0;color:#9ca3af;">Expected Response</td><td style="padding:4px 0;font-weight:700;color:#f3f4f6;">Within 24 hours</td></tr>',
      '  </table>',
      '  <p style="font-size:13px;color:#9ca3af;margin:12px 0 0 0;">Our team will contact you soon &mdash; for a faster reply, message us directly:</p>',
      '  <div style="text-align:center;margin-top:14px;">',
      '    <a href="' + waUrl + '" target="_blank" style="display:inline-block;background:#25D366;color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:8px;font-weight:700;font-size:13px;">Chat on WhatsApp</a>',
      '  </div>',
      (categoryName === "Consulting Sessions" ? (
        '  <div style="text-align:center;margin-top:12px;">' +
        '    <a href="' + EMAIL_CONFIG.consultingCalendarUrl + '" target="_blank" style="display:inline-block;background:#6366f1;color:#ffffff;text-decoration:none;padding:11px 22px;border-radius:8px;font-weight:700;font-size:13px;">Book a Calendar Slot</a>' +
        '  </div>'
      ) : ''),
      '</div>'
    ].join('\n');
  }

  return [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '</head>',
    '<body style="font-family: \'Segoe UI\', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; margin: 0; padding: 25px 15px;">',
    '  <div style="max-width: 600px; margin: 0 auto; background: #111827; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.4); border: 1px solid #1f2937;">',
    '    ',
    '    <!-- HEADER -->',
    '    <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); padding: 35px 25px; text-align: center;">',
    '      <h1 style="color: #ffffff; margin: 0; font-size: 24px; font-weight: 800; letter-spacing: 0.05em;">PROFIT MACHINES</h1>',
    '      <p style="color: #a5b4fc; margin: 8px 0 0 0; font-size: 13px; font-weight: 500;">Enterprise AI Governance & Agentic Trust Platform</p>',
    '    </div>',
    '',
    '    <!-- CONTENT -->',
    '    <div style="padding: 35px 30px; color: #e5e7eb; line-height: 1.6;">',
    '      <h2 style="font-size: 20px; color: #818cf8; font-weight: 700; margin: 0 0 15px 0;">Hello ' + escapeHtml(name) + ',</h2>',
    '      <p style="font-size: 15px; color: #d1d5db; margin: 0 0 20px 0;">' + escapeHtml(messageStr) + '</p>',
    '      ' + contactRecapSection,
    '      ',
    '      <!-- PILLARS -->',
    '      <div style="background: #1f2937; padding: 20px; border-radius: 10px; border: 1px solid #374151; margin: 25px 0;">',
    '        <h3 style="color: #f3f4f6; font-size: 15px; margin: 0 0 12px 0; font-weight: 700;">Why Enterprises Choose PROFIT MACHINES:</h3>',
    '        <ul style="padding-left: 20px; margin: 0; font-size: 13px; color: #9ca3af; line-height: 1.7;">',
    '          <li><strong>Autonomous Agent Governance:</strong> Continuous real-time audit logs, intent verification & circuit breakers.</li>',
    '          <li><strong>Adversarial LLM Red Teaming:</strong> Automated penetration testing against prompt injection & data leakage.</li>',
    '          <li><strong>Regulatory Compliance Engine:</strong> Automated mapping to EU AI Act, ISO 42001, and NIST AI RMF.</li>',
    '          <li><strong>Custom Enterprise Guardrails:</strong> Sub-millisecond policy enforcement with zero latency overhead.</li>',
    '        </ul>',
    '      </div>',
    '',
    '      <div style="text-align: center; margin-top: 30px;">',
    '        <a href="' + (EMAIL_CONFIG.website || '#') + '" style="display: inline-block; padding: 13px 30px; background: #6366f1; color: #ffffff; text-decoration: none; border-radius: 8px; font-weight: 700; font-size: 14px; box-shadow: 0 4px 12px rgba(99,102,241,0.3);">Explore Profit Machines Architecture</a>',
    '      </div>',
    '    </div>',
    '',
    '    <!-- FOOTER -->',
    '    <div style="background: #0d1117; padding: 20px 25px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #1f2937; line-height: 1.5;">',
    '      &copy; ' + new Date().getFullYear() + ' PROFIT MACHINES. All rights reserved.<br>',
    '      Direct Architect & Support: <strong>poojasri.aram@gmail.com</strong>',
    '    </div>',
    '  </div>',
    '</body>',
    '</html>'
  ].join('\n');
}

/**
 * Builds the "next step" email asking a career applicant to record and submit a profile video.
 */
function buildCareerVideoRequestHtml(name) {
  return [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '</head>',
    '<body style="font-family: \'Segoe UI\', -apple-system, BlinkMacSystemFont, Roboto, Helvetica, Arial, sans-serif; background-color: #0b0f19; margin: 0; padding: 25px 15px;">',
    '  <div style="max-width: 600px; margin: 0 auto; background: #111827; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.4); border: 1px solid #1f2937;">',
    '    <div style="background: linear-gradient(135deg, #1e1b4b 0%, #312e81 100%); padding: 35px 25px; text-align: center;">',
    '      <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.05em;">PROFIT MACHINES CAREERS</h1>',
    '      <p style="color: #a5b4fc; margin: 8px 0 0 0; font-size: 13px; font-weight: 500;">Next Step: Candidate Profile Video</p>',
    '    </div>',
    '    <div style="padding: 35px 30px; color: #e5e7eb; line-height: 1.6;">',
    '      <h2 style="font-size: 20px; color: #818cf8; font-weight: 700; margin: 0 0 15px 0;">Hi ' + escapeHtml(name) + ',</h2>',
    '      <p style="font-size: 15px; color: #d1d5db; margin: 0 0 20px 0;">Thanks again for applying to Profit Machines. As the next step in your application, please record a short profile video introducing yourself.</p>',
    '      <div style="background: #1f2937; padding: 20px; border-radius: 10px; border: 1px solid #374151; margin: 25px 0;">',
    '        <h3 style="color: #f3f4f6; font-size: 15px; margin: 0 0 12px 0; font-weight: 700;">How to record & submit</h3>',
    '        <ul style="padding-left: 20px; margin: 0; font-size: 13px; color: #9ca3af; line-height: 1.8;">',
    '          <li>Record a <strong>15&ndash;20 minute</strong> video using your laptop camera &amp; mic, introducing yourself, your experience, and why you want to join Profit Machines.</li>',
    '          <li>Upload the video to <strong>Google Drive</strong> and set sharing to &ldquo;Anyone with the link &ndash; Viewer&rdquo;.</li>',
    '          <li>Copy the shareable link and <strong>reply to this email</strong> with the link so our Talent team can review it and attach it to your application.</li>',
    '        </ul>',
    '      </div>',
    '      <p style="font-size: 13px; color: #9ca3af; margin: 0;">Once received, your video link will be logged against your application in our tracking sheet.</p>',
    '    </div>',
    '    <div style="background: #0d1117; padding: 20px 25px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #1f2937; line-height: 1.5;">',
    '      &copy; ' + new Date().getFullYear() + ' PROFIT MACHINES. All rights reserved.<br>',
    '      Direct Talent Team Contact: <strong>poojasri.aram@gmail.com</strong>',
    '    </div>',
    '  </div>',
    '</body>',
    '</html>'
  ].join('\n');
}

/**
 * Sends the career-video follow-up email; skipped when the daily quota can't cover it.
 */
function sendCareerVideoRequestEmail(userEmail, userName) {
  if (!userEmail || userEmail.indexOf("@") === -1) return;
  if (getRemainingEmailQuota() === 0) return;
  sendEmailOnce({
    to: userEmail,
    subject: "Profit Machines Careers - Next Step: Submit Your 15-20 Min Profile Video",
    htmlBody: buildCareerVideoRequestHtml(userName),
    name: EMAIL_CONFIG.name,
    replyTo: EMAIL_CONFIG.replyTo
  });
}

/**
 * Matches an incoming { email, videoDriveLink } payload to its Career_Applications row (most
 * recent application for that email) and records the link — appends a new row if no match.
 */
function handleCareerVideoSubmission(data) {
  var result = { message: "Error: Missing email or video link" };
  var email = String(data.email || data.Email || data["Work Email"] || "").trim().toLowerCase();
  var videoLink = data.videoDriveLink || data.videoLink || data["Profile Video Drive Link"] || "";
  if (!email || !videoLink) return result;

  try {
    var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
    var sheet = findSheetFlexible(ss, "Career_Applications") || findSheetFlexible(ss, "Career Applications");
    if (!sheet) { result.message = "Error: Career_Applications sheet not found"; return result; }

    var lastCol = Math.max(sheet.getLastColumn(), 1);
    var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
    var emailCol = headers.indexOf("Email");
    var linkCol = headers.indexOf("Profile Video Drive Link");
    var statusCol = headers.indexOf("Profile Video Status");
    if (linkCol === -1 || statusCol === -1) {
      result.message = "Error: Sheet missing Profile Video columns - run migrateAddCareerVideoColumns()";
      return result;
    }

    var lastRow = sheet.getLastRow();
    var matchedRow = -1;
    if (emailCol !== -1 && lastRow > 1) {
      var emailValues = sheet.getRange(2, emailCol + 1, lastRow - 1, 1).getValues();
      for (var i = emailValues.length - 1; i >= 0; i--) {
        if (String(emailValues[i][0] || "").trim().toLowerCase() === email) { matchedRow = i + 2; break; }
      }
    }

    if (matchedRow !== -1) {
      sheet.getRange(matchedRow, linkCol + 1).setValue(videoLink);
      sheet.getRange(matchedRow, statusCol + 1).setValue("Received");
    } else {
      var newRow = headers.map(function (h) {
        if (h === "Email") return email;
        if (h === "Profile Video Drive Link") return videoLink;
        if (h === "Profile Video Status") return "Received (No Matching Application)";
        if (h === "Timestamp") return normalizeTimestamp(data.timestamp);
        return "";
      });
      sheet.appendRow(newRow);
    }

    try {
      MailApp.sendEmail({
        to: uniqueEmails(EMAIL_CONFIG.careerEmails).join(","),
        subject: "[TG Career Video] Profile video link received - " + email,
        htmlBody: "<p>A candidate profile video link was submitted.</p><p><strong>Email:</strong> " + escapeHtml(email) + "</p><p><strong>Video Link:</strong> <a href=\"" + escapeHtml(videoLink) + "\">" + escapeHtml(videoLink) + "</a></p>",
        name: EMAIL_CONFIG.name,
        replyTo: EMAIL_CONFIG.replyTo
      });
    } catch (mailErr) {}

    result.message = "Video link saved";
    return result;
  } catch (err) {
    result.message = "Error: " + err.toString();
    return result;
  }
}

/**
 * Backfills the Profile Video columns onto an already-created production Career_Applications tab.
 */
function migrateAddCareerVideoColumns() {
  var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  var sheet = findSheetFlexible(ss, "Career_Applications") || findSheetFlexible(ss, "Career Applications");
  if (!sheet) { console.error("Career_Applications sheet not found."); return; }

  var lastCol = Math.max(sheet.getLastColumn(), 1);
  var headers = sheet.getRange(1, 1, 1, lastCol).getValues()[0];
  ["Profile Video Drive Link", "Profile Video Status"].forEach(function (col) {
    if (headers.indexOf(col) === -1) {
      sheet.getRange(1, sheet.getLastColumn() + 1).setValue(col).setFontWeight("bold").setBackground("#0f172a").setFontColor("#ffffff");
    }
  });
  console.log("Career_Applications Profile Video columns verified/added.");
}

// =========================================================================================
// 7. MONTHLY CAREER RESUME DIGEST & FORWARDING ENGINE
// =========================================================================================

/**
 * Gathers all career applications received in the past month, compiles candidate profiles,
 * fetches their resumes from Drive/Storage, and forwards them as attachments to Poojasri & BV.
 */
function forwardMonthlyCareerApplications() {
  console.log("🚀 Starting Monthly Career Applications Digest Forwarder for PROFIT MACHINES...");
  
  var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  var sheet = findSheetFlexible(ss, "Career_Applications") || findSheetFlexible(ss, "Career Applications");
  if (!sheet) {
    console.error("Career_Applications sheet not found in main spreadsheet.");
    return;
  }
  
  var data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    console.log("No career applications found.");
    return;
  }
  
  var headers = data[0];
  var nameCol       = headers.indexOf("Name");
  var emailCol      = headers.indexOf("Email");
  var phoneCol      = headers.indexOf("Phone");
  var jobTitleCol   = headers.indexOf("Job Title / Role") !== -1 ? headers.indexOf("Job Title / Role") : headers.indexOf("Job Title");
  var resumeNameCol = headers.indexOf("Resume File Name");
  var driveLinkCol  = headers.indexOf("Resume Drive Link");
  var driveIdCol    = headers.indexOf("Drive File ID");
  var coverCol      = headers.indexOf("Cover Letter");
  var tsCol         = headers.indexOf("Timestamp");
  
  var now = new Date();
  var thirtyDaysAgo = new Date(now.getTime() - 31 * 24 * 60 * 60 * 1000);
  
  var candidates = [];
  var attachments = [];
  var totalAttachmentSize = 0;
  var MAX_TOTAL_ATTACHMENT_BYTES = 20 * 1024 * 1024;

  for (var i = 1; i < data.length; i++) {
    var row = data[i];
    var ts = parseSheetDate(row[tsCol]);
    
    if (ts && ts >= thirtyDaysAgo) {
      var candidate = {
        name: row[nameCol] || "Applicant",
        email: row[emailCol] || "",
        phone: row[phoneCol] || "",
        jobTitle: row[jobTitleCol] || "AI Engineer / Fellow",
        resumeName: row[resumeNameCol] || "Resume.pdf",
        driveLink: (driveLinkCol !== -1 ? row[driveLinkCol] : "") || "",
        driveId: (driveIdCol !== -1 ? row[driveIdCol] : "") || "",
        coverLetter: row[coverCol] || "",
        date: Utilities.formatDate(ts, "Asia/Kolkata", "dd-MMM-yyyy")
      };
      
      if (candidate.driveId) {
        try {
          var file = DriveApp.getFileById(candidate.driveId);
          var blob = file.getBlob();
          var size = blob.getBytes().length;
          if (totalAttachmentSize + size < MAX_TOTAL_ATTACHMENT_BYTES) {
            blob.setName(candidate.name.replace(/[^a-zA-Z0-9_\s]/g, "") + "_" + (candidate.resumeName || "Resume.pdf"));
            attachments.push(blob);
            totalAttachmentSize += size;
          }
        } catch (fileErr) {
          console.error("Could not fetch Drive file ID: " + candidate.driveId, fileErr.toString());
        }
      }
      
      candidates.push(candidate);
    }
  }

  if (candidates.length === 0) {
    console.log("ℹ️ No career applications recorded in the past 30 days.");
    return;
  }

  var monthLabel = Utilities.formatDate(now, "Asia/Kolkata", "MMMM yyyy");
  var emailHtml = buildMonthlyCareerEmailHtml(monthLabel, candidates, ss.getUrl());
  var subject = "[Profit Machines Careers] Monthly Resumes Digest - " + monthLabel + " (" + candidates.length + " Candidates)";
  
  var quota = getRemainingEmailQuota();
  if (quota === 0) {
    console.error("❌ Cannot send monthly digest: email quota exhausted.");
    return;
  }
  try {
    var mailOptions = {
      to: uniqueEmails(EMAIL_CONFIG.careerEmails).join(","),
      subject: subject,
      htmlBody: emailHtml,
      name: EMAIL_CONFIG.name,
      replyTo: EMAIL_CONFIG.replyTo
    };
    if (attachments.length > 0) {
      mailOptions.attachments = attachments;
    }
    var digestSend = sendEmailOnce(mailOptions);
    if (digestSend.ok) {
      console.log("✅ Monthly Career Digest sent to: " + mailOptions.to);
    } else {
      console.error("❌ Monthly digest failed: " + digestSend.error);
    }
  } catch (err) {
    console.error("Error sending monthly career digest email:", err.toString());
  }
}

function buildMonthlyCareerEmailHtml(monthLabel, candidates, sheetUrl) {
  var candidateRows = candidates.map(function(c, idx) {
    var resumeCell = c.driveLink 
      ? '<a href="' + c.driveLink + '" target="_blank" style="color:#6366f1;font-weight:bold;text-decoration:none;">&#128196; View in Drive</a>'
      : '<span style="color:#94a3b8;">Attached</span>';

    return '<tr style="background:' + (idx % 2 === 0 ? '#ffffff' : '#f8fafc') + ';">' +
           '<td style="padding:12px 10px;border-bottom:1px solid #e2e8f0;font-weight:700;color:#0f172a;font-size:13px;">' + c.name + '</td>' +
           '<td style="padding:12px 10px;border-bottom:1px solid #e2e8f0;color:#4338ca;font-weight:600;font-size:12px;">' + c.jobTitle + '</td>' +
           '<td style="padding:12px 10px;border-bottom:1px solid #e2e8f0;color:#334155;font-size:12px;"><a href="mailto:' + c.email + '" style="color:#0284c7;text-decoration:none;">' + c.email + '</a><br>' + c.phone + '</td>' +
           '<td style="padding:12px 10px;border-bottom:1px solid #e2e8f0;color:#64748b;font-size:11px;">' + c.date + '</td>' +
           '<td style="padding:12px 10px;border-bottom:1px solid #e2e8f0;font-size:12px;text-align:center;">' + resumeCell + '</td>' +
           '</tr>';
  }).join('');

  return [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '</head>',
    '<body style="font-family:\'Segoe UI\',Arial,sans-serif;background-color:#f1f5f9;margin:0;padding:25px 15px;">',
    ' <div style="max-width:700px;margin:0 auto;background:#ffffff;border-radius:14px;overflow:hidden;box-shadow:0 10px 30px rgba(0,0,0,0.06);border:1px solid #e2e8f0;">',
    '  <div style="background:linear-gradient(135deg,#090d16 0%,#1e1b4b 50%,#4338ca 100%);padding:30px 25px;color:#ffffff;">',
    '   <div style="display:inline-block;background:#6366f1;color:#ffffff;font-size:11px;font-weight:800;padding:4px 12px;border-radius:20px;letter-spacing:0.06em;margin-bottom:10px;">MONTHLY TALENT DIGEST</div>',
    '   <h2 style="margin:0;font-size:22px;font-weight:800;">PROFIT MACHINES Talent &amp; Fellowship Pipeline</h2>',
    '   <p style="margin:6px 0 0 0;color:#c7d2fe;font-size:13px;">Candidates for ' + monthLabel + ' &bull; Total: <strong>' + candidates.length + '</strong></p>',
    '  </div>',
    '  <div style="padding:25px;">',
    '   <table style="width:100%;border-collapse:collapse;border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">',
    '    <thead>',
    '     <tr style="background:#0f172a;color:#ffffff;font-size:11px;text-transform:uppercase;letter-spacing:0.05em;">',
    '      <th style="padding:10px;text-align:left;">Candidate</th>',
    '      <th style="padding:10px;text-align:left;">Role</th>',
    '      <th style="padding:10px;text-align:left;">Contact</th>',
    '      <th style="padding:10px;text-align:left;">Date</th>',
    '      <th style="padding:10px;text-align:center;">Resume</th>',
    '     </tr>',
    '    </thead>',
    '    <tbody>' + candidateRows + '</tbody>',
    '   </table>',
    '   <div style="text-align:center;margin-top:25px;">',
    '    <a href="' + sheetUrl + '" style="background:#6366f1;color:#ffffff;text-decoration:none;padding:12px 25px;border-radius:8px;font-weight:700;font-size:13px;display:inline-block;">Open Career Applications Sheet</a>',
    '   </div>',
    '  </div>',
    '  <div style="background:#f8fafc;padding:18px 25px;border-top:1px solid #e2e8f0;font-size:11px;color:#94a3b8;text-align:center;">',
    '   &copy; ' + new Date().getFullYear() + ' PROFIT MACHINES. Confidential Talent Pipeline.',
    '  </div>',
    ' </div>',
    '</body>',
    '</html>'
  ].join('\n');
}

// =========================================================================================
// 8. PROFIT MACHINES - EXECUTIVE ANALYTICS BRIEF ENGINE (DAILY, WEEKLY & MONTHLY)
// =========================================================================================

function dailyReport() {
  var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  if (!ss) return;

  var yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  var dayBefore = new Date(); dayBefore.setDate(dayBefore.getDate() - 2);

  var reportData = aggregateExecutiveReportData(ss, "DAILY", yesterday, yesterday, dayBefore, dayBefore);
  var emailHtml = buildExecutiveAnalyticsBriefHtml(reportData, "DAILY");
  sendReportEmail("[PROFIT MACHINES] Daily Analytics Report - " + cleanEmailText(reportData.periodDateStr), emailHtml);
}

function weeklyReport() {
  var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  if (!ss) return;

  var now = new Date();
  var w1Start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  var w1End   = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
  var w2Start = new Date(w1Start.getTime() - 7 * 24 * 60 * 60 * 1000);
  var w2End   = new Date(w1Start.getTime() - 1 * 24 * 60 * 60 * 1000);

  var reportData = aggregateExecutiveReportData(ss, "WEEKLY", w1Start, w1End, w2Start, w2End);
  var emailHtml = buildExecutiveAnalyticsBriefHtml(reportData, "WEEKLY");
  sendReportEmail("[PROFIT MACHINES] Weekly Analytics Report - " + cleanEmailText(reportData.periodRangeStr), emailHtml);
}

function monthlyReport() {
  var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  if (!ss) return;

  var now = new Date();
  var m1Start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  var m1End   = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
  var m2Start = new Date(m1Start.getTime() - 30 * 24 * 60 * 60 * 1000);
  var m2End   = new Date(m1Start.getTime() - 1 * 24 * 60 * 60 * 1000);

  var reportData = aggregateExecutiveReportData(ss, "MONTHLY", m1Start, m1End, m2Start, m2End);
  var monthLabel = Utilities.formatDate(m1End, "Asia/Kolkata", "MMMM yyyy");
  var emailHtml = buildExecutiveAnalyticsBriefHtml(reportData, "MONTHLY");
  sendReportEmail("[PROFIT MACHINES] Monthly Analytics Report - " + cleanEmailText(monthLabel), emailHtml);
}

/**
 * Normalizes any route or full URL down to a clean, canonical route/sub-route without query parameters or domains.
 */
function normalizeRoutePath(rawPathOrUrl) {
  if (!rawPathOrUrl) return "/";
  var str = String(rawPathOrUrl).trim();
  
  // If multiline or composite title + route is passed, extract the route portion
  if (str.indexOf("\n") !== -1) {
    var lines = str.split("\n");
    for (var i = lines.length - 1; i >= 0; i--) {
      var line = lines[i].trim();
      if (line.startsWith("/") || line.startsWith("http")) {
        str = line;
        break;
      }
    }
  } else if (!str.startsWith("/") && !str.startsWith("http") && str.indexOf("/") !== -1) {
    str = str.substring(str.indexOf("/"));
  }

  // Strip domain if present (e.g. http://profitmachines.com/solutions/... or https://profitmachines.com/...)
  str = str.replace(/^https?:\/\/[^\/]+/i, "");
  // Strip query parameters (?utm_source=... etc) and hash fragments (#...)
  str = str.split('?')[0].split('#')[0].trim();
  if (!str || str === "") return "/";
  // Remove trailing slash unless it's just "/"
  if (str.length > 1 && str.endsWith("/")) {
    str = str.replace(/\/+$/, "");
  }
  if (!str.startsWith("/")) {
    str = "/" + str;
  }
  return str;
}

/**
 * Categorizes form types strictly into Quick Forms, Consulting Sessions, or standard secondary categories.
 */
function getFormCategoryLabel(nameOrType) {
  var s = String(nameOrType || "").toLowerCase().trim();
  if (s.indexOf("quick") !== -1 || s.indexOf("floating") !== -1 || s === "quick_enquiry_leads" || s === "floating_lead") {
    return "Quick Forms";
  }
  if (s.indexOf("career") !== -1 || s.indexOf("candidate") !== -1 || s === "career_applications") {
    return "Career Applications";
  }
  if (s.indexOf("partner") !== -1 || s === "partner_applications") {
    return "Partner Applications";
  }
  if (s.indexOf("newsletter") !== -1 || s === "newsletter_subscribers") {
    return "Newsletter Subscribers";
  }
  if (s.indexOf("chatbot") !== -1 || s === "chatbot_leads") {
    return "Chatbot Inquiries";
  }
  return "Consulting Sessions";
}

/**
 * Strips broken Unicode replacement characters (e.g. \uFFFD) and mojibake from email content.
 */
function cleanEmailText(str) {
  if (!str) return "";
  return String(str)
    .replace(/\uFFFD/g, '')
    .replace(/\uFFFE/g, '')
    .replace(/[\uD800-\uDFFF]/g, '')
    .trim();
}

/**
 * Builds a single combined QuickChart line chart URL for dual-trend visualization.
 */
function generateMergedTrendChartUrl(labels, seriesVisitors, seriesLeads) {
  var chartConfig = {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Visitors / Sessions',
          data: seriesVisitors,
          borderColor: '#6366f1',
          backgroundColor: 'rgba(99, 102, 241, 0.08)',
          borderWidth: 2.5,
          pointRadius: 3,
          pointBackgroundColor: '#6366f1',
          fill: false,
          tension: 0.25
        },
        {
          label: 'Leads Captured',
          data: seriesLeads,
          borderColor: '#059669',
          backgroundColor: 'rgba(5, 150, 105, 0.08)',
          borderWidth: 2.5,
          pointRadius: 3,
          pointBackgroundColor: '#059669',
          fill: false,
          tension: 0.25
        }
      ]
    },
    options: {
      responsive: true,
      legend: {
        display: true,
        position: 'top',
        labels: {
          fontColor: '#334155',
          fontSize: 11,
          boxWidth: 12,
          usePointStyle: true
        }
      },
      scales: {
        xAxes: [{
          gridLines: { color: 'rgba(226, 232, 240, 0.6)', zeroLineColor: '#cbd5e1' },
          ticks: { fontColor: '#64748b', fontSize: 10 }
        }],
        yAxes: [{
          gridLines: { color: 'rgba(226, 232, 240, 0.6)', zeroLineColor: '#cbd5e1' },
          ticks: { fontColor: '#64748b', fontSize: 10, beginAtZero: true, precision: 0 }
        }]
      }
    }
  };

  return 'https://quickchart.io/chart?c=' + encodeURIComponent(JSON.stringify(chartConfig)) + '&w=580&h=250&bkg=white&devicePixelRatio=2';
}

/**
 * Builds a QuickChart pie/doughnut/horizontalBar image URL from real, already-aggregated
 * labels/values (never fabricated placeholders — caller must pass live counts).
 */
function generateBreakdownChartUrl(type, labels, values, title) {
  var palette = ['#6366f1', '#059669', '#f59e0b', '#0ea5e9', '#ef4444', '#8b5cf6', '#14b8a6', '#f43f5e'];
  var bg = labels.map(function (_, i) { return palette[i % palette.length]; });
  var isBar = type === 'horizontalBar' || type === 'bar';
  var chartConfig = {
    type: type,
    data: {
      labels: labels,
      datasets: [{
        data: values,
        backgroundColor: bg,
        borderWidth: isBar ? 0 : 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      title: { display: !!title, text: title, fontColor: '#334155', fontSize: 12, fontStyle: 'bold' },
      legend: {
        display: !isBar,
        position: 'right',
        labels: { fontColor: '#334155', fontSize: 10, boxWidth: 10 }
      }
    }
  };
  if (isBar) {
    chartConfig.options.scales = {
      xAxes: [{ ticks: { fontColor: '#64748b', fontSize: 10, beginAtZero: true, precision: 0 }, gridLines: { color: 'rgba(226, 232, 240, 0.6)' } }],
      yAxes: [{ ticks: { fontColor: '#0f172a', fontSize: 10 }, gridLines: { display: false } }]
    };
  }
  return 'https://quickchart.io/chart?c=' + encodeURIComponent(JSON.stringify(chartConfig)) + '&w=340&h=230&bkg=white&devicePixelRatio=2';
}

function aggregateExecutiveReportData(ss, periodType, startDate, endDate, prevStartDate, prevEndDate) {
  var periodDateStr = (periodType === "DAILY")
    ? Utilities.formatDate(endDate, "Asia/Kolkata", "d MMMM yyyy")
    : Utilities.formatDate(startDate, "Asia/Kolkata", "d MMMM yyyy") + " - " + Utilities.formatDate(endDate, "Asia/Kolkata", "d MMMM yyyy");
  var periodRangeStr = Utilities.formatDate(startDate, "Asia/Kolkata", "d MMM yyyy") + " - " + Utilities.formatDate(endDate, "Asia/Kolkata", "d MMM yyyy");

  var trafficSheet = findSheetFlexible(ss, "Live_Traffic_Events") || findSheetFlexible(ss, "Traffic_Analytics") || findSheetFlexible(ss, "Page_Views") || findSheetFlexible(ss, "Page Views");
  var trafficData = (trafficSheet && trafficSheet.getLastRow() > 1) ? trafficSheet.getDataRange().getValues() : [];
  
  var tHeaders = trafficData.length > 0 ? trafficData[0] : [];
  // Live_Traffic_Events uses SCHEMA_95_HEADERS (snake_case); other legacy tabs use Title Case —
  // check both so real data is actually read regardless of which sheet is live.
  var findCol = function (headers, names) {
    for (var n = 0; n < names.length; n++) {
      var idx = headers.indexOf(names[n]);
      if (idx !== -1) return idx;
    }
    return -1;
  };
  var tsCol = findCol(tHeaders, ["Timestamp", "timestamp"]);
  var ipCol = findCol(tHeaders, ["IP Address", "ip_address"]);
  var pathCol = findCol(tHeaders, ["Page Path", "Page URL", "page", "page_url"]);
  var srcCol = findCol(tHeaders, ["Traffic Source", "Source", "traffic_source"]);
  var sessCol = findCol(tHeaders, ["Session ID", "session_id"]);

  var curSessions = new Set();
  var curVisitors = new Set();
  var curPages = {};
  var curSources = {};

  var prevSessions = new Set();
  var prevVisitors = new Set();

  // Setup Merged Trend Buckets
  var trendLabels = [];
  var trendVisitors = [];
  var trendLeads = [];

  var startMs = startDate.getTime();
  var endMs = endDate.getTime() + 24 * 60 * 60 * 1000 - 1;

  if (periodType === "DAILY") {
    trendLabels = ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"];
    trendVisitors = [0, 0, 0, 0, 0, 0, 0, 0];
    trendLeads = [0, 0, 0, 0, 0, 0, 0, 0];
  } else {
    // Weekly 7 daily intervals
    for (var d = 0; d < 7; d++) {
      var dObj = new Date(startMs + d * 24 * 60 * 60 * 1000);
      trendLabels.push(Utilities.formatDate(dObj, "Asia/Kolkata", "d MMM"));
      trendVisitors.push(0);
      trendLeads.push(0);
    }
  }

  for (var i = 1; i < trafficData.length; i++) {
    var row = trafficData[i];
    var ts = parseSheetDate(row[tsCol]);
    if (!ts) continue;
    var ip = String(row[ipCol] || "").trim();
    // Only count real captured Session ID values — no per-row fallback IDs, so Sessions
    // reflects actual tracked sessions instead of a fabricated number that can mismatch Visitors.
    var sess = (sessCol !== -1) ? String(row[sessCol] || "").trim() : "";
    var rawPath = (pathCol !== -1) ? String(row[pathCol] || "/") : "/";
    var cleanRoute = normalizeRoutePath(rawPath);
    var source = normalizeTrafficSource(row[srcCol]);

    var tTime = ts.getTime();
    if (tTime >= startMs && tTime <= endMs) {
      if (sess) curSessions.add(sess);
      if (ip) curVisitors.add(ip);
      
      if (!curPages[cleanRoute]) {
        curPages[cleanRoute] = { path: cleanRoute, visits: 0, visitors: new Set() };
      }
      curPages[cleanRoute].visits++;
      if (ip) curPages[cleanRoute].visitors.add(ip);
      curSources[source] = (curSources[source] || 0) + 1;

      // Bucket for trend chart
      if (periodType === "DAILY") {
        var istHours = (ts.getUTCHours() + 5.5) % 24;
        var bIdx = Math.min(7, Math.floor(istHours / 3));
        trendVisitors[bIdx]++;
      } else {
        var dayDiff = Math.floor((tTime - startMs) / (24 * 60 * 60 * 1000));
        if (dayDiff >= 0 && dayDiff < 7) {
          trendVisitors[dayDiff]++;
        }
      }
    } else if (tTime >= prevStartDate.getTime() && tTime <= new Date(prevEndDate.getTime() + 24*60*60*1000 - 1).getTime()) {
      if (sess) prevSessions.add(sess);
      if (ip) prevVisitors.add(ip);
    }
  }

  var currentLeadsData = aggregateLeadsFromAllSources(ss, startDate, endDate, periodType, startMs, trendLeads);
  var previousLeadsData = aggregateLeadsFromAllSources(ss, prevStartDate, prevEndDate, periodType, prevStartDate.getTime(), null);

  var curVisitorsCount = curVisitors.size || curSessions.size || 0;
  var curSessionsCount = curSessions.size || curVisitorsCount || 0;
  var prevVisitorsCount = prevVisitors.size || prevSessions.size || 0;
  var prevSessionsCount = prevSessions.size || prevVisitorsCount || 0;

  var curLeadsCount = currentLeadsData.totalLeads;
  var prevLeadsCount = previousLeadsData.totalLeads;
  var curEnquiriesCount = currentLeadsData.totalEnquiries;
  var prevEnquiriesCount = previousLeadsData.totalEnquiries;

  var curConvRate = curSessionsCount > 0 ? ((curLeadsCount / curSessionsCount) * 100).toFixed(2) : "0.00";
  var prevConvRate = prevSessionsCount > 0 ? ((prevLeadsCount / prevSessionsCount) * 100).toFixed(2) : "0.00";

  var sourceList = Object.keys(curSources).map(function(src) {
    var vCount = curSources[src];
    var lCount = currentLeadsData.bySource[src] ? currentLeadsData.bySource[src].leads : 0;
    var eCount = currentLeadsData.bySource[src] ? currentLeadsData.bySource[src].enquiries : 0;
    var cRate = vCount > 0 ? ((lCount / vCount) * 100).toFixed(1) : "0.0";
    return { source: src, visitors: vCount, leads: lCount, enquiries: eCount, convRate: cRate + "%" };
  }).sort(function(a, b) { return b.visitors - a.visitors; });

  var topLeadSource = sourceList.length > 0 ? sourceList[0].source : "Direct / Organic";

  // Build clean TOP ENGAGED PAGES list: Route only, sorted by views descending
  var topPagesList = Object.keys(curPages).map(function(p) {
    var item = curPages[p];
    return {
      path: item.path,
      views: item.visits,
      visitors: item.visitors.size,
      leads: currentLeadsData.byPage[item.path] || 0
    };
  }).sort(function(a, b) { return b.views - a.views; }).slice(0, 10);

  // Generate merged trend chart URL
  var mergedChartUrl = generateMergedTrendChartUrl(trendLabels, trendVisitors, trendLeads);

  return {
    periodType: periodType,
    periodDateStr: periodDateStr,
    periodRangeStr: periodRangeStr,
    kpis: {
      visitors: curVisitorsCount,
      sessions: curSessionsCount,
      leads: curLeadsCount,
      enquiries: curEnquiriesCount,
      conversionRate: curConvRate + "%",
      topLeadSource: topLeadSource
    },
    comparison: {
      visitorsDelta: calculateDelta(curVisitorsCount, prevVisitorsCount),
      sessionsDelta: calculateDelta(curSessionsCount, prevSessionsCount),
      leadsDelta: calculateDelta(curLeadsCount, prevLeadsCount),
      enquiriesDelta: calculateDelta(curEnquiriesCount, prevEnquiriesCount),
      prevVisitors: prevVisitorsCount,
      prevLeads: prevLeadsCount,
      prevEnquiries: prevEnquiriesCount,
      prevConvRate: prevConvRate + "%"
    },
    trend: {
      labels: trendLabels,
      visitors: trendVisitors,
      leads: trendLeads,
      chartUrl: mergedChartUrl
    },
    formBreakdown: currentLeadsData.byForm,
    sources: sourceList,
    topPages: topPagesList,
    dashboardUrl: ss.getUrl()
  };
}

function aggregateLeadsFromAllSources(ss, startDate, endDate, periodType, startMs, trendLeadsRef) {
  var sTime = startDate.getTime();
  var eTime = endDate.getTime() + 24 * 60 * 60 * 1000 - 1;

  var result = {
    totalLeads: 0,
    totalEnquiries: 0,
    bySource: {},
    byPage: {},
    byForm: {
      "Quick Forms": 0,
      "Consulting Sessions": 0
    }
  };

  var FORM_SOURCES = [
    { canonical: "Contact_Leads", isLead: true, category: "Consulting Sessions" },
    { canonical: "AI_Diagnostic_Leads", isLead: true, category: "Consulting Sessions" },
    { canonical: "AI_Readiness_Leads", isLead: true, category: "Consulting Sessions" },
    { canonical: "Workshop_Requests", isLead: true, category: "Consulting Sessions" },
    { canonical: "RFP_Proposals", isLead: true, category: "Consulting Sessions" },
    { canonical: "Talk_To_Architect", isLead: true, category: "Consulting Sessions" },
    { canonical: "Google_Ad_Leads", isLead: true, category: "Consulting Sessions" },
    { canonical: "Quick_Enquiry_Leads", isLead: true, category: "Quick Forms" },
    { canonical: "Career_Applications", isLead: false, isEnquiry: true, category: "Career Applications" },
    { canonical: "Partner_Applications", isLead: true, category: "Partner Applications" },
    { canonical: "Chatbot_Leads", isLead: false, isEnquiry: true, category: "Chatbot Inquiries" },
    { canonical: "Newsletter_Subscribers", isLead: false, isEnquiry: true, category: "Newsletter Subscribers" }
  ];

  var visitedSheets = new Set();

  FORM_SOURCES.forEach(function(item) {
    var sh = findSheetFlexible(ss, item.canonical);
    if (!sh) return;
    var sheetId = sh.getSheetId();
    if (visitedSheets.has(sheetId)) return;
    visitedSheets.add(sheetId);

    var data = sh.getDataRange().getValues();
    if (data.length < 2) return;
    var headers = data[0];

    var tsCol = headers.indexOf("Timestamp");
    if (tsCol === -1) tsCol = headers.indexOf("timestamp");
    if (tsCol === -1) return;

    var srcCol = headers.indexOf("Source") !== -1 ? headers.indexOf("Source") : headers.indexOf("UTM Source");
    var pageCol = headers.indexOf("Page") !== -1 ? headers.indexOf("Page") : headers.indexOf("Page Path");

    for (var r = 1; r < data.length; r++) {
      var ts = parseSheetDate(data[r][tsCol]);
      if (!ts) continue;
      var tTime = ts.getTime();
      if (tTime >= sTime && tTime <= eTime) {
        if (item.isLead) result.totalLeads++;
        result.totalEnquiries++;

        var categoryLabel = item.category || getFormCategoryLabel(item.canonical);
        result.byForm[categoryLabel] = (result.byForm[categoryLabel] || 0) + 1;

        var rawSrc = (srcCol !== -1) ? data[r][srcCol] : "Direct";
        var normSrc = normalizeTrafficSource(rawSrc);
        if (!result.bySource[normSrc]) {
          result.bySource[normSrc] = { leads: 0, enquiries: 0 };
        }
        if (item.isLead) result.bySource[normSrc].leads++;
        result.bySource[normSrc].enquiries++;

        var rawPage = (pageCol !== -1) ? String(data[r][pageCol] || "/") : "/";
        var cleanRoute = normalizeRoutePath(rawPage);
        result.byPage[cleanRoute] = (result.byPage[cleanRoute] || 0) + 1;

        // Trend aggregation bucket
        if (trendLeadsRef && item.isLead) {
          if (periodType === "DAILY") {
            var istHours = (ts.getUTCHours() + 5.5) % 24;
            var bIdx = Math.min(7, Math.floor(istHours / 3));
            trendLeadsRef[bIdx]++;
          } else if (startMs) {
            var dayDiff = Math.floor((tTime - startMs) / (24 * 60 * 60 * 1000));
            if (dayDiff >= 0 && dayDiff < 7) {
              trendLeadsRef[dayDiff]++;
            }
          }
        }
      }
    }
  });

  return result;
}

function buildExecutiveAnalyticsBriefHtml(data, periodType) {
  var k = data.kpis;
  var c = data.comparison;
  var mainHeading = (periodType === "DAILY") ? "DAILY ANALYTICS REPORT" : (periodType === "WEEKLY" ? "WEEKLY ANALYTICS REPORT" : "MONTHLY ANALYTICS REPORT");
  var trendHeading = (periodType === "DAILY") ? "TREND ANALYSIS" : (periodType === "WEEKLY" ? "WEEKLY TREND ANALYSIS" : "MONTHLY TREND ANALYSIS");
  var subtitle = (periodType === "DAILY")
    ? "Daily Executive Performance Summary &bull; " + cleanEmailText(data.periodDateStr)
    : (periodType === "WEEKLY" ? "Weekly Executive Performance Summary &bull; " + cleanEmailText(data.periodRangeStr) : "Monthly Executive Performance Summary &bull; " + cleanEmailText(data.periodDateStr));

  // TOP ENGAGED PAGES rows (Clean route only, views, leads)
  var pageRows = (data.topPages || []).map(function(p) {
    return '<tr style="border-bottom: 1px solid #f1f5f9;">' +
           '  <td style="padding: 9px 12px; font-size: 13px; font-weight: 600; color: #0f172a; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, monospace;">' + escapeHtml(p.path) + '</td>' +
           '  <td style="padding: 9px 12px; font-size: 13px; font-weight: 700; text-align: right; color: #6366f1;">' + formatNum(p.views) + '</td>' +
           '  <td style="padding: 9px 12px; font-size: 13px; text-align: right; color: #059669; font-weight: 700;">' + (p.leads || 0) + '</td>' +
           '</tr>';
  }).join('');

  // ACQUISITION CHANNELS rows
  var sourceRows = (data.sources || []).map(function(s) {
    return '<tr style="border-bottom: 1px solid #f1f5f9;">' +
           '  <td style="padding: 9px 12px; font-size: 13px; font-weight: 600; color: #0f172a;">' + escapeHtml(s.source) + '</td>' +
           '  <td style="padding: 9px 12px; font-size: 13px; text-align: right; color: #475569;">' + formatNum(s.visitors) + '</td>' +
           '  <td style="padding: 9px 12px; font-size: 13px; font-weight: 700; text-align: right; color: #059669;">' + s.leads + '</td>' +
           '  <td style="padding: 9px 12px; font-size: 12px; font-weight: 700; text-align: right; color: #6366f1;">' + s.convRate + '</td>' +
           '</tr>';
  }).join('');

  // FORM PERFORMANCE rows (Quick Forms vs Consulting Sessions)
  var formKeys = ["Quick Forms", "Consulting Sessions"];
  if (data.formBreakdown) {
    Object.keys(data.formBreakdown).forEach(function(fk) {
      if (formKeys.indexOf(fk) === -1 && data.formBreakdown[fk] > 0) formKeys.push(fk);
    });
  }
  var formRows = formKeys.map(function(fName) {
    var count = (data.formBreakdown && data.formBreakdown[fName]) ? data.formBreakdown[fName] : 0;
    return '<tr style="border-bottom: 1px solid #f1f5f9;">' +
           '  <td style="padding: 9px 12px; font-size: 13px; font-weight: 600; color: #0f172a;">' + escapeHtml(fName) + '</td>' +
           '  <td style="padding: 9px 12px; font-size: 13px; font-weight: 700; text-align: right; color: #059669;">' + count + '</td>' +
           '</tr>';
  }).join('');

  // Trend table fallback rows
  var trendTableRows = "";
  if (data.trend && data.trend.labels) {
    trendTableRows = data.trend.labels.map(function(lbl, idx) {
      return '<tr style="border-bottom: 1px solid #f1f5f9;">' +
             '  <td style="padding: 6px 10px; font-size: 11px; color: #475569;">' + escapeHtml(lbl) + '</td>' +
             '  <td style="padding: 6px 10px; font-size: 11px; font-weight: 700; text-align: right; color: #6366f1;">' + (data.trend.visitors[idx] || 0) + '</td>' +
             '  <td style="padding: 6px 10px; font-size: 11px; font-weight: 700; text-align: right; color: #059669;">' + (data.trend.leads[idx] || 0) + '</td>' +
             '</tr>';
    }).join('');
  }

  // Chart images built strictly from the same live counts as the tables above (no synthetic data)
  var formChartImg = "";
  var formCounts = formKeys.map(function (fName) { return (data.formBreakdown && data.formBreakdown[fName]) ? data.formBreakdown[fName] : 0; });
  if (formKeys.length > 0 && formCounts.some(function (v) { return v > 0; })) {
    var formChartUrl = generateBreakdownChartUrl('pie', formKeys, formCounts, 'Form Performance Split');
    formChartImg = '<div style="text-align:center;padding:12px 0 4px 0;"><img src="' + formChartUrl + '" alt="Form Performance Split" style="max-width:300px;width:100%;height:auto;" /></div>';
  }

  var sourceChartImg = "";
  if ((data.sources || []).length > 0) {
    var sourceChartUrl = generateBreakdownChartUrl('horizontalBar', data.sources.map(function (s) { return s.source; }), data.sources.map(function (s) { return s.visitors; }), 'Visitors by Acquisition Channel');
    sourceChartImg = '<div style="text-align:center;padding:12px 0 4px 0;"><img src="' + sourceChartUrl + '" alt="Visitors by Acquisition Channel" style="max-width:100%;height:auto;" /></div>';
  }

  return [
    '<!DOCTYPE html>',
    '<html>',
    '<head>',
    '  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">',
    '  <meta charset="utf-8">',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">',
    '</head>',
    '<body style="font-family: \'Segoe UI\', -apple-system, BlinkMacSystemFont, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 25px 15px;">',
    '  <div style="max-width: 660px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.06); border: 1px solid #e2e8f0;">',
    '    <div style="background: linear-gradient(135deg, #090d16 0%, #1e1b4b 60%, #312e81 100%); padding: 28px 25px; color: #ffffff;">',
    '      <div style="font-size: 11px; font-weight: 800; color: #818cf8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">PROFIT MACHINES ENTERPRISE ANALYTICS</div>',
    '      <h2 style="margin: 0; font-size: 22px; font-weight: 800; letter-spacing: -0.02em;">' + mainHeading + '</h2>',
    '      <p style="margin: 6px 0 0 0; font-size: 13px; color: #c7d2fe;">' + subtitle + '</p>',
    '    </div>',
    '    <div style="padding: 24px 22px;">',
    '      <!-- KPIS -->',
    '      <table width="100%" cellpadding="0" cellspacing="0" style="margin-bottom: 20px;">',
    '        <tr>',
    '          <td width="25%" style="padding: 4px;"><div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;text-align:center;"><div style="font-size:10px;font-weight:800;color:#64748b;">VISITORS</div><div style="font-size:18px;font-weight:800;color:#0f172a;margin-top:4px;">' + formatNum(k.visitors) + '</div></div></td>',
    '          <td width="25%" style="padding: 4px;"><div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;text-align:center;"><div style="font-size:10px;font-weight:800;color:#64748b;">SESSIONS</div><div style="font-size:18px;font-weight:800;color:#6366f1;margin-top:4px;">' + formatNum(k.sessions) + '</div></div></td>',
    '          <td width="25%" style="padding: 4px;"><div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;text-align:center;"><div style="font-size:10px;font-weight:800;color:#64748b;">LEADS</div><div style="font-size:18px;font-weight:800;color:#059669;margin-top:4px;">' + formatNum(k.leads) + '</div></div></td>',
    '          <td width="25%" style="padding: 4px;"><div style="background:#f8fafc;border:1px solid #e2e8f0;border-radius:8px;padding:12px;text-align:center;"><div style="font-size:10px;font-weight:800;color:#64748b;">CONV. RATE</div><div style="font-size:18px;font-weight:800;color:#7c3aed;margin-top:4px;">' + k.conversionRate + '</div></div></td>',
    '        </tr>',
    '      </table>',
    '',
    '      <!-- MERGED TREND ANALYSIS (ONE COMBINED GRAPH) -->',
    '      <div style="margin-bottom: 20px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">',
    '        <div style="background: #f8fafc; padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 11px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em;">' + trendHeading + '</div>',
    '        <div style="padding: 14px; text-align: center;">',
    '          <img src="' + (data.trend ? data.trend.chartUrl : '') + '" alt="Trend Analysis: Visitors / Sessions vs Leads Captured" style="width: 100%; max-width: 580px; height: auto; display: block; margin: 0 auto; border-radius: 6px;" />',
    '          <div style="margin-top: 10px; font-size: 11px; color: #64748b; display: flex; justify-content: center; gap: 16px;">',
    '            <span style="color:#6366f1; font-weight:700;">&mdash; Visitors / Sessions</span>',
    '            <span style="color:#059669; font-weight:700;">&mdash; Leads Captured</span>',
    '          </div>',
    '        </div>',
    '        <table width="100%" cellpadding="0" cellspacing="0" style="border-top: 1px solid #f1f5f9;">',
    '          <thead>',
    '            <tr style="background:#f8fafc;font-size:10px;color:#64748b;text-transform:uppercase;">',
    '              <th style="padding:6px 10px;text-align:left;">Timeline</th>',
    '              <th style="padding:6px 10px;text-align:right;">Visitors / Sessions</th>',
    '              <th style="padding:6px 10px;text-align:right;">Leads</th>',
    '            </tr>',
    '          </thead>',
    '          <tbody>' + (trendTableRows || '<tr><td colspan="3" style="padding:8px;text-align:center;color:#94a3b8;">No trend data</td></tr>') + '</tbody>',
    '        </table>',
    '      </div>',
    '',
    '      <!-- TOP ENGAGED PAGES -->',
    '      <div style="margin-bottom: 20px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">',
    '        <div style="background: #f8fafc; padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 11px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em;">TOP ENGAGED PAGES</div>',
    '        <table width="100%" cellpadding="0" cellspacing="0">',
    '          <thead>',
    '            <tr style="background:#f1f5f9;font-size:11px;color:#64748b;">',
    '              <th style="padding:6px 12px;text-align:left;">Route</th>',
    '              <th style="padding:6px 12px;text-align:right;">Page Views</th>',
    '              <th style="padding:6px 12px;text-align:right;">Leads</th>',
    '            </tr>',
    '          </thead>',
    '          <tbody>' + (pageRows || '<tr><td colspan="3" style="padding:10px;text-align:center;color:#94a3b8;">No data</td></tr>') + '</tbody>',
    '        </table>',
    '      </div>',
    '',
    '      <!-- FORM PERFORMANCE -->',
    '      <div style="margin-bottom: 20px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">',
    '        <div style="background: #f8fafc; padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 11px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em;">FORM PERFORMANCE</div>',
    '        ' + formChartImg,
    '        <table width="100%" cellpadding="0" cellspacing="0">',
    '          <thead>',
    '            <tr style="background:#f1f5f9;font-size:11px;color:#64748b;">',
    '              <th style="padding:6px 12px;text-align:left;">Form Category</th>',
    '              <th style="padding:6px 12px;text-align:right;">Submissions</th>',
    '            </tr>',
    '          </thead>',
    '          <tbody>' + (formRows || '<tr><td colspan="2" style="padding:10px;text-align:center;color:#94a3b8;">No submissions</td></tr>') + '</tbody>',
    '        </table>',
    '      </div>',
    '',
    '      <!-- ACQUISITION CHANNELS -->',
    '      <div style="margin-bottom: 20px; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">',
    '        <div style="background: #f8fafc; padding: 10px 14px; border-bottom: 1px solid #e2e8f0; font-size: 11px; font-weight: 800; color: #0f172a; text-transform: uppercase; letter-spacing: 0.05em;">ACQUISITION CHANNELS</div>',
    '        ' + sourceChartImg,
    '        <table width="100%" cellpadding="0" cellspacing="0">',
    '          <thead>',
    '            <tr style="background:#f1f5f9;font-size:11px;color:#64748b;">',
    '              <th style="padding:6px 12px;text-align:left;">Source</th>',
    '              <th style="padding:6px 12px;text-align:right;">Visitors</th>',
    '              <th style="padding:6px 12px;text-align:right;">Leads</th>',
    '              <th style="padding:6px 12px;text-align:right;">Rate</th>',
    '            </tr>',
    '          </thead>',
    '          <tbody>' + (sourceRows || '<tr><td colspan="4" style="padding:10px;text-align:center;color:#94a3b8;">No data</td></tr>') + '</tbody>',
    '        </table>',
    '      </div>',
    '',
    '      <div style="text-align:center;margin-top:20px;">',
    '        <a href="' + data.dashboardUrl + '" target="_blank" style="background:#6366f1;color:#ffffff;text-decoration:none;padding:12px 24px;border-radius:6px;font-weight:700;font-size:13px;display:inline-block;">Open Live Master Spreadsheet</a>',
    '      </div>',
    '    </div>',
    '    <div style="background: #f8fafc; padding: 16px 20px; border-top: 1px solid #e2e8f0; font-size: 11px; color: #94a3b8; text-align: center;">',
    '      &copy; ' + new Date().getFullYear() + ' PROFIT MACHINES. Confidential Executive Analytics Report.<br>',
    '      Direct Inquiries: <strong>poojasri.aram@gmail.com</strong>',
    '    </div>',
    '  </div>',
    '</body>',
    '</html>'
  ].join('\n');
}

function sendReportEmail(subject, htmlBody) {
  var remaining = getRemainingEmailQuota();
  if (remaining === 0) return;
  var recipients = uniqueEmails(EMAIL_CONFIG.reportEmails);
  var options = {
    to: recipients.join(","),
    subject: cleanEmailText(subject),
    htmlBody: htmlBody,
    name: EMAIL_CONFIG.name,
    replyTo: EMAIL_CONFIG.replyTo
  };
  var sent = sendEmailOnce(options);
  if (sent.ok) {
    console.log("Sent Executive Analytics Brief to: " + options.to);
  }
}

// =========================================================================================
// 9. FIELD RESOLVER & UTILITIES
// =========================================================================================

function resolveField(header, data) {
  var explicitMap = {
    "Name":                   data.name         || data.fullName    || data["Full Name"]    || data["FullName"] || "",
    "Full Name":              data.name         || data.fullName    || data["Full Name"]    || data["FullName"] || "",
    "Email":                  data.email        || data.workEmail   || data["Work Email"]   || data["Corporate Email"] || "",
    "Work Email":             data.email        || data.workEmail   || data["Work Email"]   || data["Corporate Email"] || "",
    "Corporate Email":        data.email        || data.workEmail   || data["Work Email"]   || data["Corporate Email"] || "",
    "Phone":                  data.phone        || data.phoneNumber || data["Phone Number"] || data["Contact Number"] || "",
    "Phone Number":           data.phone        || data.phoneNumber || data["Phone Number"] || data["Contact Number"] || "",
    "Company":                data.company      || data.companyName || data["Company Name"] || data["organization"] || "",
    "Company Name":           data.company      || data.companyName || data["Company Name"] || data["organization"] || "",
    "Company / Org":          data.company      || data.companyName || data["Company Name"] || data["organization"] || "",
    "Designation":            data.designation  || data.role        || data["Designation"]  || data["Role"] || "",
    "Role":                   data.designation  || data.role        || data["Designation"]  || data["Role"] || "",
    "Job Title / Role":       data.jobTitle     || data["Job Title / Role"] || data.role    || "",
    "Job Title":              data.jobTitle     || data["Job Title"]|| data.role            || "",
    "Service Interest":       data.serviceInterest || data.service || data.servicesType    || data["Service Interest"] || "",
    "Subject":                data.subject      || data.subjectLine || data["Subject"]      || "",
    "Requirement / Inquiry":  data.requirement  || data.message     || data.requirementInquiry || data.inquiry || data.scope || "",
    "Requirement":            data.requirement  || data.message     || data.requirementInquiry || data.inquiry || data.scope || "",
    "Message":                data.message      || data.yourMessage || data["Your Message"] || data["Message"] || "",
    "Message / Details":      data.message      || data.details     || data["Message"]      || "",
    "Status":                 data.status       || "New Lead",
    "Variant":                data.variant      || "Standard",
    "Submission ID":          data.submissionId || data.id          || ("TG_" + Date.now()),
    "Location":               data.location     || data.ipLocation  || data["Location"]     || data["IP Location"]  || "",
    "Source":                 data.source       || data.utmSource   || data["Source"]       || "Website Direct",
    "IP Location":            data.location     || data.ipLocation  || data["IP Location"]  || "",
    "IP Address":             data.ipAddress     || data.ip_address  || data["IP Address"]   || "",
    "Organization":           data.organization  || data.company     || data["Organization"] || "",
    "Session ID":             data.sessionId     || data["Session ID"]    || "",
    "Visitor ID":             data.visitorId     || data["Visitor ID"]    || "",
    "Page Path":              data.pagePath      || data["Page Path"]     || "",
    "Page Title":             data.pageTitle     || data["Page Title"]    || "",
    "Traffic Source":         data.trafficSource || data["Traffic Source"]|| "",
    "Page URL":               data.pageUrl       || data["Page URL"]      || "",
    "Duration (sec)":         data.duration      || data["Duration (sec)"]|| "",
    "Scroll Depth (%)":       data.scrollDepth   || data["Scroll Depth (%)"] || "",
    "Click Count":            data.clickCount    || data["Click Count"]   || "",
    "CTA Clicked":            data.ctaClicked    || data["CTA Clicked"]   || "",
    "Returning User":         data.returningUser || data["Returning User"]|| "",
    "Is Hot Lead":            data.isHotLead     || data["Is Hot Lead"]   || "",
    "UTM Source":             data.utmSource     || data.utm_source  || data["UTM Source"]   || "",
    "UTM Medium":             data.utmMedium     || data.utm_medium  || data["UTM Medium"]   || "",
    "UTM Campaign":           data.utmCampaign   || data.utm_campaign|| data["UTM Campaign"] || "",
    "UTM Term":               data.utmTerm       || data.utm_term    || data["UTM Term"]     || "",
    "UTM Content":            data.utmContent    || data.utm_content || data["UTM Content"]  || "",
    "Timestamp":              normalizeTimestamp(data.timestamp || data.Timestamp)
  };
  
  if (explicitMap.hasOwnProperty(header)) {
    var val = explicitMap[header];
    return (val !== null && typeof val === 'object') ? JSON.stringify(val) : (val === undefined ? "" : val);
  }
  
  var slug = header
    .replace(/\(.*?\)/g, '')
    .trim()
    .split(' ')
    .map(function(word, i) {
      if (i === 0) return word.charAt(0).toLowerCase() + word.slice(1);
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join('');
    
  var value = data[slug];
  if (value === undefined) value = data[header];
  if (value === undefined) value = "";
  
  return (value !== null && typeof value === 'object') ? JSON.stringify(value) : value;
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

function calculateDelta(cur, prev) {
  if (!prev || prev === 0) return cur > 0 ? "+100%" : "0.0%";
  var change = ((cur - prev) / prev) * 100;
  return (change >= 0 ? "+" : "") + change.toFixed(1) + "%";
}

function formatNum(num) {
  if (num === null || num === undefined || isNaN(num)) return "0";
  return Number(num).toLocaleString("en-IN");
}

function parseSheetDate(val) {
  if (!val) return null;
  if (val instanceof Date) return val;
  var str = String(val);
  if (str.match(/^\d{4}-\d{2}-\d{2}/)) {
    return new Date(str.substring(0, 10));
  }
  var match = str.match(/^(\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{4})/);
  if (match) {
    var months = {'Jan':0,'Feb':1,'Mar':2,'Apr':3,'May':4,'Jun':5,'Jul':6,'Aug':7,'Sep':8,'Oct':9,'Nov':10,'Dec':11};
    return new Date(match[3], months[match[2]], match[1]);
  }
  return new Date(str);
}

function normalizeTrafficSource(src, utmSrc) {
  var s = String(src || utmSrc || "").toLowerCase().trim();
  if (s.indexOf("google_ad") !== -1 || s.indexOf("cpc") !== -1 || s.indexOf("adwords") !== -1) return "Google Ads";
  if (s.indexOf("linkedin") !== -1) return "LinkedIn";
  if (s.indexOf("twitter") !== -1 || s.indexOf("x.com") !== -1) return "X / Twitter";
  if (s.indexOf("organic") !== -1 || s.indexOf("google") !== -1 || s.indexOf("search") !== -1) return "Organic Search";
  if (s.indexOf("referral") !== -1) return "Referral";
  return "Direct / Unknown";
}

function resolvePageName(path) {
  var clean = normalizeRoutePath(path);
  return clean;
}

// =========================================================================================
// 10. SETUP TRIGGERS & ONE-CLICK NOTIFICATION PREVIEW SUITE
// =========================================================================================

function setupAllProfitMachinesTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(t) { ScriptApp.deleteTrigger(t); });

  // 1. Daily Report at 8:30 AM IST
  ScriptApp.newTrigger("dailyReport")
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();

  // 2. Weekly Report on Friday at 8:30 AM IST
  ScriptApp.newTrigger("weeklyReport")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.FRIDAY)
    .atHour(8)
    .create();

  // 3. Monthly Report on 1st of month at 8:30 AM IST
  ScriptApp.newTrigger("monthlyReport")
    .timeBased()
    .onMonthDay(1)
    .atHour(8)
    .create();

  // 4. Monthly Career Applications Trigger on 1st of month at 9:00 AM IST
  ScriptApp.newTrigger("forwardMonthlyCareerApplications")
    .timeBased()
    .onMonthDay(1)
    .atHour(9)
    .create();

  console.log("All PROFIT MACHINES automation triggers successfully scheduled.");
}

/**
 * ⚠️ TEST-ONLY — MANUAL TRIGGER, NEVER SCHEDULED, NEVER TOUCHES REAL SHEET DATA.
 * Sends hardcoded [PREVIEW]-prefixed sample emails so a human can visually check the HTML
 * templates render correctly. It is NOT wired to setupAllProfitMachinesTriggers() and must never
 * be added to a time-based trigger — run it only manually from the Apps Script editor.
 * Real automated reports (dailyReport/weeklyReport/monthlyReport) always pull live data via
 * aggregateExecutiveReportData() and never call this function.
 */
function SEND_ALL_PROFIT_MACHINES_NOTIFICATION_PREVIEWS() {
  var recipients = EMAIL_CONFIG.reportEmails.join(",");
  var mockSheetUrl = "https://docs.google.com/spreadsheets/d/" + CONFIG.MAIN_SPREADSHEET_ID + "/edit";
  console.log("Dispatching all PROFIT MACHINES preview notifications to: " + recipients);

  var samplePdfBlob = Utilities.newBlob("Sample Candidate Resume - PROFIT MACHINES AI/ML Research Engineer", "application/pdf", "Poojasri_Resume.pdf");

  // 1. AI Diagnostic Sample (Consulting Sessions)
  var dData = {
    fullName: "Arjun Mehta",
    workEmail: "arjun.m@fintechcorp.com",
    companyName: "FinTech Corp Global",
    primaryAiStack: "LangChain, LlamaIndex, OpenAI GPT-4o",
    governancePriority: "Agent Hallucination Prevention & Audit Trails",
    timeline: "Immediate (Q3 Deployment)",
    location: "Bengaluru, India",
    ipAddress: "49.37.12.89",
    timestamp: new Date().toISOString()
  };
  var dMeta = getLeadCategoryMeta("AI_Diagnostic_Leads", dData);
  MailApp.sendEmail({
    to: recipients,
    subject: "[PREVIEW] " + dMeta.internalSubject,
    htmlBody: buildInternalLeadHtml(dMeta, dData, mockSheetUrl),
    name: EMAIL_CONFIG.name,
    replyTo: EMAIL_CONFIG.replyTo
  });

  // 2. Career Application Sample with Resume
  var cData = {
    name: "Poojasri",
    email: "poojasri.aram@gmail.com",
    phone: "+91 98765 43210",
    jobTitle: "AI/ML Governance & Red Teaming Engineer",
    coverLetter: "Passionate about autonomous agent safety, adversarial LLM testing, and building trustworthy AI architectures.",
    resumeFileName: "Poojasri_Resume.pdf",
    resumeDriveLink: "https://drive.google.com",
    location: "Hyderabad, India",
    ipAddress: "106.51.78.22",
    timestamp: new Date().toISOString()
  };
  var cMeta = getLeadCategoryMeta("Career_Applications", cData);
  MailApp.sendEmail({
    to: recipients,
    subject: "[PREVIEW] " + cMeta.internalSubject,
    htmlBody: buildInternalLeadHtml(cMeta, cData, mockSheetUrl),
    name: EMAIL_CONFIG.name,
    replyTo: EMAIL_CONFIG.replyTo,
    attachments: [samplePdfBlob]
  });

  // 3. Enterprise Contact Inquiry Sample (Consulting Sessions)
  var cntData = {
    name: "Vikram Malhotra",
    email: "vikram@enterprise-cloud.io",
    company: "Enterprise Cloud AI",
    subject: "EU AI Act Compliance & Model Security Audit",
    message: "We need comprehensive automated governance for 15 production LLM microservices.",
    location: "Mumbai, India",
    ipAddress: "115.112.45.10",
    timestamp: new Date().toISOString()
  };
  var cntMeta = getLeadCategoryMeta("Contact_Leads", cntData);
  MailApp.sendEmail({
    to: recipients,
    subject: "[PREVIEW] " + cntMeta.internalSubject,
    htmlBody: buildInternalLeadHtml(cntMeta, cntData, mockSheetUrl),
    name: EMAIL_CONFIG.name,
    replyTo: EMAIL_CONFIG.replyTo
  });

  // 4. Daily Analytics Report Sample (Merged Trend + Clean Top Engaged Pages)
  var dailyTrendLabels = ["00:00", "03:00", "06:00", "09:00", "12:00", "15:00", "18:00", "21:00"];
  var dailyTrendVisitors = [45, 28, 62, 185, 240, 195, 125, 60];
  var dailyTrendLeads = [0, 0, 1, 2, 3, 2, 1, 0];
  var dailyChartUrl = generateMergedTrendChartUrl(dailyTrendLabels, dailyTrendVisitors, dailyTrendLeads);

  var sampleDailyData = {
    periodType: "DAILY",
    periodDateStr: Utilities.formatDate(new Date(), "Asia/Kolkata", "d MMMM yyyy"),
    periodRangeStr: Utilities.formatDate(new Date(), "Asia/Kolkata", "d MMM yyyy"),
    kpis: {
      visitors: 842,
      sessions: 1120,
      leads: 9,
      enquiries: 14,
      conversionRate: "2.14%",
      topLeadSource: "Google Search (Organic)"
    },
    comparison: {
      visitorsDelta: "+18.4%",
      sessionsDelta: "+14.2%",
      leadsDelta: "+28.6%",
      enquiriesDelta: "+16.7%",
      prevVisitors: 711,
      prevLeads: 7,
      prevEnquiries: 12,
      prevConvRate: "1.98%"
    },
    trend: {
      labels: dailyTrendLabels,
      visitors: dailyTrendVisitors,
      leads: dailyTrendLeads,
      chartUrl: dailyChartUrl
    },
    formBreakdown: {
      "Quick Forms": 3,
      "Consulting Sessions": 6
    },
    sources: [
      { source: "Google / Organic", visitors: 420, leads: 5, enquiries: 7, convRate: "2.38%" },
      { source: "LinkedIn / Sponsored", visitors: 240, leads: 3, enquiries: 4, convRate: "2.50%" },
      { source: "Direct / Navigational", visitors: 112, leads: 1, enquiries: 2, convRate: "1.79%" },
      { source: "Twitter / X Referral", visitors: 70, leads: 0, enquiries: 1, convRate: "0.00%" }
    ],
    topPages: [
      { path: "/", views: 9, leads: 0 },
      { path: "/solutions/ai-infra-engineering", views: 8, leads: 0 },
      { path: "/solutions/ai-value-engineering", views: 5, leads: 0 },
      { path: "/solutions/ai-agentic-factory", views: 4, leads: 0 },
      { path: "/solutions/ai-cybersecurity-quantum-safe", views: 3, leads: 0 },
      { path: "/methodology-engine", views: 2, leads: 0 },
      { path: "/contact", views: 1, leads: 0 },
      { path: "/solutions/ai-networking", views: 1, leads: 0 }
    ],
    dashboardUrl: mockSheetUrl
  };
  var dailyHtml = buildExecutiveAnalyticsBriefHtml(sampleDailyData, "DAILY");
  MailApp.sendEmail({
    to: recipients,
    subject: "[PREVIEW] [PROFIT MACHINES] Daily Analytics Report - " + sampleDailyData.periodDateStr,
    htmlBody: dailyHtml,
    name: EMAIL_CONFIG.name,
    replyTo: EMAIL_CONFIG.replyTo
  });

  // 5. Weekly Analytics Report Sample (Merged Trend + Clean Top Engaged Pages)
  var now = new Date();
  var wStart = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  var weeklyTrendLabels = ["12 Sep", "13 Sep", "14 Sep", "15 Sep", "16 Sep", "17 Sep", "18 Sep"];
  var weeklyTrendVisitors = [680, 740, 810, 890, 920, 860, 720];
  var weeklyTrendLeads = [8, 9, 11, 12, 14, 10, 4];
  var weeklyChartUrl = generateMergedTrendChartUrl(weeklyTrendLabels, weeklyTrendVisitors, weeklyTrendLeads);

  var sampleWeeklyData = {
    periodType: "WEEKLY",
    periodDateStr: Utilities.formatDate(wStart, "Asia/Kolkata", "d MMM") + " - " + Utilities.formatDate(now, "Asia/Kolkata", "d MMM yyyy"),
    periodRangeStr: Utilities.formatDate(wStart, "Asia/Kolkata", "d MMM yyyy") + " - " + Utilities.formatDate(now, "Asia/Kolkata", "d MMM yyyy"),
    kpis: {
      visitors: 5620,
      sessions: 7840,
      leads: 68,
      enquiries: 94,
      conversionRate: "2.41%",
      topLeadSource: "Google Organic & LinkedIn Ads"
    },
    comparison: {
      visitorsDelta: "+24.8%",
      sessionsDelta: "+21.3%",
      leadsDelta: "+36.0%",
      enquiriesDelta: "+22.1%",
      prevVisitors: 4503,
      prevLeads: 50,
      prevEnquiries: 77,
      prevConvRate: "2.22%"
    },
    trend: {
      labels: weeklyTrendLabels,
      visitors: weeklyTrendVisitors,
      leads: weeklyTrendLeads,
      chartUrl: weeklyChartUrl
    },
    formBreakdown: {
      "Quick Forms": 26,
      "Consulting Sessions": 42
    },
    sources: [
      { source: "Google / Organic", visitors: 2680, leads: 34, enquiries: 46, convRate: "2.54%" },
      { source: "LinkedIn Ads / Enterprise", visitors: 1640, leads: 22, enquiries: 30, convRate: "2.68%" },
      { source: "Direct Traffic", visitors: 820, leads: 8, enquiries: 12, convRate: "1.95%" },
      { source: "Industry Newsletter & PR", visitors: 480, leads: 4, enquiries: 6, convRate: "1.67%" }
    ],
    topPages: [
      { path: "/", views: 64, leads: 5 },
      { path: "/solutions/ai-infra-engineering", views: 52, leads: 12 },
      { path: "/solutions/ai-value-engineering", views: 38, leads: 8 },
      { path: "/solutions/ai-agentic-factory", views: 31, leads: 6 },
      { path: "/solutions/ai-cybersecurity-quantum-safe", views: 24, leads: 4 },
      { path: "/methodology-engine", views: 18, leads: 2 },
      { path: "/contact", views: 14, leads: 1 },
      { path: "/solutions/ai-networking", views: 12, leads: 1 }
    ],
    dashboardUrl: mockSheetUrl
  };
  var weeklyHtml = buildExecutiveAnalyticsBriefHtml(sampleWeeklyData, "WEEKLY");
  MailApp.sendEmail({
    to: recipients,
    subject: "[PREVIEW] [PROFIT MACHINES] Weekly Analytics Report - " + sampleWeeklyData.periodRangeStr,
    htmlBody: weeklyHtml,
    name: EMAIL_CONFIG.name,
    replyTo: EMAIL_CONFIG.replyTo
  });

  console.log("All sample preview emails successfully sent to " + recipients);
}

// =========================================================================================
// 11. ONE-CLICK DATABASE INITIALIZATION SUITE
// =========================================================================================

/**
 * Creates and formats the exact 95-Column 'Live_Traffic_Events' Telemetry Sheet
 */
function initializeMasterTelemetrySheet() {
  var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  var sheet = findSheetFlexible(ss, "Live_Traffic_Events");
  if (!sheet) {
    sheet = ss.insertSheet("Live_Traffic_Events", 0);
  }
  sheet.clear();
  sheet.getRange(1, 1, 1, SCHEMA_95_HEADERS.length)
       .setValues([SCHEMA_95_HEADERS])
       .setFontWeight("bold")
       .setBackground("#060e22")
       .setFontColor("#38bdf8")
       .setHorizontalAlignment("center");
  sheet.setFrozenRows(1);
  try {
    sheet.autoResizeColumns(1, Math.min(30, SCHEMA_95_HEADERS.length));
  } catch (e) {}

  console.log("Successfully initialized 95-Column 'Live_Traffic_Events' Master Telemetry Sheet.");
}

/**
 * Pre-creates and formats all 20 dedicated database tabs in Sheet 1
 */
function initializeAllDatabaseTables() {
  var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  
  // 1. Initialize Master Telemetry
  initializeMasterTelemetrySheet();

  // 2. Initialize All Dedicated Lead & Event Tabs
  Object.keys(TAB_CONFIGS).forEach(function(tabKey) {
    if (tabKey === "Live_Traffic_Events") return;
    var tabName = tabKey.replace(/_/g, ' ');
    var sheet = findSheetFlexible(ss, tabKey) || findSheetFlexible(ss, tabName);
    if (!sheet) {
      sheet = ss.insertSheet(tabName);
    }
    if (sheet.getLastRow() === 0) {
      var headers = TAB_CONFIGS[tabKey];
      sheet.getRange(1, 1, 1, headers.length)
           .setValues([headers])
           .setFontWeight("bold")
           .setBackground("#0f172a")
           .setFontColor("#ffffff");
      sheet.setFrozenRows(1);
    }
  });

  console.log("All 20 Profit Machines database tabs initialized with enterprise styling.");
}


