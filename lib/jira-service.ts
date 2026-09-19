/**
 * TRUSTGRID.AI - Enterprise Jira Integration Service
 * Manages Server-Side Jira Issue Creation, 7-Step Subtask Workflows, SLA Due Dates, and Deduplication.
 * Custom-mapped for DealFlow (DFX) Workspace with explicit TG site prefixing.
 */

import { NormalizedLead } from './lead-normalization'

export interface JiraSubtaskConfig {
  name: string
  dueHours: number
  priority: 'Highest' | 'High' | 'Medium' | 'Low'
  description?: string
}

export interface JiraIssueResult {
  success: boolean
  status: 'Created' | 'Pending' | 'Failed' | 'Skipped_NonSales'
  issueKey?: string
  issueId?: string
  issueUrl?: string
  subtasks?: Array<{ key: string; name: string }>
  error?: string
}

// 7-Step Subtask Follow-up Workflow configured for TG Lead
export const DEFAULT_LEAD_WORKFLOW: JiraSubtaskConfig[] = [
  {
    name: 'Contacted',
    dueHours: 24,
    priority: 'High',
    description: 'Initial direct outreach to lead via phone / email / WhatsApp.'
  },
  {
    name: 'Follow-up 1',
    dueHours: 48,
    priority: 'High',
    description: 'First formal follow-up to confirm client interest and availability.'
  },
  {
    name: 'Requirements Gathered',
    dueHours: 48,
    priority: 'Medium',
    description: 'Document compute scale, architecture specifications, compliance, and budget requirements.'
  },
  {
    name: 'Site Visit',
    dueHours: 48,
    priority: 'Medium',
    description: 'Conduct on-site technical inspection / executive scoping session.'
  },
  {
    name: 'Quote Submitted',
    dueHours: 24,
    priority: 'Medium',
    description: 'Deliver commercial engagement quote and architectural proposal SOW.'
  },
  {
    name: 'Closed',
    dueHours: 24,
    priority: 'Medium',
    description: 'Finalize contract signing and commercial closure.'
  },
  {
    name: 'Handed over to Operations',
    dueHours: 24,
    priority: 'Medium',
    description: 'Transition client deliverables and architecture onboarding to engineering operations.'
  }
]

// Server-side Idempotency Cache to protect against duplicate submissions
const processedLeadsCache = new Map<string, JiraIssueResult>()

/**
 * Calculate dynamic due date in YYYY-MM-DD format based on hours from now
 */
export function calculateDueDate(hoursFromNow: number = 24): string {
  const target = new Date(Date.now() + hoursFromNow * 60 * 60 * 1000)
  const yyyy = target.getFullYear()
  const mm = String(target.getMonth() + 1).padStart(2, '0')
  const dd = String(target.getDate()).padStart(2, '0')
  return `${yyyy}-${mm}-${dd}`
}

/**
 * Get Jira Server Configuration from Environment
 */
export function getJiraConfig() {
  const baseUrl = (process.env.JIRA_BASE_URL || 'https://trustworkz.atlassian.net').replace(/\/$/, '')
  const projectKey = process.env.JIRA_PROJECT_KEY || 'DFX'
  const email = process.env.JIRA_EMAIL || 'poojasri@trustgrid.ai'
  const apiToken = process.env.JIRA_API_TOKEN || ''
  const parentIssueType = process.env.JIRA_LEAD_ISSUE_TYPE || 'Lead_Record'
  const subtaskIssueType = process.env.JIRA_SUBTASK_ISSUE_TYPE || 'FollowUp'

  return {
    baseUrl,
    projectKey,
    email,
    apiToken,
    parentIssueType,
    subtaskIssueType,
    isConfigured: Boolean(apiToken && apiToken.trim() !== '')
  }
}

/**
 * Create Jira Parent Lead Issue and Subtasks
 */
export async function createJiraLead(
  lead: NormalizedLead,
  workflow: JiraSubtaskConfig[] = DEFAULT_LEAD_WORKFLOW
): Promise<JiraIssueResult> {
  // Non-sales submissions (Careers, Newsletters) bypass Jira sales tickets
  if (!lead.isSalesLead) {
    return {
      success: true,
      status: 'Skipped_NonSales',
      error: 'Non-sales submission (e.g. Careers/Newsletter) bypassed sales Jira ticket'
    }
  }

  // Idempotency check: Prevent duplicate ticket creation
  if (processedLeadsCache.has(lead.leadId)) {
    const cached = processedLeadsCache.get(lead.leadId)!
    console.log(`[Jira Service] Reusing cached result for Lead ${lead.leadId}:`, cached.issueKey)
    return cached
  }

  const config = getJiraConfig()

  // Fallback mode if Jira credentials are not yet configured in environment
  if (!config.isConfigured) {
    const mockKey = `${config.projectKey}-${Math.floor(100 + Math.random() * 900)}`
    const mockResult: JiraIssueResult = {
      success: true,
      status: 'Created',
      issueKey: mockKey,
      issueUrl: `${config.baseUrl}/browse/${mockKey}`,
      subtasks: workflow.map((w, idx) => ({ key: `${mockKey}-${idx + 1}`, name: w.name })),
      error: 'Jira API Token not configured — Simulated Lead Issue Created for development'
    }
    processedLeadsCache.set(lead.leadId, mockResult)
    return mockResult
  }

  const authHeader = `Basic ${Buffer.from(`${config.email}:${config.apiToken}`).toString('base64')}`

  try {
    // 1. Create Parent Lead Issue with custom field mapping and TG labeling
    const fields: Record<string, any> = {
      project: {
        key: config.projectKey
      },
      summary: lead.jiraSummary,
      description: lead.jiraDescription,
      issuetype: {
        name: config.parentIssueType
      },
      duedate: calculateDueDate(24),
      priority: {
        name: 'High'
      },
      labels: [
        'TG',
        'SITE_TG',
        lead.leadType,
        lead.channelAttribution.replace(/[\s\/]+/g, '_')
      ]
    }

    // Map custom fields on DealFlow (DFX)
    if (lead.email) {
      fields.customfield_10045 = lead.email // Lead Email
    }
    if (lead.phone) {
      fields.customfield_10046 = lead.phone // Lead Phone number
    }
    if (lead.pageUrl) {
      fields.customfield_10044 = lead.pageUrl // Website / Page URL
    }

    const parentPayload = { fields }

    const parentRes = await fetch(`${config.baseUrl}/rest/api/2/issue`, {
      method: 'POST',
      headers: {
        'Authorization': authHeader,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(parentPayload)
    })

    if (!parentRes.ok) {
      const errBody = await parentRes.text()
      console.error(`[Jira Service] Failed to create parent issue (${parentRes.status}):`, errBody)
      const failResult: JiraIssueResult = {
        success: false,
        status: 'Failed',
        error: `Jira API Error ${parentRes.status}: ${errBody.slice(0, 200)}`
      }
      processedLeadsCache.set(lead.leadId, failResult)
      return failResult
    }

    const parentData = await parentRes.json()
    const parentKey = parentData.key as string
    const parentId = parentData.id as string
    const parentUrl = `${config.baseUrl}/browse/${parentKey}`

    const createdSubtasks: Array<{ key: string; name: string }> = []

    // 2. Create the 7 Workflow FollowUp Tasks
    for (const step of workflow) {
      try {
        const subtaskPayload = {
          fields: {
            project: {
              key: config.projectKey
            },
            parent: {
              key: parentKey
            },
            summary: `[TG] [${lead.leadId}] ${step.name}`,
            description: `Site Origin: TG (TRUSTGRID.AI)\nTask: ${step.description || step.name}\n\nLead Reference: ${lead.leadId}\nContact: ${lead.name} (${lead.email} | ${lead.phone})\nCompany: ${lead.company}\nSolution: ${lead.interestedSolution}`,
            issuetype: {
              name: config.subtaskIssueType
            },
            duedate: calculateDueDate(step.dueHours),
            priority: {
              name: step.priority
            },
            labels: ['TG', 'LEAD_FOLLOWUP', lead.leadType]
          }
        }

        const subtaskRes = await fetch(`${config.baseUrl}/rest/api/2/issue`, {
          method: 'POST',
          headers: {
            'Authorization': authHeader,
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(subtaskPayload)
        })

        if (subtaskRes.ok) {
          const subData = await subtaskRes.json()
          createdSubtasks.push({ key: subData.key, name: step.name })
        }
      } catch (subErr) {
        console.warn(`[Jira Service] FollowUp creation note for ${step.name}:`, subErr)
      }
    }

    const result: JiraIssueResult = {
      success: true,
      status: 'Created',
      issueKey: parentKey,
      issueId: parentId,
      issueUrl: parentUrl,
      subtasks: createdSubtasks
    }

    processedLeadsCache.set(lead.leadId, result)
    return result
  } catch (err: any) {
    console.error('[Jira Service] Unexpected error connecting to Jira:', err)
    const errorResult: JiraIssueResult = {
      success: false,
      status: 'Failed',
      error: err?.message || 'Network error connecting to Jira'
    }
    processedLeadsCache.set(lead.leadId, errorResult)
    return errorResult
  }
}
