'use client';

import React, { useState, useMemo } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
  SortingState,
} from '@tanstack/react-table';
import RankChangeCell from './RankChangeCell';
import { CoinComparison } from '@/lib/compare';
import CoinDetailsModal from '@/components/search/CoinDetailsModal';

interface TopCoinsTableProps {
  data: CoinComparison[];
}

const columnHelper = createColumnHelper<CoinComparison>();

function formatLargeNumber(num: number | null): string {
  if (num === null) return '-';
  if (num >= 1e12) return `$${(num / 1e12).toFixed(2)}T`;
  if (num >= 1e9) return `$${(num / 1e9).toFixed(2)}B`;
  if (num >= 1e6) return `$${(num / 1e6).toFixed(2)}M`;
  return `$${num.toFixed(2)}`;
}

export default function TopCoinsTable({ data }: TopCoinsTableProps) {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [globalFilter, setGlobalFilter] = useState('');
  const [minVolume, setMinVolume] = useState<number>(0);
  const [minMarketCap, setMinMarketCap] = useState<number>(0);
  const [selectedCoinId, setSelectedCoinId] = useState<number | null>(null);

  const columns = useMemo(
    () => [
      columnHelper.accessor('todayRank', {
        header: 'Rank',
        cell: (info) => (
          <div className="font-semibold">{info.getValue() ?? '-'}</div>
        ),
        size: 60,
      }),
      columnHelper.accessor('rankChange', {
        header: 'Δ Rank',
        cell: (info) => (
          <RankChangeCell
            rankChange={info.getValue()}
            yesterdayRank={info.row.original.yesterdayRank}
          />
        ),
        sortingFn: (rowA, rowB) => {
          const a = rowA.original.rankChange ?? 0;
          const b = rowB.original.rankChange ?? 0;
          return a - b;
        },
        size: 80,
      }),
      columnHelper.accessor('name', {
        header: 'Coin',
        cell: (info) => (
          <div className="flex items-center space-x-3">
            <div>
              <div className="font-semibold">{info.getValue()}</div>
              <div className="text-sm text-text-secondary">
                {info.row.original.symbol}
              </div>
            </div>
          </div>
        ),
        size: 200,
      }),
      columnHelper.accessor('todayPrice', {
        header: 'Price',
        cell: (info) => {
          const price = info.getValue();
          if (price === null) return '-';
          return price >= 1
            ? `$${price.toFixed(2)}`
            : `$${price.toFixed(6)}`;
        },
        size: 120,
      }),
      columnHelper.accessor('todayChange24h', {
        header: '24h %',
        cell: (info) => {
          const change = info.getValue();
          if (change === null) return '-';
          const isPositive = change >= 0;
          return (
            <span className={isPositive ? 'text-positive' : 'text-negative'}>
              {isPositive ? '+' : ''}
              {change.toFixed(2)}%
            </span>
          );
        },
        size: 100,
      }),
      columnHelper.accessor('todayMarketCap', {
        header: 'Market Cap',
        cell: (info) => formatLargeNumber(info.getValue()),
        size: 140,
      }),
      columnHelper.accessor('todayVolume24h', {
        header: '24h Volume',
        cell: (info) => formatLargeNumber(info.getValue()),
        size: 140,
      }),
    ],
    []
  );

  const filteredData = useMemo(() => {
    return data.filter((coin) => {
      const volumeMatch =
        !minVolume || (coin.todayVolume24h ?? 0) >= minVolume * 1e6;
      const marketCapMatch =
        !minMarketCap || (coin.todayMarketCap ?? 0) >= minMarketCap * 1e6;
      return volumeMatch && marketCapMatch;
    });
  }, [data, minVolume, minMarketCap]);

  const table = useReactTable({
    data: filteredData,
    columns,
    state: {
      sorting,
      globalFilter,
    },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
  });

  return (
    <div className="card">
      <div className="mb-4">
        <h2 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Top 200 Cryptocurrencies</h2>

        {/* Controls - Stack on mobile, row on desktop */}
        <div className="space-y-3 sm:space-y-0 sm:flex sm:flex-wrap sm:gap-3 mb-4">
          {/* Search - Full width on mobile */}
          <input
            type="text"
            placeholder="Search coins..."
            value={globalFilter}
            onChange={(e) => setGlobalFilter(e.target.value)}
            className="w-full sm:flex-1 sm:min-w-[180px] px-3 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
          />

          {/* Sort and filters row */}
          <div className="flex gap-2 sm:gap-3">
            <select
              onChange={(e) => {
                const value = e.target.value;
                if (value === 'rank') setSorting([{ id: 'todayRank', desc: false }]);
                else if (value === 'change')
                  setSorting([{ id: 'todayChange24h', desc: true }]);
                else if (value === 'marketcap')
                  setSorting([{ id: 'todayMarketCap', desc: true }]);
                else if (value === 'volume')
                  setSorting([{ id: 'todayVolume24h', desc: true }]);
                else if (value === 'rankchange')
                  setSorting([{ id: 'rankChange', desc: true }]);
              }}
              className="flex-1 sm:flex-none px-3 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            >
              <option value="rank">Rank</option>
              <option value="change">24h %</option>
              <option value="marketcap">Market Cap</option>
              <option value="volume">Volume</option>
              <option value="rankchange">Δ Rank</option>
            </select>

            {/* Hide advanced filters on mobile */}
            <input
              type="number"
              placeholder="Min Vol (M)"
              value={minVolume || ''}
              onChange={(e) => setMinVolume(Number(e.target.value))}
              className="hidden sm:block w-28 px-3 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />

            <input
              type="number"
              placeholder="Min MCap (M)"
              value={minMarketCap || ''}
              onChange={(e) => setMinMarketCap(Number(e.target.value))}
              className="hidden sm:block w-32 px-3 py-2.5 bg-background border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-accent text-sm"
            />
          </div>
        </div>
      </div>

      {/* Table - Horizontally scrollable on mobile */}
      <div className="overflow-x-auto -mx-4 sm:mx-0">
        <div className="min-w-[600px] px-4 sm:px-0">
          <table className="w-full">
            <thead>
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id} className="border-b border-border">
                  {headerGroup.headers.map((header) => (
                    <th
                      key={header.id}
                      className="text-left px-2 sm:px-4 py-2 sm:py-3 text-xs sm:text-sm font-semibold text-text-secondary cursor-pointer hover:text-text-primary whitespace-nowrap"
                      onClick={header.column.getToggleSortingHandler()}
                    >
                      <div className="flex items-center space-x-1">
                        <span>
                          {flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                        </span>
                        {header.column.getIsSorted() && (
                          <span>
                            {header.column.getIsSorted() === 'desc' ? '↓' : '↑'}
                          </span>
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => (
                <tr
                  key={row.id}
                  onClick={() => setSelectedCoinId(row.original.cmcId)}
                  className="border-b border-border hover:bg-background transition-colors cursor-pointer active:bg-background/80"
                >
                  {row.getVisibleCells().map((cell) => (
                    <td key={cell.id} className="px-2 sm:px-4 py-2.5 sm:py-3 text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-3 sm:mt-4 text-xs sm:text-sm text-text-secondary">
        Showing {table.getRowModel().rows.length} of {data.length} coins
      </div>

      {/* Coin Details Modal */}
      {selectedCoinId && (
        <CoinDetailsModal
          coinId={selectedCoinId}
          onClose={() => setSelectedCoinId(null)}
        />
      )}
    </div>
  );
}
