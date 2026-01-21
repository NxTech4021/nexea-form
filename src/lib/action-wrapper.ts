'use server';

// Server Action Wrapper to ensure stability in production
// This wrapper helps prevent the "Failed to find Server Action" error

import { redirect } from 'next/navigation';

export function createStableAction<T extends any[], R>(
  actionName: string,
  actionFn: (...args: T) => Promise<R>
) {
  return async (...args: T): Promise<R> => {
    'use server';
    
    try {
      console.log(`[SERVER ACTION] ${actionName} called`);
      return await actionFn(...args);
    } catch (error) {
      console.error(`[SERVER ACTION ERROR] ${actionName}:`, error);
      throw error;
    }
  };
}

// Helper to ensure server actions are properly bound
export function bindServerAction<T extends (...args: any[]) => any>(
  action: T,
  actionName: string
): T {
  const boundAction = action.bind(null);
  Object.defineProperty(boundAction, 'name', { value: actionName });
  return boundAction as T;
}