import { serverEnv } from '@/config';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = async () => {
  try {
    const cookie = await cookies();
    cookie.delete(serverEnv.JWT_COOKIE_NAME);

    return NextResponse.json({ success: true, message: 'Logout berhasil' });
  } catch (error) {
    return NextResponse.json({ success: false, message: 'Logout gagal' }, { status: 500 });
  }
};
