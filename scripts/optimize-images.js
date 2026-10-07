const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const IMAGES_DIR = path.join(__dirname, '..', 'public', 'images');

async function processImages() {
  const files = fs.readdirSync(IMAGES_DIR);
  console.log(`Found ${files.length} files in ${IMAGES_DIR}`);

  for (const file of files) {
    if (!file.endsWith('.jpg') && !file.endsWith('.jpeg') && !file.endsWith('.png')) continue;
    
    // Ignore already converted variants if any
    if (file.includes('-sm.') || file.includes('-md.')) continue;

    const baseName = path.parse(file).name;
    const inputPath = path.join(IMAGES_DIR, file);
    const originalBuffer = fs.readFileSync(inputPath);
    const originalSize = originalBuffer.length;

    console.log(`Processing: ${file} (${(originalSize / 1024).toFixed(1)} KB)`);

    // 1. Generate WebP
    const webpPath = path.join(IMAGES_DIR, `${baseName}.webp`);
    await sharp(originalBuffer)
      .webp({ quality: 82, effort: 6 })
      .toFile(webpPath);
    const webpSize = fs.statSync(webpPath).size;

    // 2. Generate AVIF
    const avifPath = path.join(IMAGES_DIR, `${baseName}.avif`);
    await sharp(originalBuffer)
      .avif({ quality: 75, effort: 6 })
      .toFile(avifPath);
    const avifSize = fs.statSync(avifPath).size;

    // 3. Optimize the original JPG in-place (compressed with mozjpeg)
    const optimizedJpgBuffer = await sharp(originalBuffer)
      .jpeg({ quality: 82, mozjpeg: true })
      .toBuffer();
    fs.writeFileSync(inputPath, optimizedJpgBuffer);
    const newJpgSize = optimizedJpgBuffer.length;

    console.log(`  -> JPG: ${(newJpgSize / 1024).toFixed(1)} KB (Saved ${(((originalSize - newJpgSize) / originalSize) * 100).toFixed(1)}%)`);
    console.log(`  -> WebP: ${(webpSize / 1024).toFixed(1)} KB`);
    console.log(`  -> AVIF: ${(avifSize / 1024).toFixed(1)} KB`);
  }

  console.log('Image optimization complete!');
}

processImages().catch(console.error);
