import 'server-only';
import { jwtVerify, SignJWT } from 'jose';
import { cookies } from 'next/headers';

import { SessionPayload } from './definitions';

const secret = new TextEncoder().encode(process.env.JWT_SECRET);
const SESSION_DURATION = 7 * 24 * 60 * 60 * 1000; // 7 days in milliseconds

export async function createSession(userId: string) {
  const expiresAt = new Date(Date.now() + SESSION_DURATION);
  const session = await encrypt({ expiresAt, userId });
  const cookieStore = await cookies();

  cookieStore.set('session', session, {
    expires: expiresAt,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return session;
}

export async function decrypt(session: string | undefined = '') {
  if (!session) {
    console.log('No session provided');
    return null;
  }

  try {
    const { payload } = await jwtVerify(session, secret, {
      algorithms: ['HS256'],
    });

    // Check if session has expired
    const expiresAt = payload.expiresAt as string;
    if (new Date(expiresAt) < new Date()) {
      console.log('Session has expired');
      return null;
    }

    return payload as SessionPayload;
  } catch (error) {
    console.log('Failed to verify session', error);
    return null;
  }
}

export async function deleteSession() {
  const cookieStore = await cookies();
  cookieStore.delete('session');
}

export async function encrypt(payload: SessionPayload) {
  return new SignJWT({ ...payload, expiresAt: payload.expiresAt.toISOString() })
    .setProtectedHeader({ alg: 'HS256' })
    .setIssuedAt()
    .setExpirationTime('7d')
    .sign(secret);
}

export async function updateSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  const payload = await decrypt(session);

  if (!session || !payload) {
    return null;
  }

  const expires = new Date(Date.now() + SESSION_DURATION);
  const newSession = await encrypt({ ...payload, expiresAt: expires });

  cookieStore.set('session', newSession, {
    expires: expires,
    httpOnly: true,
    path: '/',
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
  });

  return newSession;
}

export async function getSession() {
  const cookieStore = await cookies();
  const session = cookieStore.get('session')?.value;
  return decrypt(session);
}
