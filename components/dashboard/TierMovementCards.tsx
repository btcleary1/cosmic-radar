'use client';

import React from 'react';
import { TierMovement, CoinComparison } from '@/lib/compare';
import RankChangeCell from './RankChangeCell';

interface TierMovementCardsProps {
  tierMovement: TierMovement;
  tierLabel: string;
}

function CoinListItem({ coin }: { coin: CoinComparison }) {
  return (
    <div className="flex items-center justify-between py-2 border-b border-border last:border-0">
      <div className="flex items-center space-x-3">
        <div className="font-semibold text-text-secondary">
          #{coin.todayRank ?? coin.yesterdayRank}
        </div>
        <div>
          <div className="font-medium">{coin.name}</div>
          <div className="text-sm text-text-secondary">{coin.symbol}</div>
        </div>
      </div>
      <div className="flex items-center space-x-4">
        <RankChangeCell
          rankChange={coin.rankChange}
          yesterdayRank={coin.yesterdayRank}
        />
        {coin.todayChange24h !== null && (
          <span
            className={`text-sm ${
              coin.todayChange24h >= 0 ? 'text-positive' : 'text-negative'
            }`}
          >
            {coin.todayChange24h >= 0 ? '+' : ''}
            {coin.todayChange24h.toFixed(2)}%
          </span>
        )}
      </div>
    </div>
  );
}

export default function TierMovementCards({
  tierMovement,
  tierLabel,
}: TierMovementCardsProps) {
  const maxDisplay = 10;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* Entered */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 text-positive">
          Entered {tierLabel}
        </h3>
        {tierMovement.entered.length === 0 ? (
          <p className="text-text-secondary text-sm">No coins entered</p>
        ) : (
          <div className="space-y-1">
            {tierMovement.entered.slice(0, maxDisplay).map((coin) => (
              <CoinListItem key={coin.cmcId} coin={coin} />
            ))}
          </div>
        )}
      </div>

      {/* Left */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 text-negative">
          Left {tierLabel}
        </h3>
        {tierMovement.left.length === 0 ? (
          <p className="text-text-secondary text-sm">No coins left</p>
        ) : (
          <div className="space-y-1">
            {tierMovement.left.slice(0, maxDisplay).map((coin) => (
              <CoinListItem key={coin.cmcId} coin={coin} />
            ))}
          </div>
        )}
      </div>

      {/* Gainers */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 text-positive">
          Top Gainers in {tierLabel}
        </h3>
        {tierMovement.gainers.length === 0 ? (
          <p className="text-text-secondary text-sm">No gainers</p>
        ) : (
          <div className="space-y-1">
            {tierMovement.gainers.slice(0, maxDisplay).map((coin) => (
              <CoinListItem key={coin.cmcId} coin={coin} />
            ))}
          </div>
        )}
      </div>

      {/* Losers */}
      <div className="card">
        <h3 className="text-lg font-semibold mb-4 text-negative">
          Top Losers in {tierLabel}
        </h3>
        {tierMovement.losers.length === 0 ? (
          <p className="text-text-secondary text-sm">No losers</p>
        ) : (
          <div className="space-y-1">
            {tierMovement.losers.slice(0, maxDisplay).map((coin) => (
              <CoinListItem key={coin.cmcId} coin={coin} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
