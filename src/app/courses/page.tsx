import { use } from 'react';
import { Suspense } from 'react';
import { getCoursesApi } from '@/lib/api';
import { CourseListClient } from './CourseListClient';
import { CourseListSkeleton } from '@/components/LoadingSkeleton';
import { SearchAndFilter } from './SearchAndFilter';

// Interface cho props của trang
interface CoursesPageProps {
  searchParams: {
    q?: string;
    level?: string;
  };
}

// Component Server (fetch data)
async function CourseListLoader({ query, level }: { query: string, level: string }) {
  const { courses } = await getCoursesApi(1, 9, query);

  const filteredCourses = courses.filter(course => {
    if (!level || level === 'All') return true;
    return course.level === level;
  });

  return <CourseListClient courses={filteredCourses} />;
}

// Trang chính Courses
export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const query = searchParams.q || '';
  const level = searchParams.level || 'All';

return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold">Khám phá Khóa học</h1>
      
      <SearchAndFilter />

      <Suspense key={query + level} fallback={<CourseListSkeleton />}>
        {/* 5. Gọi component Server (Loader) */}
        <CourseListLoader query={query} level={level} />
      </Suspense>
    </div>
  );
}