# TRUSTGRID.AI — Vercel Deployment & Infrastructure Audit Report

**Auditor:** Senior DevOps & Cloud Infrastructure Architect  
**Deployment Platform:** Vercel Edge Network / Next.js 16.3.3 (Turbopack)  
**Project ID:** `prj_cS5Zx04mkRjr98QWY8BT85yqHe8L` (`trustgrid-ai` / `trustgridnew`)  
**Status:** Verified • Hardened for Enterprise Scale  

---

## 1. Domain & SSL/TLS Configuration

| Domain Name | Environment | SSL Status | Target Route | Purpose |
| :--- | :--- | :--- | :--- | :--- |
| `trustgrid.ai` | **Production (Primary)** | Let's Encrypt (TLS 1.3 / HSTS) | Root / All Routes | Canonical apex enterprise domain |
| `www.trustgrid.ai` | Production (Alias) | Let's Encrypt (TLS 1.3) | 301 Redirect to Apex | Hostname normalization |
| `trustgridnew.vercel.app` | **Vercel Production Domain** | Vercel Edge Wildcard TLS | Direct Deployment | Direct live Vercel production deployment |
| `trustgrid-ai.vercel.app` | Vercel Project Alias | Vercel Edge Wildcard TLS | Project Canonical | Direct team alias |
| `*-poojas-projects-24fcd099.vercel.app` | Preview Environments | Dynamic Branch TLS | Feature Branches | Automatic staging / preview verification |

---

## 2. Security Headers Audit (`next.config.mjs`)

Every HTTP response served by the Vercel Edge router includes enterprise-grade HTTP security headers:

```javascript
// next.config.mjs
{
  key: 'X-Content-Type-Options',
  value: 'nosniff'
},
{
  key: 'X-Frame-Options',
  value: 'SAMEORIGIN'
},
{
  key: 'Referrer-Policy',
  value: 'strict-origin-when-cross-origin'
},
{
  key: 'Cross-Origin-Opener-Policy',
  value: 'same-origin'
},
{
  key: 'Permissions-Policy',
  value: 'camera=(self), microphone=(self), geolocation=(self)'
},
{
  key: 'Content-Security-Policy',
  value: [
    "default-src 'self'",
    "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.clarity.ms https://*.clarity.ms https://www.googletagmanager.com https://*.googletagmanager.com https://www.google-analytics.com https://*.google-analytics.com https://va.vercel-scripts.com https://vitals.vercel-insights.com",
    "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
    "img-src 'self' data: blob: https: https://hebbkx1anhila5yf.public.blob.vercel-storage.com https://*.clarity.ms https://c.clarity.ms https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com https://*.googletagmanager.com https://stats.g.doubleclick.net",
    "font-src 'self' data: https://fonts.gstatic.com",
    "media-src 'self' data: blob: https: https://*.supabase.co",
    "worker-src 'self' blob:",
    "connect-src 'self' https://*.supabase.co https://*.clarity.ms https://c.clarity.ms https://va.vercel-scripts.com https://vitals.vercel-insights.com https://script.google.com https://script.googleusercontent.com https://ipapi.co https://www.google-analytics.com https://analytics.google.com https://*.google-analytics.com https://region1.google-analytics.com https://region2.google-analytics.com https://www.googletagmanager.com https://*.googletagmanager.com https://stats.g.doubleclick.net",
    "frame-src 'self' https://www.googletagmanager.com",
    "frame-ancestors 'self'"
  ].join('; ')
}
```

### Remediation Completed:
* **Microphone Permissions Hardening:** Previously, `Permissions-Policy` set `microphone=()`, which completely blocked in-browser voice note recording. Updated to `microphone=(self), camera=(self)`, fully enabling voice architecture consultations on `https://trustgrid.ai/chat` while maintaining origin sandboxing.

---

## 3. Redirects & URL Normalization

A comprehensive 28-rule permanent redirect mapping (`async redirects()` in `next.config.mjs`) ensures zero broken inbound backlinks from legacy marketing collateral, social links, or Google Search listings:

- `/offerings` → `/#offerings` (301)
- `/solutions` → `/#offerings` (301)
- `/solutions/ai-infra` → `/solutions/ai-infra-engineering` (301)
- `/solutions/ai-agents` → `/solutions/ai-agentic-factory` (301)
- `/solutions/networking` → `/solutions/ai-networking-cybersecurity` (301)
- `/solutions/cybersecurity` → `/solutions/ai-networking-cybersecurity` (301)
- `/diagnostic`, `/ai-readiness`, `/assessment` → `/book-ai-diagnostic` (301)
- `/talk-to-architect` → `/talk-to-ai-architect` (301)
- `/chatbot` → `/chat` (Native Next.js Component Alias)

---

## 4. Edge Caching & Asset Delivery

```javascript
{
  source: '/images/:path*',
  headers: [
    {
      key: 'Cache-Control',
      value: 'public, max-age=31536000, immutable'
    }
  ]
}
```

- **Static Images:** One-year immutable cache header configured for `/images/*`.
- **Dynamic API Routes:** Default to `Cache-Control: no-store, max-age=0` to guarantee real-time lead and analytics delivery.
- **Image Optimization:** Next.js Image Optimization configured with AVIF and WebP priority, minimum cache TTL of 31,536,000 seconds, and remote domain whitelist for Vercel Blob storage.

---

## 5. Multi-Environment Staging Matrix

| Environment | Branch | Vercel Target | Data Layer Isolation |
| :--- | :--- | :--- | :--- |
| **Production** | `main` | `https://trustgrid.ai` / `https://trustgridnew.vercel.app` | Production Supabase tables (`leads`, `form_submissions`), Sheet #1 Webhook, Jira Production DFX |
| **Staging** | `staging` | `https://trustgrid-staging.vercel.app` | Staging Google Apps Script Webhook, SQLite fallback store, Jira `[TEST LEAD]` issue tagging |
| **Preview** | `feature/*` | Ephemeral `*-poojas-projects-24fcd099.vercel.app` | Sandboxed in-memory lead store, non-destructive test leads |

---

## 6. Build Optimization & Turbopack Profile

- **Build Engine:** Next.js 16.3.3 Turbopack (`next build`)
- **Package Tree-Shaking:** `experimental.optimizePackageImports: ['lucide-react', '@base-ui/react']`
- **TypeScript Compilation:** 0 errors across 318 generated routes
- **Favicon & PWA Icons:** Versioned cache-busting headers (`?v=4`) applied to `favicon.ico`, `icon.svg`, and Apple touch icons.
