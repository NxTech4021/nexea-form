'use server';

import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';

import { FormState, SigninFormSchema } from '@/lib/definitions';
import { prisma } from '@/lib/prisma';
import { createSession, deleteSession } from '@/lib/session';

export async function beginAuth(email: string) {
  try {
    console.log(email);
    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (error) {
    console.error('Error in beginAuth:', error);
    return NextResponse.json(
      {
        error: 'Error occurred during authentication',
      },
      { status: 400 }
    );
  }
}

export async function authenticate(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  try {
    const validatedFields = SigninFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Missing Fields. Failed to Sign In.',
      };
    }

    const { email, password } = validatedFields.data;

    console.log('Attempting to find user:', email);
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, passwordHash: true },
    });

    if (!user) {
      console.log('User not found:', email);
      return {
        message: 'Invalid credentials',
      };
    }

    console.log('User found, checking password');
    if (password !== user.passwordHash) {
      console.log('Password mismatch');
      return {
        message: 'Invalid credentials',
      };
    }

    console.log('Password matched, creating session');
    await createSession(user.id.toString());
    console.log('Session created, redirecting');

    return { success: true };
  } catch (error) {
    console.error('Error in authenticate:', error);
    return {
      message: 'Database Error: Failed to Sign In.',
    };
  }
}

export async function signOut(): Promise<FormState> {
  try {
    await deleteSession();
    redirect('/auth/login');
  } catch (error) {
    console.error('Error in signOut:', error);
    return {
      message: 'Database Error: Failed to Sign Out.',
    };
  }
}
