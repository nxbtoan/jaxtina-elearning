import { Course } from '@/types';

// Giả lập data theo đúng interface yêu cầu
const mapProductToCourse = (product: any): Course => {
  // Giả lập dữ liệu Level và KindOfCourse
  const levels: Course['level'][] = ['S', 'Pres', 'TC', 'MTC'];
  const kinds: Course['kindOfCourse'][] = ['IELTS', 'TOEIC', '4SKILLS', 'VSTEP'];

  return {
    id: product.id,
    title: product.title,
    description: product.description,
    thumbnail: product.thumbnail,
    price: product.price,
    tags: product.tags,
    
    // Dữ liệu giả lập
    level: levels[product.id % levels.length],
    kindOfCourse: kinds[product.id % kinds.length],
    totalLessons: (product.id % 10) + 10,
    progress: 0,
    status: 'not-started',
    lessons: [],
  };
};

// Interface cho dữ liệu trả về từ dummyjson
interface ProductApiResponse {
  products: any[];
  total: number;
  skip: number;
  limit: number;
}

// Hàm fetch danh sách khóa học (Products)
export const getCoursesApi = async (
  page: number = 1,
  limit: number = 100,
): Promise<{ courses: Course[]; total: number }> => {

  const url = `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`;

  const res = await fetch(url, { next: { revalidate: 60 } });
  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }
  const data: ProductApiResponse = await res.json();

  const courses = data.products.map(mapProductToCourse);

  return { courses, total: data.total };
};

// Hàm fetch chi tiết khóa học
export const getCourseDetailApi = async (id: string): Promise<Course> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch course detail');
  }
  const product = await res.json();
  
  const course = mapProductToCourse(product);
  course.lessons = Array.from({ length: course.totalLessons }, (_, i) => ({
      id: `${course.id}-${i + 1}`,
      courseId: course.id,
      title: `Bài ${i + 1}: ${product.title} intro`,
      duration: Math.floor(Math.random() * 15) + 5, // 5-20 phút
      url: 'https.dummyvideo.com',
      description: `Chi tiết cho bài học ${i + 1}`,
      status: 'not-started',
      order: i + 1,
  }));
  
  return course;
}