import { NextResponse } from 'next/server';

// This function can be marked `async` if using `await` inside
export function middleware(request) {
  const url = request.nextUrl.clone();
  const pathname = request.nextUrl.pathname;
  let token = request.cookies.get('token')?.value;
  const pathnameNotAuthorize = ['/login'];

  if (token) {
    if (pathnameNotAuthorize.includes(pathname)) {
      url.pathname = '/';
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  } else {
    if (!pathnameNotAuthorize.includes(pathname)) {
      url.pathname = '/login';
      return NextResponse.redirect(url);
    } else {
      return NextResponse.next();
    }
  }
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico, sitemap.xml, robots.txt (metadata files)
     */
    '/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)',
  ],
};
