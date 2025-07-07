'use server';

import { redirect } from 'next/navigation';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { FormState, SigninFormSchema } from '@/lib/definitions';
import { prisma } from '@/lib/prisma';
import { createSession, deleteSession } from '@/lib/session';

// Password validation regex
const passwordRegex = {
  hasUpperCase: /[A-Z]/,
  hasLowerCase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
  minLength: 8,
};

// Registration schema
const RegisterFormSchema = z.object({
  email: z.string().email('Invalid email format'),
  password: z
    .string()
    .min(passwordRegex.minLength, `Password must be at least ${passwordRegex.minLength} characters`)
    .refine(
      (password) => passwordRegex.hasUpperCase.test(password),
      'Password must contain at least one uppercase letter'
    )
    .refine(
      (password) => passwordRegex.hasLowerCase.test(password),
      'Password must contain at least one lowercase letter'
    )
    .refine(
      (password) => passwordRegex.hasNumber.test(password),
      'Password must contain at least one number'
    )
    .refine(
      (password) => passwordRegex.hasSpecialChar.test(password),
      'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)'
    ),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

export type RegisterFormState = {
  errors?: {
    email?: string[];
    password?: string[];
    confirmPassword?: string[];
  };
  message?: string;
  success?: boolean;
};

export async function authenticate(
  prevState: FormState,
  formData: FormData
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
      select: { email: true, id: true, passwordHash: true },
      where: { email },
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

export async function clearLoginSession() {
  try {
    await deleteSession();
    return { success: true };
  } catch (error) {
    console.error('Error clearing session:', error);
    return { success: false };
  }
}

// export async function signOut(): Promise<FormState> {
//   try {
//     await deleteSession();

//     redirect('/auth/login');
//   } catch (error) {
//     console.error('Error in signOut:', error);
//     return {
//       message: 'Database Error: Failed to Sign Out.',
//     };
//   }
// }

export async function signOut(prevState: any): Promise<{ success: boolean }> {
  await deleteSession();
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds
  return { success: true };
}

export async function register(
  prevState: RegisterFormState | undefined,
  formData: FormData
): Promise<RegisterFormState> {
  try {
    const validatedFields = RegisterFormSchema.safeParse({
      email: formData.get('email'),
      password: formData.get('password'),
      confirmPassword: formData.get('confirmPassword'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Please check the form for errors.',
      };
    }

    const { email, password } = validatedFields.data;

    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return {
        message: 'User with this email already exists',
      };
    }

    // Create new user
    await prisma.user.create({
      data: {
        email,
        passwordHash: password, // Note: In a real app, you should hash the password
      },
    });

    return { success: true };
  } catch (error) {
    console.error('Error in register:', error);
    return {
      message: 'Database Error: Failed to create account.',
    };
  }
}
