'use client';
import { useAuth } from "@/hooks/useAuth";

export default function CoursesPage() {
  const { user } = useAuth();

  if (!user) return null; // Sẽ được middleware xử lý, nhưng check an toàn
  
  return (
    <div>
      <h1 className="text-3xl font-bold">Chào mừng {user.firstName} đến với các khóa học!</h1>
      <p>Đây là trang Courses, bạn đã đăng nhập thành công.</p>
    </div>
  );
}