import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types';
import { ProgressBar } from './ProgressBar';

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link 
      href={`/courses/${course.id}`}
      className="block bg-white border border-gray-200 rounded-lg shadow-md
                 hover:shadow-lg transition-shadow duration-300 overflow-hidden"
    >
      {/* 1. Hình ảnh thumbnail (16:9) */}
      <div className="aspect-video w-full relative overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover"
        />
      </div>
      
      <div className="p-4 flex flex-col h-[calc(100%-11.25rem)]">
        {/* 2. Loại và Level */}
        <div className="flex justify-between items-center text-sm text-gray-500 mb-2">
          <span className="font-semibold text-blue-600">{course.kindOfCourse}</span>
          <span className="px-2 py-0.5 bg-gray-200 text-gray-800 rounded-full text-xs font-bold">
            {course.level}
          </span>
        </div>
        
        {/* 3. Tên khóa học */}
        <h3 className="text-lg font-bold text-gray-900 mb-2 line-clamp-2 h-[3.25rem]">
          {course.title}
        </h3>
        
        {/* 4. Description (truncate 2 dòng) */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-2 h-[2.5rem]">
          {course.description}
        </p>

        <div className="mt-auto">
          {/* 5. Số bài học */}
          <div className="text-sm text-gray-500 mb-2">
            {course.totalLessons} bài học
          </div>
          
          {/* 6. Progress Bar */}
          <ProgressBar progress={course.progress} />
        </div>
      </div>
    </Link>
  );
};