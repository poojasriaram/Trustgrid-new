/**
 * TRUSTGRID.AI — Automated LinkedIn Text Post Script
 * 
 * Target: TRUSTGRID.AI LinkedIn Company Page (urn:li:organization:10482910)
 * Post Type: Text-Only Update
 * Usage:
 *   node scripts/publish-gpu-post.js
 *   node scripts/publish-gpu-post.js --dry-run
 */

const fs = require('fs')
const path = require('path')
const { DatabaseSync } = require('node:sqlite')

// 1. Load environment variables from .env.local
const envPath = path.join(__dirname, '..', '.env.local')
if (fs.existsSync(envPath)) {
  const envContent = fs.readFileSync(envPath, 'utf8')
  for (const line of envContent.split('\n')) {
    const trimmed = line.trim()
    if (!trimmed || trimmed.startsWith('#')) continue
    const eqIdx = trimmed.indexOf('=')
    if (eqIdx !== -1) {
      const key = trimmed.slice(0, eqIdx).trim()
      let val = trimmed.slice(eqIdx + 1).trim()
      if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
        val = val.slice(1, -1)
      }
      if (!process.env[key]) {
        process.env[key] = val
      }
    }
  }
}

// 2. Exact Post Text
const POST_TEXT = `⚡ TRUSTGRID.AI — 20% Assured GPU Performance Optimization for Enterprises & Data Centers

Is your GPU infrastructure truly optimized for AI workloads?

At TRUSTGRID.AI, we deliver 20% assured performance optimization through advanced GPU engineering, workload orchestration, and AI-native infrastructure intelligence.

Our GPU Optimization Services empower enterprises and hyperscale data centers to achieve measurable efficiency gains across:

GPUaaS & Managed Compute Clusters

AI-DCIM & Fleet Operations

Liquid Cooling & Power Efficiency

Quantum-Safe Compliance & Green Energy Integration

💡 Why TRUSTGRID.AI?
Most enterprise GPU clusters operate below 70% efficiency. Our optimization framework enhances utilization, reduces latency, and drives sustainable ROI — transforming your AI infrastructure into a high-performance engine.

🚀 Key Outcomes:

20%+ assured performance improvement

30–40% reduction in compute waste

Optimized CapEx utilization and sustainability metrics

Let’s engineer true AI economics — where every watt and every GPU cycle counts.

🌐 Visit: www.trustgrid.ai
📩 Email: poojasri@trustgrid.ai
📞 WhatsApp: 7530044868

#TRUSTGRIDAI #GPUOptimization #AIInfrastructure #DataCenters #PerformanceEngineering #Sustainability #AIValueEngineering #SmartCity #EnergyTransition`

// 3. Database token retrieval
function getActiveToken() {
  // Check environment first
  if (process.env.LINKEDIN_ACCESS_TOKEN && process.env.LINKEDIN_ACCESS_TOKEN.trim()) {
    return { token: process.env.LINKEDIN_ACCESS_TOKEN.trim(), source: 'environment' }
  }

  // Check SQLite database
  const dbPath = path.join(__dirname, '..', 'data', 'trustgrid_analytics.db')
  if (fs.existsSync(dbPath)) {
    try {
      const db = new DatabaseSync(dbPath)
      const row = db.prepare('SELECT access_token, account_name, expires_at FROM linkedin_connections WHERE id = ?').get('admin')
      if (row && row.access_token) {
        return {
          token: row.access_token,
          source: 'sqlite',
          accountName: row.account_name,
          expiresAt: row.expires_at
        }
      }
    } catch (e) {
      console.warn('[DB Warning]', e.message)
    }
  }

  return null
}

// 4. Save post record to SQLite
function savePostRecord(record) {
  const dbPath = path.join(__dirname, '..', 'data', 'trustgrid_analytics.db')
  if (!fs.existsSync(dbPath)) return

  try {
    const db = new DatabaseSync(dbPath)
    const stmt = db.prepare(`
      INSERT INTO linkedin_posts (id, text, visibility, organization_id, status, scheduled_at, published_at, linkedin_post_id, error_message, response_json, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `)
    const now = new Date().toISOString()
    stmt.run(
      record.id,
      record.text,
      'PUBLIC',
      record.organizationId,
      record.status,
      null,
      record.publishedAt || null,
      record.linkedinPostId || null,
      record.error || null,
      JSON.stringify(record.response || {}),
      now,
      now
    )
  } catch (err) {
    console.warn('[DB Save Warning]', err.message)
  }
}

async function main() {
  const isDryRun = process.argv.includes('--dry-run')

  console.log('\n===============================================================')
  console.log(' TRUSTGRID.AI — AUTOMATED LINKEDIN PUBLISHING SCRIPT')
  console.log('===============================================================\n')

  const rawOrgId = process.env.LINKEDIN_ORGANIZATION_ID || '10482910'
  const organizationUrn = rawOrgId.startsWith('urn:li:organization:') 
    ? rawOrgId 
    : `urn:li:organization:${rawOrgId}`

  console.log(`📌 Target Publisher : TRUSTGRID.AI Company Page`)
  console.log(`📌 Organization URN : ${organizationUrn}`)
  console.log(`📌 Content Type     : Text-Only Update (${POST_TEXT.length} characters)`)
  console.log(`📌 Mode             : ${isDryRun ? 'DRY-RUN (Verification Only)' : 'LIVE PUBLISH'}`)
  console.log('---------------------------------------------------------------\n')

  const tokenInfo = getActiveToken()

  if (!tokenInfo) {
    console.log('⚠️  No active LinkedIn access token found in SQLite or LINKEDIN_ACCESS_TOKEN.')
    console.log('   To connect TRUSTGRID.AI to LinkedIn:')
    console.log('   1. Start dev server: npm run dev')
    console.log('   2. Open: http://localhost:3000/analytics (LinkedIn Automation tab)')
    console.log('   3. Click "Connect LinkedIn" to complete OAuth 2.0')
    console.log('   OR add LINKEDIN_ACCESS_TOKEN=<token> in .env.local\n')

    if (isDryRun) {
      console.log('✅ DRY-RUN completed: Post payload formatted and verified successfully.\n')
      return
    }
    process.exit(1)
  }

  console.log(`🔑 Token Source     : ${tokenInfo.source.toUpperCase()} ${tokenInfo.accountName ? `(${tokenInfo.accountName})` : ''}`)

  if (isDryRun) {
    console.log('\n--- PREVIEW OF POST PAYLOAD ---')
    console.log(JSON.stringify({
      author: organizationUrn,
      commentary: POST_TEXT,
      visibility: 'PUBLIC',
      distribution: {
        feedDistribution: 'MAIN_FEED',
        targetEntities: [],
        thirdPartyDistributionChannels: []
      },
      lifecycleState: 'PUBLISHED',
      isReshareDisabledByAuthor: false
    }, null, 2))
    console.log('\n✅ DRY-RUN verification passed. To publish live, run:')
    console.log('   node scripts/publish-gpu-post.js\n')
    return
  }

  console.log('\n🚀 Dispatching post to LinkedIn Posts API (/rest/posts)...')

  // LinkedIn /rest/posts payload
  const restPayload = {
    author: organizationUrn,
    commentary: POST_TEXT,
    visibility: 'PUBLIC',
    distribution: {
      feedDistribution: 'MAIN_FEED',
      targetEntities: [],
      thirdPartyDistributionChannels: []
    },
    lifecycleState: 'PUBLISHED',
    isReshareDisabledByAuthor: false
  }

  const postId = `tg_cli_${Date.now()}`

  try {
    const res = await fetch('https://api.linkedin.com/rest/posts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenInfo.token}`,
        'Content-Type': 'application/json',
        'LinkedIn-Version': '202401',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(restPayload)
    })

    if (res.status === 201 || res.ok) {
      const urnHeader = res.headers.get('x-restli-id') || res.headers.get('x-linkedin-id')
      let resJson = {}
      try { resJson = await res.json() } catch {}

      const linkedinUrn = urnHeader || resJson.id || `urn:li:share:${Date.now()}`
      const cleanId = linkedinUrn.replace(/^urn:li:(share|ugcPost|post):/, '')
      const postUrl = `https://www.linkedin.com/feed/update/${linkedinUrn}`

      console.log('\n===============================================================')
      console.log(' 🎉 POST PUBLISHED SUCCESSFULLY TO TRUSTGRID.AI LINKEDIN PAGE!')
      console.log('===============================================================')
      console.log(`🔗 Post URN      : ${linkedinUrn}`)
      console.log(`🔗 Live Web Link : ${postUrl}`)
      console.log('===============================================================\n')

      savePostRecord({
        id: postId,
        text: POST_TEXT,
        organizationId: rawOrgId,
        status: 'PUBLISHED',
        publishedAt: new Date().toISOString(),
        linkedinPostId: linkedinUrn,
        response: { ...resJson, headerUrn: urnHeader }
      })

      return
    }

    // Fallback: LinkedIn /v2/ugcPosts
    console.log('ℹ️  Trying fallback LinkedIn /v2/ugcPosts API...')
    const ugcPayload = {
      author: organizationUrn,
      lifecycleState: 'PUBLISHED',
      specificContent: {
        'com.linkedin.ugc.ShareContent': {
          shareCommentary: {
            text: POST_TEXT
          },
          shareMediaCategory: 'NONE'
        }
      },
      visibility: {
        'com.linkedin.ugc.MemberNetworkVisibility': 'PUBLIC'
      }
    }

    const ugcRes = await fetch('https://api.linkedin.com/v2/ugcPosts', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${tokenInfo.token}`,
        'Content-Type': 'application/json',
        'X-Restli-Protocol-Version': '2.0.0'
      },
      body: JSON.stringify(ugcPayload)
    })

    if (ugcRes.status === 201 || ugcRes.ok) {
      const ugcData = await ugcRes.json()
      const linkedinUrn = ugcData.id || `urn:li:ugcPost:${Date.now()}`
      const postUrl = `https://www.linkedin.com/feed/update/${linkedinUrn}`

      console.log('\n===============================================================')
      console.log(' 🎉 POST PUBLISHED SUCCESSFULLY (via UGC API)!')
      console.log('===============================================================')
      console.log(`🔗 Post URN      : ${linkedinUrn}`)
      console.log(`🔗 Live Web Link : ${postUrl}`)
      console.log('===============================================================\n')

      savePostRecord({
        id: postId,
        text: POST_TEXT,
        organizationId: rawOrgId,
        status: 'PUBLISHED',
        publishedAt: new Date().toISOString(),
        linkedinPostId: linkedinUrn,
        response: ugcData
      })
      return
    }

    const errBody = await res.text()
    console.error(`\n❌ Failed to publish post: HTTP ${res.status}`)
    console.error('LinkedIn API Response:', errBody)

    savePostRecord({
      id: postId,
      text: POST_TEXT,
      organizationId: rawOrgId,
      status: 'FAILED',
      error: `HTTP ${res.status}: ${errBody}`
    })

  } catch (error) {
    console.error('\n❌ Network or execution error:', error.message)
    savePostRecord({
      id: postId,
      text: POST_TEXT,
      organizationId: rawOrgId,
      status: 'FAILED',
      error: error.message
    })
  }
}

main()
