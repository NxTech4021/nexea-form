'use client';

import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import { authenticate } from '@/app/actions';
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

interface SignInState {
  errors?: {
    email?: string[];
    password?: string[];
  };
  message?: string;
  success?: boolean;
}

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    async (prevState: SignInState | undefined, formData: FormData) => {
      // Call the original signin action
      const result = await authenticate(prevState, formData);

      // console.log(result);

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
            password: Array.isArray(result.errors.password)
              ? result.errors.password
              : result.errors.password
                ? [result.errors.password]
                : undefined,
          },
        };
      }
      return result;
    },
    undefined,
  );

  useEffect(() => {
    if (state?.message) {
      toast.error(state.message);
    }

    if (state?.success) {
      router.push('/admin');
    }
  }, [state, router]);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form action={action}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  placeholder='m@example.com'
                  required
                  type='email'
                />
              </div>
              <div className='grid gap-3'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  {/* UPDATED: Changed from href='#' to functional forgot password link */}
                  <a
                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline cursor-pointer text-primary'
                    href='/auth/forgot-password'
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  className={state?.errors?.password && 'border-red-500'}
                  id='password'
                  name='password'
                  required
                  type='password'
                />
                <ul className='ml-5 list-disc text-red-500'>
                  {state?.errors?.password &&
                  typeof state?.errors?.password === 'object'
                    ? state?.errors?.password?.map(
                        (item: string, index: number) => (
                          <li key={index}>
                            <small className='text-xs leading-none font-medium text-red-500'>
                              {item}
                            </small>
                          </li>
                        ),
                      )
                    : state?.errors?.password}
                </ul>
              </div>

              <div className='flex flex-col gap-3'>
                <Button className='w-full' disabled={pending} type='submit'>
                  {pending ? <LoaderIcon className='animate-spin' /> : 'Login'}
                </Button>
                <div className='text-center text-sm'>
                  Don't have an account?{' '}
                  <a
                    className='text-primary hover:underline'
                    href='/auth/register'
                  >
                    Register here
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
