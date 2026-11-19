import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'

export const dynamic = 'force-dynamic'

export async function GET(req: NextRequest) {
  const type = req.nextUrl.searchParams.get('type') || 'xlsx'
  const rootDir = process.cwd()

  if (type === 'failed') {
    const failedCsvPath = path.join(rootDir, 'data', 'copper_failed_records.csv')
    const content = fs.existsSync(failedCsvPath)
      ? fs.readFileSync(failedCsvPath, 'utf8')
      : 'Profile_ID,Company_Name,Source_Sheet,Failure_Reason\n'

    return new NextResponse(content, {
      status: 200,
      headers: {
        'Content-Type': 'text/csv; charset=utf-8',
        'Content-Disposition': 'attachment; filename="Copper_Failed_Records_Report.csv"'
      }
    })
  }

  const xlsxPath = path.join(rootDir, 'Copper_Import_Report.xlsx')
  const fallbackXlsxPath = path.join(rootDir, 'data', 'Copper_Import_Report.xlsx')
  const targetPath = fs.existsSync(xlsxPath) ? xlsxPath : fallbackXlsxPath

  if (!fs.existsSync(targetPath)) {
    return NextResponse.json(
      { success: false, message: 'Copper_Import_Report.xlsx has not been generated yet.' },
      { status: 404 }
    )
  }

  const buffer = fs.readFileSync(targetPath)
  return new NextResponse(buffer, {
    status: 200,
    headers: {
      'Content-Type': 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      'Content-Disposition': 'attachment; filename="Copper_Import_Report.xlsx"'
    }
  })
}

