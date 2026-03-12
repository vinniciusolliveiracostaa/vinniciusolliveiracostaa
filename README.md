<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0078d4&height=120&section=header" width="100%" />

# Vinícius Oliveira

<img src="https://readme-typing-svg.demolab.com?font=Fira+Code&size=18&duration=3000&pause=1000&color=0078D4&center=true&vCenter=true&width=500&lines=Principal+Software+Architect;Distributed+Systems+Engineer;Building+Scalable+Platforms" alt="Typing SVG" />

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=flat-square&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vinniciusolliveiracostaa/)
[![Email](https://img.shields.io/badge/Email-EA4335?style=flat-square&logo=gmail&logoColor=white)](mailto:vinniciusolliveiracostaa@outlook.com)

</div>

---

## About

Specialized in designing and building **distributed systems** and **event-driven architectures** for high-scale SaaS platforms. Focus on architectural decisions that balance technical excellence with business pragmatism.

**Core Expertise:**
- Multi-tenant architecture design
- Event-driven systems (NATS, Kafka)
- Zero Trust security implementation
- High-throughput data pipelines

---

## Technical Stack

<div align="center">

### ⚛️ Core Languages

![Atom Orbit](https://raw.githubusercontent.com/vinniciusolliveiracostaa/vinniciusolliveiracostaa/output/atom-orbit.svg)

</div>

<div align="center">

### 🔄 Technology Carousel

![Tech Carousel](https://raw.githubusercontent.com/vinniciusolliveiracostaa/vinniciusolliveiracostaa/output/tech-carousel.svg)

</div>

<div align="center">

### 🛠️ Complete Toolset

<details>
<summary><b>View all technologies and tools</b></summary>

<br>

**Backend Frameworks**
```
Fastify • NestJS • Gin • Elysia
```

**Frontend Frameworks**
```
Next.js • SolidJS • Yew
```

**Databases & ORMs**
```
PostgreSQL • Redis • GORM • TypeORM • Prisma • Drizzle
```

**Message Brokers**
```
NATS • Apache Kafka
```

**Authentication & Authorization**
```
Zitadel • Keycloak • CASL • Casbin • Oso
```

**Infrastructure & DevOps**
```
Docker • Linux • AWS • WireGuard • GitHub Actions • Nginx
```

**Runtimes & Tools**
```
Node.js • Bun • Vite • Shell Script
```

**Styling**
```
TailwindCSS • HTML • CSS
```

</details>

</div>

---

## Architecture Principles

<table>
<tr>
<td width="50%">

```yaml
design:
  - Domain-Driven Design
  - Clean Architecture
  - Event Sourcing
  - CQRS Pattern
```

</td>
<td width="50%">

```yaml
approach:
  - Architecture First
  - Explicit Trade-offs
  - Boring Technology
  - Operational Excellence
```

</td>
</tr>
</table>

---

## Selected Work

<details>
<summary><b>Multi-Tenant SaaS Platform</b></summary>

<br>

Enterprise governance platform with 7 integrated products under unified identity layer.

**Architecture:**
```mermaid
graph LR
    A[API Gateway] --> B[Identity]
    A --> C[Core Services]
    B --> D[(PostgreSQL)]
    C --> D
    B --> E[Event Bus]
    C --> E
    E --> F[Redis Cache]
    
    style A fill:#0078d4,color:#fff
    style E fill:#27aae1,color:#fff
```

**Key Decisions:**
- Modular monolith → microservices evolution path
- NATS JetStream for event orchestration
- PostgreSQL with tenant isolation
- ABAC authorization with dynamic policies

**Metrics:** `p95 < 200ms` | `1000 req/s` | `99.5% uptime`

</details>

<details>
<summary><b>High-Throughput Data Pipeline</b></summary>

<br>

CSV processing system handling 100k+ rows with zero data loss.

**Architecture:**
```
CSV Stream → Chunk Processor → Deduplication (SHA-256)
     ↓              ↓                    ↓
Validation → Worker Pool (5) → PostgreSQL (Batch)
     ↓              ↓                    ↓
Error Queue → Kafka Events → Progress Tracking
```

**Key Features:**
- Streaming ingestion with backpressure
- Atomic deduplication using content hashing
- Transactional outbox pattern
- Automatic retry with exponential backoff

</details>

---

## GitHub Activity

<div align="center">

<img height="180em" src="https://github-readme-stats.vercel.app/api?username=vinniciusolliveiracostaa&show_icons=true&theme=transparent&title_color=0078d4&text_color=555&icon_color=0078d4&hide_border=true&include_all_commits=true&count_private=true" />
<img height="180em" src="https://github-readme-stats.vercel.app/api/top-langs/?username=vinniciusolliveiracostaa&layout=compact&theme=transparent&title_color=0078d4&text_color=555&hide_border=true&langs_count=6" />

</div>

<div align="center">

![Snake animation](https://raw.githubusercontent.com/vinniciusolliveiracostaa/vinniciusolliveiracostaa/output/github-contribution-grid-snake-dark.svg)

</div>

---

## Contact

For architecture consulting or technical leadership opportunities:

<div align="center">

[![LinkedIn](https://img.shields.io/badge/LinkedIn-0A66C2?style=for-the-badge&logo=linkedin&logoColor=white)](https://www.linkedin.com/in/vinniciusolliveiracostaa/)
[![Email](https://img.shields.io/badge/Email-EA4335?style=for-the-badge&logo=gmail&logoColor=white)](mailto:vinniciusolliveiracostaa@outlook.com)

</div>

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=0078d4&height=100&section=footer" width="100%" />

</div>
