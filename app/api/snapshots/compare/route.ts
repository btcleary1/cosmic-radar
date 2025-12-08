/**
 * GET /api/snapshots/compare?date=YYYY-MM-DD
 * Compares snapshot for given date with previous day
 */

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { buildCompareResponse } from '@/lib/compare';
import { getTodayUTC, parseDateString, getDaysAgo, formatDateString } from '@/lib/date';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const dateParam = searchParams.get('date');

    // Determine target date
    let targetDate: Date;
    if (!dateParam || dateParam === 'today') {
      targetDate = getTodayUTC();
    } else {
      try {
        targetDate = parseDateString(dateParam);
      } catch {
        return NextResponse.json(
          { error: 'Invalid date format. Use YYYY-MM-DD' },
          { status: 400 }
        );
      }
    }

    // Find snapshot for target date
    const todaySnapshot = await prisma.snapshot.findUnique({
      where: { date: targetDate },
      include: { coins: true },
    });

    if (!todaySnapshot) {
      return NextResponse.json(
        {
          error: `No snapshot found for ${formatDateString(targetDate)}`,
          suggestion: 'Call POST /api/snapshots/today to create a snapshot',
        },
        { status: 404 }
      );
    }

    // Find previous snapshot (yesterday or closest before)
    const previousDate = getDaysAgo(targetDate, 1);
    let yesterdaySnapshot = await prisma.snapshot.findUnique({
      where: { date: previousDate },
      include: { coins: true },
    });

    // If no snapshot for exact previous day, find the most recent one before target
    if (!yesterdaySnapshot) {
      yesterdaySnapshot = await prisma.snapshot.findFirst({
        where: {
          date: {
            lt: targetDate,
          },
        },
        orderBy: {
          date: 'desc',
        },
        include: { coins: true },
      });
    }

    // Build comparison response
    const compareResponse = buildCompareResponse(todaySnapshot, yesterdaySnapshot);

    return NextResponse.json(compareResponse);
  } catch (error) {
    console.error('Error in /api/snapshots/compare:', error);
    return NextResponse.json(
      { error: 'Failed to compare snapshots' },
      { status: 500 }
    );
  }
}
