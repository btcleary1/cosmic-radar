import type { Metadata } from 'next';
import './globals.css';
import SessionProvider from '@/components/providers/SessionProvider';

export const metadata: Metadata = {
  title: 'Cosmic Radar - Crypto & DeFi Dashboard',
  description: 'Track the top 200 cryptocurrencies, DeFi protocols, and market insights with real-time data from CoinMarketCap and DeFi Llama',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <SessionProvider>{children}</SessionProvider>
      </body>
    </html>
  );
}
