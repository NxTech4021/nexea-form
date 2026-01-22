'use client';

import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { loginUser } from '@/lib/auth-client';
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

export function SimpleLoginForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const result = await loginUser(email, password);
      
      if (result.success) {
        toast.success('Login successful!');
        router.push('/admin');
      } else {
        if (result.errors) {
          setErrors(result.errors);
        }
        if (result.message) {
          toast.error(result.message);
        }
      }
    } catch (error) {
      toast.error('An unexpected error occurred');
    } finally {
      setIsLoading(false);
    }
  };

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
          <form onSubmit={handleSubmit}>
            <div className='flex flex-col gap-6'>
              <div className='grid gap-3'>
                <Label htmlFor='email'>Email</Label>
                <Input
                  id='email'
                  name='email'
                  placeholder='m@nexea.co'
                  required
                  type='email'
                  className={errors.email ? 'border-red-500' : ''}
                />
                {errors.email && (
                  <ul className='ml-5 list-disc text-red-500'>
                    {errors.email.map((error, index) => (
                      <li key={index}>
                        <small className='text-xs leading-none font-medium text-red-500'>
                          {error}
                        </small>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              
              <div className='grid gap-3'>
                <div className='flex items-center'>
                  <Label htmlFor='password'>Password</Label>
                  <a
                    className='ml-auto inline-block text-sm underline-offset-4 hover:underline cursor-pointer text-primary'
                    href='/auth/forgot-password'
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id='password'
                  name='password'
                  required
                  type='password'
                  className={errors.password ? 'border-red-500' : ''}
                />
                {errors.password && (
                  <ul className='ml-5 list-disc text-red-500'>
                    {errors.password.map((error, index) => (
                      <li key={index}>
                        <small className='text-xs leading-none font-medium text-red-500'>
                          {error}
                        </small>
                      </li>
                    ))}
                  </ul>
                )}
              </div>

              <div className='flex flex-col gap-3'>
                <Button className='w-full' disabled={isLoading} type='submit'>
                  {isLoading ? <LoaderIcon className='animate-spin' /> : 'Login'}
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