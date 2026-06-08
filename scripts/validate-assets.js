/**
 * Validate generated SVG assets without external dependencies.
 */

const fs = require('node:fs');
const path = require('node:path');
const { XMLParser } = (() => {
  try {
    return require('node:util');
  } catch {
    return {};
  }
})();

const distDir = path.join(__dirname, '..', 'dist');
const expected = ['header.svg', 'system-map.svg', 'tech-carousel.svg'];

for (const file of expected) {
  const fullPath = path.join(distDir, file);

  if (!fs.existsSync(fullPath)) {
    throw new Error(`Missing generated asset: ${file}`);
  }

  const content = fs.readFileSync(fullPath, 'utf8');

  if (!content.startsWith('<svg')) {
    throw new Error(`${file} does not start with <svg`);
  }

  if (!content.includes('</svg>')) {
    throw new Error(`${file} is missing a closing </svg> tag`);
  }

  if (!content.includes('role="img"') || !content.includes('aria-label=')) {
    throw new Error(`${file} must include role="img" and aria-label for accessibility`);
  }
}

console.log('validated generated SVG assets');
