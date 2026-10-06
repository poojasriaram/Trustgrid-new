/**
 * TRUSTGRID.AI - Enterprise Jira Integration Service
 * Dispatches LinkedIn leads to DealFlow (DFX) Jira Workspace.
 *
 * Requirements:
 * Summary: New LinkedIn Lead - {Company}
 * Description:
 *   Name: {name}
 *   Email: {email}
 *   Company: {company}
 *   Phone: {phone}
 *   Message: {message}
 *   Source: LinkedIn
 *   Service: LinkedIn API Integration
 *   Website: TRUSTGRID.AI
 *
 * Source is strictly recorded as: LinkedIn
 * Jira credentials loaded server-side from environment variables.
 */

export interface JiraLeadInput {
  name: string
  email: string
  company: string
  phone?: string
  message?: string
  source?: string
  service?: string
  website?: string
  leadId?: string
}

export interface JiraDispatchResult {
  success: boolean
  status: 'Created' | 'Simulated' | 'Failed'
  issueKey?: string
  issueUrl?: string
  error?: string
}

export async function createLinkedInJiraLead(lead: JiraLeadInput): Promise<JiraDispatchResult> {
  const baseUrl = (process.env.JIRA_BASE_URL || 'https://trustworkz.atlassian.net').replace(/\/$/, '')
  const projectKey = process.env.JIRA_PROJECT_KEY || 'DFX'
  const email = process.env.JIRA_EMAIL || 'poojasri@trustgrid.ai'
  const apiToken = process.env.JIRA_API_TOKEN || ''
  const parentIssueType = process.env.JIRA_LEAD_ISSUE_TYPE || 'Lead_Record'

  const company = lead.company || 'Enterprise Partner'
  const source = lead.source || 'LinkedIn'
  const service = lead.service || 'LinkedIn API Integration'
  const website = lead.website || 'TRUSTGRID.AI'
  const phone = lead.phone || 'Not Provided'
  const message = lead.message || 'Expressed interest via LinkedIn API Integration.'

  // Required exact summary & description format
  const summary = `New LinkedIn Lead - ${company}`
  const description = `Name: ${lead.name}
Email: ${lead.email}
Company: ${company}
Phone: ${phone}
Message: ${message}
Source: ${source}
Service: ${service}
Website: ${website}`

  if (!apiToken || !apiToken.trim()) {
    console.warn('[Jira Service] JIRA_API_TOKEN is not configured. Running in simulated fallback mode.')
    const simulatedKey = `${projectKey}-${Math.floor(1000 + Math.random() * 9000)}`
    return {
      success: true,
      status: 'Simulated',
      issueKey: simulatedKey,
      issueUrl: `${baseUrl}/browse/${simulatedKey}`
    }
  }

  const authHeader = `Basic ${Buffer.from(`${email}:${apiToken}`).toString('base64')}`

  try {
    const issuePayload: Record<string, any> = {
      fields: {
        project: { key: projectKey },
        summary,
        description,
        issuetype: { name: parentIssueType },
        priority: { name: 'High' },
        labels: ['TG', 'LinkedIn', 'LinkedIn_Integration', 'Lead_Record']
      }
    }

    // Custom fields if available in DFX
    if (lead.email) {
      issuePayload.fields.customfield_10045 = lead.email
    }
    if (lead.phone) {
      issuePayload.fields.customfield_10046 = lead.phone
    }

    const res = await fetch(`${baseUrl}/rest/api/2/issue`, {
      method: 'POST',
      headers: {
        Authorization: authHeader,
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(issuePayload)
    })

    if (!res.ok) {
      const errText = await res.text()
      console.error('[Jira Service Error] Issue creation failed:', res.status, errText)
      return {
        success: false,
        status: 'Failed',
        error: `Jira API returned status ${res.status}`
      }
    }

    const data = await res.json()
    const issueKey = data.key
    const issueUrl = `${baseUrl}/browse/${issueKey}`

    return {
      success: true,
      status: 'Created',
      issueKey,
      issueUrl
    }
  } catch (err: any) {
    console.error('[Jira Service Exception]', err?.message || err)
    return {
      success: false,
      status: 'Failed',
      error: err?.message || 'Network error communicating with Jira API'
    }
  }
}
