'use client';

import React, { useState } from 'react';
import DashboardToggle from './DashboardToggle';
import DefiDashboard from './DefiDashboard';
import TopCoinsTable from './TopCoinsTable';
import FlowsSection from './FlowsSection';
import { CompareResponse } from '@/lib/compare';

interface DashboardContainerProps {
  compareData?: CompareResponse;
  defiData: any;
}

export default function DashboardContainer({ compareData, defiData }: DashboardContainerProps) {
  const [activeView, setActiveView] = useState<'crypto' | 'defi'>('crypto');

  return (
    <>
      {/* Dashboard Toggle */}
      <DashboardToggle activeView={activeView} onToggle={setActiveView} />

      {/* Conditional Dashboard Content */}
      {activeView === 'crypto' ? (
        <>
          {/* Flows & Movers Section */}
          <FlowsSection compareData={compareData} />

          {/* Top 200 Table */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4">Complete Top 200 Rankings</h2>
            <TopCoinsTable data={compareData?.top200Today ?? []} />
          </div>
        </>
      ) : (
        <DefiDashboard dexData={defiData?.dex} tvlData={defiData?.tvl} />
      )}
    </>
  );
}
