'use client';

import { CheckCircle, CheckCircle2, LoaderIcon, XCircle } from 'lucide-react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { stableResetPassword, ResetPasswordState } from '@/app/actions/stable-auth';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';

// ADDED: Password requirements for dynamic validation (matching register form)
const passwordRequirements = {
  hasLowerCase: { regex: /[a-z]/, text: 'One lowercase letter' },
  hasNumber: { regex: /[0-9]/, text: 'One number' },
  hasSpecialChar: {
    regex: /[!@#$%^&*(),.?":{}|<>]/,
    text: 'One special character (!@#$%^&*(),.?":{}|<>)',
  },
  hasUpperCase: { regex: /[A-Z]/, text: 'One uppercase letter' },
  minLength: { regex: /.{8,}/, text: 'At least 8 characters' },
};

interface ResetPasswordState {
  errors?: {
    password?: string[];
    confirmPassword?: string[];
    token?: string[];
  };
  message?: string;
  success?: boolean;
}

export function ResetPasswordForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token');
  const [resetComplete, setResetComplete] = useState(false);
  
  // ADDED: State for dynamic password validation (matching register form)
  const [password, setPassword] = useState('');
  const [validations, setValidations] = useState({
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasUpperCase: false,
    minLength: false,
  });

  const [state, action, pending] = useActionState(
    async (prevState: ResetPasswordState | undefined, formData: FormData) => {
      // Add token to form data
      formData.append('token', token || '');
      
      const result = await stableResetPassword(prevState, formData);
      
      // Convert errors to string[] if needed
      if (result?.errors) {
        return {
          ...result,
          errors: {
            password: Array.isArray(result.errors.password)
              ? result.errors.password
              : result.errors.password
              ? [result.errors.password]
              : undefined,
            confirmPassword: Array.isArray(result.errors.confirmPassword)
              ? result.errors.confirmPassword
              : result.errors.confirmPassword
              ? [result.errors.confirmPassword]
              : undefined,
            token: Array.isArray(result.errors.token)
              ? result.errors.token
              : result.errors.token
              ? [result.errors.token]
              : undefined,
          },
        };
      }
      return result;
    },
    undefined
  );

  useEffect(() => {
    if (!token) {
      toast.error('Invalid reset link');
      router.push('/auth/forgot-password');
      return;
    }
  }, [token, router]);

  // ADDED: Update validations when password changes (matching register form)
  useEffect(() => {
    setValidations({
      hasLowerCase: passwordRequirements.hasLowerCase.regex.test(password),
      hasNumber: passwordRequirements.hasNumber.regex.test(password),
      hasSpecialChar: passwordRequirements.hasSpecialChar.regex.test(password),
      hasUpperCase: passwordRequirements.hasUpperCase.regex.test(password),
      minLength: passwordRequirements.minLength.regex.test(password),
    });
  }, [password]);

  useEffect(() => {
    if (state?.message && !state?.success) {
      toast.error(state.message);
    }

    if (state?.success) {
      setResetComplete(true);
      toast.success('Password reset successful!');
    }
  }, [state]);

  // Show success message after password reset
  if (resetComplete) {
    return (
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center gap-2'>
              <CheckCircle className='h-5 w-5 text-green-600' />
              Password Reset Successful
            </CardTitle>
            <CardDescription>
              Your password has been successfully updated.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-4'>
              <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
                <p className='text-sm text-green-800'>
                  You can now use your new password to log into your account.
                </p>
              </div>
              
              <Button 
                className='w-full'
                onClick={() => router.push('/auth/login')}
              >
                Go to Login
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Reset your password</CardTitle>
          <CardDescription>
            Enter your new password below to reset your account password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='password'>New Password</Label>
                <Input
                  id='password'
                  name='password'
                  required
                  type='password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className={state?.errors?.password ? 'border-red-500' : ''}
                />
                {/* REPLACED: Static error with dynamic validation (matching register form) */}
                <div className='text-sm space-y-2'>
                  <p className='text-muted-foreground'>
                    Password requirements:
                  </p>
                  <ul className='ml-1 space-y-1'>
                    {Object.entries(passwordRequirements).map(
                      ([key, { text }]) => (
                        <li className='flex items-center gap-2' key={key}>
                          {validations[key as keyof typeof validations] ? (
                            <CheckCircle2 className='h-4 w-4 text-green-500' />
                          ) : (
                            <XCircle className='h-4 w-4 text-red-500' />
                          )}
                          <span
                            className={cn(
                              'text-sm',
                              validations[key as keyof typeof validations]
                                ? 'text-green-600'
                                : 'text-red-600'
                            )}
                          >
                            {text}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='confirmPassword'>Confirm New Password</Label>
                <Input
                  id='confirmPassword'
                  name='confirmPassword'
                  required
                  type='password'
                  className={state?.errors?.confirmPassword && 'border-red-500'}
                />
                {/* FIXED: Error handling pattern matching register form */}
                {state?.errors?.confirmPassword && (
                  <ul className='ml-5 list-disc text-red-500'>
                    {state.errors.confirmPassword.map(
                      (error: string, index: number) => (
                        <li key={index}>
                          <small className='text-xs leading-none font-medium'>
                            {error}
                          </small>
                        </li>
                      )
                    )}
                  </ul>
                )}
              </div>

              {/* Token errors */}
              {state?.errors?.token && (
                <div className='p-3 bg-red-50 border border-red-200 rounded-lg'>
                  <ul className='list-disc ml-5 text-red-600'>
                    {state.errors.token.map((error: string, index: number) => (
                      <li key={index}>
                        <small className='text-xs font-medium'>{error}</small>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              <div className='flex flex-col gap-3'>
                <Button className='w-full' disabled={pending} type='submit'>
                  {pending ? (
                    <LoaderIcon className='animate-spin' />
                  ) : (
                    'Reset Password'
                  )}
                </Button>
                
                <div className='text-center text-sm'>
                  Remember your password?{' '}
                  <a
                    className='text-primary hover:underline'
                    href='/auth/login'
                  >
                    Back to login
                  </a>
                </div>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>

      {/* Password requirements info */}
      {/* <Card>
        <CardContent className='pt-6'>
          <div className='space-y-2'>
            <h4 className='text-sm font-medium'>Password requirements:</h4>
            <ul className='text-xs text-muted-foreground space-y-1'>
              <li>• At least 8 characters long</li>
              <li>• Contains at least one uppercase letter</li>
              <li>• Contains at least one lowercase letter</li>
              <li>• Contains at least one number</li>
              <li>• Contains at least one special character (!@#$%^&*(),.?":{}|&lt;&gt;)</li>
            </ul>
          </div>
        </CardContent>
      </Card> */}
    </div>
  );
}