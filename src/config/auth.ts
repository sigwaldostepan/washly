import { serverEnv } from './env';

export const defaultCookieOptions = {
  maxAge: serverEnv.JWT_MAX_AGE,
  httpOnly: true,
  sameSite: 'lax' as const,
  secure: serverEnv.NODE_ENV === 'production' ? true : false,
};
