'use client';

import { createContext, useState, ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { User } from '@/types';
import { loginUserApi } from '@/lib/auth';

// Định nghĩa kiểu dữ liệu cho Context
interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// 1. Tạo Context
export const AuthContext = createContext<AuthContextType | undefined>(undefined);

// 2. Tạo Provider
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Bắt đầu là true để check cookie
  const router = useRouter();

  // 3. Check cookie khi app mới tải
  useEffect(() => {
    const userCookie = Cookies.get('authUser');
    if (userCookie) {
      setUser(JSON.parse(userCookie));
    }
    setIsLoading(false);
  }, []);

  // 4. Hàm Login
  const login = async (username: string, password: string) => {
    setIsLoading(true);
    try {
      const userData = await loginUserApi(username, password);
      setUser(userData);
      
      // Lưu vào cookie (expires: 1 ngày)
      Cookies.set('authUser', JSON.stringify(userData), { expires: 1 });
      
      router.push('/courses');
    } catch (error) {
      console.error(error);
      alert(error instanceof Error ? error.message : 'Đăng nhập thất bại');
    } finally {
      setIsLoading(false);
    }
  };

  // 5. Hàm Logout
  const logout = () => {
    setUser(null);
    Cookies.remove('authUser');
    router.push('/auth/login');
  };

  // 6. Cung cấp state và hàm cho các component con
  return (
    <AuthContext.Provider value={{ user, isLoading, login, logout }}>
      {!isLoading && children} {/* Chỉ render app khi đã check cookie xong */}
    </AuthContext.Provider>
  );
};