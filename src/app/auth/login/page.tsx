'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { validateUsername, validatePassword } from '@/utils/validate';
import { motion, AnimatePresence } from 'framer-motion';
import { FaUser, FaLock, FaSpinner } from 'react-icons/fa';
import Image from 'next/image';

export default function LoginPage() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});
  const { login, isLoading } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    setErrors({ username: usernameError, password: passwordError });
    if (!usernameError && !passwordError) await login(username, password);
  };

  const inputStyle = `
    w-full pl-10 pr-4 py-2.5 rounded-lg
    bg-[var(--bg-input)] text-[var(--text-color)]
    placeholder-[var(--text-muted)]
    border border-[var(--border-color)]
    focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)]
    focus:border-transparent transition-all duration-200
  `;

  return (
    <div className="relative min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden">
      <div className="relative w-[70%] h-[70vh] flex items-center justify-end rounded-[2rem] border border-[var(--border-color)] shadow-2xl overflow-hidden">
        {/* Background hero */}
        <div className="absolute inset-0 -z-10">
          <Image
            src="/hero.jpg"
            alt="Jaxtina Hero"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-br from-[#2D368E]/70 via-transparent to-[#CC2028]/70 mix-blend-multiply" />
          <div className="absolute inset-0 dark:bg-black/10" />
        </div>

        <motion.form
          onSubmit={handleSubmit}
          className="
            relative w-full max-w-sm mr-12 p-8 rounded-2xl overflow-hidden
            border shadow-2xl transition-all duration-300
            backdrop-blur-xs
            bg-[var(--bg-blur)]
            border-[rgba(255,255,255,0.4)] dark:border-[rgba(255,255,255,0.1)]
            before:absolute before:inset-0 before:rounded-2xl before:-z-10
            before:bg-gradient-to-br before:from-white/40 before:to-transparent
            before:dark:from-white/10 before:dark:to-transparent
          "
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ type: 'spring', stiffness: 80, damping: 15 }}
        >

          {/* Logo */}
          <motion.div
            className="flex flex-col items-center mb-6"
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Image
              src="/logo.svg"
              alt="Jaxtina Logo"
              width={140}
              height={60}
              className="mb-3 drop-shadow-lg"
            />
            <h1 className="text-xl font-bold text-[#2D368E] text-center">
              Đăng nhập <span className="text-[#CC2028]">Jaxtina</span> Learning
            </h1>
          </motion.div>

          {/* Username */}
          <div className="mb-4">
            <label className="block text-sm font-semibold mb-2 text-[var(--text-color)]" htmlFor="username">
              Username
            </label>
            <div className="relative">
              <FaUser className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="username"
                type="text"
                placeholder="Nhập username..."
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className={`${inputStyle} ${errors.username ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.username && (
              <p className="text-red-500 text-xs italic mt-1">{errors.username}</p>
            )}
          </div>

          {/* Password */}
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2 text-[var(--text-color)]" htmlFor="password">
              Password
            </label>
            <div className="relative">
              <FaLock className="absolute top-1/2 left-3 -translate-y-1/2 text-gray-400" />
              <input
                id="password"
                type="password"
                placeholder="Nhập mật khẩu..."
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`${inputStyle} ${errors.password ? 'border-red-500' : ''}`}
              />
            </div>
            {errors.password && (
              <p className="text-red-500 text-xs italic mt-1">{errors.password}</p>
            )}
          </div>

          {/* Button */}
          <motion.button
            type="submit"
            disabled={isLoading}
            className="
              relative w-full py-3 rounded-xl font-semibold text-white
              bg-gradient-to-r from-[#2D368E] to-[#CC2028]
              hover:from-[#3A47A2] hover:to-[#E02C30]
              focus:ring-4 focus:ring-blue-300
              transition-all duration-300 shadow-md
              disabled:opacity-60 disabled:cursor-not-allowed
            "
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div
                  key="loading"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                >
                  <FaSpinner className="animate-spin text-lg" />
                </motion.div>
              ) : (
                <motion.span
                  key="login"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Đăng nhập
                </motion.span>
              )}
            </AnimatePresence>
          </motion.button>

          {/* Footer slogan */}
          <p className="text-center text-sm text-gray-700 dark:text-gray-300 mt-6 italic">
            “Your English journey starts here 🚀”
          </p>
        </motion.form>
      </div>
    </div>
  );
}