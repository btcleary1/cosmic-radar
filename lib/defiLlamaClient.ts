/**
 * DeFi Llama API Client
 * Documentation: https://defillama.com/docs/api
 */

const DEFILLAMA_BASE_URL = 'https://api.llama.fi';

/**
 * DEX Overview Types
 */
export interface DexProtocol {
  name: string;
  displayName: string;
  disabled?: boolean;
  logo?: string;
  chains: string[];
  totalVolume24h?: number;
  totalVolume7d?: number;
  change_1d?: number;
  change_7d?: number;
  change_1m?: number;
}

export interface DexOverview {
  protocols: DexProtocol[];
  totalVolume24h: number;
  totalVolume7d: number;
  change_1d: number;
  change_7d: number;
}

/**
 * TVL Types
 */
export interface Protocol {
  id: string;
  name: string;
  symbol: string;
  url: string;
  description: string;
  chain: string;
  logo: string;
  audits: string;
  category: string;
  chains: string[];
  tvl: number;
  chainTvls: { [key: string]: number };
  change_1h: number;
  change_1d: number;
  change_7d: number;
  mcap?: number;
}

/**
 * Fetch all DEX protocols overview
 */
export async function fetchDexOverview(): Promise<DexOverview> {
  try {
    console.log('Fetching from:', `${DEFILLAMA_BASE_URL}/overview/dexs?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyVolume`);
    const response = await fetch(`${DEFILLAMA_BASE_URL}/overview/dexs?excludeTotalDataChart=true&excludeTotalDataChartBreakdown=true&dataType=dailyVolume`, {
      next: { revalidate: 300 }, // Cache for 5 minutes
      headers: {
        'Accept': 'application/json',
      },
    });

    console.log('DEX overview response status:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('DEX overview error response:', errorText);
      throw new Error(`DeFi Llama API error: ${response.status} - ${errorText}`);
    }

    const data = await response.json();
    
    // Calculate total volume from protocols
    let totalVolume24h = 0;
    let totalVolume7d = 0;
    
    const protocols = (data.protocols || []).map((p: any) => {
      const vol24h = p.total24h || 0;
      const vol7d = p.total7d || 0;
      totalVolume24h += vol24h;
      totalVolume7d += vol7d;
      
      return {
        name: p.name || p.module || '',
        displayName: p.displayName || p.name || p.module || '',
        disabled: p.disabled || false,
        logo: p.logo,
        chains: p.chains || [],
        totalVolume24h: vol24h,
        totalVolume7d: vol7d,
        change_1d: p.change_1d || 0,
        change_7d: p.change_7d || 0,
        change_1m: p.change_1m || 0,
      };
    });
    
    console.log('Parsed DEX data:', {
      totalVolume24h,
      protocolsCount: protocols.length,
      topProtocol: protocols[0]?.name
    });
    
    return {
      protocols,
      totalVolume24h,
      totalVolume7d,
      change_1d: data.change_1d || 0,
      change_7d: data.change_7d || 0,
    };
  } catch (error) {
    console.error('Error fetching DEX overview:', error);
    throw error;
  }
}

/**
 * Fetch specific DEX protocol data
 */
export async function fetchDexProtocol(protocol: string): Promise<any> {
  try {
    const response = await fetch(`${DEFILLAMA_BASE_URL}/summary/dexs/${protocol}`, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`DeFi Llama API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching DEX protocol ${protocol}:`, error);
    throw error;
  }
}

/**
 * Fetch all protocols TVL (Total Value Locked)
 */
export async function fetchProtocolsTVL(): Promise<Protocol[]> {
  try {
    const response = await fetch(`${DEFILLAMA_BASE_URL}/protocols`, {
      next: { revalidate: 600 }, // Cache for 10 minutes
    });

    if (!response.ok) {
      throw new Error(`DeFi Llama API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching protocols TVL:', error);
    throw error;
  }
}

/**
 * Fetch specific protocol TVL
 */
export async function fetchProtocolTVL(protocol: string): Promise<any> {
  try {
    const response = await fetch(`${DEFILLAMA_BASE_URL}/protocol/${protocol}`, {
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      throw new Error(`DeFi Llama API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error(`Error fetching protocol ${protocol}:`, error);
    throw error;
  }
}

/**
 * Fetch historical DEX volumes
 */
export async function fetchDexVolumeHistory(protocol?: string): Promise<any> {
  try {
    const endpoint = protocol 
      ? `${DEFILLAMA_BASE_URL}/summary/dexs/${protocol}`
      : `${DEFILLAMA_BASE_URL}/overview/dexs`;
    
    const response = await fetch(endpoint, {
      next: { revalidate: 300 },
    });

    if (!response.ok) {
      throw new Error(`DeFi Llama API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching DEX volume history:', error);
    throw error;
  }
}

/**
 * Fetch chains TVL
 */
export async function fetchChainsTVL(): Promise<any> {
  try {
    const response = await fetch(`${DEFILLAMA_BASE_URL}/chains`, {
      next: { revalidate: 600 },
    });

    if (!response.ok) {
      throw new Error(`DeFi Llama API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching chains TVL:', error);
    throw error;
  }
}

/**
 * Get top DEX protocols by volume
 */
export async function getTopDexProtocols(limit: number = 10): Promise<DexProtocol[]> {
  try {
    const overview = await fetchDexOverview();
    return overview.protocols
      .filter(p => !p.disabled && p.totalVolume24h)
      .sort((a, b) => (b.totalVolume24h || 0) - (a.totalVolume24h || 0))
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting top DEX protocols:', error);
    return [];
  }
}

/**
 * Get top protocols by TVL
 */
export async function getTopProtocolsByTVL(limit: number = 10): Promise<Protocol[]> {
  try {
    const protocols = await fetchProtocolsTVL();
    return protocols
      .sort((a, b) => b.tvl - a.tvl)
      .slice(0, limit);
  } catch (error) {
    console.error('Error getting top protocols by TVL:', error);
    return [];
  }
}
