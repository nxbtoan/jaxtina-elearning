import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // 1. Lấy cookie 'authUser'
  const authCookie = request.cookies.get('authUser')?.value;
  
  const { pathname } = request.nextUrl;

  // 2. Nếu đã đăng nhập (có cookie)
  if (authCookie) {
    // Nếu cố vào trang login -> đá về courses
    if (pathname.startsWith('/auth/login')) {
      return NextResponse.redirect(new URL('/courses', request.url));
    }
  }

  // 3. Nếu chưa đăng nhập (không có cookie)
  if (!authCookie) {
    // Nếu cố vào trang / (trang chủ) hoặc /courses -> đá về login
    if (pathname === '/' || pathname.startsWith('/courses')) {
      return NextResponse.redirect(new URL('/auth/login', request.url));
    }
  }

  // 4. Các trường hợp còn lại -> cho qua
  return NextResponse.next();
}

// Config: Áp dụng middleware cho tất cả các route
export const config = {
  matcher: [
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};