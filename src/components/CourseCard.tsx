'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types';
import { ProgressBar } from './ProgressBar';
import { useProgress } from '@/hooks/useProgress';

interface CourseCardProps {
  course: Course;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  const { getCourseProgress } = useProgress();
  const progress = getCourseProgress(String(course.id), course.totalLessons);

  return (
    <Link 
      href={`/courses/${course.id}`}
      className="flex flex-col bg-white border border-gray-200 rounded-lg shadow-md
                 hover:shadow-lg transition-shadow duration-300 overflow-hidden h-full"
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
      
      <div className="p-4 flex flex-col flex-grow">
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
        
        {/* 4. Description */}
        <p className="text-sm text-gray-700 mb-4 line-clamp-2 h-[2.5rem]">
          {course.description}
        </p>

        {/* 5. Số bài học  */}
        <div className="mt-auto">
          <div className="flex justify-between text-sm text-gray-500 mb-2">
            <span>{course.totalLessons} bài học</span>
            <span>{progress}%</span>
          </div>
          
          {/* 6. Truyền progress */}
          <ProgressBar progress={progress} />
        </div>
      </div>
    </Link>
  );
};