// Server Actions Registry
// This file helps ensure server actions are properly registered and available

export { authenticate, register, forgotPassword, resetPassword, signOut, clearLoginSession } from '@/app/actions/auth';
export { verifyToken } from '@/app/actions/verify-token';

// Re-export all server actions to ensure they're properly bundled
export * from '@/app/actions/auth';
export * from '@/app/actions/verify-token';