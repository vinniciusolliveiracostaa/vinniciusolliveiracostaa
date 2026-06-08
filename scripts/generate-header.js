/**
 * Generate a monochrome, terminal-inspired header SVG for the GitHub profile.
 *
 * Design goals:
 * - Professional black/white visual language with light/dark mode support.
 * - Subtle motion only; no loud badges, emojis, or over-animated effects.
 * - Self-contained SVG output without runtime dependencies.
 */

const fs = require('node:fs');
const path = require('node:path');

const WIDTH = 960;
const HEIGHT = 260;
const CENTER_X = WIDTH / 2;
const DIST_DIR = path.join(__dirname, '..', 'dist');

const lines = [
  {
    command: 'whoami',
    output: 'Vinícius Oliveira · Software Engineer · Backend · DevOps · Solutions Architecture',
  },
  {
    command: 'cat focus.txt',
    output: 'Distributed systems · Linux infrastructure · Domain modeling · Observability',
  },
  {
    command: './build-platform',
    output: 'TypeScript · Go · Rust as principal engineering stack',
  },
  {
    command: 'principle --one-line',
    output: 'Understand the system before abstracting it.',
  },
];

function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&apos;');
}

function renderLine(line, index) {
  const yCommand = 72 + index * 42;
  const yOutput = yCommand + 18;
  return `
  <text class="mono line" x="32" y="${yCommand}" font-size="13">
    <tspan class="prompt">$ </tspan><tspan class="main">${escapeXml(line.command)}</tspan>
  </text>
  <text class="mono line" x="32" y="${yOutput}" font-size="13">
    <tspan class="muted">=&gt; </tspan><tspan class="main">${escapeXml(line.output)}</tspan>
  </text>`;
}

const svg = `<svg
  width="${WIDTH}"
  height="${HEIGHT}"
  viewBox="0 0 ${WIDTH} ${HEIGHT}"
  xmlns="http://www.w3.org/2000/svg"
  role="img"
  aria-label="Vinícius Oliveira — Software Engineer focused on backend systems, Go, Rust, TypeScript, DevOps, Linux infrastructure, and solutions architecture."
>
  <defs>
    <style>
      .surface { fill: #fafafa; }
      .chrome { fill: #f3f4f6; }
      .border { fill: none; stroke: #d4d4d4; stroke-width: 1; }
      .divider { stroke: #d4d4d4; stroke-width: 1; }
      .title { fill: #737373; font-size: 12px; letter-spacing: 0.02em; }
      .prompt { fill: #525252; }
      .main { fill: #171717; }
      .muted { fill: #737373; }
      .cursor { fill: #171717; }
      .dot { fill: #171717; opacity: 0.85; }
      .mono { font-family: 'JetBrains Mono', 'SFMono-Regular', 'Cascadia Code', 'Fira Code', Consolas, monospace; }
      .line { dominant-baseline: alphabetic; }

      @keyframes cursor-blink {
        0%, 48% { opacity: 1; }
        49%, 100% { opacity: 0; }
      }

      .cursor { animation: cursor-blink 1s step-start 2.8s infinite; opacity: 0; }

      @media (prefers-color-scheme: dark) {
        .surface { fill: #0d1117; }
        .chrome { fill: #161b22; }
        .border { stroke: #30363d; }
        .divider { stroke: #30363d; }
        .title { fill: #8b949e; }
        .prompt { fill: #8b949e; }
        .main { fill: #e6edf3; }
        .muted { fill: #6e7681; }
        .cursor { fill: #e6edf3; }
        .dot { fill: #e6edf3; opacity: 0.85; }
      }

      @media (prefers-reduced-motion: reduce) {
        .cursor { animation: none; opacity: 1; }
      }
    </style>
  </defs>

  <rect class="surface" x="0.5" y="0.5" width="${WIDTH - 1}" height="${HEIGHT - 1}" rx="14"/>
  <rect class="chrome" x="0.5" y="0.5" width="${WIDTH - 1}" height="42" rx="14"/>
  <rect class="chrome" x="0.5" y="30" width="${WIDTH - 1}" height="13"/>
  <rect class="border" x="0.5" y="0.5" width="${WIDTH - 1}" height="${HEIGHT - 1}" rx="14"/>
  <line class="divider" x1="0" y1="43" x2="${WIDTH}" y2="43"/>

  <circle class="dot" cx="24" cy="22" r="5"/>
  <circle class="dot" cx="42" cy="22" r="5" opacity="0.55"/>
  <circle class="dot" cx="60" cy="22" r="5" opacity="0.3"/>

  <text class="mono title" x="${CENTER_X}" y="27" text-anchor="middle">vinnicostaa · github / linkedin / discord · platform / systems / infrastructure</text>

  ${lines.map(renderLine).join('\n')}

  <text class="mono cursor" x="32" y="238" font-size="13">▌</text>
</svg>`;

fs.mkdirSync(DIST_DIR, { recursive: true });
fs.writeFileSync(path.join(DIST_DIR, 'header.svg'), svg.trim() + '\n', 'utf8');
console.log('generated dist/header.svg');
