import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ bookingId: string }> },
) {
  try {
    const { bookingId } = await params;
    const { status } = await req.json();

    const booking = await prisma.booking.findUnique({
      where: {
        id: Number(bookingId),
      },
    });

    if (!booking) {
      return NextResponse.json({ message: 'Booking tidak ditemukan' }, { status: 404 });
    }

    if (booking.status === status) {
      return NextResponse.json({ message: 'Status gak bisa diubah' }, { status: 400 });
    } else if (booking.status === 'COMPLETED' || booking.status === 'CANCELED') {
      return NextResponse.json({ message: 'Status gak bisa diubah' }, { status: 400 });
    }

    const updatedBooking = await prisma.booking.update({
      where: {
        id: Number(bookingId),
      },
      data: {
        status,
      },
    });

    return NextResponse.json({ data: updatedBooking, message: 'Status berhasil diubah' });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengubah status' },
      { status: 500 },
    );
  }
}
