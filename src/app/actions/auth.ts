'use server';

import bcrypt from 'bcryptjs';
import { SignJWT } from 'jose';
// ADDED: Import jwtVerify for password reset token validation
import { jwtVerify } from 'jose';
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
  process.env.JWT_SECRET || 'super-secret-key',
);

// ADDED: Schema for forgot password validation
const ForgotPasswordSchema = z.object({
  email: z
    .string()
    .email('Invalid email format')
    // COMMENTED: Original nexea.co validation
    .regex(/^[\w.-]+@nexea\.co$/, {
      message: 'Email must be a nexea.co address',
    }),
  // TEMPORARY: Allow m.nexea.co for now
  // .regex(/^[\w.-]+@m\.nexea\.co$/, {
  //   message: 'Email must be a m.nexea.co address',
  // }),
});

// ADDED: Schema for reset password validation
const ResetPasswordSchema = z
  .object({
    confirmPassword: z.string(),
    password: z
      .string()
      .min(
        passwordRegex.minLength,
        `Password must be at least ${passwordRegex.minLength} characters`,
      )
      .refine(
        (password) => passwordRegex.hasUpperCase.test(password),
        'Password must contain at least one uppercase letter',
      )
      .refine(
        (password) => passwordRegex.hasLowerCase.test(password),
        'Password must contain at least one lowercase letter',
      )
      .refine(
        (password) => passwordRegex.hasNumber.test(password),
        'Password must contain at least one number',
      )
      .refine(
        (password) => passwordRegex.hasSpecialChar.test(password),
        'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)',
      ),
    token: z.string().min(1, 'Reset token is required'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

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
        `Password must be at least ${passwordRegex.minLength} characters`,
      )
      .refine(
        (password) => passwordRegex.hasUpperCase.test(password),
        'Password must contain at least one uppercase letter',
      )
      .refine(
        (password) => passwordRegex.hasLowerCase.test(password),
        'Password must contain at least one lowercase letter',
      )
      .refine(
        (password) => passwordRegex.hasNumber.test(password),
        'Password must contain at least one number',
      )
      .refine(
        (password) => passwordRegex.hasSpecialChar.test(password),
        'Password must contain at least one special character (!@#$%^&*(),.?":{}|<>)',
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// ADDED: Type definitions for forgot password feature
export type ForgotPasswordState = {
  errors?: {
    email?: string[];
  };
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
      { status: 400 },
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

// ADDED: Forgot password functionality
export async function forgotPassword(
  prevState: ForgotPasswordState | undefined,
  formData: FormData,
): Promise<ForgotPasswordState> {
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

    // Check if user exists
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // For security, always return success even if user doesn't exist
    // This prevents email enumeration attacks
    if (!user) {
      return {
        message: 'If an account with that email exists, we sent a reset link.',
        success: true,
      };
    }

    // Generate reset token (valid for 1 hour)
    const resetToken = await new SignJWT({
      email: user.email,
      type: 'password-reset',
      userId: user.id,
    })
      .setProtectedHeader({ alg: 'HS256' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(secret);

    // Store token in database
    await prisma.user.update({
      data: { token: resetToken },
      where: { email },
    });

    // Send reset email
    await sendPasswordResetEmail({ email, token: resetToken });

    return {
      message: 'Password reset email sent!',
      success: true,
    };
  } catch (error) {
    console.error('Error in forgotPassword:', error);
    return {
      message: 'An error occurred. Please try again.',
    };
  }
}

export async function register(
  prevState: RegisterFormState | undefined,
  formData: FormData,
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

// ADDED: Reset password functionality
export async function resetPassword(
  prevState: ResetPasswordState | undefined,
  formData: FormData,
): Promise<ResetPasswordState> {
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

    // Verify the token
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

    // Verify token type
    if (payload.type !== 'password-reset') {
      return {
        errors: { token: ['Invalid token type'] },
        message: 'Invalid reset token.',
      };
    }

    // Find user and verify token matches stored token
    const user = await prisma.user.findUnique({
      where: {
        email: payload.email as string,
        token: token, // Ensure the token matches what's stored
      },
    });

    if (!user) {
      return {
        errors: { token: ['Invalid or expired reset token'] },
        message: 'The reset link has expired or is invalid.',
      };
    }

    // Hash the new password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Update password and clear the token
    await prisma.user.update({
      data: {
        passwordHash: hashedPassword,
        token: null, // Clear the reset token
      },
      where: { id: user.id },
    });

    return {
      message: 'Password reset successful!',
      success: true,
    };
  } catch (error) {
    console.error('Error in resetPassword:', error);
    return {
      message: 'An error occurred. Please try again.',
    };
  }
}

export async function signOut(prevState: any): Promise<{ success: boolean }> {
  await deleteSession();
  await new Promise((resolve) => setTimeout(resolve, 2000)); // 2 seconds
  return { success: true };
}

// ADDED: Email sending function for password reset
async function sendPasswordResetEmail({
  email,
  token,
}: {
  email: string;
  token: string;
}) {
  // FIXED: Use proper nodemailer import and method name (matching existing sendMail.ts)
  const nodemailer = require('nodemailer');

  const EMAIL_FROM = process.env.EMAIL_FROM!;
  const EMAIL_USER = process.env.EMAIL_USER!;
  const EMAIL_PASS = process.env.EMAIL_PASS!;
  const BASE_URL = process.env.BASE_URL!;

  const transporter = nodemailer.createTransport({
    auth: {
      pass: EMAIL_PASS,
      user: EMAIL_USER,
    },
    host: 'smtp.gmail.com',
    port: 587,
    secure: false,
    tls: {
      rejectUnauthorized: false,
    },
  });

  // FIXED: Remove extra http:// prefix since BASE_URL already contains protocol
  const resetLink = `${BASE_URL}/auth/reset-password?token=${token}`;

  const mailOptions = {
    from: '"Nexea" <no-reply@nexea.co>',
    html: `<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
  <title>Reset Your Password</title>
  <style type="text/css" rel="stylesheet" media="all">
    /* Base styles (same as verification email) */
    *:not(br):not(tr):not(html) {
      font-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;
      -webkit-box-sizing: border-box;
      box-sizing: border-box;
    }
    body {
      width: 100% !important;
      height: 100%;
      margin: 0;
      line-height: 1.4;
      background-color: #F5F7F9;
      color: #839197;
      -webkit-text-size-adjust: none;
    }
    a { color: #414EF9; }
    .email-wrapper {
      width: 100%;
      margin: 0;
      padding: 0;
      background-color: #F5F7F9;
    }
    .email-body {
      width: 100%;
      margin: 0;
      padding: 0;
      border-top: 1px solid #E7EAEC;
      border-bottom: 1px solid #E7EAEC;
      background-color: #FFFFFF;
    }
    .email-body_inner {
      width: 570px;
      margin: 0 auto;
      padding: 0;
    }
    .content-cell { padding: 35px; }
    .body-action {
      width: 100%;
      margin: 30px auto;
      padding: 0;
      text-align: center;
    }
    .body-sub {
      margin-top: 25px;
      padding-top: 25px;
      border-top: 1px solid #E7EAEC;
    }
    h1 {
      margin-top: 0;
      color: #292E31;
      font-size: 19px;
      font-weight: bold;
      text-align: left;
    }
    p {
      margin-top: 0;
      color: #839197;
      font-size: 16px;
      line-height: 1.5em;
      text-align: left;
    }
    p.sub { font-size: 12px; }
    .button {
      display: inline-block;
      width: 200px;
      background-color: #414EF9;
      border-radius: 3px;
      color: #ffffff;
      font-size: 15px;
      line-height: 45px;
      text-align: center;
      text-decoration: none;
      -webkit-text-size-adjust: none;
      mso-hide: all;
    }
    @media only screen and (max-width: 600px) {
      .email-body_inner { width: 100% !important; }
    }
    @media only screen and (max-width: 500px) {
      .button { width: 100% !important; }
    }
  </style>
</head>
<body>
  <table class="email-wrapper" width="100%" cellpadding="0" cellspacing="0">
    <tr>
      <td align="center">
        <table class="email-content" width="100%" cellpadding="0" cellspacing="0">
          <tr>
            <td class="email-body" width="100%">
              <table class="email-body_inner" align="center" width="570" cellpadding="0" cellspacing="0">
                <tr>
                  <td class="content-cell">
                    <h1>Reset Your Password</h1>
                    <p>You requested to reset your password for your Nexea EBA account. Click the button below to choose a new password:</p>
                    
                    <table class="body-action" align="center" width="100%" cellpadding="0" cellspacing="0">
                      <tr>
                        <td align="center">
                          <div>
                            <a href="${resetLink}" class="button" style="color:white;">Reset Password</a>
                          </div>
                        </td>
                      </tr>
                    </table>
                    
                    <p><strong>This link will expire in 1 hour.</strong></p>
                    <p>If you didn't request a password reset, please ignore this email or contact support if you have concerns.</p>
                    <p>Thanks,<br>The Nexea Team</p>
                    
                    <table class="body-sub">
                      <tr>
                        <td>
                          <p class="sub">If you're having trouble clicking the button, copy and paste the URL below into your web browser:</p>
                          <p class="sub"><a href="${resetLink}">${resetLink}</a></p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`,
    subject: 'Reset Your Password - Nexea EBA',
    to: email,
  };

  try {
    await transporter.sendMail(mailOptions);
  } catch (error) {
    console.error('Error sending password reset email:', error);
    throw error;
  }
}
