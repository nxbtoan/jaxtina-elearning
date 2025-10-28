'use client';

import { Course } from '@/types';
import { CourseCard } from '@/components/CourseCard';

export const CourseListClient = ({ courses }: { courses: Course[] }) => {
  if (courses.length === 0) {
    return (
      <div className="text-center py-10">
        <h2 className="text-2xl font-semibold">Không tìm thấy kết quả</h2>
        <p className="text-gray-600">Hãy thử tìm kiếm với từ khóa hoặc bộ lọc khác.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {courses.map((course: Course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};