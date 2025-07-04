'use client';

import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import { register, RegisterFormState } from '@/app/actions/auth';
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

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const [state, action, pending] = useActionState(
    async (prevState: RegisterFormState | undefined, formData: FormData) => {
      // Call the register action
      const result = await register(prevState, formData);

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
            confirmPassword: Array.isArray(result.errors.confirmPassword)
              ? result.errors.confirmPassword
              : result.errors.confirmPassword
              ? [result.errors.confirmPassword]
              : undefined,
          },
        };
      }
      return result;
    },
    undefined
  );

  useEffect(() => {
    if (state?.message) {
      toast.error(state.message);
    }

    if (state?.success) {
      toast.success('Registration successful! Please login.');
      router.push('/auth/login');
    }
  }, [state, router]);

  return (
    <div className={cn('flex flex-col gap-6', className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Create an account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
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
                {state?.errors?.email && (
                  <ul className='ml-5 list-disc text-red-500'>
                    {state.errors.email.map((error: string, index: number) => (
                      <li key={index}>
                        <small className='text-xs leading-none font-medium'>
                          {error}
                        </small>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='password'>Password</Label>
                <Input
                  className={state?.errors?.password ? 'border-red-500' : ''}
                  id='password'
                  name='password'
                  required
                  type='password'
                />
                {state?.errors?.password && (
                  <ul className='ml-5 list-disc text-red-500'>
                    {state.errors.password.map((error: string, index: number) => (
                      <li key={index}>
                        <small className='text-xs leading-none font-medium'>
                          {error}
                        </small>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className='grid gap-3'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                  className={state?.errors?.confirmPassword ? 'border-red-500' : ''}
                  id='confirmPassword'
                  name='confirmPassword'
                  required
                  type='password'
                />
                {state?.errors?.confirmPassword && (
                  <ul className='ml-5 list-disc text-red-500'>
                    {state.errors.confirmPassword.map((error: string, index: number) => (
                      <li key={index}>
                        <small className='text-xs leading-none font-medium'>
                          {error}
                        </small>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className='flex flex-col gap-3'>
                <Button className='w-full' disabled={pending} type='submit'>
                  {pending ? <LoaderIcon className='animate-spin' /> : 'Register'}
                </Button>
                <div className='text-center text-sm'>
                  Already have an account?{' '}
                  <a
                    className='text-primary hover:underline'
                    href='/auth/login'
                  >
                    Login here
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