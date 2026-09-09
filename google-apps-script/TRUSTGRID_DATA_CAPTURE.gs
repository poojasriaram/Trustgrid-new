/**
 * ============================================================================
 * TRUSTGRID.AI — GOOGLE APPS SCRIPT #1: COMPLETE WEBSITE DATA CAPTURE
 * ============================================================================
 * 
 * Target Database: GOOGLE SHEET #1 (TRUSTGRID.AI — WEBSITE DATA)
 * Spreadsheet ID: 1r1oH1BVgX0iFx1DQ6TCiP3VqvY0LestlHkLNln635Sg
 * 
 * Captures all website activity:
 * - Page Views, Sessions & Traffic
 * - CTA Clicks, Navigation Clicks, Outbound Links
 * - Form Views, Starts, Interactions, Submissions
 * - Lead Scoring, Internal Alerts to poojasri.trustgrid@gmail.com
 * - Anti-Formula Injection Sanitization & Machine-Readable Raw Data
 * ============================================================================
 */

const DATA_CAPTURE_CONFIG = {
  DEFAULT_SPREADSHEET_ID: '1r1oH1BVgX0iFx1DQ6TCiP3VqvY0LestlHkLNln635Sg',
  REPORT_EMAIL: 'poojasri.trustgrid@gmail.com',
  COMPANY_NAME: 'TrustGrid.ai',
  TIMEZONE: 'Asia/Kolkata',
  SCORE_HIGH: 80,
  SCORE_MEDIUM: 50,
  PRIMARY_COLOR: '#07143d',
  ACCENT_BLUE: '#1d5cff'
};

/**
 * Health check & status verification
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    status: 'ACTIVE',
    service: 'TRUSTGRID_WEBSITE_DATA_CAPTURE',
    timestamp: Utilities.formatDate(new Date(), DATA_CAPTURE_CONFIG.TIMEZONE, "yyyy-MM-dd'T'HH:mm:ssXXX"),
    company: DATA_CAPTURE_CONFIG.COMPANY_NAME
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Unified POST handler for telemetry events and form submissions
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    lock.waitLock(30000);

    let raw = {};
    if (e && e.postData && e.postData.contents) {
      try {
        raw = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        raw = e.parameter || {};
      }
    } else if (e && e.parameter) {
      raw = e.parameter;
    }

    const ss = getOrCreateSpreadsheet();
    initializeSheets(ss);

    const eventType = sanitizeData(raw.eventType || (raw.name ? 'FORM_SUBMIT' : 'PAGE_VIEW'));

    // Branch: Form Submission vs Telemetry Event
    if (eventType === 'FORM_SUBMIT' || raw.email) {
      return captureFormSubmission(ss, raw);
    } else if (eventType === 'PAGE_VIEW') {
      return capturePageView(ss, raw);
    } else if (eventType === 'CTA_CLICK') {
      return captureCTA(ss, raw);
    } else {
      return captureGenericEvent(ss, raw, eventType);
    }

  } catch (err) {
    logError(err, 'doPost Handler');
    return sendJsonResponse(false, 'Capture error: ' + err.message);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Sanitizes input to prevent Sheet formula injection
 */
function sanitizeData(val) {
  if (val === null || val === undefined) return '';
  let str = String(val).trim();
  if (/^[=+\-@\t\r]/.test(str)) {
    str = "'" + str;
  }
  return str;
}

function isValidEmail(email) {
  return /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email);
}

function sendJsonResponse(success, message, extraData) {
  const res = Object.assign({ success: success, message: message }, extraData || {});
  return ContentService.createTextOutput(JSON.stringify(res)).setMimeType(ContentService.MimeType.JSON);
}

function getOrCreateSpreadsheet() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('SPREADSHEET_ID') || DATA_CAPTURE_CONFIG.DEFAULT_SPREADSHEET_ID;

  if (id) {
    try {
      return SpreadsheetApp.openById(id);
    } catch (e) {
      Logger.log('Could not open spreadsheet by ID: ' + e.toString());
    }
  }

  try {
    if (SpreadsheetApp.getActiveSpreadsheet()) return SpreadsheetApp.getActiveSpreadsheet();
  } catch (e) {}

  try {
    const files = DriveApp.getFilesByName('TRUSTGRID.AI — WEBSITE DATA');
    if (files.hasNext()) {
      const file = files.next();
      props.setProperty('SPREADSHEET_ID', file.getId());
      return SpreadsheetApp.openById(file.getId());
    }
  } catch (e) {}

  const ss = SpreadsheetApp.create('TRUSTGRID.AI — WEBSITE DATA');
  props.setProperty('SPREADSHEET_ID', ss.getId());
  return ss;
}

/**
 * Initializes all 14 structured sheets in Google Sheet #1
 */
function initializeSheets(ss) {
  const schema = [
    {
      name: 'Website Events',
      headers: [
        'Event ID', 'Timestamp', 'Event Type', 'Session ID', 'User/Lead ID',
        'Page URL', 'Page Path', 'Page Title', 'Element', 'Element ID',
        'Element Text', 'Section', 'Destination', 'Referrer', 'Landing Page',
        'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Term', 'UTM Content',
        'Device', 'Browser', 'OS', 'Screen Size', 'Country', 'Region', 'City'
      ]
    },
    {
      name: 'Page Views',
      headers: [
        'Event ID', 'Timestamp', 'Session ID', 'Page URL', 'Page Path',
        'Page Title', 'Referrer', 'Landing Page', 'Previous Page', 'Time on Page',
        'Scroll Depth', 'Device', 'Browser', 'OS', 'Screen Width', 'Screen Height',
        'Country', 'Region', 'City'
      ]
    },
    {
      name: 'CTA Clicks',
      headers: [
        'Event ID', 'Timestamp', 'Session ID', 'CTA Name', 'CTA Text',
        'CTA Type', 'Page URL', 'Page Section', 'Destination URL', 'Referrer',
        'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Term', 'UTM Content',
        'Device', 'Browser'
      ]
    },
    {
      name: 'Form Submissions',
      headers: [
        'Submission ID', 'Timestamp', 'Form Name', 'Name', 'Work Email', 'Phone',
        'Company', 'Designation', 'Industry', 'Company Size', 'Country',
        'Business Function', 'AI Maturity', 'Challenges', 'Objective',
        'Preferred Timeline', 'Message', 'Page URL', 'Landing Page', 'Referrer',
        'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Term', 'UTM Content',
        'Device', 'Browser', 'Operating System', 'Screen Size',
        'Lead Score', 'Lead Status', 'Follow-up Status', 'Assigned To', 'Notes'
      ]
    },
    {
      name: 'AI Diagnostic Leads',
      headers: [
        'Submission ID', 'Timestamp', 'Name', 'Work Email', 'Phone', 'Company', 'Designation',
        'Industry', 'Company Size', 'Country', 'Business Function', 'AI Maturity',
        'Challenges', 'Objective', 'Preferred Timeline', 'Solutions Selected', 'Message',
        'Lead Score', 'Lead Status', 'Follow-up Status'
      ]
    },
    {
      name: 'Contact Leads',
      headers: ['Submission ID', 'Timestamp', 'Name', 'Work Email', 'Phone', 'Company', 'Designation', 'Industry', 'Subject', 'Message', 'Lead Score', 'Follow-up Status']
    },
    {
      name: 'Newsletter Leads',
      headers: ['Submission ID', 'Timestamp', 'Name', 'Work Email', 'Company', 'Industry', 'UTM Source', 'Follow-up Status']
    },
    {
      name: 'Partnership Leads',
      headers: ['Submission ID', 'Timestamp', 'Name', 'Work Email', 'Phone', 'Company', 'Designation', 'Partnership Type', 'Message', 'Follow-up Status']
    },
    {
      name: 'Career Leads',
      headers: ['Submission ID', 'Timestamp', 'Name', 'Email', 'Phone', 'Role Applied', 'Experience', 'LinkedIn', 'Portfolio', 'Resume Link', 'Message', 'Follow-up Status']
    },
    {
      name: 'Sessions',
      headers: [
        'Session ID', 'First Visit', 'Last Activity', 'Landing Page', 'Exit Page',
        'Pages Viewed', 'Page View Count', 'CTA Count', 'Forms Viewed', 'Forms Started',
        'Forms Submitted', 'Device', 'Browser', 'OS', 'UTM Source', 'UTM Medium',
        'UTM Campaign', 'Referrer'
      ]
    },
    {
      name: 'UTM Data',
      headers: ['Timestamp', 'Session ID', 'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Term', 'UTM Content', 'Landing Page', 'Referrer']
    },
    {
      name: 'Email Log',
      headers: ['Submission ID', 'Timestamp', 'Recipient', 'Email Type', 'Status', 'Notes']
    },
    {
      name: 'Errors',
      headers: ['Timestamp', 'Error Message', 'Context', 'Stack Trace']
    },
    {
      name: 'Configuration',
      headers: ['Key', 'Value', 'Description']
    }
  ];

  schema.forEach(s => {
    let sheet = ss.getSheetByName(s.name);
    if (!sheet) {
      sheet = ss.insertSheet(s.name);
      sheet.appendRow(s.headers);
      formatHeader(sheet);
    }
  });

  const configSheet = ss.getSheetByName('Configuration');
  if (configSheet && configSheet.getLastRow() <= 1) {
    seedConfig(configSheet);
  }
}

function formatHeader(sheet) {
  const lastCol = sheet.getLastColumn() || 1;
  const range = sheet.getRange(1, 1, 1, lastCol);
  range.setBackground(DATA_CAPTURE_CONFIG.PRIMARY_COLOR)
       .setFontColor('#FFFFFF')
       .setFontWeight('bold')
       .setFontFamily('Segoe UI, Roboto, Arial')
       .setFontSize(10);
  sheet.setFrozenRows(1);
}

function seedConfig(sheet) {
  const rows = [
    ['REPORT_EMAIL', 'poojasri.trustgrid@gmail.com', 'Alert & Report Recipient'],
    ['COMPANY_NAME', 'TrustGrid.ai', 'Company Name'],
    ['SCORE_HIGH_THRESHOLD', '80', 'Minimum score for HIGH priority lead'],
    ['SCORE_MEDIUM_THRESHOLD', '50', 'Minimum score for MEDIUM priority lead'],
    ['POINTS_WORK_EMAIL', '10', 'Score bonus for corporate email'],
    ['POINTS_COMPANY', '10', 'Score bonus for company name'],
    ['POINTS_ENTERPRISE_SIZE', '15', 'Score bonus for 500+ employees'],
    ['POINTS_PRODUCTION_AI', '15', 'Score bonus for production / scale AI'],
    ['POINTS_INFRA_SECURITY_CHALLENGE', '10', 'Score bonus for infra/security challenge']
  ];
  rows.forEach(r => sheet.appendRow(r));
  formatHeader(sheet);
}

function generateSubmissionId(ss) {
  const dateStr = Utilities.formatDate(new Date(), DATA_CAPTURE_CONFIG.TIMEZONE, 'yyyyMMdd');
  const sheet = ss.getSheetByName('Form Submissions');
  const count = sheet ? Math.max(1, sheet.getLastRow()) : 1;
  return `TG-${dateStr}-${('0000' + count).slice(-4)}`;
}

/**
 * 1. Capture Page View
 */
function capturePageView(ss, raw) {
  const ts = Utilities.formatDate(new Date(), DATA_CAPTURE_CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
  const eventId = raw.eventId || `EVT-${Date.now().toString(36)}`;
  const sessionId = raw.sessionId || 'anonymous_session';

  const screens = (raw.screenSize || '').split('x');
  const width = screens[0] || '';
  const height = screens[1] || '';

  const pvSheet = ss.getSheetByName('Page Views');
  if (pvSheet) {
    pvSheet.appendRow([
      eventId, ts, sessionId,
      sanitizeData(raw.pageUrl),
      sanitizeData(raw.pagePath),
      sanitizeData(raw.pageTitle),
      sanitizeData(raw.referrer),
      sanitizeData(raw.landingPage),
      sanitizeData(raw.previousPage),
      sanitizeData(raw.timeOnPage || 0),
      sanitizeData(raw.scrollDepth || 0),
      sanitizeData(raw.device || 'Desktop'),
      sanitizeData(raw.browser || 'Chrome'),
      sanitizeData(raw.operatingSystem || 'OS'),
      width, height,
      sanitizeData(raw.country || 'Global'),
      sanitizeData(raw.region || ''),
      sanitizeData(raw.city || '')
    ]);
  }

  // Also log to Master Website Events
  logToMasterEvents(ss, eventId, ts, 'PAGE_VIEW', sessionId, raw);
  updateSessionRecord(ss, sessionId, raw, 'PAGE_VIEW');

  return sendJsonResponse(true, 'Page view captured', { eventId });
}

/**
 * 2. Capture CTA Click
 */
function captureCTA(ss, raw) {
  const ts = Utilities.formatDate(new Date(), DATA_CAPTURE_CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
  const eventId = raw.eventId || `EVT-${Date.now().toString(36)}`;
  const sessionId = raw.sessionId || 'anonymous_session';

  const ctaSheet = ss.getSheetByName('CTA Clicks');
  if (ctaSheet) {
    ctaSheet.appendRow([
      eventId, ts, sessionId,
      sanitizeData(raw.elementText || raw.ctaName || 'CTA Click'),
      sanitizeData(raw.elementText || ''),
      sanitizeData(raw.element || 'Button'),
      sanitizeData(raw.pageUrl),
      sanitizeData(raw.section || 'Body'),
      sanitizeData(raw.destination),
      sanitizeData(raw.referrer),
      sanitizeData(raw.utmSource),
      sanitizeData(raw.utmMedium),
      sanitizeData(raw.utmCampaign),
      sanitizeData(raw.utmTerm),
      sanitizeData(raw.utmContent),
      sanitizeData(raw.device),
      sanitizeData(raw.browser)
    ]);
  }

  logToMasterEvents(ss, eventId, ts, 'CTA_CLICK', sessionId, raw);
  updateSessionRecord(ss, sessionId, raw, 'CTA_CLICK');

  return sendJsonResponse(true, 'CTA captured', { eventId });
}

/**
 * 3. Capture Generic Event (Navigation, Scroll, Form Start, Outbound, etc.)
 */
function captureGenericEvent(ss, raw, eventType) {
  const ts = Utilities.formatDate(new Date(), DATA_CAPTURE_CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
  const eventId = raw.eventId || `EVT-${Date.now().toString(36)}`;
  const sessionId = raw.sessionId || 'anonymous_session';

  logToMasterEvents(ss, eventId, ts, eventType, sessionId, raw);
  updateSessionRecord(ss, sessionId, raw, eventType);

  return sendJsonResponse(true, 'Event captured', { eventId });
}

function logToMasterEvents(ss, eventId, ts, eventType, sessionId, raw) {
  const sheet = ss.getSheetByName('Website Events');
  if (!sheet) return;

  sheet.appendRow([
    eventId, ts, eventType, sessionId,
    sanitizeData(raw.userLeadId || ''),
    sanitizeData(raw.pageUrl),
    sanitizeData(raw.pagePath),
    sanitizeData(raw.pageTitle),
    sanitizeData(raw.element),
    sanitizeData(raw.elementId),
    sanitizeData(raw.elementText),
    sanitizeData(raw.section),
    sanitizeData(raw.destination),
    sanitizeData(raw.referrer),
    sanitizeData(raw.landingPage),
    sanitizeData(raw.utmSource),
    sanitizeData(raw.utmMedium),
    sanitizeData(raw.utmCampaign),
    sanitizeData(raw.utmTerm),
    sanitizeData(raw.utmContent),
    sanitizeData(raw.device),
    sanitizeData(raw.browser),
    sanitizeData(raw.operatingSystem),
    sanitizeData(raw.screenSize),
    sanitizeData(raw.country || 'Global'),
    sanitizeData(raw.region || ''),
    sanitizeData(raw.city || '')
  ]);
}

/**
 * 4. Update Anonymous Session Records
 */
function updateSessionRecord(ss, sessionId, raw, eventType) {
  const sessionSheet = ss.getSheetByName('Sessions');
  if (!sessionSheet) return;

  const ts = Utilities.formatDate(new Date(), DATA_CAPTURE_CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss');

  // Check if session row exists
  const data = sessionSheet.getDataRange().getValues();
  let foundRow = -1;
  for (let i = 1; i < data.length; i++) {
    if (data[i][0] === sessionId) {
      foundRow = i + 1;
      break;
    }
  }

  if (foundRow > -1) {
    sessionSheet.getRange(foundRow, 3).setValue(ts); // Last Activity
    if (eventType === 'PAGE_VIEW') {
      const currentPv = Number(sessionSheet.getRange(foundRow, 7).getValue()) || 0;
      sessionSheet.getRange(foundRow, 7).setValue(currentPv + 1);
    } else if (eventType === 'CTA_CLICK') {
      const currentCta = Number(sessionSheet.getRange(foundRow, 8).getValue()) || 0;
      sessionSheet.getRange(foundRow, 8).setValue(currentCta + 1);
    } else if (eventType === 'FORM_SUBMIT') {
      const currentForms = Number(sessionSheet.getRange(foundRow, 11).getValue()) || 0;
      sessionSheet.getRange(foundRow, 11).setValue(currentForms + 1);
    }
  } else {
    // Insert new Session Row
    sessionSheet.appendRow([
      sessionId, ts, ts,
      sanitizeData(raw.landingPage || raw.pageUrl),
      sanitizeData(raw.pageUrl),
      sanitizeData(raw.pagePath),
      eventType === 'PAGE_VIEW' ? 1 : 0,
      eventType === 'CTA_CLICK' ? 1 : 0,
      eventType === 'FORM_VIEW' ? 1 : 0,
      eventType === 'FORM_START' ? 1 : 0,
      eventType === 'FORM_SUBMIT' ? 1 : 0,
      sanitizeData(raw.device),
      sanitizeData(raw.browser),
      sanitizeData(raw.operatingSystem),
      sanitizeData(raw.utmSource),
      sanitizeData(raw.utmMedium),
      sanitizeData(raw.utmCampaign),
      sanitizeData(raw.referrer)
    ]);
  }
}

/**
 * 5. Capture Form Submissions & Perform Lead Scoring
 */
function captureFormSubmission(ss, raw) {
  const name = sanitizeData(raw.name || '');
  const email = sanitizeData(raw.email || '');
  const formName = sanitizeData(raw.formName || 'AI Diagnostic Form');

  if (!name) return sendJsonResponse(false, 'Full Name is required.');
  if (!email || !isValidEmail(email)) return sendJsonResponse(false, 'A valid work email is required.');

  const submissionId = generateSubmissionId(ss);
  const meta = raw.metadata || {};

  const payload = {
    submissionId: submissionId,
    timestamp: Utilities.formatDate(new Date(), DATA_CAPTURE_CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss'),
    formName: formName,
    name: name,
    email: email,
    phone: sanitizeData(raw.phone || ''),
    company: sanitizeData(raw.company || 'Enterprise / Confidential'),
    designation: sanitizeData(raw.designation || raw.role || 'Executive / Lead'),
    industry: sanitizeData(raw.industry || 'Cross-Industry'),
    companySize: sanitizeData(raw.companySize || 'Unspecified'),
    country: sanitizeData(raw.country || meta.country || 'Global'),
    businessFunction: sanitizeData(raw.businessFunction || 'AI & Engineering'),
    aiMaturity: sanitizeData(raw.aiMaturity || 'Exploring AI'),
    challenges: sanitizeData(raw.challenges || raw.primaryBottleneck || 'AI Architecture'),
    objective: sanitizeData(raw.objective || raw.currentState || raw.subject || 'Production AI Acceleration'),
    preferredTimeline: sanitizeData(raw.preferredTimeline || raw.engagementModel || '1-2 Weeks'),
    message: sanitizeData(raw.message || raw.additionalRequirements || ''),
    pageUrl: sanitizeData(meta.pageUrl || raw.sourceUrl || ''),
    landingPage: sanitizeData(meta.landingPage || ''),
    referrer: sanitizeData(meta.referrer || 'Direct'),
    utmSource: sanitizeData(meta.utmSource || raw.utm_source || 'Direct / Organic'),
    utmMedium: sanitizeData(meta.utmMedium || raw.utm_medium || 'None'),
    utmCampaign: sanitizeData(meta.utmCampaign || raw.utm_campaign || 'None'),
    utmTerm: sanitizeData(meta.utmTerm || raw.utm_term || 'None'),
    utmContent: sanitizeData(meta.utmContent || raw.utm_content || 'None'),
    device: sanitizeData(meta.device || 'Desktop'),
    browser: sanitizeData(meta.browser || 'Browser'),
    operatingSystem: sanitizeData(meta.operatingSystem || 'OS'),
    screenSize: sanitizeData(meta.screenSize || 'Responsive')
  };

  const scoring = calculateLeadScore(payload);
  payload.leadScore = scoring.score;
  payload.leadStatus = scoring.status;
  payload.followUpStatus = 'Pending';
  payload.assignedTo = 'Senior AI Architecture Team';
  payload.notes = `Website capture from ${payload.pageUrl || payload.formName}`;

  // Insert into Form Submissions Master Sheet
  const masterSheet = ss.getSheetByName('Form Submissions');
  if (masterSheet) {
    masterSheet.appendRow([
      payload.submissionId, payload.timestamp, payload.formName, payload.name, payload.email, payload.phone,
      payload.company, payload.designation, payload.industry, payload.companySize, payload.country,
      payload.businessFunction, payload.aiMaturity, payload.challenges, payload.objective,
      payload.preferredTimeline, payload.message, payload.pageUrl, payload.landingPage, payload.referrer,
      payload.utmSource, payload.utmMedium, payload.utmCampaign, payload.utmTerm, payload.utmContent,
      payload.device, payload.browser, payload.operatingSystem, payload.screenSize,
      payload.leadScore, payload.leadStatus, payload.followUpStatus, payload.assignedTo, payload.notes
    ]);
  }

  insertCategoryLead(ss, payload, raw);
  sendLeadNotification(payload);
  sendUserConfirmation(payload);
  logEmailEvent(ss, payload.submissionId, payload.email, 'Inbound Lead Alert & Confirmation', 'SUCCESS');
  updateSessionRecord(ss, raw.sessionId || 'anonymous', raw, 'FORM_SUBMIT');

  return sendJsonResponse(true, 'Form submitted successfully', {
    submissionId: payload.submissionId,
    leadScore: payload.leadScore,
    leadStatus: payload.leadStatus
  });
}

function calculateLeadScore(p) {
  let score = 0;
  const freeEmail = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com'];
  const domain = (p.email.split('@')[1] || '').toLowerCase();
  if (domain && !freeEmail.includes(domain)) score += 10;
  if (p.company && p.company !== 'Enterprise / Confidential' && p.company !== '') score += 10;
  if (p.designation && p.designation !== '') score += 5;
  if (p.objective && p.objective.length > 10) score += 10;
  if (p.companySize && (p.companySize.includes('500') || p.companySize.includes('1000') || p.companySize.includes('5000+'))) score += 15;
  if (p.aiMaturity && (p.aiMaturity.includes('Production') || p.aiMaturity.includes('Scale'))) score += 15;

  const c = (p.challenges || '').toLowerCase();
  if (c.includes('infrastructure')) score += 10;
  if (c.includes('security')) score += 10;
  if (c.includes('transformation')) score += 10;

  score = Math.min(100, score);
  const status = score >= DATA_CAPTURE_CONFIG.SCORE_HIGH ? 'HIGH' : (score >= DATA_CAPTURE_CONFIG.SCORE_MEDIUM ? 'MEDIUM' : 'LOW');
  return { score, status };
}

function insertCategoryLead(ss, p, raw) {
  const formLower = (p.formName || '').toLowerCase();
  if (formLower.includes('diagnostic')) {
    const sheet = ss.getSheetByName('AI Diagnostic Leads');
    if (sheet) {
      sheet.appendRow([
        p.submissionId, p.timestamp, p.name, p.email, p.phone, p.company, p.designation,
        p.industry, p.companySize, p.country, p.businessFunction, p.aiMaturity,
        p.challenges, p.objective, p.preferredTimeline, raw.selectedSolutions || '', p.message,
        p.leadScore, p.leadStatus, p.followUpStatus
      ]);
    }
  } else if (formLower.includes('contact')) {
    const sheet = ss.getSheetByName('Contact Leads');
    if (sheet) {
      sheet.appendRow([
        p.submissionId, p.timestamp, p.name, p.email, p.phone, p.company, p.designation,
        p.industry, raw.subject || p.objective, p.message, p.leadScore, p.followUpStatus
      ]);
    }
  } else if (formLower.includes('newsletter') || formLower.includes('insights')) {
    const sheet = ss.getSheetByName('Newsletter Leads');
    if (sheet) {
      sheet.appendRow([
        p.submissionId, p.timestamp, p.name, p.email, p.company, p.industry, p.utmSource, p.followUpStatus
      ]);
    }
  } else if (formLower.includes('partner')) {
    const sheet = ss.getSheetByName('Partnership Leads');
    if (sheet) {
      sheet.appendRow([
        p.submissionId, p.timestamp, p.name, p.email, p.phone, p.company, p.designation,
        raw.partnershipType || 'Strategic Alliance', p.message, p.followUpStatus
      ]);
    }
  } else if (formLower.includes('career')) {
    const sheet = ss.getSheetByName('Career Leads');
    if (sheet) {
      sheet.appendRow([
        p.submissionId, p.timestamp, p.name, p.email, p.phone,
        raw.role || p.designation, raw.experience || '', raw.linkedIn || '', raw.portfolio || '', raw.resume || '', p.message, p.followUpStatus
      ]);
    }
  }
}

function sendLeadNotification(p) {
  const scoreColor = p.leadStatus === 'HIGH' ? '#10b981' : (p.leadStatus === 'MEDIUM' ? '#f59e0b' : '#64748b');
  const subject = `[TRUSTGRID.AI] New ${p.formName} Submission — ${p.company}`;
  const htmlBody = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background-color: #f1f5f9; padding: 24px; color: #0f172a; }
      .card { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; }
      .header { background: #07143d; padding: 28px 32px; color: #ffffff; }
      .content { padding: 32px; }
      .kpis { display: flex; gap: 12px; margin-bottom: 24px; }
      .kpi { flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 12px; }
      .table { width: 100%; border-collapse: collapse; margin-bottom: 20px; font-size: 13.5px; }
      .table td { padding: 10px 12px; border-bottom: 1px solid #f1f5f9; }
      .label { width: 35%; color: #64748b; font-weight: 600; background: #fafafa; }
      .badge { display: inline-block; padding: 4px 10px; border-radius: 999px; font-weight: 700; color: #ffffff; background: ${scoreColor}; }
      .footer { background: #f8fafc; padding: 20px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">
        <h1 style="margin: 0; font-size: 20px;">New Inbound Lead: ${p.formName}</h1>
        <p style="margin: 4px 0 0; font-size: 13px; color: #93c5fd;">Ref ID: <strong>${p.submissionId}</strong> • ${p.timestamp}</p>
      </div>
      <div class="content">
        <div class="kpis">
          <div class="kpi"><span style="font-size: 11px; color: #64748b; font-weight: 700;">PRIORITY</span><br><span class="badge">${p.leadStatus} (${p.leadScore}/100)</span></div>
          <div class="kpi"><span style="font-size: 11px; color: #64748b; font-weight: 700;">COMPANY</span><br><strong>${p.company}</strong></div>
          <div class="kpi"><span style="font-size: 11px; color: #64748b; font-weight: 700;">INDUSTRY</span><br><strong>${p.industry}</strong></div>
        </div>
        <table class="table">
          <tr><td class="label">Full Name</td><td><strong>${p.name}</strong></td></tr>
          <tr><td class="label">Work Email</td><td><a href="mailto:${p.email}">${p.email}</a></td></tr>
          <tr><td class="label">Phone</td><td>${p.phone || 'Not provided'}</td></tr>
          <tr><td class="label">Job Role</td><td>${p.designation}</td></tr>
          <tr><td class="label">AI Maturity</td><td>${p.aiMaturity}</td></tr>
          <tr><td class="label">Key Challenges</td><td><strong>${p.challenges}</strong></td></tr>
          <tr><td class="label">Objective</td><td>${p.objective}</td></tr>
          <tr><td class="label">Timeline</td><td>${p.preferredTimeline}</td></tr>
          <tr><td class="label">Source / Campaign</td><td>${p.utmSource} / ${p.utmCampaign}</td></tr>
        </table>
      </div>
      <div class="footer">TrustGrid.ai Automated Enterprise Data Capture • Google Sheet #1</div>
    </div>
  </body>
  </html>
  `;

  try {
    MailApp.sendEmail({ to: DATA_CAPTURE_CONFIG.REPORT_EMAIL, subject, htmlBody });
  } catch (e) {
    Logger.log('Notification email error: ' + e.toString());
  }
}

function sendUserConfirmation(p) {
  if (!p.email || !isValidEmail(p.email)) return;
  const subject = `Thank You — TrustGrid.AI [Ref: ${p.submissionId}]`;
  const htmlBody = `
  <!DOCTYPE html>
  <html>
  <body style="font-family: sans-serif; background: #f8fafc; padding: 24px;">
    <div style="max-width: 580px; margin: 0 auto; background: #fff; border-radius: 10px; border: 1px solid #e2e8f0; padding: 32px;">
      <h2 style="color: #07143d; margin-top: 0;">TrustGrid.AI</h2>
      <p>Dear <strong>${p.name}</strong>,</p>
      <p>Thank you for connecting with <strong>TrustGrid.AI</strong>. Your <strong>${p.formName}</strong> has been received successfully.</p>
      <p>Reference ID: <strong>${p.submissionId}</strong></p>
      <p>Our senior AI architecture and systems team is reviewing your requirements and will follow up directly.</p>
      <p>Sincerely,<br><strong>TrustGrid.AI Architecture & Systems Group</strong></p>
    </div>
  </body>
  </html>
  `;
  try {
    MailApp.sendEmail({ to: p.email, subject, htmlBody });
  } catch (e) {}
}

function logEmailEvent(ss, submissionId, recipient, emailType, status) {
  try {
    const sheet = ss.getSheetByName('Email Log');
    if (sheet) {
      sheet.appendRow([
        submissionId,
        Utilities.formatDate(new Date(), DATA_CAPTURE_CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss'),
        recipient, emailType, status, 'MailApp Dispatch'
      ]);
    }
  } catch (e) {}
}

function logError(err, context) {
  try {
    const ss = getOrCreateSpreadsheet();
    const sheet = ss.getSheetByName('Errors');
    if (sheet) {
      sheet.appendRow([
        Utilities.formatDate(new Date(), DATA_CAPTURE_CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss'),
        err.message || String(err),
        context || '',
        err.stack || ''
      ]);
    }
  } catch (e) {
    Logger.log('Error logging failed: ' + e.toString());
  }
}

function initializeDataCaptureDatabase() {
  const ss = getOrCreateSpreadsheet();
  initializeSheets(ss);
  Logger.log('Data Capture Database Initialized at: ' + ss.getUrl());
}
