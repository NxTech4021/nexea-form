'use client';

import Image from 'next/image';

import { RegisterForm } from '@/components/ui';

const RegisterPage = () => {
  return (
    <div className='min-h-svh w-full flex flex-col items-center justify-center p-4 md:p-8'>
      <div className='w-full max-w-lg mx-auto text-center mb-8'>
        <div className='flex items-center justify-center gap-4 mb-2'>
          <Image alt='NEXEA Logo' height={40} src='/nexealogo.png' width={40} />
          <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>
            Entrepreneurs Behaviour Assessment
          </h1>
        </div>
      </div>

      <div className='w-full max-w-sm mx-auto'>
        <RegisterForm />
      </div>
    </div>
  );
};

export default RegisterPage; 