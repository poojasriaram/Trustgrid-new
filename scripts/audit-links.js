const fs = require('fs');
const path = require('path');

// 1. Get all physical page routes
function getRoutes(dir, base = '') {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('_') || e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      routes.push(...getRoutes(full, path.join(base, e.name)));
    } else if (e.name === 'page.tsx' || e.name === 'page.js') {
      let route = '/' + base.replace(/\\/g, '/');
      if (route === '/.') route = '/';
      routes.push(route);
    }
  }
  return routes;
}

const pageRoutes = new Set(getRoutes('./app').map(r => r.replace(/\\/g, '/')));

// Add solutions slugs
const solutionSlugs = [
  'ai-infra-engineering',
  'ai-infrastructure',
  'infra',
  'ai-agentic-factory',
  'agentic-enterprise',
  'ai-agents',
  'ai-networking',
  'networking',
  'ultra-low-latency-ai-fabrics',
  'ai-cybersecurity-quantum-safe',
  'ai-cybersecurity',
  'quantum-safe-ai-security',
  'trusted-ai-transformation',
  'trusted-ai',
  'explainable-robust-governed-ai',
  'ai-value-engineering',
  'ai-value',
  'lean-ai-value-engineering',
  'medical-supplies-ai',
  'medical-supplies-packaging-automation'
];

solutionSlugs.forEach(s => {
  pageRoutes.add('/solutions/' + s);
});

// Crawl all code files
function scanDir(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (item.name === 'node_modules' || item.name === '.next' || item.name === '.git' || item.name === 'scratch' || item.name === 'dist') continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...scanDir(full));
    } else if (item.name.endsWith('.tsx') || item.name.endsWith('.ts') || item.name.endsWith('.js') || item.name.endsWith('.mjs')) {
      files.push(full);
    }
  }
  return files;
}

const allFiles = scanDir('.');
const hrefRegex = /href=["']([^"']+)["']/g;
const hrefs = new Map();

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const rawHref = match[1];
    if (!hrefs.has(rawHref)) hrefs.set(rawHref, []);
    hrefs.get(rawHref).push(file);
  }
}

console.log('Total unique hrefs found:', hrefs.size);

const broken = [];
const external = [];
const placeholders = [];
const validInternal = [];

for (const [rawHref, callers] of hrefs.entries()) {
  if (rawHref.startsWith('http://') || rawHref.startsWith('https://') || rawHref.startsWith('mailto:') || rawHref.startsWith('tel:')) {
    external.push({ href: rawHref, count: callers.length });
    continue;
  }
  if (rawHref === '#' || rawHref.startsWith('javascript:')) {
    placeholders.push({ href: rawHref, callers: callers.slice(0, 3) });
    continue;
  }

  // Parse path (strip hash and query)
  let cleanPath = rawHref.split('#')[0].split('?')[0];
  if (cleanPath === '') cleanPath = '/'; // anchor on same page or /
  if (cleanPath.length > 1 && cleanPath.endsWith('/')) cleanPath = cleanPath.slice(0, -1);

  if (pageRoutes.has(cleanPath)) {
    validInternal.push(rawHref);
  } else {
    broken.push({ rawHref, cleanPath, callers: callers.slice(0, 3) });
  }
}

console.log('\n=== POTENTIAL BROKEN / 404 INTERNAL LINKS (' + broken.length + ') ===');
console.log(JSON.stringify(broken, null, 2));

console.log('\n=== PLACEHOLDER LINKS (' + placeholders.length + ') ===');
console.log(JSON.stringify(placeholders, null, 2));

console.log('\n=== EXTERNAL LINKS (' + external.length + ') ===');
console.log(JSON.stringify(external, null, 2));
