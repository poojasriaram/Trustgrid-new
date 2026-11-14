import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const ROOT_DIR = path.resolve(__dirname, '..');

const SHEET1_ID = '1z2kBM_90kYX_MXWknlQ7UHnsBms4EQ9p6aXukUBHYT0';
const SUPABASE_URL = 'https://ndalgvpvpzwrqoikkpyb.supabase.co';
const API_KEY = process.env.SUPABASE_KEY || 'sb_publishable_hplsjtYOPTKM-gLcnp53Kw_x0AEOzxv';
const BATCH_SIZE = 200;

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
        i++;
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

function sanitizeColumnName(header, index) {
  if (!header || !String(header).trim()) return `col_${index + 1}`;
  let clean = String(header)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
  if (/^[0-9]/.test(clean)) clean = `c_${clean}`;
  return clean || `col_${index + 1}`;
}

function normalizeHeaders(rawHeaders) {
  const seen = new Map();
  return rawHeaders.map((h, idx) => {
    let col = sanitizeColumnName(h, idx);
    if (seen.has(col)) {
      const count = seen.get(col) + 1;
      seen.set(col, count);
      col = `${col}_${count}`;
    } else {
      seen.set(col, 1);
    }
    return col;
  });
}

async function checkTableStatus(tableName) {
  const endpoint = `${SUPABASE_URL}/rest/v1/${tableName}?select=id&limit=1`;
  const res = await fetch(endpoint, {
    headers: {
      'apikey': API_KEY,
      'Authorization': `Bearer ${API_KEY}`,
      'Prefer': 'count=exact'
    }
  });

  if (res.status === 200 || res.status === 206) {
    const contentRange = res.headers.get('content-range') || '';
    const existingCount = contentRange.includes('/') ? parseInt(contentRange.split('/')[1], 10) : 0;
    return { exists: true, existingCount: isNaN(existingCount) ? 0 : existingCount };
  }
  const err = await res.json().catch(() => ({}));
  return { exists: false, existingCount: 0, error: err };
}

async function run() {
  const tabsPath = path.join(ROOT_DIR, 'data', 'sheet1_all_tabs.json');
  const tabs = JSON.parse(fs.readFileSync(tabsPath, 'utf8'));
  const forceFresh = process.argv.includes('--fresh');

  // 1. Ensure all 31 CSVs exist locally (or re-download if --fresh)
  for (const tab of tabs) {
    const tableName = tab.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    const csvPath = path.join(ROOT_DIR, 'data', 'sheets', `${tableName}.csv`);
    if (forceFresh || !fs.existsSync(csvPath)) {
      const url = `https://docs.google.com/spreadsheets/d/${SHEET1_ID}/export?format=csv&gid=${tab.gid}`;
      console.log(`🌐 Downloading ${tab.name} (gid=${tab.gid})...`);
      const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
      if (!res.ok) {
        throw new Error(`Failed to download ${tab.name}: ${res.status} ${res.statusText}`);
      }
      const csvText = await res.text();
      fs.writeFileSync(csvPath, csvText, 'utf8');
      console.log(`   ✅ Saved to ${csvPath} (${csvText.length} bytes)`);
    }
  }

  // 2. Parse all 31 CSVs, build manifest & full SQL DDL
  const manifest = [];
  let remainingSql = `-- =========================================================================\n`;
  remainingSql += `-- TRUSTGRID.AI — COMPLETE SHEET 1 TABLES DDL (ALL 30 REMAINING SHEETS)\n`;
  remainingSql += `-- Project: ndalgvpvpzwrqoikkpyb\n`;
  remainingSql += `-- Run this entire script in Supabase Dashboard -> SQL Editor\n`;
  remainingSql += `-- =========================================================================\n\n`;

  const parsedTabs = [];

  for (const tab of tabs) {
    const tableName = tab.name.trim().toLowerCase().replace(/[^a-z0-9]+/g, '_').replace(/^_+|_+$/g, '');
    const csvPath = path.join(ROOT_DIR, 'data', 'sheets', `${tableName}.csv`);
    const content = fs.readFileSync(csvPath, 'utf8');
    const rows = parseCSV(content);
    const rawHeaders = rows[0] || [];
    const headers = normalizeHeaders(rawHeaders);

    const records = [];
    for (let i = 1; i < rows.length; i++) {
      const row = rows[i];
      if (!row || row.every(cell => !cell || !String(cell).trim())) continue;
      const rec = {};
      let hasVal = false;
      for (let j = 0; j < headers.length; j++) {
        let v = row[j];
        if (v === '' || v === undefined || v === 'null') {
          v = null;
        }
        rec[headers[j]] = v;
        if (v !== null) hasVal = true;
      }
      if (hasVal) records.push(rec);
    }

    manifest.push({
      gid: tab.gid,
      name: tab.name,
      tableName,
      rowCount: records.length,
      headers,
      status: records.length > 0 ? 'has_data' : 'empty_table'
    });

    parsedTabs.push({ ...tab, tableName, headers, records });

    if (tableName !== 'live_traffic_events') {
      const colDefs = headers.map(h => `  "${h}" TEXT`).join(',\n');
      remainingSql += `-- -------------------------------------------------------------------------\n`;
      remainingSql += `-- Table: public.${tableName} (${records.length} rows, gid=${tab.gid})\n`;
      remainingSql += `-- -------------------------------------------------------------------------\n`;
      remainingSql += `DROP TABLE IF EXISTS public."${tableName}" CASCADE;\n`;
      remainingSql += `CREATE TABLE public."${tableName}" (\n`;
      remainingSql += `  id BIGINT GENERATED BY DEFAULT AS IDENTITY PRIMARY KEY,\n`;
      remainingSql += `  migrated_at TIMESTAMPTZ DEFAULT NOW(),\n`;
      remainingSql += `${colDefs}\n`;
      remainingSql += `);\n\n`;
      remainingSql += `ALTER TABLE public."${tableName}" ENABLE ROW LEVEL SECURITY;\n`;
      remainingSql += `CREATE POLICY "Allow public insert on ${tableName}" ON public."${tableName}" FOR INSERT WITH CHECK (true);\n`;
      remainingSql += `CREATE POLICY "Allow public select on ${tableName}" ON public."${tableName}" FOR SELECT USING (true);\n\n`;
    }
  }

  fs.writeFileSync(path.join(ROOT_DIR, 'data', 'active_tabs_manifest.json'), JSON.stringify(manifest, null, 2), 'utf8');
  fs.writeFileSync(path.join(ROOT_DIR, 'data', 'create_remaining_tables.sql'), remainingSql, 'utf8');
  console.log(`📝 Updated data/active_tabs_manifest.json and data/create_remaining_tables.sql for all 31 sheets!\n`);

  // 3. Check each table directly in Supabase and upload any missing/new rows
  let readyCount = 0;
  let missingTables = [];
  let schemaMismatchTables = [];

  for (const t of parsedTabs) {
    const status = await checkTableStatus(t.tableName);
    if (!status.exists) {
      console.log(`❌ Table "${t.tableName.padEnd(28)}" (${String(t.records.length).padStart(4)} rows) -> NOT CREATED IN SUPABASE YET`);
      missingTables.push(t);
      continue;
    }

    if (t.records.length === 0) {
      console.log(`✅ Table "${t.tableName.padEnd(28)}" (   0 rows) -> Exists in Supabase (${status.existingCount} rows in DB)`);
      readyCount++;
      continue;
    }

    if (status.existingCount >= t.records.length) {
      console.log(`✅ Table "${t.tableName.padEnd(28)}" (${String(t.records.length).padStart(4)} rows) -> Already migrated (${status.existingCount} rows in DB)`);
      readyCount++;
      continue;
    }

    const deltaRecords = t.records.slice(status.existingCount);
    console.log(`📤 Uploading ${deltaRecords.length} new rows (${status.existingCount} -> ${t.records.length}) to "public.${t.tableName}"...`);
    let uploaded = status.existingCount;
    let failed = false;
    for (let i = 0; i < deltaRecords.length; i += BATCH_SIZE) {
      const chunk = deltaRecords.slice(i, i + BATCH_SIZE);
      const insRes = await fetch(`${SUPABASE_URL}/rest/v1/${t.tableName}`, {
        method: 'POST',
        headers: {
          'apikey': API_KEY,
          'Authorization': `Bearer ${API_KEY}`,
          'Content-Type': 'application/json',
          'Prefer': 'return=minimal'
        },
        body: JSON.stringify(chunk)
      });

      if (!insRes.ok) {
        const err = await insRes.text();
        console.error(`   ⚠️ Schema/upload mismatch on "${t.tableName}": ${err}`);
        schemaMismatchTables.push(t);
        failed = true;
        break;
      }
      uploaded += chunk.length;
      console.log(`   🚀 ${t.tableName}: ${uploaded}/${t.records.length} rows (${Math.round((uploaded / t.records.length) * 100)}%)`);
    }
    if (!failed) readyCount++;
  }

  console.log(`\n======================================================`);
  console.log(`📊 SUMMARY: ${readyCount}/${parsedTabs.length} sheets synced in Supabase.`);
  if (missingTables.length > 0 || schemaMismatchTables.length > 0) {
    console.log(`⚠️ ${missingTables.length} tables need to be created and ${schemaMismatchTables.length} tables need schema update.`);
    console.log(`👉 Run "data/create_remaining_tables.sql" in Supabase SQL Editor, then re-run this script!`);
  }
  console.log(`======================================================`);
}

run().catch(console.error);
