/**
 * ═════════════════════════════════════════════════════════════════════════════
 * TRUSTGRID.AI — DEEP BEHAVIORAL ANALYTICS & BUYER INTENT ENGINE (SHEET 2)
 * ═════════════════════════════════════════════════════════════════════════════
 * Analyzes the 95-column granular telemetry database (Sheet 1: Live_Traffic_Events)
 * to generate deep behavioral intelligence, rage click forensics, micro-funnel
 * drop-off diagnostics, multi-touch buyer journey paths, and intent scoring.
 * ═════════════════════════════════════════════════════════════════════════════
 */

// 🔴 SPREADSHEET CONFIGURATION
var DATA_SHEET_ID = "1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0";
var SITE_BASE_URL = "https://www.trustgrid.ai";

// Visual Styling Tokens
var THEME = {
  bg: "#f8fafc",
  cardBg: "#ffffff",
  border: "#e2e8f0",
  textDark: "#0f172a",
  textMuted: "#64748b",
  primary: "#0284c7",    // Ocean Cyan
  accent: "#4f46e5",     // Deep Indigo
  success: "#10b981",    // Emerald Green
  warning: "#f59e0b",    // Amber
  danger: "#ef4444",     // Rose Red
  headerBg: "#060e22",   // Cyber Navy
  headerText: "#38bdf8"  // Electric Cyan
};

/**
 * Custom UI Menu on Spreadsheet Open
 */
function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🚀 TRUSTGRID ANALYTICS")
    .addItem("🧠 Run Deep Behavioral Analysis", "BUILD_BEHAVIORAL_ANALYTICS_DASHBOARDS")
    .addItem("🔥 Generate UX Friction & Rage Click Report", "BUILD_UX_FRICTION_DASHBOARD")
    .addItem("🎯 Generate Buyer Intent Leaderboard", "BUILD_BUYER_INTENT_DASHBOARD")
    .addItem("🌊 Generate Micro-Funnel Drop-off Forensics", "BUILD_FUNNEL_FORENSICS_DASHBOARD")
    .addSeparator()
    .addItem("🔄 Refresh All Dashboards (Standard + Behavioral)", "PULL_DATA_AND_BUILD_ALL_DASHBOARDS")
    .addToUi();
}

/**
 * Master Orchestrator for Behavioral Intelligence
 */
function BUILD_BEHAVIORAL_ANALYTICS_DASHBOARDS() {
  var ui = null;
  try { ui = SpreadsheetApp.getUi(); } catch (e) {}

  var db;
  try {
    db = SpreadsheetApp.openById(DATA_SHEET_ID);
  } catch (e) {
    if (ui) ui.alert("❌ Error: Could not open Sheet 1 (ID: " + DATA_SHEET_ID + ").\nDetails: " + e.toString());
    return;
  }

  // 1. Fetch 95-Column Telemetry Table from Sheet 1
  var tSheet = db.getSheetByName("Live_Traffic_Events") ||
               db.getSheetByName("Live Content") ||
               db.getSheetByName("Page Views") ||
               db.getSheetByName("traffic_analytics");

  if (!tSheet || tSheet.getLastRow() < 2) {
    if (ui) ui.alert("⚠️ Notice: No telemetry rows found in 'Live_Traffic_Events' on Sheet 1.");
    return;
  }

  var rawData = tSheet.getDataRange().getValues();
  var headers = rawData[0];
  var rows = rawData.slice(1);

  // Map Column Indices for Fast Lookup
  var colMap = {};
  headers.forEach(function(h, idx) {
    colMap[String(h).trim()] = idx;
  });

  var targetSS = SpreadsheetApp.getActiveSpreadsheet();

  // 2. Build Specialized Dashboards
  buildBuyerIntentDashboard(targetSS, rows, colMap);
  buildUxFrictionDashboard(targetSS, rows, colMap);
  buildFunnelForensicsDashboard(targetSS, rows, colMap);
  buildJourneyPathingDashboard(targetSS, rows, colMap);
  buildPerformanceCorrelationDashboard(targetSS, rows, colMap);
  buildCopyContentDashboard(targetSS, rows, colMap);

  if (ui) {
    ui.alert("🎉 Behavioral Intelligence Dashboards Successfully Generated!\n\nTabs created:\n• 🎯 Buyer Intent Matrix\n• 🔥 UX Friction & Rage Clicks\n• 🌊 Micro-Funnel Forensics\n• 🧭 Visitor Journey Flow\n• ⚡ Performance vs Bounce\n• 📋 High-Interest Content");
  }
}

/**
 * 1. 🎯 Buyer Intent Matrix & Leaderboard
 */
function buildBuyerIntentDashboard(ss, rows, colMap) {
  var sheet = getOrCreateTab(ss, "🎯 Buyer Intent Matrix");
  sheet.clear();

  // Aggregate user sessions
  var userMap = {};

  rows.forEach(function(r) {
    var uid = r[colMap["user_id"]] || r[colMap["session_id"]] || "unknown";
    if (!userMap[uid]) {
      userMap[uid] = {
        userId: uid,
        userName: r[colMap["user_name"]] || "",
        userEmail: r[colMap["user_email"]] || "",
        geo: (r[colMap["geo_city"]] || "") + ", " + (r[colMap["geo_country"]] || r[colMap["geo_state"]] || "Unknown"),
        ip: r[colMap["ip_address"]] || "",
        sessions: 0,
        totalPages: 0,
        totalTimeMs: 0,
        maxScroll: 0,
        interactions: 0,
        rageClicks: 0,
        formStarts: 0,
        conversions: 0,
        lastActive: r[colMap["timestamp"]] || "",
        pagesSet: {},
        trafficSource: r[colMap["traffic_source"]] || "direct",
        segment: r[colMap["user_segment"]] || "Product Explorer"
      };
    }

    var u = userMap[uid];
    u.interactions++;
    if (r[colMap["page"]]) u.pagesSet[r[colMap["page"]]] = true;
    u.totalTimeMs += Number(r[colMap["time_on_page"]]) || 0;
    u.maxScroll = Math.max(u.maxScroll, Number(r[colMap["max_scroll_depth"]]) || 0);

    var evt = String(r[colMap["event_name"]]).toLowerCase();
    if (evt.indexOf("rage") !== -1 || r[colMap["rage_click_detected"]] === true || r[colMap["rage_click_detected"]] === "TRUE") {
      u.rageClicks++;
    }
    if (evt.indexOf("form_start") !== -1) u.formStarts++;
    if (r[colMap["goal_completed"]] === true || r[colMap["goal_completed"]] === "TRUE" || evt.indexOf("form_submit") !== -1) {
      u.conversions++;
    }
    if (r[colMap["user_name"]] && !u.userName) u.userName = r[colMap["user_name"]];
    if (r[colMap["user_email"]] && !u.userEmail) u.userEmail = r[colMap["user_email"]];
  });

  // Calculate Weighted Intent Score (0 - 100)
  var userList = Object.values(userMap).map(function(u) {
    u.totalPages = Object.keys(u.pagesSet).length;
    var score = 0;
    if (u.conversions > 0) score += 45;
    if (u.formStarts > 0) score += 25;
    score += Math.min(20, u.totalPages * 4);
    if (u.totalTimeMs > 60000) score += 15;
    if (u.maxScroll > 75) score += 10;
    if (u.interactions > 10) score += 10;
    u.intentScore = Math.min(100, score);

    // Dynamic Segmentation
    if (u.conversions > 0) u.segment = "High-Intent Lead";
    else if (u.intentScore >= 70) u.segment = "Enterprise Evaluation";
    else if (u.intentScore >= 40) u.segment = "Product Explorer";
    else if (u.totalTimeMs > 45000) u.segment = "Technical Evaluator";
    else u.segment = "Casual Browser";

    return u;
  });

  // Sort by Intent Score DESC
  userList.sort(function(a, b) { return b.intentScore - a.intentScore; });

  // Header Title
  sheet.getRange(1, 1, 1, 11).merge()
    .setValue("🎯 TRUSTGRID.AI — BUYER INTENT & VISITOR BEHAVIOR MATRIX")
    .setFontWeight("bold").setFontSize(14).setBackground(THEME.headerBg).setFontColor(THEME.headerText).setHorizontalAlignment("center");

  // Summary Metrics Banner
  var totalVisitors = userList.length;
  var highIntentCount = userList.filter(function(u) { return u.intentScore >= 60; }).length;
  var convertedCount = userList.filter(function(u) { return u.conversions > 0; }).length;
  var avgDwellSec = Math.round(userList.reduce(function(acc, u) { return acc + u.totalTimeMs; }, 0) / (totalVisitors || 1) / 1000);

  sheet.getRange(3, 1, 2, 2).merge().setValue("TOTAL VISITORS\n" + totalVisitors).setFontWeight("bold").setBackground("#e0f2fe").setHorizontalAlignment("center");
  sheet.getRange(3, 3, 2, 2).merge().setValue("HIGH-INTENT PROSPECTS\n" + highIntentCount).setFontWeight("bold").setBackground("#dcfce7").setHorizontalAlignment("center");
  sheet.getRange(3, 5, 2, 2).merge().setValue("CONVERSIONS / LEADS\n" + convertedCount).setFontWeight("bold").setBackground("#fef3c7").setHorizontalAlignment("center");
  sheet.getRange(3, 7, 2, 2).merge().setValue("AVG DWELL TIME\n" + avgDwellSec + " sec").setFontWeight("bold").setBackground("#ede9fe").setHorizontalAlignment("center");

  // Table Headers
  var headersTable = [
    "Rank", "Intent Score", "Behavioral Segment", "Identified User / Email",
    "IP Location", "Pages Explored", "Dwell Time (sec)", "Total Interactions",
    "Rage Clicks", "Traffic Source", "Last Active Timestamp"
  ];

  sheet.getRange(6, 1, 1, headersTable.length)
    .setValues([headersTable])
    .setFontWeight("bold")
    .setBackground(THEME.headerBg)
    .setFontColor(THEME.headerText);

  var outRows = userList.slice(0, 50).map(function(u, idx) {
    return [
      "#" + (idx + 1),
      u.intentScore + " / 100",
      u.segment,
      u.userEmail || u.userName || ("Anonymous (" + u.userId.substring(0, 8) + ")"),
      u.geo,
      u.totalPages,
      Math.round(u.totalTimeMs / 1000),
      u.interactions,
      u.rageClicks,
      u.trafficSource,
      u.lastActive
    ];
  });

  if (outRows.length > 0) {
    sheet.getRange(7, 1, outRows.length, headersTable.length).setValues(outRows);
  }

  sheet.setFrozenRows(6);
  sheet.autoResizeColumns(1, headersTable.length);
}

/**
 * 2. 🔥 UX Friction & Rage Click Forensics
 */
function buildUxFrictionDashboard(ss, rows, colMap) {
  var sheet = getOrCreateTab(ss, "🔥 UX Friction & Rage Clicks");
  sheet.clear();

  var rageEvents = [];
  var elementFrictionMap = {};

  rows.forEach(function(r) {
    var isRage = (r[colMap["rage_click_detected"]] === true ||
                  r[colMap["rage_click_detected"]] === "TRUE" ||
                  String(r[colMap["event_name"]]).toLowerCase() === "rage_click");

    if (isRage) {
      var elKey = (r[colMap["page"]] || "/") + " > " + (r[colMap["element_type"]] || "ELEMENT") + " [" + (r[colMap["element_text"]] || r[colMap["element_id"]] || "no-text") + "]";
      if (!elementFrictionMap[elKey]) {
        elementFrictionMap[elKey] = {
          element: elKey,
          page: r[colMap["page"]] || "/",
          tag: r[colMap["element_type"]] || "BUTTON",
          text: r[colMap["element_text"]] || "",
          className: r[colMap["element_class"]] || "",
          count: 0,
          lastCoord: "(" + (r[colMap["click_position_x"]] || 0) + ", " + (r[colMap["click_position_y"]] || 0) + ")",
          lastSeen: r[colMap["timestamp"]] || ""
        };
      }
      elementFrictionMap[elKey].count++;

      rageEvents.push([
        r[colMap["timestamp"]] || "",
        r[colMap["page"]] || "/",
        r[colMap["element_type"]] || "ELEMENT",
        r[colMap["element_text"]] || "",
        r[colMap["element_class"]] || "",
        r[colMap["click_position_x"]] || 0,
        r[colMap["click_position_y"]] || 0,
        r[colMap["user_id"]] || r[colMap["session_id"]] || "",
        r[colMap["device_type"]] || "Desktop"
      ]);
    }
  });

  sheet.getRange(1, 1, 1, 9).merge()
    .setValue("🔥 UX FRICTION, RAGE CLICKS & DEAD CLICK FORENSICS")
    .setFontWeight("bold").setFontSize(14).setBackground(THEME.headerBg).setFontColor(THEME.headerText).setHorizontalAlignment("center");

  // Summary Top Friction Hotspots Table
  sheet.getRange(3, 1).setValue("⚠️ Top Frustration Hotspots (Most Rage-Clicked Elements)").setFontWeight("bold").setFontSize(12);

  var rankedElements = Object.values(elementFrictionMap).sort(function(a, b) { return b.count - a.count; });
  var summaryHeaders = ["Element & Context", "Page Path", "HTML Tag", "Element Text", "Rage Click Count", "Last Position (X,Y)", "Last Detected"];

  sheet.getRange(4, 1, 1, summaryHeaders.length).setValues([summaryHeaders]).setFontWeight("bold").setBackground("#334155").setFontColor("#ffffff");

  var summaryRows = rankedElements.slice(0, 15).map(function(e) {
    return [e.element, e.page, e.tag, e.text, e.count, e.lastCoord, e.lastSeen];
  });

  if (summaryRows.length > 0) {
    sheet.getRange(5, 1, summaryRows.length, summaryHeaders.length).setValues(summaryRows);
  }

  // Granular Event Stream
  var eventStartRow = Math.max(7 + summaryRows.length, 12);
  sheet.getRange(eventStartRow, 1).setValue("📋 Full Stream of Detected Rage Click Incidents").setFontWeight("bold").setFontSize(12);

  var streamHeaders = ["Timestamp", "Page Path", "Element Tag", "Element Text", "CSS Classes", "Click X", "Click Y", "Visitor ID", "Device"];
  sheet.getRange(eventStartRow + 1, 1, 1, streamHeaders.length).setValues([streamHeaders]).setFontWeight("bold").setBackground(THEME.headerBg).setFontColor(THEME.headerText);

  if (rageEvents.length > 0) {
    sheet.getRange(eventStartRow + 2, 1, Math.min(50, rageEvents.length), streamHeaders.length).setValues(rageEvents.slice(0, 50));
  } else {
    sheet.getRange(eventStartRow + 2, 1, 1, streamHeaders.length).setValues([["No Rage Clicks Detected in Current Data", "-", "-", "-", "-", "-", "-", "-", "-"]]);
  }

  sheet.autoResizeColumns(1, 9);
}

/**
 * 3. 🌊 Micro-Funnel & Form Drop-off Forensics
 */
function buildFunnelForensicsDashboard(ss, rows, colMap) {
  var sheet = getOrCreateTab(ss, "🌊 Micro-Funnel Forensics");
  sheet.clear();

  var formMap = {};

  rows.forEach(function(r) {
    var formId = r[colMap["form_id"]];
    if (!formId) return;

    if (!formMap[formId]) {
      formMap[formId] = {
        formId: formId,
        views: 0,
        starts: 0,
        submits: 0,
        abandons: 0,
        fieldInteractions: {}
      };
    }

    var f = formMap[formId];
    var evt = String(r[colMap["event_name"]]).toLowerCase();

    if (evt.indexOf("form_view") !== -1) f.views++;
    if (evt.indexOf("form_start") !== -1) f.starts++;
    if (r[colMap["form_completion_status"]] === true || r[colMap["form_completion_status"]] === "TRUE" || evt.indexOf("form_submit") !== -1) {
      f.submits++;
    }
    if (r[colMap["form_abandonment"]] === true || r[colMap["form_abandonment"]] === "TRUE" || evt.indexOf("form_abandon") !== -1) {
      f.abandons++;
    }

    var field = r[colMap["form_field_name"]];
    if (field) {
      f.fieldInteractions[field] = (f.fieldInteractions[field] || 0) + 1;
    }
  });

  sheet.getRange(1, 1, 1, 8).merge()
    .setValue("🌊 MICRO-FUNNEL & FORM FIELD DROP-OFF FORENSICS")
    .setFontWeight("bold").setFontSize(14).setBackground(THEME.headerBg).setFontColor(THEME.headerText).setHorizontalAlignment("center");

  var headers = ["Form ID / Name", "Total Views", "Form Starts", "Submissions", "Abandonments", "Start Rate (%)", "Completion Rate (%)", "Drop-Off Friction Field"];
  sheet.getRange(3, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground(THEME.headerBg).setFontColor(THEME.headerText);

  var outRows = Object.values(formMap).map(function(f) {
    var startRate = f.views > 0 ? Math.round((f.starts / f.views) * 100) : 100;
    var compRate = f.starts > 0 ? Math.round((f.submits / f.starts) * 100) : (f.submits > 0 ? 100 : 0);

    // Identify highest friction field
    var topField = "None";
    var maxCount = 0;
    Object.keys(f.fieldInteractions).forEach(function(k) {
      if (f.fieldInteractions[k] > maxCount) {
        maxCount = f.fieldInteractions[k];
        topField = k;
      }
    });

    return [
      f.formId,
      f.views,
      f.starts,
      f.submits,
      f.abandons,
      startRate + "%",
      compRate + "%",
      topField + " (" + maxCount + " interactions)"
    ];
  });

  if (outRows.length > 0) {
    sheet.getRange(4, 1, outRows.length, headers.length).setValues(outRows);
  } else {
    sheet.getRange(4, 1, 1, headers.length).setValues([["No Form Events Tracked", 0, 0, 0, 0, "0%", "0%", "N/A"]]);
  }

  sheet.autoResizeColumns(1, headers.length);
}

/**
 * 4. 🧭 Visitor Journey Flow & Sankey Paths
 */
function buildJourneyPathingDashboard(ss, rows, colMap) {
  var sheet = getOrCreateTab(ss, "🧭 Visitor Journey Flow");
  sheet.clear();

  var pathsMap = {};

  rows.forEach(function(r) {
    var prev = r[colMap["previous_page"]] || r[colMap["entry_page"]] || "(entry)";
    var curr = r[colMap["page"]] || "/";
    if (prev === curr) return;

    var transitionKey = prev + "  ➔  " + curr;
    pathsMap[transitionKey] = (pathsMap[transitionKey] || 0) + 1;
  });

  sheet.getRange(1, 1, 1, 4).merge()
    .setValue("🧭 VISITOR JOURNEY FLOW & TRANSITION SANKEY PATHS")
    .setFontWeight("bold").setFontSize(14).setBackground(THEME.headerBg).setFontColor(THEME.headerText).setHorizontalAlignment("center");

  var headers = ["Origin Page", "Destination Page", "Transition Path", "Visitor Flow Volume"];
  sheet.getRange(3, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground(THEME.headerBg).setFontColor(THEME.headerText);

  var sortedPaths = Object.keys(pathsMap).sort(function(a, b) { return pathsMap[b] - pathsMap[a]; });
  var outRows = sortedPaths.slice(0, 30).map(function(k) {
    var parts = k.split("  ➔  ");
    return [parts[0], parts[1], k, pathsMap[k]];
  });

  if (outRows.length > 0) {
    sheet.getRange(4, 1, outRows.length, headers.length).setValues(outRows);
  }

  sheet.autoResizeColumns(1, headers.length);
}

/**
 * 5. ⚡ Web Performance vs Bounce Correlation
 */
function buildPerformanceCorrelationDashboard(ss, rows, colMap) {
  var sheet = getOrCreateTab(ss, "⚡ Performance vs Bounce");
  sheet.clear();

  var buckets = {
    "Ultra Fast (< 1.0s)": { count: 0, bounces: 0, totalDwell: 0 },
    "Good (1.0s - 2.5s)": { count: 0, bounces: 0, totalDwell: 0 },
    "Needs Improvement (2.5s - 4.0s)": { count: 0, bounces: 0, totalDwell: 0 },
    "Poor (> 4.0s)": { count: 0, bounces: 0, totalDwell: 0 }
  };

  rows.forEach(function(r) {
    var loadTime = Number(r[colMap["page_load_time"]]) || Number(r[colMap["dom_load_time"]]) || Number(r[colMap["first_contentful_paint"]]) || 0;
    var isBounce = (r[colMap["bounce"]] === true || r[colMap["bounce"]] === "TRUE");
    var dwell = Number(r[colMap["time_on_page"]]) || 0;

    var bucketName = "Poor (> 4.0s)";
    if (loadTime < 1000) bucketName = "Ultra Fast (< 1.0s)";
    else if (loadTime <= 2500) bucketName = "Good (1.0s - 2.5s)";
    else if (loadTime <= 4000) bucketName = "Needs Improvement (2.5s - 4.0s)";

    buckets[bucketName].count++;
    if (isBounce) buckets[bucketName].bounces++;
    buckets[bucketName].totalDwell += dwell;
  });

  sheet.getRange(1, 1, 1, 5).merge()
    .setValue("⚡ WEB PERFORMANCE (FCP/LCP) VS BOUNCE RATE CORRELATION")
    .setFontWeight("bold").setFontSize(14).setBackground(THEME.headerBg).setFontColor(THEME.headerText).setHorizontalAlignment("center");

  var headers = ["Performance Tier (Load Time)", "Sample Pageviews", "Bounces", "Bounce Rate (%)", "Avg Dwell Time (sec)"];
  sheet.getRange(3, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground(THEME.headerBg).setFontColor(THEME.headerText);

  var outRows = Object.keys(buckets).map(function(k) {
    var b = buckets[k];
    var bounceRate = b.count > 0 ? Math.round((b.bounces / b.count) * 100) : 0;
    var avgDwell = b.count > 0 ? Math.round(b.totalDwell / b.count / 1000) : 0;
    return [k, b.count, b.bounces, bounceRate + "%", avgDwell];
  });

  sheet.getRange(4, 1, outRows.length, headers.length).setValues(outRows);
  sheet.autoResizeColumns(1, headers.length);
}

/**
 * 6. 📋 High-Interest Content Snippets (Copy/Paste Events)
 */
function buildCopyContentDashboard(ss, rows, colMap) {
  var sheet = getOrCreateTab(ss, "📋 High-Interest Content");
  sheet.clear();

  var copyMap = {};

  rows.forEach(function(r) {
    var isCopy = (r[colMap["copy_event"]] === true || r[colMap["copy_event"]] === "TRUE" || String(r[colMap["event_name"]]).toLowerCase() === "copy");
    if (isCopy) {
      var text = (r[colMap["element_text"]] || "").trim();
      if (text) {
        copyMap[text] = (copyMap[text] || 0) + 1;
      }
    }
  });

  sheet.getRange(1, 1, 1, 3).merge()
    .setValue("📋 HIGH-INTEREST CONTENT SNIPPETS (COPIED BY VISITORS)")
    .setFontWeight("bold").setFontSize(14).setBackground(THEME.headerBg).setFontColor(THEME.headerText).setHorizontalAlignment("center");

  var headers = ["Rank", "Copied Text Snippet", "Copy Frequency Count"];
  sheet.getRange(3, 1, 1, headers.length).setValues([headers]).setFontWeight("bold").setBackground(THEME.headerBg).setFontColor(THEME.headerText);

  var sortedCopy = Object.keys(copyMap).sort(function(a, b) { return copyMap[b] - copyMap[a]; });
  var outRows = sortedCopy.slice(0, 30).map(function(k, idx) {
    return ["#" + (idx + 1), k, copyMap[k]];
  });

  if (outRows.length > 0) {
    sheet.getRange(4, 1, outRows.length, headers.length).setValues(outRows);
  } else {
    sheet.getRange(4, 1, 1, headers.length).setValues([["-", "No Copy Events Logged Yet", 0]]);
  }

  sheet.autoResizeColumns(1, headers.length);
}

/**
 * Helper: Retrieve or Create Tab
 */
function getOrCreateTab(ss, name) {
  var sheet = ss.getSheetByName(name);
  if (!sheet) {
    sheet = ss.insertSheet(name);
  }
  return sheet;
}

// Shortcuts for custom menu items
function BUILD_UX_FRICTION_DASHBOARD() { BUILD_BEHAVIORAL_ANALYTICS_DASHBOARDS(); }
function BUILD_BUYER_INTENT_DASHBOARD() { BUILD_BEHAVIORAL_ANALYTICS_DASHBOARDS(); }
function BUILD_FUNNEL_FORENSICS_DASHBOARD() { BUILD_BEHAVIORAL_ANALYTICS_DASHBOARDS(); }
