const fs = require('fs');
const path = require('path');

const technologies = [
  'TypeScript', 'JavaScript', 'Go', 'Rust', 'Node.js', 'Bun',
  'Fastify', 'NestJS', 'Next.js', 'SolidJS', 'Gin', 'Elysia',
  'PostgreSQL', 'Redis', 'Kafka', 'NATS', 'Prisma', 'Drizzle',
  'GORM', 'TypeORM', 'Docker', 'Linux', 'AWS', 'Nginx',
  'Zitadel', 'Keycloak', 'CASL', 'Casbin', 'TailwindCSS', 'Vite'
];

const itemWidth = 120;
const itemHeight = 40;
const gap = 20;
const totalWidth = (itemWidth + gap) * technologies.length;

const svg = `
<svg width="800" height="80" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <style>
      @keyframes scroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${totalWidth}px); }
      }
      
      .carousel-track {
        animation: scroll 60s linear infinite;
      }
      
      .tech-item {
        fill: #0078d4;
        rx: 8;
      }
      
      .tech-text {
        fill: white;
        font-family: 'Segoe UI', Arial, sans-serif;
        font-size: 14px;
        font-weight: 600;
      }
    </style>
  </defs>
  
  <g class="carousel-track">
    ${technologies.map((tech, i) => {
      const x = i * (itemWidth + gap);
      return `
        <g transform="translate(${x}, 20)">
          <rect class="tech-item" width="${itemWidth}" height="${itemHeight}"/>
          <text class="tech-text" x="${itemWidth / 2}" y="${itemHeight / 2 + 5}" text-anchor="middle">${tech}</text>
        </g>
      `;
    }).join('')}
    
    ${technologies.map((tech, i) => {
      const x = totalWidth + i * (itemWidth + gap);
      return `
        <g transform="translate(${x}, 20)">
          <rect class="tech-item" width="${itemWidth}" height="${itemHeight}"/>
          <text class="tech-text" x="${itemWidth / 2}" y="${itemHeight / 2 + 5}" text-anchor="middle">${tech}</text>
        </g>
      `;
    }).join('')}
  </g>
</svg>
`.trim();

const distDir = path.join(__dirname, '..', 'dist');
if (!fs.existsSync(distDir)) {
  fs.mkdirSync(distDir, { recursive: true });
}

fs.writeFileSync(path.join(distDir, 'tech-carousel.svg'), svg);
console.log('✅ Tech carousel SVG generated');
