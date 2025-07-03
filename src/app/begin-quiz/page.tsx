'use client';

import { useEffect, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { verifyToken } from '@/app/actions/verify-token';
import { Card, CardContent } from '@/components/ui/card';

export default function BeginQuiz() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');
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
        router.push(`/assessment?responseId=${result.responseId}`);
      } catch (error) {
        setStatus('error');
        setError('Failed to verify token');
      }
    };

    validateToken();
  }, [searchParams, router]);

  return (
    <div className="flex min-h-svh items-center justify-center p-6">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          {status === 'loading' && (
            <div className="text-center">
              <p>Verifying your access...</p>
              <div className="mt-4 h-1 w-full bg-gray-200 rounded">
                <div className="h-1 bg-blue-600 rounded animate-pulse"></div>
              </div>
            </div>
          )}
          
          {status === 'error' && (
            <div className="text-center">
              <h2 className="text-red-600 font-semibold mb-2">Access Error</h2>
              <p className="text-gray-600">{error}</p>
              <p className="mt-4">
                <a href="/" className="text-blue-600 hover:underline">
                  Return to Homepage
                </a>
              </p>
            </div>
          )}

          {status === 'success' && (
            <div className="text-center">
              <p>Access verified! Redirecting to assessment...</p>
              <div className="mt-4 h-1 w-full bg-gray-200 rounded">
                <div className="h-1 bg-green-600 rounded"></div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
} 