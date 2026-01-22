import { NextRequest, NextResponse } from 'next/server';
import { SignJWT } from 'jose';
import { z } from 'zod';

import { resend } from '@/config/resend';
import { prisma } from '@/lib/prisma';

const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .regex(/^[\w.-]+@nexea\.co$/, {
      message: 'Email must be a nexea.co address',
    }),
});

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-key',
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const validatedFields = ForgotPasswordSchema.safeParse({
      email: formData.get('email'),
    });

    if (!validatedFields.success) {
      return NextResponse.json({
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Please check the form for errors.',
      }, { status: 400 });
    }

    const { email } = validatedFields.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        message: 'If an account with that email exists, we sent a reset link.',
        success: true,
      });
    }

    const resetToken = await new SignJWT({
      email: user.email,
      type: 'password-reset',
      userId: user.id,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secret);

    await prisma.user.update({
      data: { token: resetToken },
      where: { email },
    });

    await sendPasswordResetEmail({ email, token: resetToken });

    return NextResponse.json({
      message: 'Password reset email sent!',
      success: true,
    });
  } catch (error) {
    console.error('Error in forgot password API:', error);
    return NextResponse.json({
      message: 'An error occurred. Please try again.',
    }, { status: 500 });
  }
}

async function sendPasswordResetEmail({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  const BASE_URL = process.env.BASE_URL!;
  const resetLink = `${BASE_URL}/auth/reset-password?token=${token}`;

  try {
    await resend.emails.send({
      from: 'no-reply <no-reply@eba.nexea.co>',
      to: email,
      subject: 'Reset Your Password - Nexea EBA',
      html: `
        <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
          <h1>Reset Your Password</h1>
          <p>You requested to reset your password for your Nexea EBA account.</p>
          <p><a href="${resetLink}" style="background-color: #007bff; color: white; padding: 10px 20px; text-decoration: none; border-radius: 5px;">Reset Password</a></p>
          <p>This link will expire in 1 hour.</p>
          <p>If you didn't request a password reset, please ignore this email.</p>
          <p>Thanks,<br>The Nexea Team</p>
        </div>
      `,
    });
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}