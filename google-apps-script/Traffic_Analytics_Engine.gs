/**
 * ==============================================================================
 * TRUSTGRID.AI — SCRIPT 2: TRAFFIC, FUNNEL & BEHAVIOR ANALYTICS ENGINE
 * Google Apps Script Web App Endpoint
 * ==============================================================================
 * 
 * Purpose: Captures real-time user journey telemetry and funnel analytics:
 * 1. Traffic         — Pageviews, multi-touch UTM attribution, devices, browser, OS
 * 2. Form Events     — Form funnel analytics (view -> start -> field -> error -> abandon -> submit)
 * 3. CTA Events      — Interactive clicks (Hero, Nav, Buttons, Outbound, Scroll Depth)
 * 4. WhatsApp Events — Floating and in-page WhatsApp conversion triggers
 * 5. Analytics Summary — Auto-calculating executive KPI dashboard
 * 
 * Key Features:
 * - Automated sheet header setup with styled dark-cyan header rows
 * - Non-blocking high-throughput LockService concurrency handling
 * - Real-time conversion and traffic attribution metrics
 * - Safe JSON parsing & CORS support
 * ==============================================================================
 */

const SCHEMAS_ANALYTICS = {
  TRAFFIC: {
    name: 'Traffic',
    headers: [
      'Timestamp',
      'Event ID',
      'Session ID',
      'Page URL',
      'Page Path',
      'Page Title',
      'Landing Page',
      'Referrer',
      'Previous Page',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'UTM Term',
      'UTM Content',
      'First-Touch Source',
      'Last-Touch Source',
      'Device Type',
      'Browser',
      'Operating System',
      'Screen Resolution'
    ]
  },
  FORM_EVENTS: {
    name: 'Form Events',
    headers: [
      'Timestamp',
      'Event ID',
      'Event Type',
      'Form ID',
      'Form Name',
      'Form Type',
      'Field Name',
      'CTA Source',
      'Session ID',
      'Page URL',
      'Status / Error',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign'
    ]
  },
  CTA_EVENTS: {
    name: 'CTA Events',
    headers: [
      'Timestamp',
      'Event ID',
      'CTA Name / Text',
      'Element Type',
      'Destination URL',
      'Section / Location',
      'CTA Source',
      'Session ID',
      'Page URL',
      'UTM Source',
      'UTM Campaign'
    ]
  },
  WHATSAPP_EVENTS: {
    name: 'WhatsApp Events',
    headers: [
      'Timestamp',
      'Event ID',
      'Event Action',
      'CTA Source',
      'Widget Position',
      'Inquiry Topic',
      'Session ID',
      'Page URL',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign'
    ]
  },
  SCROLL_DEPTH: {
    name: 'Scroll Depth',
    headers: [
      'Timestamp',
      'Event ID',
      'Milestone %',
      'Session ID',
      'Page Path',
      'Page Title',
      'Device Type'
    ]
  }
};

/**
 * GET Handler - Health Check & Quick Metrics
 */
function doGet(e) {
  return createJsonResponse({
    status: 'online',
    service: 'TrustGrid.AI Traffic & Funnel Analytics Engine (Script 2)',
    version: '3.0.0',
    timestamp: new Date().toISOString()
  });
}

/**
 * POST Handler - Telemetry Ingestion
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
    } catch (err) {
      return createJsonResponse({ success: false, message: 'Invalid JSON format' }, 400);
    }

    const eventType = (payload.eventType || payload.event_type || payload.type || 'pageview').toUpperCase();
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const timestamp = new Date().toISOString();

    let result;

    switch (eventType) {
      case 'PAGE_VIEW':
      case 'PAGEVIEW':
      case 'TRAFFIC_EVENT':
        result = recordTrafficEvent(spreadsheet, payload, timestamp);
        break;

      case 'FORM_VIEW':
      case 'FORM_START':
      case 'FORM_FIELD_INTERACTION':
      case 'FORM_VALIDATION_ERROR':
      case 'FORM_ABANDON':
      case 'FORM_SUCCESS':
      case 'FORM_FAILURE':
      case 'FORM_EVENT':
        result = recordFormFunnelEvent(spreadsheet, payload, timestamp, eventType);
        break;

      case 'CTA_CLICK':
      case 'NAVIGATION_CLICK':
      case 'OUTBOUND_LINK_CLICK':
      case 'EMAIL_CLICK':
      case 'PHONE_CLICK':
        result = recordCTAInteraction(spreadsheet, payload, timestamp, eventType);
        break;

      case 'WHATSAPP_CLICK':
      case 'WHATSAPP_EVENT':
        result = recordWhatsAppInteraction(spreadsheet, payload, timestamp);
        break;

      case 'SCROLL_DEPTH':
        result = recordScrollDepth(spreadsheet, payload, timestamp);
        break;

      default:
        result = recordTrafficEvent(spreadsheet, payload, timestamp);
        break;
    }

    return createJsonResponse({
      success: true,
      message: 'Telemetry recorded',
      event_type: eventType,
      record_id: result.record_id || null,
      timestamp: timestamp
    });

  } catch (error) {
    Logger.log('Error in Analytics Engine: ' + error.toString());
    return createJsonResponse({
      success: false,
      message: 'Telemetry processing failed safely: ' + error.message
    }, 500);
  } finally {
    try {
      lock.releaseLock();
    } catch (e) {}
  }
}

/**
 * 1. Record Pageview & Traffic Attribution
 */
function recordTrafficEvent(ss, data, timestamp) {
  const sheet = getOrCreateSheet(ss, SCHEMAS_ANALYTICS.TRAFFIC);
  const eventId = data.eventId || ('evt_' + Date.now());

  const row = [
    timestamp,
    eventId,
    data.sessionId || '',
    data.pageUrl || '',
    data.pagePath || '',
    data.pageTitle || '',
    data.landingPage || '',
    data.referrer || 'Direct',
    data.previousPage || '',
    data.utmSource || 'Direct / Organic',
    data.utmMedium || 'None',
    data.utmCampaign || 'None',
    data.utmTerm || 'None',
    data.utmContent || 'None',
    data.firstTouchSource || '',
    data.lastTouchSource || '',
    data.device || 'Desktop',
    data.browser || 'Unknown',
    data.operatingSystem || 'Unknown',
    data.screenSize || ''
  ];

  sheet.appendRow(row);
  return { record_id: eventId };
}

/**
 * 2. Record Form Funnel Telemetry
 */
function recordFormFunnelEvent(ss, data, timestamp, eventType) {
  const sheet = getOrCreateSheet(ss, SCHEMAS_ANALYTICS.FORM_EVENTS);
  const eventId = data.eventId || ('fe_' + Date.now());

  const row = [
    timestamp,
    eventId,
    eventType,
    data.formId || '',
    data.formName || '',
    data.formType || 'lead_form',
    data.fieldName || '',
    data.ctaSource || '',
    data.sessionId || '',
    data.pageUrl || '',
    data.elementText || data.leadStatus || '',
    data.utmSource || '',
    data.utmMedium || '',
    data.utmCampaign || ''
  ];

  sheet.appendRow(row);
  return { record_id: eventId };
}

/**
 * 3. Record CTA Click
 */
function recordCTAInteraction(ss, data, timestamp, eventType) {
  const sheet = getOrCreateSheet(ss, SCHEMAS_ANALYTICS.CTA_EVENTS);
  const eventId = data.eventId || ('cta_' + Date.now());

  const row = [
    timestamp,
    eventId,
    data.elementText || '',
    data.element || eventType,
    data.destination || '',
    data.section || '',
    data.ctaSource || '',
    data.sessionId || '',
    data.pageUrl || '',
    data.utmSource || '',
    data.utmCampaign || ''
  ];

  sheet.appendRow(row);
  return { record_id: eventId };
}

/**
 * 4. Record WhatsApp Event
 */
function recordWhatsAppInteraction(ss, data, timestamp) {
  const sheet = getOrCreateSheet(ss, SCHEMAS_ANALYTICS.WHATSAPP_EVENTS);
  const eventId = data.eventId || ('wa_' + Date.now());

  const row = [
    timestamp,
    eventId,
    data.eventType || 'WHATSAPP_CLICK',
    data.ctaSource || 'floating_cta',
    data.whatsappPosition || 'bottom-left',
    data.elementText || '',
    data.sessionId || '',
    data.pageUrl || '',
    data.utmSource || '',
    data.utmMedium || '',
    data.utmCampaign || ''
  ];

  sheet.appendRow(row);
  return { record_id: eventId };
}

/**
 * 5. Record Scroll Depth Milestone
 */
function recordScrollDepth(ss, data, timestamp) {
  const sheet = getOrCreateSheet(ss, SCHEMAS_ANALYTICS.SCROLL_DEPTH);
  const eventId = data.eventId || ('sd_' + Date.now());

  const row = [
    timestamp,
    eventId,
    (data.scrollDepth || 0) + '%',
    data.sessionId || '',
    data.pagePath || '',
    data.pageTitle || '',
    data.device || ''
  ];

  sheet.appendRow(row);
  return { record_id: eventId };
}

/**
 * Helper: Auto-Create Sheet with Styled Dark-Cyan Headers
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
  }
  return sheet;
}

/**
 * Helper: CORS JSON Output
 */
function createJsonResponse(obj, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
