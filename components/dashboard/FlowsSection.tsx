'use client';

import React, { useState } from 'react';
import { CompareResponse } from '@/lib/compare';
import TierMovementCards from './TierMovementCards';
import GainersLosersPanel from './GainersLosersPanel';

interface FlowsSectionProps {
  compareData: CompareResponse;
  onRefresh?: () => void;
}

export default function FlowsSection({ compareData, onRefresh }: FlowsSectionProps) {
  const [activeTier, setActiveTier] = useState<'t10' | 't50' | 't100' | 't200'>('t50');

  const tierLabels = {
    t10: 'Top 10',
    t50: 'Top 50',
    t100: 'Top 100',
    t200: 'Top 200',
  };

  return (
    <div className="space-y-6">
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Flows & Movers</h2>
        {onRefresh && (
          <button
            onClick={onRefresh}
            className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-opacity-90 transition-colors"
          >
            Refresh Snapshot
          </button>
        )}
      </div>

      {/* Tier Selector */}
      <div className="flex space-x-2">
        {(Object.keys(tierLabels) as Array<keyof typeof tierLabels>).map((tier) => (
          <button
            key={tier}
            onClick={() => setActiveTier(tier)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              activeTier === tier
                ? 'bg-accent text-white'
                : 'bg-card border border-border text-text-secondary hover:text-text-primary'
            }`}
          >
            {tierLabels[tier]}
          </button>
        ))}
      </div>

      {/* Tier Movement Cards */}
      <TierMovementCards
        tierMovement={compareData.tiers[activeTier]}
        tierLabel={tierLabels[activeTier]}
      />

      {/* Global Gainers & Losers */}
      <GainersLosersPanel
        gainers={compareData.gainers}
        losers={compareData.losers}
      />
    </div>
  );
}
