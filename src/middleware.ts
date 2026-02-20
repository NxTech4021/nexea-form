// import { cookies } from 'next/headers';
// import { NextRequest, NextResponse } from 'next/server';

// import { decrypt } from './lib/session';

// const protectedRoutes = ['/dashboard', '/admin', '/api/admin'];
// const publicApiRoutes = ['/api/admin/questions'];
// const authRoutes = ['/auth/login'];

// export async function middleware(req: NextRequest) {
//   const path = req.nextUrl.pathname;

//   // // Skip session check for begin-quiz route
//   if (path === '/begin-quiz') {
//     return NextResponse.next();
//   }

//   // Check if path starts with any protected route
//   const isProtectedRoute = protectedRoutes.some((route) =>
//     path.startsWith(route)
//   );
//   const isPublicApiRoute = publicApiRoutes.some((route) =>
//     path.startsWith(route)
//   );
//   const isAuthRoute = authRoutes.includes(path);

//   // Allow GET requests to public API routes without authentication
//   if (isPublicApiRoute && req.method === 'GET') {
//     return NextResponse.next();
//   }

//   // Get session cookie
//   const sessionCookie = (await cookies()).get('session')?.value;
//   const session = await decrypt(sessionCookie);

//   if (isProtectedRoute && !session?.userId) {
//     const response = NextResponse.redirect(new URL('/auth/login', req.nextUrl));
//     // response.cookies.delete('session');
//     return response;
//   }

//   if (isAuthRoute && session?.userId) {
//     return NextResponse.redirect(new URL('/admin', req.nextUrl));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: [
//     // Match all paths except static files and api routes
//     '/((?!_next/static|_next/image|favicon.ico|nexealogo.png).*)',
//   ],
// };

// import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

const protectedRoutes = ['/dashboard', '/admin', '/api/admin'];
const publicApiRoutes = ['/api/admin/questions'];
const authRoutes = ['/auth/login'];

export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;

  if (path === '/begin-quiz') {
    return NextResponse.next();
  }

  const isProtectedRoute = protectedRoutes.some((route) =>
    path.startsWith(route),
  );
  const isPublicApiRoute = publicApiRoutes.some((route) =>
    path.startsWith(route),
  );
  const isAuthRoute = authRoutes.includes(path);

  if (isPublicApiRoute && req.method === 'GET') {
    return NextResponse.next();
  }

  const session = req.cookies.get('session')?.value;

  const baseUrl = process.env.BASE_URL || `${req.nextUrl.protocol}//${req.nextUrl.host}`;

  if (isProtectedRoute && !session) {
    return NextResponse.redirect(new URL('/auth/login', baseUrl));
  }

  if (isAuthRoute && session) {
    return NextResponse.redirect(new URL('/admin', baseUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|nexealogo.png).*)'],
};
