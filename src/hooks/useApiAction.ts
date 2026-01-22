import { useState, useTransition } from 'react';

type ApiActionResult<T = any> = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
  data?: T;
};

export function useApiAction<T = any>(endpoint: string) {
  const [state, setState] = useState<ApiActionResult<T> | null>(null);
  const [isPending, startTransition] = useTransition();

  const execute = async (formData: FormData) => {
    startTransition(async () => {
      try {
        const response = await fetch(endpoint, {
          method: 'POST',
          body: formData,
        });

        const result = await response.json();
        setState(result);
        
        return result;
      } catch (error) {
        const errorResult = {
          message: 'Network error occurred. Please try again.',
        };
        setState(errorResult);
        return errorResult;
      }
    });
  };

  return [state, execute, isPending] as const;
}