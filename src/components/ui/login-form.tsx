'use client';

import { LoaderIcon } from 'lucide-react';
import { useActionState, useEffect } from 'react';
import { toast } from 'sonner';

import { signin } from '@/app/actions/auth';
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

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const [state, action, pending] = useActionState(signin, undefined);

  useEffect(() => {
    if (state?.message) {
      toast.error(state.message);
    }
  }, [state]);

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
                  <a
                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline'
                    href='#'
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
                    ? state?.errors?.password?.map((item, index) => (
                        <li key={index}>
                          <small className='text-xs leading-none font-medium text-red-500'>
                            {item}
                          </small>
                        </li>
                      ))
                    : state?.errors?.password}
                </ul>
              </div>

              <div className='flex flex-col gap-3'>
                <Button className='w-full' disabled={pending} type='submit'>
                  {pending ? <LoaderIcon className='animate-spin' /> : 'Login'}
                </Button>
                {/* <Button className='w-full' variant='outline'>
                  Login with Google
                </Button> */}
              </div>
            </div>
            {/* <div className='mt-4 text-center text-sm'>
              Don&apos;t have an account?{' '}
              <a className='underline underline-offset-4' href='#'>
                Sign up
              </a>
            </div> */}
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
