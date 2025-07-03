import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { decrypt } from './lib/session';

const protectedRoutes = ['/dashboard', '/admin', '/api/admin'];
const publicApiRoutes = ['/api/admin/questions'];
const authRoutes = ['/auth/login'];

export async function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  
  // Skip session check for begin-quiz route
  if (path === '/begin-quiz') {
    return NextResponse.next();
  }

  // Check if path starts with any protected route
  const isProtectedRoute = protectedRoutes.some(route => path.startsWith(route));
  const isPublicApiRoute = publicApiRoutes.some(route => path.startsWith(route));
  const isAuthRoute = authRoutes.some(route => path.startsWith(route));

  // Allow GET requests to public API routes without authentication
  if (isPublicApiRoute && req.method === 'GET') {
    return NextResponse.next();
  }

  // Get session cookie
  const sessionCookie = req.cookies.get('session')?.value;
  console.log('Session cookie exists:', !!sessionCookie);

  const session = await decrypt(sessionCookie);
  console.log('Session valid:', !!session);
  console.log('Session data:', session);

  const isAuthenticated = session?.userId != null;
  console.log('Is authenticated:', isAuthenticated);

  // Clear invalid sessions
  if (sessionCookie && !isAuthenticated) {
    console.log('Clearing invalid session');
    const response = NextResponse.redirect(new URL('/auth/login', req.nextUrl));
    response.cookies.delete('session');
    return response;
  }

  // If trying to access protected route without being authenticated
  if (isProtectedRoute && !isPublicApiRoute && !isAuthenticated) {
    console.log('Redirecting to login - protected route access without auth');
    return NextResponse.redirect(new URL('/auth/login', req.nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    // Match all paths except static files and api routes
    '/((?!_next/static|_next/image|favicon.ico).*)',
  ],
};
