import { editServiceSchema } from '@/features/service/forms';
import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';

export async function PATCH(req: Request, { params }: { params: Promise<{ serviceId: number }> }) {
  try {
    const body = await req.json();

    const payload = editServiceSchema.safeParse(body);

    if (!payload.success) {
      return NextResponse.json({ message: payload.error.errors[0].message }, { status: 400 });
    }

    const { serviceId } = await params;

    const service = await prisma.service.findUnique({
      where: { id: +serviceId },
    });

    if (!service) {
      return NextResponse.json({ message: 'Layanan tidak ditemukan' }, { status: 404 });
    }

    await prisma.service.update({
      where: { id: +serviceId },
      data: payload.data,
    });

    return NextResponse.json({ message: 'Layanan berhasil diupdate' }, { status: 200 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat mengedit layanan' },
      { status: 500 },
    );
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ serviceId: number }> }) {
  try {
    const { serviceId } = await params;

    const service = await prisma.service.findUnique({
      where: { id: +serviceId },
    });

    if (!service) {
      return NextResponse.json({ message: 'Layanan tidak ditemukan' }, { status: 404 });
    }

    await prisma.service.delete({
      where: { id: +serviceId },
    });

    return NextResponse.json({ message: 'Layanan berhasil dihapus' }, { status: 200 });
  } catch (err) {
    console.log(err);
    return NextResponse.json(
      { message: 'Terjadi kesalahan saat menghapus layanan' },
      { status: 500 },
    );
  }
}
