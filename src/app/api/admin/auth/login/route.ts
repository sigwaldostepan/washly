import { loginSchema } from '@/features/auth/forms';
import { setAuthCookie } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { compare } from 'bcrypt';
import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const payload = loginSchema.safeParse(body);

    if (!payload.success) {
      return NextResponse.json({ message: payload.error.errors[0].message }, { status: 400 });
    }

    const { email, password } = payload.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({ message: 'Email atau password salah' }, { status: 400 });
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      return NextResponse.json({ message: 'Email atau password salah' }, { status: 400 });
    }

    if (user.role !== 'ADMIN') {
      return NextResponse.json({ message: 'Anda tidak memiliki akses' }, { status: 400 });
    }

    const token = await setAuthCookie({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
    });

    return NextResponse.json({
      data: {
        access_token: token,
      },
    });
  } catch (err) {
    console.log(err);
    return NextResponse.json({ message: 'Terjadi kesalahan saat registrasi' }, { status: 500 });
  }
}
