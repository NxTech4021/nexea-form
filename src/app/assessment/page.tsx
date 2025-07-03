'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { Assessment } from '@/components/assessment';
import { FormProvider } from '@/contexts/form-context';

export default function AssessmentPage() {
  const searchParams = useSearchParams();
  const responseId = searchParams.get('responseId');
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!responseId) {
      setIsValid(false);
      setError('No response ID provided');
      return;
    }

    // Verify the response ID exists
    const verifyResponse = async () => {
      try {
        const res = await fetch(`/api/verify-response?id=${responseId}`);
        const data = await res.json();
        
        if (!res.ok) {
          setIsValid(false);
          setError(data.error || 'Failed to verify response');
          return;
        }
        
        setIsValid(true);
        setError(null);
      } catch (error) {
        console.error('Error verifying response:', error);
        setIsValid(false);
        setError('Failed to verify response. Please try again.');
      }
    };

    verifyResponse();
  }, [responseId]);

  if (isValid === null) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <div className="h-8 w-8 border-2 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p>Loading assessment...</p>
        </div>
      </div>
    );
  }

  if (!isValid) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-2">Invalid Assessment Link</h1>
          <p className="text-gray-600 mb-4">
            {error || 'This assessment link is invalid or has expired.'}
          </p>
          <a href="/" className="text-primary hover:underline">
            Return to Homepage
          </a>
        </div>
      </div>
    );
  }

  return (
    <FormProvider>
      <Assessment />
    </FormProvider>
  );
} 