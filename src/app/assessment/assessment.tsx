'use client';

import { AlertTriangle, Home } from 'lucide-react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Assessment } from '@/components/assessment';
import { Button } from '@/components/ui';
import { FormProvider } from '@/contexts/form-context';

export default function AssessmentPage({
  responseValue,
}: {
  responseValue: string;
}) {
  // const searchParams = useSearchParams();
  // const responseId = searchParams.get('responseId');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<null | string>(null);
  const [email, setEmail] = useState<string>();

  useEffect(() => {
    if (!responseValue) {
      setIsValid(false);
      setError('No response ID provided');
      return;
    }

    // Verify the response ID exists
    const verifyResponse = async () => {
      try {
        const res = await fetch(`/api/verify-response?id=${responseValue}`);
        const data = await res.json();

        if (!res.ok) {
          setIsValid(false);
          if (data.isSubmitted) {
            setError('This assessment link has already been used.');
          } else {
            setError(data.error || 'Failed to verify response');
          }
          return;
        }

        setEmail(data.response.allowlist.email);

        setIsValid(true);
        setError(null);
      } catch (error) {
        console.error('Error verifying response:', error);
        setIsValid(false);
        setError('Failed to verify response. Please try again.');
      }
    };

    verifyResponse();
  }, [responseValue]);

  if (isValid === null) {
    return (
      <div className='flex min-h-screen items-center justify-center'>
        <div className='text-center'>
          <div className='h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4'></div>
          <p>Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className='flex min-h-svh items-center justify-center p-6'>
        <div className='w-full max-w-lg text-center space-y-8'>
          {/* Error Icon */}
          <div className='flex justify-center'>
            <div className='rounded-full bg-red-100 p-4'>
              <AlertTriangle className='h-8 w-8 text-red-600' />
            </div>
          </div>
          
          {/* Error Content */}
          <div className='space-y-4'>
            <h1 className='text-2xl font-semibold text-gray-900'>
              Invalid Assessment Link
            </h1>
            
            <div className='space-y-2'>
              <p className='text-lg text-gray-600'>
                {error || 'This assessment link is invalid or has expired.'}
              </p>
            </div>
          </div>
          
          {/* Action Button */}
          <div className='pt-2'>
            <Link href={'/'}>
              <Button size="lg" className='px-8 cursor-pointer'>
                <Home className='h-4 w-4 mr-2' />
                Return to Homepage
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <FormProvider responseId={responseValue}>
      <Assessment email={email!} />
    </FormProvider>
  );
}
