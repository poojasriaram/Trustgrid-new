/**
 * =========================================================================================
 * TRUSTGRID.AI - STAGING & VERCEL ANALYTICS ENGINE (SHEET 2 - STAGING)
 * =========================================================================================
 * Analytics & Intelligence Processor for:
 * 1. Vercel Preview Deployments (*.vercel.app)
 * 2. Localhost Development (localhost:3000)
 * 3. QA Testing & Pre-Production Audits
 * 
 * ⚠️ Keeps test telemetry and staging data completely SEPARATED from production executive reports.
 * 
 * =========================================================================================
 * DEPLOYMENT INSTRUCTIONS:
 * 1. Open your Staging Google Sheet (e.g. "TRUSTGRID.AI - Staging & Vercel QA")
 * 2. Go to: Extensions > Apps Script
 * 3. Add a new script file named "StagingAnalytics.gs" or paste this into the editor.
 * 4. Run the function "BUILD_STAGING_DASHBOARDS" to generate all staging test dashboards.
 * 5. A custom menu "🧪 STAGING INTELLIGENCE" will appear in the Google Sheet top bar.
 * =========================================================================================
 */

var STAGING_COLORS = {
  headerBg: "#b45309",   // Warm amber header
  headerText: "#ffffff",
  rowEven: "#fffbeb",    // Light amber row
  rowOdd: "#ffffff",
  border: "#fde68a",
  cardBg: "#fef3c7",
  primaryText: "#1e293b",
  mutedText: "#64748b",
  blueAccent: "#2563eb",
  greenAccent: "#16a34a"
};

/**
 * Main function to build all staging intelligence dashboards
 */
function BUILD_STAGING_DASHBOARDS() {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var ui = null;
  try { ui = SpreadsheetApp.getUi(); } catch (e) {}

  // 1. Fetch data from staging tabs
  var leadsSheet = ss.getSheetByName("Staging_Contact_Leads") || ss.getSheetByName("Staging_Consultation_Bookings");
  var trafficSheet = ss.getSheetByName("Staging_Traffic_Events");

  var leadsData = (leadsSheet && leadsSheet.getLastRow() > 1) ? leadsSheet.getDataRange().getValues() : [];
  var trafficData = (trafficSheet && trafficSheet.getLastRow() > 1) ? trafficSheet.getDataRange().getValues() : [];

  // 2. Build Dashboard Tabs
  buildStagingMissionControl(ss, leadsData, trafficData);
  buildStagingLeadsReport(ss, leadsData);
  buildStagingTrafficReport(ss, trafficData);

  if (ui) {
    ui.alert("✅ Staging Dashboards Refreshed!\n\nProcessed " + (leadsData.length > 1 ? (leadsData.length - 1) : 0) + " test leads and " + (trafficData.length > 1 ? (trafficData.length - 1) : 0) + " test traffic events.");
  }
}

/**
 * Tab 1: Staging Mission Control (Executive overview of Vercel/Localhost tests)
 */
function buildStagingMissionControl(ss, leadsData, trafficData) {
  var tabName = "🧪 Staging Mission Control";
  var sheet = ss.getSheetByName(tabName) || ss.insertSheet(tabName, 0);
  sheet.clear();
  sheet.setTabColor("#f59e0b");

  var totalLeads = leadsData.length > 1 ? (leadsData.length - 1) : 0;
  var totalEvents = trafficData.length > 1 ? (trafficData.length - 1) : 0;

  // Title Banner
  sheet.getRange("B2:G2").merge();
  sheet.getRange("B2").setValue("TRUSTGRID.AI — STAGING & VERCEL QA INTELLIGENCE DASHBOARD");
  sheet.getRange("B2").setBackground(STAGING_COLORS.headerBg).setFontColor("#ffffff").setFontWeight("bold").setFontSize(13).setHorizontalAlignment("center");

  sheet.getRange("B3:G3").merge();
  sheet.getRange("B3").setValue("Environment: Vercel Preview (*.vercel.app) & Localhost (localhost:3000) • Last Refreshed: " + Utilities.formatDate(new Date(), "Asia/Kolkata", "yyyy-MM-dd HH:mm:ss 'IST'"));
  sheet.getRange("B3").setBackground("#fef3c7").setFontColor("#92400e").setFontSize(9.5).setHorizontalAlignment("center");

  // KPI Metric Cards
  var kpis = [
    ["Test Leads Captured", totalLeads, "#2563eb"],
    ["Test Traffic Events", totalEvents, "#16a34a"],
    ["Consultation Bookings", countConsultations(leadsData), "#7c3aed"],
    ["Unique Test Sessions", countUniqueSessions(trafficData), "#d97706"]
  ];

  for (var k = 0; k < kpis.length; k++) {
    var col = 2 + (k * 1.5) + (k % 2 === 0 ? 0 : 0.5); // Placement
    var startCol = 2 + (k * 1);
    // Card Box
    sheet.getRange(5, 2 + k, 1, 1).setValue(kpis[k][0]).setFontSize(9).setFontColor("#64748b").setBackground("#f8fafc");
    sheet.getRange(6, 2 + k, 1, 1).setValue(kpis[k][1]).setFontSize(18).setFontWeight("bold").setFontColor(kpis[k][2]).setBackground("#f8fafc").setHorizontalAlignment("center");
  }

  // Quick Action / Guidance
  sheet.getRange("B8:E8").merge();
  sheet.getRange("B8").setValue("ℹ️ This sheet records only Vercel preview & localhost activity. Production traffic (trustgrid.ai) remains strictly isolated.");
  sheet.getRange("B8").setFontSize(9).setFontColor("#64748b").setItalic(true);

  // Auto-resize
  sheet.setColumnWidth(1, 24);
  sheet.setColumnWidth(2, 180);
  sheet.setColumnWidth(3, 180);
  sheet.setColumnWidth(4, 180);
  sheet.setColumnWidth(5, 180);
}

/**
 * Tab 2: Staging Leads & Consultations Summary
 */
function buildStagingLeadsReport(ss, leadsData) {
  var tabName = "🧪 Staging Leads Summary";
  var sheet = ss.getSheetByName(tabName) || ss.insertSheet(tabName);
  sheet.clear();
  sheet.setTabColor("#d97706");

  var headers = ["Timestamp", "Submission ID", "Name", "Email", "Company", "Role", "Consultation Slot", "Meeting Type", "Source"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setBackground(STAGING_COLORS.headerBg).setFontColor("#ffffff").setFontWeight("bold").setFontSize(10);

  if (leadsData.length > 1) {
    var rows = [];
    for (var i = 1; i < leadsData.length; i++) {
      var r = leadsData[i];
      rows.push([
        r[0] || "", // Timestamp
        r[1] || "", // Submission ID
        r[2] || "", // Name
        r[3] || "", // Email
        r[5] || "", // Company
        r[6] || "", // Role
        r[12] || "", // Slot
        r[11] || "", // Meeting Type
        r[14] || ""  // Source
      ]);
    }
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);

    for (var j = 0; j < rows.length; j++) {
      var bg = (j % 2 === 0) ? "#fffbeb" : "#ffffff";
      sheet.getRange(2 + j, 1, 1, headers.length).setBackground(bg).setFontSize(9.5);
    }
  }

  sheet.setFrozenRows(1);
}

/**
 * Tab 3: Staging Traffic Events & Page Activity
 */
function buildStagingTrafficReport(ss, trafficData) {
  var tabName = "🧪 Staging Traffic Summary";
  var sheet = ss.getSheetByName(tabName) || ss.insertSheet(tabName);
  sheet.clear();
  sheet.setTabColor("#ca8a04");

  var headers = ["Timestamp", "Session ID", "Event", "Page URL", "Traffic Source", "Device", "Browser", "Dwell Time (s)"];
  sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
  sheet.getRange(1, 1, 1, headers.length).setBackground("#ca8a04").setFontColor("#ffffff").setFontWeight("bold").setFontSize(10);

  if (trafficData.length > 1) {
    var rows = [];
    var limit = Math.min(trafficData.length, 500); // Last 500 events
    for (var i = 1; i < limit; i++) {
      var r = trafficData[i];
      rows.push([
        r[0] || "", // Timestamp
        r[1] || "", // Session ID
        r[3] || "", // Event
        r[4] || "", // Page URL
        r[6] || "", // Source
        r[10] || "", // Device
        r[11] || "", // Browser
        r[13] || 0   // Dwell
      ]);
    }
    sheet.getRange(2, 1, rows.length, headers.length).setValues(rows);

    for (var j = 0; j < rows.length; j++) {
      var bg = (j % 2 === 0) ? "#fefce8" : "#ffffff";
      sheet.getRange(2 + j, 1, 1, headers.length).setBackground(bg).setFontSize(9);
    }
  }

  sheet.setFrozenRows(1);
}

/**
 * Helper: Count consultations
 */
function countConsultations(data) {
  if (!data || data.length < 2) return 0;
  var count = 0;
  for (var i = 1; i < data.length; i++) {
    var slot = String(data[i][12] || "");
    if (slot.trim().length > 0) count++;
  }
  return count;
}

/**
 * Helper: Count unique sessions
 */
function countUniqueSessions(data) {
  if (!data || data.length < 2) return 0;
  var sessions = {};
  for (var i = 1; i < data.length; i++) {
    var sess = String(data[i][1] || "");
    if (sess) sessions[sess] = true;
  }
  return Object.keys(sessions).length;
}

/**
 * Custom Menu Hook
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu('🧪 STAGING INTELLIGENCE')
    .addItem('🔄 Refresh Staging Analytics', 'BUILD_STAGING_DASHBOARDS')
    .addToUi();
}
