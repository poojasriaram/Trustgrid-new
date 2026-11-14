/**
 * TRUSTGRID.AI — DIRECT GOOGLE APPS SCRIPT TO SUPABASE PUSHER
 * 
 * Paste this in your Google Sheet's Apps Script Editor (Extensions > Apps Script).
 * It will add a custom menu: "🚀 Supabase" > "Migrate This Sheet to Supabase".
 */

const SUPABASE_SETTINGS = {
  // Replace with your project details
  url: "https://YOUR_PROJECT_REF.supabase.co",
  serviceRoleKey: "YOUR_SUPABASE_SERVICE_ROLE_KEY",
  
  // Custom table name or leave blank to auto-use the sheet tab's name
  customTableName: "", 
  
  batchSize: 200
};

function onOpen() {
  SpreadsheetApp.getUi()
    .createMenu("🚀 Supabase")
    .addItem("Migrate Active Sheet to Supabase", "runSupabaseMigration")
    .addToUi();
}

function runSupabaseMigration() {
  const ui = SpreadsheetApp.getUi();
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const sheetName = sheet.getName();
  
  // Clean table name (e.g. "Live Traffic Events" -> "live_traffic_events")
  const targetTable = SUPABASE_SETTINGS.customTableName || 
    sheetName.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');

  const data = sheet.getDataRange().getValues();
  if (data.length < 2) {
    ui.alert("No data found in the active sheet.");
    return;
  }

  const rawHeaders = data[0];
  const headers = rawHeaders.map((h, i) => {
    let clean = String(h).trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    if (/^[0-9]/.test(clean)) clean = 'c_' + clean;
    return clean || ('col_' + (i + 1));
  });

  const records = [];
  for (let i = 1; i < data.length; i++) {
    const row = data[i];
    const item = {};
    let hasValue = false;

    for (let j = 0; j < headers.length; j++) {
      let val = row[j];
      if (val === "" || val === undefined || val === null) {
        val = null;
      } else if (val instanceof Date) {
        val = val.toISOString();
      }
      item[headers[j]] = val;
      if (val !== null) hasValue = true;
    }

    if (hasValue) records.push(item);
  }

  const endpoint = SUPABASE_SETTINGS.url.replace(/\/$/, '') + "/rest/v1/" + targetTable;
  let success = 0;

  for (let i = 0; i < records.length; i += SUPABASE_SETTINGS.batchSize) {
    const chunk = records.slice(i, i + SUPABASE_SETTINGS.batchSize);
    
    const options = {
      method: "post",
      contentType: "application/json",
      headers: {
        "apikey": SUPABASE_SETTINGS.serviceRoleKey,
        "Authorization": "Bearer " + SUPABASE_SETTINGS.serviceRoleKey,
        "Prefer": "return=minimal"
      },
      payload: JSON.stringify(chunk),
      muteHttpExceptions: true
    };

    const res = UrlFetchApp.fetch(endpoint, options);
    const code = res.getResponseCode();

    if (code >= 200 && code < 300) {
      success += chunk.length;
    } else {
      const err = res.getContentText();
      ui.alert("Error migrating batch starting at row " + (i + 2) + ":\n\n" + err + 
               "\n\nMake sure the table '" + targetTable + "' exists in Supabase.");
      return;
    }
  }

  ui.alert("✅ Migration Successful!\n\nPushed " + success + " rows to Supabase table: " + targetTable);
}

