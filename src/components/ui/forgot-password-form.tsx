'use client';

import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
import { toast } from 'sonner';

import { forgotPassword } from '@/app/actions';
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

interface ForgotPasswordState {
  errors?: {
    email?: string[];
  };
  message?: string;
  success?: boolean;
}

export function ForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const [emailSent, setEmailSent] = useState(false);

  const [state, action, pending] = useActionState(
    async (prevState: ForgotPasswordState | undefined, formData: FormData) => {
      const result = await forgotPassword(prevState, formData);

      // Convert errors to string[] if needed
      if (result?.errors) {
        return {
          ...result,
          errors: {
            email: Array.isArray(result.errors.email)
              ? result.errors.email
              : result.errors.email
                ? [result.errors.email]
                : undefined,
          },
        };
      }
      return result;
    },
    undefined,
  );

  useEffect(() => {
    if (state?.message && !state?.success) {
      toast.error(state.message);
    }

    if (state?.success) {
      setEmailSent(true);
      toast.success('Password reset email sent! Check your inbox.');
    }
  }, [state, router]);

  if (emailSent) {
    return (
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Check your email</CardTitle>
            <CardDescription>
              We&apos;ve sent a password reset link to your email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-6'>
              <div className='text-center space-y-4'>
                <div className='p-4 bg-green-50 border border-green-200 rounded-lg'>
                  <p className='text-sm text-green-800'>
                    If you don&apos;t see the email in a few minutes, check your
                    spam folder.
                  </p>
                </div>

                <Button
                  className='w-full'
                  onClick={() => setEmailSent(false)}
                  variant='outline'
                >
                  Send another email
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
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email address and we&apos;ll send you a link to reset
            your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  className={state?.errors?.email && 'border-red-500'}
                  id='email'
                  name='email'
                  placeholder='m@example.com'
                  required
                  type='email'
                />
                <ul className='ml-5 list-disc text-red-500'>
                  {state?.errors?.email &&
                  typeof state?.errors?.email === 'object'
                    ? state?.errors?.email?.map(
                        (item: string, index: number) => (
                          <li key={index}>
                            <small className='text-xs leading-none font-medium text-red-500'>
                              {item}
                            </small>
                          </li>
                        ),
                      )
                    : state?.errors?.email}
                </ul>
              </div>

              <div className='flex flex-col gap-3'>
                <Button className='w-full' disabled={pending} type='submit'>
                  {pending ? (
                    <LoaderIcon className='animate-spin' />
                  ) : (
                    'Send reset email'
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
    </div>
  );
}
