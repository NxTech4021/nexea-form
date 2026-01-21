'use server';

import bcrypt from 'bcryptjs';
import { SignJWT, jwtVerify } from 'jose';
import { z } from 'zod';
import { redirect } from 'next/navigation';

import { resend } from '@/config/resend';
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
  process.env.JWT_SECRET || 'super-secret-key',
);

// Schemas
const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    .regex(/^[\w.-]+@nexea\.co$/, {
      message: 'Email must be a nexea.co address',
    }),
});

const ResetPasswordSchema = z
  .object({
    confirmPassword: z.string(),
    password: z
      .string()
      .min(passwordRegex.minLength, `Password must be at least ${passwordRegex.minLength} characters`)
      .refine((password) => passwordRegex.hasUpperCase.test(password), 'Password must contain at least one uppercase letter')
      .refine((password) => passwordRegex.hasLowerCase.test(password), 'Password must contain at least one lowercase letter')
      .refine((password) => passwordRegex.hasNumber.test(password), 'Password must contain at least one number')
      .refine((password) => passwordRegex.hasSpecialChar.test(password), 'Password must contain at least one special character'),
    token: z.string().min(1, 'Reset token is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

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

// Types
export type ForgotPasswordState = {
  errors?: { email?: string[] };
  message?: string;
  success?: boolean;
};

export type RegisterFormState = {
  errors?: {
    confirmPassword?: string[];
    email?: string[];
    password?: string[];
  };
  message?: string;
  success?: boolean;
};

export type ResetPasswordState = {
  errors?: {
    confirmPassword?: string[];
    password?: string[];
    token?: string[];
  };
  message?: string;
  success?: boolean;
};

// Stable server actions with explicit function names
export async function stableAuthenticate(
  prevState: FormState,
  formData: FormData,
): Promise<FormState> {
  'use server';
  
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
      return { message: 'User not found' };
    }

    const isValid = await bcrypt.compare(password, user.passwordHash);

    if (!isValid && password !== user.passwordHash) {
      return { message: 'Invalid credentials' };
    }

    if (user.status !== 'active') {
      return { message: 'Please verify your email first' };
    }

    await createSession(user.id.toString());
    return { success: true };
  } catch (error) {
    console.error('Error in authenticate:', error);
    return { message: 'Database Error: Failed to Sign In.' };
  }
}

export async function stableForgotPassword(
  prevState: ForgotPasswordState | undefined,
  formData: FormData,
): Promise<ForgotPasswordState> {
  'use server';
  
  try {
    const validatedFields = ForgotPasswordSchema.safeParse({
      email: formData.get('email'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Please check the form for errors.',
      };
    }

    const { email } = validatedFields.data;

    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return {
        message: 'If an account with that email exists, we sent a reset link.',
        success: true,
      };
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

    return {
      message: 'Password reset email sent!',
      success: true,
    };
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    return { message: 'An error occurred. Please try again.' };
  }
}

export async function stableRegister(
  prevState: RegisterFormState | undefined,
  formData: FormData,
): Promise<RegisterFormState> {
  'use server';
  
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

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return { message: 'User with this email already exists' };
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

    return { success: true };
  } catch (error) {
    console.error('Error in register:', error);
    return { message: 'Database Error: Failed to create account.' };
  }
}

export async function stableResetPassword(
  prevState: ResetPasswordState | undefined,
  formData: FormData,
): Promise<ResetPasswordState> {
  'use server';
  
  try {
    const validatedFields = ResetPasswordSchema.safeParse({
      confirmPassword: formData.get('confirmPassword'),
      password: formData.get('password'),
      token: formData.get('token'),
    });

    if (!validatedFields.success) {
      return {
        errors: validatedFields.error.flatten().fieldErrors,
        message: 'Please check the form for errors.',
      };
    }

    const { password, token } = validatedFields.data;

    let payload;
    try {
      const { payload: tokenPayload } = await jwtVerify(token, secret);
      payload = tokenPayload;
    } catch (error) {
      return {
        errors: { token: ['Invalid or expired reset token'] },
        message: 'The reset link has expired or is invalid.',
      };
    }

    if (payload.type !== 'password-reset') {
      return {
        errors: { token: ['Invalid token type'] },
        message: 'Invalid reset token.',
      };
    }

    const user = await prisma.user.findUnique({
      where: {
        email: payload.email as string,
        token: token,
      },
    });

    if (!user) {
      return {
        errors: { token: ['Invalid or expired reset token'] },
        message: 'The reset link has expired or is invalid.',
      };
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await prisma.user.update({
      data: {
        passwordHash: hashedPassword,
        token: null,
      },
      where: { id: user.id },
    });

    return {
      message: 'Password reset successful!',
      success: true,
    };
  } catch (error) {
    console.error('Error in resetPassword:', error);
    return { message: 'An error occurred. Please try again.' };
  }
}

export async function stableSignOut(): Promise<{ success: boolean }> {
  'use server';
  
  try {
    await deleteSession();
    return { success: true };
  } catch (error) {
    console.error('Error in signOut:', error);
    return { success: false };
  }
}

// Helper function for password reset email
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