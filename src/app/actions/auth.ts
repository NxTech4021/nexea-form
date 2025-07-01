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
        error: 'Error boh',
      },
      { status: 400 }
    );
  }
}

export async function logout() {
  await deleteSession();
  redirect('/auth/login');
}

export async function signin(state: FormState, formData: FormData) {
  const email = formData.get('email');
  const password = formData.get('password');

  if (!email)
    return {
      errors: { email: 'Not found' },
    };

  if (!password)
    return {
      errors: { password: 'Not found' },
    };

  const validatedFields = SigninFormSchema.safeParse({
    email: email,
    password: password,
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    };
  }

  const user = await prisma.user.findFirst({
    where: {
      email: email.toString(),
    },
  });

  if (user?.password !== password)
    return {
      message: 'Password is incorrect',
    };

  if (!user)
    return {
      message: 'Please register first',
    };

  await createSession(user.id);

  redirect('/dashboard');
}
