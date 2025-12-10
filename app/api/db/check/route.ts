/**
 * GET /api/db/check
 * Check database connection and table status
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    // Test basic connection
    const result = await prisma.$queryRaw`SELECT 1 as test`;
    
    // Check if tables exist
    const tables = await prisma.$queryRaw`
      SELECT table_name 
      FROM information_schema.tables 
      WHERE table_schema = 'public'
    `;

    return NextResponse.json({
      status: 'connected',
      connectionTest: result,
      tables: tables,
      databaseUrl: process.env.DATABASE_URL ? 'Set (hidden)' : 'Not set'
    });
  } catch (error) {
    console.error('Database check error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { 
        status: 'error',
        error: errorMessage,
        databaseUrl: process.env.DATABASE_URL ? 'Set (hidden)' : 'Not set'
      },
      { status: 500 }
    );
  }
}
