import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import React from 'react';
import { FormProvider, useForm } from 'react-hook-form';

import { BeginSchema } from '@/lib/definitions';

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
import { beginAuth } from '@/app/actions/auth';

const AuthForm = () => {
  const methods = useForm({
    defaultValues: {
      email: '',
    },
    mode: 'onChange',
    resolver: zodResolver(BeginSchema),
  });

  const { handleSubmit } = methods;

  const onSubmit = handleSubmit(async (data) => {
    try {
      const a = await beginAuth(data.email);
      console.log(a);
    } catch (error) {
      console.log(error);
    }
  });

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
            Enter your email to begin answering the questions. We’ll use this to
            save your progress and send you a secure access link.
          </CardDescription>
        </CardHeader>
        <FormProvider {...methods}>
          <form onSubmit={onSubmit}>
            <CardContent>
              <div className='flex flex-col gap-6'>
                <div className='grid gap-3'>
                  <Label htmlFor='email'>Email</Label>
                  <FormField
                    name='email'
                    placeholder='m@example.com'
                    type='email'
                  />
                </div>

                <div className='flex flex-col gap-3'>
                  <Button className='w-full' type='submit'>
                    Begin
                  </Button>
                </div>
              </div>
            </CardContent>
          </form>
        </FormProvider>
      </Card>
    </div>
  );
};

export default AuthForm;
