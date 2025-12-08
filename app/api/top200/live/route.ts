/**
 * GET /api/top200/live
 * Returns live top 200 cryptocurrencies directly from CoinMarketCap (not from DB)
 */

import { NextResponse } from 'next/server';
import { fetchTop200Listings } from '@/lib/cmcClient';

export async function GET() {
  try {
    const listings = await fetchTop200Listings();

    return NextResponse.json({
      data: listings,
      timestamp: new Date().toISOString(),
    });
  } catch (error) {
    console.error('Error in /api/top200/live:', error);
    return NextResponse.json(
      { error: 'Failed to fetch live top 200 listings' },
      { status: 500 }
    );
  }
}
