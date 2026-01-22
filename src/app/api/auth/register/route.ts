import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
import { z } from 'zod';

import { prisma } from '@/lib/prisma';
import { sendEmailVerification } from '@/lib/sendMail';

const passwordRegex = {
  hasLowerCase: /[a-z]/,
  hasNumber: /[0-9]/,
  hasSpecialChar: /[!@#$%^&*(),.?":{}|<>]/,
  hasUpperCase: /[A-Z]/,
  minLength: 8,
};

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
      .min(passwordRegex.minLength, `Password must be at least ${passwordRegex.minLength} characters`)
      .refine((password) => passwordRegex.hasUpperCase.test(password), 'Password must contain at least one uppercase letter')
      .refine((password) => passwordRegex.hasLowerCase.test(password), 'Password must contain at least one lowercase letter')
      .refine((password) => passwordRegex.hasNumber.test(password), 'Password must contain at least one number')
      .refine((password) => passwordRegex.hasSpecialChar.test(password), 'Password must contain at least one special character'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

const secret = new TextEncoder().encode(
  process.env.JWT_SECRET || 'super-secret-key',
);

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    
    const validatedFields = RegisterFormSchema.safeParse({
      confirmPassword: formData.get('confirmPassword'),
      email: formData.get('email'),
      password: formData.get('password'),
    });

    if (!validatedFields.success) {
      return NextResponse.json({
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Please check the form for errors.',
      }, { status: 400 });
    }

    const { email, password } = validatedFields.data;

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json({
        message: 'User with this email already exists',
      }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const data = await prisma.user.create({
      data: {
        email,
        passwordHash: hashedPassword,
        status: 'pending',
      },
    });

    const token = await new SignJWT({ email: data.email })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secret);

    await sendEmailVerification({ email, token });

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error('Error in register API:', error);
    return NextResponse.json({
      message: 'Database Error: Failed to create account.',
    }, { status: 500 });
  }
}