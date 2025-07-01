import 'server-only';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

import { SessionPayload } from './definitions';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + 60 * 1000);
  const session = await encrypt({ expiresAt, userId });
  const cookieStore = await cookies();

  cookieStore.set('session', session, {
    expires: expiresAt,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: true,
  });
}

export async function decrypt(session: string | undefined = '') {
  try {
    const { payload } = await jwtVerify(session, secret, {
      algorithms: ['HS256'],
    });
    return payload;
  } catch (error) {
    console.log('Failed to verify session', error);
  }
}

export async function deleteSession() {
  const cookie = await cookies();

  cookie.delete('session');
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function updateSession() {
  const session = (await cookies()).get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + 60 * 1000);

  const cookieStore = await cookies();

  cookieStore.set('session', session, {
    expires: expires,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: true,
  });
}
