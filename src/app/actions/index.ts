'use server';

// Centralized server actions export
// This ensures all server actions are properly registered and available

// Import all server actions
import { 
  authenticate, 
  register, 
  forgotPassword, 
  resetPassword, 
  signOut, 
  clearLoginSession,
  beginAuth
} from './auth';
import { verifyToken } from './verify-token';

// Re-export with explicit names to ensure they're available
export {
  authenticate,
  register, 
  forgotPassword,
  resetPassword,
  signOut,
  clearLoginSession,
  beginAuth,
  verifyToken
};

// Export types
export type {
  ForgotPasswordState,
  RegisterFormState,
  ResetPasswordState
} from './auth';