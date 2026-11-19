import fs from 'fs';
import path from 'path';
import crypto from 'crypto';

const ROOT_DIR = process.cwd();
const SHEETS_DIR = path.join(ROOT_DIR, 'data', 'copper_sheets');
const MASTER_CSV_PATH = path.join(ROOT_DIR, 'data', 'copper_master_dataset.csv');
const SOURCE_FILE_NAME = 'Datas_Automation (1D6hEr4Qtwoup87SAYrYe8U_sIOBWNzzF-9PdiI01qVo)';

// Restore uncorrupted formula values for ISO and ERP sheets if raw JSON exists
for (const name of ['ISO_Consultants_5_Cities', 'Top_100_Manufacturing_ERP_India']) {
  const rawJsonPath = path.join(SHEETS_DIR, `${name}_raw.json`);
  if (fs.existsSync(rawJsonPath)) {
    const rawContent = fs.readFileSync(rawJsonPath, 'utf8').replace(/^\uFEFF/, '');
    const rows = JSON.parse(rawContent);
    const csvContent = rows
      .map(row =>
        row
          .map(cell => {
            const str = String(cell ?? '').replace(/^=/, '');
            return /[",\n\r]/.test(str) ? `"${str.replace(/"/g, '""')}"` : str;
          })
          .join(',')
      )
      .join('\n');
    fs.writeFileSync(path.join(SHEETS_DIR, `${name}.csv`), csvContent, 'utf8');
  }
}

export function parseCSV(text) {
  const cleanText = text.replace(/^\uFEFF/, '');
  const rows = [];
  let currentRow = [];
  let currentField = '';
  let insideQuotes = false;

  for (let i = 0; i < cleanText.length; i++) {
    const char = cleanText[i];
    const nextChar = cleanText[i + 1];

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

function escapeCSVField(val) {
  if (val === null || val === undefined) return '';
  const str = typeof val === 'object' ? JSON.stringify(val) : String(val);
  if (/[",\n\r]/.test(str)) {
    return `"${str.replace(/"/g, '""')}"`;
  }
  return str;
}

const MISSING_MARKERS = new Set([
  '',
  'null',
  'n/a',
  'na',
  'none',
  'not publicly available',
  'not publicly disclosed',
  'unknown',
  '-'
]);

export function cleanNullableValue(val) {
  if (val === null || val === undefined) return null;
  const trimmed = String(val).trim();
  if (!trimmed) return null;
  if (MISSING_MARKERS.has(trimmed.toLowerCase())) return null;
  return trimmed;
}

export function normalizeColumnKey(col) {
  return String(col || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '');
}

const MAPPED_NORMALIZED_KEYS = new Set([
  'profile_id',
  'record_id',
  'organization_id',
  'rank_id',
  'full_name',
  'name',
  'company_name',
  'company',
  'organization_name',
  'designation',
  'role',
  'job_title',
  'industry',
  'provider_category',
  'organization_type',
  'location',
  'india_hq_city',
  'locality_and_address',
  'linkedin_url',
  'linkedin',
  'website',
  'company_website',
  'web_url',
  'business_email',
  'email',
  'email_contact',
  'work_email',
  'phone',
  'phone_contact',
  'source_url',
  'source_id',
  'source_file',
  'source_sheet',
  'capture_date',
  'created_at',
  'last_verified_date',
  'data_status',
  'validation_status',
  'duplicate_status',
  'raw_data'
]);

export function mapRowToCopperRecord(rawRowObj, sheetName, rowIndex, sourceFile = SOURCE_FILE_NAME) {
  const normMap = {};
  const originalFields = {};

  for (const [k, v] of Object.entries(rawRowObj)) {
    const trimmedVal = v !== null && v !== undefined ? String(v).trim() : '';
    originalFields[k] = trimmedVal === '' ? null : trimmedVal;
    normMap[normalizeColumnKey(k)] = trimmedVal;
  }

  // 1. Determine or generate unique Profile_ID
  let rawProfileId =
    cleanNullableValue(normMap['profile_id']) ||
    cleanNullableValue(normMap['record_id']) ||
    cleanNullableValue(normMap['organization_id']) ||
    cleanNullableValue(normMap['rank_id']);

  let profileId = rawProfileId;
  let profileIdGenerated = false;

  if (profileId) {
    // Disambiguate numeric-only IDs across specialized sheets (e.g., 1..100 in ERP and ISO sheets)
    if (/^\d+$/.test(profileId)) {
      if (sheetName === 'Top_100_Manufacturing_ERP_India') {
        profileId = `ERP-IND-${profileId.padStart(4, '0')}`;
      } else if (sheetName === 'ISO_Consultants_5_Cities') {
        profileId = `ISO-5C-${profileId.padStart(4, '0')}`;
      } else {
        profileId = `${sheetName.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)}-${profileId.padStart(6, '0')}`;
      }
    }
  } else {
    profileIdGenerated = true;
    const hashInput = `${sheetName}|${rowIndex}|${normMap['company_name'] || normMap['company'] || normMap['organization_name'] || ''}|${normMap['full_name'] || ''}|${normMap['email'] || normMap['business_email'] || ''}`;
    const hash = crypto.createHash('sha256').update(hashInput).digest('hex').slice(0, 12);
    profileId = `COPPER-${hash.toUpperCase()}`;
  }

  // 2. Map standard Copper schema columns
  const fullName = cleanNullableValue(normMap['full_name'] || normMap['name']);

  const companyName =
    cleanNullableValue(normMap['company_name']) ||
    cleanNullableValue(normMap['company']) ||
    cleanNullableValue(normMap['organization_name']) ||
    cleanNullableValue(normMap['legal_name']);

  const designation =
    cleanNullableValue(normMap['designation']) ||
    cleanNullableValue(normMap['role']) ||
    cleanNullableValue(normMap['job_title']);

  const industry =
    cleanNullableValue(normMap['industry']) ||
    cleanNullableValue(normMap['provider_category']) ||
    cleanNullableValue(normMap['organization_type']) ||
    cleanNullableValue(normMap['target_industries']);

  // Location assembly: explicit location -> locality_and_address -> india_hq_city -> city/state/country
  let location =
    cleanNullableValue(normMap['location']) ||
    cleanNullableValue(normMap['locality_and_address']) ||
    cleanNullableValue(normMap['india_hq_city']);

  if (!location) {
    const locParts = [
      cleanNullableValue(normMap['city']),
      cleanNullableValue(normMap['state']),
      cleanNullableValue(normMap['country'])
    ].filter(Boolean);
    if (locParts.length > 0) {
      location = locParts.join(', ');
    } else {
      location = cleanNullableValue(normMap['headquarters']) || cleanNullableValue(normMap['address']);
    }
  }

  const linkedinUrl =
    cleanNullableValue(normMap['linkedin_url']) ||
    cleanNullableValue(normMap['linkedin']);

  // Website resolution: company_website -> website -> domain -> web_url
  let website =
    cleanNullableValue(normMap['company_website']) ||
    cleanNullableValue(normMap['website']);
  const domain = cleanNullableValue(normMap['domain']);
  if (website && !website.startsWith('http') && !website.includes('.') && domain) {
    website = `https://${domain}`;
  } else if (!website && domain) {
    website = domain.startsWith('http') ? domain : `https://${domain}`;
  } else if (!website) {
    website = cleanNullableValue(normMap['web_url']);
  }

  const businessEmail =
    cleanNullableValue(normMap['business_email']) ||
    cleanNullableValue(normMap['email']) ||
    cleanNullableValue(normMap['email_contact']) ||
    cleanNullableValue(normMap['work_email']);

  const phone =
    cleanNullableValue(normMap['phone']) ||
    cleanNullableValue(normMap['phone_contact']);

  const sourceUrl =
    cleanNullableValue(normMap['source_url']) ||
    cleanNullableValue(normMap['web_url']) ||
    cleanNullableValue(normMap['source_id']) ||
    website;

  const finalSourceFile = cleanNullableValue(normMap['source_file']) || sourceFile;
  const finalSourceSheet = cleanNullableValue(normMap['source_sheet']) || sheetName;

  const captureDateRaw =
    cleanNullableValue(normMap['capture_date']) ||
    cleanNullableValue(normMap['last_verified_date']) ||
    cleanNullableValue(normMap['created_at']) ||
    cleanNullableValue(normMap['updated_at']);

  let captureDate = null;
  if (captureDateRaw) {
    const parsed = new Date(captureDateRaw);
    if (!isNaN(parsed.getTime())) {
      captureDate = parsed.toISOString();
    }
  }

  // 3. Collect additional unmapped fields + Phase 8 future architecture metadata into raw_data JSONB
  let unmappedFields = {};
  if (normMap['raw_data']) {
    try {
      unmappedFields = JSON.parse(normMap['raw_data']);
    } catch {
      unmappedFields = { raw_text: normMap['raw_data'] };
    }
  }

  for (const [origKey, origVal] of Object.entries(originalFields)) {
    const normKey = normalizeColumnKey(origKey);
    if (!MAPPED_NORMALIZED_KEYS.has(normKey)) {
      unmappedFields[origKey] = origVal;
    }
  }

  const rawData = {
    ...unmappedFields,
    _source_metadata: {
      original_record_id: rawProfileId,
      profile_id_generated: profileIdGenerated,
      source_file: finalSourceFile,
      source_sheet: finalSourceSheet,
      source_row_number: rowIndex,
      original_website_field: originalFields['Company_Website'] || originalFields['website'] || originalFields['Web_URL'] || null
    },
    _pipeline_architecture: {
      current_stage: 'COPPER',
      next_stages: ['SILVER', 'GOLD', 'DIAMOND'],
      qualification_status: 'PENDING',
      rejection_reason: null,
      preserved_at: new Date().toISOString()
    }
  };

  return {
    profile_id: profileId,
    full_name: fullName,
    company_name: companyName,
    designation,
    industry,
    location,
    linkedin_url: linkedinUrl,
    website,
    business_email: businessEmail,
    phone,
    source_url: sourceUrl,
    source_file: finalSourceFile,
    source_sheet: finalSourceSheet,
    capture_date: captureDate,
    data_status: 'COPPER',
    validation_status: 'PENDING',
    duplicate_status: 'PENDING',
    raw_data: rawData
  };
}

// Run consolidation if invoked directly
if (import.meta.url === `file://${process.argv[1].replace(/\\/g, '/')}` || process.argv[1]?.endsWith('consolidate-copper-dataset.mjs')) {
  const sheetOrder = [
    'EEPC',
    'Sheet2',
    'Sheet3',
    'Sheet4',
    'Sheet5',
    'Sheet6',
    'Top_100_Manufacturing_ERP_India',
    'ISO_Consultants_5_Cities'
  ];

  const masterHeaders = [
    'Profile_ID',
    'Full_Name',
    'Company_Name',
    'Designation',
    'Industry',
    'Location',
    'LinkedIn_URL',
    'Website',
    'Business_Email',
    'Phone',
    'Source_URL',
    'Source_File',
    'Source_Sheet',
    'Capture_Date',
    'Data_Status',
    'Validation_Status',
    'Duplicate_Status',
    'Raw_Data'
  ];

  const writeStream = fs.createWriteStream(MASTER_CSV_PATH, { encoding: 'utf8' });
  writeStream.write(masterHeaders.join(',') + '\n');

  let totalConsolidated = 0;
  const sheetStats = [];

  for (const sheetName of sheetOrder) {
    const csvPath = path.join(SHEETS_DIR, `${sheetName}.csv`);
    if (!fs.existsSync(csvPath)) continue;

    const content = fs.readFileSync(csvPath, 'utf8');
    if (!content.trim()) continue;

    const rows = parseCSV(content);
    const headers = rows[0].map(h => h.trim());
    const dataRows = rows.slice(1).filter(r => r.some(c => c && c.trim() !== ''));

    let sheetCount = 0;
    for (let i = 0; i < dataRows.length; i++) {
      const row = dataRows[i];
      const rawObj = {};
      for (let c = 0; c < headers.length; c++) {
        rawObj[headers[c]] = row[c] ?? '';
      }

      const mapped = mapRowToCopperRecord(rawObj, sheetName, i + 2, SOURCE_FILE_NAME);
      const csvLine = [
        escapeCSVField(mapped.profile_id),
        escapeCSVField(mapped.full_name),
        escapeCSVField(mapped.company_name),
        escapeCSVField(mapped.designation),
        escapeCSVField(mapped.industry),
        escapeCSVField(mapped.location),
        escapeCSVField(mapped.linkedin_url),
        escapeCSVField(mapped.website),
        escapeCSVField(mapped.business_email),
        escapeCSVField(mapped.phone),
        escapeCSVField(mapped.source_url),
        escapeCSVField(mapped.source_file),
        escapeCSVField(mapped.source_sheet),
        escapeCSVField(mapped.capture_date),
        escapeCSVField(mapped.data_status),
        escapeCSVField(mapped.validation_status),
        escapeCSVField(mapped.duplicate_status),
        escapeCSVField(JSON.stringify(mapped.raw_data))
      ].join(',');

      writeStream.write(csvLine + '\n');
      sheetCount++;
      totalConsolidated++;
    }

    sheetStats.push({ sheetName, rows: sheetCount });
    console.log(`✅ Consolidated ${sheetName.padEnd(32)}: ${sheetCount.toLocaleString()} rows`);
  }

  writeStream.end(() => {
    console.log(`\n🎉 Master CSV created at: ${MASTER_CSV_PATH}`);
    console.log(`📊 Total Consolidated Records: ${totalConsolidated.toLocaleString()}`);
  });
}

