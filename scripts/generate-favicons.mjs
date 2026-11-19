import fs from 'fs'
import path from 'path'
import sharp from 'sharp'

function createIco(images) {
  const count = images.length
  const headerLength = 6
  const dirEntryLength = 16
  let offset = headerLength + count * dirEntryLength

  const header = Buffer.alloc(headerLength)
  header.writeUInt16LE(0, 0)
  header.writeUInt16LE(1, 2)
  header.writeUInt16LE(count, 4)

  const dirEntries = []
  for (const img of images) {
    const entry = Buffer.alloc(dirEntryLength)
    entry.writeUInt8(img.width >= 256 ? 0 : img.width, 0)
    entry.writeUInt8(img.height >= 256 ? 0 : img.height, 1)
    entry.writeUInt8(0, 2)
    entry.writeUInt8(0, 3)
    entry.writeUInt16LE(1, 4)
    entry.writeUInt16LE(32, 6)
    entry.writeUInt32LE(img.buffer.length, 8)
    entry.writeUInt32LE(offset, 12)
    dirEntries.push(entry)
    offset += img.buffer.length
  }

  return Buffer.concat([header, ...dirEntries, ...images.map((i) => i.buffer)])
}

async function run() {
  const sourceLogoPath = path.resolve('public/images/trustgrid-logo.png')
  if (!fs.existsSync(sourceLogoPath)) {
    throw new Error('Source logo not found at ' + sourceLogoPath)
  }

  const logoBuf = fs.readFileSync(sourceLogoPath)

  // 1. Generate transparent square PNGs for 16, 32, 48
  const png16 = await sharp(logoBuf)
    .resize(16, 16, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  const png32 = await sharp(logoBuf)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  const png48 = await sharp(logoBuf)
    .resize(48, 48, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()

  // 2. Build multi-resolution ICO file
  const icoBuffer = createIco([
    { width: 16, height: 16, buffer: png16 },
    { width: 32, height: 32, buffer: png32 },
    { width: 48, height: 48, buffer: png48 }
  ])

  // Write favicon.ico to both public/ and app/
  fs.writeFileSync('public/favicon.ico', icoBuffer)
  fs.writeFileSync('app/favicon.ico', icoBuffer)
  console.log('Updated public/favicon.ico & app/favicon.ico')

  // 3. Generate icon-light-32x32.png (for light mode browser tabs)
  fs.writeFileSync('public/icon-light-32x32.png', png32)
  console.log('Updated public/icon-light-32x32.png')

  // 4. Generate icon-dark-32x32.png (for dark mode browser tabs)
  // Ensure crisp visibility on dark tab bars: slightly boost brightness/vibrancy so blue logo glows against pitch black
  const png32Dark = await sharp(logoBuf)
    .resize(32, 32, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .modulate({ brightness: 1.25, saturation: 1.2 })
    .png()
    .toBuffer()
  fs.writeFileSync('public/icon-dark-32x32.png', png32Dark)
  console.log('Updated public/icon-dark-32x32.png')

  // 5. Generate apple-icon.png (180x180, iOS requires non-transparent background)
  // Dark luxury slate background matching TRUSTGRID.AI enterprise theme (#030712)
  const appleIcon = await sharp(logoBuf)
    .resize(140, 140, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 20,
      bottom: 20,
      left: 20,
      right: 20,
      background: { r: 3, g: 7, b: 18, alpha: 1 }
    })
    .png()
    .toBuffer()
  fs.writeFileSync('public/apple-icon.png', appleIcon)
  console.log('Updated public/apple-icon.png')

  // 6. Generate SVG icon (public/icon.svg) with high-res base64
  const png180Logo = await sharp(logoBuf)
    .resize(150, 150, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .png()
    .toBuffer()
  const b64 = png180Logo.toString('base64')
  const svgContent = `<svg width="180" height="180" viewBox="0 0 180 180" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="180" height="180" rx="36" fill="#030712" />
  <image href="data:image/png;base64,${b64}" x="15" y="15" width="150" height="150" preserveAspectRatio="xMidYMid meet" />
</svg>`
  fs.writeFileSync('public/icon.svg', svgContent, 'utf8')
  console.log('Updated public/icon.svg')

  // 7. Generate large PWA icons (192 and 512)
  const icon192 = await sharp(logoBuf)
    .resize(150, 150, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 21,
      bottom: 21,
      left: 21,
      right: 21,
      background: { r: 3, g: 7, b: 18, alpha: 1 }
    })
    .png()
    .toBuffer()
  fs.writeFileSync('public/icon-192.png', icon192)

  const icon512 = await sharp(logoBuf)
    .resize(400, 400, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
    .extend({
      top: 56,
      bottom: 56,
      left: 56,
      right: 56,
      background: { r: 3, g: 7, b: 18, alpha: 1 }
    })
    .png()
    .toBuffer()
  fs.writeFileSync('public/icon-512.png', icon512)
  console.log('Updated public/icon-192.png & public/icon-512.png')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})
