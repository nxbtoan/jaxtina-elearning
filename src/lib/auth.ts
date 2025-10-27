import { User } from '@/types';

export const loginUserApi = async (username: string, password: string): Promise<User> => {
  const res = await fetch('https://dummyjson.com/auth/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      username,
      password,
    }),
  });

  if (!res.ok) {
    // Nếu API trả về lỗi (400, 500...)
    const errorData = await res.json();
    throw new Error(errorData.message || 'Sai tên đăng nhập hoặc mật khẩu');
  }

  // API trả về 200 (OK)
  const userData: User = await res.json();
  return userData;
};