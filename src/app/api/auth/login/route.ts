import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { z } from 'zod';

import { SigninFormSchema } from '@/lib/definitions';
import { prisma } from '@/lib/prisma';
import { createSession } from '@/lib/session';

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const validatedFields = SigninFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return NextResponse.json({
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Sign In.',
      }, { status: 400 });
    }

    const { email, password } = validatedFields.data;

    const user = await prisma.user.findUnique({
      select: { email: true, id: true, passwordHash: true, status: true },
      where: { email },
    });

    if (!user) {
      return NextResponse.json({
        message: 'User not found',
      }, { status: 401 });
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid && password !== user.passwordHash) {
      return NextResponse.json({
        message: 'Invalid credentials',
      }, { status: 401 });
    }

    if (user.status !== 'active') {
      return NextResponse.json({
        message: 'Please verify your email first',
      }, { status: 401 });
    }

    await createSession(user.id.toString());

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Error in login API:', error);
    return NextResponse.json({
      message: 'Database Error: Failed to Sign In.',
    }, { status: 500 });
  }
}