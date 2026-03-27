import type { Metadata } from 'next';
import type { ReactNode } from 'react';

export const metadata: Metadata = {
  title: {
    default: 'Ethan\'s Health Dashboard',
    template: '%s | Ethan\'s Health Dashboard',
  },
  description: 'Pediatric cardiac health tracking, AI medical analysis, and doctor briefings for Ethan Alvarez.',
};

export default function HealthLayout({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div className="min-h-full bg-gray-50">
      <div className="min-h-full">
        {children}
      </div>
    </div>
  );
}
