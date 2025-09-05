import { zodResolver } from '@hookform/resolvers/zod';
import { Check, Mail } from 'lucide-react';
import Image from 'next/image';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { toast } from 'sonner';
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
  const [error, setError] = React.useState<null | string>(null);
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
        body: JSON.stringify({ email: data.email }),
        headers: { 'Content-Type': 'application/json' },
        method: 'POST',
      });

      const responseData = await res.json();

      if (!res.ok) {
        toast.error(responseData.error || 'Failed to send verification email');
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
    <div className='flex min-h-svh w-full justify-center p-6 md:p-10 relative'>
      <div className='flex flex-col items-center gap-10 mt-15'>
        <div className='flex items-center gap-4 w-full p-6 justify-center'>
          <Image alt='NEXEA Logo' height={40} src='/nexealogo.png' width={40} />
          <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>
            Entrepreneurs Behaviour Assessment
          </h1>
        </div>

        {success ? (
          <Card className='max-w-sm px-10'>
            <div className='flex flex-col justify-center items-center gap-2.5'>
              <Mail className='text-green-700' size={25} />
              <p className='text-xl font-semibold'>Check your email</p>
              <p className='text-muted-foreground text-sm text-center leading-snug'>
                Your assessment link has been sent! Please check your email to
                get started.
              </p>
            </div>
          </Card>
        ) : (
          <Card className='w-full sm:w-md'>
            <CardHeader>
              <CardTitle>Welcome! Let&apos;s Get Started</CardTitle>
              <CardDescription>
                Enter your email to begin answering the questions. We&apos;ll
                use this to save your progress and send you a secure access
                link.
              </CardDescription>
            </CardHeader>
            <FormProvider {...methods}>
              <form onSubmit={onSubmit}>
                <CardContent>
                  <div className='flex flex-col gap-6'>
                    <div className='grid gap-3'>
                      <Label htmlFor='email'>Email</Label>
                      <FormField
                        className={
                          isSubmitting ? 'opacity-50 cursor-not-allowed' : ''
                        }
                        disabled={isSubmitting}
                        name='email'
                        placeholder='m@example.com'
                        type='email'
                      />
                    </div>
                    <div className='flex flex-col gap-3'>
                      <Button
                        className='w-full'
                        disabled={isSubmitting}
                        type='submit'
                      >
                        {isSubmitting ? (
                          <span className='flex items-center gap-2'>
                            <span className='h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin' />
                            Sending...
                          </span>
                        ) : (
                          'Begin'
                        )}
                      </Button>
                    </div>
                    {/* {error && (
                      <div className='text-red-600 text-center text-sm'>
                        {error}
                      </div>
                    )} */}
                  </div>
                </CardContent>
              </form>
            </FormProvider>
          </Card>
        )}
      </div>
    </div>
  );
};

export default AuthForm;
