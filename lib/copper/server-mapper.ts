import crypto from 'crypto'

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
])

export function cleanNullableValue(val: unknown): string | null {
  if (val === null || val === undefined) return null
  const trimmed = String(val).trim()
  if (!trimmed) return null
  if (MISSING_MARKERS.has(trimmed.toLowerCase())) return null
  return trimmed
}

export function normalizeColumnKey(col: string): string {
  return String(col || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

export const MAPPED_NORMALIZED_KEYS = new Set([
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
])

export interface CopperProfileRecord {
  profile_id: string
  full_name: string | null
  company_name: string | null
  designation: string | null
  industry: string | null
  location: string | null
  linkedin_url: string | null
  website: string | null
  business_email: string | null
  phone: string | null
  source_url: string | null
  source_file: string | null
  source_sheet: string | null
  capture_date: string | null
  data_status: string
  validation_status: string
  duplicate_status: string
  raw_data: Record<string, any>
}

export function getSupabaseServerCredentials() {
  const url = (process.env.SUPABASE_URL || process.env.NEXT_PUBLIC_SUPABASE_URL || '').replace(/\/$/, '')
  const serviceRoleKey =
    process.env.SUPABASE_SERVICE_ROLE_KEY ||
    process.env.SUPABASE_KEY ||
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ||
    ''
  return { url, serviceRoleKey }
}

export function mapRawRowToCopperProfile(
  rawRowObj: Record<string, any>,
  sheetName: string,
  rowIndex: number,
  sourceFile: string
): CopperProfileRecord {
  const normMap: Record<string, string> = {}
  const originalFields: Record<string, string | null> = {}

  for (const [k, v] of Object.entries(rawRowObj)) {
    const trimmedVal = v !== null && v !== undefined ? String(v).trim() : ''
    originalFields[k] = trimmedVal === '' ? null : trimmedVal
    normMap[normalizeColumnKey(k)] = trimmedVal
  }

  let rawProfileId =
    cleanNullableValue(normMap['profile_id']) ||
    cleanNullableValue(normMap['record_id']) ||
    cleanNullableValue(normMap['organization_id']) ||
    cleanNullableValue(normMap['rank_id'])

  let profileId = rawProfileId
  let profileIdGenerated = false

  if (profileId) {
    if (/^\d+$/.test(profileId)) {
      if (sheetName === 'Top_100_Manufacturing_ERP_India') {
        profileId = `ERP-IND-${profileId.padStart(4, '0')}`
      } else if (sheetName === 'ISO_Consultants_5_Cities') {
        profileId = `ISO-5C-${profileId.padStart(4, '0')}`
      } else {
        profileId = `${sheetName.toUpperCase().replace(/[^A-Z0-9]/g, '').slice(0, 8)}-${profileId.padStart(6, '0')}`
      }
    }
  } else {
    profileIdGenerated = true
    const hashInput = `${sheetName}|${rowIndex}|${normMap['company_name'] || normMap['company'] || normMap['organization_name'] || ''}|${normMap['full_name'] || ''}|${normMap['email'] || normMap['business_email'] || ''}`
    const hash = crypto.createHash('sha256').update(hashInput).digest('hex').slice(0, 12)
    profileId = `COPPER-${hash.toUpperCase()}`
  }

  const fullName = cleanNullableValue(normMap['full_name'] || normMap['name'])

  const companyName =
    cleanNullableValue(normMap['company_name']) ||
    cleanNullableValue(normMap['company']) ||
    cleanNullableValue(normMap['organization_name']) ||
    cleanNullableValue(normMap['legal_name'])

  const designation =
    cleanNullableValue(normMap['designation']) ||
    cleanNullableValue(normMap['role']) ||
    cleanNullableValue(normMap['job_title'])

  const industry =
    cleanNullableValue(normMap['industry']) ||
    cleanNullableValue(normMap['provider_category']) ||
    cleanNullableValue(normMap['organization_type']) ||
    cleanNullableValue(normMap['target_industries'])

  let location =
    cleanNullableValue(normMap['location']) ||
    cleanNullableValue(normMap['locality_and_address']) ||
    cleanNullableValue(normMap['india_hq_city'])

  if (!location) {
    const locParts = [
      cleanNullableValue(normMap['city']),
      cleanNullableValue(normMap['state']),
      cleanNullableValue(normMap['country'])
    ].filter(Boolean)
    if (locParts.length > 0) {
      location = locParts.join(', ')
    } else {
      location = cleanNullableValue(normMap['headquarters']) || cleanNullableValue(normMap['address'])
    }
  }

  const linkedinUrl =
    cleanNullableValue(normMap['linkedin_url']) ||
    cleanNullableValue(normMap['linkedin'])

  let website =
    cleanNullableValue(normMap['company_website']) ||
    cleanNullableValue(normMap['website'])
  const domain = cleanNullableValue(normMap['domain'])
  if (website && !website.startsWith('http') && !website.includes('.') && domain) {
    website = `https://${domain}`
  } else if (!website && domain) {
    website = domain.startsWith('http') ? domain : `https://${domain}`
  } else if (!website) {
    website = cleanNullableValue(normMap['web_url'])
  }

  const businessEmail =
    cleanNullableValue(normMap['business_email']) ||
    cleanNullableValue(normMap['email']) ||
    cleanNullableValue(normMap['email_contact']) ||
    cleanNullableValue(normMap['work_email'])

  const phone =
    cleanNullableValue(normMap['phone']) ||
    cleanNullableValue(normMap['phone_contact'])

  const sourceUrl =
    cleanNullableValue(normMap['source_url']) ||
    cleanNullableValue(normMap['web_url']) ||
    cleanNullableValue(normMap['source_id']) ||
    website

  const finalSourceFile = cleanNullableValue(normMap['source_file']) || sourceFile
  const finalSourceSheet = cleanNullableValue(normMap['source_sheet']) || sheetName

  const captureDateRaw =
    cleanNullableValue(normMap['capture_date']) ||
    cleanNullableValue(normMap['last_verified_date']) ||
    cleanNullableValue(normMap['created_at']) ||
    cleanNullableValue(normMap['updated_at'])

  let captureDate: string | null = null
  if (captureDateRaw) {
    const parsed = new Date(captureDateRaw)
    if (!isNaN(parsed.getTime())) {
      captureDate = parsed.toISOString()
    }
  }

  let unmappedFields: Record<string, any> = {}
  if (normMap['raw_data']) {
    try {
      unmappedFields = JSON.parse(normMap['raw_data'])
    } catch {
      unmappedFields = { raw_text: normMap['raw_data'] }
    }
  }

  for (const [origKey, origVal] of Object.entries(originalFields)) {
    const normKey = normalizeColumnKey(origKey)
    if (!MAPPED_NORMALIZED_KEYS.has(normKey)) {
      unmappedFields[origKey] = origVal
    }
  }

  const rawData = {
    ...unmappedFields,
    _source_metadata: {
      original_record_id: rawProfileId,
      profile_id_generated: profileIdGenerated,
      source_file: finalSourceFile,
      source_sheet: finalSourceSheet,
      source_row_number: rowIndex
    },
    _pipeline_architecture: {
      current_stage: 'COPPER',
      next_stages: ['SILVER', 'GOLD', 'DIAMOND'],
      qualification_status: 'PENDING',
      rejection_reason: null,
      preserved_at: new Date().toISOString()
    }
  }

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
  }
}

