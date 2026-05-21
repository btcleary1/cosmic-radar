# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev          # Dev server on port 3000
npm run dev:health   # Dev server on port 3001 (health module)
npm run build        # Production build (also runs via vercel.json: prisma generate && next build)
npm run lint         # Next.js linter

npx prisma migrate dev --name <name>   # Run DB migrations
npx prisma generate                    # Regenerate Prisma client
```

## Architecture

**Stack:** Next.js 14 App Router, TypeScript, Tailwind CSS, PostgreSQL (Prisma), NextAuth.js

This repo contains two distinct applications sharing one Next.js project:

### 1. Cosmic Radar (primary) — Crypto/DeFi Dashboard
- Top 200 cryptocurrencies via CoinMarketCap Pro API
- Daily snapshots stored in Postgres, compared over time via `/api/snapshots/compare`
- DeFi metrics from DeFi Llama, news from CryptoPanic
- Cron job (`vercel.json`) hits `/api/snapshots/today` daily at midnight UTC
- Key data flow: `lib/cmcClient.ts` → API routes → React components in `/components/dashboard/`

### 2. Brad's Bargains (deal-wiz) — Deals/Bargains App
- Routes under the deals/bargains section
- Separate from the health module

### 3. Health Wiz (ethan-health) — Pediatric Cardiac Monitoring
- Routes under `/health/*`
- Uses Anthropic SDK (`@anthropic-ai/sdk`) at `/api/health/ai-analysis` for Claude-powered medical analysis
- Doctor briefing generation, incident tracking, file uploads

### Auth
- NextAuth with Google OAuth + email/password
- Web3 wallet sign-in via wagmi/viem/SIWE (Ethereum)
- Config in `lib/auth.ts`

### Data Layer
- Prisma singleton at `lib/prisma.ts`
- Models: Snapshot, CoinSnapshot, User, Account, Session, Watchlist, Alert, Holding
- Rate limiting in `lib/rateLimit.ts`, caching in `lib/cache.ts`

### Key env vars
`CMC_API_KEY`, `DATABASE_URL`, `NEXTAUTH_SECRET`, `NEXTAUTH_URL` — required  
`ANTHROPIC_API_KEY` — required for health module AI features  
`CRYPTOPANIC_API_KEY`, `GOOGLE_CLIENT_ID/SECRET` — optional
