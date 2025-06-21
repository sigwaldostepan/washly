import { refreshSession } from './lib/auth';
import { NextResponse } from 'next/server';

export default async function authMiddleware(req: Request) {
  await refreshSession();

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api/auth|_next/static|_next/image|favicon.ico).*)'],
};
