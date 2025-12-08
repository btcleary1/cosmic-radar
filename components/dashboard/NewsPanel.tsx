'use client';

import React from 'react';

// Placeholder news data
const placeholderNews = [
  {
    id: 1,
    title: 'Bitcoin Reaches New All-Time High',
    source: 'CryptoNews',
    time: '2h ago',
    sentiment: 'Bullish',
    thumbnail: '/placeholder-news.jpg',
  },
  {
    id: 2,
    title: 'Ethereum 2.0 Upgrade Shows Promising Results',
    source: 'DeFi Daily',
    time: '4h ago',
    sentiment: 'Bullish',
    thumbnail: '/placeholder-news.jpg',
  },
  {
    id: 3,
    title: 'Regulatory Concerns Impact Altcoin Market',
    source: 'Blockchain Times',
    time: '6h ago',
    sentiment: 'Bearish',
    thumbnail: '/placeholder-news.jpg',
  },
  {
    id: 4,
    title: 'Major Exchange Announces New Listing',
    source: 'Crypto Insider',
    time: '8h ago',
    sentiment: 'Bullish',
    thumbnail: '/placeholder-news.jpg',
  },
];

export default function NewsPanel() {
  return (
    <div className="card">
      <h3 className="text-xl font-semibold mb-4">Top News</h3>
      <div className="space-y-4">
        {placeholderNews.map((news) => (
          <div
            key={news.id}
            className="flex space-x-3 pb-4 border-b border-border last:border-0 cursor-pointer hover:bg-background transition-colors rounded-lg p-2"
          >
            {/* Thumbnail placeholder */}
            <div className="w-20 h-20 bg-border rounded-lg flex-shrink-0 flex items-center justify-center">
              <svg
                className="w-8 h-8 text-text-secondary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <h4 className="font-medium text-sm mb-1 line-clamp-2">
                {news.title}
              </h4>
              <div className="flex items-center space-x-2 text-xs text-text-secondary">
                <span>{news.source}</span>
                <span>•</span>
                <span>{news.time}</span>
              </div>
              <div className="mt-2">
                <span
                  className={`text-xs px-2 py-1 rounded ${
                    news.sentiment === 'Bullish'
                      ? 'bg-positive bg-opacity-20 text-positive'
                      : 'bg-negative bg-opacity-20 text-negative'
                  }`}
                >
                  {news.sentiment}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Note about future integration */}
      <div className="mt-4 p-3 bg-background rounded-lg border border-border">
        <p className="text-xs text-text-secondary">
          📰 News integration coming soon. This will connect to CryptoPanic API
          for real-time crypto news and sentiment analysis.
        </p>
      </div>
    </div>
  );
}
