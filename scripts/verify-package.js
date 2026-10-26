const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const tarPath = path.resolve('TRUSTGRID-AI-28-10-2026.tar');
if (!fs.existsSync(tarPath)) {
  console.error("Tar file does not exist:", tarPath);
  process.exit(1);
}

const stats = fs.statSync(tarPath);
const sizeMB = (stats.size / (1024 * 1024)).toFixed(2);
console.log(`Tar File Size: ${stats.size} bytes (${sizeMB} MB)`);

console.log("Reading archive file list via 'tar -tf'...");
const output = execSync('tar -tf TRUSTGRID-AI-28-10-2026.tar', { encoding: 'utf-8', maxBuffer: 50 * 1024 * 1024 });
const files = output.split(/\r?\n/).filter(f => f.trim().length > 0);
console.log(`Total Files in Archive: ${files.length}`);

const keyFiles = [
  './release-manifest.json',
  './package.json',
  './README.md',
  './DEPLOYMENT.md',
  './.env.example',
  './app/layout.tsx',
  './public/favicon.ico',
  './.next/BUILD_ID'
];

console.log("\nVerifying Critical Files:");
keyFiles.forEach(kf => {
  const present = files.some(f => f.includes(kf.replace(/^\.\//, '')));
  console.log(`[${present ? 'PASS' : 'FAIL'}] ${kf}`);
});

const forbidden = [
  'node_modules',
  '.git',
  '.next/cache',
  '.next/dev',
  'coverage',
  '.vercel'
];

console.log("\nVerifying Exclusions:");
forbidden.forEach(fb => {
  const matches = files.filter(f => {
    if (fb === '.git') {
      return f === './.git' || f === '.git' || f.startsWith('./.git/') || f.startsWith('.git/');
    }
    return f.startsWith('./' + fb) || f.startsWith(fb);
  });
  console.log(`[${matches.length === 0 ? 'PASS' : 'FAIL'}] Excluded: ${fb} (found ${matches.length})`);
});
