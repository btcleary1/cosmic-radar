import { NextResponse } from 'next/server';

const CMC_API_KEY = process.env.CMC_API_KEY;
const CMC_BASE_URL = 'https://pro-api.coinmarketcap.com/v1';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const coinId = params.id;

    if (!CMC_API_KEY) {
      return NextResponse.json(
        { error: 'CMC API key not configured' },
        { status: 500 }
      );
    }

    // Fetch coin metadata and latest quote in parallel
    const [metadataResponse, quoteResponse] = await Promise.all([
      fetch(
        `${CMC_BASE_URL}/cryptocurrency/info?id=${coinId}`,
        {
          headers: {
            'X-CMC_PRO_API_KEY': CMC_API_KEY,
            'Accept': 'application/json',
          },
          next: { revalidate: 3600 }, // Cache for 1 hour
        }
      ),
      fetch(
        `${CMC_BASE_URL}/cryptocurrency/quotes/latest?id=${coinId}`,
        {
          headers: {
            'X-CMC_PRO_API_KEY': CMC_API_KEY,
            'Accept': 'application/json',
          },
          next: { revalidate: 60 }, // Cache for 1 minute
        }
      ),
    ]);

    if (!metadataResponse.ok || !quoteResponse.ok) {
      throw new Error('CMC API error');
    }

    const [metadataData, quoteData] = await Promise.all([
      metadataResponse.json(),
      quoteResponse.json(),
    ]);

    const metadata = metadataData.data[coinId];
    const quote = quoteData.data[coinId];

    // Extract contract addresses
    const contractAddresses = metadata.contract_address?.map((contract: any) => ({
      platform: contract.platform?.name || 'Unknown',
      address: contract.contract_address,
    })) || [];

    // Build response
    const coinInfo = {
      id: quote.id,
      name: quote.name,
      symbol: quote.symbol,
      rank: quote.cmc_rank,
      logo: metadata.logo,
      description: metadata.description,
      category: metadata.category,
      tags: metadata.tags || [],
      website: metadata.urls?.website?.[0] || null,
      twitter: metadata.urls?.twitter?.[0] || null,
      reddit: metadata.urls?.reddit?.[0] || null,
      contractAddresses,
      price: quote.quote.USD.price,
      marketCap: quote.quote.USD.market_cap,
      volume24h: quote.quote.USD.volume_24h,
      change24h: quote.quote.USD.percent_change_24h,
      change7d: quote.quote.USD.percent_change_7d,
      circulatingSupply: quote.circulating_supply,
      totalSupply: quote.total_supply,
      maxSupply: quote.max_supply,
    };

    return NextResponse.json(coinInfo);
  } catch (error) {
    console.error('Error in /api/coin/[id]:', error);
    return NextResponse.json(
      { error: 'Failed to fetch coin details' },
      { status: 500 }
    );
  }
}
