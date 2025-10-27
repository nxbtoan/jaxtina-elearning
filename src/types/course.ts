import { Lesson } from './lesson';

export interface Course {
  id: string | number; // Dùng number cho dummyjson
  title: string;
  description: string;
  thumbnail: string;
  level: 'S' | 'Pres' | 'TC' | 'MTC';
  kindOfCourse: 'IELTS' | 'TOEIC' | '4SKILLS' | 'VSTEP';
  totalLessons: number;
  progress: number;
  status?: 'not-started' | 'in-progress' | 'completed';
  lessons: Lesson[];
  price: number;
  tags: string[];
}