import { NextRequest, NextResponse } from 'next/server'
import { insertLeadDb } from '@/lib/db/leads'
import { appendLeadToGoogleSheets } from '@/lib/services/google-sheets'
import { createLinkedInJiraLead } from '@/lib/services/jira'

export const dynamic = 'force-dynamic'

const TARGET_LINKEDIN_URL = 'https://www.linkedin.com/company/trustgridai/'

/**
 * GET /linkedin
 * When visited, this route automatically registers a live lead with:
 * - Source: LinkedIn
 * - Service: LinkedIn Company Page Visit
 * - Target: https://www.linkedin.com/company/trustgridai/posts/?feedView=all
 *
 * Saves to SQLite, sends to Google Sheets, creates a Jira DFX ticket,
 * and immediately redirects the user to the LinkedIn Company Page.
 */
export async function GET(req: NextRequest) {
  const searchParams = req.nextUrl.searchParams
  const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
  const userAgent = req.headers.get('user-agent') || 'Unknown Browser'
  const referrer = req.headers.get('referer') || 'Direct'

  const customName = searchParams.get('name') || 'LinkedIn Page Visitor'
  const customEmail = searchParams.get('email') || 'visitor.linkedin@trustgrid.ai'
  const customCompany = searchParams.get('company') || 'LinkedIn Company Page Prospect'

  const now = new Date()
  const dateStr = now.toISOString().slice(0, 10).replace(/-/g, '')
  const randomSuffix = Math.floor(1000 + Math.random() * 9000)
  const leadId = `TG-${dateStr}-${randomSuffix}`

  const leadRecord = {
    id: leadId,
    name: customName,
    email: customEmail,
    company: customCompany,
    phone: searchParams.get('phone') || '',
    message: `Visited official TrustGrid LinkedIn feed: ${TARGET_LINKEDIN_URL} | Referrer: ${referrer} | IP: ${ip}`,
    source: 'LinkedIn',
    service: 'LinkedIn Company Page Visit',
    website: 'TRUSTGRID.AI',
    createdAt: now.toISOString(),
    updatedAt: now.toISOString()
  }

  // 1. Store in SQLite Database
  try {
    insertLeadDb(leadRecord)
  } catch (err: any) {
    console.error('[LinkedIn Visit] SQLite insert error:', err?.message)
  }

  // 2. Dispatch to Google Sheets
  try {
    appendLeadToGoogleSheets({
      leadId,
      name: leadRecord.name,
      email: leadRecord.email,
      company: leadRecord.company,
      phone: leadRecord.phone,
      message: leadRecord.message,
      source: 'LinkedIn',
      service: 'LinkedIn Company Page Visit',
      createdAt: leadRecord.createdAt
    })
  } catch (err: any) {
    console.error('[LinkedIn Visit] Google Sheets dispatch error:', err?.message)
  }

  // 3. Create Jira Ticket in DealFlow (DFX)
  try {
    createLinkedInJiraLead({
      leadId,
      name: leadRecord.name,
      email: leadRecord.email,
      company: leadRecord.company,
      phone: leadRecord.phone,
      message: leadRecord.message,
      source: 'LinkedIn',
      service: 'LinkedIn Company Page Visit',
      website: 'TRUSTGRID.AI'
    })
  } catch (err: any) {
    console.error('[LinkedIn Visit] Jira dispatch error:', err?.message)
  }

  // 4. Redirect immediately to the LinkedIn Company Page
  return NextResponse.redirect(TARGET_LINKEDIN_URL, 307)
}
