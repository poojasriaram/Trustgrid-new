const fs = require('fs');
const path = require('path');

// 1. Gather all actual Next.js app routes
const validPages = new Set([
  '/',
  '/about',
  '/ai-diagnostic',
  '/ai-methodology',
  '/ai-readiness-assessment',
  '/book-ai-diagnostic',
  '/careers',
  '/case-studies',
  '/contact',
  '/industries',
  '/insights',
  '/leadership',
  '/methodology-engine',
  '/partners',
  '/request-proposal',
  '/sitemap',
  '/talk-to-ai-architect',
  '/use-case-workshop',
  '/use-cases'
]);

// Read solutions slugs from lib/solutions.ts
try {
  const solContent = fs.readFileSync(path.join(__dirname, '../lib/solutions.ts'), 'utf8');
  const slugRegex = /slug:\s*['"]([^'"]+)['"]/g;
  let m;
  while ((m = slugRegex.exec(solContent)) !== null) {
    validPages.add('/solutions/' + m[1]);
  }
} catch (e) {
  console.error('Error reading lib/solutions.ts:', e.message);
}

console.log('Total valid registered routes:', validPages.size);

// 2. Scan all codebase files for href="..."
function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  for (const file of list) {
    if (file === 'node_modules' || file === '.next' || file === '.git' || file === 'scripts') continue;
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat && stat.isDirectory()) {
      results = results.concat(walk(fullPath));
    } else if (/\.(tsx|jsx|ts|js)$/.test(file)) {
      results.push(fullPath);
    }
  }
  return results;
}

const allFiles = walk(path.join(__dirname, '..'));
const brokenLinks = [];
const verifiedLinks = new Set();

const hrefRegex = /href=["'`](\/[^"'`?#]*)/g;

for (const file of allFiles) {
  const content = fs.readFileSync(file, 'utf8');
  let match;
  while ((match = hrefRegex.exec(content)) !== null) {
    const rawPath = match[1];
    if (
      rawPath.startsWith('/_') ||
      rawPath.startsWith('/images') ||
      rawPath.startsWith('/api') ||
      rawPath.startsWith('/favicon') ||
      rawPath.includes('${')
    ) {
      continue;
    }

    if (!validPages.has(rawPath)) {
      brokenLinks.push({ file: path.relative(path.join(__dirname, '..'), file), path: rawPath });
    } else {
      verifiedLinks.add(rawPath);
    }
  }
}

console.log('Total unique valid routes linked:', verifiedLinks.size);
console.log('Broken internal links found:', brokenLinks.length);

if (brokenLinks.length > 0) {
  console.log('BROKEN LINKS DETAILS:', JSON.stringify(brokenLinks, null, 2));
} else {
  console.log('✅ ALL INTERNAL ROUTE LINKS VERIFIED 100% HEALTHY!');
}
