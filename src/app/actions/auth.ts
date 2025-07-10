'use server';

import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { NextResponse } from 'next/server';
import { z } from 'zod';

import { FormState, SigninFormSchema } from '@/lib/definitions';
import { prisma } from '@/lib/prisma';
import { sendEmailVerification } from '@/lib/sendMail';
import { createSession, deleteSession } from '@/lib/session';

// Password validation regex
const passwordRegex = {
  hasLowerCase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
  hasUpperCase: /[A-Z]/,
  minLength: 8,
};

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-key'
);

// Registration schema
const RegisterFormSchema = z
  .object({
    confirmPassword: z.string(),
    email: z
      .string()
      .email('Invalid email format')
      .regex(/^[\w.-]+@nexea\.co$/, {
        message: 'Email must be a nexea.co address',
      }),
    password: z
      .string()
      .min(
        passwordRegex.minLength,
        `Password must be at least ${passwordRegex.minLength} characters`
      )
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
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

export type RegisterFormState = {
  errors?: {
    confirmPassword?: string[];
    email?: string[];
    password?: string[];
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

    const user = await prisma.user.findUnique({
      select: { email: true, id: true, passwordHash: true, status: true },
      where: { email },
    });

    if (!user) {
      // console.log('User not found:', email);
      return {
        message: 'User not found',
      };
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid && password !== user.passwordHash) {
      return { message: 'Invalid credentials' };
    }

    if (user.status !== 'active')
      return { message: 'Please verify your email first' };

    await createSession(user.id.toString());

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

export async function register(
  prevState: RegisterFormState | undefined,
  formData: FormData
): Promise<RegisterFormState> {
  try {
    const validatedFields = RegisterFormSchema.safeParse({
      confirmPassword: formData.get('confirmPassword'),
      email: formData.get('email'),
      password: formData.get('password'),
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

    const hashedPassword = await bcrypt.hash(password, 10);

    // Create new user
    const data = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword, // Note: In a real app, you should hash the password
        status: 'pending',
      },
    });

    const token = await new SignJWT({ email: data.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h') // expires in 1 hour
      .sign(secret);

    await sendEmailVerification({ email, token });

    return { success: true };
  } catch (error) {
    console.error('Error in register:', error);
    return {
      message: 'Database Error: Failed to create account.',
    };
  }
}

export async function signOut(prevState: any): Promise<{ success: boolean }> {
  await deleteSession();
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds
  return { success: true };
}
