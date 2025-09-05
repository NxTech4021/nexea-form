'use client';

import Image from 'next/image';

import { ForgotPasswordForm } from '@/components/ui/forgot-password-form';

const ForgotPasswordPage = () => {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='flex items-center gap-4 absolute top-30 w-full p-6 justify-center'>
        <Image alt='NEXEA Logo' height={40} src='/nexealogo.png' width={40} />
        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>
          Entrepreneurs Behaviour Assessment
        </h1>
      </div>

      <div className='w-full max-w-sm'>
        <ForgotPasswordForm />
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
