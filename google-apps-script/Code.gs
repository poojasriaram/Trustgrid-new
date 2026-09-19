/**
 * ==============================================================================
 * TRUSTGRID.AI — ENTERPRISE WEBHOOK, 95-COLUMN TELEMETRY & BEHAVIORAL ANALYTICS
 * Google Apps Script Web App Engine (V8 Enterprise Pro)
 * ==============================================================================
 * 
 * Supports the Exact 95-Column Enterprise Telemetry Schema:
 * https://docs.google.com/spreadsheets/d/1B7hkCHLPeNVVnaPJ89ZO8R9nv4FngAzzqvwyK0zqnWM/edit?gid=153939990
 * 
 * Captures:
 * 1. Live_Traffic_Events — Complete 95-attribute granular user behavior & forensics
 * 2. Leads               — High-intent qualified submissions from all website forms
 * 3. Form Events         — Granular form funnel telemetry (view, start, errors, abandon, submit)
 * 4. Traffic             — Pageview & UTM multi-touch attribution sessions
 * 5. CTA Events          — Click events across Hero, Offerings, Nav, Footer, and In-Page CTAs
 * 6. Chatbot Leads       — Conversational leads captured via AI Architect Chatbot
 * 7. WhatsApp Events     — Click and conversion triggers from the WhatsApp CTA widget
 * 
 * Behavioral Intelligence Features:
 * - Dynamic Buyer Intent Scoring & User Segmentation
 * - Rage Click & UX Friction Detection
 * - Micro-Funnel & Form Field Drop-off Forensics
 * - Navigation Journey Reconstruction (Entry -> Exit -> Conversion)
 * - Web Vitals (FCP, LCP, TTI) Performance Correlation
 * ==============================================================================
 */

// Global Sheet 95-Column Schema Definition (Exact Match)
const SCHEMA_95_HEADERS = [
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

const SCHEMAS = {
  TELEMETRY_95: {
    name: 'Live_Traffic_Events',
    headers: SCHEMA_95_HEADERS
  },
  LEADS: {
    name: 'Leads',
    headers: [
      'timestamp', 'lead_id', 'lead_source', 'form_id', 'form_name',
      'page_url', 'page_title', 'name', 'work_email', 'company', 'role',
      'phone', 'offering', 'industry', 'requirement', 'chat_intent',
      'status', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term',
      'utm_content', 'referrer', 'landing_page'
    ]
  },
  FORM_EVENTS: {
    name: 'Form Events',
    headers: [
      'timestamp', 'event_name', 'form_id', 'form_name', 'page_url',
      'cta_source', 'session_id', 'utm_source', 'utm_medium', 'utm_campaign',
      'utm_term', 'utm_content'
    ]
  },
  TRAFFIC: {
    name: 'Traffic',
    headers: [
      'timestamp', 'session_id', 'page_url', 'page_title', 'landing_page',
      'referrer', 'utm_source', 'utm_medium', 'utm_campaign', 'utm_term',
      'utm_content', 'device', 'browser', 'traffic_source'
    ]
  },
  CTA_EVENTS: {
    name: 'CTA Events',
    headers: [
      'timestamp', 'cta_id', 'cta_name', 'cta_type', 'page_url',
      'session_id', 'destination', 'utm_source', 'utm_medium', 'utm_campaign'
    ]
  },
  CHATBOT_LEADS: {
    name: 'Chatbot Leads',
    headers: [
      'timestamp', 'lead_id', 'source', 'page_url', 'session_id',
      'name', 'work_email', 'company', 'role', 'offering', 'industry',
      'requirement', 'chat_intent', 'status', 'utm_source', 'utm_medium',
      'utm_campaign'
    ]
  },
  WHATSAPP_EVENTS: {
    name: 'WhatsApp Events',
    headers: [
      'timestamp', 'event_name', 'page_url', 'cta_source', 'session_id',
      'utm_source', 'utm_medium', 'utm_campaign'
    ]
  }
};

/**
 * Health Check & Status Endpoint (GET)
 */
function doGet(e) {
  const result = {
    status: 'online',
    service: 'TrustGrid.AI 95-Column Behavioral Telemetry & Lead Engine',
    version: '8.0.0',
    schema_fields: SCHEMA_95_HEADERS.length,
    timestamp: new Date().toISOString()
  };
  return createJsonResponse(result);
}

/**
 * Primary Post Ingestion Handler (POST)
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  
  try {
    lock.waitLock(10000);

    if (!e || !e.postData || !e.postData.contents) {
      return createJsonResponse({ success: false, message: 'Empty payload received' }, 400);
    }

    let payload;
    try {
      payload = JSON.parse(e.postData.contents);
    } catch (parseErr) {
      return createJsonResponse({ success: false, message: 'Invalid JSON format' }, 400);
    }

    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const serverTimestamp = new Date().toISOString();

    // Check if this is an array of events (batching support)
    if (Array.isArray(payload)) {
      payload.forEach(function(item) {
        processSingleEvent(spreadsheet, item, serverTimestamp);
      });
      return createJsonResponse({
        success: true,
        message: 'Batch of ' + payload.length + ' events recorded successfully'
      });
    }

    const result = processSingleEvent(spreadsheet, payload, serverTimestamp);
    return createJsonResponse(result);

  } catch (error) {
    Logger.log('Error processing request: ' + error.toString());
    return createJsonResponse({
      success: false,
      message: 'Unable to record event: ' + error.toString()
    }, 500);
  } finally {
    try {
      lock.releaseLock();
    } catch (lockErr) {}
  }
}

/**
 * Process a single incoming event
 */
function processSingleEvent(spreadsheet, payload, serverTimestamp) {
  const eventType = (payload.event_type || payload.type || payload.event_name || 'telemetry_95').toLowerCase();
  
  // 1. Always record in 95-column master telemetry sheet if telemetry payload
  let telemetryResult = recordTelemetry95(spreadsheet, payload, serverTimestamp);

  // 2. If it's a form lead, also record in Leads sheet
  let leadResult = null;
  if (eventType === 'lead' || eventType === 'form_submission' || eventType === 'form_submit' || payload.form_completion_status === true || payload.work_email || payload.email) {
    leadResult = recordLead(spreadsheet, payload, serverTimestamp);
  } else if (eventType === 'chatbot_lead' || eventType === 'chat_lead') {
    leadResult = recordChatbotLead(spreadsheet, payload, serverTimestamp);
  } else if (eventType === 'whatsapp_click' || eventType === 'whatsapp_event') {
    recordWhatsAppEvent(spreadsheet, payload, serverTimestamp);
  }

  return {
    success: true,
    message: 'Event recorded successfully in 95-column telemetry format',
    event_type: eventType,
    telemetry_id: telemetryResult.record_id || null,
    lead_id: leadResult ? leadResult.record_id : null
  };
}

/**
 * 1. Record 95-Column Granular Telemetry Row
 */
function recordTelemetry95(ss, data, timestamp) {
  const sheet = getOrCreateSheet(ss, SCHEMAS.TELEMETRY_95);

  const row = SCHEMA_95_HEADERS.map(function(key) {
    let val = data[key];
    if (val === undefined || val === null) {
      // Aliases
      if (key === 'timestamp') val = timestamp;
      else if (key === 'user_email') val = data.email || data.work_email || '';
      else if (key === 'user_name') val = data.name || data.fullName || '';
      else if (key === 'page_url') val = data.pageUrl || data.url || '';
      else if (key === 'page') val = data.pagePath || data.pathname || '/';
      else if (key === 'previous_page') val = data.previousPage || '';
      else if (key === 'page_title') val = data.pageTitle || '';
      else if (key === 'element_text') val = data.elementText || data.text || '';
      else if (key === 'element_type') val = data.elementType || data.tagName || '';
      else if (key === 'element_id') val = data.elementId || '';
      else if (key === 'element_class') val = data.elementClass || data.className || '';
      else if (key === 'traffic_source') val = data.trafficSource || 'direct';
      else if (key === 'referrer_url') val = data.referrer || data.referrerUrl || '';
      else if (key === 'time_on_page') val = data.timeOnPage || 0;
      else if (key === 'scroll_percentage') val = data.scrollPercentage || data.scrollDepth || 0;
      else if (key === 'max_scroll_depth') val = data.maxScrollDepth || 0;
      else if (key === 'interaction_count') val = data.interactionCount || 0;
      else if (key === 'inactivity_time') val = data.inactivityTime || 0;
      else if (key === 'rage_click_detected') val = Boolean(data.rageClickDetected || data.rage_click_detected);
      else if (key === 'copy_event') val = Boolean(data.copyEvent || data.copy_event);
      else if (key === 'paste_event') val = Boolean(data.pasteEvent || data.paste_event);
      else if (key === 'back_button_used') val = Boolean(data.backButtonUsed || data.back_button_used);
      else if (key === 'tab_visibility_status') val = data.tabVisibilityStatus || data.visibility || 'visible';
      else if (key === 'user_segment') val = data.userSegment || 'Product Explorer';
      else val = '';
    }
    return val;
  });

  sheet.appendRow(row);
  return { record_id: data.event_id || ('evt_' + Date.now()) };
}

/**
 * 2. Record Qualified Lead into "Leads" Sheet
 */
function recordLead(ss, data, timestamp) {
  const sheet = getOrCreateSheet(ss, SCHEMAS.LEADS);
  const leadId = data.lead_id || data.conversion_id || ('tg_lead_' + Utilities.getUuid().substring(0, 8));

  const row = [
    timestamp,
    leadId,
    data.lead_source || data.form_id || 'website_form',
    data.form_id || '',
    data.form_name || '',
    data.page_url || data.page || '',
    data.page_title || '',
    data.user_name || data.name || '',
    data.user_email || data.work_email || data.email || '',
    data.company || '',
    data.role || '',
    data.phone || '',
    data.offering || (Array.isArray(data.solutions) ? data.solutions.join(', ') : ''),
    data.industry || '',
    data.requirement || data.message || '',
    data.chat_intent || '',
    data.status || 'New Lead',
    data.utm_source || '',
    data.utm_medium || '',
    data.utm_campaign || '',
    data.utm_term || '',
    data.utm_content || '',
    data.referrer_url || data.referrer || '',
    data.entry_page || data.landing_page || ''
  ];

  sheet.appendRow(row);
  return { record_id: leadId };
}

/**
 * 3. Record Chatbot Lead
 */
function recordChatbotLead(ss, data, timestamp) {
  const sheet = getOrCreateSheet(ss, SCHEMAS.CHATBOT_LEADS);
  const leadId = data.lead_id || ('chat_lead_' + Utilities.getUuid().substring(0, 8));

  const row = [
    timestamp,
    leadId,
    'ai_architect_chatbot',
    data.page_url || data.page || '',
    data.session_id || '',
    data.user_name || data.name || '',
    data.user_email || data.work_email || data.email || '',
    data.company || '',
    data.role || '',
    data.offering || '',
    data.industry || '',
    data.requirement || '',
    data.chat_intent || 'architecture_audit',
    data.status || 'Chat Qualified Lead',
    data.utm_source || '',
    data.utm_medium || '',
    data.utm_campaign || ''
  ];

  sheet.appendRow(row);
  return { record_id: leadId };
}

/**
 * 4. Record WhatsApp Event
 */
function recordWhatsAppEvent(ss, data, timestamp) {
  const sheet = getOrCreateSheet(ss, SCHEMAS.WHATSAPP_EVENTS);

  const row = [
    timestamp,
    data.event_name || 'whatsapp_click',
    data.page_url || data.page || '',
    data.cta_source || 'floating_widget',
    data.session_id || '',
    data.utm_source || '',
    data.utm_medium || '',
    data.utm_campaign || ''
  ];

  sheet.appendRow(row);
  return { record_id: 'wa_' + Date.now() };
}

/**
 * Helper: Retrieve or Auto-Create Sheet with Formatted Headers
 */
function getOrCreateSheet(ss, schema) {
  let sheet = ss.getSheetByName(schema.name);
  if (!sheet) {
    sheet = ss.insertSheet(schema.name);
    sheet.appendRow(schema.headers);
    const headerRange = sheet.getRange(1, 1, 1, schema.headers.length);
    headerRange.setFontWeight('bold');
    headerRange.setBackground('#060e22');
    headerRange.setFontColor('#38bdf8');
    sheet.setFrozenRows(1);
    try {
      sheet.autoResizeColumns(1, Math.min(30, schema.headers.length));
    } catch (e) {}
  }
  return sheet;
}

/**
 * Manual Initializer for Master 95-Column Sheet
 */
function initializeMaster95TelemetrySheet() {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = getOrCreateSheet(ss, SCHEMAS.TELEMETRY_95);
  SpreadsheetApp.getUi().alert("✅ Successfully Initialized 95-Column 'Live_Traffic_Events' Telemetry Sheet!");
}

/**
 * Helper: Format JSON Response
 */
function createJsonResponse(obj, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
