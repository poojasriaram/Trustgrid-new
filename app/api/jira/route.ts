import { NextRequest, NextResponse } from 'next/server'
import { getJiraConfig } from '@/lib/jira-service'
import { checkRateLimit } from '@/lib/services/rate-limiter'

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const issueKey = searchParams.get('key')
  const email = searchParams.get('email')

  const jira = getJiraConfig()
  const authHeader = `Basic ${Buffer.from(`${jira.email}:${jira.apiToken}`).toString('base64')}`

  if (!jira.apiToken) {
    return NextResponse.json({
      success: true,
      mode: 'simulated',
      message: 'JIRA_API_TOKEN is not configured; running in simulation mode.'
    })
  }

  try {
    if (issueKey) {
      const res = await fetch(`${jira.baseUrl}/rest/api/3/issue/${issueKey}`, {
        headers: { Authorization: authHeader, Accept: 'application/json' }
      })
      if (!res.ok) {
        return NextResponse.json({ success: false, error: 'Issue not found' }, { status: 404 })
      }
      const data = await res.json()
      return NextResponse.json({
        success: true,
        key: data.key,
        status: data.fields?.status?.name,
        summary: data.fields?.summary,
        created: data.fields?.created
      })
    }

    if (email) {
      const jql = `project = "${jira.projectKey}" AND text ~ "${email}" ORDER BY created DESC`
      const res = await fetch(`${jira.baseUrl}/rest/api/3/search?jql=${encodeURIComponent(jql)}&maxResults=5`, {
        headers: { Authorization: authHeader, Accept: 'application/json' }
      })
      if (!res.ok) {
        return NextResponse.json({ success: false, error: 'Search failed' }, { status: res.status })
      }
      const data = await res.json()
      return NextResponse.json({
        success: true,
        total: data.total,
        issues: (data.issues || []).map((iss: any) => ({
          key: iss.key,
          summary: iss.fields?.summary,
          status: iss.fields?.status?.name
        }))
      })
    }

    return NextResponse.json({
      success: true,
      service: 'Jira Enterprise CRM Integration',
      projectKey: jira.projectKey,
      baseUrl: jira.baseUrl
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 })
  }
}

export async function POST(req: NextRequest) {
  const rateLimit = checkRateLimit(req, { limit: 30, identifier: 'api-jira' })
  if (!rateLimit.success) {
    return NextResponse.json({ success: false, error: 'Rate limit exceeded' }, { status: 429 })
  }

  try {
    const body = await req.json().catch(() => null)
    if (!body || !body.summary) {
      return NextResponse.json({ success: false, error: 'Missing issue summary' }, { status: 400 })
    }

    const jira = getJiraConfig()
    if (!jira.apiToken) {
      const simKey = `${jira.projectKey}-${Math.floor(1000 + Math.random() * 9000)}`
      return NextResponse.json({
        success: true,
        status: 'Simulated',
        issueKey: simKey,
        issueUrl: `${jira.baseUrl}/browse/${simKey}`
      })
    }

    const authHeader = `Basic ${Buffer.from(`${jira.email}:${jira.apiToken}`).toString('base64')}`
    const res = await fetch(`${jira.baseUrl}/rest/api/3/issue`, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        fields: {
          project: { key: jira.projectKey },
          summary: body.summary,
          description: {
            type: 'doc',
            version: 1,
            content: [
              {
                type: 'paragraph',
                content: [{ type: 'text', text: body.description || 'Enterprise Inquiry' }]
              }
            ]
          },
          issuetype: { name: body.issueType || 'Task' }
        }
      })
    })

    if (!res.ok) {
      const err = await res.text()
      return NextResponse.json({ success: false, error: err }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json({
      success: true,
      issueKey: data.key,
      issueUrl: `${jira.baseUrl}/browse/${data.key}`
    })
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err?.message }, { status: 500 })
  }
}
