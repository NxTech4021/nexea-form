import { z } from 'zod';

export const SigninFormSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }).trim(),
  password: z.string().trim(),
});

export const BeginSchema = z.object({
  email: z.string().email({ message: 'Please enter a valid email' }).trim(),
});

export type FormState = {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
  success?: boolean;
} | undefined;

export type SessionPayload = {
  expiresAt: Date;
  userId: string;
};
