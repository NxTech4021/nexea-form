'use client';

import { useEffect } from 'react';
import { clearLoginSession } from '@/app/actions/auth';
import { LoginForm } from '@/components/ui/login-form';

const LoginPage = () => {
  useEffect(() => {
    // Clear session when the page loads
    clearLoginSession();
  }, []);
  
  return (
    <div className='flex min-h-svh w-full items-center justify-center p-6 md:p-10'>
      <div className='w-full max-w-sm'>
        <LoginForm />
      </div>
    </div>
  );
};

export default LoginPage;
