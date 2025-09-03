'use client';

import Image from 'next/image';
import { Suspense } from 'react';

import { ResetPasswordForm } from '@/components/ui/reset-password-form';

function ResetPasswordContent() {
  return (
    <div className='w-full max-w-sm'>
      <ResetPasswordForm />
    </div>
  );
}

const ResetPasswordPage = () => {
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      {/* FIXED: Title positioning - moved outside and positioned properly like other pages */}
      <div className='flex items-center gap-4 absolute top-6 w-full p-6 justify-center'>
        <Image alt='NEXEA Logo' height={40} src='/nexealogo.png' width={40} />
        <h1 className='text-2xl sm:text-3xl font-bold tracking-tight'>
          Entrepreneurs Behaviour Assessment
        </h1>
      </div>

      <Suspense fallback={<div>Loading...</div>}>
        <ResetPasswordContent />
      </Suspense>
    </div>
  );
};

export default ResetPasswordPage;