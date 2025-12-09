import Header from '@/components/layout/Header';
import MetricsRow from '@/components/dashboard/MetricsRow';
import NewsTicker from '@/components/dashboard/NewsTicker';
import DashboardContainer from '@/components/dashboard/DashboardContainer';

function getBaseUrl() {
  // For Vercel deployment
  if (process.env.VERCEL_URL) {
    return `https://${process.env.VERCEL_URL}`;
  }
  // For custom domain or NEXT_PUBLIC_BASE_URL
  if (process.env.NEXT_PUBLIC_BASE_URL) {
    return process.env.NEXT_PUBLIC_BASE_URL;
  }
  // For local development
  return 'http://localhost:3000';
}

async function getGlobalMetrics() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/global`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    throw new Error('Failed to fetch global metrics');
  }

  return res.json();
}

async function ensureTodaySnapshot() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/snapshots/today`, {
    method: 'POST',
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Snapshot creation failed:', errorText);
    throw new Error('Failed to ensure today snapshot');
  }

  return res.json();
}

async function getCompareData() {
  const baseUrl = getBaseUrl();
  const res = await fetch(`${baseUrl}/api/snapshots/compare?date=today`, {
    cache: 'no-store',
  });

  if (!res.ok) {
    const errorText = await res.text();
    console.error('Compare data fetch failed:', errorText);
    throw new Error('Failed to fetch compare data');
  }

  return res.json();
}

async function getNews() {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/news`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.warn('Failed to fetch news, continuing without it');
      return { news: [] };
    }

    return res.json();
  } catch (error) {
    console.warn('Error fetching news:', error);
    return { news: [] };
  }
}

async function getDefiData() {
  const baseUrl = getBaseUrl();
  try {
    const res = await fetch(`${baseUrl}/api/defi/overview`, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.warn('Failed to fetch DeFi data, using fallback');
      return {
        dex: { totalVolume24h: 0, change_1d: 0, topProtocols: [] },
        tvl: { total: 0, topProtocols: [] },
      };
    }

    return res.json();
  } catch (error) {
    console.warn('Error fetching DeFi data:', error);
    return {
      dex: { totalVolume24h: 0, change_1d: 0, topProtocols: [] },
      tvl: { total: 0, topProtocols: [] },
    };
  }
}

export default async function Home() {
  try {
    // Try to ensure snapshot exists, but don't block if it fails
    try {
      await Promise.race([
        ensureTodaySnapshot(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Snapshot timeout')), 8000))
      ]);
    } catch (snapshotError) {
      console.warn('Failed to ensure snapshot, continuing anyway:', snapshotError);
    }
    
    // Then fetch global metrics, compare data, news, and DeFi data in parallel with timeout
    const [globalMetrics, compareData, newsData, defiData] = await Promise.all([
      Promise.race([
        getGlobalMetrics(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Global metrics timeout')), 8000))
      ]).catch(err => {
        console.warn('Global metrics failed, using fallback:', err);
        return {
          marketCap: 0,
          volume24h: 0,
          btcDominance: 0,
          fearGreed: { value: 50, label: 'Neutral' },
          altcoinSeason: { value: 50, label: 'Neutral' },
          marketCapChange24h: 0,
          volumeChange24h: 0,
        };
      }),
      Promise.race([
        getCompareData(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('Compare data timeout')), 8000))
      ]).catch(err => {
        console.warn('Compare data failed, using empty data:', err);
        const today = new Date().toISOString().split('T')[0];
        return {
          date: today,
          previousDate: null,
          top200Today: [],
          newTop200: [],
          droppedFromTop200: [],
          gainers: [],
          losers: [],
          tiers: {
            t10: { inflow: [], outflow: [], stable: [] },
            t50: { inflow: [], outflow: [], stable: [] },
            t100: { inflow: [], outflow: [], stable: [] },
            t200: { inflow: [], outflow: [], stable: [] },
          },
        };
      }),
      Promise.race([
        getNews(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('News timeout')), 5000))
      ]).catch(() => ({ news: [] })),
      Promise.race([
        getDefiData(),
        new Promise((_, reject) => setTimeout(() => reject(new Error('DeFi timeout')), 8000))
      ]).catch(() => ({
        dex: { totalVolume24h: 0, change_1d: 0, topProtocols: [] },
        tvl: { total: 0, topProtocols: [] },
      })),
    ]);

    return (
      <div className="min-h-screen bg-background">
        <Header />

        {/* Live News Ticker */}
        <NewsTicker news={newsData.news} />

        <main className="container mx-auto px-4 py-6 space-y-6">
          {/* Hero Metrics Row */}
          <MetricsRow
            marketCap={globalMetrics.marketCap}
            volume24h={globalMetrics.volume24h}
            btcDominance={globalMetrics.btcDominance}
            fearGreed={globalMetrics.fearGreed}
            altcoinSeason={globalMetrics.altcoinSeason}
            marketCapChange24h={globalMetrics.marketCapChange24h}
            volumeChange24h={globalMetrics.volumeChange24h}
            dexVolume24h={defiData.dex.totalVolume24h}
            dexVolumeChange24h={defiData.dex.change_1d}
          />

          {/* Dashboard Container with Toggle */}
          <DashboardContainer compareData={compareData} defiData={defiData} />
        </main>
      </div>
    );
  } catch (error) {
    console.error('Error loading dashboard:', error);
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="card max-w-md">
          <h2 className="text-xl font-bold mb-4 text-negative">
            Error Loading Dashboard
          </h2>
          <p className="text-text-secondary mb-4">
            Failed to load dashboard data. Please check:
          </p>
          <ul className="list-disc list-inside text-text-secondary space-y-2">
            <li>CMC_API_KEY is set in your .env file</li>
            <li>DATABASE_URL is configured correctly</li>
            <li>Database migrations have been run</li>
            <li>The development server is running</li>
          </ul>
          <p className="mt-4 text-sm text-text-secondary">
            Error: {error instanceof Error ? error.message : 'Unknown error'}
          </p>
        </div>
      </div>
    );
  }
}
