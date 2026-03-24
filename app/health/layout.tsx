import type { ReactNode } from 'react';

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
