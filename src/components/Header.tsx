'use client';

import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import { ThemeToggle } from './ThemeToggle';
import { motion } from 'framer-motion';

export const Header = () => {
  const { user, logout } = useAuth();

  return (
    <header
      className="
        sticky top-0 z-50 w-full
        border-b border-[var(--border-color)]
        transition-colors
        bg-[var(--bg-color)]/90
        backdrop-blur-sm
      "
    >
      <nav className="container mx-auto px-4 py-3 flex justify-between items-center">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Link
            href={user ? '/courses' : '/'}
            className="
              text-xl md:text-xl font-bold text-[var(--accent-color)]
              transition-transform hover:scale-105
            "
          >
            E-Learning
          </Link>
        </motion.div>

        <motion.div
          className="flex items-center gap-2 md:gap-4"
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          {user ? (
            <>
              <ThemeToggle />
              <span className="hidden sm:block font-medium text-[var(--text-color)]">
                Chào, {user.firstName}
              </span>

              <button
                onClick={logout}
                className="
                  bg-red-500 text-white px-3 md:px-4 py-2 
                  rounded-lg hover:bg-red-600 
                  transition-colors text-sm font-medium
                "
              >
                Đăng xuất
              </button>
            </>
          ) : (
            <>
              <ThemeToggle />
              <Link
                href="/auth/login"
                className="bg-[var(--accent-color)] text-white px-3 md:px-4 py-2
                  rounded-lg hover:opacity-90 transition-all text-sm font-medium
                  shadow-lg shadow-blue-500/30
                  dark:shadow-blue-400/30
                "
              >
                Đăng nhập
              </Link>
            </>
          )}
        </motion.div>
      </nav>
    </header>
  );
};