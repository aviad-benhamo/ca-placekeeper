import { readFile } from 'node:fs/promises'
import path from 'node:path'
import { pathToFileURL } from 'node:url'

export const filesToCheck = [
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

export const keyPattern = /AIza[0-9A-Za-z_-]{20,}/g
export const placeholder = 'YOUR_GOOGLE_MAPS_API_KEY'

function getLineNumber(content, matchIndex) {
  return content.slice(0, matchIndex).split('\n').length
}

export async function scanFilesForCommittedKeys(pathsToCheck = filesToCheck) {
  const violations = []

  for (const relativePath of pathsToCheck) {
    const absolutePath = path.resolve(relativePath)
    const content = await readFile(absolutePath, 'utf8')

    for (const match of content.matchAll(keyPattern)) {
      const detectedValue = match[0]
      if (detectedValue !== placeholder) {
        violations.push({
          relativePath,
          lineNumber: getLineNumber(content, match.index ?? 0),
          reason: 'Potential committed Google Maps API key candidate'
        })
      }
    }
  }

  return violations
}

export function formatViolation(violation) {
  const location = violation.lineNumber
    ? `${violation.relativePath}:${violation.lineNumber}`
    : violation.relativePath

  return `- ${location}: ${violation.reason}`
}

async function main() {
  const violations = await scanFilesForCommittedKeys()

  if (violations.length) {
    console.error('Detected committed Google Maps API key candidates:')
    for (const violation of violations) {
      console.error(formatViolation(violation))
    }
    process.exit(1)
  }

  console.log('No committed Google Maps API key candidates were found in tracked app files.')
}

if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  await main()
}
