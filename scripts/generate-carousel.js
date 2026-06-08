/**
 * Generate a monochrome technology carousel SVG.
 *
 * The animation is intentionally subtle: it works as texture, not decoration.
 * The asset is self-contained and supports light/dark mode.
 */

const fs = require('node:fs');
const path = require('node:path');

const DIST_DIR = path.join(__dirname, '..', 'dist');
const WIDTH = 960;
const HEIGHT = 72;
const ITEM_HEIGHT = 34;
const GAP = 14;
const PADDING_Y = (HEIGHT - ITEM_HEIGHT) / 2;
const SPEED = 56;

const stack = [
  'TypeScript', 'Go', 'Rust', 'Linux', 'SolidJS', 'TanStack', 'Rsbuild',
  'PostgreSQL', 'Redis', 'NATS JetStream', 'Kafka', 'Docker', 'Fastify',
  'Bun', 'Elysia', 'Gin', 'Drizzle', 'GORM', 'Zitadel', 'Casbin',
  'CI/CD', 'Observability',
];

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function widthFor(label) {
  return Math.max(88, label.length * 8 + 34);
}

const items = stack.map((label) => ({ label, width: widthFor(label) }));
const totalWidth = items.reduce((sum, item) => sum + item.width + GAP, 0);
const duration = Math.max(24, Math.round(totalWidth / SPEED));

function renderItems(offset) {
  let x = offset;

  return items.map((item) => {
    const currentX = x;
    x += item.width + GAP;

    return `
      <g transform="translate(${currentX}, ${PADDING_Y})">
        <rect class="pill" width="${item.width}" height="${ITEM_HEIGHT}" rx="17"/>
        <text class="mono pill-text" x="${item.width / 2}" y="${ITEM_HEIGHT / 2 + 0.5}" text-anchor="middle" dominant-baseline="middle">${escapeXml(item.label)}</text>
      </g>`;
  }).join('');
}

const svg = `<svg
  width="${WIDTH}"
  height="${HEIGHT}"
  viewBox="0 0 ${WIDTH} ${HEIGHT}"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-label="Technology stack carousel: TypeScript, Go, Rust, Linux, SolidJS, TanStack, Rsbuild, PostgreSQL, NATS JetStream, Kafka, Docker, and related tools."
>
  <defs>
    <style>
      .bg { fill: #ffffff; }
      .pill { fill: #fafafa; stroke: #d4d4d4; stroke-width: 1; }
      .pill-text { fill: #404040; font-size: 12px; font-weight: 600; letter-spacing: 0.01em; }
      .fade-light { display: inline; }
      .fade-dark { display: none; }
      .mono { font-family: 'JetBrains Mono', 'SFMono-Regular', 'Cascadia Code', 'Fira Code', Consolas, monospace; }

      @keyframes scroll {
        from { transform: translateX(0); }
        to { transform: translateX(-${totalWidth}px); }
      }

      .track { animation: scroll ${duration}s linear infinite; }

      @media (prefers-color-scheme: dark) {
        .bg { fill: #0d1117; }
        .pill { fill: #0d1117; stroke: #30363d; }
        .pill-text { fill: #b0b8c3; }
        .fade-light { display: none; }
        .fade-dark { display: inline; }
      }

      @media (prefers-reduced-motion: reduce) {
        .track { animation: none; }
      }
    </style>

    <clipPath id="clip">
      <rect width="${WIDTH}" height="${HEIGHT}" rx="0"/>
    </clipPath>

    <linearGradient id="fade-left-light" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0.96"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="fade-right-light" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#ffffff" stop-opacity="0"/>
      <stop offset="1" stop-color="#ffffff" stop-opacity="0.96"/>
    </linearGradient>
    <linearGradient id="fade-left-dark" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0d1117" stop-opacity="0.96"/>
      <stop offset="1" stop-color="#0d1117" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="fade-right-dark" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#0d1117" stop-opacity="0"/>
      <stop offset="1" stop-color="#0d1117" stop-opacity="0.96"/>
    </linearGradient>
  </defs>

  <rect class="bg" width="${WIDTH}" height="${HEIGHT}"/>

  <g clip-path="url(#clip)">
    <g class="track">
      ${renderItems(0)}
      ${renderItems(totalWidth)}
    </g>
  </g>

  <rect class="fade-light" x="0" y="0" width="92" height="${HEIGHT}" fill="url(#fade-left-light)"/>
  <rect class="fade-light" x="${WIDTH - 92}" y="0" width="92" height="${HEIGHT}" fill="url(#fade-right-light)"/>
  <rect class="fade-dark" x="0" y="0" width="92" height="${HEIGHT}" fill="url(#fade-left-dark)"/>
  <rect class="fade-dark" x="${WIDTH - 92}" y="0" width="92" height="${HEIGHT}" fill="url(#fade-right-dark)"/>
</svg>`;

fs.mkdirSync(DIST_DIR, { recursive: true });
fs.writeFileSync(path.join(DIST_DIR, 'tech-carousel.svg'), svg.trim() + '\n', 'utf8');
console.log('generated dist/tech-carousel.svg');
