'use client';

import React from 'react';
import { NewsItem, formatTimeAgo } from '@/lib/cryptoPanicClient';

interface NewsTickerProps {
  news: NewsItem[];
}

export default function NewsTicker({ news }: NewsTickerProps) {
  if (!news || news.length === 0) {
    return null;
  }

  // Duplicate news items for seamless loop
  const duplicatedNews = [...news, ...news];

  return (
    <div className="w-full bg-card border-y border-border overflow-hidden py-3">
      <div className="flex items-center space-x-2 px-4 mb-2">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-accent rounded-full animate-pulse"></div>
          <span className="text-xs font-semibold text-accent uppercase tracking-wide">
            Live News
          </span>
        </div>
      </div>
      
      <div className="relative overflow-hidden">
        <div className="flex animate-scroll-news hover:pause-animation">
          {duplicatedNews.map((item, index) => (
            <a
              key={`${item.id}-${index}`}
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex-shrink-0 mx-6 group cursor-pointer"
            >
              <div className="flex items-center space-x-3">
                {/* Sentiment indicator */}
                <div
                  className={`w-1.5 h-1.5 rounded-full ${
                    item.votes.positive > item.votes.negative
                      ? 'bg-positive'
                      : item.votes.negative > item.votes.positive
                      ? 'bg-negative'
                      : 'bg-warning'
                  }`}
                />
                
                {/* News content */}
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-text-primary group-hover:text-accent transition-colors whitespace-nowrap">
                    {item.title}
                  </span>
                  <span className="text-xs text-text-secondary whitespace-nowrap">
                    • {item.source.title} • {formatTimeAgo(item.published_at)}
                  </span>
                  {item.currencies && item.currencies.length > 0 && (
                    <span className="text-xs px-2 py-0.5 bg-accent bg-opacity-20 text-accent rounded whitespace-nowrap">
                      {item.currencies[0].code}
                    </span>
                  )}
                </div>
              </div>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
}
