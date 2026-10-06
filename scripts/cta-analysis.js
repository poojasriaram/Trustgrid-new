const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (['node_modules', '.next', '.git', 'dist'].includes(file)) continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) results.push(...walk(fullPath));
    else if (/\.(tsx|jsx|ts|js)$/.test(file)) results.push(fullPath);
  }
  return results;
}

const files = walk('./app').concat(walk('./components'));
const ctas = [];

const ctaRegex = /<(?:Link|a)\s+[^>]*href=['"]([^'"]+)['"][^>]*>([\s\S]*?)<\/(?:Link|a)>/g;
const hrefRegex = /href:\s*['"]([^'"]+)['"]/g;

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = ctaRegex.exec(content)) !== null) {
    const [full, href, inner] = match;
    const isButton = full.includes('button') || full.includes('btn') || full.includes('cta');
    const text = inner.replace(/<[^>]+>/g, '').trim().replace(/\s+/g, ' ');
    if (isButton || href.startsWith('/book') || href.startsWith('/contact') || href.includes('diagnostic')) {
      ctas.push({ file: path.relative('.', file), href, text: text.slice(0, 50) });
    }
  }
  while ((match = hrefRegex.exec(content)) !== null) {
    ctas.push({ file: path.relative('.', file), href: match[1], text: 'Configured CTA / Nav Item' });
  }
}

console.log('Total CTAs found:', ctas.length);
const hrefCounts = {};
for (const c of ctas) {
  hrefCounts[c.href] = (hrefCounts[c.href] || 0) + 1;
}

console.log('\n--- TOP CTA DESTINATIONS ---');
for (const [h, count] of Object.entries(hrefCounts).sort((a,b) => b[1] - a[1])) {
  console.log(`  ${count.toString().padStart(3, ' ')}x -> ${h}`);
}

// Check which internal hrefs point to routes that don't exist
const existingAppDirs = new Set();
function findRoutes(dir, currentRoute = '') {
  const items = fs.readdirSync(dir);
  for (const item of items) {
    const p = path.join(dir, item);
    if (fs.statSync(p).isDirectory()) {
      if (item === 'api' || item.startsWith('.')) continue;
      const route = item.startsWith('[') ? item : item;
      findRoutes(p, currentRoute + '/' + route);
    } else if (item === 'page.tsx' || item === 'page.jsx' || item === 'page.js') {
      existingAppDirs.add(currentRoute === '' ? '/' : currentRoute);
    }
  }
}
findRoutes('./app');

console.log('\n--- KNOWN NEXT.JS ROUTES ---');
for (const r of [...existingAppDirs].sort()) {
  console.log('  ' + r);
}

const brokenHrefs = [];
for (const [h, count] of Object.entries(hrefCounts)) {
  if (h.startsWith('/') && !h.startsWith('/images') && !h.startsWith('/api') && !h.startsWith('/favicon')) {
    const cleanPath = h.split('?')[0].split('#')[0];
    const target = cleanPath === '' ? '/' : cleanPath;
    
    // Check if dynamic route handles it
    let matched = existingAppDirs.has(target);
    if (!matched) {
      for (const r of existingAppDirs) {
        if (r.includes('[') && target.startsWith(r.split('[')[0])) {
          matched = true;
          break;
        }
      }
    }
    
    if (!matched) {
      brokenHrefs.push({ href: h, target, count });
    }
  }
}

console.log('\n--- POTENTIALLY BROKEN CTA DESTINATIONS ---');
if (brokenHrefs.length === 0) {
  console.log('  None! All CTA routes map to existing pages.');
} else {
  for (const b of brokenHrefs) {
    console.log(`  ❌ ${b.count}x -> ${b.href} (Path: "${b.target}" does not exist!)`);
  }
}
