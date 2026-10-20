import { getRedisDashboardMetrics } from '../lib/redis-analytics'
import { getRedisClient, checkRedisHealth, closeRedisConnection } from '../lib/redis'
import fs from 'fs'
import path from 'path'

// Load environment variables from .env.local
const envLocalPath = path.resolve(__dirname, '../.env.local')
if (fs.existsSync(envLocalPath)) {
  const envContent = fs.readFileSync(envLocalPath, 'utf8')
  envContent.split(/\r?\n/).forEach((line) => {
    const trimmed = line.trim()
    if (trimmed && !trimmed.startsWith('#')) {
      const match = trimmed.match(/^([^=]+)=(.*)$/)
      if (match) {
        const key = match[1].trim()
        const val = match[2].trim().replace(/^["'](.*)["']$/, '$1')
        if (!process.env[key]) process.env[key] = val
      }
    }
  })
}

async function main() {
  console.log('\n' + '='.repeat(70))
  console.log('🔴 TRUSTGRID.AI — LIVE REDIS CLOUD TELEMETRY & ANALYTICS MONITOR')
  console.log('='.repeat(70))

  const health = await checkRedisHealth()
  console.log(`\n📡 DATABASE HEALTH:`)
  console.log(`   Status:       ${health.status.toUpperCase()} ${health.status === 'connected' ? '🟢' : '🔴'}`)
  console.log(`   Message:      ${health.message}`)
  console.log(`   Latency:      ${health.latencyMs ?? 'N/A'} ms`)
  console.log(`   Cluster:      garlanded-beneficial-ivory-93464.db.redis.io:14762`)

  const client = await getRedisClient()
  if (client && client.isOpen) {
    // Purge any accidental /analytics entries from pages leaderboard
    await client.zRem('tg:counts:pages', '/analytics')
  }

  const metrics = await getRedisDashboardMetrics(30)

  console.log(`\n📊 OVERVIEW METRICS:`)
  console.log(`   Total Pageviews:     ${metrics.overview.totalPageViews}`)
  console.log(`   Unique Sessions:     ${metrics.overview.uniqueSessions}`)
  console.log(`   Active Live (20m):   ${metrics.overview.activeSessions}`)
  console.log(`   CTA Clicks:          ${metrics.overview.totalCtaClicks}`)
  console.log(`   Form Submissions:    ${metrics.overview.totalFormSuccess}`)
  console.log(`   Conversion Rate:     ${metrics.overview.conversionRatePercent}%`)

  console.log(`\n🏆 TOP PAGES (Leaderboard):`)
  if (metrics.topPages.length === 0) {
    console.log('   (No page views recorded yet)')
  } else {
    metrics.topPages
      .filter((p) => p.path !== '/analytics')
      .forEach((p, idx) => {
        console.log(`   ${idx + 1}. ${p.path.padEnd(45)} : ${p.views} views`)
      })
  }

  console.log(`\n🚀 TRAFFIC SOURCES:`)
  if (metrics.trafficSources.length === 0) {
    console.log('   (No traffic sources recorded yet)')
  } else {
    metrics.trafficSources.forEach((s) => {
      console.log(`   • ${s.source.padEnd(25)} : ${s.count} visits`)
    })
  }

  console.log(`\n🎯 CTA PERFORMANCE:`)
  if (metrics.ctaPerformance.length === 0) {
    console.log('   (No CTA clicks recorded yet)')
  } else {
    metrics.ctaPerformance.forEach((c) => {
      console.log(`   • ${c.cta.padEnd(30)} : ${c.clicks} clicks`)
    })
  }

  console.log(`\n📱 DEVICE BREAKDOWN:`)
  if (metrics.deviceBreakdown.length === 0) {
    console.log('   (No device data recorded yet)')
  } else {
    metrics.deviceBreakdown.forEach((d) => {
      console.log(`   • ${d.device.padEnd(20)} : ${d.count}`)
    })
  }

  console.log(`\n⚡ RECENT CAPTURED EVENTS (Stream):`)
  const recentEvents = metrics.recentEvents.filter((e) => e.page_path !== '/analytics')
  if (recentEvents.length === 0) {
    console.log('   (No recent events in stream)')
  } else {
    recentEvents.slice(0, 10).forEach((e, idx) => {
      const timeStr = new Date(e.timestamp).toLocaleTimeString()
      console.log(
        `   [${timeStr}] ${e.event_type.toUpperCase().padEnd(12)} | Path: ${e.page_path.padEnd(30)} | Session: ${e.session_id.slice(0, 12)}... | ${e.traffic_source || 'Direct'}`
      )
    })
  }

  console.log('\n' + '='.repeat(70) + '\n')
  await closeRedisConnection()
}

main().catch(async (err) => {
  console.error('Fatal error viewing Redis analytics:', err)
  await closeRedisConnection()
  process.exit(1)
})
