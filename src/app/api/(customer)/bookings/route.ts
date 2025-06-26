import { PaymentMethod } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';
import { uploadImage } from '@/lib/cloudinary';
import { getPaginationResponse } from '@/utils/pagination';

export const GET = async (req: NextRequest) => {
  try {
    const userId = req.nextUrl.searchParams.get('userId');
    const page = req.nextUrl.searchParams.get('page') ?? '1';

    if (!userId) {
      return NextResponse.json({ message: 'Customer ID tidak ditemukan' }, { status: 400 });
    }

    const [bookings, total] = await prisma.$transaction([
      prisma.booking.findMany({
        select: {
          id: true,
          time: true,
          vehicle: true,
          status: true,
          totalPay: true,
          service: {
            select: {
              id: true,
              name: true,
            },
          },
          payment: {
            select: {
              paymentMethod: true,
            },
          },
        },
        where: {
          customer: {
            userId,
          },
        },
        take: 10,
        skip: (+page - 1) * 10,
        orderBy: {
          time: 'desc',
        },
      }),
      prisma.booking.count({
        where: {
          customer: {
            userId,
          },
        },
      }),
    ]);

    return NextResponse.json(getPaginationResponse(bookings, total, +page));
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Terjadi kesalahan saat mengambil data' }, { status: 500 });
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const formData = await req.formData();

    const data = {
      customerName: formData.get('customerName') as string,
      customerEmail: formData.get('customerEmail') as string,
      bookingTime: formData.get('time') as string,
      vehicle: formData.get('vehicle') as string,
      serviceId: Number(formData.get('serviceId')),
      paymentMethod: formData.get('paymentMethod') as string,
      customerId: formData.get('customerId') as string,
    };

    const user = await prisma.customer.findUnique({
      where: {
        userId: data.customerId,
      },
    });

    if (!user) {
      return NextResponse.json({ message: 'User tidak ditemukan' }, { status: 404 });
    }

    const service = await prisma.service.findUnique({
      where: {
        id: data.serviceId,
      },
    });

    if (!service) {
      return NextResponse.json({ message: 'Layanan tidak ditemukan' }, { status: 404 });
    }

    let imageUrl = '';
    if (data.paymentMethod !== PaymentMethod.CASH && data.paymentMethod !== '') {
      const proofImage = formData.get('proofImage') as File;

      if (!proofImage) {
        return NextResponse.json({ message: 'Bukti transfer harus diisi' }, { status: 400 });
      }

      const uploadedImage = await uploadImage(proofImage);
      imageUrl = uploadedImage.url;
    }

    const booking = await prisma.booking.create({
      data: {
        time: new Date(data.bookingTime),
        vehicle: data.vehicle,
        customerId: user.id,
        serviceId: service.id,
        status: 'PENDING',
        totalPay: service.price,
        payment: {
          create: {
            proofImage: imageUrl,
            paymentMethod: data.paymentMethod as PaymentMethod,
            amount: service.price,
          },
        },
      },
    });

    return NextResponse.json(
      { message: 'Booking berhasil dibuat', data: booking },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat membuat booking' },
      { status: 500 },
    );
  }
};
