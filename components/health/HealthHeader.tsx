'use client';

import React from 'react';
import Link from 'next/link';
import { Activity, LayoutDashboard, FileText } from 'lucide-react';

export default function HealthHeader() {
  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-3 sm:px-4 py-3 sm:py-4">
        <div className="flex items-center justify-between gap-4">
          <Link href="/health" className="flex items-center gap-2">
            <Activity className="w-5 h-5 text-accent" />
            <div className="font-bold text-lg">Health Prototype</div>
          </Link>

          <nav className="flex items-center gap-2">
            <Link
              href="/health"
              className="btn-touch bg-background border border-border hover:bg-card text-sm flex items-center gap-2 px-3"
            >
              <FileText className="w-4 h-4" />
              Notes
            </Link>
            <Link
              href="/health/dashboard"
              className="btn-touch bg-accent hover:bg-accent/90 text-white text-sm flex items-center gap-2 px-3"
            >
              <LayoutDashboard className="w-4 h-4" />
              Dashboard
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
