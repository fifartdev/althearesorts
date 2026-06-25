import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl

  // Only guard /manage routes
  if (!pathname.startsWith('/manage')) {
    return NextResponse.next()
  }

  // Login page is always accessible
  if (pathname === '/manage/login') {
    return NextResponse.next()
  }

  // Check for Payload auth token cookie
  const token =
    request.cookies.get('payload-token')?.value ||
    request.cookies.get('next-auth.session-token')?.value

  if (!token) {
    const loginUrl = new URL('/manage/login', request.url)
    loginUrl.searchParams.set('from', pathname)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/manage/:path*'],
}
