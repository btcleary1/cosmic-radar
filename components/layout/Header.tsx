'use client';

import React, { useState } from 'react';
import { useSession, signIn, signOut } from 'next-auth/react';
import { User, LogOut, BarChart3, Bell, Wallet, Search } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';

export default function Header() {
  const { data: session, status } = useSession();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // For now, just show an alert. You can implement full search later
      alert(`Search functionality coming soon! You searched for: ${searchQuery}`);
      // Future: router.push(`/search?q=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-card border-b border-border backdrop-blur-sm bg-opacity-95">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Left: App Title with Mascot */}
          <div className="flex items-center space-x-3">
            <div className="relative w-10 h-10 flex-shrink-0">
              <Image
                src="/mascot.png"
                alt="Cosmic Radar Mascot"
                width={40}
                height={40}
                className="object-contain"
                unoptimized
                priority
              />
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-accent to-purple-500 bg-clip-text text-transparent">
              Cosmic Radar
            </h1>
          </div>

          {/* Center: Search */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <form onSubmit={handleSearch} className="w-full relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-text-secondary" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search cryptocurrencies..."
                className="w-full pl-10 pr-4 py-2 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-text-primary placeholder-text-secondary"
              />
            </form>
          </div>

          {/* Right: Currency & User */}
          <div className="flex items-center space-x-4">
            <div className="px-3 py-1.5 bg-background border border-border rounded-lg text-sm font-medium">
              USD
            </div>
            
            {status === 'loading' ? (
              <div className="w-8 h-8 rounded-full bg-background animate-pulse" />
            ) : session ? (
              <div className="relative">
                <button
                  onClick={() => setShowUserMenu(!showUserMenu)}
                  className="flex items-center gap-2 px-3 py-2 bg-background border border-border rounded-lg hover:bg-card transition-colors"
                >
                  {session.user?.image ? (
                    <img
                      src={session.user.image}
                      alt="User"
                      className="w-6 h-6 rounded-full"
                    />
                  ) : (
                    <User className="w-5 h-5" />
                  )}
                  <span className="text-sm font-medium hidden md:block">
                    {session.user?.name || 'Account'}
                  </span>
                </button>

                {showUserMenu && (
                  <>
                    <div
                      className="fixed inset-0 z-40"
                      onClick={() => setShowUserMenu(false)}
                    />
                    <div className="absolute right-0 mt-2 w-56 bg-card border border-border rounded-lg shadow-lg z-50">
                      <div className="p-3 border-b border-border">
                        <p className="text-sm font-medium">{session.user?.name}</p>
                        <p className="text-xs text-text-secondary">{session.user?.email}</p>
                      </div>
                      <div className="py-2">
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-background flex items-center gap-2">
                          <BarChart3 className="w-4 h-4" />
                          My Watchlists
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-background flex items-center gap-2">
                          <Bell className="w-4 h-4" />
                          Price Alerts
                        </button>
                        <button className="w-full px-4 py-2 text-left text-sm hover:bg-background flex items-center gap-2">
                          <Wallet className="w-4 h-4" />
                          Connect Wallet
                        </button>
                      </div>
                      <div className="border-t border-border py-2">
                        <button
                          onClick={() => signOut()}
                          className="w-full px-4 py-2 text-left text-sm hover:bg-background flex items-center gap-2 text-negative"
                        >
                          <LogOut className="w-4 h-4" />
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <button
                onClick={() => signIn()}
                className="px-4 py-2 bg-accent text-white rounded-lg hover:bg-accent/90 transition-colors font-medium"
              >
                Sign In
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
