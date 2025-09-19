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
    const allowlist = await prisma.allowlist.findFirst({
      select: { credits: true, email: true, id: true },
      where: { email: { equals: decoded.email, mode: 'insensitive' } },
    });

    if (!allowlist) {
      return { error: 'Invalid token' };
    }

    // Find the most recent unsubmitted response for this allowlist
    const response = await prisma.response.findFirst({
      orderBy: { id: 'desc' }, // Get the most recent one
      where: {
        allowlistId: allowlist.id,
        // Only find responses that haven't been submitted yet
        submittedAt: new Date(0),
      },
    });

    // If no unsubmitted response exists, this means the link has already been used
    if (!response) {
      return {
        error:
          'This assessment link has already been used. Please request a new assessment link from the homepage.',
      };
    }

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
