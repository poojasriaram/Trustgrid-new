/**
 * ============================================================================
 * TRUSTGRID.AI — GOOGLE APPS SCRIPT #1: FORM DATA CAPTURE
 * ============================================================================
 * 
 * Purpose: Receives all website form submissions, validates, sanitizes, scores leads,
 * stores raw operational data in GOOGLE SHEET #1 (TRUSTGRID.AI — FORM DATA),
 * and triggers executive email alerts and confirmation emails.
 * 
 * Script Recipient: poojasri.trustgrid@gmail.com
 * Timezone: Asia/Kolkata
 * ============================================================================
 */

// Global Configuration Defaults
const CONFIG = {
  DEFAULT_SPREADSHEET_ID: '1r1oH1BVgX0iFx1DQ6TCiP3VqvY0LestlHkLNln635Sg', // Google Sheet #1
  REPORT_EMAIL: 'poojasri.trustgrid@gmail.com',
  COMPANY_NAME: 'TrustGrid.ai',
  TIMEZONE: 'Asia/Kolkata',
  WEB_APP_URL: 'https://script.google.com/macros/s/AKfycbwm8aO6wqtwHNoMIkfDYJYTcx3jGgyUNaOVkMTViIHI6azip5aG7U52IGUgDurHV9_8/exec',
  DEFAULT_MAX_SCORE: 100,
  SCORE_HIGH: 80,
  SCORE_MEDIUM: 50,
  PRIMARY_COLOR: '#07143d',
  ACCENT_BLUE: '#1d5cff',
  TEXT_DARK: '#0a0f1d'
};

/**
 * Health check endpoint for testing
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    status: 'ACTIVE',
    service: 'TRUSTGRID_FORM_CAPTURE',
    timestamp: Utilities.formatDate(new Date(), CONFIG.TIMEZONE, "yyyy-MM-dd'T'HH:mm:ssXXX"),
    company: CONFIG.COMPANY_NAME
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Main POST handler for receiving form submissions
 */
function doPost(e) {
  const lock = LockService.getScriptLock();
  try {
    // Wait up to 30 seconds for lock to ensure atomic operations & sequential IDs
    lock.waitLock(30000);

    // 1. Parse incoming payload
    let rawData = {};
    if (e && e.postData && e.postData.contents) {
      try {
        rawData = JSON.parse(e.postData.contents);
      } catch (jsonErr) {
        rawData = e.parameter || {};
      }
    } else if (e && e.parameter) {
      rawData = e.parameter;
    }

    // 2. Validate essential fields
    const name = sanitizeInput(rawData.name || '');
    const email = sanitizeInput(rawData.email || '');
    const formName = sanitizeInput(rawData.formName || 'General Submission');

    if (!name) {
      return sendJsonResponse(false, 'Full Name is required.');
    }

    if (!email || !isValidEmail(email)) {
      return sendJsonResponse(false, 'A valid work email is required.');
    }

    // 3. Obtain or initialize Google Spreadsheet
    const ss = getOrCreateSpreadsheet();
    ensureRequiredSheets(ss);

    // 4. Generate Unique Submission ID: TG-YYYYMMDD-XXXX
    const submissionId = generateSubmissionId(ss);

    // 5. Extract and sanitize all submission & tracking fields
    const meta = rawData.metadata || {};
    const payload = {
      submissionId: submissionId,
      timestamp: Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss'),
      formName: formName,
      name: name,
      email: email,
      phone: sanitizeInput(rawData.phone || ''),
      company: sanitizeInput(rawData.company || 'Enterprise / Confidential'),
      designation: sanitizeInput(rawData.designation || rawData.role || 'Executive / Lead'),
      industry: sanitizeInput(rawData.industry || 'Cross-Industry'),
      companySize: sanitizeInput(rawData.companySize || 'Unspecified'),
      country: sanitizeInput(rawData.country || meta.country || 'Global'),
      businessFunction: sanitizeInput(rawData.businessFunction || 'AI & Engineering'),
      aiMaturity: sanitizeInput(rawData.aiMaturity || 'Exploring AI'),
      challenges: sanitizeInput(rawData.challenges || rawData.primaryBottleneck || 'AI Architecture & Value'),
      objective: sanitizeInput(rawData.objective || rawData.currentState || rawData.subject || 'Production AI Acceleration'),
      preferredTimeline: sanitizeInput(rawData.preferredTimeline || rawData.engagementModel || '1-2 Weeks / Audit'),
      message: sanitizeInput(rawData.message || rawData.additionalRequirements || ''),
      pageUrl: sanitizeInput(meta.pageUrl || rawData.sourceUrl || ''),
      landingPage: sanitizeInput(meta.landingPage || ''),
      referrer: sanitizeInput(meta.referrer || 'Direct'),
      utmSource: sanitizeInput(meta.utmSource || rawData.utm_source || 'Direct / Organic'),
      utmMedium: sanitizeInput(meta.utmMedium || rawData.utm_medium || 'None'),
      utmCampaign: sanitizeInput(meta.utmCampaign || rawData.utm_campaign || 'None'),
      utmTerm: sanitizeInput(meta.utmTerm || rawData.utm_term || 'None'),
      utmContent: sanitizeInput(meta.utmContent || rawData.utm_content || 'None'),
      device: sanitizeInput(meta.device || 'Desktop'),
      browser: sanitizeInput(meta.browser || 'Browser'),
      operatingSystem: sanitizeInput(meta.operatingSystem || 'OS'),
      screenSize: sanitizeInput(meta.screenSize || 'Responsive')
    };

    // 6. Calculate Lead Score & Status
    const scoringResult = calculateLeadScore(payload, ss);
    payload.leadScore = scoringResult.score;
    payload.leadStatus = scoringResult.status; // HIGH, MEDIUM, LOW
    payload.followUpStatus = 'Pending';
    payload.assignedTo = 'Senior AI Architecture Team';
    payload.notes = `Initial website capture from ${payload.pageUrl || payload.formName}`;

    // 7. Insert Row into Master Leads Sheet
    insertMasterLead(ss, payload);

    // 8. Insert Row into Dedicated Form Sheet
    insertCategoryLead(ss, payload, rawData);

    // 9. Send Internal Executive Email Notification
    sendInternalNotification(payload);

    // 10. Send User Confirmation Email (if work email valid)
    sendUserConfirmation(payload);

    // 11. Log Email Delivery
    logEmailEvent(ss, payload.submissionId, payload.email, 'Internal Alert & Confirmation Sent', 'SUCCESS');

    // Return clean JSON response
    return sendJsonResponse(true, 'Form submitted successfully', {
      submissionId: payload.submissionId,
      leadScore: payload.leadScore,
      leadStatus: payload.leadStatus
    });

  } catch (err) {
    Logger.log('Error in doPost: ' + err.toString());
    return sendJsonResponse(false, 'Unable to process submission: ' + err.message);
  } finally {
    lock.releaseLock();
  }
}

/**
 * Sanitizes input to prevent CSV/Sheet Formula Injection attacks
 * (Prepends single quote if value begins with =, +, -, @, \t, or \r)
 */
function sanitizeInput(val) {
  if (val === null || val === undefined) return '';
  let str = String(val).trim();
  if (/^[=+\-@\t\r]/.test(str)) {
    str = "'" + str;
  }
  return str;
}

/**
 * Validates email format
 */
function isValidEmail(email) {
  const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return re.test(email);
}

/**
 * Creates standardized JSON response with CORS headers
 */
function sendJsonResponse(success, message, extraData) {
  const res = Object.assign({
    success: success,
    message: message
  }, extraData || {});
  return ContentService.createTextOutput(JSON.stringify(res))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Retrieves existing Spreadsheet or creates a new one with full structure
 */
function getOrCreateSpreadsheet() {
  const props = PropertiesService.getScriptProperties();
  let sheetId = props.getProperty('SPREADSHEET_ID') || CONFIG.DEFAULT_SPREADSHEET_ID;

  if (sheetId) {
    try {
      return SpreadsheetApp.openById(sheetId);
    } catch (e) {
      Logger.log('Could not open spreadsheet by ID: ' + e.toString());
    }
  }

  try {
    if (SpreadsheetApp.getActiveSpreadsheet()) {
      return SpreadsheetApp.getActiveSpreadsheet();
    }
  } catch (e) {}

  try {
    const files = DriveApp.getFilesByName('TRUSTGRID.AI — FORM DATA');
    if (files.hasNext()) {
      const file = files.next();
      props.setProperty('SPREADSHEET_ID', file.getId());
      return SpreadsheetApp.openById(file.getId());
    }
  } catch (e) {}

  const ss = SpreadsheetApp.create('TRUSTGRID.AI — FORM DATA');
  props.setProperty('SPREADSHEET_ID', ss.getId());
  Logger.log('Created new Spreadsheet: ' + ss.getUrl());
  return ss;
}

/**
 * Ensures all required sheets and headers exist
 */
function ensureRequiredSheets(ss) {
  const sheets = [
    { name: 'Leads', headers: getMasterHeaders() },
    { name: 'AI Diagnostic Leads', headers: getDiagnosticHeaders() },
    { name: 'Contact Leads', headers: getContactHeaders() },
    { name: 'Newsletter Leads', headers: getNewsletterHeaders() },
    { name: 'Partnership Leads', headers: getPartnershipHeaders() },
    { name: 'Career Leads', headers: getCareerHeaders() },
    { name: 'Email Log', headers: ['Submission ID', 'Timestamp', 'Recipient', 'Email Type', 'Status', 'Notes'] },
    { name: 'Configuration', headers: ['Key', 'Value', 'Description'] }
  ];

  sheets.forEach(function(s) {
    let sheet = ss.getSheetByName(s.name);
    if (!sheet) {
      sheet = ss.insertSheet(s.name);
      sheet.appendRow(s.headers);
      formatHeaderRow(sheet);
    }
  });

  // Seed default configuration if empty
  const configSheet = ss.getSheetByName('Configuration');
  if (configSheet && configSheet.getLastRow() <= 1) {
    seedConfiguration(configSheet);
  }
}

/**
 * Returns the 34 Master Columns for 'Leads'
 */
function getMasterHeaders() {
  return [
    'Submission ID', 'Timestamp', 'Form Name', 'Name', 'Work Email', 'Phone',
    'Company', 'Designation', 'Industry', 'Company Size', 'Country',
    'Business Function', 'AI Maturity', 'Challenges', 'Objective',
    'Preferred Timeline', 'Message', 'Page URL', 'Landing Page', 'Referrer',
    'UTM Source', 'UTM Medium', 'UTM Campaign', 'UTM Term', 'UTM Content',
    'Device', 'Browser', 'Operating System', 'Screen Size',
    'Lead Score', 'Lead Status', 'Follow-up Status', 'Assigned To', 'Notes'
  ];
}

function getDiagnosticHeaders() {
  return [
    'Submission ID', 'Timestamp', 'Name', 'Work Email', 'Phone', 'Company', 'Designation',
    'Industry', 'Company Size', 'Country', 'Business Function', 'AI Maturity',
    'Challenges', 'Objective', 'Preferred Timeline', 'Solutions Selected', 'Message',
    'Lead Score', 'Lead Status', 'Follow-up Status'
  ];
}

function getContactHeaders() {
  return ['Submission ID', 'Timestamp', 'Name', 'Work Email', 'Phone', 'Company', 'Designation', 'Industry', 'Subject', 'Message', 'Lead Score', 'Follow-up Status'];
}

function getNewsletterHeaders() {
  return ['Submission ID', 'Timestamp', 'Name', 'Work Email', 'Company', 'Industry', 'UTM Source', 'Follow-up Status'];
}

function getPartnershipHeaders() {
  return ['Submission ID', 'Timestamp', 'Name', 'Work Email', 'Phone', 'Company', 'Designation', 'Partnership Type', 'Message', 'Follow-up Status'];
}

function getCareerHeaders() {
  return ['Submission ID', 'Timestamp', 'Name', 'Email', 'Phone', 'Role Applied', 'Experience', 'LinkedIn', 'Portfolio', 'Resume Link', 'Message', 'Follow-up Status'];
}

function formatHeaderRow(sheet) {
  const headerRange = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  headerRange.setBackground(CONFIG.PRIMARY_COLOR)
             .setFontColor('#FFFFFF')
             .setFontWeight('bold')
             .setFontFamily('Segoe UI, Roboto, Arial')
             .setFontSize(10);
  sheet.setFrozenRows(1);
}

function seedConfiguration(sheet) {
  const defaultRules = [
    ['REPORT_EMAIL', 'poojasri.trustgrid@gmail.com', 'Recipient of real-time lead notification emails'],
    ['COMPANY_NAME', 'TrustGrid.ai', 'Company Name for branding & emails'],
    ['SCORE_HIGH_THRESHOLD', '80', 'Minimum score for HIGH priority lead'],
    ['SCORE_MEDIUM_THRESHOLD', '50', 'Minimum score for MEDIUM priority lead'],
    ['POINTS_WORK_EMAIL', '10', 'Points added if non-generic work email is used'],
    ['POINTS_COMPANY_PROVIDED', '10', 'Points added if company name is provided'],
    ['POINTS_DESIGNATION_PROVIDED', '5', 'Points added if job role/designation is provided'],
    ['POINTS_AI_MATURITY', '10', 'Points added if AI maturity state is selected'],
    ['POINTS_OBJECTIVE_PROVIDED', '10', 'Points added if business objective is provided'],
    ['POINTS_ENTERPRISE_SIZE', '15', 'Points added for enterprise headcount (500+ employees)'],
    ['POINTS_HIGH_VALUE_CHALLENGE', '10', 'Points added for AI Infrastructure, Security, or Governance challenges'],
    ['POINTS_TRANSFORMATION_TIMELINE', '10', 'Points added for immediate or sprint engagement timelines']
  ];
  defaultRules.forEach(row => sheet.appendRow(row));
  formatHeaderRow(sheet);
}

/**
 * Generates unique formatted ID: TG-YYYYMMDD-XXXX
 */
function generateSubmissionId(ss) {
  const dateStr = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyyMMdd');
  const masterSheet = ss.getSheetByName('Leads');
  const count = masterSheet ? Math.max(1, masterSheet.getLastRow()) : 1;
  const formattedCount = ('0000' + count).slice(-4);
  return `TG-${dateStr}-${formattedCount}`;
}

/**
 * Configurable Lead Scoring Engine
 */
function calculateLeadScore(p, ss) {
  let score = 0;

  // 1. Work Email Check (not gmail/yahoo/hotmail)
  const freeEmailProviders = ['gmail.com', 'yahoo.com', 'hotmail.com', 'outlook.com', 'aol.com', 'icloud.com', 'mail.com'];
  const domain = p.email.split('@')[1] ? p.email.split('@')[1].toLowerCase() : '';
  if (domain && !freeEmailProviders.includes(domain)) {
    score += 10;
  }

  // 2. Company & Designation
  if (p.company && p.company !== 'Enterprise / Confidential' && p.company !== '') score += 10;
  if (p.designation && p.designation !== '') score += 5;

  // 3. AI Maturity level
  if (p.aiMaturity && p.aiMaturity !== 'Exploring AI') score += 10;
  if (p.aiMaturity && (p.aiMaturity.includes('Production') || p.aiMaturity.includes('Scale'))) score += 10;

  // 4. Objective & Timeline
  if (p.objective && p.objective.length > 10) score += 10;
  if (p.preferredTimeline && (p.preferredTimeline.includes('Immediate') || p.preferredTimeline.includes('Sprint') || p.preferredTimeline.includes('2–4'))) score += 10;

  // 5. Enterprise size
  if (p.companySize && (p.companySize.includes('500') || p.companySize.includes('1000') || p.companySize.includes('5000+'))) score += 15;

  // 6. High-intent challenge areas
  const c = (p.challenges || '').toLowerCase();
  if (c.includes('infrastructure') || c.includes('security') || c.includes('governance') || c.includes('networking') || c.includes('transformation')) {
    score += 10;
  }

  // Cap at 100
  score = Math.min(100, score);

  let status = 'LOW';
  if (score >= CONFIG.SCORE_HIGH) {
    status = 'HIGH';
  } else if (score >= CONFIG.SCORE_MEDIUM) {
    status = 'MEDIUM';
  }

  return { score: score, status: status };
}

/**
 * Inserts row into Master Leads sheet
 */
function insertMasterLead(ss, p) {
  const sheet = ss.getSheetByName('Leads');
  if (!sheet) return;

  sheet.appendRow([
    p.submissionId, p.timestamp, p.formName, p.name, p.email, p.phone,
    p.company, p.designation, p.industry, p.companySize, p.country,
    p.businessFunction, p.aiMaturity, p.challenges, p.objective,
    p.preferredTimeline, p.message, p.pageUrl, p.landingPage, p.referrer,
    p.utmSource, p.utmMedium, p.utmCampaign, p.utmTerm, p.utmContent,
    p.device, p.browser, p.operatingSystem, p.screenSize,
    p.leadScore, p.leadStatus, p.followUpStatus, p.assignedTo, p.notes
  ]);
}

/**
 * Inserts row into Category-specific Sheet
 */
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
  } else if (formLower.includes('contact') || formLower.includes('general')) {
    const sheet = ss.getSheetByName('Contact Leads');
    if (sheet) {
      sheet.appendRow([
        p.submissionId, p.timestamp, p.name, p.email, p.phone, p.company, p.designation,
        p.industry, raw.subject || p.objective, p.message, p.leadScore, p.followUpStatus
      ]);
    }
  } else if (formLower.includes('newsletter') || formLower.includes('insights') || formLower.includes('subscription')) {
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
        raw.partnershipType || 'General Strategic', p.message, p.followUpStatus
      ]);
    }
  } else if (formLower.includes('career') || formLower.includes('fellowship')) {
    const sheet = ss.getSheetByName('Career Leads');
    if (sheet) {
      sheet.appendRow([
        p.submissionId, p.timestamp, p.name, p.email, p.phone,
        raw.role || p.designation, raw.experience || '', raw.linkedIn || '', raw.portfolio || '', raw.resume || '', p.message, p.followUpStatus
      ]);
    }
  }
}

/**
 * Enterprise HTML Internal Email Notification
 */
function sendInternalNotification(p) {
  const recipient = CONFIG.REPORT_EMAIL;
  const subject = `[TRUSTGRID.AI] New ${p.formName} Submission — ${p.company}`;

  const scoreColor = p.leadStatus === 'HIGH' ? '#10b981' : (p.leadStatus === 'MEDIUM' ? '#f59e0b' : '#64748b');

  const htmlBody = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f1f5f9; margin: 0; padding: 24px; color: #0f172a; }
      .container { max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 12px; overflow: hidden; border: 1px solid #e2e8f0; box-shadow: 0 4px 20px rgba(0,0,0,0.06); }
      .header { background: #07143d; padding: 28px 32px; color: #ffffff; }
      .header-badge { display: inline-block; background: #1d5cff; color: #ffffff; font-size: 11px; font-weight: 700; letter-spacing: 0.1em; padding: 4px 10px; border-radius: 4px; margin-bottom: 8px; }
      .header h1 { margin: 0; font-size: 20px; font-weight: 700; color: #ffffff; }
      .content { padding: 32px; }
      .kpi-row { display: flex; gap: 12px; margin-bottom: 24px; }
      .kpi-box { flex: 1; background: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 14px; }
      .kpi-box span { font-size: 11px; color: #64748b; font-weight: 600; text-transform: uppercase; display: block; margin-bottom: 4px; }
      .kpi-box strong { font-size: 15px; color: #0f172a; }
      .section-title { font-size: 13px; font-weight: 700; color: #1d5cff; text-transform: uppercase; letter-spacing: 0.08em; border-bottom: 1px solid #e2e8f0; padding-bottom: 8px; margin: 24px 0 16px; }
      .data-table { width: 100%; border-collapse: collapse; margin-bottom: 16px; }
      .data-table td { padding: 10px 12px; font-size: 13.5px; border-bottom: 1px solid #f1f5f9; }
      .data-table td.label { width: 35%; color: #64748b; font-weight: 600; background: #fafafa; }
      .data-table td.value { color: #0f172a; font-weight: 500; }
      .score-badge { display: inline-block; padding: 4px 12px; border-radius: 999px; font-weight: 700; font-size: 13px; color: #ffffff; background: ${scoreColor}; }
      .footer { background: #f8fafc; padding: 20px 32px; font-size: 12px; color: #64748b; border-top: 1px solid #e2e8f0; text-align: center; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">
        <span class="header-badge">NEW INBOUND LEAD ALERT</span>
        <h1>${p.formName}</h1>
        <p style="margin: 4px 0 0; font-size: 13px; color: #93c5fd;">Ref ID: <strong>${p.submissionId}</strong> • ${p.timestamp}</p>
      </div>

      <div class="content">
        <div class="kpi-row">
          <div class="kpi-box">
            <span>Lead Priority</span>
            <span class="score-badge">${p.leadStatus} (Score: ${p.leadScore}/100)</span>
          </div>
          <div class="kpi-box">
            <span>Company</span>
            <strong>${p.company}</strong>
          </div>
          <div class="kpi-box">
            <span>Industry</span>
            <strong>${p.industry}</strong>
          </div>
        </div>

        <div class="section-title">Lead & Contact Information</div>
        <table class="data-table">
          <tr><td class="label">Full Name</td><td class="value"><strong>${p.name}</strong></td></tr>
          <tr><td class="label">Work Email</td><td class="value"><a href="mailto:${p.email}">${p.email}</a></td></tr>
          <tr><td class="label">Phone</td><td class="value">${p.phone || 'Not provided'}</td></tr>
          <tr><td class="label">Company / Org</td><td class="value">${p.company}</td></tr>
          <tr><td class="label">Job Title / Role</td><td class="value">${p.designation}</td></tr>
          <tr><td class="label">Headcount / Size</td><td class="value">${p.companySize}</td></tr>
          <tr><td class="label">Country / Region</td><td class="value">${p.country}</td></tr>
        </table>

        <div class="section-title">AI Workload & Strategic Scope</div>
        <table class="data-table">
          <tr><td class="label">AI Maturity</td><td class="value">${p.aiMaturity}</td></tr>
          <tr><td class="label">Primary Challenges</td><td class="value"><strong>${p.challenges}</strong></td></tr>
          <tr><td class="label">Business Objective</td><td class="value">${p.objective}</td></tr>
          <tr><td class="label">Preferred Timeline</td><td class="value">${p.preferredTimeline}</td></tr>
          ${p.message ? `<tr><td class="label">Additional Details</td><td class="value">${p.message}</td></tr>` : ''}
        </table>

        <div class="section-title">Attribution & Technical Telemetry</div>
        <table class="data-table">
          <tr><td class="label">Source / Medium</td><td class="value">${p.utmSource} / ${p.utmMedium}</td></tr>
          <tr><td class="label">Campaign</td><td class="value">${p.utmCampaign}</td></tr>
          <tr><td class="label">Origin Page URL</td><td class="value"><a href="${p.pageUrl}" target="_blank">${p.pageUrl}</a></td></tr>
          <tr><td class="label">Landing Page</td><td class="value">${p.landingPage}</td></tr>
          <tr><td class="label">Referrer</td><td class="value">${p.referrer}</td></tr>
          <tr><td class="label">Device / OS / Browser</td><td class="value">${p.device} • ${p.operatingSystem} • ${p.browser} (${p.screenSize})</td></tr>
        </table>
      </div>

      <div class="footer">
        <p><strong>TrustGrid.ai Enterprise Lead Dispatcher</strong><br>This lead has been saved to the operational Google Sheet.</p>
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    MailApp.sendEmail({
      to: recipient,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (err) {
    Logger.log('Error sending internal notification email: ' + err.toString());
  }
}

/**
 * Enterprise User Confirmation Email
 */
function sendUserConfirmation(p) {
  if (!p.email || !isValidEmail(p.email)) return;

  const subject = `Thank You — TrustGrid.AI [Ref: ${p.submissionId}]`;
  const htmlBody = `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <style>
      body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; background-color: #f8fafc; margin: 0; padding: 24px; color: #0f172a; }
      .card { max-width: 580px; margin: 0 auto; background: #ffffff; border-radius: 12px; border: 1px solid #e2e8f0; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05); }
      .header { background: #07143d; padding: 28px 32px; text-align: center; }
      .header h1 { color: #ffffff; font-size: 20px; margin: 0; font-weight: 700; }
      .content { padding: 32px; line-height: 1.6; font-size: 14.5px; color: #334155; }
      .ref-badge { background: #eff6ff; border: 1px solid #bfdbfe; color: #1d4ed8; padding: 8px 16px; border-radius: 8px; font-weight: 700; display: inline-block; margin: 16px 0; }
      .footer { background: #f8fafc; padding: 20px; font-size: 12px; color: #64748b; text-align: center; border-top: 1px solid #e2e8f0; }
    </style>
  </head>
  <body>
    <div class="card">
      <div class="header">
        <h1>TrustGrid.AI</h1>
      </div>
      <div class="content">
        <p>Dear <strong>${p.name}</strong>,</p>
        <p>Thank you for connecting with <strong>TrustGrid.AI</strong>.</p>
        <p>Your <strong>${p.formName}</strong> has been received successfully by our enterprise engineering team.</p>
        
        <div>
          <span class="ref-badge">REFERENCE ID: ${p.submissionId}</span>
        </div>

        <p>Our senior AI architecture team is reviewing your technical requirements and operational objectives. A dedicated lead engineer will review your context and follow up with you directly.</p>

        <p>Sincerely,<br><strong>TrustGrid.AI Architecture & Systems Group</strong><br><a href="https://trustgrid.ai" style="color: #1d5cff; text-decoration: none;">www.trustgrid.ai</a></p>
      </div>
      <div class="footer">
        © 2026 TrustGrid.ai. All rights reserved. • Enterprise AI Operating Company
      </div>
    </div>
  </body>
  </html>
  `;

  try {
    MailApp.sendEmail({
      to: p.email,
      subject: subject,
      htmlBody: htmlBody
    });
  } catch (err) {
    Logger.log('Error sending user confirmation email: ' + err.toString());
  }
}

/**
 * Logs email events
 */
function logEmailEvent(ss, submissionId, recipient, emailType, status) {
  try {
    const sheet = ss.getSheetByName('Email Log');
    if (sheet) {
      sheet.appendRow([
        submissionId,
        Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss'),
        recipient,
        emailType,
        status,
        'Delivered via MailApp'
      ]);
    }
  } catch (e) {
    Logger.log('Email logging error: ' + e.toString());
  }
}

/**
 * Standalone setup helper to initialize Google Sheet #1
 */
function setupFormCaptureSpreadsheet() {
  const ss = getOrCreateSpreadsheet();
  ensureRequiredSheets(ss);
  Logger.log('Form Capture Setup Complete! Spreadsheet URL: ' + ss.getUrl());
}
