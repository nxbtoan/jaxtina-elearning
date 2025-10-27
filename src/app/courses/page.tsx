import { Suspense } from 'react';
import { getCoursesApi } from '@/lib/api';
import { Course } from '@/types';
import { CourseCard } from '@/components/CourseCard';
import { CourseListSkeleton } from '@/components/LoadingSkeleton';
import { SearchAndFilter } from './SearchAndFilter';

// Interface cho props của trang
interface CoursesPageProps {
  searchParams: {
    q?: string;
    level?: string;
  };
}

// Async component để fetch data
async function CourseList({ query, level }: { query: string, level: string }) {
  const { courses, total } = await getCoursesApi(1, 9, query);

  // Lọc ở Client-side (vì API dummyjson không hỗ trợ filter theo 'level' ta tự tạo ra)
  const filteredCourses = courses.filter(course => {
    if (!level || level === 'All') return true;
    return course.level === level;
  });

  if (filteredCourses.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold">Không tìm thấy kết quả</h2>
        <p className="text-gray-600">Hãy thử tìm kiếm với từ khóa hoặc bộ lọc khác.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {filteredCourses.map((course: Course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
}

// Trang chính Courses
export default function CoursesPage({ searchParams }: CoursesPageProps) {
  const query = searchParams.q || '';
  const level = searchParams.level || 'All';

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Khám phá Khóa học</h1>
      
      {/* 1. Thanh Search & Filter */}
      <SearchAndFilter />

      {/* 2. Danh sách khóa học */}
      <Suspense 
        key={query + level} // Key thay đổi để Suspense trigger lại
        fallback={<CourseListSkeleton />}
      >
        <CourseList query={query} level={level} />
      </Suspense>
      
      {/* 3. Phân trang (Pagination) */}
    </div>
  );
}