'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth'; // Dùng custom hook

export const Header = () => {
  const { user, logout } = useAuth(); // Lấy state từ context

  return (
    <header className="bg-white shadow-md">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link 
          href={user ? "/courses" : "/"} 
          className="text-xl font-bold text-blue-600"
        >
          E-Learning
        </Link>
        <div>
          {user ? (
            // Đã login
            <div className="flex items-center gap-4">
              <span className="hidden sm:block">Chào, {user.firstName}</span>
              <button
                onClick={logout}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
              >
                Đăng xuất
              </button>
            </div>
          ) : (
            // Chưa login
            <Link
              href="/auth/login"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            >
              Đăng nhập
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};