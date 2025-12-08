'use client';

import React, { useEffect, useState } from 'react';
import { X, TrendingUp, TrendingDown, ExternalLink, Copy, Check } from 'lucide-react';

interface CoinDetails {
  id: number;
  name: string;
  symbol: string;
  rank: number;
  logo: string;
  description: string;
  category: string;
  tags: string[];
  website: string | null;
  twitter: string | null;
  reddit: string | null;
  contractAddresses: Array<{
    platform: string;
    address: string;
  }>;
  price: number;
  marketCap: number;
  volume24h: number;
  change24h: number;
  change7d: number;
  circulatingSupply: number;
  totalSupply: number;
  maxSupply: number | null;
}

interface CoinDetailsModalProps {
  coinId: number;
  onClose: () => void;
}

export default function CoinDetailsModal({ coinId, onClose }: CoinDetailsModalProps) {
  const [coinData, setCoinData] = useState<CoinDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  useEffect(() => {
    async function fetchCoinDetails() {
      try {
        setLoading(true);
        const response = await fetch(`/api/coin/${coinId}`);
        if (!response.ok) throw new Error('Failed to fetch coin details');
        const data = await response.json();
        setCoinData(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    }

    fetchCoinDetails();
  }, [coinId]);

  const copyToClipboard = (address: string) => {
    navigator.clipboard.writeText(address);
    setCopiedAddress(address);
    setTimeout(() => setCopiedAddress(null), 2000);
  };

  const formatNumber = (num: number) => {
    if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
    if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
    if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(2)}K`;
    return `$${num.toFixed(2)}`;
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="bg-card rounded-lg max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-border">
        {/* Header */}
        <div className="sticky top-0 bg-card border-b border-border p-4 flex items-center justify-between">
          <h2 className="text-xl font-bold">Coin Details</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-background rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          {loading && (
            <div className="text-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent mx-auto"></div>
              <p className="mt-4 text-text-secondary">Loading coin details...</p>
            </div>
          )}

          {error && (
            <div className="text-center py-12">
              <p className="text-negative">{error}</p>
            </div>
          )}

          {coinData && (
            <div className="space-y-6">
              {/* Coin Header */}
              <div className="flex items-start gap-4">
                <img src={coinData.logo} alt={coinData.name} className="w-16 h-16 rounded-full" />
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="text-2xl font-bold">{coinData.name}</h3>
                    <span className="text-text-secondary text-lg">{coinData.symbol}</span>
                  </div>
                  <div className="flex items-center gap-4 mt-2">
                    <span className="text-sm text-text-secondary">Rank #{coinData.rank}</span>
                    {coinData.category && (
                      <span className="text-xs px-2 py-1 bg-accent/10 text-accent rounded-full">
                        {coinData.category}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Price Info */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">Price</p>
                  <p className="text-lg font-bold">{formatNumber(coinData.price)}</p>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">24h Change</p>
                  <p className={`text-lg font-bold flex items-center gap-1 ${
                    coinData.change24h >= 0 ? 'text-positive' : 'text-negative'
                  }`}>
                    {coinData.change24h >= 0 ? <TrendingUp className="w-4 h-4" /> : <TrendingDown className="w-4 h-4" />}
                    {coinData.change24h.toFixed(2)}%
                  </p>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">Market Cap</p>
                  <p className="text-lg font-bold">{formatNumber(coinData.marketCap)}</p>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">Volume 24h</p>
                  <p className="text-lg font-bold">{formatNumber(coinData.volume24h)}</p>
                </div>
              </div>

              {/* Description */}
              {coinData.description && (
                <div>
                  <h4 className="font-bold mb-2">About {coinData.name}</h4>
                  <p className="text-sm text-text-secondary leading-relaxed line-clamp-6">
                    {coinData.description}
                  </p>
                </div>
              )}

              {/* Tags */}
              {coinData.tags.length > 0 && (
                <div>
                  <h4 className="font-bold mb-2">Tags</h4>
                  <div className="flex flex-wrap gap-2">
                    {coinData.tags.slice(0, 10).map((tag) => (
                      <span key={tag} className="text-xs px-2 py-1 bg-background rounded-full">
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Contract Addresses */}
              {coinData.contractAddresses.length > 0 && (
                <div>
                  <h4 className="font-bold mb-2">Contract Addresses</h4>
                  <div className="space-y-2">
                    {coinData.contractAddresses.map((contract, index) => (
                      <div key={index} className="bg-background p-3 rounded-lg">
                        <p className="text-xs text-text-secondary mb-1">{contract.platform}</p>
                        <div className="flex items-center gap-2">
                          <code className="text-xs flex-1 overflow-x-auto">{contract.address}</code>
                          <button
                            onClick={() => copyToClipboard(contract.address)}
                            className="p-1 hover:bg-card rounded transition-colors"
                            title="Copy address"
                          >
                            {copiedAddress === contract.address ? (
                              <Check className="w-4 h-4 text-positive" />
                            ) : (
                              <Copy className="w-4 h-4" />
                            )}
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Links */}
              <div>
                <h4 className="font-bold mb-2">Links</h4>
                <div className="flex flex-wrap gap-2">
                  {coinData.website && (
                    <a
                      href={coinData.website}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-2 bg-background hover:bg-accent/10 rounded-lg transition-colors text-sm"
                    >
                      Website <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {coinData.twitter && (
                    <a
                      href={coinData.twitter}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-2 bg-background hover:bg-accent/10 rounded-lg transition-colors text-sm"
                    >
                      Twitter <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                  {coinData.reddit && (
                    <a
                      href={coinData.reddit}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-1 px-3 py-2 bg-background hover:bg-accent/10 rounded-lg transition-colors text-sm"
                    >
                      Reddit <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              </div>

              {/* Supply Info */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">Circulating Supply</p>
                  <p className="text-sm font-semibold">{coinData.circulatingSupply.toLocaleString()}</p>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">Total Supply</p>
                  <p className="text-sm font-semibold">{coinData.totalSupply.toLocaleString()}</p>
                </div>
                <div className="bg-background p-4 rounded-lg">
                  <p className="text-xs text-text-secondary mb-1">Max Supply</p>
                  <p className="text-sm font-semibold">
                    {coinData.maxSupply ? coinData.maxSupply.toLocaleString() : 'Unlimited'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
