/**
 * GET /api/news
 * Fetches latest crypto news from CryptoPanic
 */

import { NextResponse } from 'next/server';
import { fetchCryptoNews } from '@/lib/cryptoPanicClient';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const news = await fetchCryptoNews(30); // Fetch 30 news items for ticker
    
    return NextResponse.json({
      news,
      count: news.length,
    });
  } catch (error) {
    console.error('Error in /api/news:', error);
    return NextResponse.json(
      { error: 'Failed to fetch news', news: [] },
      { status: 500 }
    );
  }
}
