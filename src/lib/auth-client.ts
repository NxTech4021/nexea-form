// Client-side authentication utilities
// This completely bypasses server actions to avoid deployment issues

export interface AuthResult {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
}

export async function loginUser(email: string, password: string): Promise<AuthResult> {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);

    const response = await fetch('/api/auth/login', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      message: 'Network error occurred. Please try again.',
    };
  }
}

export async function forgotPasswordRequest(email: string): Promise<AuthResult> {
  try {
    const formData = new FormData();
    formData.append('email', email);

    const response = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      message: 'Network error occurred. Please try again.',
    };
  }
}

export async function registerUser(email: string, password: string, confirmPassword: string): Promise<AuthResult> {
  try {
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);

    const response = await fetch('/api/auth/register', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      message: 'Network error occurred. Please try again.',
    };
  }
}

export async function resetUserPassword(token: string, password: string, confirmPassword: string): Promise<AuthResult> {
  try {
    const formData = new FormData();
    formData.append('token', token);
    formData.append('password', password);
    formData.append('confirmPassword', confirmPassword);

    const response = await fetch('/api/auth/reset-password', {
      method: 'POST',
      body: formData,
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      message: 'Network error occurred. Please try again.',
    };
  }
}

export async function logoutUser(): Promise<AuthResult> {
  try {
    const response = await fetch('/api/auth/logout', {
      method: 'POST',
    });

    const result = await response.json();
    return result;
  } catch (error) {
    return {
      message: 'Network error occurred. Please try again.',
    };
  }
}