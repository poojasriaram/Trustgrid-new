import fs from 'fs';
import path from 'path';

function getRoutes(dir, base = '') {
  let routes = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const e of entries) {
    if (e.name.startsWith('_') || e.name.startsWith('.')) continue;
    const full = path.join(dir, e.name);
    if (e.isDirectory()) {
      routes.push(...getRoutes(full, path.join(base, e.name)));
    } else if (e.name === 'page.tsx' || e.name === 'page.js' || e.name === 'route.ts' || e.name === 'route.js') {
      let route = '/' + base.replace(/\\/g, '/');
      if (route === '/.') route = '/';
      routes.push(route);
    }
  }
  return routes;
}

const allRoutes = new Set(getRoutes('./app'));

function scanDir(dir) {
  let files = [];
  for (const item of fs.readdirSync(dir, { withFileTypes: true })) {
    if (['node_modules', '.next', '.git', 'scratch', 'dist', 'out'].includes(item.name) || item.name.startsWith('TGVX3')) continue;
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      files.push(...scanDir(full));
    } else if (item.name.endsWith('.tsx') || item.name.endsWith('.ts') || item.name.endsWith('.js') || item.name.endsWith('.mjs')) {
      files.push(full);
    }
  }
  return files;
}

const files = scanDir('.');
const hrefRegex = /href=["'`]([^"'`]+)["'`]/g;
const links = [];

for (const file of files) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const raw = match[1];
    links.push({ file, raw });
  }
}

const brokenInternal = [];
const emptyOrBrokenContact = [];

for (const { file, raw } of links) {
  if (raw === 'mailto:' || raw === 'tel:') {
    emptyOrBrokenContact.push({ file, raw });
    continue;
  }
  if (raw.startsWith('http://') || raw.startsWith('https://') || raw.startsWith('mailto:') || raw.startsWith('tel:') || raw.startsWith('javascript:')) {
    continue;
  }
  if (raw === '#' || raw.startsWith('#')) {
    continue;
  }
  if (raw.includes('${')) {
    // Dynamic template string
    continue;
  }

  let clean = raw.split('#')[0].split('?')[0];
  if (clean === '') clean = '/';
  if (clean.length > 1 && clean.endsWith('/')) clean = clean.slice(0, -1);

  // Check dynamic route patterns
  let exists = allRoutes.has(clean);
  if (!exists) {
    // Check if matched by dynamic route e.g. /solutions/[slug], /practice-areas/[slug], /blog/[slug], /docs/[...slug]
    for (const r of allRoutes) {
      if (r.includes('[')) {
        const regexStr = '^' + r.replace(/\[\.\.\.([^\]]+)\]/g, '(.+)').replace(/\[([^\]]+)\]/g, '([^/]+)') + '$';
        if (new RegExp(regexStr).test(clean)) {
          exists = true;
          break;
        }
      }
    }
  }

  if (!exists) {
    brokenInternal.push({ file, raw, clean });
  }
}

console.log('=== APP AUDIT RESULTS ===');
console.log('Total App Routes detected:', allRoutes.size);
console.log('Broken Internal Links:', brokenInternal.length);
if (brokenInternal.length > 0) {
  console.log(brokenInternal);
} else {
  console.log('✅ ZERO Broken Internal Links found across the entire codebase!');
}

console.log('\nEmpty Contact Links (mailto: / tel:):', emptyOrBrokenContact.length);
if (emptyOrBrokenContact.length > 0) {
  console.log(emptyOrBrokenContact);
}
