# Quick Start Guide 🚀

Get Flow Radar running in 5 minutes!

## Step 1: Install Dependencies

```bash
npm install
```

## Step 2: Set Up Environment Variables

Create a `.env` file:

```bash
cp .env.example .env
```

Add your credentials to `.env`:

```env
CMC_API_KEY=your_api_key_here
DATABASE_URL=postgresql://user:password@host:5432/database
```

### Get a Free CoinMarketCap API Key:
1. Go to https://coinmarketcap.com/api/
2. Sign up (free tier: 10,000 calls/month)
3. Copy your API key

### Get a Free PostgreSQL Database:
1. Go to https://supabase.com/
2. Create a new project
3. Copy the connection string from Settings → Database

## Step 3: Set Up Database

```bash
npx prisma migrate dev --name init
npx prisma generate
```

## Step 4: Run the App

```bash
npm run dev
```

Open http://localhost:3000 🎉

## What Happens Next?

1. The dashboard loads and automatically creates your first snapshot
2. You'll see the Top 200 cryptocurrencies with current market data
3. Rank changes will show once you have data from multiple days

## Daily Snapshots

The app automatically creates a snapshot when you visit. For production:

- Set up a cron job to call `POST /api/snapshots/today` daily
- Or use Vercel Cron Jobs (already configured in `vercel.json`)

## Troubleshooting

**"Failed to fetch global metrics"**
- Check your CMC_API_KEY is valid
- Make sure you haven't exceeded API limits

**"No snapshot found"**
- Just visit the dashboard - it will create one automatically

**Database errors**
- Verify DATABASE_URL is correct
- Run `npx prisma migrate dev` again

## Next Steps

- Explore the Flows & Movers section
- Try filtering and sorting the table
- Check back tomorrow to see rank changes!

---

Need help? Check the full [README.md](./README.md) for detailed documentation.
