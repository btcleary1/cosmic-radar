# 🚀 Vercel Deployment Setup Guide

## ✅ Name Changed to "Cosmic Radar"
The app has been rebranded from "Flow Radar" to "Cosmic Radar" and pushed to GitHub.

## 🔴 Current Issue: Missing Environment Variables

Your deployment is showing an error because the required environment variables are not set in Vercel.

## 📋 Required Environment Variables

### 1. Go to Vercel Dashboard
1. Visit: https://vercel.com/dashboard
2. Click on your `cosmic-radar` project
3. Go to **Settings** → **Environment Variables**

### 2. Add These Variables

#### ✅ Required (Must Have):

**CMC_API_KEY**
```
Your CoinMarketCap API key
Get it from: https://coinmarketcap.com/api/
```

**DATABASE_URL**
```
Your PostgreSQL connection string
Format: postgresql://user:password@host:port/database?schema=public
```

**NEXTAUTH_URL**
```
https://cosmic-radar.vercel.app
(or your actual Vercel URL)
```

**NEXTAUTH_SECRET**
```
Generate with: openssl rand -base64 32
Or use any random 32+ character string
```

#### 🔄 Optional (For Full Features):

**GOOGLE_CLIENT_ID**
```
For Google OAuth sign-in
Get from: https://console.cloud.google.com/
```

**GOOGLE_CLIENT_SECRET**
```
For Google OAuth sign-in
```

**CRYPTOPANIC_API_KEY**
```
For news ticker
Get from: https://cryptopanic.com/developers/api/
```

## 🗄️ Database Setup Options

You need a PostgreSQL database. Choose one:

### Option 1: Vercel Postgres (Recommended)
1. In Vercel dashboard, go to **Storage**
2. Click **Create Database** → **Postgres**
3. Follow the setup wizard
4. Copy the `DATABASE_URL` automatically added to your env vars

### Option 2: Supabase (Free Tier)
1. Go to https://supabase.com
2. Create new project
3. Go to **Settings** → **Database**
4. Copy the connection string (URI format)
5. Add to Vercel as `DATABASE_URL`

### Option 3: Neon (Free Tier)
1. Go to https://neon.tech
2. Create new project
3. Copy the connection string
4. Add to Vercel as `DATABASE_URL`

## 🔧 After Adding Environment Variables

### 1. Run Database Migrations
Once you have `DATABASE_URL` set:

```bash
# In your local terminal
npx prisma migrate deploy
```

Or in Vercel, the migrations will run automatically on first deployment.

### 2. Redeploy
After adding all environment variables:
1. Go to **Deployments** tab in Vercel
2. Click the **⋯** menu on the latest deployment
3. Click **Redeploy**

Or just push a new commit to GitHub (auto-deploys).

## ✅ Minimum Setup to Get Started

If you want to get the app running ASAP, you only need:

1. **CMC_API_KEY** - Get from CoinMarketCap (free tier available)
2. **DATABASE_URL** - Use Vercel Postgres (easiest)
3. **NEXTAUTH_URL** - Your Vercel app URL
4. **NEXTAUTH_SECRET** - Generate with `openssl rand -base64 32`

## 🎯 Step-by-Step Quick Setup

### Step 1: Get CoinMarketCap API Key
1. Go to https://coinmarketcap.com/api/
2. Sign up for free account
3. Get your API key
4. Add to Vercel as `CMC_API_KEY`

### Step 2: Create Vercel Postgres Database
1. In Vercel dashboard → **Storage** tab
2. Click **Create Database**
3. Select **Postgres**
4. Name it `cosmic-radar-db`
5. Click **Create**
6. `DATABASE_URL` is automatically added ✅

### Step 3: Generate NextAuth Secret
Run in terminal:
```bash
openssl rand -base64 32
```
Copy the output and add to Vercel as `NEXTAUTH_SECRET`

### Step 4: Set NextAuth URL
Add to Vercel:
```
NEXTAUTH_URL=https://cosmic-radar.vercel.app
```
(Replace with your actual Vercel URL)

### Step 5: Redeploy
1. Go to **Deployments** tab
2. Click **Redeploy** on latest deployment
3. Wait for build to complete
4. Visit your app! 🎉

## 🔍 Troubleshooting

### Error: "CMC_API_KEY is not set"
- Add `CMC_API_KEY` in Vercel environment variables
- Redeploy

### Error: "DATABASE_URL is configured correctly"
- Check your PostgreSQL connection string format
- Make sure database is accessible from Vercel
- Try Vercel Postgres for easiest setup

### Error: "Database migrations have been run"
- Run `npx prisma migrate deploy` locally
- Or let Vercel run it on deployment

### App loads but shows no data
- Check if CMC_API_KEY is valid
- Check API rate limits
- Check browser console for errors

## 📝 Environment Variables Checklist

Copy this to track your progress:

```
[ ] CMC_API_KEY - CoinMarketCap API key
[ ] DATABASE_URL - PostgreSQL connection string
[ ] NEXTAUTH_URL - Your Vercel app URL
[ ] NEXTAUTH_SECRET - Random secret (32+ chars)
[ ] GOOGLE_CLIENT_ID - (Optional) For Google sign-in
[ ] GOOGLE_CLIENT_SECRET - (Optional) For Google sign-in
[ ] CRYPTOPANIC_API_KEY - (Optional) For news ticker
```

## 🎉 Success!

Once all environment variables are set and you redeploy, your Cosmic Radar dashboard will be live!

Visit: https://cosmic-radar.vercel.app (or your custom domain)

---

**Need help?** Check the error logs in Vercel dashboard → **Deployments** → Click on deployment → **Logs**
