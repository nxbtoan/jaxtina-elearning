export interface Lesson {
  id: string | number;
  courseId: string | number;
  title: string;
  duration: number;
  url: string;
  description: string;
  status: 'not-started' | 'completed';
  order: number;
}