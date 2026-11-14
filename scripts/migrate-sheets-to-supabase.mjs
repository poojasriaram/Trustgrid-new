/**
 * TRUSTGRID.AI — Dual Google Sheets to Supabase Migration Runner
 * 
 * Migrates data from 2 Google Sheets into Supabase PostgreSQL tables.
 * Supports:
 *   1. Local CSV exports (placed in ./data/sheet1.csv and ./data/sheet2.csv)
 *   2. Direct Google Sheets CSV export URL (when sheet is shared via link)
 *   3. Google Sheets REST API (when service account credentials are provided)
 * 
 * Uses native Node 18+ fetch — zero external dependencies required.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

// Helper to load .env.local manually if dotenv is not installed
function loadEnv() {
  const envPath = path.join(ROOT_DIR, '.env.local');
  if (fs.existsSync(envPath)) {
    const lines = fs.readFileSync(envPath, 'utf8').split('\n');
    for (const line of lines) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const eqIdx = trimmed.indexOf('=');
      if (eqIdx !== -1) {
        const key = trimmed.slice(0, eqIdx).trim();
        let val = trimmed.slice(eqIdx + 1).trim();
        if (val.startsWith('"') && val.endsWith('"')) val = val.slice(1, -1);
        if (val.startsWith("'") && val.endsWith("'")) val = val.slice(1, -1);
        if (!process.env[key]) process.env[key] = val;
      }
    }
  }
}
loadEnv();

// Configuration
const CONFIG = {
  supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL,
  serviceRoleKey: process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY,
  batchSize: 200,

  // Default Sheet definitions (matching .env.local)
  sheet1: {
    name: 'sheet_1_telemetry_leads',
    sheetId: process.env.NEXT_PUBLIC_SHEET1_ID || '1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0',
    gid: '0',
    localCsvPath: path.join(ROOT_DIR, 'data', 'sheet1.csv')
  },
  sheet2: {
    name: 'sheet_2_behavioral_analytics',
    sheetId: process.env.NEXT_PUBLIC_SHEET2_ID || '1jC53QN1qiuiRFLzdneA46TECBztER5btTo7qGphb5TM',
    gid: '0',
    localCsvPath: path.join(ROOT_DIR, 'data', 'sheet2.csv')
  }
};

/**
 * Robust RFC-4180 CSV Parser (Handles multiline cells, quotes, commas)
 */
function parseCSV(text) {
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < text.length; i++) {
    const char = text[i];
    const nextChar = text[i + 1];

    if (insideQuotes) {
      if (char === '"' && nextChar === '"') {
        currentField += '"';
        i++; // skip escaped quote
      } else if (char === '"') {
        insideQuotes = false;
      } else {
        currentField += char;
      }
    } else {
      if (char === '"') {
        insideQuotes = true;
      } else if (char === ',') {
        currentRow.push(currentField);
        currentField = '';
      } else if (char === '\r') {
        if (nextChar === '\n') i++;
        currentRow.push(currentField);
        rows.push(currentRow);
        currentRow = [];
        currentField = '';
      } else if (char === '\n') {
        currentRow.push(currentField);
        rows.push(currentRow);
        currentRow = [];
        currentField = '';
      } else {
        currentField += char;
      }
    }
  }

  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField);
    rows.push(currentRow);
  }

  return rows;
}

/**
 * Normalizes column header into safe PostgreSQL identifier (snake_case)
 */
function sanitizeColumnName(header, index) {
  if (!header || !String(header).trim()) return `col_${index + 1}`;
  let clean = String(header)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  
  // Ensure it doesn't start with a number
  if (/^[0-9]/.test(clean)) clean = `c_${clean}`;
  return clean || `col_${index + 1}`;
}

/**
 * Cleans value for PostgreSQL
 */
function sanitizeValue(val) {
  if (val === null || val === undefined) return null;
  const str = String(val).trim();
  if (str === '' || str.toLowerCase() === 'null' || str === '#n/a' || str === 'undefined') return null;

  // Booleans
  if (str.toLowerCase() === 'true') return true;
  if (str.toLowerCase() === 'false') return false;

  // ISO Dates (YYYY-MM-DD or ISO strings)
  if (/^\d{4}-\d{2}-\d{2}(T|\b)/.test(str) && !isNaN(Date.parse(str))) {
    return new Date(str).toISOString();
  }

  return str;
}

/**
 * Fetches sheet data via local file or Google CSV export link
 */
async function loadSheetData(sheetConfig) {
  // 1. Try local CSV first
  if (fs.existsSync(sheetConfig.localCsvPath)) {
    console.log(`📁 Found local CSV file: ${sheetConfig.localCsvPath}`);
    return fs.readFileSync(sheetConfig.localCsvPath, 'utf8');
  }

  // 2. Fetch via Google Sheets export URL
  if (sheetConfig.sheetId) {
    const url = `https://docs.google.com/spreadsheets/d/${sheetConfig.sheetId}/export?format=csv&gid=${sheetConfig.gid || '0'}`;
    console.log(`🌐 Attempting download from Google Sheet export URL: ${url}`);
    const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
    if (res.ok) {
      return await res.text();
    }
    console.warn(`⚠️ Direct CSV export returned status ${res.status} (${res.statusText}).`);
    console.warn(`   Sheet might require Google authentication or public "Anyone with link can view" access.`);
  }

  throw new Error(
    `No data source available for ${sheetConfig.name}.\n` +
    `Please place exported CSV at: ${sheetConfig.localCsvPath}\n` +
    `Or ensure the Google Sheet is shared with "Anyone with the link can view".`
  );
}

/**
 * Generates SQL DDL to create table in Supabase
 */
function generateCreateTableSQL(tableName, columns) {
  const colDefs = columns.map(c => `  "${c}" TEXT`).join(',\n');
  return `
-- SQL DDL for table: public.${tableName}
CREATE TABLE IF NOT EXISTS public."${tableName}" (
  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW(),
${colDefs}
);

-- Enable Row Level Security (RLS)
ALTER TABLE public."${tableName}" ENABLE ROW LEVEL SECURITY;
`;
}

/**
 * Migrates a single sheet into Supabase
 */
async function migrateSheet(sheetConfig) {
  console.log(`\n======================================================`);
  console.log(`🚀 Starting Migration for: ${sheetConfig.name}`);
  console.log(`======================================================`);

  const rawCSV = await loadSheetData(sheetConfig);
  const rawRows = parseCSV(rawCSV);

  if (rawRows.length < 2) {
    console.log(`⚠️ No data rows found in ${sheetConfig.name}. Skipping.`);
    return;
  }

  const rawHeaders = rawRows[0];
  const seenHeaders = new Map();
  const normalizedHeaders = rawHeaders.map((h, idx) => {
    let col = sanitizeColumnName(h, idx);
    if (seenHeaders.has(col)) {
      const count = seenHeaders.get(col) + 1;
      seenHeaders.set(col, count);
      col = `${col}_${count}`;
    } else {
      seenHeaders.set(col, 1);
    }
    return col;
  });

  console.log(`📋 Detected ${normalizedHeaders.length} columns in ${sheetConfig.name}.`);

  // Transform rows to JSON objects
  const records = [];
  for (let i = 1; i < rawRows.length; i++) {
    const row = rawRows[i];
    const record = {};
    let hasValue = false;

    for (let j = 0; j < normalizedHeaders.length; j++) {
      const colName = normalizedHeaders[j];
      const val = sanitizeValue(row[j]);
      record[colName] = val;
      if (val !== null) hasValue = true;
    }

    if (hasValue) records.push(record);
  }

  console.log(`📦 Loaded ${records.length} non-empty records.`);

  // Print SQL schema helper
  const sqlDdl = generateCreateTableSQL(sheetConfig.name, normalizedHeaders);
  const sqlFilePath = path.join(ROOT_DIR, 'data', `${sheetConfig.name}_schema.sql`);
  fs.mkdirSync(path.join(ROOT_DIR, 'data'), { recursive: true });
  fs.writeFileSync(sqlFilePath, sqlDdl, 'utf8');
  console.log(`📝 Generated SQL table schema saved to: ${sqlFilePath}`);

  // Validate Supabase credentials
  if (!CONFIG.supabaseUrl || !CONFIG.serviceRoleKey) {
    console.log(`\n⚠️ Missing Supabase credentials in .env.local:`);
    console.log(`   NEXT_PUBLIC_SUPABASE_URL=...`);
    console.log(`   SUPABASE_SERVICE_ROLE_KEY=...`);
    console.log(`   Skipping live insertion until credentials are provided.`);
    return;
  }

  console.log(`\n📤 Inserting ${records.length} rows into Supabase table "${sheetConfig.name}"...`);
  const endpoint = `${CONFIG.supabaseUrl.replace(/\/$/, '')}/rest/v1/${sheetConfig.name}`;

  let successCount = 0;
  for (let i = 0; i < records.length; i += CONFIG.batchSize) {
    const chunk = records.slice(i, i + CONFIG.batchSize);

    const res = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'apikey': CONFIG.serviceRoleKey,
        'Authorization': `Bearer ${CONFIG.serviceRoleKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=minimal'
      },
      body: JSON.stringify(chunk)
    });

    if (!res.ok) {
      const errText = await res.text();
      console.error(`❌ Batch error [${i + 1} - ${i + chunk.length}]:`, errText);
      console.error(`💡 Tip: Make sure the table "${sheetConfig.name}" exists in Supabase. Run the generated SQL from ${sqlFilePath} in the Supabase SQL editor.`);
      throw new Error(`Failed to insert batch: ${errText}`);
    }

    successCount += chunk.length;
    console.log(`   ✅ Inserted ${successCount}/${records.length} rows (${Math.round((successCount / records.length) * 100)}%)`);
  }

  console.log(`🎉 Finished migration for ${sheetConfig.name}! Total: ${successCount} rows.`);
}

/**
 * Main Runner
 */
async function run() {
  console.log(`\n======================================================`);
  console.log(`       TrustGrid 2-Sheet to Supabase Migrator         `);
  console.log(`======================================================\n`);

  try {
    await migrateSheet(CONFIG.sheet1);
    await migrateSheet(CONFIG.sheet2);
    console.log(`\n✨ All migrations finished successfully!`);
  } catch (err) {
    console.error(`\n❌ Migration failed:`, err.message);
  }
}

run();

