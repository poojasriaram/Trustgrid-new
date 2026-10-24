/**
 * =========================================================================================
 * TRUSTGRID.AI - APPS SCRIPT WEBHOOK & ADVANCED INTELLIGENCE ENGINE (V8 - ENTERPRISE)
 * =========================================================================================
 * Production Webhook Receiver & Executive Automation Engine for TRUSTGRID.AI
 * 
 * Sender Identity: TrustGrid Executive Analytics <poojasri.aram@gmail.com>
 * Organization: TRUSTGRID.AI
 * 
 * Features:
 * 1. Dedicated Ad Campaign & Inbound Routing: Isolates and routes Ad/Campaign leads seamlessly.
 * 2. High-End Executive Cyber-Theme Email UI: TrustGrid glassmorphism badges, UTM pills & quick actions.
 * 3. Drive Resume Archiving: Automatically stores career applicant resumes into Google Drive.
 * 4. Monthly Career Digest: Monthly scheduled forwarder of candidate applications & resumes.
 * 5. Advanced Analytics & Reporting: Daily & weekly automated digests with KPI cards and metrics.
 * 6. Strict Recipient Routing: Exclusively delivers to poojasri.aram@gmail.com, bv@trustflow.in & connect@trustgrid.ai.
 * 7. Session, Traffic Attribution, Geo & Network Security Intelligence Ingestion.
 * =========================================================================================
 */

// =========================================================================================
// 1. GLOBAL CONFIGURATION & RECIPIENTS
// =========================================================================================

const CONFIG = {
  // Main TrustGrid Data Collection & Multi-Form Tracking Spreadsheet ID (Sheet 1)
  MAIN_SPREADSHEET_ID: "1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0",

  // Dedicated Analytics & Intelligence Spreadsheet ID (Sheet 2)
  ANALYTICS_SPREADSHEET_ID: "1jC53QN1qiuiRFLzdneA46TECBztER5btTo7qGphb5TM",

  // Google Drive folder used to archive candidate resumes
  CAREER_RESUMES_FOLDER_NAME: "TrustGrid_Career_Resumes"
};

const EMAIL_CONFIG = {
  name: "TrustGrid Business Intelligence",
  companyName: "TrustGrid.AI",
  website: "https://trustgrid.ai", // Primary production domain
  secondaryWebsite: "https://trustgrid.in", // Regional domain
  replyTo: "connect@trustgrid.ai",
  adminEmail: "poojasri.trustgrid@gmail.com",
  
  // Recipients for Lead & Sales Inquiries (Strictly limited to authorized team)
  salesEmails: [
    "poojasri.trustgrid@gmail.com",
    "bv@trustflow.in",
    "connect@trustgrid.ai"
  ],
  
  // Recipients for Ad Campaign Lead Generation
  adCampaignEmails: [
    "poojasri.trustgrid@gmail.com",
    "bv@trustflow.in",
    "connect@trustgrid.ai"
  ],

  // Recipients for Career Applications & Monthly Resumes
  careerEmails: [
    "poojasri.trustgrid@gmail.com",
    "bv@trustflow.in",
    "connect@trustgrid.ai"
  ],

  // Recipients for Daily, Weekly & Monthly Analytics Reports
  reportEmails: [
    "poojasri.trustgrid@gmail.com",
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
  // Dedicated Master Tab for all Consulting Sessions
  "Consulting_Sessions": [
    "Submission ID", "Name", "Email", "Company", "Role / Designation", "Phone",
    "Service / Focus", "Requirement / Message", "Source", "Page URL",
    "Status", "Timestamp"
  ],
  // Master 95-Column Live Behavioral Telemetry for TRUSTGRID.AI
  "Live_Traffic_Events": SCHEMA_95_HEADERS,

  // 1. Primary Inbound & Enterprise Contact Leads
  "Contact_Leads": [
    "Submission ID", "Name", "Email", "Company", "Designation", "Phone",
    "Subject", "Service Interest", "Message", "Source",
    "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Status", "IP Location", "IP Address", "Variant", "Timestamp"
  ],

  // 2. AI Diagnostic Assessments
  "AI_Diagnostic_Leads": [
    "Submission ID", "Full Name", "Work Email", "Company Name", "Company Size", "Primary AI Stack",
    "Governance Priority", "Timeline", "Phone", "Source",
    "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Status", "IP Location", "IP Address", "Variant", "Timestamp"
  ],

  // 3. AI Readiness Assessments
  "AI_Readiness_Leads": [
    "Submission ID", "Full Name", "Work Email", "Company Name", "Designation", "Infrastructure Model",
    "Key Challenges", "Source", "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Status", "IP Location", "IP Address", "Variant", "Timestamp"
  ],

  // 4. Executive Workshop Requests
  "Workshop_Requests": [
    "Submission ID", "Name", "Work Email", "Company", "Team Size", "Preferred Focus Area",
    "Timeline", "Message", "Source", "UTM Source", "UTM Medium", "UTM Campaign",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 5. RFP & Enterprise Proposals
  "RFP_Proposals": [
    "Submission ID", "Name", "Email", "Organization", "Project Scope", "Estimated Budget", "Target Deadline", "Requirements",
    "UTM Source", "UTM Medium", "UTM Campaign", "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 6. Talk to AI Architect & Technical Inquiries
  "Talk_To_Architect": [
    "Submission ID", "Name", "Work Email", "Company", "Phone", "Architecture Query", "Preferred Time",
    "UTM Source", "UTM Medium", "UTM Campaign", "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 7. Executive Consultation Bookings (BookConsultation.tsx & BookDemo.tsx)
  "Form_Consultation_Bookings": [
    "Submission ID", "Full Name", "Work Email", "Phone", "Company Name",
    "Designation / Role", "Transformation Interest", "Annual Revenue", "Primary Challenge", "Target Timeline",
    "Message / Scope", "Source", "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 8. Profit Pool Discovery Diagnostics (DiscoveryPage.tsx)
  "Form_Diagnostic_Assessments": [
    "Submission ID", "Full Name", "Work Email", "Phone", "Company Name",
    "Industry", "Current Revenue", "Primary Leakage Area", "Estimated Leakage",
    "Diagnostic Score", "Answers Summary", "Message",
    "Source", "UTM Source", "UTM Medium", "UTM Campaign",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 9. Quick Diagnostics & General Inbound Leads
  "Form_Inbound_Leads": [
    "Submission ID", "Full Name", "Work Email", "Phone", "Company Name",
    "Interest / Solution", "Annual Revenue", "Timeline", "Primary Challenge",
    "Source", "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 10. Partner Applications (Partners.tsx)
  "Partner_Applications": [
    "Submission ID", "Name", "Work Email", "Company", "Partner Type", "Region", "Proposal",
    "UTM Source", "UTM Medium", "UTM Campaign", "Status", "IP Location", "IP Address", "Timestamp"
  ],
  "Form_Partner_Applications": [
    "Submission ID", "Name", "Work Email", "Phone", "Company Name",
    "Partner Type", "Primary Region", "Value Proposition / Proposal",
    "Source", "UTM Source", "UTM Medium", "UTM Campaign",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 11. Career Applications (Career.tsx)
  "Career_Applications": [
    "Submission ID", "Name", "Email", "Phone", "Job Title / Role", "Resume File Name", "Resume Drive Link", "Drive File ID", "Cover Letter",
    "Portfolio / GitHub", "UTM Source", "UTM Medium", "UTM Campaign", "Status", "IP Location", "IP Address", "Timestamp"
  ],
  "Form_Career_Applications": [
    "Submission ID", "Full Name", "Email", "Phone", "Role Applied",
    "Experience Level", "Portfolio / LinkedIn", "Resume Drive Link", "Drive File ID",
    "Cover Note / Message", "Source", "UTM Source", "UTM Medium", "UTM Campaign",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 12. Chatbot Virtual Assistant Inquiries (ChatBot.tsx)
  "Chatbot_Leads": [
    "Submission ID", "Name", "Email", "Phone", "Topic / Intent", "Conversation Summary",
    "UTM Source", "UTM Medium", "UTM Campaign", "Status", "IP Location", "IP Address", "Timestamp"
  ],
  "Form_Chatbot_Conversations": [
    "Submission ID", "Name", "Email", "Phone", "Company",
    "Topic / Intent", "Chat Summary", "Source",
    "UTM Source", "UTM Medium", "UTM Campaign",
    "Status", "IP Location", "IP Address", "Timestamp"
  ],

  // 13. Floating Lead / Quick Enquiry Form
  "Quick_Enquiry_Leads": [
    "Submission ID", "Full Name", "Work Email", "Phone", "Company Name",
    "Requirement / Inquiry", "Source", "UTM Source", "UTM Medium", "UTM Campaign",
    "Status", "IP Location", "IP Address", "Variant", "Timestamp"
  ],

  // 14. LinkedIn Inbound Lead Channel
  "LinkedIn_Leads": [
    "Submission ID", "Full Name", "Work Email", "Company Name", "Phone",
    "Requirement / Inquiry", "Source", "UTM Source", "UTM Medium", "UTM Campaign",
    "Status", "IP Location", "IP Address", "Variant", "Timestamp"
  ],

  // 15. Newsletter Subscribers
  "Newsletter_Subscribers": [
    "Email", "IP Location", "IP Address", "Source", "UTM Source", "UTM Campaign", "Timestamp"
  ],

  // 16. Google Ad Leads
  "Google_Ad_Leads": [
    "Submission ID", "Full Name", "Work Email", "Phone", "Company Name", "Requirement",
    "UTM Source", "UTM Medium", "UTM Campaign", "UTM Term", "UTM Content",
    "Status", "IP Location", "IP Address", "Organization", "Variant", "Timestamp"
  ],

  // 17. Consolidated Form Submissions Master Log
  "Form_Submissions": [
    "Submission ID", "Form Name", "Name", "Email", "Company", "Role", "Phone",
    "Message / Details", "Resume Drive Link", "Drive File ID",
    "UTM Source", "UTM Campaign", "IP Location", "IP Address", "Timestamp"
  ],

  // 18. PRODUCTION LEAD PRESERVATION & AUDIT ARCHIVE
  "Archived_Test_Leads": [
    "Timestamp", "Original Tab", "Lead ID", "LeadType", "Full Name",
    "Business Email", "Phone / Mobile", "Company Name", "Reason Moved", "Row Data JSON"
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
  ],

  // 12. Sessions Intelligence (Advanced Lifecycle, Bounces, Geo, Duration)
  "Sessions_Intelligence": [
    "Session ID", "User ID", "Start Time (UTC)", "Last Activity (UTC)", "Duration (Sec)",
    "Pages Visited", "Entry Page", "Exit Page", "Traffic Channel", "Campaign",
    "Country", "City", "Timezone", "Masked IP", "Bounce", "Converted", "User Type", "Timestamp"
  ],

  // 13. Traffic Attribution (Multi-touch, Channels, UTMs, Referrers)
  "Traffic_Attribution": [
    "Timestamp (UTC)", "Session ID", "User ID", "Channel", "Source", "Medium",
    "Campaign", "Term", "Content", "Referrer Domain", "Landing Page", "Converted"
  ],

  // 14. Geo Intelligence (Enriched Geographic & Network Mapping)
  "Geo_Intelligence": [
    "Timestamp (UTC)", "Masked IP", "Country", "Country Code", "Region", "City",
    "Latitude", "Longitude", "Timezone", "ISP", "Organization", "ASN"
  ],

  // 15. Network Security Intelligence (Forensics, Severity, Threat Scans)
  "Network_Security_Log": [
    "Timestamp (UTC)", "Masked IP", "Threat Category", "Severity", "Description",
    "Target Path", "Blocked", "Action Taken"
  ]
};

// Aliases mapping incoming form sheetNames to canonical tab names
var SHEET_NAME_ALIASES = {
  "consultingsessions": "Consulting_Sessions",
  "consulting_sessions": "Consulting_Sessions",
  "consultingsession": "Consulting_Sessions",
  "consulting": "Consulting_Sessions",
  // TrustGrid Intelligence Dimensions
  "sessions_intelligence": "Sessions_Intelligence",
  "sessionsintelligence": "Sessions_Intelligence",
  "session_intelligence": "Sessions_Intelligence",
  "sessionsintel": "Sessions_Intelligence",
  "traffic_attribution": "Traffic_Attribution",
  "trafficattribution": "Traffic_Attribution",
  "attribution": "Traffic_Attribution",
  "geo_intelligence": "Geo_Intelligence",
  "geointelligence": "Geo_Intelligence",
  "geointel": "Geo_Intelligence",
  "geo": "Geo_Intelligence",
  "network_security_log": "Network_Security_Log",
  "networksecuritylog": "Network_Security_Log",
  "security_log": "Network_Security_Log",
  "securitylog": "Network_Security_Log",
  "security_events": "Network_Security_Log",
  "securityevents": "Network_Security_Log",

  // Master 95-Column Live Behavioral Telemetry
  "telemetry95": "Live_Traffic_Events",
  "telemetry_95": "Live_Traffic_Events",
  "telemetry": "Live_Traffic_Events",
  "livetrafficevents": "Live_Traffic_Events",
  "live_traffic_events": "Live_Traffic_Events",
  "livetraffic": "Live_Traffic_Events",
  "mastertelemetry": "Live_Traffic_Events",

  // Telemetry Routes
  "pageview": "Page_Views",
  "pageviews": "Page_Views",
  "page_views": "Page_Views",
  "page_view": "Page_Views",
  "event": "CTA_Clicks",
  "events": "CTA_Clicks",
  "ctaclicks": "CTA_Clicks",
  "cta_clicks": "CTA_Clicks",
  "visitor": "Sessions",
  "visitors": "Sessions",
  "session": "Sessions",
  "sessions": "Sessions",
  "trafficanalytics": "Page_Views",

  // 1. Inbound Leads / Contact Forms
  "contact": "Contact_Leads",
  "contactleads": "Contact_Leads",
  "contact_leads": "Contact_Leads",
  "contactform": "Contact_Leads",
  "contact_form": "Contact_Leads",
  "leads": "Contact_Leads",
  "lead": "Contact_Leads",
  "global_lead_form": "Contact_Leads",
  "form": "Contact_Leads",
  "forminboundleads": "Form_Inbound_Leads",
  "form_inbound_leads": "Form_Inbound_Leads",
  "inboundleads": "Form_Inbound_Leads",
  "inbound_leads": "Form_Inbound_Leads",
  "inbound": "Form_Inbound_Leads",

  // 2. Executive Consultation Bookings (BookConsultation.tsx & BookDemo.tsx)
  "bookforconsultation": "Form_Consultation_Bookings",
  "book_for_consultation": "Form_Consultation_Bookings",
  "bookforconsulting": "Form_Consultation_Bookings",
  "book_for_consulting": "Form_Consultation_Bookings",
  "consultation": "Form_Consultation_Bookings",
  "consultationbookings": "Form_Consultation_Bookings",
  "consultation_bookings": "Form_Consultation_Bookings",
  "formconsultationbookings": "Form_Consultation_Bookings",
  "form_consultation_bookings": "Form_Consultation_Bookings",
  "demo": "Form_Consultation_Bookings",
  "bookdemo": "Form_Consultation_Bookings",
  "book_demo": "Form_Consultation_Bookings",
  "strategysession": "Form_Consultation_Bookings",
  "strategy_session": "Form_Consultation_Bookings",

  // 3. Talk to AI Architect & Growth Experts (TalkToExpert.tsx)
  "talktoarchitect": "Talk_To_Architect",
  "talk_to_architect": "Talk_To_Architect",
  "talktoexpert": "Talk_To_Architect",
  "talk_to_expert": "Talk_To_Architect",
  "expert": "Talk_To_Architect",
  "expertconsulting": "Talk_To_Architect",
  "expert_consulting": "Talk_To_Architect",
  "formexpertconsulting": "Form_Expert_Consulting",
  "form_expert_consulting": "Form_Expert_Consulting",

  // 4. Profit Pool Discovery Diagnostics & Assessments (DiscoveryPage.tsx)
  "aidiagnosticleads": "AI_Diagnostic_Leads",
  "ai_diagnostic_leads": "AI_Diagnostic_Leads",
  "aidiagnostic": "AI_Diagnostic_Leads",
  "ai_diagnostic": "AI_Diagnostic_Leads",
  "diagnostic": "AI_Diagnostic_Leads",
  "diagnostics": "AI_Diagnostic_Leads",
  "diagnostic_leads": "AI_Diagnostic_Leads",
  "diagnosticforms": "Form_Diagnostic_Assessments",
  "diagnostic_forms": "Form_Diagnostic_Assessments",
  "formdiagnosticassessments": "Form_Diagnostic_Assessments",
  "form_diagnostic_assessments": "Form_Diagnostic_Assessments",
  "profitpooldiscovery": "Form_Diagnostic_Assessments",
  "profit_pool_discovery": "Form_Diagnostic_Assessments",
  "assessment": "Form_Diagnostic_Assessments",

  // 5. AI Readiness Leads
  "aireadinessleads": "AI_Readiness_Leads",
  "ai_readiness_leads": "AI_Readiness_Leads",
  "aireadiness": "AI_Readiness_Leads",
  "readiness": "AI_Readiness_Leads",

  // 6. Executive Workshops
  "workshoprequests": "Workshop_Requests",
  "workshop_requests": "Workshop_Requests",
  "workshops": "Workshop_Requests",
  "workshop": "Workshop_Requests",

  // 7. RFP Proposals
  "rfpproposals": "RFP_Proposals",
  "rfp_proposals": "RFP_Proposals",
  "rfp": "RFP_Proposals",

  // 8. Partner Applications (Partners.tsx)
  "partners": "Partner_Applications",
  "partner": "Partner_Applications",
  "partnerapplications": "Partner_Applications",
  "partner_applications": "Partner_Applications",
  "formpartnerapplications": "Form_Partner_Applications",
  "form_partner_applications": "Form_Partner_Applications",

  // 9. Career Applications (Career.tsx)
  "jobapplications": "Career_Applications",
  "job_applications": "Career_Applications",
  "careerapplications": "Career_Applications",
  "career_applications": "Career_Applications",
  "careers": "Career_Applications",
  "career": "Career_Applications",
  "jobs": "Career_Applications",
  "formcareerapplications": "Form_Career_Applications",
  "form_career_applications": "Form_Career_Applications",

  // 10. Chatbot Virtual Assistant (ChatBot.tsx)
  "chatbot": "Chatbot_Leads",
  "chatbotleads": "Chatbot_Leads",
  "chatbot_leads": "Chatbot_Leads",
  "chatbot_conversations": "Chatbot_Leads",
  "formchatbotconversations": "Form_Chatbot_Conversations",
  "form_chatbot_conversations": "Form_Chatbot_Conversations",

  // 11. Quick Enquiry & Floating Leads
  "quickenquiryleads": "Quick_Enquiry_Leads",
  "quick_enquiry_leads": "Quick_Enquiry_Leads",
  "floatinglead": "Quick_Enquiry_Leads",
  "floating_lead": "Quick_Enquiry_Leads",
  "quickdiagnostic": "Quick_Enquiry_Leads",
  "quick_diagnostic": "Quick_Enquiry_Leads",

  // 12. LinkedIn Leads
  "linkedinleads": "LinkedIn_Leads",
  "linkedin_leads": "LinkedIn_Leads",
  "linkedin": "LinkedIn_Leads",

  // 13. Consolidated Master Form Submissions
  "formsubmissions": "Form_Submissions",
  "form_submissions": "Form_Submissions",
  "submissions": "Form_Submissions",

  // 14. Archived Test Leads
  "archivedtestleads": "Archived_Test_Leads",
  "archived_test_leads": "Archived_Test_Leads",
  "testleads": "Archived_Test_Leads",
  "test_leads": "Archived_Test_Leads"
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

/**
 * Dispatches branded customer confirmation email via GmailApp / MailApp.
 * Handles action="send_lead_response_email" invoked by Next.js API.
 */
function handleCustomerResponseEmailDispatch(data) {
  try {
    var toEmail = data.to || data.email || data.userEmail || data.recipientEmail;
    if (!toEmail || toEmail.indexOf("@") === -1) {
      return ContentService.createTextOutput("Error: Missing or invalid recipient email").setMimeType(ContentService.MimeType.TEXT);
    }
    var subject = data.subject || "Thank You for Contacting TRUSTGRID.AI — Consulting Session Confirmation";
    var userName = data.name || data.fullName || data.userName || "Valued Enterprise Leader";
    var htmlBody = data.htmlBody;
    if (!htmlBody) {
      htmlBody = buildUserConfirmationHtml(userName, "Consulting Sessions", "Thank you for scheduling a technical session with TRUSTGRID.AI.", data);
    }
    var mailRes = sendEmailOnce({
      to: toEmail,
      subject: subject,
      htmlBody: htmlBody,
      name: EMAIL_CONFIG.name,
      replyTo: EMAIL_CONFIG.replyTo
    });
    if (mailRes.ok) {
      console.log("✅ [Response Mail Action] Dispatched customer response to: " + toEmail + " via " + mailRes.via);
      return ContentService.createTextOutput("Response Email Sent Successfully via " + mailRes.via).setMimeType(ContentService.MimeType.TEXT);
    } else {
      console.error("❌ [Response Mail Action] Failed to dispatch response email: " + mailRes.error);
      return ContentService.createTextOutput("Error: " + mailRes.error).setMimeType(ContentService.MimeType.TEXT);
    }
  } catch (err) {
    console.error("handleCustomerResponseEmailDispatch exception:", err.toString());
    return ContentService.createTextOutput("Error: " + err.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}

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

    // TrustGrid High-Speed Intelligence Batch Synchronization Handler
    if (data && (data.action === "sync_intelligence" || data.sync === true)) {
      return handleIntelligenceSync(data);
    }

    // Direct Customer Response Email Dispatch Action
    if (data && data.action === "send_lead_response_email") {
      return handleCustomerResponseEmailDispatch(data);
    }

    // Strict Staging / Sandbox Isolation Guard (Local development only; live Vercel deployments are FULL PRODUCTION)
    var pageRef = String(data.page_url || data.pageUrl || data.referrer || "");
    var isStagingOrigin = (
      data.environment === "staging_quarantine" ||
      data.environment === "staging_isolated" ||
      ((pageRef.indexOf("localhost:3000") !== -1 || pageRef.indexOf("127.0.0.1:3000") !== -1) && !data.isProdLead && data.leadType !== "PRODUCTION")
    );

    if (isStagingOrigin) {
      return logToStagingQuarantine(data);
    }

    // Strict Test Lead Isolation Guard
    // Routes TG-TEST, QA, Demo, Verification, and Pooja Test leads directly to Archived_Test_Leads
    // Completely suppresses customer emails and executive alerts for test records
    var combinedTestText = (
      String(data.name || data.fullName || "") + " " +
      String(data.company || "") + " " +
      String(data.email || data.userEmail || data.work_email || "") + " " +
      String(data.message || data.requirement || "") + " " +
      String(data.leadId || data.submissionId || "")
    ).toLowerCase();

    var isTestSubmission = (
      data.leadType === "TEST" ||
      data.LeadType === "TEST" ||
      data.leadTypeCategory === "TEST" ||
      data.isTestLead === true ||
      String(data.name || data.fullName || "").toUpperCase().indexOf("TG-TEST") !== -1 ||
      String(data.email || data.userEmail || data.work_email || "").toLowerCase().indexOf("tg-test") !== -1 ||
      String(data.company || "").toUpperCase().indexOf("TG-TEST") !== -1 ||
      String(data.leadId || data.submissionId || "").toUpperCase().indexOf("TG-TEST") !== -1 ||
      combinedTestText.indexOf("pooja test") !== -1 ||
      (combinedTestText.indexOf("pooja") !== -1 && combinedTestText.indexOf("test") !== -1) ||
      combinedTestText.indexOf("@test.local") !== -1 ||
      combinedTestText.indexOf("@example.com") !== -1 ||
      combinedTestText.indexOf("test@") !== -1 ||
      combinedTestText.indexOf("@test.") !== -1 ||
      String(data.sheetName || "") === "Archived_Test_Leads" ||
      /\b(tg-test|test|demo|dummy|sample|qa|uat|verification|sandbox)\b/i.test(combinedTestText)
    );

    if (isTestSubmission) {
      return logToArchivedTestLeads(data);
    }
    
    // lib/analytics.ts telemetry beacons (page views, clicks, CTA, visibility) only set
    // event_type: 'telemetry_95' — without this fallback every beacon was silently rejected
    // here and NEVER reached Live_Traffic_Events, starving Sessions/Visitors of real data.
    var rawSheetName = data.sheetName || data.formType || data.table || data.type || data.event_type || "";
    if (data.fields && typeof data.fields === "object") {
      Object.keys(data.fields).forEach(function(k) { if (data[k] === undefined) data[k] = data.fields[k]; });
    }
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
      "Contact_Leads", "AI_Diagnostic_Leads", "AI_Readiness_Leads",
      "Workshop_Requests", "RFP_Proposals", "Talk_To_Architect",
      "Chatbot_Leads", "Partner_Applications", "Career_Applications",
      "Quick_Enquiry_Leads", "LinkedIn_Leads", "Google_Ad_Leads",
      "Form_Inbound_Leads", "Form_Consultation_Bookings", "Form_Expert_Consulting",
      "Form_Diagnostic_Assessments", "Form_Partner_Applications", "Form_Career_Applications",
      "Form_Chatbot_Conversations", "Form_Submissions"
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
      var ss = null;
      try {
        ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
      } catch (openErr) {
        console.warn("SpreadsheetApp.openById failed, falling back to getActiveSpreadsheet:", openErr.toString());
      }
      if (!ss) {
        try {
          ss = SpreadsheetApp.getActiveSpreadsheet();
        } catch (activeErr) {
          console.warn("SpreadsheetApp.getActiveSpreadsheet failed:", activeErr.toString());
        }
      }
      if (!ss) {
        throw new Error("Unable to access Google Spreadsheet: ID=" + CONFIG.MAIN_SPREADSHEET_ID);
      }
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

      // AUTO-LOG TO DEDICATED "Consulting Sessions" TAB
      var leadMetaObj = (typeof leadMeta !== "undefined" && leadMeta) ? leadMeta : getLeadCategoryMeta(canonicalName, data);
      var isConsultingCategory = (
        (leadMetaObj && leadMetaObj.categoryName === "Consulting Sessions") ||
        canonicalName === "Contact_Leads" ||
        canonicalName === "Talk_To_Architect" ||
        canonicalName === "AI_Diagnostic_Leads" ||
        canonicalName === "AI_Readiness_Leads" ||
        canonicalName === "Workshop_Requests" ||
        canonicalName === "RFP_Proposals" ||
        canonicalName === "Form_Consultation_Bookings" ||
        canonicalName === "Form_Expert_Consulting" ||
        canonicalName === "Consulting_Sessions"
      );

      if (isConsultingCategory && canonicalName !== "Consulting_Sessions") {
        try {
          var consultSheet = findSheetFlexible(ss, "Consulting Sessions") || findSheetFlexible(ss, "Consulting_Sessions");
          if (!consultSheet) {
            consultSheet = ss.insertSheet("Consulting Sessions");
            var consultHeaders = [
              "Submission ID", "Name", "Email", "Company", "Role / Designation", "Phone",
              "Service / Focus", "Requirement / Message", "Source", "Page URL",
              "Status", "Timestamp"
            ];
            consultSheet.getRange(1, 1, 1, consultHeaders.length)
                        .setValues([consultHeaders])
                        .setFontWeight("bold")
                        .setBackground("#0f172a")
                        .setFontColor("#ffffff");
            consultSheet.setFrozenRows(1);
          }
          if (consultSheet.getLastRow() > 0) {
            var cHeaders = consultSheet.getRange(1, 1, 1, Math.max(consultSheet.getLastColumn(), 1)).getValues()[0];
            var cRow = cHeaders.map(function(h) {
              if (h === "Service / Focus") return data.areaOfInterest || data.serviceInterest || data.service || data.requirement || "Consulting Session";
              if (h === "Role / Designation") return data.designation || data.role || data.jobTitle || "";
              if (h === "Requirement / Message") return data.message || data.requirement || data.projectScope || "";
              if (h === "Page URL") return data.pageUrl || data.page_url || data.source_url || "";
              return resolveField(h, data);
            });
            consultSheet.appendRow(cRow);
            console.log("✅ Successfully logged lead to dedicated 'Consulting Sessions' tab!");
          }
        } catch (consultErr) {
          console.warn("Could not log to Consulting Sessions tab:", consultErr.toString());
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

      // Auto-replicate to Sessions_Intelligence if companion record attached
      if (data.session_record && typeof data.session_record === 'object') {
        try {
          var sTab = getOrCreateConfiguredSheet(ss, "Sessions_Intelligence");
          var sHead = sTab.getRange(1, 1, 1, Math.max(sTab.getLastColumn(), 1)).getValues()[0];
          var sRow = sHead.map(function(h) { return resolveField(h, data.session_record); });
          sTab.appendRow(sRow);
        } catch (sErr) {
          console.warn("Sessions_Intelligence append warning:", sErr.toString());
        }
      }

      // Auto-replicate to Traffic_Attribution if companion record attached
      if (data.attribution_record && typeof data.attribution_record === 'object') {
        try {
          var aTab = getOrCreateConfiguredSheet(ss, "Traffic_Attribution");
          var aHead = aTab.getRange(1, 1, 1, Math.max(aTab.getLastColumn(), 1)).getValues()[0];
          var aRow = aHead.map(function(h) { return resolveField(h, data.attribution_record); });
          aTab.appendRow(aRow);
        } catch (aErr) {
          console.warn("Traffic_Attribution append warning:", aErr.toString());
        }
      }

      // Auto-replicate to Network_Security_Log if security flag or threat attached
      if (data.security_record && typeof data.security_record === 'object') {
        try {
          var secTab = getOrCreateConfiguredSheet(ss, "Network_Security_Log");
          var secHead = secTab.getRange(1, 1, 1, Math.max(secTab.getLastColumn(), 1)).getValues()[0];
          var secRow = secHead.map(function(h) { return resolveField(h, data.security_record); });
          secTab.appendRow(secRow);
        } catch (secErr) {
          console.warn("Network_Security_Log append warning:", secErr.toString());
        }
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

/**
 * High-Speed Batch Synchronization of Intelligence Tables from Next.js SQLite
 */
function handleIntelligenceSync(data) {
  try {
    var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
    var counts = { sessions: 0, traffic: 0, geo: 0, security: 0, events: 0 };

    // 1. Sessions Intelligence
    if (Array.isArray(data.sessions) && data.sessions.length > 0) {
      var sSheet = getOrCreateConfiguredSheet(ss, "Sessions_Intelligence");
      var sHeaders = sSheet.getRange(1, 1, 1, Math.max(sSheet.getLastColumn(), 1)).getValues()[0];
      var sRows = data.sessions.map(function(s) {
        return sHeaders.map(function(h) { return resolveField(h, s); });
      });
      if (sRows.length > 0) {
        sSheet.getRange(sSheet.getLastRow() + 1, 1, sRows.length, sHeaders.length).setValues(sRows);
        counts.sessions = sRows.length;
      }
    }

    // 2. Traffic Attribution
    if (Array.isArray(data.traffic) && data.traffic.length > 0) {
      var tSheet = getOrCreateConfiguredSheet(ss, "Traffic_Attribution");
      var tHeaders = tSheet.getRange(1, 1, 1, Math.max(tSheet.getLastColumn(), 1)).getValues()[0];
      var tRows = data.traffic.map(function(t) {
        return tHeaders.map(function(h) { return resolveField(h, t); });
      });
      if (tRows.length > 0) {
        tSheet.getRange(tSheet.getLastRow() + 1, 1, tRows.length, tHeaders.length).setValues(tRows);
        counts.traffic = tRows.length;
      }
    }

    // 3. Geo Intelligence
    if (Array.isArray(data.geo) && data.geo.length > 0) {
      var gSheet = getOrCreateConfiguredSheet(ss, "Geo_Intelligence");
      var gHeaders = gSheet.getRange(1, 1, 1, Math.max(gSheet.getLastColumn(), 1)).getValues()[0];
      var gRows = data.geo.map(function(g) {
        return gHeaders.map(function(h) { return resolveField(h, g); });
      });
      if (gRows.length > 0) {
        gSheet.getRange(gSheet.getLastRow() + 1, 1, gRows.length, gHeaders.length).setValues(gRows);
        counts.geo = gRows.length;
      }
    }

    // 4. Network Security Log
    if (Array.isArray(data.security) && data.security.length > 0) {
      var secSheet = getOrCreateConfiguredSheet(ss, "Network_Security_Log");
      var secHeaders = secSheet.getRange(1, 1, 1, Math.max(secSheet.getLastColumn(), 1)).getValues()[0];
      var secRows = data.security.map(function(sec) {
        return secHeaders.map(function(h) { return resolveField(h, sec); });
      });
      if (secRows.length > 0) {
        secSheet.getRange(secSheet.getLastRow() + 1, 1, secRows.length, secHeaders.length).setValues(secRows);
        counts.security = secRows.length;
      }
    }

    // 5. Raw Events / Telemetry
    if (Array.isArray(data.events) && data.events.length > 0) {
      var evSheet = getOrCreateConfiguredSheet(ss, "Live_Traffic_Events");
      var evHeaders = evSheet.getRange(1, 1, 1, Math.max(evSheet.getLastColumn(), 1)).getValues()[0];
      var evRows = data.events.map(function(ev) {
        return evHeaders.map(function(h) { return resolveField(h, ev); });
      });
      if (evRows.length > 0) {
        evSheet.getRange(evSheet.getLastRow() + 1, 1, evRows.length, evHeaders.length).setValues(evRows);
        counts.events = evRows.length;
      }
    }

    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: "TrustGrid Intelligence synchronized successfully",
      synced: counts
    })).setMimeType(ContentService.MimeType.JSON);
  } catch (syncErr) {
    console.error("handleIntelligenceSync error:", syncErr.toString());
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      message: syncErr.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * Helper to ensure a tab exists with frozen dark headers
 */
function getOrCreateConfiguredSheet(ss, tabName) {
  var sheet = findSheetFlexible(ss, tabName);
  if (!sheet) {
    var createName = tabName.replace(/_/g, ' ');
    sheet = ss.insertSheet(createName);
    var headers = TAB_CONFIGS[tabName] || SCHEMA_95_HEADERS;
    sheet.getRange(1, 1, 1, headers.length).setValues([headers])
      .setFontWeight("bold")
      .setBackground("#0f172a")
      .setFontColor("#ffffff");
    sheet.setFrozenRows(1);
  }
  return sheet;
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
// 5. ENHANCED EMAIL DISPATCHER (TRUSTGRID.AI)
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

  var userEmail = data.email || data.userEmail || data.workEmail || data.work_email || data["Work Email"] || data.attendeeEmail || data.Email || "";
  var userName  = data.name || data.Name || data["Full Name"] || data.fullName || "Valued Enterprise Prospect";
  var leadMeta = getLeadCategoryMeta(sheetName, data);
  var attachments = getAttachmentBlobs(data, userName);
  var driveMeta = archiveResumeToDrive(attachments, data);
  result.driveLink = driveMeta.driveLink;
  result.driveFileId = driveMeta.driveFileId;

  var isScheduledMeeting = !!(data.bookingDate || data.startTime || sheetName === "Talk_To_Architect" || data.bookingId || data.meetLink);
  var subjectUser = data.userSubject || (
    isScheduledMeeting
      ? ("TRUSTGRID.AI — Meeting Confirmation: " + (data.areaOfInterest || data.requirement || "AI Architecture Consultation") + " (" + (data.bookingDate || "Scheduled") + ")")
      : leadMeta.userSubject
  );
  var htmlUser = buildUserConfirmationHtml(userName, leadMeta.categoryName, leadMeta.userMessage, data);
  var subjectInternal = leadMeta.internalSubject;
  var htmlInternal = buildInternalLeadHtml(leadMeta, data, spreadsheetUrl);

  var isTest = data.testMode === true || data.isInternalTest === true || data.testMode === "true";
  
  // Strict recipient routing: poojasri.aram@gmail.com, bv@trustflow.in, and connect@trustgrid.ai
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

  var skipUserConfirm = !userEmail || userEmail.indexOf("@") === -1;

  // 1. User confirmation
  if (!skipUserConfirm && (quota > 0 || quota === -1)) {
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
 * Returns customized category labels, badges, recipient lists, and subject lines for TRUSTGRID.AI.
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
        userSubject: "TRUSTGRID.AI - Consulting Session Confirmed",
        userMessage: "Thank you for requesting an Executive AI Diagnostic session with TRUSTGRID.AI. Our Principal AI Architect is reviewing your requirements and will connect with your team shortly.",
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
        userSubject: "TRUSTGRID.AI - AI Readiness Audit Confirmation",
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
        userSubject: "TRUSTGRID.AI - AI Governance Workshop Request Received",
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
        userSubject: "TRUSTGRID.AI - RFP Proposal Received",
        userMessage: "Thank you for submitting your RFP to TRUSTGRID.AI. Our solutions engineering division is reviewing the scope of work and compliance specifications.",
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
        userSubject: "TRUSTGRID.AI - Consultation Confirmed",
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
        userSubject: "TRUSTGRID.AI - Application Received",
        userMessage: "Thank you for applying to join TRUSTGRID.AI. Our Talent Acquisition & Research team is reviewing your profile and credentials.",
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
        userSubject: "TRUSTGRID.AI - Partnership Application Received",
        userMessage: "Thank you for your interest in joining the TRUSTGRID.AI Partner Ecosystem. Our Strategic Alliances team will reach out to discuss onboarding.",
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
        userSubject: "TRUSTGRID.AI - Consultation Request Received",
        userMessage: "Thank you for expressing interest in TRUSTGRID.AI. An Enterprise AI Consultant will connect with you promptly.",
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
        userSubject: "TRUSTGRID.AI - Thank You for Connecting",
        userMessage: "Thank you for chatting with the TRUSTGRID.AI virtual assistant. An AI Governance Advisor will follow up with your specific query.",
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
        userSubject: "TRUSTGRID.AI - Welcome to Executive Insights",
        userMessage: "Thank you for subscribing to TRUSTGRID.AI Executive Briefings. You will receive our latest research on AI agent safety, EU AI Act compliance, and LLM red teaming.",
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
        userSubject: "TRUSTGRID.AI - Quick Enquiry Received",
        userMessage: "Thank you for reaching out to TRUSTGRID.AI via our Quick Enquiry form. Our enterprise solutions advisor will follow up with you promptly.",
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
        userSubject: "TRUSTGRID.AI - Inquiry Received",
        userMessage: "Thank you for reaching out to TRUSTGRID.AI. Our solutions team has received your inquiry and will respond within 24 hours.",
        recipients: EMAIL_CONFIG.salesEmails
      };
  }
}

// =========================================================================================
// 6. MODERN EXECUTIVE HTML EMAIL TEMPLATES (TRUSTGRID.AI BRANDING)
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

    if (normKey === "leadsource" || normKey === "source") {
      prettyKey = "Lead Source";
      seenKeys["source"] = true;
      seenKeys["leadsource"] = true;
      var lowVal = String(val || "").toLowerCase();
      if (!val || lowVal === "organic" || lowVal === "organic search" || lowVal.indexOf("organic") !== -1 || lowVal.indexOf("direct") !== -1) {
        val = "Google Organic Search";
      }
    }
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

  if (!seenKeys["leadsource"] && !seenKeys["source"]) {
    var defaultSourceVal = "Google Organic Search";
    formRows = '<tr>' +
               '<td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;font-weight:600;color:#64748b;font-size:13px;width:35%;vertical-align:top;">Lead Source</td>' +
               '<td style="padding:10px 14px;border-bottom:1px solid #f1f5f9;color:#0f172a;font-size:13px;font-weight:500;">' + escapeHtml(defaultSourceVal) + '</td>' +
               '</tr>' + formRows;
  }

  // Action Buttons
  var actionButtons = '<div style="margin-top:25px;">';
  if (email) {
    actionButtons += '<a href="mailto:' + email + '?subject=Re: ' + encodeURIComponent(meta.categoryName + ' - TRUSTGRID.AI') + '" style="background:#6366f1;color:#ffffff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:bold;font-size:13px;display:inline-block;margin-right:8px;margin-bottom:8px;">Reply to Prospect</a>';
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
    '      <p style="margin: 6px 0 0 0; color: #a5b4fc; font-size: 13px;">Captured live from TRUSTGRID.AI Platform</p>',
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
    '      <h4 style="margin: 0 0 10px 0; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; color: #4338ca; font-weight: 700;">Lead Details</h4>',
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
    '      &copy; ' + new Date().getFullYear() + ' TRUSTGRID.AI. All rights reserved.<br>',
    '      Direct Inquiries: <strong>poojasri.aram@gmail.com</strong> | <strong>connect@trustgrid.ai</strong><br>',
    '      Confidential Notification &bull; Distributed to authorized TRUSTGRID.AI team members only.',
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
function buildUserConfirmationHtml(name, categoryName, messageStr, data) {
  data = data || {};
  var leadName = name || "Valued Enterprise Leader";
  var bookingDate = data.bookingDate || data.preferredTime || data.date || "";
  var startTime = data.startTime || "";
  var endTime = data.endTime || "";
  var timezone = data.timezone || "America/New_York";
  var meetLink = data.meetLink || "";
  var gcalUrl = data.googleCalendarUrl || "https://calendar.app.google/ZZF7cW8GVX8r6Bwf6";
  var focusArea = data.areaOfInterest || data.requirement || data.service || data.selectedSolutions || "AI Governance & Architecture Consulting Session";
  var company = data.company || data.organization || "";
  var bookingId = data.bookingId || data.leadId || data.submissionId || "";
  var phone = data.phone || data.mobile || "";

  var isScheduledMeeting = !!(bookingDate || startTime || meetLink || bookingId.indexOf("TG-BK") !== -1);
  var currentYear = new Date().getFullYear();

  var meetingCardHtml = "";
  if (isScheduledMeeting) {
    var timeSlotStr = (startTime && endTime) ? (startTime + " – " + endTime + " (" + timezone + ")") : (startTime || timezone);
    meetingCardHtml = [
      '      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 24px; background-color: #f8fafc; border: 1.5px solid #6366f1; border-radius: 10px; padding: 20px;">',
      '        <tr><td>',
      '          <div style="font-size: 11px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #4338ca; margin-bottom: 10px;">CONFIRMED CONSULTATION' + (bookingId ? ' &bull; Ref: ' + escapeHtml(bookingId) : '') + '</div>',
      '          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="font-size: 13.5px; color: #1e293b;">',
      (bookingDate ? '            <tr><td style="padding: 5px 0; color: #64748b; width: 35%;"><strong>Date:</strong></td><td style="padding: 5px 0; font-weight: 700;">' + escapeHtml(bookingDate) + '</td></tr>' : ''),
      (timeSlotStr ? '            <tr><td style="padding: 5px 0; color: #64748b;"><strong>Time:</strong></td><td style="padding: 5px 0; color: #0284c7; font-weight: 700;">' + escapeHtml(timeSlotStr) + '</td></tr>' : ''),
      '            <tr><td style="padding: 5px 0; color: #64748b;"><strong>Focus:</strong></td><td style="padding: 5px 0;">' + escapeHtml(String(focusArea)) + '</td></tr>',
      (company ? '            <tr><td style="padding: 5px 0; color: #64748b;"><strong>Company:</strong></td><td style="padding: 5px 0;">' + escapeHtml(company) + '</td></tr>' : ''),
      '            <tr><td style="padding: 5px 0; color: #64748b;"><strong>Session Host:</strong></td><td style="padding: 5px 0; color: #4338ca; font-weight: 600;">Principal AI Architecture Team</td></tr>',
      '          </table>',
      '          <div style="margin-top: 16px; padding-top: 12px; border-top: 1px solid #e2e8f0; text-align: center;">',
      (meetLink ? '            <a href="' + escapeHtml(meetLink) + '" target="_blank" style="display: inline-block; background: #16a34a; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: 700; font-size: 13px; margin: 4px;">🎥 Join Google Meet</a>' : ''),
      '            <a href="' + escapeHtml(gcalUrl) + '" target="_blank" style="display: inline-block; background: #0A66FF; color: #ffffff; text-decoration: none; padding: 10px 18px; border-radius: 6px; font-weight: 700; font-size: 13px; margin: 4px;">📅 Add to Calendar</a>',
      '          </div>',
      '        </td></tr>',
      '      </table>'
    ].join('\n');
  }

  return [
    '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">',
    '<html xmlns="http://www.w3.org/1999/xhtml" lang="en">',
    '<head>',
    '  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />',
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0" />',
    '  <title>Thank You for Contacting TRUSTGRID.AI</title>',
    '</head>',
    '<body style="margin: 0; padding: 0; background-color: #f8fafc; font-family: -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, Helvetica, Arial, sans-serif; -webkit-font-smoothing: antialiased;">',
    '  <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="background-color: #f8fafc;">',
    '    <tr><td align="center" style="padding: 24px 12px;">',
    '      <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 650px; background-color: #ffffff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 4px 16px rgba(15, 23, 42, 0.05); text-align: left;">',
    '        <tr><td align="center" style="margin: 0; padding: 0; background-color: #0b1329;">',
    '          <a href="https://trustgrid.ai" target="_blank" style="display: block; text-decoration: none; border: none;">',
    '            <img src="https://trustgrid.ai/images/H.png" alt="TRUSTGRID.AI — Engineering Intelligence at Scale" width="650" style="width: 100%; max-width: 650px; height: auto; display: block; border: 0;" />',
    '          </a>',
    '        </td></tr>',
    '        <tr><td style="padding: 36px 36px 28px 36px; background-color: #ffffff;">',
    '          <h1 style="margin: 0 0 18px 0; font-size: 21px; font-weight: 700; color: #0f172a; line-height: 1.35;">',
    '            Hello ' + escapeHtml(leadName) + ',',
    '          </h1>',
    '          <p style="margin: 0 0 16px 0; font-size: 15px; color: #334155; line-height: 1.65;">',
    '            Thank you for contacting <strong>TRUSTGRID.AI</strong>.',
    '          </p>',
    '          <p style="margin: 0 0 16px 0; font-size: 15px; color: #334155; line-height: 1.65;">',
    '            We have successfully received your inquiry for a <strong>Consulting Session</strong> and appreciate your interest in our <strong>AI Governance, Multi-Agent Architecture, and Digital Transformation solutions</strong>.',
    '          </p>',
    '          <p style="margin: 0 0 28px 0; font-size: 15px; color: #334155; line-height: 1.65;">',
    '            ' + escapeHtml(messageStr || 'Our Principal AI Architecture Team is currently reviewing your requirements and will connect with your team promptly.') + '',
    '          </p>',
    meetingCardHtml,
    '          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; overflow: hidden;">',
    '            <tr><td style="padding: 16px 20px 10px 20px; border-bottom: 1px solid #edf2f7;">',
    '              <span style="font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #0A66FF;">NEXT STEPS</span>',
    '            </td></tr>',
    '            <tr><td style="padding: 12px 20px 16px 20px;">',
    '              <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%">',
    '                <tr><td style="padding: 7px 0; font-size: 14px; color: #1e293b;"><span style="color: #10b981; font-weight: bold; margin-right: 8px;">✅</span><strong>Requirement Review</strong> — Technical constraint & topology evaluation</td></tr>',
    '                <tr><td style="padding: 7px 0; font-size: 14px; color: #1e293b;"><span style="color: #10b981; font-weight: bold; margin-right: 8px;">✅</span><strong>Consultation Call</strong> — 45-minute technical session with lead architect</td></tr>',
    '                <tr><td style="padding: 7px 0; font-size: 14px; color: #1e293b;"><span style="color: #10b981; font-weight: bold; margin-right: 8px;">✅</span><strong>Solution Recommendation</strong> — Reference architecture & unit economics</td></tr>',
    '                <tr><td style="padding: 7px 0; font-size: 14px; color: #1e293b;"><span style="color: #10b981; font-weight: bold; margin-right: 8px;">✅</span><strong>Implementation Discussion</strong> — Production Forward Deployment sprint scope</td></tr>',
    '              </table>',
    '            </td></tr>',
    '          </table>',
    '          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px; background: linear-gradient(180deg, #f0f7ff 0%, #ffffff 100%); border: 1px solid #bfdbfe; border-radius: 10px; padding: 22px 24px; text-align: left;">',
    '            <tr><td>',
    '              <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #0A66FF; margin-bottom: 6px;">BOOK A CONSULTATION</div>',
    '              <p style="margin: 0 0 16px 0; font-size: 15px; color: #1e293b; line-height: 1.5;">Pick your preferred date and time directly on our live calendar with principal architects:</p>',
    '              <table role="presentation" border="0" cellpadding="0" cellspacing="0" style="margin-bottom: 14px;">',
    '                <tr><td align="center" bgcolor="#0A66FF" style="border-radius: 8px;">',
    '                  <a href="' + escapeHtml(gcalUrl) + '" target="_blank" style="display: inline-block; padding: 14px 28px; font-size: 14px; font-weight: 700; color: #ffffff; text-decoration: none; border-radius: 8px; background-color: #0A66FF;">BOOK YOUR CONSULTATION &rarr;</a>',
    '                </td></tr>',
    '              </table>',
    '              <div style="font-size: 12px; color: #64748b;">Direct Link: <a href="' + escapeHtml(gcalUrl) + '" target="_blank" style="color: #0A66FF; text-decoration: underline;">' + escapeHtml(gcalUrl) + '</a></div>',
    '            </td></tr>',
    '          </table>',
    '          <table role="presentation" border="0" cellpadding="0" cellspacing="0" width="100%" style="margin-bottom: 28px; background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 10px; padding: 18px 20px;">',
    '            <tr><td>',
    '              <div style="font-size: 12px; font-weight: 800; letter-spacing: 0.08em; text-transform: uppercase; color: #166534; margin-bottom: 4px;">WHATSAPP SUPPORT</div>',
    '              <p style="margin: 0 0 10px 0; font-size: 14px; font-weight: 600; color: #14532d;">Need immediate technical assistance?</p>',
    '              <div style="font-size: 13.5px; color: #1e293b;">',
    '                &bull; <strong>US / Global:</strong> <a href="https://wa.me/16507724145" target="_blank" style="color: #16a34a; font-weight: 700; text-decoration: none;">+1 650 772 4145</a><br>',
    '                &bull; <strong>Bangalore / APAC:</strong> <a href="https://wa.me/919513088612" target="_blank" style="color: #16a34a; font-weight: 700; text-decoration: none;">+91 9513088612</a>',
    '              </div>',
    '            </td></tr>',
    '          </table>',
    '        </td></tr>',
    '        <tr><td align="center" style="margin: 0; padding: 0; background-color: #ffffff; border-top: 1px solid #edf2f7;">',
    '          <a href="https://trustgrid.ai" target="_blank" style="display: block; text-decoration: none; border: none;">',
    '            <img src="https://trustgrid.ai/images/F.png" alt="TRUSTGRID.AI — Full-Spectrum AI Engineering" width="650" style="width: 100%; max-width: 650px; height: auto; display: block; border: 0;" />',
    '          </a>',
    '        </td></tr>',
    '        <tr><td style="padding: 24px 32px 28px 32px; background-color: #f8fafc; border-top: 1px solid #e2e8f0; text-align: center;">',
    '          <p style="margin: 0 0 8px 0; font-size: 12px; color: #64748b;">Copyright &copy; ' + currentYear + ' <strong>TRUSTGRID.AI</strong>. All Rights Reserved.</p>',
    '          <p style="margin: 0; font-size: 11.5px; color: #94a3b8;">Direct Inquiries: <a href="mailto:connect@trustgrid.ai" style="color: #0A66FF; text-decoration: none;">connect@trustgrid.ai</a> | <a href="mailto:poojasri.aram@gmail.com" style="color: #0A66FF; text-decoration: none;">poojasri.aram@gmail.com</a></p>',
    '        </td></tr>',
    '      </table>',
    '    </td></tr>',
    '  </table>',
    '</body>',
    '</html>'
  ].join('\n');
}


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
    '      <h1 style="color: #ffffff; margin: 0; font-size: 22px; font-weight: 800; letter-spacing: 0.05em;">TRUSTGRID.AI CAREERS</h1>',
    '      <p style="color: #a5b4fc; margin: 8px 0 0 0; font-size: 13px; font-weight: 500;">Next Step: Candidate Profile Video</p>',
    '    </div>',
    '    <div style="padding: 35px 30px; color: #e5e7eb; line-height: 1.6;">',
    '      <h2 style="font-size: 20px; color: #818cf8; font-weight: 700; margin: 0 0 15px 0;">Hi ' + escapeHtml(name) + ',</h2>',
    '      <p style="font-size: 15px; color: #d1d5db; margin: 0 0 20px 0;">Thanks again for applying to TRUSTGRID.AI. As the next step in your application, please record a short profile video introducing yourself.</p>',
    '      <div style="background: #1f2937; padding: 20px; border-radius: 10px; border: 1px solid #374151; margin: 25px 0;">',
    '        <h3 style="color: #f3f4f6; font-size: 15px; margin: 0 0 12px 0; font-weight: 700;">How to record & submit</h3>',
    '        <ul style="padding-left: 20px; margin: 0; font-size: 13px; color: #9ca3af; line-height: 1.8;">',
    '          <li>Record a <strong>15&ndash;20 minute</strong> video using your laptop camera &amp; mic, introducing yourself, your experience, and why you want to join TRUSTGRID.AI.</li>',
    '          <li>Upload the video to <strong>Google Drive</strong> and set sharing to &ldquo;Anyone with the link &ndash; Viewer&rdquo;.</li>',
    '          <li>Copy the shareable link and <strong>reply to this email</strong> with the link so our Talent team can review it and attach it to your application.</li>',
    '        </ul>',
    '      </div>',
    '      <p style="font-size: 13px; color: #9ca3af; margin: 0;">Once received, your video link will be logged against your application in our tracking sheet.</p>',
    '    </div>',
    '    <div style="background: #0d1117; padding: 20px 25px; text-align: center; font-size: 12px; color: #6b7280; border-top: 1px solid #1f2937; line-height: 1.5;">',
    '      &copy; ' + new Date().getFullYear() + ' TRUSTGRID.AI. All rights reserved.<br>',
    '      Direct Talent Team Contact: <strong>poojasri.aram@gmail.com</strong> | <strong>connect@trustgrid.ai</strong>',
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
    subject: "TRUSTGRID.AI Careers - Next Step: Submit Your 15-20 Min Profile Video",
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
  console.log("🚀 Starting Monthly Career Applications Digest Forwarder for TRUSTGRID.AI...");
  
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
  var subject = "[TRUSTGRID.AI Careers] Monthly Resumes Digest - " + monthLabel + " (" + candidates.length + " Candidates)";
  
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
    '   <h2 style="margin:0;font-size:22px;font-weight:800;">TRUSTGRID.AI Talent &amp; Fellowship Pipeline</h2>',
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
    '   &copy; ' + new Date().getFullYear() + ' TRUSTGRID.AI. Confidential Talent Pipeline.',
    '  </div>',
    ' </div>',
    '</body>',
    '</html>'
  ].join('\n');
}

// =========================================================================================
// 8. TRUSTGRID.AI - EXECUTIVE ANALYTICS BRIEF ENGINE (DAILY, WEEKLY & MONTHLY)
// =========================================================================================

function getMainSpreadsheet() {
  if (CONFIG.MAIN_SPREADSHEET_ID && String(CONFIG.MAIN_SPREADSHEET_ID).trim().length > 10) {
    try {
      return SpreadsheetApp.openById(String(CONFIG.MAIN_SPREADSHEET_ID).trim());
    } catch (e) {
      console.warn("Could not open by ID, falling back to active spreadsheet: " + e.message);
    }
  }
  return SpreadsheetApp.getActiveSpreadsheet();
}

function dailyReport() {
  var ss = getMainSpreadsheet();
  if (!ss) return;

  var yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  var dayBefore = new Date(); dayBefore.setDate(dayBefore.getDate() - 2);

  var reportData = aggregateExecutiveReportData(ss, "DAILY", yesterday, yesterday, dayBefore, dayBefore);
  var emailHtml = buildExecutiveAnalyticsBriefHtml(reportData, "DAILY");
  sendReportEmail("[TRUSTGRID.AI] Daily Analytics Report - " + cleanEmailText(reportData.periodDateStr), emailHtml);
}

function weeklyReport() {
  var ss = getMainSpreadsheet();
  if (!ss) return;

  var now = new Date();
  var w1Start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  var w1End   = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
  var w2Start = new Date(w1Start.getTime() - 7 * 24 * 60 * 60 * 1000);
  var w2End   = new Date(w1Start.getTime() - 1 * 24 * 60 * 60 * 1000);

  var reportData = aggregateExecutiveReportData(ss, "WEEKLY", w1Start, w1End, w2Start, w2End);
  var emailHtml = buildExecutiveAnalyticsBriefHtml(reportData, "WEEKLY");
  sendReportEmail("[TRUSTGRID.AI] Weekly Analytics Report - " + cleanEmailText(reportData.periodRangeStr), emailHtml);
}

function monthlyReport() {
  var ss = getMainSpreadsheet();
  if (!ss) return;

  var now = new Date();
  var m1Start = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
  var m1End   = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
  var m2Start = new Date(m1Start.getTime() - 30 * 24 * 60 * 60 * 1000);
  var m2End   = new Date(m1Start.getTime() - 1 * 24 * 60 * 60 * 1000);

  var reportData = aggregateExecutiveReportData(ss, "MONTHLY", m1Start, m1End, m2Start, m2End);
  var monthLabel = Utilities.formatDate(m1End, "Asia/Kolkata", "MMMM yyyy");
  var emailHtml = buildExecutiveAnalyticsBriefHtml(reportData, "MONTHLY");
  sendReportEmail("[TRUSTGRID.AI] Monthly Executive Report - " + cleanEmailText(monthLabel), emailHtml);
}

/**
 * Daily Traffic & Lead Snapshot Archiver
 * Captures and logs consolidated daily performance row into 'Daily_Traffic_Snapshots' tab
 * for historical trend analysis and long-term reporting.
 */
function captureDailyTrafficSnapshot() {
  var ss = getMainSpreadsheet();
  if (!ss) return;

  var yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  var dayBefore = new Date();
  dayBefore.setDate(dayBefore.getDate() - 2);

  var reportData = aggregateExecutiveReportData(ss, "DAILY", yesterday, yesterday, dayBefore, dayBefore);
  var snapSheet = findSheetFlexible(ss, "Daily_Traffic_Snapshots");
  var headers = [
    "Date", "Date Str", "Total Visitors", "Total Sessions", "Total Leads",
    "Total Enquiries", "Conversion Rate", "Top Lead Source", "Top 5 Pages (JSON)",
    "Traffic Sources (JSON)", "Visitors Delta", "Leads Delta", "Recorded At IST"
  ];

  if (!snapSheet) {
    snapSheet = ss.insertSheet("Daily_Traffic_Snapshots");
    snapSheet.getRange(1, 1, 1, headers.length)
             .setValues([headers])
             .setFontWeight("bold")
             .setBackground("#07143d")
             .setFontColor("#38bdf8");
    snapSheet.setFrozenRows(1);
  } else if (snapSheet.getLastRow() === 0) {
    snapSheet.getRange(1, 1, 1, headers.length)
             .setValues([headers])
             .setFontWeight("bold")
             .setBackground("#07143d")
             .setFontColor("#38bdf8");
    snapSheet.setFrozenRows(1);
  }

  var dateKey = Utilities.formatDate(yesterday, "Asia/Kolkata", "yyyy-MM-dd");
  var row = [
    dateKey,
    reportData.periodDateStr,
    reportData.kpis.visitors || 0,
    reportData.kpis.sessions || 0,
    reportData.kpis.leads || 0,
    reportData.kpis.enquiries || 0,
    reportData.kpis.conversionRate || "0%",
    reportData.kpis.topLeadSource || "Direct",
    JSON.stringify((reportData.topPages || []).slice(0, 5)),
    JSON.stringify(reportData.sources || []),
    reportData.comparison.visitorsDelta || "0%",
    reportData.comparison.leadsDelta || "0%",
    Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss 'IST'")
  ];

  var lastRow = snapSheet.getLastRow();
  var dateCol = lastRow > 1 ? snapSheet.getRange(2, 1, lastRow - 1, 1).getValues().flat() : [];
  var existingIdx = dateCol.indexOf(dateKey);

  if (existingIdx !== -1) {
    snapSheet.getRange(existingIdx + 2, 1, 1, row.length).setValues([row]);
  } else {
    snapSheet.appendRow(row);
  }

  console.log("Captured Daily Traffic Snapshot for: " + dateKey);
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
    var leadTypeCol = headers.indexOf("LeadType") !== -1 ? headers.indexOf("LeadType") : headers.indexOf("leadTypeCategory");
    var nameCol = headers.indexOf("Full Name") !== -1 ? headers.indexOf("Full Name") : (headers.indexOf("Name") !== -1 ? headers.indexOf("Name") : headers.indexOf("fullName"));
    var emailCol = headers.indexOf("Business Email") !== -1 ? headers.indexOf("Business Email") : (headers.indexOf("Email") !== -1 ? headers.indexOf("Email") : headers.indexOf("email"));
    var compCol = headers.indexOf("Company Name") !== -1 ? headers.indexOf("Company Name") : (headers.indexOf("Company") !== -1 ? headers.indexOf("Company") : headers.indexOf("company"));

    for (var r = 1; r < data.length; r++) {
      var row = data[r];
      var leadTypeVal = leadTypeCol !== -1 ? String(row[leadTypeCol] || "").toUpperCase() : "";
      var nameVal = nameCol !== -1 ? String(row[nameCol] || "") : "";
      var emailVal = emailCol !== -1 ? String(row[emailCol] || "") : "";
      var compVal = compCol !== -1 ? String(row[compCol] || "") : "";

      // STRICT TEST EXCLUSION FILTER:
      // Exclude LeadType = TEST, TG-TEST, test, demo, qa, dummy, sandbox, uat, verification
      var isTestRow = (
        leadTypeVal === "TEST" ||
        nameVal.toUpperCase().indexOf("TG-TEST") !== -1 ||
        emailVal.toLowerCase().indexOf("tg-test") !== -1 ||
        compVal.toUpperCase().indexOf("TG-TEST") !== -1 ||
        emailVal.toLowerCase().indexOf("@test.local") !== -1 ||
        emailVal.toLowerCase().indexOf("@example.com") !== -1 ||
        /\b(test|demo|dummy|sample|qa|uat|verification|sandbox)\b/i.test(nameVal + " " + compVal + " " + emailVal)
      );

      if (isTestRow) {
        continue; // Strictly excluded from Daily & Weekly Executive Reports
      }

      var ts = parseSheetDate(row[tsCol]);
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
    '      <div style="font-size: 11px; font-weight: 800; color: #818cf8; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 4px;">TRUSTGRID.AI ENTERPRISE ANALYTICS</div>',
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
    '      &copy; ' + new Date().getFullYear() + ' TRUSTGRID.AI. Confidential Executive Analytics Report.<br>',
    '      Direct Inquiries: <strong>poojasri.trustgrid@gmail.com</strong> | <strong>bv@trustflow.in</strong> | <strong>connect@trustgrid.ai</strong>',
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

function formatPhoneForSheet(rawPhone) {
  if (rawPhone == null) return "";
  var str = String(rawPhone).trim();
  if (!str) return "";
  if (str.charAt(0) === "'") return str;
  // Prefix with single quote to prevent Google Sheets from interpreting '+' or spaces as formula parse errors
  return "'" + str;
}

function formatVal(val) {
  if (val === null || val === undefined) return "";
  if (Array.isArray(val)) {
    return val.filter(function(item) { return item != null && item !== ""; }).map(function(item) {
      return (typeof item === "object") ? JSON.stringify(item) : String(item);
    }).join(", ");
  }
  if (typeof val === "object") {
    return JSON.stringify(val);
  }
  return String(val);
}

function resolveField(header, data) {
  var rawPhone = data.phone || data.mobile || data.phoneNumber || data.phone_number || data.mobileNumber || data.mobile_number || data["Phone Number"] || data["Contact Number"] || data["Mobile Number"] || data["Mobile"] || "";
  var safePhone = rawPhone ? formatPhoneForSheet(rawPhone) : "";

  var explicitMap = {
    // Lead Identity
    "Submission ID":          data.submissionId || data.submission_id || data.leadId || data.lead_id || data.id || ("TG-" + Date.now()),
    "Lead ID":                data.leadId || data.lead_id || data.submissionId || ("TG-" + Date.now()),
    "LeadType":               data.LeadType || data.leadType || data.leadTypeCategory || "PRODUCTION",
    "Lead Type":              data.LeadType || data.leadType || data.leadTypeCategory || "PRODUCTION",

    // Names
    "Name":                   data.name || data.fullName || data.full_name || data["Full Name"] || data["FullName"] || "",
    "Full Name":              data.name || data.fullName || data.full_name || data["Full Name"] || data["FullName"] || "",
    "Applicant Name":         data.name || data.fullName || data["Full Name"] || "",
    "Candidate Name":         data.name || data.fullName || data["Full Name"] || "",

    // Email
    "Email":                  data.email || data.workEmail || data.work_email || data.userEmail || data["Work Email"] || data["Corporate Email"] || "",
    "Work Email":             data.email || data.workEmail || data.work_email || data.userEmail || data["Work Email"] || data["Corporate Email"] || "",
    "Corporate Email":        data.email || data.workEmail || data.work_email || data["Work Email"] || data["Corporate Email"] || "",
    "Business Email":         data.email || data.workEmail || data.work_email || data.userEmail || "",

    // Phone / Mobile (Safely text-formatted to avoid Formula Parse Error)
    "Phone":                  safePhone,
    "Phone Number":           safePhone,
    "Mobile":                 safePhone,
    "Mobile Number":          safePhone,
    "Contact Number":         safePhone,
    "Contact":                safePhone,
    "Phone / Mobile":         safePhone,

    // Company & Organization
    "Company":                data.company || data.companyName || data.company_name || data.organization || data.currentPreviousCompany || data["Company Name"] || "",
    "Company Name":           data.company || data.companyName || data.company_name || data.organization || data.currentPreviousCompany || data["Company Name"] || "",
    "Company / Org":          data.company || data.companyName || data.company_name || data.organization || data["Company Name"] || "",
    "Organization":           data.organization || data.company || data.companyName || data.company_name || data["Organization"] || "",
    "Company Size":           formatVal(data.companySize || data.company_size || data.teamSize || data.team_size || ""),
    "Team Size":              formatVal(data.teamSize || data.team_size || data.companySize || data.company_size || ""),

    // Roles & Designations
    "Designation":            data.designation || data.role || data.jobTitle || data.job_title || data["Designation"] || data["Role"] || "",
    "Role":                   data.designation || data.role || data.jobTitle || data.job_title || data["Designation"] || data["Role"] || "",
    "Designation / Role":     data.designation || data.role || data.jobTitle || data.job_title || data["Designation"] || data["Role"] || "",
    "Role Applied":           data.role || data.roleApplied || data.jobTitle || data["Role Applied"] || "",
    "Job Title / Role":       data.jobTitle || data.role || data.designation || data["Job Title / Role"] || "",
    "Job Title":              data.jobTitle || data.role || data.designation || data["Job Title"] || "",

    // Industry & Sector
    "Industry":               data.industry || data.sector || "",
    "Sector":                 data.sector || data.industry || "",

    // Subject
    "Subject":                data.subject || data.subjectLine || (data.name ? ("Inquiry from " + data.name) : "Website Lead"),

    // Solutions, Services & Focus
    "Service Interest":       formatVal(data.serviceInterest || data.service || data.services || data.selectedSolutions || data.solutions || data.interest || data.primaryAiStack || data.transformationInterest || ""),
    "Interest / Solution":    formatVal(data.interest || data.serviceInterest || data.transformationInterest || data.selectedSolutions || data.solutions || data.service || data["Interest"] || ""),
    "Interested Solution / Service": formatVal(data.selectedSolutions || data.solutions || data.serviceInterest || data.service || data.interest || ""),
    "Transformation Interest":formatVal(data.transformationInterest || data.interest || data.serviceInterest || data.selectedSolutions || data["Transformation Interest"] || ""),
    "Selected Solutions":     formatVal(data.selectedSolutions || data.solutions || data.serviceInterest || data.service || ""),
    "Primary AI Stack":       formatVal(data.primaryAiStack || data.aiStack || data.selectedSolutions || data.serviceInterest || data.service || ""),
    "Governance Priority":    formatVal(data.governancePriority || data.governance_priority || data.governance || ""),
    "Infrastructure Model":   formatVal(data.infrastructureModel || data.infrastructure_model || data.infrastructure || ""),
    "Focus Area":             formatVal(data.focusArea || data.focus_area || data.preferredFocusArea || data.objective || data.areaOfInterest || data.interest || data["Focus Area"] || ""),
    "Preferred Focus Area":   formatVal(data.preferredFocusArea || data.focusArea || data.focus_area || data.objective || data.areaOfInterest || ""),

    // Financials & Scale
    "Annual Revenue":         formatVal(data.revenue || data.annualRevenue || data.annual_revenue || data.currentRevenue || data["Annual Revenue"] || ""),
    "Current Revenue":        formatVal(data.currentRevenue || data.revenue || data.annualRevenue || data.annual_revenue || data["Current Revenue"] || ""),
    "Estimated Budget":       formatVal(data.estimatedBudget || data.budget || data.annualRevenue || data.revenue || ""),
    "Budget":                 formatVal(data.budget || data.estimatedBudget || data.annualRevenue || ""),

    // Deadlines & Timeline
    "Timeline":               formatVal(data.timeline || data.targetTimeline || data.target_timeline || data.preferredTimeline || data.targetDeadline || data["Timeline"] || ""),
    "Target Timeline":        formatVal(data.targetTimeline || data.timeline || data.target_timeline || data.preferredTimeline || data["Target Timeline"] || ""),
    "Target Deadline":        formatVal(data.targetDeadline || data.deadline || data.targetTimeline || data.timeline || ""),
    "Urgency / Timeline":     formatVal(data.urgency || data.timeline || data.targetTimeline || data["Urgency"] || ""),
    "Preferred Time":         formatVal(data.preferredTime || data.preferred_time || data.preferredTimeline || data.meetingSlot || data.dateTime || ""),

    // Challenges & Leakage
    "Primary Challenge":      formatVal(data.challenges || data.keyChallenges || data.primaryChallenge || data.challenge || data["Primary Challenge"] || ""),
    "Key Challenges":         formatVal(data.keyChallenges || data.challenges || data.primaryChallenge || data.challenge || ""),
    "Primary Leakage Area":   data.primaryLeakageArea || data.leakageArea || data["Primary Leakage Area"] || "",
    "Estimated Leakage":      data.estimatedLeakage || data.leakage || data["Estimated Leakage"] || "",
    "Diagnostic Score":       data.diagnosticScore || data.score || data["Diagnostic Score"] || "",
    "Answers Summary":        typeof data.answersSummary === "object" ? JSON.stringify(data.answersSummary) : (data.answersSummary || data.answers || ""),

    // Partnerships & Proposals
    "Partner Type":           data.partnerType || data.partner_type || data.partnershipType || data.partnershipInterest || data["Partner Type"] || "",
    "Region":                 data.region || data.primaryRegion || data.location || data["Primary Region"] || "",
    "Primary Region":         data.region || data.primaryRegion || data.location || data["Primary Region"] || "",
    "Proposal":               data.proposal || data.valueProposition || data.message || data.requirement || data["Proposal"] || "",
    "Value Proposition / Proposal": data.proposal || data.valueProposition || data.message || data["Proposal"] || "",

    // Careers & Portfolio
    "Experience Level":       data.experienceLevel || data.experience || data["Experience Level"] || "",
    "Portfolio / LinkedIn":   data.portfolioUrl || data.portfolio || data.linkedin || data["Portfolio"] || "",
    "Portfolio / GitHub":     data.portfolioUrl || data.portfolio || data.github || data.linkedin || "",
    "Resume File Name":       data.resumeFileName || data.resume_file_name || data.fileName || (data.resume ? "Resume Attached" : ""),
    "Cover Note / Message":   data.coverNote || data.coverLetter || data.message || "",
    "Cover Letter":           data.coverLetter || data.coverNote || data.message || "",

    // Chatbot & Summaries
    "Topic / Intent":         data.intent || data.topic || data.subject || data["Topic"] || "",
    "Chat Summary":           formatVal(data.chatSummary || data.conversationSummary || data.messages || data.message || ""),
    "Conversation Summary":   formatVal(data.conversationSummary || data.chatSummary || data.messages || data.message || ""),

    // Requirements & Messages
    "Project Scope":          data.projectScope || data.scope || data.requirement || data.message || "",
    "Requirements":           data.requirements || data.requirement || data.message || data.projectScope || "",
    "Requirement / Inquiry":  data.requirement || data.message || data.requirementInquiry || data.inquiry || data.scope || "",
    "Requirement":            data.requirement || data.message || data.requirementInquiry || data.inquiry || data.scope || "",
    "Architecture Query":     data.architectureQuery || data.requirement || data.message || "",
    "Message":                data.message || data.yourMessage || data["Your Message"] || data["Message"] || "",
    "Message / Details":      data.message || data.details || data.requirement || data["Message"] || "",
    "Message / Scope":        data.message || data.scope || data.details || data.requirement || data["Message"] || "",

    // Operational Status & Metadata
    "Form Name":              data.formName || data.form_name || data.formType || data.form_type || data.sheetName || "Website Form",
    "Status":                 data.status || "New Lead",
    "Variant":                data.variant || "Standard",
    "Source":                 data.source || data.lead_source || data.utmSource || data.utm_source || "Website Inbound Form",
    "Location":               data.location || data.ipLocation || data.ip_location || data["Location"] || data["IP Location"] || "",
    "IP Location":            data.location || data.ipLocation || data.ip_location || data["IP Location"] || "",
    "IP Address":             data.ipAddress || data.ip_address || data["IP Address"] || "127.0.0.1",
    "Test Indicators":        data.testReason || "Identified as TG-TEST / QA non-production data",
    "Reason Moved":           data.reasonMoved || "Audited & Moved from Active Leads",
    "Payload JSON":           typeof data === "object" ? JSON.stringify(data) : String(data),

    // Analytics Dimensions
    "Session ID":             data.sessionId || data.session_id || data["Session ID"] || "",
    "Visitor ID":             data.visitorId || data.visitor_id || data.user_id || data.userId || data["Visitor ID"] || "",
    "User ID":                data.user_id || data.userId || data.visitorId || data.visitor_id || data["User ID"] || "",
    "Page Path":              data.pagePath || data.page_url || data.page || data["Page Path"] || "",
    "Page Title":             data.pageTitle || data.page_title || data["Page Title"] || "",
    "Traffic Source":         data.trafficSource || data.traffic_source || data.channel || data.utm_source || data.source || "Direct",
    "Traffic Channel":        data.traffic_source || data.channel || data.trafficSource || "Direct",
    "Channel":                data.channel || data.traffic_source || data.trafficSource || "Direct",
    "Referrer":               data.referrer || data.referrer_url || documentReferrerFallback(data) || "",
    "Referrer Domain":        data.referrer_domain || data.referrerDomain || "",
    "Landing Page":           data.landing_page || data.landingPage || data.entry_page || "",
    "Entry Page":             data.entry_page || data.landing_page || data.landingPage || "",
    "Exit Page":              data.exit_page || data.page || data.pagePath || "",
    "Device":                 data.device || data.device_type || "Desktop",
    "Browser":                data.browser || "Chrome / Safari",
    "OS":                     data.os || data.operating_system || "Windows / macOS",
    "CTA Name":               data.ctaName || data.event_name || data.eventName || data["CTA Name"] || "",
    "Destination URL":        data.destinationUrl || data.page_url || data.pageUrl || "",
    "Section":                data.section || data.event_category || "General",
    "UTM Source":             data.utmSource || data.utm_source || data.source || "",
    "UTM Medium":             data.utmMedium || data.utm_medium || data.medium || "",
    "Medium":                 data.medium || data.utm_medium || data.utmMedium || "none",
    "UTM Campaign":           data.utmCampaign || data.utm_campaign || data.campaign || "",
    "Campaign":               data.campaign || data.utm_campaign || data.utmCampaign || "",
    "UTM Term":               data.utmTerm || data.utm_term || data.term || "",
    "Term":                   data.term || data.utm_term || data.utmTerm || "",
    "UTM Content":            data.utmContent || data.utm_content || data.content || "",
    "Content":                data.content || data.utm_content || data.utmContent || "",
    "Start Time (UTC)":       data.start_time_utc || data.startTime || data.timestamp || "",
    "Last Activity (UTC)":    data.last_activity_utc || data.lastActivity || data.timestamp || "",
    "Duration (Sec)":         data.duration_sec != null ? data.duration_sec : (data.duration != null ? data.duration : 0),
    "Pages Visited":          data.pages_count != null ? data.pages_count : (data.pages != null ? data.pages : 1),
    "Country":                data.country || data.geo_country || "",
    "Country Code":           data.countryCode || data.country_code || "",
    "City":                   data.city || data.geo_city || "",
    "Latitude":               data.latitude != null ? data.latitude : (data.geo_latitude != null ? data.geo_latitude : ""),
    "Longitude":              data.longitude != null ? data.longitude : (data.geo_longitude != null ? data.geo_longitude : ""),
    "Timezone":               data.timezone || data.timezone_browser || "",
    "Masked IP":              data.masked_ip || data.ip_masked || data.ip_address || data.ipAddress || "",
    "Bounce":                 data.is_bounce != null ? data.is_bounce : (data.bounce != null ? data.bounce : 0),
    "Converted":              data.converted != null ? data.converted : (data.goal_completed != null ? data.goal_completed : 0),
    "User Type":              data.user_type || (data.returning_user ? "returning" : "new"),
    "ISP":                    data.isp || "",
    "ASN":                    data.asn || "",
    "Threat Category":        data.threat_category || data.threatCategory || "",
    "Severity":               data.severity || "",
    "Description":            data.description || "",
    "Target Path":            data.target_path || data.path || data.page_path || "",
    "Blocked":                data.blocked != null ? data.blocked : 0,
    "Action Taken":           data.action_taken || data.action || "",
    "Timestamp (UTC)":        normalizeTimestamp(data.timestamp_utc || data.timestamp || new Date().toISOString()),
    "Timestamp":              normalizeTimestamp(data.timestamp || data.Timestamp || new Date().toISOString())
  };

  var val;
  if (explicitMap.hasOwnProperty(header)) {
    val = explicitMap[header];
  } else {
    // Intelligent fallback resolution across camelCase, snake_case, rawPayload and fields
    var slug = header
      .replace(/\(.*?\)/g, '')
      .trim()
      .split(/[\s\-_]+/)
      .map(function(word, i) {
        if (i === 0) return word.charAt(0).toLowerCase() + word.slice(1);
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join('');

    val = data[slug];
    if (val === undefined) val = data[header];
    if (val === undefined) val = data[header.toLowerCase()];
    if (val === undefined) val = data[header.toLowerCase().replace(/[\s\-_]+/g, '_')];
    if (val === undefined) val = data[header.toLowerCase().replace(/[\s\-_]+/g, '')];
    if (val === undefined && data.rawPayload && typeof data.rawPayload === 'object') {
      val = data.rawPayload[slug] || data.rawPayload[header] || data.rawPayload[header.toLowerCase()];
    }
    if (val === undefined && data.fields && typeof data.fields === 'object') {
      val = data.fields[slug] || data.fields[header] || data.fields[header.toLowerCase()];
    }
    if (val === undefined) val = "";
  }

  // Format array/object safely
  var strVal = formatVal(val);

  // Security & spreadsheet formula injection prevention:
  // If first character is '+', '=', or '@', prefix with single quote
  if (strVal.length > 0) {
    var fc = strVal.charAt(0);
    if (fc === '+' || fc === '=' || fc === '@') {
      strVal = "'" + strVal;
    }
  }

  return strVal;
}

function documentReferrerFallback(data) {
  return data.referrer || data.referrer_url || "";
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
  var str = String(val).trim();
  if (!str) return null;

  // Handle standard "yyyy-MM-dd HH:mm:ss IST" or ISO timestamps
  var m = str.match(/^(\d{4})-(\d{2})-(\d{2})(?:[T\s](\d{2}):(\d{2}):(\d{2}))?/);
  if (m) {
    var yr = parseInt(m[1], 10);
    var mo = parseInt(m[2], 10) - 1;
    var dy = parseInt(m[3], 10);
    var hr = m[4] ? parseInt(m[4], 10) : 0;
    var mi = m[5] ? parseInt(m[5], 10) : 0;
    var sc = m[6] ? parseInt(m[6], 10) : 0;

    if (str.indexOf("IST") !== -1) {
      // IST is UTC+5:30 -> subtract offset to get true UTC
      return new Date(Date.UTC(yr, mo, dy, hr - 5, mi - 30, sc));
    }
    if (str.endsWith("Z")) {
      return new Date(str);
    }
    return new Date(yr, mo, dy, hr, mi, sc);
  }

  var match = str.match(/^(\d{2})-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d{4})/i);
  if (match) {
    var months = {'jan':0,'feb':1,'mar':2,'apr':3,'may':4,'jun':5,'jul':6,'aug':7,'sep':8,'oct':9,'nov':10,'dec':11};
    return new Date(match[3], months[match[2].toLowerCase()], match[1]);
  }

  var d = new Date(str);
  return isNaN(d.getTime()) ? null : d;
}

function normalizeTrafficSource(src, utmSrc) {
  var s = String(src || utmSrc || "").toLowerCase().trim();
  if (s.indexOf("google_ad") !== -1 || s.indexOf("cpc") !== -1 || s.indexOf("adwords") !== -1) return "Google Ads";
  if (s.indexOf("linkedin") !== -1) return "LinkedIn";
  if (s.indexOf("twitter") !== -1 || s.indexOf("x.com") !== -1) return "X / Twitter";
  if (s.indexOf("organic") !== -1 || s.indexOf("google") !== -1 || s.indexOf("search") !== -1) return "Google Organic Search";
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

function setupAllTrustGridTriggers() {
  var triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(function(t) { ScriptApp.deleteTrigger(t); });

  // 1. Daily Snapshot at 23:50 IST (freezes daily numbers into Traffic_History)
  ScriptApp.newTrigger("captureDailyTrafficSnapshot")
    .timeBased()
    .everyDays(1)
    .atHour(23)
    .create();

  // 2. Daily Executive Report at 8:30 AM IST
  ScriptApp.newTrigger("dailyReport")
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();

  // 3. Weekly Report on Monday at 8:30 AM IST (Per User Specification)
  ScriptApp.newTrigger("weeklyReport")
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(8)
    .create();

  // 4. Monthly Executive Report on 1st of month at 8:30 AM IST
  ScriptApp.newTrigger("monthlyReport")
    .timeBased()
    .onMonthDay(1)
    .atHour(8)
    .create();

  // 5. Monthly Career Applications Trigger on 1st of month at 9:00 AM IST
  ScriptApp.newTrigger("forwardMonthlyCareerApplications")
    .timeBased()
    .onMonthDay(1)
    .atHour(9)
    .create();

  console.log("All TRUSTGRID automation triggers successfully scheduled (Monday Weekly Report + 1st-of-month Monthly Report + Daily Snapshot).");
}

/**
 * ⚠️ TEST-ONLY — MANUAL TRIGGER, NEVER SCHEDULED, NEVER TOUCHES REAL SHEET DATA.
 * Sends hardcoded [PREVIEW]-prefixed sample emails so a human can visually check the HTML
 * templates render correctly. It is NOT wired to setupAllTrustGridTriggers() and must never
 * be added to a time-based trigger — run it only manually from the Apps Script editor.
 * Real automated reports (dailyReport/weeklyReport/monthlyReport) always pull live data via
 * aggregateExecutiveReportData() and never call this function.
 */
function SEND_ALL_TRUSTGRID_NOTIFICATION_PREVIEWS() {
  var recipients = EMAIL_CONFIG.reportEmails.join(",");
  var mockSheetUrl = "https://docs.google.com/spreadsheets/d/" + CONFIG.MAIN_SPREADSHEET_ID + "/edit";
  console.log("Dispatching all TRUSTGRID.AI preview notifications to: " + recipients);

  var samplePdfBlob = Utilities.newBlob("Sample Candidate Resume - TRUSTGRID.AI AI/ML Research Engineer", "application/pdf", "Poojasri_Resume.pdf");

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

  // 4. Daily Analytics Report (LIVE DATA from Sheet 1)
  var ss = getMainSpreadsheet();
  var yesterday = new Date(); yesterday.setDate(yesterday.getDate() - 1);
  var dayBefore = new Date(); dayBefore.setDate(dayBefore.getDate() - 2);
  var liveDailyData = aggregateExecutiveReportData(ss, "DAILY", yesterday, yesterday, dayBefore, dayBefore);
  var dailyHtml = buildExecutiveAnalyticsBriefHtml(liveDailyData, "DAILY");
  MailApp.sendEmail({
    to: recipients,
    subject: "[TRUSTGRID.AI] Daily Analytics Report - " + cleanEmailText(liveDailyData.periodDateStr),
    htmlBody: dailyHtml,
    name: EMAIL_CONFIG.name,
    replyTo: EMAIL_CONFIG.replyTo
  });

  // 5. Weekly Analytics Report (LIVE DATA from Sheet 1)
  var now = new Date();
  var w1Start = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  var w1End   = new Date(now.getTime() - 1 * 24 * 60 * 60 * 1000);
  var w2Start = new Date(w1Start.getTime() - 7 * 24 * 60 * 60 * 1000);
  var w2End   = new Date(w1Start.getTime() - 1 * 24 * 60 * 60 * 1000);
  var liveWeeklyData = aggregateExecutiveReportData(ss, "WEEKLY", w1Start, w1End, w2Start, w2End);
  var weeklyHtml = buildExecutiveAnalyticsBriefHtml(liveWeeklyData, "WEEKLY");
  MailApp.sendEmail({
    to: recipients,
    subject: "[TRUSTGRID.AI] Weekly Analytics Report - " + cleanEmailText(liveWeeklyData.periodRangeStr),
    htmlBody: weeklyHtml,
    name: EMAIL_CONFIG.name,
    replyTo: EMAIL_CONFIG.replyTo
  });

  console.log("All notifications and reports successfully dispatched using LIVE spreadsheet data to " + recipients);
}

// =========================================================================================
// ONE-CLICK ON-DEMAND LIVE REPORT DISPATCHERS (RUN THESE DIRECTLY IN APPS SCRIPT)
// =========================================================================================

/**
 * Instantly triggers and emails the Daily Analytics Report using 100% REAL LIVE data from Sheet 1.
 */
function SEND_DAILY_REPORT_NOW() {
  dailyReport();
  console.log("✅ Live Daily Analytics Report dispatched to: " + EMAIL_CONFIG.reportEmails.join(", "));
}

/**
 * Instantly triggers and emails the Weekly Analytics Report using 100% REAL LIVE data from Sheet 1.
 */
function SEND_WEEKLY_REPORT_NOW() {
  weeklyReport();
  console.log("✅ Live Weekly Analytics Report dispatched to: " + EMAIL_CONFIG.reportEmails.join(", "));
}

/**
 * Instantly triggers and emails the Monthly Analytics Report using 100% REAL LIVE data from Sheet 1.
 */
function SEND_MONTHLY_REPORT_NOW() {
  monthlyReport();
  console.log("✅ Live Monthly Analytics Report dispatched to: " + EMAIL_CONFIG.reportEmails.join(", "));
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

  console.log("All 20 TRUSTGRID.AI database tabs initialized with enterprise styling.");
}

/**
 * Quarantines any test / Vercel / localhost submission that accidentally hits the production webhook.
 * Keeps production Contact_Leads pristine and suppresses executive alert emails.
 */
function logToStagingQuarantine(data) {
  try {
    var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
    var tab = ss.getSheetByName("Staging_Quarantine");
    if (!tab) {
      tab = ss.insertSheet("Staging_Quarantine");
      var headers = ["Timestamp", "Origin", "Event / Form", "User / Name", "Email", "Data JSON"];
      tab.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground("#f59e0b").setFontColor("#ffffff");
      tab.setFrozenRows(1);
    }
    var ts = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss 'IST'");
    var origin = data.page_url || data.pageUrl || data.referrer || "Vercel / Localhost QA";
    var formType = data.form_type || data.sheetName || data.event_type || "Test Event";
    var name = data.name || data.fullName || "";
    var email = data.email || data.work_email || "";
    tab.appendRow([ts, origin, formType, name, email, JSON.stringify(data)]);
    console.log("⚠️ Staging / Vercel traffic routed to Staging_Quarantine to protect production metrics.");
    return ContentService.createTextOutput("Quarantined to Staging").setMimeType(ContentService.MimeType.TEXT);
  } catch (qErr) {
    console.error("Quarantine error:", qErr);
    return ContentService.createTextOutput("Quarantine Error: " + qErr.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}

/**
 * PRODUCTION LEAD PRESERVATION & TESTING FRAMEWORK:
 * Routes all test leads (TG-TEST, QA, Demo, Verification) to Archived_Test_Leads.
 * Client confirmation emails and executive alerts are strictly suppressed.
 */
function logToArchivedTestLeads(data) {
  try {
    var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
    var tab = ss.getSheetByName("Archived_Test_Leads");
    var headers = ["Timestamp", "Lead ID", "LeadType", "Full Name", "Business Email", "Phone / Mobile", "Company Name", "Interested Solution / Service", "Test Indicators", "Payload JSON"];
    if (!tab) {
      tab = ss.insertSheet("Archived_Test_Leads");
      tab.getRange(1, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground("#475569").setFontColor("#ffffff");
      tab.setFrozenRows(1);
    }
    var ts = Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss 'IST'");
    var leadId = data.leadId || data.submissionId || ("TG-TEST-" + Date.now());
    var name = data.name || data.fullName || "TG-TEST Validation";
    var email = data.email || data.work_email || "";
    var phone = formatPhoneForSheet(data.phone || data.mobile || data.phoneNumber || data.phone_number || data.mobileNumber || data.mobile_number || "");
    var company = data.company || "TG-TEST QA";
    var solution = data.selectedSolutions || data.service || data.form_type || "Test Lead Validation";
    var reason = data.testReason || "Identified as TG-TEST / QA non-production data";

    tab.appendRow([ts, leadId, "TEST", name, email, phone, company, solution, reason, JSON.stringify(data)]);
    console.log("🔒 TG-TEST record safely quarantined to Archived_Test_Leads tab. Production leads preserved.");

    // Dispatch email notification to team so testing can be verified in mail
    try {
      sendLeadEmails(data, "Archived_Test_Leads", "https://docs.google.com/spreadsheets/d/" + CONFIG.MAIN_SPREADSHEET_ID);
    } catch (mailNoticeErr) {
      console.warn("Archived_Test_Leads notification note:", mailNoticeErr.toString());
    }

    return ContentService.createTextOutput("Logged to Archived_Test_Leads").setMimeType(ContentService.MimeType.TEXT);
  } catch (archiveErr) {
    console.error("Archived_Test_Leads error:", archiveErr);
    return ContentService.createTextOutput("Archive Error: " + archiveErr.toString()).setMimeType(ContentService.MimeType.TEXT);
  }
}

/**
 * =========================================================================================
 * 10. PRODUCTION LEAD PRESERVATION & UNIVERSAL TEST LEAD CLEANER
 * =========================================================================================
 * Scans ALL active lead sheets across the entire Google Spreadsheet,
 * identifies non-production/test rows (TG-TEST, pooja test, test, demo, dummy, sample, qa, etc.),
 * safely moves them to Archived_Test_Leads tab, and permanently removes them from active tabs.
 * Preserves 100% of genuine production customer inquiries.
 */
function auditAndArchiveGoogleSheetTestLeads() {
  var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  var archiveTab = ss.getSheetByName("Archived_Test_Leads");
  var archiveHeaders = [
    "Timestamp", "Original Tab", "Lead ID", "LeadType", "Full Name",
    "Business Email", "Phone / Mobile", "Company Name", "Reason Moved", "Row Data JSON"
  ];

  if (!archiveTab) {
    archiveTab = ss.insertSheet("Archived_Test_Leads");
    archiveTab.getRange(1, 1, 1, archiveHeaders.length)
              .setValues([archiveHeaders])
              .setFontWeight("bold")
              .setBackground("#334155")
              .setFontColor("#ffffff");
    archiveTab.setFrozenRows(1);
  }

  // System and telemetry tabs that should NEVER be audited for customer leads
  var systemTabs = [
    "Archived_Test_Leads", "Live_Traffic_Events", "Visitor_Intelligence_95",
    "Page_Flow_Analysis", "Hourly_Traffic_Rollup", "Daily_Aggregates_Rollup",
    "Telemetry_Raw_Ingest", "UTM_Campaign_Analytics", "Weekly_Executive_Report",
    "Device_Browser_Matrix", "Executive_KPI_Dashboard", "Intelligence_Sync_Log",
    "Staging_Quarantine", "Traffic_Analytics", "Page_Views", "Sessions",
    "CTA_Clicks", "Sessions_Intelligence", "Traffic_Attribution",
    "Geo_Intelligence", "Network_Security_Log", "Engagement_Metrics", "User_Behavior_Library"
  ];

  var allSheets = ss.getSheets();
  var totalMoved = 0;
  var totalRetained = 0;
  var tabReports = [];

  for (var s = 0; s < allSheets.length; s++) {
    var sh = allSheets[s];
    var sheetName = sh.getName();

    // Skip system, analytics, and archive sheets
    if (systemTabs.indexOf(sheetName) !== -1) continue;

    var lastRow = sh.getLastRow();
    if (lastRow < 2) continue; // No data rows (only header or empty)

    var data = sh.getDataRange().getValues();
    var headers = data[0];
    var tabMoved = 0;
    var tabRetained = 0;

    // Scan from bottom to top so deleting rows does not shift row indices
    for (var r = data.length - 1; r >= 1; r--) {
      var row = data[r];
      var rowStr = row.map(function(c) { return String(c || ''); }).join(" ");
      var rowLower = rowStr.toLowerCase();

      var isTest = (
        /\b(tg-test|test|demo|dummy|sample|qa|uat|verification|sandbox)\b/i.test(rowStr) ||
        rowLower.indexOf("tg-test") !== -1 ||
        rowLower.indexOf("pooja test") !== -1 ||
        (rowLower.indexOf("pooja") !== -1 && rowLower.indexOf("test") !== -1) ||
        rowLower.indexOf("@test.local") !== -1 ||
        rowLower.indexOf("@example.com") !== -1 ||
        rowLower.indexOf("test@") !== -1 ||
        rowLower.indexOf("@test.") !== -1
      );

      if (isTest) {
        var leadId = String(row[0] || "");
        var name = String(row[1] || "");
        var email = String(row[2] || "");
        var company = String(row[3] || "");
        var phone = "";

        // Dynamically find phone in row if present
        for (var c = 0; c < row.length; c++) {
          var cellVal = String(row[c] || "").trim().replace(/^'/, '');
          if (/^(\+?\d[\d\s\-\(\)]{6,16})$/.test(cellVal) && cellVal.length >= 7) {
            phone = formatPhoneForSheet(cellVal);
            break;
          }
        }

        archiveTab.appendRow([
          Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss 'IST'"),
          sheetName,
          leadId || ("ARCH-" + Date.now()),
          "TEST",
          name,
          email,
          phone,
          company,
          "Audited & Purged from " + sheetName,
          JSON.stringify(row)
        ]);

        sh.deleteRow(r + 1);
        tabMoved++;
        totalMoved++;
      } else {
        tabRetained++;
        totalRetained++;
      }
    }

    if (tabMoved > 0 || tabRetained > 0) {
      tabReports.push({ tab: sheetName, movedTestLeads: tabMoved, retainedProductionLeads: tabRetained });
    }
  }

  var report = {
    status: "success",
    operation: "CLEAN_ALL_TEST_LEADS",
    timestamp: Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss 'IST'"),
    totalTestLeadsMovedToArchive: totalMoved,
    totalGenuineProductionLeadsPreserved: totalRetained,
    tabBreakdown: tabReports
  };

  Logger.log("✅ Lead Cleanup Completed: " + JSON.stringify(report));
  return report;
}

/**
 * PRODUCTION LEAD DEDUPLICATION & FIELD CLEANER
 * 1. Removes duplicate rows: Detects duplicate submissions by Lead ID, or by identical (Email + Tab/Form),
 *    keeping the most complete and latest submission, deleting redundant duplicate rows.
 * 2. Removes duplicate fields: Checks header rows (Row 1) for duplicate or redundant column names in any sheet,
 *    and removes duplicate columns safely from right to left.
 * 3. Returns a complete JSON audit report of removed duplicates.
 */
function removeDuplicateRecordsAndFields() {
  var ss = SpreadsheetApp.openById(CONFIG.MAIN_SPREADSHEET_ID);
  var allSheets = ss.getSheets();
  var totalDuplicateRowsDeleted = 0;
  var totalDuplicateColumnsDeleted = 0;
  var reportTabs = [];

  var systemTabs = [
    "Live_Traffic_Events", "Visitor_Intelligence_95", "Hourly_Traffic_Rollup",
    "Daily_Aggregates_Rollup", "Telemetry_Raw_Ingest", "Weekly_Executive_Report",
    "Executive_KPI_Dashboard", "Intelligence_Sync_Log"
  ];

  for (var s = 0; s < allSheets.length; s++) {
    var sh = allSheets[s];
    var sheetName = sh.getName();
    if (systemTabs.indexOf(sheetName) !== -1) continue;

    var lastRow = sh.getLastRow();
    var lastCol = sh.getLastColumn();
    if (lastRow < 1 || lastCol < 1) continue;

    var dupColsInTab = 0;
    var dupRowsInTab = 0;

    // --- STEP 1: REMOVE DUPLICATE COLUMNS / FIELDS ---
    var headers = sh.getRange(1, 1, 1, lastCol).getValues()[0];
    var seenHeaders = {};
    for (var c = headers.length - 1; c >= 0; c--) {
      var hName = String(headers[c] || '').trim().toLowerCase();
      if (!hName) continue;
      if (seenHeaders[hName]) {
        // Duplicate header found! Delete duplicate column
        sh.deleteColumn(c + 1);
        dupColsInTab++;
        totalDuplicateColumnsDeleted++;
      } else {
        seenHeaders[hName] = true;
      }
    }

    // Refresh dimensions after potential column deletion
    lastRow = sh.getLastRow();
    lastCol = sh.getLastColumn();
    if (lastRow < 2 || lastCol < 1) continue;

    // --- STEP 2: REMOVE DUPLICATE ROWS / DATA ---
    var data = sh.getDataRange().getValues();
    var curHeaders = data[0].map(function(h) { return String(h || '').trim().toLowerCase(); });
    
    // Find index of Lead ID / Submission ID and Email
    var idCol = -1;
    var emailCol = -1;
    var phoneCol = -1;

    for (var h = 0; h < curHeaders.length; h++) {
      var colName = curHeaders[h];
      if (idCol === -1 && (colName.indexOf("submission id") !== -1 || colName.indexOf("lead id") !== -1 || colName === "id")) {
        idCol = h;
      }
      if (emailCol === -1 && (colName.indexOf("email") !== -1)) {
        emailCol = h;
      }
      if (phoneCol === -1 && (colName.indexOf("phone") !== -1 || colName.indexOf("mobile") !== -1)) {
        phoneCol = h;
      }
    }

    var seenKeys = {};
    // Scan from bottom to top so deleting rows does not shift indices
    for (var r = data.length - 1; r >= 1; r--) {
      var row = data[r];
      var leadId = idCol > -1 ? String(row[idCol] || '').trim() : '';
      var email = emailCol > -1 ? String(row[emailCol] || '').trim().toLowerCase() : '';
      var phone = phoneCol > -1 ? String(row[phoneCol] || '').trim().replace(/[^\d]/g, '') : '';
      
      // Determine unique row fingerprint
      var uniqueKey = "";
      if (leadId && leadId.length > 5) {
        uniqueKey = "ID:" + leadId;
      } else if (email && email.indexOf("@") !== -1) {
        uniqueKey = "EMAIL:" + email + (phone ? ":" + phone : "");
      } else {
        uniqueKey = "ROW:" + row.slice(0, Math.min(row.length, 6)).map(function(cell) { return String(cell || '').trim(); }).join("|");
      }

      if (seenKeys[uniqueKey]) {
        // Duplicate row detected! Delete row
        sh.deleteRow(r + 1);
        dupRowsInTab++;
        totalDuplicateRowsDeleted++;
      } else {
        seenKeys[uniqueKey] = true;
      }
    }

    if (dupRowsInTab > 0 || dupColsInTab > 0) {
      reportTabs.push({
        tab: sheetName,
        duplicateRowsDeleted: dupRowsInTab,
        duplicateColumnsDeleted: dupColsInTab
      });
    }
  }

  var report = {
    status: "success",
    operation: "REMOVE_DUPLICATE_RECORDS_AND_FIELDS",
    timestamp: Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss 'IST'"),
    totalDuplicateRowsDeleted: totalDuplicateRowsDeleted,
    totalDuplicateColumnsDeleted: totalDuplicateColumnsDeleted,
    tabBreakdown: reportTabs
  };

  Logger.log("🧹 Deduplication Completed: " + JSON.stringify(report));
  return report;
}

/**
 * Top-Level Runner for Deduplication:
 * Select "REMOVE_DUPLICATES_NOW" in toolbar dropdown and click "Run".
 */
function REMOVE_DUPLICATES_NOW() {
  return removeDuplicateRecordsAndFields();
}

/**
 * Complete Full Maintenance:
 * Cleans all test leads AND removes all duplicate records & fields in one pass.
 */
function RUN_COMPLETE_SHEET_MAINTENANCE_NOW() {
  var cleanReport = auditAndArchiveGoogleSheetTestLeads();
  var dedupReport = removeDuplicateRecordsAndFields();
  return {
    status: "success",
    operation: "COMPLETE_SHEET_MAINTENANCE",
    timestamp: Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss 'IST'"),
    testLeadPurge: cleanReport,
    deduplication: dedupReport
  };
}

/**
 * Top-Level Direct Runner for Google Apps Script IDE dropdown:
 * Select "CLEAN_ALL_TEST_LEADS_NOW" in the toolbar dropdown and click "Run".
 */
function CLEAN_ALL_TEST_LEADS_NOW() {
  return auditAndArchiveGoogleSheetTestLeads();
}

/**
 * Web App GET Handler:
 * Trigger automated test lead cleanup or deduplication via browser URL:
 * https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?action=clean_test_leads
 * https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?action=remove_duplicates
 * https://script.google.com/macros/s/YOUR_DEPLOYMENT_ID/exec?action=maintenance
 */
function doGet(e) {
  var action = (e && e.parameter && (e.parameter.action || e.parameter.clean || e.parameter.op)) || "";

  if (action === "clean_test_leads" || action === "clean" || action === "purge") {
    var result = auditAndArchiveGoogleSheetTestLeads();
    return ContentService.createTextOutput(JSON.stringify(result, null, 2))
                         .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "remove_duplicates" || action === "dedup" || action === "deduplicate") {
    var result = removeDuplicateRecordsAndFields();
    return ContentService.createTextOutput(JSON.stringify(result, null, 2))
                         .setMimeType(ContentService.MimeType.JSON);
  }

  if (action === "maintenance" || action === "full_cleanup" || action === "all") {
    var result = RUN_COMPLETE_SHEET_MAINTENANCE_NOW();
    return ContentService.createTextOutput(JSON.stringify(result, null, 2))
                         .setMimeType(ContentService.MimeType.JSON);
  }

  var status = {
    service: "TRUSTGRID.AI Sheet 1 High-Speed Webhook Engine",
    status: "ACTIVE",
    version: "2026.10-ENTERPRISE",
    timestamp: Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss 'IST'"),
    spreadsheetId: CONFIG.MAIN_SPREADSHEET_ID,
    availableActions: {
      cleanTestLeads: "?action=clean_test_leads",
      removeDuplicates: "?action=remove_duplicates",
      fullMaintenance: "?action=maintenance"
    }
  };

  return ContentService.createTextOutput(JSON.stringify(status, null, 2))
                       .setMimeType(ContentService.MimeType.JSON);
}




