'use client';

import Link from 'next/link';
import { Lesson } from '@/types';
import { FaPlayCircle, FaCheckCircle, FaLock } from 'react-icons/fa';
import { useProgress } from '@/hooks/useProgress';

interface LessonItemProps {
  lesson: Lesson;
  courseId: string | number;
}

export const LessonItem = ({ lesson, courseId }: LessonItemProps) => {
  const { isLessonCompleted } = useProgress();
  const isCompleted = isLessonCompleted(String(courseId), String(lesson.id));

  const getIcon = () => {
    if (isCompleted) {
      return <FaCheckCircle className="text-green-500" />;
    }
    return <FaPlayCircle className="text-blue-500" />;
  };

  return (
    <Link
      href={`/courses/${courseId}/lessons/${lesson.id}`}
      className={`flex items-center justify-between p-4 rounded-lg transition-colors ${isCompleted ? 'bg-green-50' : 'bg-gray-50 hover:bg-gray-100'}`}
    >
      <div className="flex items-center gap-4">
        <div className="text-xl">{getIcon()}</div>
        
        <div>
          {/* 2. Tên bài học & Số thứ tự */}
          <h3 className={`text-md font-medium ${isCompleted ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
            {lesson.order}. {lesson.title}
          </h3>
          
          {/* 3. Thời lượng */}
          <span className="text-sm text-gray-500">{lesson.duration} phút</span>
        </div>
      </div>

      {/* 4. Trạng thái (text) */}
      <span className="text-sm font-medium">
        {isCompleted ? (
          <span className="text-green-600">Hoàn thành</span>
        ) : (
          <span className="text-gray-500">Chưa học</span>
        )}
      </span>
    </Link>
  );
};