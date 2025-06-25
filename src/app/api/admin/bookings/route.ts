import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getPaginationResponse } from '@/utils/pagination';

export async function GET(req: NextRequest) {
  try {
    const pageParams = req.nextUrl.searchParams.get('page') ?? '1';

    const page = Math.max(+pageParams, 1);

    const [bookings, total] = await prisma.$transaction([
      prisma.booking.findMany({
        select: {
          id: true,
          time: true,
          vehicle: true,
          status: true,
          totalPay: true,
          customer: {
            select: {
              id: true,
              name: true,
            },
          },
          service: {
            select: {
              id: true,
              name: true,
            },
          },
          payment: {
            select: {
              paymentMethod: true,
              amount: true,
              proofImage: true,
            },
          },
        },
        take: 10,
        skip: (+page - 1) * 10,
        orderBy: {
          time: 'desc',
        },
      }),
      prisma.booking.count(),
    ]);

    return NextResponse.json(getPaginationResponse(bookings, total, +page));
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Terjadi kesalahan saat mengambil data' }, { status: 500 });
  }
}
