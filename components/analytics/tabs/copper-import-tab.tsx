'use client'

import React, { useState, useEffect, useRef } from 'react'
import {
  Upload,
  FileSpreadsheet,
  CheckCircle2,
  AlertCircle,
  Download,
  RefreshCw,
  Database,
  Layers,
  Table,
  ShieldCheck,
  Play,
  FileCheck2
} from 'lucide-react'

interface FailedRecord {
  batch_index?: number
  row_number?: number
  profile_id: string
  company_name?: string
  source_sheet?: string
  reason: string
}

const EXPECTED_MAPPING: { sourceAliases: string[]; targetColumn: string; required?: boolean }[] = [
  { sourceAliases: ['profile_id', 'record_id', 'organization_id', 'rank_id'], targetColumn: 'profile_id', required: true },
  { sourceAliases: ['full_name', 'name'], targetColumn: 'full_name' },
  { sourceAliases: ['company_name', 'company', 'organization_name', 'legal_name'], targetColumn: 'company_name' },
  { sourceAliases: ['designation', 'role', 'job_title'], targetColumn: 'designation' },
  { sourceAliases: ['industry', 'provider_category', 'organization_type', 'target_industries'], targetColumn: 'industry' },
  { sourceAliases: ['location', 'locality_and_address', 'india_hq_city', 'city', 'country'], targetColumn: 'location' },
  { sourceAliases: ['linkedin_url', 'linkedin'], targetColumn: 'linkedin_url' },
  { sourceAliases: ['website', 'company_website', 'web_url', 'domain'], targetColumn: 'website' },
  { sourceAliases: ['business_email', 'email', 'email_contact', 'work_email'], targetColumn: 'business_email' },
  { sourceAliases: ['phone', 'phone_contact'], targetColumn: 'phone' },
  { sourceAliases: ['source_url', 'web_url', 'source_id'], targetColumn: 'source_url' },
  { sourceAliases: ['source_file'], targetColumn: 'source_file' },
  { sourceAliases: ['source_sheet'], targetColumn: 'source_sheet' },
  { sourceAliases: ['capture_date', 'last_verified_date', 'created_at'], targetColumn: 'capture_date' }
]

function normalizeCol(col: string): string {
  return String(col || '')
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
}

function parseCSVBrowser(text: string): { headers: string[]; rows: Record<string, string>[] } {
  const clean = text.replace(/^\uFEFF/, '')
  const parsedRows: string[][] = []
  let currentRow: string[] = []
  let currentField = ''
  let inQuotes = false

  for (let i = 0; i < clean.length; i++) {
    const ch = clean[i]
    const next = clean[i + 1]
    if (inQuotes) {
      if (ch === '"' && next === '"') {
        currentField += '"'
        i++
      } else if (ch === '"') {
        inQuotes = false
      } else {
        currentField += ch
      }
    } else {
      if (ch === '"') {
        inQuotes = true
      } else if (ch === ',') {
        currentRow.push(currentField)
        currentField = ''
      } else if (ch === '\r') {
        if (next === '\n') i++
        currentRow.push(currentField)
        parsedRows.push(currentRow)
        currentRow = []
        currentField = ''
      } else if (ch === '\n') {
        currentRow.push(currentField)
        parsedRows.push(currentRow)
        currentRow = []
        currentField = ''
      } else {
        currentField += ch
      }
    }
  }
  if (currentField || currentRow.length > 0) {
    currentRow.push(currentField)
    parsedRows.push(currentRow)
  }

  if (parsedRows.length === 0) return { headers: [], rows: [] }
  const headers = parsedRows[0].map(h => h.trim())
  const rows: Record<string, string>[] = []

  for (let i = 1; i < parsedRows.length; i++) {
    const r = parsedRows[i]
    if (!r || r.every(c => !c || !c.trim())) continue
    const obj: Record<string, string> = {}
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = r[j] ?? ''
    }
    rows.push(obj)
  }

  return { headers, rows }
}

export function CopperImportTab() {
  const fileInputRef = useRef<HTMLInputElement | null>(null)
  const [serverData, setServerData] = useState<any>(null)
  const [loadingServer, setLoadingServer] = useState(true)

  // Uploaded CSV state
  const [fileName, setFileName] = useState<string>('')
  const [csvHeaders, setCsvHeaders] = useState<string[]>([])
  const [csvRows, setCsvRows] = useState<Record<string, string>[]>([])
  const [previewRows, setPreviewRows] = useState<Record<string, string>[]>([])
  const [columnValidation, setColumnValidation] = useState<
    { targetColumn: string; matchedSource: string | null; status: 'MAPPED' | 'AUTO_DEFAULT' }[]
  >([])

  // Live import execution state
  const [isImporting, setIsImporting] = useState(false)
  const [importProgressPct, setImportProgressPct] = useState(0)
  const [currentBatch, setCurrentBatch] = useState(0)
  const [totalBatches, setTotalBatches] = useState(0)
  const [insertedCount, setInsertedCount] = useState(0)
  const [updatedCount, setUpdatedCount] = useState(0)
  const [failedCount, setFailedCount] = useState(0)
  const [failedRecords, setFailedRecords] = useState<FailedRecord[]>([])
  const [finalStatus, setFinalStatus] = useState<string | null>(null)

  const fetchServerStatus = async () => {
    setLoadingServer(true)
    try {
      const res = await fetch('/api/copper/import')
      const data = await res.json()
      if (data.success) {
        setServerData(data)
        if (!fileName && data.report) {
          setInsertedCount(data.report.inserted_records || 0)
          setUpdatedCount(data.report.updated_records || 0)
          setFailedCount(data.report.failed_records || 0)
          setFailedRecords(data.failedRecords || [])
          setFinalStatus(data.report.import_execution_status || 'VERIFIED_SUCCESS')
          setImportProgressPct(100)
        }
      }
    } catch {
      // Ignore network fetch error on static preview
    } finally {
      setLoadingServer(false)
    }
  }

  useEffect(() => {
    fetchServerStatus()
  }, [])

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    setFileName(file.name)
    setFinalStatus('READY_TO_IMPORT')
    setImportProgressPct(0)
    setInsertedCount(0)
    setUpdatedCount(0)
    setFailedCount(0)
    setFailedRecords([])

    const text = await file.text()
    const { headers, rows } = parseCSVBrowser(text)
    setCsvHeaders(headers)
    setCsvRows(rows)
    setPreviewRows(rows.slice(0, 20))

    const normHeaderMap = new Map<string, string>()
    headers.forEach(h => normHeaderMap.set(normalizeCol(h), h))

    const validation = EXPECTED_MAPPING.map(item => {
      let matched: string | null = null
      for (const alias of item.sourceAliases) {
        if (normHeaderMap.has(alias)) {
          matched = normHeaderMap.get(alias) || alias
          break
        }
      }
      return {
        targetColumn: item.targetColumn,
        matchedSource: matched,
        status: matched ? ('MAPPED' as const) : ('AUTO_DEFAULT' as const)
      }
    })
    setColumnValidation(validation)
  }

  const runBatchImport = async () => {
    if (csvRows.length === 0) return
    setIsImporting(true)
    setFinalStatus('IMPORTING_BATCHES')
    setInsertedCount(0)
    setUpdatedCount(0)
    setFailedCount(0)
    setFailedRecords([])

    const BATCH_SIZE = 500
    const batches = Math.ceil(csvRows.length / BATCH_SIZE)
    setTotalBatches(batches)

    let accInserted = 0
    let accUpdated = 0
    let accFailed = 0
    const accErrors: FailedRecord[] = []

    for (let b = 0; b < batches; b++) {
      setCurrentBatch(b + 1)
      const slice = csvRows.slice(b * BATCH_SIZE, (b + 1) * BATCH_SIZE)
      try {
        const res = await fetch('/api/copper/import', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            fileName,
            sourceSheet: fileName.replace(/\.csv$/i, ''),
            startIndex: b * BATCH_SIZE,
            records: slice
          })
        })
        const data = await res.json()
        if (res.ok && data.success) {
          accInserted += Number(data.inserted || 0)
          accUpdated += Number(data.updated || 0)
          accFailed += Number(data.failed || 0)
          if (Array.isArray(data.errors) && data.errors.length > 0) {
            accErrors.push(...data.errors)
          }
        } else {
          accFailed += slice.length
          accErrors.push({
            profile_id: `BATCH_${b + 1}`,
            reason: data.message || `Batch ${b + 1} HTTP failure`
          })
        }
      } catch (err: any) {
        accFailed += slice.length
        accErrors.push({
          profile_id: `BATCH_${b + 1}`,
          reason: err?.message || 'Network error during batch import'
        })
      }

      setInsertedCount(accInserted)
      setUpdatedCount(accUpdated)
      setFailedCount(accFailed)
      setFailedRecords([...accErrors])
      setImportProgressPct(Math.round(((b + 1) / batches) * 100))
    }

    setIsImporting(false)
    setFinalStatus(accFailed === 0 ? 'VERIFIED_SUCCESS' : 'COMPLETED_WITH_ERRORS')
    fetchServerStatus()
  }

  const downloadFailedReportClient = () => {
    if (failedRecords.length === 0) {
      window.location.href = '/api/copper/report?type=failed'
      return
    }
    const lines = [
      'Profile_ID,Company_Name,Source_Sheet,Failure_Reason',
      ...failedRecords.map(
        r =>
          `"${String(r.profile_id || '').replace(/"/g, '""')}","${String(r.company_name || '').replace(/"/g, '""')}","${String(r.source_sheet || '').replace(/"/g, '""')}","${String(r.reason || '').replace(/"/g, '""')}"`
      )
    ]
    const blob = new Blob([lines.join('\n')], { type: 'text/csv;charset=utf-8;' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `Copper_Failed_Records_${new Date().toISOString().slice(0, 10)}.csv`
    a.click()
    URL.revokeObjectURL(url)
  }

  const activeTotalRecords = csvRows.length > 0 ? csvRows.length : serverData?.report?.total_input_records || 0
  const activeFileName = fileName || serverData?.report?.source_file || 'copper_master_dataset.csv'
  const activePreview = previewRows.length > 0 ? previewRows : serverData?.previewRecords || []
  const dbTotal = serverData?.liveSummary?.total_records_in_supabase ?? serverData?.report?.total_records_in_supabase ?? 0

  return (
    <div className="space-y-6 font-sans">
      {/* Architecture Stage Header Banner */}
      <div className="rounded-xl border border-amber-500/30 bg-gradient-to-br from-slate-900/95 via-slate-950/90 to-amber-950/20 p-5 shadow-2xl">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-xl bg-amber-500/15 border border-amber-500/40 text-amber-400">
              <Database className="h-6 w-6" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h2 className="text-base font-bold text-white">
                  Copper Profiles Database — Master CSV Ingestion & Verification
                </h2>
                <span className="text-[10px] font-mono px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 font-bold border border-amber-500/40">
                  STAGE 1: COPPER ACTIVE
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-1">
                Pipeline Architecture: <strong className="text-amber-400">COPPER (Raw Extracted Profiles)</strong> →{' '}
                <span className="text-slate-500">SILVER → GOLD → DIAMOND (Future Stages Preserved)</span>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            <a
              href="/api/copper/report?type=xlsx"
              className="px-3.5 py-2 rounded-lg bg-emerald-500/15 hover:bg-emerald-500/25 text-emerald-300 border border-emerald-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all"
            >
              <FileSpreadsheet className="h-4 w-4" />
              Download Copper_Import_Report.xlsx
            </a>
            <button
              onClick={downloadFailedReportClient}
              className="px-3.5 py-2 rounded-lg bg-rose-500/15 hover:bg-rose-500/25 text-rose-300 border border-rose-500/30 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <Download className="h-4 w-4" />
              Download Failed Records Report
            </button>
            <button
              onClick={fetchServerStatus}
              disabled={loadingServer}
              className="px-3 py-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold flex items-center gap-1.5 transition-all cursor-pointer"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loadingServer ? 'animate-spin' : ''}`} />
              Sync DB Status
            </button>
          </div>
        </div>
      </div>

      {/* Upload CSV & Batch Execution Control Panel */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2 rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white flex items-center gap-2">
              <Upload className="h-4 w-4 text-cyan-400" />
              Upload Consolidated CSV Dataset
            </h3>
            <span className="text-[11px] font-mono text-slate-400">
              Batch Size: 500 records/batch • Safe Non-Null Upsert on profile_id
            </span>
          </div>

          <div
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-slate-700 hover:border-cyan-500/60 rounded-xl p-6 text-center bg-slate-950/50 cursor-pointer transition-all"
          >
            <input
              ref={fileInputRef}
              type="file"
              accept=".csv"
              onChange={handleFileChange}
              className="hidden"
            />
            <FileSpreadsheet className="h-8 w-8 text-cyan-400 mx-auto mb-2" />
            <p className="text-xs font-semibold text-slate-200">
              Click to select a CSV file or inspect active master dataset
            </p>
            <p className="text-[11px] text-slate-400 mt-1 font-mono">
              Active File: <span className="text-cyan-300">{activeFileName}</span> ({activeTotalRecords.toLocaleString()} total records)
            </p>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2 pt-1">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="text-slate-300">
                Import Progress:{' '}
                <strong className="text-cyan-400">{importProgressPct}%</strong>
                {totalBatches > 0 && ` (Batch ${currentBatch} of ${totalBatches})`}
              </span>
              <span
                className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  finalStatus === 'VERIFIED_SUCCESS'
                    ? 'bg-emerald-500/20 text-emerald-300 border border-emerald-500/40'
                    : finalStatus === 'IMPORTING_BATCHES'
                    ? 'bg-cyan-500/20 text-cyan-300 border border-cyan-500/40'
                    : 'bg-amber-500/20 text-amber-300 border border-amber-500/40'
                }`}
              >
                Status: {finalStatus || serverData?.progress?.status || 'READY'}
              </span>
            </div>
            <div className="w-full h-2.5 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-amber-500 via-cyan-500 to-emerald-500 transition-all duration-300"
                style={{ width: `${importProgressPct}%` }}
              />
            </div>
          </div>

          <div className="flex items-center justify-between pt-2">
            <div className="text-[11px] text-slate-400 font-mono">
              Target Table: <code className="text-amber-300">public.copper_profiles</code>
            </div>
            <button
              onClick={runBatchImport}
              disabled={isImporting || csvRows.length === 0}
              className="px-4 py-2 rounded-lg bg-cyan-500 hover:bg-cyan-400 disabled:opacity-40 text-slate-950 font-bold text-xs flex items-center gap-2 transition-all cursor-pointer"
            >
              <Play className="h-3.5 w-3.5" />
              {isImporting
                ? `Importing Batch ${currentBatch}/${totalBatches}...`
                : csvRows.length > 0
                ? `Start Batch Import (${csvRows.length.toLocaleString()} rows)`
                : 'Select CSV File to Run New Browser Import'}
            </button>
          </div>
        </div>

        {/* Live Telemetry & Verification Counters */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 flex flex-col justify-between space-y-4">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <ShieldCheck className="h-4 w-4 text-emerald-400" />
            Import & Verification Telemetry
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-3 rounded-lg bg-slate-950/70 border border-slate-800">
              <span className="text-[10px] font-mono uppercase text-slate-400 block">Total CSV Records</span>
              <span className="text-base font-bold text-white font-mono mt-0.5 block">
                {activeTotalRecords.toLocaleString()}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/70 border border-emerald-500/30">
              <span className="text-[10px] font-mono uppercase text-emerald-400 block">Successful (Inserted)</span>
              <span className="text-base font-bold text-emerald-300 font-mono mt-0.5 block">
                {insertedCount.toLocaleString()}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/70 border border-cyan-500/30">
              <span className="text-[10px] font-mono uppercase text-cyan-400 block">Updated (Upsert Merge)</span>
              <span className="text-base font-bold text-cyan-300 font-mono mt-0.5 block">
                {updatedCount.toLocaleString()}
              </span>
            </div>
            <div className="p-3 rounded-lg bg-slate-950/70 border border-rose-500/30">
              <span className="text-[10px] font-mono uppercase text-rose-400 block">Failed Records</span>
              <span className="text-base font-bold text-rose-300 font-mono mt-0.5 block">
                {failedCount.toLocaleString()}
              </span>
            </div>
          </div>

          <div className="p-3.5 rounded-lg bg-amber-950/20 border border-amber-500/30 flex items-center justify-between">
            <div>
              <span className="text-[10px] font-mono uppercase text-amber-300 block">
                Verified Records in Supabase
              </span>
              <span className="text-lg font-bold text-white font-mono">
                {Number(dbTotal).toLocaleString()}
              </span>
            </div>
            <CheckCircle2 className="h-6 w-6 text-emerald-400" />
          </div>
        </div>
      </div>

      {/* Column Mapping Validation Matrix */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <FileCheck2 className="h-4 w-4 text-cyan-400" />
            Column Mapping Validation ({csvHeaders.length > 0 ? `${csvHeaders.length} Uploaded Columns` : '18 Master Schema Columns'})
          </h3>
          <span className="text-xs font-mono text-emerald-400">
            Unmapped columns automatically preserved in raw_data JSONB
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-2.5">
          {(columnValidation.length > 0
            ? columnValidation
            : EXPECTED_MAPPING.map(m => ({
                targetColumn: m.targetColumn,
                matchedSource: m.sourceAliases[0],
                status: 'MAPPED' as const
              }))
          ).map(col => (
            <div
              key={col.targetColumn}
              className="p-2.5 rounded-lg bg-slate-950/70 border border-slate-800 text-xs font-mono"
            >
              <div className="flex items-center justify-between">
                <span className="text-cyan-300 font-semibold truncate">{col.targetColumn}</span>
                <span
                  className={`h-2 w-2 rounded-full ${
                    col.status === 'MAPPED' ? 'bg-emerald-400' : 'bg-amber-400'
                  }`}
                />
              </div>
              <div className="text-[10px] text-slate-400 truncate mt-1">
                ← {col.matchedSource || 'NULL / Auto'}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Preview First 20 Records */}
      <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-white flex items-center gap-2">
            <Table className="h-4 w-4 text-amber-400" />
            Preview First 20 Records ({fileName ? `Uploaded File: ${fileName}` : 'Live Supabase copper_profiles'})
          </h3>
          <span className="text-xs font-mono text-slate-400">
            Showing {Math.min(20, activePreview.length)} of {activeTotalRecords.toLocaleString()} records
          </span>
        </div>

        <div className="overflow-x-auto border border-slate-800 rounded-lg">
          <table className="w-full text-left border-collapse text-xs font-mono">
            <thead>
              <tr className="bg-slate-950 border-b border-slate-800 text-slate-300">
                <th className="py-2.5 px-3">#</th>
                <th className="py-2.5 px-3">Profile_ID</th>
                <th className="py-2.5 px-3">Full_Name</th>
                <th className="py-2.5 px-3">Company_Name</th>
                <th className="py-2.5 px-3">Designation</th>
                <th className="py-2.5 px-3">Industry</th>
                <th className="py-2.5 px-3">Location</th>
                <th className="py-2.5 px-3">Business_Email</th>
                <th className="py-2.5 px-3">Phone</th>
                <th className="py-2.5 px-3">Source_Sheet</th>
                <th className="py-2.5 px-3">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/70">
              {activePreview.slice(0, 20).map((row: any, i: number) => {
                const pid = row.profile_id || row.Profile_ID || row['Record ID'] || row.organization_id || row.Rank_ID || row.Record_ID || `ROW-${i + 1}`
                const name = row.full_name || row.Full_Name || 'NULL'
                const comp = row.company_name || row.Company_Name || row.Company || row.organization_name || 'NULL'
                const desig = row.designation || row.Designation || 'NULL'
                const ind = row.industry || row.Industry || row.Provider_Category || row.Organization_Type || 'NULL'
                const loc = row.location || row.Location || row.India_HQ_City || row.City || 'NULL'
                const email = row.business_email || row.Business_Email || row.Email || row.Email_Contact || 'NULL'
                const phone = row.phone || row.Phone || row.Phone_Contact || 'NULL'
                const sheet = row.source_sheet || row.Source_Sheet || fileName || 'COPPER'
                const status = row.data_status || row.Data_Status || 'COPPER'

                return (
                  <tr key={i} className="hover:bg-slate-800/40 text-slate-200">
                    <td className="py-2 px-3 text-slate-500">{i + 1}</td>
                    <td className="py-2 px-3 text-amber-300 font-semibold whitespace-nowrap">{pid}</td>
                    <td className="py-2 px-3 whitespace-nowrap">{name}</td>
                    <td className="py-2 px-3 whitespace-nowrap max-w-[220px] truncate">{comp}</td>
                    <td className="py-2 px-3 whitespace-nowrap max-w-[180px] truncate">{desig}</td>
                    <td className="py-2 px-3 whitespace-nowrap max-w-[180px] truncate">{ind}</td>
                    <td className="py-2 px-3 whitespace-nowrap max-w-[180px] truncate">{loc}</td>
                    <td className="py-2 px-3 whitespace-nowrap text-cyan-300">{email}</td>
                    <td className="py-2 px-3 whitespace-nowrap">{phone}</td>
                    <td className="py-2 px-3 whitespace-nowrap">{sheet}</td>
                    <td className="py-2 px-3 whitespace-nowrap">
                      <span className="px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 text-[10px]">
                        {status}
                      </span>
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

