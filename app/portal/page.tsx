'use client';

import { useState } from 'react';
import { ExternalLink, ChevronDown, ChevronUp, Activity, Satellite, Leaf, DollarSign } from 'lucide-react';

interface AppPrototype {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  localUrl: string;
  productionUrl?: string;
  pages: { label: string; path: string }[];
  status: 'active' | 'in-progress' | 'planned';
}

const PROTOTYPES: AppPrototype[] = [
  {
    id: 'cosmic-radar',
    name: 'Cosmic Radar',
    description: 'Crypto dashboard — real-time prices, portfolio tracking, market trends, and news.',
    icon: <Satellite className="w-6 h-6" />,
    color: 'from-blue-600 to-indigo-600',
    localUrl: 'http://localhost:3000/hub',
    productionUrl: undefined,
    pages: [
      { label: 'Hub (Main Dashboard)', path: '/hub' },
      { label: 'Portfolio', path: '/portfolio' },
      { label: 'Markets', path: '/markets' },
      { label: 'News', path: '/news' },
      { label: 'Sign In', path: '/auth/signin' },
    ],
    status: 'active',
  },
  {
    id: 'ethan-health',
    name: "Ethan's Health App",
    description: 'Pediatric cardiac health tracker with AI medical analysis, doctor briefings, and event logging.',
    icon: <Activity className="w-6 h-6" />,
    color: 'from-red-500 to-rose-600',
    localUrl: 'http://localhost:3001',
    productionUrl: undefined,
    pages: [
      { label: 'Dashboard', path: '/dashboard' },
      { label: 'AI Medical Analysis', path: '/ai-analysis' },
      { label: 'Doctor Briefing (Printable)', path: '/doctor-briefing' },
      { label: 'Upload Documents', path: '/uploads' },
    ],
    status: 'active',
  },
  {
    id: 'hortus',
    name: 'Hortus',
    description: 'Garden planning and plant tracking app.',
    icon: <Leaf className="w-6 h-6" />,
    color: 'from-green-500 to-emerald-600',
    localUrl: 'http://localhost:3002',
    productionUrl: undefined,
    pages: [],
    status: 'planned',
  },
  {
    id: 'mynt',
    name: 'Mynt',
    description: 'Personal finance and budgeting prototype.',
    icon: <DollarSign className="w-6 h-6" />,
    color: 'from-yellow-500 to-amber-600',
    localUrl: 'http://localhost:3003',
    productionUrl: undefined,
    pages: [],
    status: 'planned',
  },
];

function AppCard({ app }: { app: AppPrototype }) {
  const [open, setOpen] = useState(false);

  const statusBadge =
    app.status === 'active' ? 'bg-green-100 text-green-700' :
    app.status === 'in-progress' ? 'bg-yellow-100 text-yellow-700' :
    'bg-gray-100 text-gray-500';

  const statusLabel =
    app.status === 'active' ? 'Active' :
    app.status === 'in-progress' ? 'In Progress' : 'Planned';

  return (
    <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm hover:shadow-md transition-shadow">
      {/* Card header */}
      <div className={`bg-gradient-to-r ${app.color} p-5 text-white`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {app.icon}
            <div>
              <h2 className="text-lg font-bold">{app.name}</h2>
              <p className="text-white/80 text-sm mt-0.5">{app.description}</p>
            </div>
          </div>
          <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${statusBadge} ml-3 shrink-0`}>
            {statusLabel}
          </span>
        </div>

        {/* Quick launch buttons */}
        <div className="flex gap-2 mt-4 flex-wrap">
          <a
            href={app.localUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            Open Local
          </a>
          {app.productionUrl && (
            <a
              href={app.productionUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-white/20 hover:bg-white/30 rounded-lg text-sm font-medium transition-colors"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Open Deployed
            </a>
          )}
        </div>
      </div>

      {/* Pages dropdown */}
      {app.pages.length > 0 && (
        <div>
          <button
            onClick={() => setOpen(!open)}
            className="w-full flex items-center justify-between px-5 py-3 text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors border-t border-gray-100"
          >
            <span>View all pages ({app.pages.length})</span>
            {open ? <ChevronUp className="w-4 h-4 text-gray-400" /> : <ChevronDown className="w-4 h-4 text-gray-400" />}
          </button>

          {open && (
            <div className="px-5 pb-4 grid grid-cols-1 sm:grid-cols-2 gap-2">
              {app.pages.map(page => (
                <a
                  key={page.path}
                  href={`${app.localUrl.replace(/\/(hub|dashboard)?$/, '')}${page.path}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50 rounded-lg border border-gray-100 hover:border-gray-300 transition-colors"
                >
                  <ExternalLink className="w-3 h-3 text-gray-400 shrink-0" />
                  {page.label}
                </a>
              ))}
            </div>
          )}
        </div>
      )}

      {app.pages.length === 0 && (
        <div className="px-5 py-4 text-sm text-gray-400 italic border-t border-gray-100">
          No pages configured yet
        </div>
      )}
    </div>
  );
}

export default function PortalPage() {
  const activeApps = PROTOTYPES.filter(a => a.status === 'active');
  const otherApps = PROTOTYPES.filter(a => a.status !== 'active');

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-6 py-5">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-900">Prototype Portal</h1>
          <p className="text-gray-500 text-sm mt-1">All your app prototypes in one place — launch any page directly</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">

        {/* Active apps */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Active Prototypes</h2>
          <div className="space-y-4">
            {activeApps.map(app => <AppCard key={app.id} app={app} />)}
          </div>
        </div>

        {/* Planned apps */}
        <div>
          <h2 className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-4">Planned / In Progress</h2>
          <div className="space-y-4">
            {otherApps.map(app => <AppCard key={app.id} app={app} />)}
          </div>
        </div>

        <div className="text-center text-xs text-gray-300 pt-4">
          localhost:3000/portal &nbsp;•&nbsp; Health App: localhost:3001 &nbsp;•&nbsp; Each app has its own shareable URL when deployed
        </div>
      </div>
    </div>
  );
}
