'use server';

import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export async function verifyToken(token: string) {
  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };

    // Check if the email exists in allowlist
    const allowlist = await prisma.allowlist.findUnique({
      where: { email: decoded.email },
    });

    if (!allowlist) {
      return { error: 'Invalid token' };
    }

    // Create a new response record
    const response = await prisma.response.create({
      data: {
        allowlistId: allowlist.id,
        submittedAt: new Date(),
        userId: null, // Since we're not requiring user authentication
      },
    });

    (await cookies()).set('assessment_token', token, {
      httpOnly: true,
      maxAge: 60 * 60,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    (await cookies()).set('response_id', response.id.toString(), {
      httpOnly: true,
      maxAge: 60 * 60,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    return { responseId: response.id, success: true };
  } catch (error) {
    console.error('Token verification error:', error);
    return { error: 'Invalid or expired token' };
  }
}
