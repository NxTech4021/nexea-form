'use server';

import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';
import { cookies } from 'next/headers';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export async function stableVerifyToken(token: string) {
  'use server';
  
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
      orderBy: { id: 'desc' },
      where: {
        allowlistId: allowlist.id,
        submittedAt: new Date(0),
      },
    });

    if (!response) {
      return {
        error: 'This assessment link has already been used. Please request a new assessment link from the homepage.',
      };
    }

    const cookieStore = await cookies();
    
    cookieStore.set('assessment_token', token, {
      httpOnly: true,
      maxAge: 60 * 60,
      path: '/',
      sameSite: 'strict',
      secure: process.env.NODE_ENV === 'production',
    });

    cookieStore.set('response_id', response.id.toString(), {
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