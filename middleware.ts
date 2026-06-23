// middleware.ts (root of project)
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ONLY_ROUTES = ['/login', '/signup', '/forgot-password'];
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings']; // or use a prefix like /app

export function middleware(request: NextRequest) {
  //   const { pathname } = request.nextUrl
  //   const token = request.cookies.get('access_token')?.value
  //   const isPublicOnly = PUBLIC_ONLY_ROUTES.some(r => pathname.startsWith(r))
  //   const isProtected = PROTECTED_ROUTES.some(r => pathname.startsWith(r))
  //   if (isProtected && !token) {
  //     // Not logged in, trying to access protected route
  //     return NextResponse.redirect(new URL('/login', request.url))
  //   }
  //   if (isPublicOnly && token) {
  //     // Already logged in, trying to access login/signup
  //     return NextResponse.redirect(new URL('/dashboard', request.url))
  //   }
  //   return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
