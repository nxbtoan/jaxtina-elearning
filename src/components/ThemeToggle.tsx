'use client';

import { useTheme } from 'next-themes';
import { FaSun, FaMoon } from 'react-icons/fa';
import { useEffect, useState } from 'react';

export const ThemeToggle = () => {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);
  if (!mounted) return <div className="w-8 h-8" />;

  return (
    <button
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      aria-label="Toggle dark mode"
      className="
        p-2 rounded-full
        border border-[var(--border-color)]
        bg-[var(--bg-color)] 
        text-[var(--text-color)]
        hover:opacity-90 transition
      "
    >
      {theme === 'dark' ? <FaSun /> : <FaMoon />}
    </button>
  );
};
