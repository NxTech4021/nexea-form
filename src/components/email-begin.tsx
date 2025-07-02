import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { z } from 'zod';

import FormField from './form/form-field';
import { Button } from './ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from './ui/card';
import { Label } from './ui/label';

// Email validation schema
const BeginSchema = z.object({
  email: z.string().email('Please enter a valid email address'),
});

type FormValues = z.infer<typeof BeginSchema>;

const AuthForm = () => {
  const [mounted, setMounted] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [success, setSuccess] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  const methods = useForm<FormValues>({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
    resolver: zodResolver(BeginSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    setError(null);
    setSuccess(false);
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/begin-quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: data.email }),
      });

      const responseData = await res.json();

      if (!res.ok) {
        setError(responseData.error || 'Failed to send verification email');
        return;
      }

      setSuccess(true);
    } catch (error) {
      setError('An unexpected error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  });

  if (!mounted) {
    return null;
  }

  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10 relative'>
      <div className='flex items-center gap-4 absolute top-36 w-full p-6 justify-center'>
        <Image alt='NEXEA Logo' height={40} src='/nexealogo.png' width={40} />
        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>
          Entrepreneurs Behaviour Assessment
        </h1>
      </div>

      <Card className='w-full sm:w-md'>
        <CardHeader>
          <CardTitle>Welcome! Let&apos;s Get Started</CardTitle>
          <CardDescription>
            Enter your email to begin answering the questions. We'll use this to
            save your progress and send you a secure access link.
          </CardDescription>
        </CardHeader>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <CardContent>
              <div className='flex flex-col gap-6'>
                {success ? (
                  <div className="text-green-600 text-center py-2">
                    <p>✓ Verification email sent!</p>
                    <p className="text-sm mt-2">Please check your email for the assessment link.</p>
                    <p className="text-sm text-gray-500 mt-1">The link will expire in 15 minutes.</p>
                  </div>
                ) : (
                  <>
                    <div className='grid gap-3'>
                      <Label htmlFor='email'>Email</Label>
                      <FormField
                        name='email'
                        placeholder='m@example.com'
                        type='email'
                        disabled={isSubmitting}
                        className={isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
                      />
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Button 
                        className='w-full' 
                        type='submit'
                        disabled={isSubmitting}
                      >
                        {isSubmitting ? (
                          <span className="flex items-center gap-2">
                            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                            Sending...
                          </span>
                        ) : (
                          'Begin'
                        )}
                      </Button>
                    </div>
                    {error && (
                      <div className="text-red-600 text-center text-sm">
                        {error}
                      </div>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

export default AuthForm;
