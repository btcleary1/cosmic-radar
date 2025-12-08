# File Structure 📁

Complete file tree for the Flow Radar project:

```
flow-radar/
│
├── 📁 app/                              # Next.js App Router
│   ├── 📁 api/                          # API Routes
│   │   ├── 📁 global/
│   │   │   └── route.ts                 # Global metrics endpoint
│   │   ├── 📁 top200/
│   │   │   └── 📁 live/
│   │   │       └── route.ts             # Live Top 200 endpoint
│   │   └── 📁 snapshots/
│   │       ├── 📁 today/
│   │       │   └── route.ts             # Create/get today's snapshot
│   │       └── 📁 compare/
│   │           └── route.ts             # Compare snapshots
│   │
│   ├── globals.css                      # Global styles + Tailwind
│   ├── layout.tsx                       # Root layout
│   └── page.tsx                         # Main dashboard page
│
├── 📁 components/                       # React Components
│   ├── 📁 dashboard/
│   │   ├── FlowsSection.tsx             # Flows & Movers section
│   │   ├── GainersLosersPanel.tsx       # Gainers/Losers cards
│   │   ├── MetricsRow.tsx               # Hero metrics cards
│   │   ├── NewsPanel.tsx                # News panel (placeholder)
│   │   ├── RankChangeCell.tsx           # Rank change indicator
│   │   ├── TierMovementCards.tsx        # Tier movement cards
│   │   └── TopCoinsTable.tsx            # Main Top 200 table
│   │
│   └── 📁 layout/
│       └── Header.tsx                   # App header
│
├── 📁 lib/                              # Utility Libraries
│   ├── cmcClient.ts                     # CoinMarketCap API client
│   ├── compare.ts                       # Snapshot comparison logic
│   ├── date.ts                          # Date utility functions
│   └── prisma.ts                        # Prisma client singleton
│
├── 📁 prisma/                           # Prisma ORM
│   └── schema.prisma                    # Database schema
│
├── 📄 .env.example                      # Environment variables template
├── 📄 .gitignore                        # Git ignore rules
├── 📄 next.config.js                    # Next.js configuration
├── 📄 package.json                      # Dependencies & scripts
├── 📄 postcss.config.js                 # PostCSS configuration
├── 📄 tailwind.config.ts                # Tailwind CSS configuration
├── 📄 tsconfig.json                     # TypeScript configuration
├── 📄 vercel.json                       # Vercel deployment config
│
├── 📖 README.md                         # Main documentation
├── 📖 QUICKSTART.md                     # Quick setup guide
├── 📖 SETUP_CHECKLIST.md                # Setup checklist
├── 📖 PROJECT_SUMMARY.md                # Project overview
└── 📖 FILE_STRUCTURE.md                 # This file

Generated after build:
├── 📁 .next/                            # Next.js build output
├── 📁 node_modules/                     # Dependencies
└── 📁 prisma/migrations/                # Database migrations
```

## Key Files Explained

### Configuration Files

| File | Purpose |
|------|---------|
| `package.json` | Project dependencies and npm scripts |
| `tsconfig.json` | TypeScript compiler configuration |
| `tailwind.config.ts` | Tailwind CSS theme and settings |
| `next.config.js` | Next.js framework configuration |
| `prisma/schema.prisma` | Database schema definition |
| `vercel.json` | Deployment and cron job configuration |
| `.env.example` | Template for environment variables |

### API Routes

| Route | Method | Purpose |
|-------|--------|---------|
| `/api/global` | GET | Fetch global market metrics |
| `/api/top200/live` | GET | Get live Top 200 data |
| `/api/snapshots/today` | POST | Create/retrieve today's snapshot |
| `/api/snapshots/compare` | GET | Compare snapshots |

### Core Components

| Component | Purpose |
|-----------|---------|
| `Header.tsx` | Top navigation bar |
| `MetricsRow.tsx` | Market metrics cards |
| `TopCoinsTable.tsx` | Main cryptocurrency table |
| `RankChangeCell.tsx` | Rank change visualization |
| `FlowsSection.tsx` | Tier movement section |
| `TierMovementCards.tsx` | Tier-specific movements |
| `GainersLosersPanel.tsx` | Top gainers/losers |
| `NewsPanel.tsx` | News section (placeholder) |

### Library Modules

| Module | Purpose |
|--------|---------|
| `cmcClient.ts` | CoinMarketCap API wrapper |
| `compare.ts` | Snapshot comparison logic |
| `date.ts` | Date utility functions |
| `prisma.ts` | Database client singleton |

### Documentation Files

| File | Purpose |
|------|---------|
| `README.md` | Comprehensive project documentation |
| `QUICKSTART.md` | 5-minute setup guide |
| `SETUP_CHECKLIST.md` | Step-by-step setup checklist |
| `PROJECT_SUMMARY.md` | Technical overview |
| `FILE_STRUCTURE.md` | This file - project structure |

## File Counts

- **TypeScript Files**: 20+
- **React Components**: 8
- **API Routes**: 4
- **Library Modules**: 4
- **Configuration Files**: 7
- **Documentation Files**: 5

## Total Lines of Code

Approximate breakdown:
- **Frontend Components**: ~1,500 lines
- **API Routes**: ~400 lines
- **Library Modules**: ~600 lines
- **Configuration**: ~200 lines
- **Documentation**: ~1,000 lines

**Total**: ~3,700+ lines of code

## Import Paths

The project uses TypeScript path aliases:

```typescript
// Use @/ to reference root directory
import Header from '@/components/layout/Header';
import { prisma } from '@/lib/prisma';
import { CoinComparison } from '@/lib/compare';
```

Configured in `tsconfig.json`:
```json
{
  "paths": {
    "@/*": ["./*"]
  }
}
```

## Build Output

After running `npm run build`:

```
.next/
├── cache/              # Build cache
├── server/             # Server-side code
├── static/             # Static assets
└── types/              # Generated types
```

## Database Files

After running migrations:

```
prisma/
├── schema.prisma       # Schema definition
└── migrations/         # Migration history
    └── YYYYMMDDHHMMSS_init/
        └── migration.sql
```

---

This structure follows Next.js 14 App Router conventions and best practices for scalable React applications.
