import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  console.log('Middleware running for path:', request.nextUrl.pathname);
  
  // Check if this is an admin route (excluding login page)
  if (request.nextUrl.pathname.startsWith('/admin') && !request.nextUrl.pathname.startsWith('/admin/login')) {
    const token = request.cookies.get('auth-token')?.value;
    console.log('Token found in middleware:', token ? 'Yes' : 'No');

    if (!token) {
      console.log('No token found, redirecting to login');
      // Redirect to login page
      return NextResponse.redirect(new URL('/admin/login', request.url));
    }

    // Since JWT verification doesn't work in edge runtime, we'll do a simple token presence check
    // and let the actual admin page verify the token properly
    console.log('Token present, allowing access to admin route');
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*']
};
