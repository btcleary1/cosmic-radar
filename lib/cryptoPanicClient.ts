/**
 * CryptoPanic API Client
 * Free tier: https://cryptopanic.com/developers/api/
 */

const CRYPTOPANIC_API_URL = 'https://cryptopanic.com/api/v1';

export interface NewsItem {
  id: number;
  title: string;
  url: string;
  source: {
    title: string;
    domain: string;
    url?: string;
  };
  published_at: string;
  kind: 'news' | 'media';
  currencies?: Array<{
    code: string;
    title: string;
  }>;
  votes: {
    positive: number;
    negative: number;
    important: number;
  };
  metadata?: {
    description?: string;
  };
}

export interface CryptoPanicResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: NewsItem[];
}

export type NewsFilter = 'rising' | 'hot' | 'bullish' | 'bearish' | 'important' | 'saved' | 'lol';

/**
 * Fetch latest crypto news from CryptoPanic
 * @param limit Number of news items to fetch (default: 20)
 * @param filter Filter type (default: 'hot')
 */
export async function fetchCryptoNews(
  limit: number = 20,
  filter: NewsFilter = 'hot'
): Promise<NewsItem[]> {
  try {
    const apiKey = process.env.CRYPTOPANIC_API_KEY;
    
    // If no API key, return placeholder news
    if (!apiKey) {
      console.warn('CRYPTOPANIC_API_KEY not set. Using placeholder news.');
      return getPlaceholderNews();
    }

    // With API key - full access
    const url = `${CRYPTOPANIC_API_URL}/posts/?auth_token=${apiKey}&kind=news&filter=${filter}&public=true`;
    
    const response = await fetch(url, {
      next: { revalidate: 300 }, // Cache for 5 minutes
    });

    if (!response.ok) {
      throw new Error(`CryptoPanic API error: ${response.statusText}`);
    }

    const data: CryptoPanicResponse = await response.json();
    return data.results.slice(0, limit);
  } catch (error) {
    console.error('Error fetching crypto news:', error);
    return getPlaceholderNews();
  }
}

/**
 * Get placeholder news items when API is not available
 * Note: These use real news site URLs as examples
 */
function getPlaceholderNews(): NewsItem[] {
  const now = new Date().toISOString();
  return [
    {
      id: 1,
      title: 'Bitcoin Reaches New All-Time High as Institutional Adoption Grows',
      url: 'https://www.coindesk.com/markets/bitcoin/',
      source: { title: 'CoinDesk', domain: 'coindesk.com' },
      published_at: now,
      kind: 'news',
      currencies: [{ code: 'BTC', title: 'Bitcoin' }],
      votes: { positive: 150, negative: 10, important: 80 },
    },
    {
      id: 2,
      title: 'Ethereum 2.0 Upgrade Shows Promising Results in Network Efficiency',
      url: 'https://www.theblock.co/latest',
      source: { title: 'The Block', domain: 'theblock.co' },
      published_at: now,
      kind: 'news',
      currencies: [{ code: 'ETH', title: 'Ethereum' }],
      votes: { positive: 120, negative: 5, important: 60 },
    },
    {
      id: 3,
      title: 'Major Exchange Announces Support for New Altcoins',
      url: 'https://cointelegraph.com/news',
      source: { title: 'Cointelegraph', domain: 'cointelegraph.com' },
      published_at: now,
      kind: 'news',
      votes: { positive: 80, negative: 20, important: 40 },
    },
    {
      id: 4,
      title: 'DeFi Protocol Launches Innovative Yield Farming Strategy',
      url: 'https://decrypt.co/news',
      source: { title: 'Decrypt', domain: 'decrypt.co' },
      published_at: now,
      kind: 'news',
      votes: { positive: 90, negative: 15, important: 50 },
    },
    {
      id: 5,
      title: 'Regulatory Framework Brings Clarity to Crypto Markets',
      url: 'https://www.bloomberg.com/crypto',
      source: { title: 'Bloomberg', domain: 'bloomberg.com' },
      published_at: now,
      kind: 'news',
      votes: { positive: 60, negative: 40, important: 70 },
    },
    {
      id: 6,
      title: 'NFT Marketplace Reports Record Trading Volume',
      url: 'https://nftnow.com/news/',
      source: { title: 'NFT Now', domain: 'nftnow.com' },
      published_at: now,
      kind: 'news',
      votes: { positive: 100, negative: 10, important: 45 },
    },
    {
      id: 7,
      title: 'Layer 2 Solutions Gain Traction as Gas Fees Drop',
      url: 'https://www.coindesk.com/tech/',
      source: { title: 'CoinDesk', domain: 'coindesk.com' },
      published_at: now,
      kind: 'news',
      currencies: [{ code: 'ETH', title: 'Ethereum' }],
      votes: { positive: 110, negative: 8, important: 55 },
    },
    {
      id: 8,
      title: 'Stablecoin Adoption Surges in Emerging Markets',
      url: 'https://www.theblock.co/stablecoins',
      source: { title: 'The Block', domain: 'theblock.co' },
      published_at: now,
      kind: 'news',
      currencies: [{ code: 'USDT', title: 'Tether' }],
      votes: { positive: 75, negative: 12, important: 48 },
    },
  ];
}

/**
 * Format time ago from ISO date string
 */
export function formatTimeAgo(isoDate: string): string {
  const now = new Date();
  const published = new Date(isoDate);
  const diffMs = now.getTime() - published.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  const diffHours = Math.floor(diffMins / 60);
  const diffDays = Math.floor(diffHours / 24);

  if (diffMins < 1) return 'Just now';
  if (diffMins < 60) return `${diffMins}m ago`;
  if (diffHours < 24) return `${diffHours}h ago`;
  return `${diffDays}d ago`;
}
