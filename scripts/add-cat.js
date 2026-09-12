import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import crypto from 'node:crypto'
import { execSync } from 'node:child_process'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const projectRoot = path.resolve(__dirname, '../..')
const catsDir = path.join(projectRoot, 'src/assets/cats')
const manifestPath = path.join(catsDir, 'manifest.json')

function loadManifest() {
  if (!fs.existsSync(manifestPath)) return {}
  return JSON.parse(fs.readFileSync(manifestPath, 'utf8'))
}

function saveManifest(manifest) {
  fs.writeFileSync(manifestPath, JSON.stringify(manifest, null, 2) + '\n')
}

function hashFile(filePath) {
  return crypto.createHash('sha256').update(fs.readFileSync(filePath)).digest('hex')
}

function nextCatNumber(existingFiles) {
  const numbers = existingFiles
    .filter((f) => f.startsWith('cat-') && f.endsWith('.gif'))
    .map((f) => parseInt(f.replace('cat-', '').replace('.gif', ''), 10))
    .filter((n) => Number.isFinite(n))
  return numbers.length ? Math.max(...numbers) + 1 : 1
}

function downloadCat(targetPath) {
  const url = `https://cataas.com/cat/gif?width=120&height=120&t=${Date.now()}`
  fs.writeFileSync(targetPath, execSync(`curl -L "${url}"`, { encoding: 'utf8' }))
}

const manifest = loadManifest()
const nextNumber = nextCatNumber(Object.keys(manifest))
const targetPath = path.join(catsDir, `cat-${nextNumber}.gif`)

downloadCat(targetPath)
const newHash = hashFile(targetPath)

const duplicate = Object.entries(manifest).find(([, hash]) => hash === newHash)
if (duplicate) {
  fs.unlinkSync(targetPath)
  console.log(`Duplicate detected: ${targetPath} matches ${duplicate[0]} (${newHash}). Not adding.`)
  process.exit(0)
}

manifest[`cat-${nextNumber}.gif`] = newHash
saveManifest(manifest)
console.log(`Added ${path.basename(targetPath)} with hash ${newHash}`)
