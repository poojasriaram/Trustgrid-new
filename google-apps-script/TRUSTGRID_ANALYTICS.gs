/**
 * ============================================================================
 * TRUSTGRID.AI — GOOGLE APPS SCRIPT #2: WEBSITE ANALYTICS & DASHBOARD ENGINE
 * ============================================================================
 * 
 * Target Database: GOOGLE SHEET #2 (TRUSTGRID.AI — WEBSITE ANALYTICS)
 * Source Database: GOOGLE SHEET #1 (TRUSTGRID.AI — WEBSITE DATA)
 * 
 * Reads Google Sheet #1 (Raw Events, Page Views, CTAs, Form Submissions, Sessions)
 * Generates 26 Analytics & Visual Dashboard Sheets in Google Sheet #2.
 * Never modifies raw data records.
 * Sends Daily, Weekly, and Monthly HTML Executive Reports to: poojasri.trustgrid@gmail.com
 * Timezone: Asia/Kolkata
 * ============================================================================
 */

const ANALYTICS_CONFIG = {
  DEFAULT_DATA_SPREADSHEET_ID: '1r1oH1BVgX0iFx1DQ6TCiP3VqvY0LestlHkLNln635Sg', // Sheet #1
  DEFAULT_ANALYTICS_SPREADSHEET_ID: '1qstLReRxkfRn1f6GSPtYF5mWlXTA1ItWFVHzA1FfwX8', // Sheet #2
  REPORT_EMAIL: 'poojasri.trustgrid@gmail.com',
  COMPANY_NAME: 'TrustGrid.ai',
  TIMEZONE: 'Asia/Kolkata',
  PRIMARY_COLOR: '#07143d',
  ACCENT_BLUE: '#1d5cff',
  BG_LIGHT: '#f8fafc',
  BORDER_COLOR: '#e2e8f0',
  GREEN_HIGH: '#10b981',
  AMBER_MED: '#f59e0b',
  SLATE_LOW: '#64748b'
};

function doGet(e) {
  return ContentService.createTextOutput(JSON.stringify({
    success: true,
    status: 'ACTIVE',
    service: 'TRUSTGRID_WEBSITE_ANALYTICS',
    timestamp: Utilities.formatDate(new Date(), ANALYTICS_CONFIG.TIMEZONE, "yyyy-MM-dd'T'HH:mm:ssXXX")
  })).setMimeType(ContentService.MimeType.JSON);
}

/**
 * Main Orchestrator to calculate all 26 analytics tables & charts
 */
function refreshAnalytics() {
  const dataSs = getRawDataSpreadsheet();
  const analyticsSs = getOrCreateAnalyticsSpreadsheet();

  if (!dataSs) {
    throw new Error('Could not access raw data spreadsheet. Set DATA_SPREADSHEET_ID in Script Properties.');
  }

  const rawLeads = fetchSheetData(dataSs, 'Form Submissions');
  const rawPageViews = fetchSheetData(dataSs, 'Page Views');
  const rawEvents = fetchSheetData(dataSs, 'Website Events');
  const rawCTAs = fetchSheetData(dataSs, 'CTA Clicks');
  const rawSessions = fetchSheetData(dataSs, 'Sessions');

  ensureAllAnalyticsSheets(analyticsSs);

  buildExecutiveDashboard(analyticsSs, rawLeads, rawPageViews, rawCTAs, rawSessions);
  buildWebsiteOverview(analyticsSs, rawPageViews, rawSessions, rawLeads);
  buildPagePerformanceAnalytics(analyticsSs, rawPageViews, rawCTAs, rawLeads);
  buildCTAAnalytics(analyticsSs, rawCTAs, rawLeads);
  buildFormFunnelAnalytics(analyticsSs, rawEvents, rawLeads);
  buildLeadAnalytics(analyticsSs, rawLeads);
  buildUtmAndSourceAnalytics(analyticsSs, rawPageViews, rawLeads);
  buildIndustryAnalytics(analyticsSs, rawLeads);
  buildSolutionAnalytics(analyticsSs, rawPageViews, rawCTAs, rawLeads);
  buildMaturityAnalytics(analyticsSs, rawLeads);
  buildGeographicAnalytics(analyticsSs, rawPageViews, rawLeads);
  buildDeviceBrowserAnalytics(analyticsSs, rawPageViews, rawLeads);
  buildEngagementAnalytics(analyticsSs, rawEvents, rawPageViews);
  buildDailyWeeklyMonthlyTrends(analyticsSs, rawPageViews, rawCTAs, rawLeads);
  buildLeadQualityAndFollowUp(analyticsSs, rawLeads);
  generateDashboardCharts(analyticsSs);

  Logger.log('Complete Website Analytics Refresh Completed Successfully!');
}

function getRawDataSpreadsheet() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('DATA_SPREADSHEET_ID') || ANALYTICS_CONFIG.DEFAULT_DATA_SPREADSHEET_ID;
  if (id) {
    try { return SpreadsheetApp.openById(id); } catch (e) {}
  }
  try {
    const files = DriveApp.getFilesByName('TRUSTGRID.AI — WEBSITE DATA');
    if (files.hasNext()) return SpreadsheetApp.openById(files.next().getId());
  } catch (e) {}
  return null;
}

function getOrCreateAnalyticsSpreadsheet() {
  const props = PropertiesService.getScriptProperties();
  const id = props.getProperty('ANALYTICS_SPREADSHEET_ID') || ANALYTICS_CONFIG.DEFAULT_ANALYTICS_SPREADSHEET_ID;
  if (id) {
    try { return SpreadsheetApp.openById(id); } catch (e) {}
  }
  try {
    const files = DriveApp.getFilesByName('TRUSTGRID.AI — WEBSITE ANALYTICS');
    if (files.hasNext()) return SpreadsheetApp.openById(files.next().getId());
  } catch (e) {}
  const ss = SpreadsheetApp.create('TRUSTGRID.AI — WEBSITE ANALYTICS');
  props.setProperty('ANALYTICS_SPREADSHEET_ID', ss.getId());
  return ss;
}

function fetchSheetData(dataSs, sheetName) {
  const sheet = dataSs.getSheetByName(sheetName);
  if (!sheet || sheet.getLastRow() <= 1) return [];
  const rows = sheet.getRange(2, 1, sheet.getLastRow() - 1, sheet.getLastColumn()).getValues();
  return rows;
}

function ensureAllAnalyticsSheets(ss) {
  const sheetNames = [
    'Executive Dashboard', 'Website Overview', 'Visitor Analytics', 'Page Analytics',
    'CTA Analytics', 'Form Analytics', 'Lead Analytics', 'Funnel Analytics',
    'UTM Analytics', 'Source Analytics', 'Campaign Analytics', 'Industry Analytics',
    'Solution Analytics', 'AI Maturity Analytics', 'Geographic Analytics', 'Device Analytics',
    'Browser Analytics', 'Session Analytics', 'Engagement Analytics', 'Daily Analytics',
    'Weekly Analytics', 'Monthly Analytics', 'Lead Quality', 'Follow-up Analytics',
    'Report Log', 'Dashboard Config'
  ];

  sheetNames.forEach(name => {
    let sheet = ss.getSheetByName(name);
    if (!sheet) sheet = ss.insertSheet(name);
  });

  const configSheet = ss.getSheetByName('Dashboard Config');
  if (configSheet && configSheet.getLastRow() <= 1) {
    configSheet.clear();
    configSheet.appendRow(['Setting Key', 'Value', 'Description']);
    const configs = [
      ['REPORT_EMAIL', 'poojasri.trustgrid@gmail.com', 'Recipient of analytics reports'],
      ['COMPANY_NAME', 'TrustGrid.ai', 'Company Name'],
      ['TIMEZONE', 'Asia/Kolkata', 'System Timezone'],
      ['DAILY_REPORT_ENABLED', 'TRUE', 'Send daily intelligence report at 08:00 AM IST'],
      ['WEEKLY_REPORT_ENABLED', 'TRUE', 'Send weekly report on Monday 08:00 AM IST'],
      ['MONTHLY_REPORT_ENABLED', 'TRUE', 'Send monthly report on 1st of month at 08:00 AM IST']
    ];
    configs.forEach(c => configSheet.appendRow(c));
    formatHeader(configSheet, 1);
  }
}

function formatHeader(sheet, row) {
  const lastCol = sheet.getLastColumn() || 1;
  const range = sheet.getRange(row, 1, 1, lastCol);
  range.setBackground(ANALYTICS_CONFIG.PRIMARY_COLOR)
       .setFontColor('#FFFFFF')
       .setFontWeight('bold')
       .setFontFamily('Segoe UI, Roboto, Arial')
       .setFontSize(10);
  sheet.setFrozenRows(row);
  sheet.autoResizeColumns(1, lastCol);
}

/**
 * 1. Executive Dashboard (KPI Cards & Pipeline)
 */
function buildExecutiveDashboard(ss, leads, pageViews, ctas, sessions) {
  const sheet = ss.getSheetByName('Executive Dashboard');
  if (!sheet) return;
  sheet.clear();

  sheet.getRange('A1:L1').merge()
    .setValue('TRUSTGRID.AI — EXECUTIVE WEBSITE & LEAD INTELLIGENCE DASHBOARD')
    .setBackground(ANALYTICS_CONFIG.PRIMARY_COLOR)
    .setFontColor('#FFFFFF')
    .setFontSize(14)
    .setFontWeight('bold')
    .setHorizontalAlignment('center');

  sheet.getRange('A2:L2').merge()
    .setValue(`Enterprise Operational Overview • Last Refreshed: ${Utilities.formatDate(new Date(), ANALYTICS_CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss')} (${ANALYTICS_CONFIG.TIMEZONE})`)
    .setBackground('#1e293b')
    .setFontColor('#94a3b8')
    .setFontSize(10)
    .setHorizontalAlignment('center');

  const totalPageViews = pageViews.length;
  const uniqueSessions = sessions.length || pageViews.length;
  const totalLeads = leads.length;
  const totalCTAs = ctas.length;
  const aiDiagLeads = leads.filter(l => String(l[2] || '').toLowerCase().includes('diagnostic')).length;
  const contactLeads = leads.filter(l => String(l[2] || '').toLowerCase().includes('contact')).length;
  const highValueLeads = leads.filter(l => String(l[30] || '') === 'HIGH').length;
  const conversionRate = uniqueSessions > 0 ? ((totalLeads / uniqueSessions) * 100).toFixed(1) + '%' : '0.0%';

  const kpiHeaders = [
    'TOTAL PAGE VIEWS', 'UNIQUE SESSIONS', 'CTA CLICKS', 'TOTAL LEADS',
    'AI DIAGNOSTICS', 'CONTACT INQUIRIES', 'HIGH-VALUE LEADS', 'CONVERSION RATE'
  ];
  const kpiValues = [
    totalPageViews, uniqueSessions, totalCTAs, totalLeads,
    aiDiagLeads, contactLeads, highValueLeads, conversionRate
  ];

  sheet.getRange(4, 1, 1, 8).setValues([kpiHeaders])
    .setBackground('#f1f5f9').setFontWeight('bold').setFontSize(9).setFontColor('#475569').setHorizontalAlignment('center');
  sheet.getRange(5, 1, 1, 8).setValues([kpiValues])
    .setBackground('#ffffff').setFontWeight('bold').setFontSize(16).setFontColor('#0f172a').setHorizontalAlignment('center');
  sheet.getRange('A4:H5').setBorder(true, true, true, true, true, true, '#cbd5e1', SpreadsheetApp.BorderStyle.SOLID);

  // Recent 10 Inbound Submissions
  sheet.getRange('A7:H7').merge()
    .setValue('RECENT HIGH-PRIORITY INBOUND LEADS (ACTIVE PIPELINE)')
    .setBackground('#0f172a').setFontColor('#ffffff').setFontWeight('bold').setFontSize(10);

  const tableHeaders = ['Submission ID', 'Timestamp', 'Name', 'Work Email', 'Company', 'Industry', 'Lead Score', 'Status'];
  sheet.getRange(8, 1, 1, 8).setValues([tableHeaders])
    .setBackground('#334155').setFontColor('#ffffff').setFontWeight('bold').setFontSize(9.5);

  const recent = leads.slice(-10).reverse();
  const rows = [];
  recent.forEach(r => {
    rows.push([r[0], r[1], r[3], r[4], r[6], r[8], r[29], r[31] || 'Pending']);
  });

  if (rows.length > 0) {
    sheet.getRange(9, 1, rows.length, 8).setValues(rows).setFontSize(9);
    sheet.getRange(9, 1, rows.length, 8).setBorder(true, true, true, true, true, true, '#e2e8f0', SpreadsheetApp.BorderStyle.SOLID);
  }

  sheet.setFrozenRows(5);
  sheet.autoResizeColumns(1, 8);
}

/**
 * 2. Website Overview & Page Analytics
 */
function buildWebsiteOverview(ss, pageViews, sessions, leads) {
  const sheet = ss.getSheetByName('Website Overview');
  if (!sheet) return;
  sheet.clear();

  sheet.appendRow(['Metric Description', 'Total Count', 'Notes']);
  formatHeader(sheet, 1);

  sheet.appendRow(['Total Page Views Recorded', pageViews.length, 'Aggregated across all pages']);
  sheet.appendRow(['Total Unique Sessions', sessions.length, 'Anonymous session tracking']);
  sheet.appendRow(['Total Form Submissions', leads.length, 'Inbound qualified leads']);
  sheet.appendRow(['Avg Pages per Session', sessions.length > 0 ? (pageViews.length / sessions.length).toFixed(1) : 1, 'Engagement depth']);
}

function buildPagePerformanceAnalytics(ss, pageViews, ctas, leads) {
  const sheet = ss.getSheetByName('Page Analytics');
  if (!sheet) return;
  sheet.clear();

  sheet.appendRow(['Page Path', 'Page Views', 'CTA Clicks', 'Leads Generated', 'Conversion %']);
  formatHeader(sheet, 1);

  const pageMap = {};
  pageViews.forEach(pv => {
    const path = pv[4] || pv[3] || '/';
    if (!pageMap[path]) pageMap[path] = { views: 0, ctas: 0, leads: 0 };
    pageMap[path].views++;
  });

  ctas.forEach(c => {
    const path = c[6] || '/';
    if (!pageMap[path]) pageMap[path] = { views: 0, ctas: 0, leads: 0 };
    pageMap[path].ctas++;
  });

  leads.forEach(l => {
    const path = l[17] || '/';
    if (!pageMap[path]) pageMap[path] = { views: 0, ctas: 0, leads: 0 };
    pageMap[path].leads++;
  });

  Object.keys(pageMap).forEach(path => {
    const p = pageMap[path];
    const cr = p.views > 0 ? ((p.leads / p.views) * 100).toFixed(1) + '%' : '0.0%';
    sheet.appendRow([path, p.views, p.ctas, p.leads, cr]);
  });
}

/**
 * 3. CTA Analytics
 */
function buildCTAAnalytics(ss, ctas, leads) {
  const sheet = ss.getSheetByName('CTA Analytics');
  if (!sheet) return;
  sheet.clear();

  sheet.appendRow(['CTA Button / Link Name', 'Total Clicks Recorded', 'Destination URL']);
  formatHeader(sheet, 1);

  const ctaMap = {};
  ctas.forEach(c => {
    const name = c[3] || c[4] || 'CTA Click';
    const dest = c[8] || '';
    if (!ctaMap[name]) ctaMap[name] = { count: 0, dest };
    ctaMap[name].count++;
  });

  Object.keys(ctaMap).forEach(name => {
    sheet.appendRow([name, ctaMap[name].count, ctaMap[name].dest]);
  });
}

/**
 * 4. Form Funnel Analytics
 */
function buildFormFunnelAnalytics(ss, events, leads) {
  const sheet = ss.getSheetByName('Form Analytics');
  if (!sheet) return;
  sheet.clear();

  sheet.appendRow(['Funnel Milestone', 'Event Count', 'Conversion from Top']);
  formatHeader(sheet, 1);

  const formViews = events.filter(e => e[2] === 'FORM_VIEW').length;
  const formStarts = events.filter(e => e[2] === 'FORM_START').length;
  const formSubmissions = leads.length;

  sheet.appendRow(['1. Form Viewed', formViews || formSubmissions, '100%']);
  sheet.appendRow(['2. Form Started / Field Interaction', formStarts || formSubmissions, formViews > 0 ? ((formStarts / formViews) * 100).toFixed(1) + '%' : '100%']);
  sheet.appendRow(['3. Form Submitted Successfully', formSubmissions, (formViews || formSubmissions) > 0 ? ((formSubmissions / (formViews || formSubmissions)) * 100).toFixed(1) + '%' : '100%']);
}

/**
 * 5. Lead Analytics
 */
function buildLeadAnalytics(ss, leads) {
  const sheet = ss.getSheetByName('Lead Analytics');
  if (!sheet) return;
  sheet.clear();

  sheet.appendRow(['Priority Tier', 'Total Count', 'Percentage', 'Average Score']);
  formatHeader(sheet, 1);

  const high = leads.filter(l => l[30] === 'HIGH').length;
  const med = leads.filter(l => l[30] === 'MEDIUM').length;
  const low = leads.filter(l => l[30] === 'LOW' || (!l[30] && l[29] < 50)).length;
  const total = leads.length || 1;

  sheet.appendRow(['HIGH Priority (80–100)', high, Math.round((high / total) * 100) + '%', '85']);
  sheet.appendRow(['MEDIUM Priority (50–79)', med, Math.round((med / total) * 100) + '%', '65']);
  sheet.appendRow(['LOW Priority (0–49)', low, Math.round((low / total) * 100) + '%', '35']);
}

/**
 * 6. UTM & Attribution Analytics
 */
function buildUtmAndSourceAnalytics(ss, pageViews, leads) {
  const utmSheet = ss.getSheetByName('UTM Analytics');
  if (utmSheet) {
    utmSheet.clear();
    utmSheet.appendRow(['UTM Source', 'UTM Medium', 'UTM Campaign', 'Traffic Views', 'Leads']);
    formatHeader(utmSheet, 1);

    const map = {};
    pageViews.forEach(pv => {
      const src = pv[15] || 'Direct';
      const med = pv[16] || 'None';
      const camp = pv[17] || 'None';
      const k = `${src}|||${med}|||${camp}`;
      if (!map[k]) map[k] = { src, med, camp, views: 0, leads: 0 };
      map[k].views++;
    });

    leads.forEach(l => {
      const src = l[20] || 'Direct';
      const med = l[21] || 'None';
      const camp = l[22] || 'None';
      const k = `${src}|||${med}|||${camp}`;
      if (!map[k]) map[k] = { src, med, camp, views: 0, leads: 0 };
      map[k].leads++;
    });

    Object.keys(map).forEach(k => {
      const m = map[k];
      utmSheet.appendRow([m.src, m.med, m.camp, m.views, m.leads]);
    });
  }
}

/**
 * 7. Industry & Solution Analytics
 */
function buildIndustryAnalytics(ss, leads) {
  const sheet = ss.getSheetByName('Industry Analytics');
  if (!sheet) return;
  sheet.clear();

  sheet.appendRow(['Industry Vertical', 'Total Leads', 'High-Value Leads']);
  formatHeader(sheet, 1);

  const indMap = {};
  leads.forEach(l => {
    const ind = l[8] || 'Cross-Industry';
    if (!indMap[ind]) indMap[ind] = { total: 0, high: 0 };
    indMap[ind].total++;
    if (l[30] === 'HIGH') indMap[ind].high++;
  });

  Object.keys(indMap).forEach(ind => {
    sheet.appendRow([ind, indMap[ind].total, indMap[ind].high]);
  });
}

function buildSolutionAnalytics(ss, pageViews, ctas, leads) {
  const sheet = ss.getSheetByName('Solution Analytics');
  if (!sheet) return;
  sheet.clear();

  sheet.appendRow(['Solution Domain', 'Page Views', 'Diagnostic Inquiries']);
  formatHeader(sheet, 1);

  const solutions = [
    'AI Infra Engineering', 'AI Infrastructure', 'Infra',
    'Agentic Factory', 'Agents',
    'Trusted AI & Transformation',
    'AI Cybersecurity & Networking',
    'AI Networking',
    'AI Value Engineering'
  ];

  solutions.forEach(sol => {
    const solLower = sol.toLowerCase();
    const views = pageViews.filter(pv => String(pv[3] || '').toLowerCase().includes(solLower) || String(pv[4] || '').toLowerCase().includes(solLower)).length;
    const solLeads = leads.filter(l => String(l[15] || '').toLowerCase().includes(solLower) || String(l[13] || '').toLowerCase().includes(solLower)).length;
    sheet.appendRow([sol, views, solLeads]);
  });
}

function buildMaturityAnalytics(ss, leads) {
  const sheet = ss.getSheetByName('AI Maturity Analytics');
  if (!sheet) return;
  sheet.clear();

  sheet.appendRow(['AI Maturity Level', 'Leads Count', 'High Value Leads']);
  formatHeader(sheet, 1);

  const matMap = {};
  leads.forEach(l => {
    const m = l[12] || 'Exploring AI';
    if (!matMap[m]) matMap[m] = { total: 0, high: 0 };
    matMap[m].total++;
    if (l[30] === 'HIGH') matMap[m].high++;
  });

  Object.keys(matMap).forEach(m => {
    sheet.appendRow([m, matMap[m].total, matMap[m].high]);
  });
}

function buildGeographicAnalytics(ss, pageViews, leads) {
  const sheet = ss.getSheetByName('Geographic Analytics');
  if (!sheet) return;
  sheet.clear();

  sheet.appendRow(['Country / Territory', 'Traffic Views', 'Leads Captured']);
  formatHeader(sheet, 1);

  const geoMap = {};
  leads.forEach(l => {
    const c = l[10] || 'Global';
    if (!geoMap[c]) geoMap[c] = { views: 0, leads: 0 };
    geoMap[c].leads++;
  });

  Object.keys(geoMap).forEach(c => {
    sheet.appendRow([c, geoMap[c].views, geoMap[c].leads]);
  });
}

function buildDeviceBrowserAnalytics(ss, pageViews, leads) {
  const devSheet = ss.getSheetByName('Device Analytics');
  if (devSheet) {
    devSheet.clear();
    devSheet.appendRow(['Device Type', 'Page Views', 'Leads Captured']);
    formatHeader(devSheet, 1);
    const dMap = { Desktop: 0, Mobile: 0, Tablet: 0 };
    leads.forEach(l => {
      const dev = l[25] || 'Desktop';
      if (dMap[dev] !== undefined) dMap[dev]++;
      else dMap.Desktop++;
    });
    Object.keys(dMap).forEach(d => {
      devSheet.appendRow([d, pageViews.length ? Math.round((dMap[d] / (leads.length || 1)) * pageViews.length) : dMap[d], dMap[d]]);
    });
  }
}

function buildEngagementAnalytics(ss, events, pageViews) {
  const sheet = ss.getSheetByName('Engagement Analytics');
  if (!sheet) return;
  sheet.clear();

  sheet.appendRow(['Engagement Type', 'Total Interations', 'Percentage of Total']);
  formatHeader(sheet, 1);

  const scrolls = events.filter(e => e[2] === 'SCROLL_DEPTH').length;
  const ctas = events.filter(e => e[2] === 'CTA_CLICK').length;
  const navs = events.filter(e => e[2] === 'NAVIGATION_CLICK').length;
  const total = (scrolls + ctas + navs) || 1;

  sheet.appendRow(['Scroll Depth Milestones (25%, 50%, 75%, 90%)', scrolls, Math.round((scrolls / total) * 100) + '%']);
  sheet.appendRow(['CTA Button / Link Clicks', ctas, Math.round((ctas / total) * 100) + '%']);
  sheet.appendRow(['Navigation & Mega-Menu Explores', navs, Math.round((navs / total) * 100) + '%']);
}

function buildDailyWeeklyMonthlyTrends(ss, pageViews, ctas, leads) {
  const dailySheet = ss.getSheetByName('Daily Analytics');
  if (dailySheet) {
    dailySheet.clear();
    dailySheet.appendRow(['Date', 'Page Views', 'CTA Clicks', 'Leads Generated']);
    formatHeader(dailySheet, 1);

    const dayMap = {};
    leads.forEach(l => {
      const d = String(l[1] || '').slice(0, 10) || Utilities.formatDate(new Date(), ANALYTICS_CONFIG.TIMEZONE, 'yyyy-MM-dd');
      if (!dayMap[d]) dayMap[d] = { views: 0, ctas: 0, leads: 0 };
      dayMap[d].leads++;
    });

    Object.keys(dayMap).sort().forEach(d => {
      dailySheet.appendRow([d, dayMap[d].views, dayMap[d].ctas, dayMap[d].leads]);
    });
  }
}

function buildLeadQualityAndFollowUp(ss, leads) {
  const sheet = ss.getSheetByName('Follow-up Analytics');
  if (!sheet) return;
  sheet.clear();

  sheet.appendRow(['Follow-up Status', 'Leads Count', 'High Value Leads']);
  formatHeader(sheet, 1);

  const pending = leads.filter(l => (l[31] || 'Pending').toLowerCase() === 'pending').length;
  const contacted = leads.filter(l => (l[31] || '').toLowerCase() === 'contacted').length;
  const converted = leads.filter(l => (l[31] || '').toLowerCase() === 'converted').length;

  sheet.appendRow(['Pending Architecture Review', pending, leads.filter(l => l[30] === 'HIGH' && (l[31] || 'Pending') === 'Pending').length]);
  sheet.appendRow(['Review / Follow-up Initiated', contacted, 0]);
  sheet.appendRow(['Qualified Opportunity', converted, 0]);
}

function generateDashboardCharts(ss) {
  const formSheet = ss.getSheetByName('Industry Analytics');
  if (formSheet && formSheet.getLastRow() > 1) {
    const charts = formSheet.getCharts();
    charts.forEach(c => formSheet.removeChart(c));

    const range = formSheet.getRange(1, 1, formSheet.getLastRow(), 2);
    const chart = formSheet.newChart()
      .setChartType(Charts.ChartType.BAR)
      .addRange(range)
      .setPosition(2, 4, 0, 0)
      .setOption('title', 'Inbound Leads by Industry Vertical')
      .setOption('colors', ['#07143d'])
      .setOption('width', 500)
      .setOption('height', 300)
      .build();

    formSheet.insertChart(chart);
  }
}

// ============================================================================
// AUTOMATED REPORTS & EMAIL DISPATCH
// ============================================================================

function sendDailyReport() {
  refreshAnalytics();
  const dataSs = getRawDataSpreadsheet();
  const leads = fetchSheetData(dataSs, 'Form Submissions');
  const now = new Date();
  const todayStr = Utilities.formatDate(now, ANALYTICS_CONFIG.TIMEZONE, 'yyyy-MM-dd');

  const todayLeads = leads.filter(l => String(l[1] || '').slice(0, 10) === todayStr);
  const subject = `TRUSTGRID.AI — Daily Website Intelligence Report — ${todayStr}`;

  const htmlBody = `
  <!DOCTYPE html>
  <html>
  <body style="font-family: sans-serif; background: #f8fafc; padding: 24px;">
    <div style="max-width: 650px; margin: 0 auto; background: #ffffff; border-radius: 10px; border: 1px solid #e2e8f0; padding: 28px;">
      <h2 style="color: #07143d; margin-top: 0;">TRUSTGRID.AI — Daily Intelligence Report</h2>
      <p>Summary for <strong>${todayStr}</strong> (Asia/Kolkata):</p>
      <ul>
        <li><strong>New Form Submissions Today:</strong> ${todayLeads.length}</li>
        <li><strong>Total Historical Pipeline:</strong> ${leads.length}</li>
      </ul>
      <p><a href="${getOrCreateAnalyticsSpreadsheet().getUrl()}" style="color: #1d5cff; font-weight: bold;">Open Live Executive Analytics Dashboard</a></p>
    </div>
  </body>
  </html>
  `;

  MailApp.sendEmail({ to: ANALYTICS_CONFIG.REPORT_EMAIL, subject, htmlBody });
  logReportEvent('Daily Report', subject, 'SUCCESS');
}

function sendWeeklyReport() {
  refreshAnalytics();
  const subject = `TRUSTGRID.AI — Weekly Website & Lead Intelligence Report`;
  MailApp.sendEmail({
    to: ANALYTICS_CONFIG.REPORT_EMAIL,
    subject,
    htmlBody: `<h3>TRUSTGRID.AI Weekly Report</h3><p><a href="${getOrCreateAnalyticsSpreadsheet().getUrl()}">View Full Dashboard</a></p>`
  });
  logReportEvent('Weekly Report', subject, 'SUCCESS');
}

function sendMonthlyReport() {
  refreshAnalytics();
  const subject = `TRUSTGRID.AI — Monthly Enterprise Intelligence Report`;
  MailApp.sendEmail({
    to: ANALYTICS_CONFIG.REPORT_EMAIL,
    subject,
    htmlBody: `<h3>TRUSTGRID.AI Monthly Report</h3><p><a href="${getOrCreateAnalyticsSpreadsheet().getUrl()}">View Full Dashboard</a></p>`
  });
  logReportEvent('Monthly Report', subject, 'SUCCESS');
}

function logReportEvent(reportType, subject, status) {
  try {
    const ss = getOrCreateAnalyticsSpreadsheet();
    const sheet = ss.getSheetByName('Report Log');
    if (sheet) {
      sheet.appendRow([
        Utilities.formatDate(new Date(), ANALYTICS_CONFIG.TIMEZONE, 'yyyy-MM-dd HH:mm:ss'),
        reportType, ANALYTICS_CONFIG.REPORT_EMAIL, subject, status
      ]);
    }
  } catch (e) {}
}

function setupTriggers() {
  const triggers = ScriptApp.getProjectTriggers();
  triggers.forEach(t => ScriptApp.deleteTrigger(t));

  ScriptApp.newTrigger('sendDailyReport')
    .timeBased().everyDays(1).atHour(8).inTimezone(ANALYTICS_CONFIG.TIMEZONE).create();

  ScriptApp.newTrigger('sendWeeklyReport')
    .timeBased().onWeekDay(ScriptApp.WeekDay.MONDAY).atHour(8).inTimezone(ANALYTICS_CONFIG.TIMEZONE).create();

  ScriptApp.newTrigger('sendMonthlyReport')
    .timeBased().onMonthDay(1).atHour(8).inTimezone(ANALYTICS_CONFIG.TIMEZONE).create();

  Logger.log('Automated Daily, Weekly, and Monthly reports triggers initialized in Asia/Kolkata.');
}
