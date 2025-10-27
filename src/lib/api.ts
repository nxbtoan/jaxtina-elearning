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
    thumbnail: product.thumbnail, // dummyjson có thumbnail
    price: product.price,
    tags: product.tags,
    
    // Dữ liệu giả lập
    level: levels[product.id % levels.length], // Lấy ngẫu nhiên
    kindOfCourse: kinds[product.id % kinds.length], // Lấy ngẫu nhiên
    totalLessons: Math.floor(Math.random() * 20) + 5, // 5-25 bài
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
  limit: number = 9,
  searchTerm: string = ''
): Promise<{ courses: Course[]; total: number }> => {
  let url = '';
  if (searchTerm) {
    // API tìm kiếm
    url = `https://dummyjson.com/products/search?q=${searchTerm}&limit=${limit}&skip=${(page - 1) * limit}`;
  } else {
    // API lấy list
    url = `https://dummyjson.com/products?limit=${limit}&skip=${(page - 1) * limit}`;
  }

  const res = await fetch(url);
  if (!res.ok) {
    throw new Error('Failed to fetch courses');
  }
  const data: ProductApiResponse = await res.json();

  // Ánh xạ (map) dữ liệu API về đúng interface Course
  const courses = data.products.map(mapProductToCourse);

  return { courses, total: data.total };
};

// Hàm fetch chi tiết khóa học (Sẽ dùng ở Ngày 3)
export const getCourseDetailApi = async (id: string): Promise<Course> => {
  const res = await fetch(`https://dummyjson.com/products/${id}`);
  if (!res.ok) {
    throw new Error('Failed to fetch course detail');
  }
  const product = await res.json();
  
  // Giả lập thêm danh sách bài học
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