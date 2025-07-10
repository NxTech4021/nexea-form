'use client';

import { CheckCircle2, LoaderIcon, XCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useState } from 'react';
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

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<'div'>) {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [validations, setValidations] = useState({
    hasLowerCase: false,
    hasNumber: false,
    hasSpecialChar: false,
    hasUpperCase: false,
    minLength: false,
  });

  const [state, action, pending] = useActionState(
    async (prevState: RegisterFormState | undefined, formData: FormData) => {
      const result = await register(prevState, formData);
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

  // Update validations when password changes
  useEffect(() => {
    setValidations({
      hasLowerCase: passwordRequirements.hasLowerCase.regex.test(password),
      hasNumber: passwordRequirements.hasNumber.regex.test(password),
      hasSpecialChar: passwordRequirements.hasSpecialChar.regex.test(password),
      hasUpperCase: passwordRequirements.hasUpperCase.regex.test(password),
      minLength: passwordRequirements.minLength.regex.test(password),
    });
  }, [password]);

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
                  placeholder='m@nexea.co'
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
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  type='password'
                  value={password}
                />
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
                                : 'text-muted-foreground'
                            )}
                          >
                            {text}
                          </span>
                        </li>
                      )
                    )}
                  </ul>
                </div>
                {state?.errors?.password && (
                  <ul className='ml-5 list-disc text-red-500'>
                    {state.errors.password.map(
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

              <div className='grid gap-3'>
                <Label htmlFor='confirmPassword'>Confirm Password</Label>
                <Input
                  className={
                    state?.errors?.confirmPassword ? 'border-red-500' : ''
                  }
                  id='confirmPassword'
                  name='confirmPassword'
                  required
                  type='password'
                />
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

              <div className='flex flex-col gap-3'>
                <Button className='w-full' disabled={pending} type='submit'>
                  {pending ? (
                    <LoaderIcon className='animate-spin' />
                  ) : (
                    'Register'
                  )}
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
