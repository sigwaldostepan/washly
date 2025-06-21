import { prisma } from '@/lib/prisma';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const userExist = await prisma.user.findUnique({
      where: { email: body.email },
    });

    if (userExist) {
      return NextResponse.json({ message: 'Email sudah terdaftar' }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(body.password, 10);

    await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: hashedPassword,
        role: 'ADMIN',
      },
    });

    return NextResponse.json({ message: 'Admin created' });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Terjadi kesalahan saat registrasi' }, { status: 500 });
  }
}
