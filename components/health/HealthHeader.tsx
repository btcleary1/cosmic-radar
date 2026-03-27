'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Activity, LayoutDashboard, FileText, Brain, Clipboard, Upload } from 'lucide-react';

const navItems = [
  { href: '/health', label: 'Notes', icon: FileText, exact: true },
  { href: '/health/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/health/ai-analysis', label: 'AI Analysis', icon: Brain },
  { href: '/health/doctor-briefing', label: 'Doctor Briefing', icon: Clipboard },
  { href: '/health/uploads', label: 'Uploads', icon: Upload },
];

export default function HealthHeader() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-3 sm:px-4 py-3">
        <div className="flex items-center justify-between gap-4">
          <Link href="/health" className="flex items-center gap-2 shrink-0">
            <Activity className="w-5 h-5 text-accent" />
            <div className="font-bold text-base hidden sm:block">Health</div>
          </Link>

          <nav className="flex items-center gap-1 overflow-x-auto scrollbar-hide">
            {navItems.map(({ href, label, icon: Icon, exact }) => {
              const isActive = exact ? pathname === href : pathname?.startsWith(href);
              return (
                <Link
                  key={href}
                  href={href}
                  className={`flex items-center gap-1.5 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                    isActive
                      ? 'bg-accent text-white'
                      : 'text-text-secondary hover:text-text-primary hover:bg-background'
                  }`}
                >
                  <Icon className="w-4 h-4 shrink-0" />
                  <span className="hidden sm:inline">{label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>
    </header>
  );
}
