import { readFile } from 'node:fs/promises'
import path from 'node:path'

const filesToCheck = [
  'README.md',
  'docs/local-development.md',
  'docs/maps-configuration.md',
  'index.html',
  'map.html',
  'user-prefs.html',
  'js/main.controller.js',
  'js/map.controller.js',
  'js/maps-config.example.js',
  'js/placeService.js',
  'js/user-prefs.controller.js',
  'js/userService.js',
  'js/utilService.js'
]

const keyPattern = /AIza[0-9A-Za-z_-]{20,}/g
const placeholder = 'YOUR_GOOGLE_MAPS_API_KEY'

const violations = []

for (const relativePath of filesToCheck) {
  const absolutePath = path.resolve(relativePath)
  const content = await readFile(absolutePath, 'utf8')
  const matches = content.match(keyPattern) ?? []

  for (const match of matches) {
    if (match !== placeholder) {
      violations.push({ relativePath, match })
    }
  }
}

if (violations.length) {
  console.error('Detected committed Google Maps API key candidates:')
  for (const violation of violations) {
    console.error(`- ${violation.relativePath}: ${violation.match}`)
  }
  process.exit(1)
}

console.log('No committed Google Maps API key candidates were found in tracked app files.')
