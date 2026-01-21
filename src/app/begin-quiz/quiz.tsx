'use client';

import { AlertTriangle, Home } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { stableVerifyToken } from '@/app/actions/stable-verify';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui';
import { Card, CardContent } from '@/components/ui/card';

export default function BeginQuiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'error' | 'loading' | 'success'>(
    'loading',
  );
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      setStatus('error');
      setError('No token provided');
      return;
    }

    const validateToken = async () => {
      try {
        const result = await stableVerifyToken(token);

        if (result.error) {
          setStatus('error');
          setError(result.error);
          return;
        }

        setStatus('success');
        // Redirect to assessment with response ID
        router.replace(`/assessment?responseId=${result.responseId}`);
      } catch (error) {
        console.log(error);
        setStatus('error');
        setError('Failed to verify token');
      }
    };

    validateToken();
  }, [searchParams, router]);

  if (status === 'error') {
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
              Access Error
            </h1>
            
            <div className='space-y-2'>
              <p className='text-lg text-gray-600'>
                {error}
              </p>
            </div>
          </div>
          
          {/* Action Button */}
          <div className='pt-4'>
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
    <div className='flex min-h-svh items-center justify-center p-6'>
      <Card className='w-full max-w-md'>
        <CardContent className='pt-6'>
          {status === 'loading' && (
            <div className='text-center'>
              <p>Verifying your access...</p>
              <div className='mt-4 h-1 w-full bg-gray-200 rounded'>
                <div className='h-1 bg-blue-600 rounded animate-pulse'></div>
              </div>
            </div>
          )}

          {status === 'success' && (
            <div className='text-center'>
              <p>Access verified! Redirecting to assessment...</p>
              <div className='mt-4 h-1 w-full bg-gray-200 rounded'>
                <div className='h-1 bg-green-600 rounded'></div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
