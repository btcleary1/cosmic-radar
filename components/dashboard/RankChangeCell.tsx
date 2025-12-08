'use client';

import React from 'react';

interface RankChangeCellProps {
  rankChange: number | null;
  yesterdayRank: number | null;
}

export default function RankChangeCell({ rankChange, yesterdayRank }: RankChangeCellProps) {
  // New coin (no yesterday rank)
  if (yesterdayRank === null) {
    return (
      <span className="inline-flex items-center px-2 py-1 rounded-md bg-accent text-xs font-semibold">
        NEW
      </span>
    );
  }

  // No change
  if (rankChange === 0) {
    return <span className="text-warning font-medium">0</span>;
  }

  // Rank improved (moved up)
  if (rankChange !== null && rankChange > 0) {
    return (
      <span className="text-positive font-medium flex items-center">
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M5.293 9.707a1 1 0 010-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 01-1.414 1.414L11 7.414V15a1 1 0 11-2 0V7.414L6.707 9.707a1 1 0 01-1.414 0z"
            clipRule="evenodd"
          />
        </svg>
        {rankChange}
      </span>
    );
  }

  // Rank decreased (moved down)
  if (rankChange !== null && rankChange < 0) {
    return (
      <span className="text-negative font-medium flex items-center">
        <svg className="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
          <path
            fillRule="evenodd"
            d="M14.707 10.293a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L9 12.586V5a1 1 0 012 0v7.586l2.293-2.293a1 1 0 011.414 0z"
            clipRule="evenodd"
          />
        </svg>
        {Math.abs(rankChange)}
      </span>
    );
  }

  return <span className="text-text-secondary">-</span>;
}
