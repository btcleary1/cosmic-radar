'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Home, LayoutDashboard, Newspaper, User, Sparkles } from 'lucide-react';

interface NavItem {
  href: string;
  label: string;
  icon: React.ReactNode;
  requiresAuth?: boolean;
}

const navItems: NavItem[] = [
  { href: '/', label: 'Home', icon: <Home className="w-5 h-5" /> },
  { href: '/hub', label: 'Hub', icon: <LayoutDashboard className="w-5 h-5" /> },
  { href: '/dashboard', label: 'Dashboard', icon: <Sparkles className="w-5 h-5" />, requiresAuth: true },
  { href: '/news', label: 'News', icon: <Newspaper className="w-5 h-5" /> },
  { href: '/account', label: 'Account', icon: <User className="w-5 h-5" /> },
];

export default function MobileNav() {
  const pathname = usePathname();
  const { data: session } = useSession();

  // Filter items based on auth status
  const visibleItems = navItems.filter(item => {
    if (item.requiresAuth && !session) return false;
    return true;
  });

  // Don't show on auth pages
  if (pathname?.startsWith('/auth')) {
    return null;
  }

  return (
    <nav className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-card border-t border-border safe-area-bottom">
      <div className="flex items-center justify-around py-1">
        {visibleItems.map((item) => {
          const isActive = pathname === item.href || 
            (item.href !== '/' && pathname?.startsWith(item.href));
          
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center min-w-[64px] min-h-[48px] py-1.5 px-2 rounded-lg transition-colors active:bg-background/50 ${
                isActive
                  ? 'text-accent'
                  : 'text-text-secondary'
              }`}
            >
              {item.icon}
              <span className="text-[10px] mt-0.5 font-medium">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
