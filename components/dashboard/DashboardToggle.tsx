'use client';

import React from 'react';
import { TrendingUp, Coins } from 'lucide-react';

interface DashboardToggleProps {
  activeView: 'crypto' | 'defi';
  onToggle: (view: 'crypto' | 'defi') => void;
}

export default function DashboardToggle({ activeView, onToggle }: DashboardToggleProps) {
  return (
    <div className="flex justify-center py-6">
      <div className="inline-flex items-center bg-card border border-border rounded-lg p-1 shadow-lg">
        <button
          onClick={() => onToggle('crypto')}
          className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-200 ${
            activeView === 'crypto'
              ? 'bg-accent text-white shadow-md'
              : 'text-text-secondary hover:text-text-primary hover:bg-background'
          }`}
        >
          <TrendingUp className="w-5 h-5" />
          <span className="font-semibold">Top 200 Crypto</span>
        </button>
        
        <button
          onClick={() => onToggle('defi')}
          className={`flex items-center gap-2 px-6 py-3 rounded-md transition-all duration-200 ${
            activeView === 'defi'
              ? 'bg-accent text-white shadow-md'
              : 'text-text-secondary hover:text-text-primary hover:bg-background'
          }`}
        >
          <Coins className="w-5 h-5" />
          <span className="font-semibold">DeFi Dashboard</span>
        </button>
      </div>
    </div>
  );
}
