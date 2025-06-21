import { serverEnv } from '@/config';
import { jwtVerify, SignJWT } from 'jose';

export interface JWTPayload {
  id: string;
  name: string;
  email: string;
  role: string;
}

const ENCODED_JWT_SECRET = new TextEncoder().encode(serverEnv.JWT_SECRET);

export const signJWT = async (payload: JWTPayload) => {
  const jwt = await new SignJWT({
    ...payload,
    sub: payload.id,
  })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime(`${serverEnv.JWT_MAX_AGE} secs`)
    .sign(ENCODED_JWT_SECRET);

  return jwt;
};

export const decryptJWT = async (token: string) => {
  const { payload } = await jwtVerify(token, ENCODED_JWT_SECRET, {
    algorithms: ['HS256'],
  });

  return payload ?? null;
};
