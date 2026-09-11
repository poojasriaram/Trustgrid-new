/**
 * ═════════════════════════════════════════════════════════════════════════════
 * TRUSTGRID.AI - ENTERPRISE ANALYTICS DASHBOARD ENGINE (SHEET 2)
 * ═════════════════════════════════════════════════════════════════════════════
 * This script runs entirely in your Analytics Spreadsheet (Sheet 2).
 * It reads raw multi-form & telemetry data from Sheet 1, purges localhost/dev
 * traffic, and mathematically builds 15 automated executive intelligence tabs.
 * ═════════════════════════════════════════════════════════════════════════════
 */

// 🔴 SHEET 1 ID (DATA COLLECTION SPREADSHEET WHERE WEBHOOK SAVES RAW DATA)
var DATA_SHEET_ID = "1cK4aA9usPB5lIWDlPEdV04zB_mOrHTLUYEys1p8gb80";

// 🔴 WEBSITE URL (For Automated QA Audits)
var SITE_BASE_URL = "https://www.trustgrid.ai";

// ── SaaS Dark / Slate Enterprise Theme ──────────────────────────────────────────
var C = {
    bg: "#f8fafc", // Main dashboard canvas background
    p: "#e2e8f0",  // Sub-panel borders
    r1: "#ffffff", // Table row odd
    r2: "#f1f5f9", // Table row even
    t: "#0f172a",  // Slate-900 primary dark text
    m: "#64748b",  // Slate-500 muted text
    w: "#ffffff",  // White text for dark headers
    pu: "#4f46e5", // Indigo accent (TrustGrid Primary)
    g: "#10b981",  // Emerald green (Conversions)
    o: "#f59e0b",  // Amber orange (Pipeline)
    c: "#0ea5e9",  // Sky blue (Telemetry)
    re: "#ef4444"  // Rose red (Hot Leads)
};

// ══════════════════════════════════════════════════════════════════════════════
// THE MASTER BUILDER (Orchestrator)
// ══════════════════════════════════════════════════════════════════════════════
function PULL_DATA_AND_BUILD_ALL_DASHBOARDS() {
    var ui = null;
    try { ui = SpreadsheetApp.getUi(); } catch (e) { }

    if (!DATA_SHEET_ID || DATA_SHEET_ID.includes("PASTE_YOUR")) {
        if (ui) ui.alert("❌ Error: Please paste your Sheet 1 ID at the top of the script in DATA_SHEET_ID!");
        return;
    }

    var db;
    try {
        db = SpreadsheetApp.openById(DATA_SHEET_ID);
    } catch (e) {
        if (ui) ui.alert("❌ Error: Could not open Sheet 1 (ID: " + DATA_SHEET_ID + ").\n\nEnsure the Sheet ID is correct and you have Editor permissions.\nDetails: " + e.toString());
        return;
    }

    // Pulling Raw Ingestion Data from Sheet 1
    var tSheet = db.getSheetByName("traffic_analytics") || db.getSheetByName("TrafficAnalytics");
    var eSheet = db.getSheetByName("engagement_metrics") || db.getSheetByName("EngagementMetrics");
    var ubSheet = db.getSheetByName("user_behavior_library") || db.getSheetByName("UserBehaviorLibrary");

    var tDataRaw = (tSheet && tSheet.getLastRow() > 0) ? tSheet.getDataRange().getValues() : [];
    var eDataRaw = (eSheet && eSheet.getLastRow() > 0) ? eSheet.getDataRange().getValues() : [];
    var ubDataRaw = (ubSheet && ubSheet.getLastRow() > 0) ? ubSheet.getDataRange().getValues() : [];

    // ── LOCALHOST & DEV SANITIZATION ENGINE ──
    var tData = filterLocalhostData(tDataRaw);
    var ubData = filterLocalhostData(ubDataRaw);

    var validSessions = new Set();
    if (tData.length > 1) {
      var sIdx = tData[0].indexOf("Session ID");
      if (sIdx > -1) {
        for (var i = 1; i < tData.length; i++) { if(tData[i][sIdx]) validSessions.add(tData[i][sIdx]); }
      }
    }
    var eData = eDataRaw.filter(function(row, idx) {
      if (idx === 0) return true;
      var eSessIdx = eDataRaw[0] ? eDataRaw[0].indexOf("Session ID") : -1;
      if (eSessIdx === -1) return true;
      return validSessions.has(row[eSessIdx]);
    });

    var devRecordsPurged = (tDataRaw.length - tData.length) + (ubDataRaw.length - ubData.length);
    // ─────────────────────────────────────────

    // Build all 15 Intelligence Tabs
    try { buildMissionControlCenter(tData, eData, ubData, db, devRecordsPurged); } catch (err) { console.error("Tab 1 Error: " + err.toString()); }
    try { buildExecutiveDashboard(tData, eData); } catch (err) { console.error("Tab 2 Error: " + err.toString()); }
    try { buildGeoMapProfile(tData); } catch (err) { console.error("Tab 3 Error: " + err.toString()); }
    try { buildTrafficAndPagesPareto(tData); } catch (err) { console.error("Tab 4 Error: " + err.toString()); }
    try { buildHeatmapSheet(tData); } catch (err) { console.error("Tab 5 Error: " + err.toString()); }
    try { buildGrowthGraphSheet(tData); } catch (err) { console.error("Tab 6 Error: " + err.toString()); }
    try { buildRepeatVisitorRatioSheet(tData); } catch (err) { console.error("Tab 7 Error: " + err.toString()); }
    try { buildTechProfile(ubData); } catch (err) { console.error("Tab 8 Error: " + err.toString()); }
    try { buildIdentityLinkerSheet(ubData, db); } catch (err) { console.error("Tab 9 Error: " + err.toString()); }
    try { buildStdDevSheet(eData); } catch (err) { console.error("Tab 10 Error: " + err.toString()); }
    try { buildSankeySheet(tData); } catch (err) { console.error("Tab 11 Error: " + err.toString()); }
    try { buildBrokenLinkSheet(); } catch (err) { console.error("Tab 12 Error: " + err.toString()); }
    try { buildCoOccurrenceMatrix(tData, eData); } catch (err) { console.error("Tab 13 Error: " + err.toString()); }
    try { buildFunnelDropOffSheet(tData, db); } catch (err) { console.error("Tab 14 Error: " + err.toString()); }
    try { buildLeadScoringEngine(tData, eData); } catch (err) { console.error("Tab 15 Error: " + err.toString()); }

    if (ui) ui.alert("✅ SUCCESS! 15 TrustGrid Analytics Tabs Built & Sanitized.\n\n" + devRecordsPurged + " localhost development records were purged.");
}

function filterLocalhostData(data) {
    if (!data || data.length < 2) return data || [];
    var headers = data[0];
    var ipCol = headers.indexOf("IP Address");
    if (ipCol === -1) ipCol = headers.indexOf("ipAddress");
    if (ipCol === -1) return data;

    var filtered = [headers];
    for (var i = 1; i < data.length; i++) {
        var ip = String(data[i][ipCol]);
        if (ip !== "127.0.0.1" && ip !== "::1" && !ip.toLowerCase().includes("localhost")) {
            filtered.push(data[i]);
        }
    }
    return filtered;
}

function getOrCreateTab(name) {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    if (!ss) return null;
    var sh = ss.getSheetByName(name);
    if (sh) {
        try {
            sh.clearContents();
            sh.clearFormats();
            var charts = sh.getCharts();
            for (var i = 0; i < charts.length; i++) sh.removeChart(charts[i]);
        } catch (e) {}
    } else {
        sh = ss.insertSheet(name);
    }
    ss.setActiveSheet(sh);
    return sh;
}

function styleTitle(sh, text, c_span, bg) {
    if (!sh) return;
    sh.getRange(1, 1, 1, Math.max(c_span, 1)).merge().setValue(text).setBackground(bg).setFontColor(C.w).setFontWeight("bold").setFontSize(16).setHorizontalAlignment("center").setVerticalAlignment("middle");
    sh.setRowHeight(1, 55);
    sh.setFrozenRows(2);
    sh.getRange("A2").setValue("TRUSTGRID ENTERPRISE AI • Last Refreshed: " + new Date().toLocaleString()).setBackground(C.bg).setFontColor(C.m).setFontSize(10).setFontStyle("italic");
}

function setColWidths(sh, startCol, widths) {
    if (!sh || !widths || !widths.length) return;
    for (var i = 0; i < widths.length; i++) sh.setColumnWidth(startCol + i, widths[i]);
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 1: MISSION CONTROL
// ══════════════════════════════════════════════════════════════════════════════
function buildMissionControlCenter(tData, eData, ubData, db, devRecordsPurged) {
    var sh = getOrCreateTab("🛰️ Mission Control");
    styleTitle(sh, "🛰️ TRUSTGRID.AI — CENTRAL COMMAND & MISSION CONTROL", 12, C.t);
    sh.getRange("A1:Z100").setBackground(C.bg);
    setColWidths(sh, 1, [20, 200, 200, 200, 200, 200, 20].concat(new Array(10).fill(100)));

    if (!tData || tData.length < 2) {
        sh.getRange(4, 2).setValue("Waiting for live traffic telemetry in Sheet 1...").setFontColor(C.m);
        return;
    }

    var tHead = tData[0], ipCol = tHead.indexOf("IP Address"), sCol = tHead.indexOf("Traffic Source");
    var eDurCol = (eData && eData.length > 0) ? eData[0].indexOf("Duration (sec)") : -1;
    var ubHotCol = (ubData && ubData.length > 0) ? ubData[0].indexOf("Hot Lead Flag") : -1;

    var totalVisits = tData.length - 1;
    var ipCounts = {}, sources = {};
    for (var i = 1; i < tData.length; i++) {
        var ip = tData[i][ipCol], s = tData[i][sCol] || "Direct";
        if (ip) ipCounts[ip] = (ipCounts[ip] || 0) + 1;
        sources[s] = (sources[s] || 0) + 1;
    }

    var uniqueUsers = Object.keys(ipCounts).length;
    var returnUsers = Object.keys(ipCounts).filter(function (k) { return ipCounts[k] > 1; }).length;

    var totalSecs = 0, timedSessions = 0;
    if (eDurCol > -1) {
        for (var i = 1; i < eData.length; i++) {
            var d = Number(eData[i][eDurCol]) || 0;
            if (d > 0) { totalSecs += d; timedSessions++; }
        }
    }
    var avgSecs = timedSessions > 0 ? Math.round(totalSecs / timedSessions) : 0;

    var hotLeads = 0;
    if (ubHotCol > -1) {
        for (var i = 1; i < ubData.length; i++) {
            if (String(ubData[i][ubHotCol]).toUpperCase() === "YES" || String(ubData[i][ubHotCol]).toUpperCase() === "TRUE") hotLeads++;
        }
    }

    var drawMegaStat = function (row, col, title, value, span, color, textcolor) {
        sh.getRange(row, col, 1, span).merge().setValue(title.toUpperCase()).setBackground(C.t).setFontColor(C.w).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setFontSize(10);
        sh.getRange(row + 1, col, 2, span).merge().setValue(value).setBackground(color).setFontColor(textcolor || C.w).setFontWeight("bold").setHorizontalAlignment("center").setVerticalAlignment("middle").setFontSize(26);
    };

    drawMegaStat(4, 2, "🌐 GLOBAL TRAFFIC", totalVisits.toLocaleString(), 1, C.pu);
    drawMegaStat(4, 3, "👤 UNIQUE TARGETS", uniqueUsers.toLocaleString(), 1, C.c);
    drawMegaStat(4, 4, "⏱ AVG ENGAGEMENT", avgSecs + "s", 1, C.g);
    drawMegaStat(4, 5, "🔄 LOYALTY SURGE", returnUsers.toLocaleString(), 1, C.o);
    drawMegaStat(4, 6, "🔥 HOT LEADS DETECTED", hotLeads, 1, C.re, C.w);

    sh.getRange(8, 2, 1, 5).merge().setValue("ENTERPRISE VITALS & ACQUISITION RADAR").setBackground(C.p).setFontColor(C.t).setFontWeight("bold").setHorizontalAlignment("center");

    var retentionPct = uniqueUsers > 0 ? Math.round(returnUsers / uniqueUsers * 100) : 0;
    sh.getRange(9, 2).setValue("Retention %").setFontColor(C.bg);
    sh.getRange(10, 2).setValue(retentionPct).setFontColor(C.bg); 
    try {
        var gauge1 = sh.newChart().setChartType(Charts.ChartType.GAUGE).addRange(sh.getRange(9, 2, 2, 1))
            .setPosition(9, 2, 0, 0).setOption("title", "Retention %").setOption("width", 200).setOption("height", 200)
            .setOption("greenFrom", 30).setOption("greenTo", 100).setOption("redFrom", 0).setOption("redTo", 15).build();
        sh.insertChart(gauge1);
    } catch(e) {}

    sh.getRange(9, 3).setValue("Avg Secs").setFontColor(C.bg);
    sh.getRange(10, 3).setValue(avgSecs).setFontColor(C.bg);
    try {
        var gauge2 = sh.newChart().setChartType(Charts.ChartType.GAUGE).addRange(sh.getRange(9, 3, 2, 1))
            .setPosition(9, 3, 0, 0).setOption("title", "Avg Secs").setOption("width", 200).setOption("height", 200)
            .setOption("max", 200).setOption("greenFrom", 60).setOption("greenTo", 200).setOption("yellowFrom", 30).setOption("yellowTo", 60).build();
        sh.insertChart(gauge2);
    } catch(e) {}

    var srcRows = Object.keys(sources).map(function (k) { return [k, sources[k]]; }).sort(function (a, b) { return b[1] - a[1] });
    if (srcRows.length > 0) {
        sh.getRange(25, 2, srcRows.length, 2).setValues(srcRows).setFontColor(C.bg);
        try {
            var pie = sh.newChart().setChartType(Charts.ChartType.PIE).addRange(sh.getRange(25, 2, srcRows.length, 2))
                .setPosition(9, 4, 0, 0).setOption("title", "Acquisition Radar").setOption("pieHole", 0.5)
                .setOption("backgroundColor", C.bg).setOption("width", 400).setOption("height", 300).build();
            sh.insertChart(pie);
        } catch(e) {}
    }

    sh.getRange(21, 2, 1, 5).merge().setValue("TRUSTGRID SYSTEM TERMINAL FEED").setBackground(C.t).setFontColor(C.g).setFontWeight("bold").setFontFamily("Courier New");
    sh.getRange(22, 2, 5, 5).merge().setBackground("#000000").setFontColor("#00ff00").setFontFamily("Courier New").setVerticalAlignment("top").setWrap(true)
        .setValue("> TRUSTGRID AI DATA LINK ONLINE... \n> " + totalVisits + " TELEMETRY LOGS COMPILED... \n> DEV SANITIZATION: " + (devRecordsPurged || 0) + " LOCALHOST RECORDS PURGED... \n> AI LEAD ENGINE ACTIVE... \n> READY FOR EXECUTIVE QUERY.");
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 2: EXECUTIVE DASHBOARD
// ══════════════════════════════════════════════════════════════════════════════
function buildExecutiveDashboard(tData, eData) {
    var sh = getOrCreateTab("🚦 Executive KPIs");
    styleTitle(sh, "🚦 TrustGrid Executive Dashboard & Core Performance Metrics", 10, C.pu);
    setColWidths(sh, 1, [250, 100, 100, 40, 600, 40, 250, 100, 100, 40, 600]);

    if (!tData || tData.length < 2) return;

    var tHeaders = tData[0], eHeaders = (eData && eData.length > 0) ? eData[0] : [];
    var pathCol = tHeaders.indexOf("Page Path"), ipCol = tHeaders.indexOf("IP Address"), locCol = tHeaders.indexOf("IP Location");
    var urlCol = eHeaders.indexOf("Page URL"), durCol = eHeaders.indexOf("Duration (sec)");

    var pageCounts = {}, ipByPage = {};
    for (var i = 1; i < tData.length; i++) {
        var p = tData[i][pathCol], ip = tData[i][ipCol];
        if (!p || p === "/") continue;
        pageCounts[p] = (pageCounts[p] || 0) + 1;
        if (!ipByPage[p]) ipByPage[p] = new Set();
        if (ip) ipByPage[p].add(ip);
    }
    var topPages = Object.keys(pageCounts).map(function (k) { return [k, pageCounts[k], ipByPage[k].size] }).sort(function (a, b) { return b[1] - a[1] });

    var timeByPage = {};
    if (urlCol > -1 && durCol > -1) {
        for (var i = 1; i < eData.length; i++) {
            var u = eData[i][urlCol], d = Number(eData[i][durCol]) || 0;
            if (!u || d <= 0) continue;
            if (!timeByPage[u]) timeByPage[u] = { sum: 0, count: 0, max: 0 };
            timeByPage[u].sum += d; timeByPage[u].count++;
            if (d > timeByPage[u].max) timeByPage[u].max = d;
        }
    }
    var timeArr = Object.keys(timeByPage).map(function (k) { return [k, (timeByPage[k].sum / timeByPage[k].count).toFixed(1), timeByPage[k].max] }).sort(function (a, b) { return b[1] - a[1] });

    var ipCounts = {}, ipLocs = {};
    for (var i = 1; i < tData.length; i++) {
        var ip = tData[i][ipCol], loc = tData[i][locCol];
        if (!ip) continue;
        ipCounts[ip] = (ipCounts[ip] || 0) + 1;
        if (loc) ipLocs[ip] = loc;
    }
    var topIPs = Object.keys(ipCounts).map(function (k) { return [k, ipLocs[k] || "Unknown", ipCounts[k]] }).filter(function (x) { return x[2] > 1 }).sort(function (a, b) { return b[2] - a[2] });

    var drawTable = function (startRow, themeColor, icon, title, headers, rowData) {
        sh.getRange(startRow, 1, 1, headers.length).merge().setValue(icon + " " + title).setBackground(themeColor).setFontColor(C.w).setFontWeight("bold");
        sh.getRange(startRow + 1, 1, 1, headers.length).setValues([headers]).setBackground(C.p).setFontColor(C.t).setFontWeight("bold");
        if (rowData.length > 0) {
            sh.getRange(startRow + 2, 1, rowData.length, headers.length).setValues(rowData).setBackground(C.r1).setFontColor(C.t);
            for (var r = 0; r < rowData.length; r++) { if (r % 2 !== 0) sh.getRange(startRow + 2 + r, 1, 1, headers.length).setBackground(C.r2); }
        }
    };

    var r1 = 4, r2 = 20, r3 = 36;
    drawTable(r1, C.pu, "🏆", "Q1: Top Solutions & Pages (excl. Home)", ["Page / Solution", "Visits", "Unique IPs"], topPages.slice(0, 5));
    drawTable(r2, "#6366f1", "⏱", "Q2: Top Pages by Dwell Time", ["Page", "Avg Sec", "Max Sec"], timeArr.slice(0, 5));
    drawTable(r3, C.c, "🔄", "Q3: Top Enterprise Repeat Visitors", ["IP Address", "Location", "Total Visits"], topIPs.slice(0, 5));
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 3: GEO MAP PROFILE
// ══════════════════════════════════════════════════════════════════════════════
function buildGeoMapProfile(tData) {
    var sh = getOrCreateTab("🗺️ Geo Map");
    styleTitle(sh, "🗺️ Geographic Map Intensity & Global Traffic Profile", 8, C.c);
    setColWidths(sh, 1, [150, 100, 100, 150, 200, 100, 150]);
    if (!tData || tData.length < 2) return;
    var hd = tData[0], locCol = hd.indexOf("IP Location");
    var countryDist = {}; 
    for (var i = 1; i < tData.length; i++) {
        var loc = tData[i][locCol] || "Unknown";
        var country = loc.split(",").pop().trim();
        if (country) countryDist[country] = (countryDist[country] || 0) + 1;
    }
    var cArr = Object.keys(countryDist).map(function (k) { return [k, countryDist[k]] }).sort(function (a, b) { return b[1] - a[1] });
    sh.getRange(4, 1, 1, 2).setValues([["Country", "Traffic"]]).setBackground(C.c).setFontColor(C.w).setFontWeight("bold");
    if (cArr.length > 0) {
        sh.getRange(5, 1, cArr.length, 2).setValues(cArr);
        try {
            var chart = sh.newChart().setChartType(Charts.ChartType.GEO).addRange(sh.getRange(4, 1, cArr.length+1, 2)).setPosition(4, 7, 0, 0).setOption("width", 500).build();
            sh.insertChart(chart);
        } catch(e) {}
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 4: PARETO 80-20
// ══════════════════════════════════════════════════════════════════════════════
function buildTrafficAndPagesPareto(tData) {
    var sh = getOrCreateTab("📏 Pareto (80-20)");
    styleTitle(sh, "📏 80/20 Pareto Analysis — Solution Concentration", 9, C.re);
    setColWidths(sh, 1, [200, 100, 100, 120, 50, 180, 100, 100, 120]);
    if (!tData || tData.length < 2) return;
    var hd = tData[0], pCol = hd.indexOf("Page Path");
    var pcs = {};
    for (var i = 1; i < tData.length; i++) {
        var p = tData[i][pCol];
        if (p) pcs[p] = (pcs[p] || 0) + 1;
    }
    var pArr = Object.keys(pcs).map(function (k) { return [k, pcs[k]] }).sort(function (a, b) { return b[1] - a[1] });
    var pTot = pArr.reduce(function (a, b) { return a + b[1] }, 0), pCum = 0;
    var rows = pArr.map(function(r) { pCum += r[1]; return [r[0], r[1], (r[1]/pTot*100).toFixed(1)+"%", (pCum/pTot*100).toFixed(1)+"%"]; });
    sh.getRange(4, 1, 1, 4).setValues([["Top Pages", "Visits", "Share", "Cumulative"]]).setBackground(C.re).setFontColor(C.w);
    if (rows.length > 0) sh.getRange(5, 1, rows.length, 4).setValues(rows);
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 5: HEATMAP SHEET
// ══════════════════════════════════════════════════════════════════════════════
function buildHeatmapSheet(tData) {
    var sh = getOrCreateTab("🕒 Daily Heatmap");
    styleTitle(sh, "🕒 Traffic Heatmaps & Multi-Year Engagement Calendar", 55, C.g);
    if (!tData || tData.length < 2) return;
    var tsCol = tData[0].indexOf("Timestamp");
    var mx = []; for (var d = 0; d < 7; d++) mx[d] = new Array(24).fill(0);
    for (var i = 1; i < tData.length; i++) {
        var ts = tData[i][tsCol]; if (!ts) continue;
        var dt = new Date(typeof ts === "string" ? ts.replace(" IST", "") : ts);
        if (isNaN(dt.getTime())) continue;
        mx[dt.getDay()][dt.getHours()]++;
    }
    var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    for (var d = 0; d < 7; d++) {
        sh.getRange(5 + d, 1).setValue(days[d]).setBackground(C.p).setFontWeight("bold");
        for (var h = 0; h < 24; h++) {
            sh.getRange(5+d, h+2).setValue(mx[d][h] || "").setHorizontalAlignment("center");
        }
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 6: GROWTH GRAPH
// ══════════════════════════════════════════════════════════════════════════════
function buildGrowthGraphSheet(tData) {
    var sh = getOrCreateTab("📈 Growth & Momentum");
    styleTitle(sh, "📈 Traffic Growth Trajectory & Day-over-Day Momentum", 7, C.pu);
    if (!tData || tData.length < 2) return;
    var tsCol = tData[0].indexOf("Timestamp");
    var daily = {};
    for (var i = 1; i < tData.length; i++) {
        var ts = tData[i][tsCol]; if (!ts) continue;
        var key = Utilities.formatDate(new Date(ts), "Asia/Kolkata", "yyyy-MM-dd");
        daily[key] = (daily[key] || 0) + 1;
    }
    var dates = Object.keys(daily).sort(), cum = 0;
    var rows = dates.map(function(d, i) { 
        cum += daily[d]; 
        var prev = i > 0 ? daily[dates[i-1]] : daily[d];
        var mom = prev > 0 ? ((daily[d]-prev)/prev*100).toFixed(1) + "%" : "0%";
        return [d, daily[d], cum, mom]; 
    });
    sh.getRange(3, 1, 1, 4).setValues([["Date", "Sessions", "Cumulative", "Momentum"]]).setBackground(C.pu).setFontColor(C.w);
    if (rows.length > 0) sh.getRange(4, 1, rows.length, 4).setValues(rows);
    if (rows.length > 0) {
        try {
            var chart = sh.newChart().setChartType(Charts.ChartType.LINE).addRange(sh.getRange(3, 1, rows.length+1, 2)).addRange(sh.getRange(3, 3, rows.length+1, 1)).setPosition(3, 7, 0, 0).setOption("width", 600).build();
            sh.insertChart(chart);
        } catch(e) {}
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 7: REPEAT VISITOR RATIO
// ══════════════════════════════════════════════════════════════════════════════
function buildRepeatVisitorRatioSheet(tData) {
    var sh = getOrCreateTab("👥 Visitor Ratio");
    styleTitle(sh, "👥 User Acquisition vs. Retention Donut", 6, C.c);
    if (!tData || tData.length < 2) return;
    var ipCol = tData[0].indexOf("IP Address"), ipCounts = {};
    for (var i = 1; i < tData.length; i++) if (tData[i][ipCol]) ipCounts[tData[i][ipCol]] = (ipCounts[tData[i][ipCol]] || 0) + 1;
    var nv = 0, rv = 0; Object.keys(ipCounts).forEach(function(ip) { if (ipCounts[ip] === 1) nv++; else rv++; });
    var rows = [["New Visitors", nv], ["Repeat Visitors", rv]];
    sh.getRange(4, 1, 2, 2).setValues(rows).setBackground(C.r1);
    try {
        sh.insertChart(sh.newChart().setChartType(Charts.ChartType.PIE).addRange(sh.getRange(4,1,2,2)).setPosition(4, 4, 0, 0).setOption("pieHole", 0.6).build());
    } catch(e) {}
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 8: TECH PROFILE
// ══════════════════════════════════════════════════════════════════════════════
function buildTechProfile(ubData) {
    var sh = getOrCreateTab("📱 Tech Profile");
    styleTitle(sh, "📱 Technical Footprint & Devices", 8, C.o);
    if (!ubData || ubData.length < 2) return;
    var hd = ubData[0], osC = hd.indexOf("OS"), vwC = hd.indexOf("Device");
    var os = {}, vw = {};
    for (var i = 1; i < ubData.length; i++) {
        if (osC > -1 && ubData[i][osC]) os[ubData[i][osC]] = (os[ubData[i][osC]] || 0) + 1;
        if (vwC > -1 && ubData[i][vwC]) vw[ubData[i][vwC]] = (vw[ubData[i][vwC]] || 0) + 1;
    }
    var osArr = Object.keys(os).map(function(k) { return [k, os[k]] }).sort(function(a,b){return b[1]-a[1]});
    sh.getRange(4, 1, 1, 2).setValues([["Operating System", "Hits"]]).setBackground(C.o).setFontColor(C.w);
    if (osArr.length > 0) sh.getRange(5, 1, osArr.length, 2).setValues(osArr);
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 9: IDENTITY LINKER
// ══════════════════════════════════════════════════════════════════════════════
function buildIdentityLinkerSheet(ubData, db) {
    var sh = getOrCreateTab("🔗 Identity Linker");
    styleTitle(sh, "🔗 Unmasking Anonymous Traffic & Matching Inquiries", 8, C.re);
    if (!ubData || ubData.length < 2) return;
    var vidCol = ubData[0].indexOf("Visitor ID");
    var idents = {};
    ["contact_submissions", "ai_diagnostics", "proposal_requests", "architect_consultations", "partner_applications", "ContactForm", "AIDiagnostic", "ProposalRequests", "ArchitectConsultations", "PartnerApps"].forEach(function (tab) {
        var s = db.getSheetByName(tab); if (!s) return;
        var d = s.getDataRange().getValues(), vC = d[0].indexOf("Visitor ID"), eC = d[0].indexOf("Email"), nC = d[0].indexOf("Name");
        if (vC > -1 && eC > -1) {
            for (var i = 1; i < d.length; i++) if (d[i][vC] && d[i][eC]) idents[d[i][vC]] = { n: d[i][nC] || "Enterprise User", e: d[i][eC], t: tab };
        }
    });
    var results = []; for (var i = 1; i < ubData.length; i++) {
        var v = ubData[i][vidCol]; if (v && idents[v]) results.push([v, idents[v].n, idents[v].e, idents[v].t]);
    }
    sh.getRange(3, 1, 1, 4).setValues([["Visitor ID", "Lead Name", "Email", "Conversion Form"]]).setBackground(C.pu).setFontColor(C.w);
    if (results.length > 0) sh.getRange(4, 1, results.length, 4).setValues(results).setBackground(C.r1);
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 10: STD DEV SHEET
// ══════════════════════════════════════════════════════════════════════════════
function buildStdDevSheet(eData) {
    var sh = getOrCreateTab("📊 Std Deviation");
    styleTitle(sh, "📊 Engagement Stat Volatility & Variance", 6, C.pu);
    if (!eData || eData.length < 2) return;
    var sCol = eData[0].indexOf("Engagement Score");
    var sc = []; for (var i = 1; i < eData.length; i++) if (eData[i][sCol]) sc.push(Number(eData[i][sCol]));
    if (sc.length === 0) return;
    var mean = sc.reduce(function(a,b){return a+b},0)/sc.length;
    var std = Math.sqrt(sc.reduce(function(a,b){return a+Math.pow(b-mean,2)},0)/sc.length);
    sh.getRange(4, 1, 2, 2).setValues([["Mean Engagement Score", mean.toFixed(1)], ["Score Volatility (Std Dev)", std.toFixed(1)]]).setBackground(C.r1);
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 11: SANKEY PATHS
// ══════════════════════════════════════════════════════════════════════════════
function buildSankeySheet(tData) {
    var sh = getOrCreateTab("🌊 Sankey Flow");
    styleTitle(sh, "🌊 Top User Navigation Journey Paths", 6, C.c);
    if (!tData || tData.length < 2) return;
    var sidC = tData[0].indexOf("Session ID"), pC = tData[0].indexOf("Page Path"), tsC = tData[0].indexOf("Timestamp");
    var sesh = {}; for (var i = 1; i < tData.length; i++) {
        var sid = tData[i][sidC]; if (sid) { if (!sesh[sid]) sesh[sid] = []; sesh[sid].push({ p: tData[i][pC] || "/", ts: tData[i][tsC] }); }
    }
    var flows = {}; Object.keys(sesh).forEach(function(s) {
        var p = sesh[s].sort(function(a,b){return new Date(a.ts)-new Date(b.ts)});
        for (var j=0; j<p.length-1; j++) { if(p[j].p !== p[j+1].p) { var f = p[j].p + " → " + p[j+1].p; flows[f] = (flows[f]||0)+1; } }
    });
    var arr = Object.keys(flows).map(function(k){return [k, flows[k]]}).sort(function(a,b){return b[1]-a[1]}).slice(0, 15);
    sh.getRange(4, 1, 1, 2).setValues([["Navigation Transition Flow", "Flow Count"]]).setBackground(C.c).setFontColor(C.w);
    if (arr.length > 0) sh.getRange(5, 1, arr.length, 2).setValues(arr).setBackground(C.r1);
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 12: BROKEN LINK QA
// ══════════════════════════════════════════════════════════════════════════════
function buildBrokenLinkSheet() {
    var sh = getOrCreateTab("🤖 Broken Link QA");
    styleTitle(sh, "🤖 Automated Endpoint Audit for TrustGrid.AI", 5, C.re);
    var paths = ["/", "/about", "/solutions", "/book-ai-diagnostic", "/request-proposal", "/talk-to-ai-architect", "/careers", "/contact"];
    sh.getRange(3, 1, 1, 3).setValues([["URL Endpoint", "Status", "Latency"]]).setBackground(C.re).setFontColor(C.w);
    paths.forEach(function(p, i) {
        var url = SITE_BASE_URL + p, st = "🔴 Failed", t = 0;
        try { 
            var start = Date.now(); 
            var res = UrlFetchApp.fetch(url, {muteHttpExceptions:true}); 
            st = res.getResponseCode() === 200 ? "✅ OK (200)" : res.getResponseCode(); 
            t = Date.now()-start; 
        } catch(e) {
            st = "🔴 Failed: " + e.toString();
        }
        sh.getRange(4+i, 1, 1, 3).setValues([[url, st, t+"ms"]]).setBackground(C.r1);
    });
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 13: CO-OCCURRENCE MATRIX
// ══════════════════════════════════════════════════════════════════════════════
function buildCoOccurrenceMatrix(tData, eData) {
    var sh = getOrCreateTab("🔀 Co-Occurrence");
    styleTitle(sh, "🔀 Solution & Page Interconnectivity Matrix", 15, C.pu);
    if (!tData || tData.length < 2) return;
    var tHead = tData[0], sCol = tHead.indexOf("Session ID"), pCol = tHead.indexOf("Page Path");
    
    var sessionPages = {}; var pageCounts = {};
    for (var i = 1; i < tData.length; i++) { 
        var s = tData[i][sCol], p = tData[i][pCol]; if (!s || !p) continue;
        if (!sessionPages[s]) sessionPages[s] = new Set(); sessionPages[s].add(p);
    }
    Object.keys(sessionPages).forEach(function (s) { sessionPages[s].forEach(function (p) { pageCounts[p] = (pageCounts[p] || 0) + 1; }); });
    var topPages = Object.keys(pageCounts).sort(function (a, b) { return pageCounts[b] - pageCounts[a] }).slice(0, 10);
    if (topPages.length === 0) return;

    var matrixCount = {};
    topPages.forEach(function (p1) { matrixCount[p1] = {}; topPages.forEach(function (p2) { matrixCount[p1][p2] = 0; }); });
    Object.keys(sessionPages).forEach(function (sid) {
        var pgs = Array.from(sessionPages[sid]);
        for (var i = 0; i < pgs.length; i++) {
            if (!matrixCount[pgs[i]]) continue;
            for (var j = 0; j < pgs.length; j++) { if (matrixCount[pgs[i]][pgs[j]] !== undefined) matrixCount[pgs[i]][pgs[j]]++; }
        }
    });

    sh.getRange(4, 2, 1, topPages.length).setValues([topPages]).setBackground(C.p).setFontWeight("bold");
    for (var r = 0; r < topPages.length; r++) {
        sh.getRange(5 + r, 1).setValue(topPages[r]).setBackground(C.p).setFontWeight("bold");
        for (var c = 0; c < topPages.length; c++) {
            var count = matrixCount[topPages[r]][topPages[c]];
            sh.getRange(5 + r, 2 + c).setValue(count || "-").setHorizontalAlignment("center");
        }
    }
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 14: FUNNEL DROP-OFF
// ══════════════════════════════════════════════════════════════════════════════
function buildFunnelDropOffSheet(tData, db) {
    var sh = getOrCreateTab("🔻 Funnel Drops");
    styleTitle(sh, "🔻 Multi-Stage Conversion Funnel (Intent to Diagnostic)", 6, C.o);
    if (!tData || tData.length < 2) return;
    var uV = new Set(), sV = new Set(), cV = new Set();
    var pCol = tData[0].indexOf("Page Path"), ipCol = tData[0].indexOf("IP Address");
    for (var i = 1; i < tData.length; i++) {
        var ip = tData[i][ipCol], p = (tData[i][pCol] || "").toLowerCase(); if (!ip) continue;
        uV.add(ip);
        if (p.includes("solutions") || p.includes("use-cases")) sV.add(ip);
        if (p.includes("diagnostic") || p.includes("proposal") || p.includes("architect") || p.includes("contact")) cV.add(ip);
    }
    var rows = [["1. Total Global Visitors", uV.size], ["2. High Solution Intent", sV.size], ["3. Diagnostic / RFP Form Hit", cV.size]];
    sh.getRange(4, 1, 3, 2).setValues(rows).setBackground(C.r1);
    try {
        sh.insertChart(sh.newChart().setChartType(Charts.ChartType.BAR).addRange(sh.getRange(4,1,3,2)).setPosition(4, 4, 0, 0).build());
    } catch(e) {}
}

// ══════════════════════════════════════════════════════════════════════════════
// TAB 15: LEAD SCORING ENGINE
// ══════════════════════════════════════════════════════════════════════════════
function buildLeadScoringEngine(tData, eData) {
    var sh = getOrCreateTab("🎯 Lead Scoring");
    styleTitle(sh, "🎯 AI-Driven Predictive Lead Intent & Heat Engine", 8, C.re);
    if (!tData || tData.length < 2) return;

    var ipCol = tData[0].indexOf("IP Address"), pCol = tData[0].indexOf("Page Path"), sCol = tData[0].indexOf("Session ID");
    var eSess = (eData && eData.length > 0) ? eData[0].indexOf("Session ID") : -1;
    var eDur = (eData && eData.length > 0) ? eData[0].indexOf("Duration (sec)") : -1;

    var tTime = {};
    if (eSess > -1 && eDur > -1) {
        for (var i = 1; i < eData.length; i++) {
            var sessId = eData[i][eSess];
            var durVal = Number(eData[i][eDur]) || 0;
            if (sessId) tTime[sessId] = (tTime[sessId] || 0) + durVal;
        }
    }

    var leads = {};
    for (var i = 1; i < tData.length; i++) {
        var ip = tData[i][ipCol], p = (tData[i][pCol] || "").toLowerCase(), s = tData[i][sCol]; if (!ip) continue;
        if (!leads[ip]) leads[ip] = { score: 0, hits: 0, time: 0, contact: false };
        leads[ip].hits++;
        if(s) leads[ip].time += (tTime[s] || 0);
        if(p.includes("diagnostic") || p.includes("proposal") || p.includes("architect") || p.includes("contact")) leads[ip].contact = true;
    }

    var printRows = Object.keys(leads).map(function(ip) {
        var l = leads[ip]; var score = 0; if (l.contact) score += 50; if (l.hits > 10) score += 20; if (l.time > 120) score += 30;
        var badge = score >= 80 ? "🔥 HOT PROSPECT" : score >= 50 ? "⭐ Verified Intent" : "Warm Lead";
        return [ip, score, badge, l.hits, l.time+"s", l.contact ? "YES" : "NO"];
    }).sort(function(a,b){ return b[1]-a[1]; });

    sh.getRange(4, 1, 1, 6).setValues([["IP Target", "Lead Score", "Classification", "Hits", "Dwell Time", "Conversion Form Visited"]]).setBackground(C.t).setFontColor(C.w);
    if (printRows.length > 0) sh.getRange(5, 1, Math.min(50, printRows.length), 6).setValues(printRows.slice(0, 50)).setBackground(C.r1);
}

// ══════════════════════════════════════════════════════════════════════════════
// CUSTOM MENU SETUP
// ══════════════════════════════════════════════════════════════════════════════
function onOpen() {
    SpreadsheetApp.getUi()
        .createMenu('🚀 TRUSTGRID ANALYTICS')
        .addItem('🔄 Refresh All 15 Dashboards', 'PULL_DATA_AND_BUILD_ALL_DASHBOARDS')
        .addToUi();
}
