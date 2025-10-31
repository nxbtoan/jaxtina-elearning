import { getCoursesApi } from '@/lib/api';
import { CoursesClientWrapper } from './CoursesClientWrapper';

const ITEMS_PER_PAGE = 9;

interface CoursesPageProps {
  searchParams: Promise<{
    q?: string;
    level?: string;
    kind?: string;
    page?: string;
  }>;
}

export default async function CoursesPage({ searchParams }: CoursesPageProps) {
  const params = await searchParams;
  const query = params.q || '';
  const level = params.level || 'All';
  const kind = params.kind || 'All';
  const page = Number(params.page) || 1;

  // ✅ Luôn fetch toàn bộ 100 item 1 lần
  const { courses } = await getCoursesApi(1, 100);

  const lowerCaseQuery = query.toLowerCase();

  // Lọc kết quả ở server component
  const filteredCourses = courses
    .filter(course => {
      if (!query) return true;
      return (
        course.title.toLowerCase().includes(lowerCaseQuery) ||
        course.description.toLowerCase().includes(lowerCaseQuery) ||
        course.kindOfCourse.toLowerCase().includes(lowerCaseQuery) ||
        course.level.toLowerCase().includes(lowerCaseQuery)
      );
    })
    .filter(course => level === 'All' || course.level === level)
    .filter(course => kind === 'All' || course.kindOfCourse === kind);

  // ✅ Tính toán số trang và cắt dữ liệu 9 item/trang
  const totalItems = filteredCourses.length;
  const totalPages = Math.ceil(totalItems / ITEMS_PER_PAGE);

  const paginatedCourses = filteredCourses.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  return (
    <CoursesClientWrapper
      query={query}
      level={level}
      kind={kind}
      courses={paginatedCourses}
      totalPages={totalPages}
      currentPage={page}
    />
  );
}
