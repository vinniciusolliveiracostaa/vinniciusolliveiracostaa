const fs = require('fs');
const path = require('path');

const languages = [
  { name: 'TypeScript', color: '#3178C6', icon: 'TS' },
  { name: 'JavaScript', color: '#F7DF1E', icon: 'JS' },
  { name: 'Go', color: '#00ADD8', icon: 'Go' },
  { name: 'Rust', color: '#CE422B', icon: 'Rs' }
];

const svg = `
<svg width="500" height="500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @keyframes orbit1 { from { transform: rotate(0deg) translateX(100px) rotate(0deg); } to { transform: rotate(360deg) translateX(100px) rotate(-360deg); } }
      @keyframes orbit2 { from { transform: rotate(90deg) translateX(100px) rotate(-90deg); } to { transform: rotate(450deg) translateX(100px) rotate(-450deg); } }
      @keyframes orbit3 { from { transform: rotate(180deg) translateX(100px) rotate(-180deg); } to { transform: rotate(540deg) translateX(100px) rotate(-540deg); } }
      @keyframes orbit4 { from { transform: rotate(270deg) translateX(100px) rotate(-270deg); } to { transform: rotate(630deg) translateX(100px) rotate(-630deg); } }
      @keyframes pulse { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.1); } }
      
      .orbit-ring { fill: none; stroke: rgba(0, 120, 212, 0.2); stroke-width: 2; }
      .core { animation: pulse 2s ease-in-out infinite; }
      .lang1 { animation: orbit1 10s linear infinite; transform-origin: 250px 250px; }
      .lang2 { animation: orbit2 10s linear infinite; transform-origin: 250px 250px; }
      .lang3 { animation: orbit3 10s linear infinite; transform-origin: 250px 250px; }
      .lang4 { animation: orbit4 10s linear infinite; transform-origin: 250px 250px; }
    </style>
  </defs>
  
  <!-- Orbit rings -->
  <circle class="orbit-ring" cx="250" cy="250" r="100"/>
  
  <!-- Core -->
  <g class="core">
    <circle cx="250" cy="250" r="40" fill="url(#coreGradient)"/>
    <text x="250" y="265" text-anchor="middle" font-size="32" fill="white">⚛️</text>
  </g>
  
  <defs>
    <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0078d4;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#00a4ef;stop-opacity:1" />
    </linearGradient>
  </defs>
  
  <!-- Languages -->
  ${languages.map((lang, i) => `
  <g class="lang${i + 1}">
    <circle cx="250" cy="250" r="30" fill="${lang.color}" filter="url(#shadow)"/>
    <text x="250" y="260" text-anchor="middle" font-size="16" font-weight="bold" fill="white">${lang.icon}</text>
  </g>
  `).join('')}
  
  <defs>
    <filter id="shadow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur in="SourceAlpha" stdDeviation="3"/>
      <feOffset dx="0" dy="2" result="offsetblur"/>
      <feComponentTransfer>
        <feFuncA type="linear" slope="0.3"/>
      </feComponentTransfer>
      <feMerge>
        <feMergeNode/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>
  </defs>
</svg>
`.trim();

const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(path.join(distDir, 'atom-orbit.svg'), svg);
console.log('✅ Atom orbit SVG generated');
