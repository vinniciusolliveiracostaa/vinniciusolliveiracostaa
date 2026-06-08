/**
 * Generate a compact systems map SVG.
 *
 * This replaces a purely decorative orbit with a more professional diagram that
 * communicates the profile's engineering center: domain, services, infra,
 * security, observability, and developer tooling.
 */

const fs = require('node:fs');
const path = require('node:path');

const WIDTH = 760;
const HEIGHT = 360;
const DIST_DIR = path.join(__dirname, '..', 'dist');
const CENTER = { x: WIDTH / 2, y: HEIGHT / 2 };

const nodes = [
  { label: 'Domain', sub: 'DDD · CQRS', x: 130, y: 84 },
  { label: 'Services', sub: 'APIs · Events', x: 380, y: 64 },
  { label: 'Data', sub: 'Postgres · Redis', x: 630, y: 84 },
  { label: 'Infra', sub: 'Linux · Docker', x: 130, y: 276 },
  { label: 'Security', sub: 'IAM · Zero Trust', x: 380, y: 296 },
  { label: 'Observability', sub: 'Logs · Metrics', x: 630, y: 276 },
];

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function renderNode(node) {
  return `
  <g class="node" transform="translate(${node.x - 86}, ${node.y - 32})">
    <rect class="node-rect" width="172" height="64" rx="10"/>
    <text class="mono node-label" x="86" y="27" text-anchor="middle">${escapeXml(node.label)}</text>
    <text class="mono node-sub" x="86" y="45" text-anchor="middle">${escapeXml(node.sub)}</text>
  </g>`;
}

function lineTo(node) {
  return `<line class="connector" x1="${CENTER.x}" y1="${CENTER.y}" x2="${node.x}" y2="${node.y}"/>`;
}

const svg = `<svg
  width="${WIDTH}"
  height="${HEIGHT}"
  viewBox="0 0 ${WIDTH} ${HEIGHT}"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-label="System map connecting domain modeling, backend services, data, infrastructure, security, and observability."
>
  <defs>
    <style>
      .bg { fill: #ffffff; }
      .connector { stroke: #d4d4d4; stroke-width: 1; stroke-dasharray: 4 5; }
      .core { fill: #171717; }
      .core-text { fill: #fafafa; font-size: 14px; font-weight: 700; }
      .core-sub { fill: #d4d4d4; font-size: 10px; }
      .node-rect { fill: #fafafa; stroke: #d4d4d4; stroke-width: 1; }
      .node-label { fill: #171717; font-size: 13px; font-weight: 700; }
      .node-sub { fill: #737373; font-size: 10px; }
      .mono { font-family: 'JetBrains Mono', 'SFMono-Regular', 'Cascadia Code', 'Fira Code', Consolas, monospace; }

      @media (prefers-color-scheme: dark) {
        .bg { fill: #0d1117; }
        .connector { stroke: #30363d; }
        .core { fill: #e6edf3; }
        .core-text { fill: #0d1117; }
        .core-sub { fill: #30363d; }
        .node-rect { fill: #0d1117; stroke: #30363d; }
        .node-label { fill: #e6edf3; }
        .node-sub { fill: #8b949e; }
      }

    </style>
  </defs>

  <rect class="bg" width="${WIDTH}" height="${HEIGHT}"/>
  ${nodes.map(lineTo).join('\n  ')}

  <g>
    <circle class="core" cx="${CENTER.x}" cy="${CENTER.y}" r="58"/>
    <text class="mono core-text" x="${CENTER.x}" y="${CENTER.y - 4}" text-anchor="middle">Systems</text>
    <text class="mono core-sub" x="${CENTER.x}" y="${CENTER.y + 16}" text-anchor="middle">architecture</text>
  </g>

  ${nodes.map(renderNode).join('\n')}
</svg>`;

fs.mkdirSync(DIST_DIR, { recursive: true });
fs.writeFileSync(path.join(DIST_DIR, 'system-map.svg'), svg.trim() + '\n', 'utf8');
console.log('generated dist/system-map.svg');
