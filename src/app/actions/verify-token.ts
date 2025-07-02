'use server';

import { PrismaClient } from '@prisma/client';
import jwt from 'jsonwebtoken';

const prisma = new PrismaClient();
const JWT_SECRET = process.env.JWT_SECRET!;

export async function verifyToken(token: string) {
  try {
    // Verify and decode the token
    const decoded = jwt.verify(token, JWT_SECRET) as { email: string };

    // Check if the email exists in allowlist and has credits
    const allowlist = await prisma.allowlist.findUnique({
      where: { email: decoded.email },
    });

    if (!allowlist) {
      return { error: 'Invalid token' };
    }

    if (allowlist.credits <= 0) {
      return { error: 'No assessment credits remaining' };
    }

    // Create a new response record
    const response = await prisma.response.create({
      data: {
        userId: null, // Since we're not requiring user authentication
        submittedAt: new Date(),
      },
    });

    // Decrement the credits
    await prisma.allowlist.update({
      where: { email: decoded.email },
      data: { credits: allowlist.credits - 1 },
    });

    return { success: true, responseId: response.id };
  } catch (error) {
    console.error('Token verification error:', error);
    return { error: 'Invalid or expired token' };
  }
} 