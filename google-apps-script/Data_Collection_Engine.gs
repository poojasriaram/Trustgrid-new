/**
 * ==============================================================================
 * TRUSTGRID.AI — SCRIPT 1: LEAD & FORM DATA COLLECTION ENGINE
 * Google Apps Script Web App Endpoint
 * ==============================================================================
 * 
 * Purpose: Captures high-intent qualified leads from all website touchpoints:
 * 1. Leads          — Main Contact Form, AI Diagnostic, RFP, Workshop Submissions
 * 2. Chatbot Leads  — Conversational qualified leads from AI Architect Chatbot
 * 3. Careers        — Career applications and talent submissions
 * 
 * Key Features:
 * - Automatic Sheet & Header Initialization with formatted dark theme
 * - Concurrency protection with LockService (prevents race conditions)
 * - Anti-duplicate lead submission filter (10-row window check)
 * - Safe JSON parsing & CORS support
 * - Optional Admin Email Notification trigger
 * ==============================================================================
 */

// Configuration
const CONFIG = {
  NOTIFICATION_EMAIL: '', // Enter your notification email if you want lead alerts (e.g. 'leads@trustgrid.ai')
  SHEET_NAME_LEADS: 'Leads',
  SHEET_NAME_CHATBOT: 'Chatbot Leads',
  SHEET_NAME_CAREERS: 'Careers'
};

const SCHEMAS_COLLECTION = {
  LEADS: {
    name: 'Leads',
    headers: [
      'Timestamp',
      'Lead ID',
      'Lead Source',
      'Form ID',
      'Form Name',
      'Page URL',
      'Page Title',
      'Full Name',
      'Work Email',
      'Company',
      'Role / Title',
      'Phone',
      'Selected Offering',
      'Industry Vertical',
      'Requirement Details',
      'Chat Intent',
      'Status',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign',
      'UTM Term',
      'UTM Content',
      'Initial Referrer',
      'Landing Page',
      'Session ID'
    ]
  },
  CHATBOT: {
    name: 'Chatbot Leads',
    headers: [
      'Timestamp',
      'Lead ID',
      'Source',
      'Page URL',
      'Session ID',
      'Full Name',
      'Work Email',
      'Company',
      'Role',
      'Offering Interest',
      'Industry',
      'Requirement / Problem',
      'Identified Intent',
      'Status',
      'UTM Source',
      'UTM Medium',
      'UTM Campaign'
    ]
  },
  CAREERS: {
    name: 'Careers',
    headers: [
      'Timestamp',
      'Application ID',
      'Job Role',
      'Full Name',
      'Email',
      'Phone',
      'LinkedIn Profile',
      'Portfolio / GitHub',
      'Experience Summary',
      'Resume URL / Notes',
      'Status'
    ]
  }
};

/**
 * GET Handler - Service Health Check
 */
function doGet(e) {
  return createJsonResponse({
    status: 'online',
    service: 'TrustGrid.AI Data Collection Engine (Script 1)',
    version: '3.0.0',
    timestamp: new Date().toISOString()
  });
}

/**
 * POST Handler - Lead Ingestion
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

    const eventType = (payload.event_type || payload.type || 'lead').toLowerCase();
    const spreadsheet = SpreadsheetApp.getActiveSpreadsheet();
    const timestamp = new Date().toISOString();

    let result;

    if (eventType === 'chatbot_lead' || eventType === 'chat_lead') {
      result = recordChatbotLead(spreadsheet, payload, timestamp);
    } else if (eventType === 'career' || eventType === 'job_application') {
      result = recordCareerApplication(spreadsheet, payload, timestamp);
    } else {
      result = recordGeneralLead(spreadsheet, payload, timestamp);
    }

    // Optional email alert
    if (CONFIG.NOTIFICATION_EMAIL && result.record_id && !result.suppressed) {
      sendLeadNotificationEmail(payload, result.record_id);
    }

    return createJsonResponse({
      success: true,
      message: 'Lead recorded successfully',
      lead_id: result.record_id || null,
      timestamp: timestamp
    });

  } catch (error) {
    Logger.log('Error in Data Collection Engine: ' + error.toString());
    return createJsonResponse({
      success: false,
      message: 'Failed to record lead safely: ' + error.message
    }, 500);
  } finally {
    try {
      lock.releaseLock();
    } catch (e) {}
  }
}

/**
 * Record Standard Website Lead
 */
function recordGeneralLead(ss, data, timestamp) {
  const sheet = getOrCreateSheet(ss, SCHEMAS_COLLECTION.LEADS);
  const leadId = data.lead_id || ('tg_lead_' + Utilities.getUuid().substring(0, 8));

  // Duplicate Check
  const lastRow = sheet.getLastRow();
  if (lastRow > 1) {
    const checkRange = sheet.getRange(Math.max(2, lastRow - 10), 1, Math.min(10, lastRow - 1), 9).getValues();
    const isDuplicate = checkRange.some(row => row[8] === (data.work_email || data.email) && row[3] === (data.form_id || ''));
    if (isDuplicate) {
      return { record_id: leadId, suppressed: true };
    }
  }

  const row = [
    timestamp,
    leadId,
    data.lead_source || 'website_form',
    data.form_id || '',
    data.form_name || '',
    data.page_url || '',
    data.page_title || '',
    data.name || '',
    data.work_email || data.email || '',
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
    data.referrer || '',
    data.landing_page || '',
    data.session_id || ''
  ];

  sheet.appendRow(row);
  return { record_id: leadId };
}

/**
 * Record AI Architect Chatbot Lead
 */
function recordChatbotLead(ss, data, timestamp) {
  const sheet = getOrCreateSheet(ss, SCHEMAS_COLLECTION.CHATBOT);
  const leadId = data.lead_id || ('chat_lead_' + Utilities.getUuid().substring(0, 8));

  const row = [
    timestamp,
    leadId,
    'ai_architect_chatbot',
    data.page_url || '',
    data.session_id || '',
    data.name || '',
    data.work_email || data.email || '',
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
 * Record Career Application
 */
function recordCareerApplication(ss, data, timestamp) {
  const sheet = getOrCreateSheet(ss, SCHEMAS_COLLECTION.CAREERS);
  const appId = 'app_' + Utilities.getUuid().substring(0, 8);

  const row = [
    timestamp,
    appId,
    data.job_role || data.role || 'General Application',
    data.name || '',
    data.email || '',
    data.phone || '',
    data.linkedin || '',
    data.github || data.portfolio || '',
    data.experience || data.message || '',
    data.resume_url || data.notes || '',
    'Applied'
  ];

  sheet.appendRow(row);
  return { record_id: appId };
}

/**
 * Helper: Send Email Alert
 */
function sendLeadNotificationEmail(data, leadId) {
  try {
    const subject = `[TrustGrid Lead] New Lead from ${data.name || 'Visitor'} (${data.company || 'Enterprise'})`;
    const body = `
New High-Intent Qualified Lead Captured:

• Lead ID: ${leadId}
• Name: ${data.name || 'N/A'}
• Work Email: ${data.work_email || data.email || 'N/A'}
• Company: ${data.company || 'N/A'}
• Role: ${data.role || 'N/A'}
• Phone: ${data.phone || 'N/A'}
• Offering: ${data.offering || 'N/A'}
• Industry: ${data.industry || 'N/A'}
• Requirements: ${data.requirement || data.message || 'N/A'}

Traffic Attribution:
• Source: ${data.utm_source || 'Direct'}
• Campaign: ${data.utm_campaign || 'None'}
• Page URL: ${data.page_url || 'N/A'}
• Timestamp: ${new Date().toUTCString()}
    `;
    MailApp.sendEmail(CONFIG.NOTIFICATION_EMAIL, subject, body);
  } catch (e) {
    Logger.log('Could not send notification email: ' + e.message);
  }
}

/**
 * Helper: Get or Create Sheet with Formatted Headers
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
 * Helper: CORS JSON Response
 */
function createJsonResponse(obj, statusCode) {
  return ContentService.createTextOutput(JSON.stringify(obj))
    .setMimeType(ContentService.MimeType.JSON);
}
