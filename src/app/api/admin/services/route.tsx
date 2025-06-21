import { createServiceSchema } from '@/features/service/forms';
import { prisma } from '@/lib/prisma';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(req: NextRequest) {
  try {
    const params = req.nextUrl.searchParams.get('search');

    let services = [];

    if (params) {
      services = await prisma.service.findMany({
        where: {
          name: {
            contains: params,
          },
        },
      });
    } else {
      services = await prisma.service.findMany();
    }

    return NextResponse.json({ data: services });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengambil data layanan' },
      { status: 500 },
    );
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const payload = createServiceSchema.safeParse(body);

    if (!payload.success) {
      return NextResponse.json({ message: payload.error.errors[0].message }, { status: 400 });
    }

    const { name, price, description, icon } = payload.data;

    const service = await prisma.service.create({
      data: {
        name,
        price,
        description,
        icon,
      },
    });

    return NextResponse.json(
      { data: service, message: 'Layanan berhasil dibuat' },
      { status: 201 },
    );
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat membuat layanan' },
      { status: 500 },
    );
  }
}
