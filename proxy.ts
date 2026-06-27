import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

const PUBLIC_ONLY_ROUTES = ['/signin', '/register', '/forgot-password'];
const PROTECTED_ROUTES = ['/dashboard', '/profile', '/settings'];

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const token = request.cookies.get('access_token')?.value;
  const isPublicOnly = PUBLIC_ONLY_ROUTES.some(r => pathname.startsWith(r));
  const isProtected = PROTECTED_ROUTES.some(r => pathname.startsWith(r));

  if (isProtected && !token) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (isPublicOnly && token) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
