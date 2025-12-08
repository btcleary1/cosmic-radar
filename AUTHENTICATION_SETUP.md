# Authentication & User Features Setup

## Overview
This guide covers the new authentication system and user features including:
- Google OAuth Sign In
- Email/Password Authentication
- Web3 Wallet Login (MetaMask, Phantom)
- User Watchlists
- Price Alerts
- Newsletter Signup (placeholder)
- Patreon/Discord Integration (placeholder)

## Installation Steps

### 1. Install Dependencies
The following packages have been added to `package.json`:
- `next-auth` - Authentication for Next.js
- `@next-auth/prisma-adapter` - Prisma adapter for NextAuth
- `bcryptjs` - Password hashing
- `lucide-react` - Icon library
- `siwe` - Sign-In with Ethereum
- `wagmi` - Web3 wallet integration
- `viem` - Ethereum library

Run:
```bash
npm install --ignore-scripts
```

### 2. Generate Prisma Client
If you encounter permission errors with Prisma, close any running dev servers and try:
```bash
npx prisma generate
```

### 3. Run Database Migration
Apply the new schema changes:
```bash
npx prisma migrate dev --name add_auth_and_user_features
```

This will create tables for:
- `User` - User accounts
- `Account` - OAuth provider accounts
- `Session` - User sessions
- `VerificationToken` - Email verification
- `Watchlist` - User coin watchlists
- `Alert` - Price alerts

### 4. Environment Variables
Add these to your `.env` file:

```env
# NextAuth Configuration
NEXTAUTH_URL=http://localhost:3000
NEXTAUTH_SECRET=generate_with_openssl_rand_base64_32

# Google OAuth (Optional)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

#### Generate NEXTAUTH_SECRET:
```bash
openssl rand -base64 32
```

#### Get Google OAuth Credentials:
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new OAuth 2.0 Client ID
3. Add authorized redirect URI: `http://localhost:3000/api/auth/callback/google`
4. Copy Client ID and Secret to `.env`

## New Features

### 1. Enhanced Metrics Display
- **Market Cap & Volume**: Now show 24h change with green/red arrows
- **BTC Dominance**: Circular gauge with orange theme
- **Fear & Greed Index**: Color-coded gauge (red=fear, green=greed)
- **Altcoin Season**: Purple gauge showing altcoin season index
- **Icons**: All metrics have relevant icons for better UX

### 2. User Authentication
- **Sign In Button**: Located in header, opens authentication modal
- **Google OAuth**: One-click sign in with Google account
- **Email/Password**: Traditional authentication (to be implemented)
- **Web3 Wallets**: MetaMask and Phantom wallet support (to be implemented)

### 3. User Menu
When signed in, click your profile to access:
- **My Watchlists**: Create and manage coin watchlists
- **Price Alerts**: Set custom price alerts
- **Connect Wallet**: Link Web3 wallets
- **Sign Out**: End your session

### 4. Watchlists (Coming Soon)
- Create multiple watchlists
- Add/remove coins
- Track performance
- Export data

### 5. Price Alerts (Coming Soon)
- Set price above/below alerts
- Percentage change alerts
- Email notifications
- In-app notifications

### 6. Future Features (Placeholders)
- Newsletter subscription
- Patreon integration
- Discord community access
- Premium features

## API Routes

### Authentication
- `POST /api/auth/signin` - Sign in
- `POST /api/auth/signout` - Sign out
- `GET /api/auth/session` - Get current session
- `GET /api/auth/callback/google` - Google OAuth callback

### User Features (To be implemented)
- `GET /api/watchlists` - Get user watchlists
- `POST /api/watchlists` - Create watchlist
- `GET /api/alerts` - Get user alerts
- `POST /api/alerts` - Create alert

## Database Schema

### User Model
```prisma
model User {
  id            String    @id @default(cuid())
  name          String?
  email         String?   @unique
  emailVerified DateTime?
  image         String?
  password      String?
  walletAddress String?   @unique
  accounts      Account[]
  sessions      Session[]
  watchlists    Watchlist[]
  alerts        Alert[]
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
```

### Watchlist Model
```prisma
model Watchlist {
  id        String   @id @default(cuid())
  userId    String
  user      User     @relation(fields: [userId], references: [id])
  name      String
  coinIds   String[] // Array of CMC coin IDs
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### Alert Model
```prisma
model Alert {
  id            String   @id @default(cuid())
  userId        String
  user          User     @relation(fields: [userId], references: [id])
  coinId        Int
  coinSymbol    String
  alertType     String   // "price_above", "price_below", "percent_change"
  targetValue   Float
  isActive      Boolean  @default(true)
  lastTriggered DateTime?
  createdAt     DateTime @default(now())
  updatedAt     DateTime @updatedAt
}
```

## Troubleshooting

### Prisma Permission Errors
If you get EPERM errors:
1. Close all terminals and dev servers
2. Delete `node_modules/.prisma` folder
3. Run `npx prisma generate` again

### NextAuth Errors
- Ensure `NEXTAUTH_SECRET` is set in `.env`
- Verify `NEXTAUTH_URL` matches your domain
- Check Google OAuth credentials are correct

### Database Connection
- Verify `DATABASE_URL` is correct
- Ensure database is running
- Run migrations: `npx prisma migrate dev`

## Testing Authentication

1. Start the dev server: `npm run dev`
2. Click "Sign In" in the header
3. Choose authentication method:
   - Google: Click "Sign in with Google"
   - Email: Enter credentials (to be implemented)
   - Wallet: Connect MetaMask/Phantom (to be implemented)

## Next Steps

1. Implement watchlist management UI
2. Create alert configuration interface
3. Add Web3 wallet authentication
4. Build notification system
5. Integrate newsletter service
6. Add Patreon/Discord OAuth

## Security Notes

- Passwords are hashed with bcrypt
- Sessions use JWT tokens
- OAuth tokens are encrypted
- CSRF protection enabled
- Secure cookies in production
