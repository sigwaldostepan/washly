import { prisma } from '@/lib/prisma';
import { endOfDay, endOfMonth, startOfDay, startOfMonth, subDays, subMonths } from 'date-fns';
import { NextResponse } from 'next/server';

export const GET = async () => {
  try {
    const today = startOfDay(new Date(Date.now()));
    const startOfyesterday = startOfDay(subDays(today, 1));
    const endOfyesterday = endOfDay(subDays(today, 1));

    const month = startOfMonth(new Date(Date.now()));
    const previousMonth = subMonths(month, 1);
    const startOfPreviousMonth = startOfMonth(previousMonth);
    const endOfPreviousMonth = endOfMonth(previousMonth);

    const [
      dailyRevenue,
      yesterdayRevenue,
      monthlyRevenue,
      previousMonthRevenue,
      totalVehicleWashed,
    ] = await prisma.$transaction([
      prisma.booking.aggregate({
        _sum: {
          totalPay: true,
        },
        where: {
          status: 'COMPLETED',
          createdAt: {
            gte: today,
          },
        },
      }),
      prisma.booking.aggregate({
        _sum: {
          totalPay: true,
        },
        where: {
          status: 'COMPLETED',
          createdAt: {
            gte: startOfyesterday,
            lte: endOfyesterday,
          },
        },
      }),
      prisma.booking.aggregate({
        _sum: {
          totalPay: true,
        },
        where: {
          status: 'COMPLETED',
          createdAt: {
            gte: month,
          },
        },
      }),
      prisma.booking.aggregate({
        _sum: {
          totalPay: true,
        },
        where: {
          status: 'COMPLETED',
          createdAt: {
            gte: startOfPreviousMonth,
            lte: endOfPreviousMonth,
          },
        },
      }),
      prisma.booking.count({
        where: {
          status: 'COMPLETED',
        },
      }),
    ]);

    const dailyDifference =
      +(dailyRevenue._sum.totalPay ?? 0) - +(yesterdayRevenue._sum.totalPay ?? 0);
    const monthlyDifference =
      +(monthlyRevenue._sum.totalPay ?? 0) - +(previousMonthRevenue._sum.totalPay ?? 0);

    const dailySummary = {
      dailyRevenue: dailyRevenue._sum.totalPay,
      dailyDifference,
    };

    const monthlySummary = {
      monthlyRevenue: monthlyRevenue._sum.totalPay,
      monthlyDifference,
    };

    return NextResponse.json({ data: { dailySummary, monthlySummary, totalVehicleWashed } });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengambil data summary' },
      { status: 500 },
    );
  }
};
