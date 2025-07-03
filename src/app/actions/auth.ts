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

  try {
    const user = await prisma.user.findUnique({
      where: { email },
      select: { id: true, email: true, passwordHash: true },
    });

    if (!user) {
      return {
        message: 'Invalid credentials',
      };
    }

    // Here you would typically verify the password hash
    // For now, we'll do a simple comparison since it's a demo
    if (password !== user.passwordHash) {
      return {
        message: 'Invalid credentials',
      };
    }

    // Create a session
    await createSession(user.id.toString());

    redirect('/admin');
  } catch (error) {
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
    return {
      message: 'Database Error: Failed to Sign Out.',
    };
  }
}
