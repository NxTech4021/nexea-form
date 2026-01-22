'use client';

import { LoaderIcon } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

import { forgotPasswordRequest } from '@/lib/auth-client';
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

export function SimpleForgotPasswordForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string[]>>({});
  const [emailSent, setEmailSent] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrors({});

    const formData = new FormData(event.currentTarget);
    const email = formData.get('email') as string;

    try {
      const result = await forgotPasswordRequest(email);
      
      if (result.success) {
        setEmailSent(true);
        toast.success('Password reset email sent!');
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

  if (emailSent) {
    return (
      <div className={cn('flex flex-col gap-6', className)} {...props}>
        <Card>
          <CardHeader>
            <CardTitle>Check your email</CardTitle>
            <CardDescription>
              We've sent a password reset link to your email address.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='flex flex-col gap-4'>
              <p className='text-sm text-muted-foreground'>
                If you don't see the email in your inbox, please check your spam folder.
              </p>
              <Button
                variant='outline'
                onClick={() => setEmailSent(false)}
                className='w-full'
              >
                Send another email
              </Button>
              <Button
                variant='ghost'
                onClick={() => router.push('/auth/login')}
                className='w-full'
              >
                Back to login
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
          <CardTitle>Forgot your password?</CardTitle>
          <CardDescription>
            Enter your email address and we'll send you a link to reset your password.
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

              <div className='flex flex-col gap-3'>
                <Button className='w-full' disabled={isLoading} type='submit'>
                  {isLoading ? <LoaderIcon className='animate-spin' /> : 'Send reset link'}
                </Button>
                <Button
                  variant='ghost'
                  onClick={() => router.push('/auth/login')}
                  className='w-full'
                  type='button'
                >
                  Back to login
                </Button>
              </div>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}