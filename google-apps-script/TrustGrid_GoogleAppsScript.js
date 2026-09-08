/**
 * ==============================================================================
 * TRUSTGRID.AI — ENTERPRISE DATA COLLECTION, GOOGLE SHEETS SYNC & AUTOMATED REPORTING
 * ==============================================================================
 * 
 * Features:
 *  1. doPost(e): Webhook endpoint to collect AI Diagnostic submissions into Google Sheets
 *  2. doGet(e): Health-check / test endpoint
 *  3. sendDailyReport(): Automated daily report sent to poojasri.aram@gmail.com
 *  4. sendWeeklyReport(): Comprehensive 7-day analytics & trend breakdown
 *  5. sendMonthlyReport(): High-level monthly executive pipeline & industry analytics
 *  6. setupTriggers(): 1-click trigger installer for Daily, Weekly, and Monthly reports
 * 
 * Target Email: poojasri.aram@gmail.com
 * ==============================================================================
 */

// Global Configuration
const CONFIG = {
  RECIPIENT_EMAIL: 'poojasri.aram@gmail.com',
  COMPANY_NAME: 'TRUSTGRID.AI',
  PORTAL_TITLE: 'TrustGrid AI Diagnostic & Enterprise Pipeline',
  SHEET_NAME_LEADS: 'Diagnostic Leads',
  SHEET_NAME_ANALYTICS: 'Analytics Summary',
  TIMEZONE: 'Asia/Kolkata', // Set to your local timezone (e.g., 'Asia/Kolkata', 'America/New_York', 'UTC')
};

/**
 * 1. Webhook to receive form submissions from TRUSTGRID.AI website
 */
function doPost(e) {
  try {
    const lock = LockService.getScriptLock();
    lock.waitLock(15000); // Prevent concurrency conflicts

    let payload = {};
    if (e && e.postData && e.postData.contents) {
      try {
        payload = JSON.parse(e.postData.contents);
      } catch (err) {
        payload = e.parameter || {};
      }
    } else if (e && e.parameter) {
      payload = e.parameter;
    }

    const ss = SpreadsheetApp.getActiveSpreadsheet();
    let sheet = ss.getSheetByName(CONFIG.SHEET_NAME_LEADS);

    if (!sheet) {
      sheet = ss.insertSheet(CONFIG.SHEET_NAME_LEADS);
      setupLeadsSheetHeaders(sheet);
    }

    const now = new Date();
    const timestampFormatted = Utilities.formatDate(now, CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss');
    const refId = payload.refId || 'TG-DIAG-' + Math.floor(100000 + Math.random() * 900000);
    const name = payload.name || 'Anonymous';
    const email = payload.email || 'N/A';
    const company = payload.company || 'N/A';
    const role = payload.role || 'N/A';
    const industry = payload.industry || 'N/A';
    const solutions = Array.isArray(payload.solutions) ? payload.solutions.join(', ') : (payload.solutions || 'General AI Diagnostic');
    const engagementModel = payload.engagementModel || payload.model || 'Standard Assessment';
    const currentState = payload.currentState || 'N/A';
    const primaryBottleneck = payload.primaryBottleneck || 'N/A';
    const sourceUrl = payload.sourceUrl || 'https://trustgrid.ai/book-ai-diagnostic';

    // Append row
    sheet.appendRow([
      timestampFormatted,
      refId,
      name,
      email,
      company,
      role,
      industry,
      solutions,
      engagementModel,
      currentState,
      primaryBottleneck,
      sourceUrl,
      'New Lead' // Status
    ]);

    // Send instant alert email for every new submission
    sendInstantLeadAlert({
      timestamp: timestampFormatted,
      refId: refId,
      name: name,
      email: email,
      company: company,
      role: role,
      industry: industry,
      solutions: solutions,
      engagementModel: engagementModel,
      currentState: currentState,
      primaryBottleneck: primaryBottleneck
    });

    lock.releaseLock();

    return ContentService.createTextOutput(JSON.stringify({
      status: 'success',
      refId: refId,
      message: 'Diagnostic submission logged successfully'
    })).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      status: 'error',
      message: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

/**
 * 2. GET Endpoint for health checks
 */
function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    status: 'online',
    service: 'TRUSTGRID.AI Diagnostic & Reporting API',
    recipient: CONFIG.RECIPIENT_EMAIL,
    serverTime: new Date().toISOString()
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Setup format and headers for the leads sheet
 */
function setupLeadsSheetHeaders(sheet) {
  const headers = [
    'Timestamp',
    'Reference ID',
    'Full Name',
    'Work Email',
    'Enterprise / Company',
    'Job Role / Title',
    'Industry Vertical',
    'Selected Solutions',
    'Engagement Model',
    'Current AI Compute State',
    'Primary Bottleneck',
    'Source Page',
    'Status'
  ];

  sheet.appendRow(headers);
  const headerRange = sheet.getRange(1, 1, 1, headers.length);
  headerRange.setFontWeight('bold');
  headerRange.setBackground('#0D1E52');
  headerRange.setFontColor('#FFFFFF');
  sheet.setFrozenRows(1);
  sheet.autoResizeColumns(1, headers.length);
}

/**
 * Instant Alert when a new lead submits the form
 */
function sendInstantLeadAlert(data) {
  const subject = `🚨 [NEW AI DIAGNOSTIC] ${data.company} — ${data.name} (${data.refId})`;
  
  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 640px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 8px; overflow: hidden;">
      <div style="background: #0D1E52; padding: 24px; color: #ffffff;">
        <h2 style="margin: 0 0 6px 0; font-size: 20px; font-weight: 700; color: #ffffff;">TRUSTGRID.AI — Lead Notification</h2>
        <p style="margin: 0; font-size: 13px; color: #94a3b8;">New Enterprise AI Diagnostic Assessment Request</p>
      </div>
      
      <div style="padding: 24px;">
        <div style="display: inline-block; background: #eff6ff; color: #1d4ed8; padding: 4px 10px; border-radius: 4px; font-weight: 700; font-size: 12px; margin-bottom: 16px;">
          REF: ${data.refId}
        </div>
        
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 8px 0; color: #64748b; width: 35%;">Client Name:</td>
            <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${data.name}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Work Email:</td>
            <td style="padding: 8px 0; font-weight: 600; color: #2563eb;"><a href="mailto:${data.email}">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Enterprise / Company:</td>
            <td style="padding: 8px 0; font-weight: 600; color: #0f172a;">${data.company}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Job Role:</td>
            <td style="padding: 8px 0; color: #0f172a;">${data.role}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Industry Vertical:</td>
            <td style="padding: 8px 0; color: #0f172a;">${data.industry}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Selected Solutions:</td>
            <td style="padding: 8px 0; color: #0f172a; font-weight: 600;">${data.solutions}</td>
          </tr>
          <tr>
            <td style="padding: 8px 0; color: #64748b;">Engagement Model:</td>
            <td style="padding: 8px 0; color: #0f172a;">${data.engagementModel}</td>
          </tr>
        </table>
        
        <div style="margin-top: 20px; padding: 14px; background: #f8fafc; border-left: 4px solid #2563eb; border-radius: 4px;">
          <strong style="font-size: 13px; color: #334155; display: block; margin-bottom: 4px;">Current AI Compute State:</strong>
          <p style="margin: 0 0 10px 0; font-size: 13px; color: #475569;">${data.currentState}</p>
          <strong style="font-size: 13px; color: #334155; display: block; margin-bottom: 4px;">Primary Operational Bottleneck:</strong>
          <p style="margin: 0; font-size: 13px; color: #475569;">${data.primaryBottleneck}</p>
        </div>
      </div>
      
      <div style="background: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b;">
        TRUSTGRID.AI Automated Enterprise System • ${data.timestamp}
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: CONFIG.RECIPIENT_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * ==============================================================================
 * AUTOMATED ANALYTICS & DATA EXTRACTION
 * ==============================================================================
 */
function getLeadsDataWithinRange(daysBack) {
  const ss = SpreadsheetApp.getActiveSpreadsheet();
  const sheet = ss.getSheetByName(CONFIG.SHEET_NAME_LEADS);
  if (!sheet) return { leads: [], stats: { total: 0, solutions: {}, industries: {}, models: {} } };

  const data = sheet.getDataRange().getValues();
  if (data.length <= 1) return { leads: [], stats: { total: 0, solutions: {}, industries: {}, models: {} } };

  const headers = data[0];
  const rows = data.slice(1);
  const now = new Date();
  const cutoff = new Date(now.getTime() - (daysBack * 24 * 60 * 60 * 1000));

  const filteredLeads = [];
  const stats = {
    total: 0,
    solutions: {},
    industries: {},
    models: {}
  };

  rows.forEach(row => {
    const rowDate = new Date(row[0]);
    if (daysBack === 0 || rowDate >= cutoff) {
      stats.total++;
      const lead = {
        timestamp: row[0],
        refId: row[1],
        name: row[2],
        email: row[3],
        company: row[4],
        role: row[5],
        industry: row[6],
        solutions: row[7],
        model: row[8],
        currentState: row[9],
        bottleneck: row[10],
        status: row[12]
      };
      filteredLeads.push(lead);

      // Aggregate Solutions
      const sols = String(row[7]).split(',');
      sols.forEach(s => {
        const cleanS = s.trim();
        if (cleanS) stats.solutions[cleanS] = (stats.solutions[cleanS] || 0) + 1;
      });

      // Aggregate Industries
      const ind = String(row[6]).trim();
      if (ind && ind !== 'N/A') stats.industries[ind] = (stats.industries[ind] || 0) + 1;

      // Aggregate Engagement Models
      const m = String(row[8]).trim();
      if (m && m !== 'N/A') stats.models[m] = (stats.models[m] || 0) + 1;
    }
  });

  return { leads: filteredLeads, stats: stats };
}

/**
 * ==============================================================================
 * 3. DAILY REPORT (Triggered every morning or evening)
 * ==============================================================================
 */
function sendDailyReport() {
  const result = getLeadsDataWithinRange(1); // Last 24 hours
  const todayStr = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'MMMM dd, yyyy');
  const subject = `📊 [DAILY REPORT] TrustGrid.AI Diagnostic Submissions — ${todayStr}`;

  let leadsTableRows = '';
  if (result.leads.length === 0) {
    leadsTableRows = `<tr><td colspan="5" style="padding: 16px; text-align: center; color: #64748b;">No new diagnostic requests in the last 24 hours.</td></tr>`;
  } else {
    result.leads.forEach(l => {
      leadsTableRows += `
        <tr style="border-bottom: 1px solid #e2e8f0;">
          <td style="padding: 10px 8px; font-weight: 600; color: #0f172a;">${l.name}</td>
          <td style="padding: 10px 8px; color: #334155;"><strong>${l.company}</strong><br><span style="font-size: 11px; color: #64748b;">${l.industry}</span></td>
          <td style="padding: 10px 8px; color: #2563eb;"><a href="mailto:${l.email}">${l.email}</a></td>
          <td style="padding: 10px 8px; font-size: 12px; color: #475569;">${l.solutions}</td>
          <td style="padding: 10px 8px; font-size: 11px; color: #0284c7; font-weight: 600;">${l.refId}</td>
        </tr>
      `;
    });
  }

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 700px; margin: 0 auto; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
      <div style="background: #0D1E52; padding: 24px; color: #ffffff;">
        <h2 style="margin: 0 0 4px 0; font-size: 22px; color: #ffffff;">TRUSTGRID.AI — Daily Executive Report</h2>
        <p style="margin: 0; font-size: 13px; color: #94a3b8;">Daily Diagnostic Telemetry & Lead Pipeline • ${todayStr}</p>
      </div>

      <div style="padding: 24px;">
        <div style="display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-bottom: 24px;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 6px; text-align: center;">
            <span style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700;">24h New Leads</span>
            <div style="font-size: 26px; font-weight: 800; color: #2563eb; margin-top: 4px;">${result.stats.total}</div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 6px; text-align: center;">
            <span style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700;">Top Solution Domain</span>
            <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 8px;">
              ${getTopItem(result.stats.solutions)}
            </div>
          </div>
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 14px; border-radius: 6px; text-align: center;">
            <span style="font-size: 11px; text-transform: uppercase; color: #64748b; font-weight: 700;">Top Industry</span>
            <div style="font-size: 13px; font-weight: 700; color: #0f172a; margin-top: 8px;">
              ${getTopItem(result.stats.industries)}
            </div>
          </div>
        </div>

        <h3 style="font-size: 15px; color: #0f172a; margin: 0 0 12px 0; border-bottom: 2px solid #e2e8f0; padding-bottom: 6px;">
          New Diagnostic Requests (Last 24 Hours)
        </h3>

        <table style="width: 100%; border-collapse: collapse; font-size: 13px; text-align: left;">
          <thead>
            <tr style="background: #f1f5f9; color: #475569; font-size: 11px; text-transform: uppercase;">
              <th style="padding: 8px;">Lead</th>
              <th style="padding: 8px;">Company & Sector</th>
              <th style="padding: 8px;">Email</th>
              <th style="padding: 8px;">Solution</th>
              <th style="padding: 8px;">Ref ID</th>
            </tr>
          </thead>
          <tbody>
            ${leadsTableRows}
          </tbody>
        </table>
      </div>

      <div style="background: #f8fafc; padding: 16px 24px; border-top: 1px solid #e2e8f0; text-align: center; font-size: 12px; color: #64748b;">
        Automated Daily Dispatch to <strong>${CONFIG.RECIPIENT_EMAIL}</strong> • TrustGrid.AI Systems
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: CONFIG.RECIPIENT_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * ==============================================================================
 * 4. WEEKLY REPORT (Triggered every Monday)
 * ==============================================================================
 */
function sendWeeklyReport() {
  const result = getLeadsDataWithinRange(7); // Last 7 days
  const todayStr = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'MMMM dd, yyyy');
  const subject = `📈 [WEEKLY SUMMARY] TrustGrid.AI Pipeline & Analytics — Week of ${todayStr}`;

  const solutionsBreakdown = renderBreakdownList(result.stats.solutions);
  const industriesBreakdown = renderBreakdownList(result.stats.industries);
  const modelsBreakdown = renderBreakdownList(result.stats.models);

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 720px; margin: 0 auto; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
      <div style="background: #0D1E52; padding: 24px; color: #ffffff;">
        <h2 style="margin: 0 0 4px 0; font-size: 22px; color: #ffffff;">TRUSTGRID.AI — Weekly Performance Review</h2>
        <p style="margin: 0; font-size: 13px; color: #94a3b8;">7-Day Comprehensive Lead Generation & Solution Demand Analytics</p>
      </div>

      <div style="padding: 24px;">
        <div style="background: #eff6ff; border-left: 4px solid #2563eb; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
          <h3 style="margin: 0 0 4px 0; color: #1e3a8a; font-size: 16px;">Weekly Key Performance Metric</h3>
          <p style="margin: 0; font-size: 14px; color: #1e40af;">
            A total of <strong>${result.stats.total} new enterprise AI diagnostic requests</strong> were logged across our 6 solution domains in the past 7 days.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 6px;">
            <h4 style="margin: 0 0 10px 0; font-size: 13px; color: #0f172a; text-transform: uppercase;">Demand by Solution Area</h4>
            ${solutionsBreakdown}
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 6px;">
            <h4 style="margin: 0 0 10px 0; font-size: 13px; color: #0f172a; text-transform: uppercase;">Demand by Industry Sector</h4>
            ${industriesBreakdown}
          </div>
        </div>

        <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 6px; margin-bottom: 24px;">
          <h4 style="margin: 0 0 10px 0; font-size: 13px; color: #0f172a; text-transform: uppercase;">Requested Engagement Frameworks</h4>
          ${modelsBreakdown}
        </div>
      </div>

      <div style="background: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b;">
        TRUSTGRID.AI Executive Intelligence Engine • Sent to ${CONFIG.RECIPIENT_EMAIL}
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: CONFIG.RECIPIENT_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * ==============================================================================
 * 5. MONTHLY REPORT (Triggered on the 1st of every month)
 * ==============================================================================
 */
function sendMonthlyReport() {
  const result = getLeadsDataWithinRange(30); // Last 30 days
  const todayStr = Utilities.formatDate(new Date(), CONFIG.TIMEZONE, 'MMMM yyyy');
  const subject = `🏆 [MONTHLY INTELLIGENCE REPORT] TrustGrid.AI Enterprise Pipeline — ${todayStr}`;

  const solutionsBreakdown = renderBreakdownList(result.stats.solutions);
  const industriesBreakdown = renderBreakdownList(result.stats.industries);

  const htmlBody = `
    <div style="font-family: 'Segoe UI', Arial, sans-serif; max-width: 740px; margin: 0 auto; background: #ffffff; border: 1px solid #cbd5e1; border-radius: 8px; overflow: hidden;">
      <div style="background: #0D1E52; padding: 28px; color: #ffffff;">
        <h2 style="margin: 0 0 6px 0; font-size: 24px; color: #ffffff;">TRUSTGRID.AI — Monthly Strategic Intelligence</h2>
        <p style="margin: 0; font-size: 14px; color: #94a3b8;">Enterprise AI Pipeline, Sector Analytics & 30-Day Growth Synthesis • ${todayStr}</p>
      </div>

      <div style="padding: 24px;">
        <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 16px; border-radius: 4px; margin-bottom: 24px;">
          <h3 style="margin: 0 0 4px 0; color: #14532d; font-size: 16px;">Monthly Pipeline Summary</h3>
          <p style="margin: 0; font-size: 14px; color: #166534;">
            Total enterprise assessments logged in the past 30 days: <strong>${result.stats.total} leads</strong> across global regulated markets.
          </p>
        </div>

        <div style="display: grid; grid-template-columns: repeat(2, 1fr); gap: 16px; margin-bottom: 24px;">
          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 6px;">
            <h4 style="margin: 0 0 10px 0; font-size: 13px; color: #0f172a; text-transform: uppercase;">30-Day Solution Distribution</h4>
            ${solutionsBreakdown}
          </div>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 16px; border-radius: 6px;">
            <h4 style="margin: 0 0 10px 0; font-size: 13px; color: #0f172a; text-transform: uppercase;">30-Day Sector Breakdown</h4>
            ${industriesBreakdown}
          </div>
        </div>
      </div>

      <div style="background: #f1f5f9; padding: 16px 24px; text-align: center; font-size: 12px; color: #64748b;">
        TRUSTGRID.AI Executive Intelligence Engine • Monthly Archive Sent to ${CONFIG.RECIPIENT_EMAIL}
      </div>
    </div>
  `;

  MailApp.sendEmail({
    to: CONFIG.RECIPIENT_EMAIL,
    subject: subject,
    htmlBody: htmlBody
  });
}

/**
 * ==============================================================================
 * 6. ONE-CLICK TRIGGER SETUP
 * Run this function once from the Apps Script editor to automate Daily, Weekly, and Monthly reports!
 * ==============================================================================
 */
function setupTriggers() {
  // Clear existing triggers to avoid duplicate emails
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => ScriptApp.deleteTrigger(t));

  // 1. Daily Report — Every day at 8:00 AM
  ScriptApp.newTrigger('sendDailyReport')
    .timeBased()
    .everyDays(1)
    .atHour(8)
    .create();

  // 2. Weekly Report — Every Monday at 9:00 AM
  ScriptApp.newTrigger('sendWeeklyReport')
    .timeBased()
    .onWeekDay(ScriptApp.WeekDay.MONDAY)
    .atHour(9)
    .create();

  // 3. Monthly Report — On the 1st of every month at 10:00 AM
  ScriptApp.newTrigger('sendMonthlyReport')
    .timeBased()
    .onMonthDay(1)
    .atHour(10)
    .create();

  Logger.log('✅ All TrustGrid.AI automated reporting triggers successfully configured for ' + CONFIG.RECIPIENT_EMAIL);
}

// Helpers
function getTopItem(dict) {
  let top = 'N/A';
  let max = 0;
  for (const k in dict) {
    if (dict[k] > max) {
      max = dict[k];
      top = `${k} (${dict[k]})`;
    }
  }
  return top;
}

function renderBreakdownList(dict) {
  const keys = Object.keys(dict);
  if (keys.length === 0) return '<p style="color: #94a3b8; font-size: 12px; margin: 0;">No data recorded for this period.</p>';

  keys.sort((a, b) => dict[b] - dict[a]);
  let html = '<ul style="list-style: none; padding: 0; margin: 0; font-size: 12.5px;">';
  keys.forEach(k => {
    html += `
      <li style="display: flex; justify-content: space-between; padding: 4px 0; border-bottom: 1px dashed #e2e8f0;">
        <span style="color: #334155;">${k}</span>
        <strong style="color: #2563eb;">${dict[k]}</strong>
      </li>
    `;
  });
  html += '</ul>';
  return html;
}
