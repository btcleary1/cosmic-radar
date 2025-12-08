/**
 * GET /api/global
 * Returns global crypto market metrics including Fear & Greed and Altcoin Season indices
 */

import { NextResponse } from 'next/server';
import {
  fetchGlobalMetrics,
  fetchFearGreedIndex,
  fetchAltcoinSeasonIndex,
} from '@/lib/cmcClient';

export async function GET() {
  try {
    const [globalMetrics, fearGreed, altcoinSeason] = await Promise.all([
      fetchGlobalMetrics(),
      fetchFearGreedIndex(),
      fetchAltcoinSeasonIndex(),
    ]);

    return NextResponse.json({
      marketCap: globalMetrics.marketCap,
      volume24h: globalMetrics.volume24h,
      btcDominance: globalMetrics.btcDominance,
      activeCryptos: globalMetrics.activeCryptos,
      marketCapChange24h: globalMetrics.marketCapChange24h,
      volumeChange24h: globalMetrics.volumeChange24h,
      fearGreed,
      altcoinSeason,
    });
  } catch (error) {
    console.error('Error in /api/global:', error);
    return NextResponse.json(
      { error: 'Failed to fetch global metrics' },
      { status: 500 }
    );
  }
}
