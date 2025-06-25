import { Prisma } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { getPaginationResponse } from '@/utils/pagination';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const pageParams = req.nextUrl.searchParams.get('page') ?? '1';
    const searchParams = req.nextUrl.searchParams.get('search') ?? '';

    const page = Math.max(+pageParams, 1);

    const whereClause: Prisma.CustomerWhereInput = searchParams
      ? {
          name: {
            contains: searchParams,
          },
        }
      : {};

    const [customers, total] = await prisma.$transaction([
      prisma.customer.findMany({
        select: {
          id: true,
          name: true,
          bookings: {
            select: {
              id: true,
              time: true,
              vehicle: true,
              status: true,
              totalPay: true,
            },
            orderBy: {
              time: 'desc',
            },
          },
          user: {
            select: {
              email: true,
            },
          },
        },
        take: 10,
        skip: (page - 1) * 10,
        where: whereClause,
      }),
      prisma.customer.count({
        where: whereClause,
      }),
    ]);

    const customersWithSummaries = customers.map((customer) => {
      const totalSpent = customer.bookings.reduce((acc, booking) => {
        if (booking.status === 'COMPLETED') {
          return acc + +booking.totalPay;
        }

        return acc;
      }, 0);

      return {
        ...customer,
        totalSpent,
        lastBooked: customer.bookings[0]?.time ?? null,
      };
    });

    const response = getPaginationResponse(customersWithSummaries, total, page);

    return NextResponse.json(response);
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengambil data customer' },
      { status: 500 },
    );
  }
}
