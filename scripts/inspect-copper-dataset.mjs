import fs from 'fs';
import path from 'path';

const dir = path.resolve('data/copper_sheets');
const files = [
  'EEPC.csv',
  'Sheet2.csv',
  'Sheet3.csv',
  'Sheet4.csv',
  'Sheet5.csv',
  'Sheet6.csv',
  'Sheet7.csv',
  'Top_100_Manufacturing_ERP_India.csv',
  'ISO_Consultants_5_Cities.csv'
];

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

const summary = [];

for (const file of files) {
  const filePath = path.join(dir, file);
  const sheetName = file.replace(/\.csv$/, '');
  if (!fs.existsSync(filePath)) {
    summary.push({ sheetName, exists: false });
    continue;
  }
  const content = fs.readFileSync(filePath, 'utf8');
  if (!content.trim()) {
    summary.push({ sheetName, rowCount: 0, columns: [] });
    continue;
  }
  const rows = parseCSV(content);
  const headers = rows[0].map(h => h.trim());
  const dataRows = rows.slice(1).filter(r => r.some(c => c && c.trim() !== ''));

  const missingCounts = {};
  const sampleValues = {};
  headers.forEach(h => {
    missingCounts[h] = 0;
    sampleValues[h] = null;
  });

  for (const r of dataRows) {
    for (let i = 0; i < headers.length; i++) {
      const val = r[i] ? r[i].trim() : '';
      if (!val || val.toLowerCase() === 'null' || val.toLowerCase() === 'n/a' || val.toLowerCase() === 'not publicly available' || val.toLowerCase() === 'not publicly disclosed') {
        missingCounts[headers[i]]++;
      } else if (sampleValues[headers[i]] === null) {
        sampleValues[headers[i]] = val.slice(0, 80);
      }
    }
  }

  summary.push({
    sheetName,
    byteSize: content.length,
    rowCount: dataRows.length,
    columnCount: headers.length,
    columns: headers,
    missingCounts,
    sampleValues
  });
}

function getCol0Set(file) {
  const content = fs.readFileSync(path.join(dir, file), 'utf8');
  const rows = parseCSV(content).slice(1).filter(r => r.some(c => c && c.trim() !== ''));
  return rows.map(r => (r[0] || '').trim()).filter(Boolean);
}

const eepc = getCol0Set('EEPC.csv');
const s2 = getCol0Set('Sheet2.csv');
const s3 = getCol0Set('Sheet3.csv');
const s4 = getCol0Set('Sheet4.csv');
const s5 = getCol0Set('Sheet5.csv');
const s6 = getCol0Set('Sheet6.csv');
const erp = getCol0Set('Top_100_Manufacturing_ERP_India.csv');
const iso = getCol0Set('ISO_Consultants_5_Cities.csv');

const s2Set = new Set(s2);
const s4Set = new Set(s4);
const s5Set = new Set(s5);
const s6Set = new Set(s6);

console.log(JSON.stringify({
  summary: summary.map(s => ({ sheetName: s.sheetName, rowCount: s.rowCount, columnCount: s.columnCount })),
  overlaps: {
    s2_in_s3: s3.filter(x => s2Set.has(x)).length,
    s2_in_s4: s2.filter(x => s4Set.has(x)).length,
    s2_in_s5: s2.filter(x => s5Set.has(x)).length,
    s2_in_s6: s2.filter(x => s6Set.has(x)).length,
    s4_in_s5: s5.filter(x => s4Set.has(x)).length,
    s4_in_s6: s6.filter(x => s4Set.has(x)).length,
    s5_in_s6: s6.filter(x => s5Set.has(x)).length,
  },
  uniquePerSheet: {
    eepc: { total: eepc.length, unique: new Set(eepc).size },
    s2: { total: s2.length, unique: new Set(s2).size },
    s3: { total: s3.length, unique: new Set(s3).size },
    s4: { total: s4.length, unique: new Set(s4).size },
    s5: { total: s5.length, unique: new Set(s5).size },
    s6: { total: s6.length, unique: new Set(s6).size },
    erp: { total: erp.length, unique: new Set(erp).size },
    iso: { total: iso.length, unique: new Set(iso).size },
  }
}, null, 2));

