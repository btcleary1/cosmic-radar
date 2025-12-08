# Setup Checklist ✓

Follow this checklist to get Flow Radar running:

## Prerequisites
- [ ] Node.js 18+ installed
- [ ] Git installed (optional, for version control)

## Setup Steps

### 1. Install Dependencies
```bash
npm install
```
- [ ] Dependencies installed successfully
- [ ] No error messages

### 2. Get API Keys & Database

#### CoinMarketCap API Key
- [ ] Visit https://coinmarketcap.com/api/
- [ ] Create free account
- [ ] Copy API key from dashboard
- [ ] Save for next step

#### PostgreSQL Database
Choose one option:

**Option A: Supabase (Recommended)**
- [ ] Visit https://supabase.com/
- [ ] Create free account
- [ ] Create new project
- [ ] Go to Settings → Database
- [ ] Copy connection string
- [ ] Save for next step

**Option B: Local PostgreSQL**
- [ ] Install PostgreSQL locally
- [ ] Create database named `flowradar`
- [ ] Note connection details

### 3. Configure Environment
```bash
cp .env.example .env
```
- [ ] `.env` file created
- [ ] Add `CMC_API_KEY=your_key_here`
- [ ] Add `DATABASE_URL=your_connection_string`
- [ ] Save file

### 4. Set Up Database
```bash
npx prisma migrate dev --name init
```
- [ ] Migration completed successfully
- [ ] Tables created in database

```bash
npx prisma generate
```
- [ ] Prisma Client generated
- [ ] No errors

### 5. Start Development Server
```bash
npm run dev
```
- [ ] Server started on http://localhost:3000
- [ ] No error messages
- [ ] Open browser to http://localhost:3000

### 6. Verify Dashboard
- [ ] Dashboard loads successfully
- [ ] Metrics cards show data
- [ ] Top 200 table displays coins
- [ ] No error messages in browser console

## Troubleshooting

If you encounter issues:

### "Failed to fetch global metrics"
- Check CMC_API_KEY is correct
- Verify API key is active
- Check you haven't exceeded rate limit (10k/month free)

### "Database connection failed"
- Verify DATABASE_URL is correct
- Check database is running
- Ensure network access is allowed

### "No snapshot found"
- This is normal on first visit
- Dashboard will create one automatically
- Refresh the page if needed

### TypeScript/Build Errors
- Run `npm install` again
- Delete `node_modules` and `.next` folders
- Run `npm install` fresh
- Run `npx prisma generate`

## Next Steps

Once everything is working:

- [ ] Explore the dashboard features
- [ ] Try filtering and sorting the table
- [ ] Check the Flows & Movers section
- [ ] Wait 24 hours to see rank changes
- [ ] Consider deploying to Vercel

## Deployment Checklist (Optional)

### Deploy to Vercel
- [ ] Push code to GitHub
- [ ] Import repository in Vercel
- [ ] Add environment variables in Vercel dashboard
  - [ ] CMC_API_KEY
  - [ ] DATABASE_URL
- [ ] Deploy
- [ ] Visit deployed URL
- [ ] Verify everything works

## Success Criteria

You're all set when:
- ✅ Dashboard loads without errors
- ✅ Market metrics display correctly
- ✅ Top 200 table shows cryptocurrency data
- ✅ You can search and filter coins
- ✅ Flows & Movers section is visible

---

**Need Help?**
- Check [README.md](./README.md) for detailed documentation
- Review [QUICKSTART.md](./QUICKSTART.md) for quick setup
- Check [PROJECT_SUMMARY.md](./PROJECT_SUMMARY.md) for technical details

**Having Issues?**
- Verify all environment variables are set correctly
- Check that your database is accessible
- Ensure your API key is valid
- Review error messages carefully

---

🎉 **Congratulations!** Once all items are checked, you're ready to track crypto markets with Flow Radar!
