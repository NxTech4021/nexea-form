'use client';

import { Assessment } from '@/components/assessment';
import AuthForm from '@/components/email-begin';
import { FormProvider } from '@/contexts/form-context';

export default function Home() {
  return (
    // <FormProvider>
    //   <Assessment />
    // </FormProvider>
    <AuthForm />
  );
}
