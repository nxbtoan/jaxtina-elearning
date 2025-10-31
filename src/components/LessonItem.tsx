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
      return <FaCheckCircle className="text-green-600" />;
    }
    return <FaPlayCircle className="text-[var(--accent-color)]" />;
  };

  return (
    <Link
      href={`/courses/${courseId}/lessons/${lesson.id}`}
      className={`
        flex items-center justify-between p-4 rounded-lg
        transition-all duration-200
        ${isCompleted 
          ? 
            'bg-green-100 hover:bg-green-200 text-gray-800 shadow-sm'
          : 
            'bg-transparent border border-[var(--border-color)] hover:bg-[var(--tag-bg)]'
        }
      `}
    >
      <div className="flex items-center gap-4">
        <div className="text-xl">{getIcon()}</div>

        <div>
          <h3
            className={`
            text-md font-medium
            ${
              isCompleted
                ? 'line-through'
                : 'text-[var(--text-color)]'
            }
          `}
          >
            {lesson.order}. {lesson.title}
          </h3>

          <span className="text-sm text-[var(--text-muted)]">
            {lesson.duration} phút
          </span>
        </div>
      </div>

      <span className="text-sm font-medium">
        {isCompleted ? (
          <span className="text-green-600 dark:text-green-400">Hoàn thành</span>
        ) : (
          <span className="text-[var(--text-muted)]">Chưa học</span>
        )}
      </span>
    </Link>
  );
};