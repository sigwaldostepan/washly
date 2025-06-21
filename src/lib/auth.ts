import { User } from '@/generated/prisma';
import { decryptJWT, JWTPayload, signJWT } from './jwt';
import { cookies } from 'next/headers';
import { defaultCookieOptions, serverEnv } from '@/config';

export const setAuthCookie = async (payload: Pick<User, 'id' | 'name' | 'email' | 'role'>) => {
  const token = await signJWT(payload);

  const cookie = await cookies();

  cookie.set(serverEnv.JWT_COOKIE_NAME, token, {
    ...defaultCookieOptions,
  });

  return token;
};

export const getSession = async () => {
  const cookie = await cookies();
  const session = cookie.get(serverEnv.JWT_COOKIE_NAME)?.value;

  if (!session) {
    return null;
  }

  const user = (await decryptJWT(session)) as unknown as JWTPayload;

  return { user };
};

export const refreshSession = async () => {
  const cookie = await cookies();
  const session = cookie.get(serverEnv.JWT_COOKIE_NAME)?.value;

  if (!session) {
    return null;
  }

  const payload = (await decryptJWT(session)) as unknown as JWTPayload;
  const newToken = await signJWT(payload);

  cookie.set(serverEnv.JWT_COOKIE_NAME, newToken, { ...defaultCookieOptions });
};
