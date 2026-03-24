'use client';

import { useEffect } from 'react';

// Force dynamic rendering to always fetch fresh data
export const dynamic = 'force-dynamic';

export default function Home() {
  useEffect(() => {
    // Check if this is health app and redirect
    if (process.env.NEXT_PUBLIC_APP_TYPE === 'health') {
      window.location.href = '/health-home';
    }
  }, []);

  // If not health app, show normal cosmic radar
  if (process.env.NEXT_PUBLIC_APP_TYPE !== 'health') {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold mb-4">Cosmic Radar</h1>
          <p className="text-xl text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  // Health app loading state
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Loading Health Dashboard...</p>
      </div>
    </div>
  );
}
