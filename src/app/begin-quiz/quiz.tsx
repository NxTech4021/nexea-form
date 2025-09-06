'use client';

import { CircleX } from 'lucide-react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import { verifyToken } from '@/app/actions/verify-token';
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
        const result = await verifyToken(token);

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
      <Card className='min-w-xs flex items-center rounded-sm absolute top-1/3 left-1/2 -translate-1/2 bg-red-100'>
        <CircleX className='text-red-600' />
        <div className='text-center'>
          <p className='font-bold text-md'>Access Error</p>
          <p className='text-muted-foreground text-sm mt-1'>{error}</p>
        </div>
        <Link href={'/'}>
          <Button className='rounded-sm' size={'sm'}>
            Return to Homepage
          </Button>
        </Link>
      </Card>
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

          {/* {status === 'error' && (
            <div className='text-center'>
              <h2 className='text-red-600 font-semibold mb-2'>Access Error</h2>
              <p className='text-gray-600'>{error}</p>
              <p className='mt-4'>
                <Link className='text-blue-600 hover:underline' href='/'>
                  Return to Homepage
                </Link>
              </p>
            </div>
          )} */}

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
