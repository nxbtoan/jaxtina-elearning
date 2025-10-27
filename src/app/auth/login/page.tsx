'use client';

import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { validateUsername, validatePassword } from '@/utils/validate';

export default function LoginPage() {
  const [username, setUsername] = useState('emilys');
  const [password, setPassword] = useState('emilyspass');
  const [errors, setErrors] = useState<{ username?: string; password?: string }>({});

  const { login, isLoading } = useAuth();

  // Kiểm tra form có hợp lệ hay không
  const isFormInvalid = !!validateUsername(username) || !!validatePassword(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Chạy validation lại 1 lần nữa để hiển thị lỗi
    const usernameError = validateUsername(username);
    const passwordError = validatePassword(password);
    
    setErrors({ username: usernameError, password: passwordError });

    // Nếu không có lỗi
    if (!usernameError && !passwordError) {
      await login(username, password);
    }
  };

  return (
    <div className="flex justify-center items-start mt-10">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm p-8 bg-white shadow-lg rounded-lg border"
        noValidate
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Đăng nhập</h1>
        
        {/* Username Field */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
            Username (test: emilys)
          </label>
          <input
            id="username"
            type="text"
            value={username}
            onChange={(e) => {
              setUsername(e.target.value);
              if (errors.username) setErrors(p => ({...p, username: ''}));
            }}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.username ? 'border-red-500' : ''
            }`}
          />
          {errors.username && (
            <p className="text-red-500 text-xs italic mt-1">{errors.username}</p> 
          )}
        </div>
        
        {/* Password Field */}
        <div className="mb-6">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
            Password (test: emilyspass)
          </label>
          <input
            id="password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors(p => ({...p, password: ''}));
            }}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline ${
              errors.password ? 'border-red-500' : ''
            }`}
          />
          {errors.password && (
            <p className="text-red-500 text-xs italic">{errors.password}</p> 
          )}
        </div>
        
        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            disabled={isFormInvalid || isLoading} // Disable khi form invalid hoặc đang loading 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            {isLoading ? 'Đang tải...' : 'Đăng nhập'}
          </button>
        </div>
      </form>
    </div>
  );
}