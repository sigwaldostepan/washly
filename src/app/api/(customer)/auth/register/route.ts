import { registerSchema } from '@/features/auth/forms';
import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { hash } from 'bcrypt';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = registerSchema.safeParse(body);

    if (!payload.success) {
      return NextResponse.json({ message: payload.error.errors[0].message }, { status: 400 });
    }

    const { name, email, password } = payload.data;

    const userExist = await prisma.user.findUnique({
      where: { email },
    });

    if (userExist) {
      return NextResponse.json({ message: 'Email sudah terdaftar' }, { status: 400 });
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: 'CUSTOMER',
        customer: {
          create: {
            name,
          },
        },
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    return NextResponse.json({
      success: true,
      user: userWithoutPassword,
      message: 'Registrasi berhasil',
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Terjadi kesalahan saat registrasi' }, { status: 500 });
  }
}
