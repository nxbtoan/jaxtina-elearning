/* CourseDetailClientWrapper.tsx */
'use client';

import { Course } from '@/types';
import { useProgress } from '@/hooks/useProgress';
import { ProgressBar } from '@/components/ProgressBar';
import { LessonItem } from '@/components/LessonItem';
import { FaTasks, FaListOl } from 'react-icons/fa'; // Thêm icons

interface CourseDetailClientWrapperProps {
  course: Course;
}

export const CourseDetailClientWrapper = ({
  course,
}: CourseDetailClientWrapperProps) => {
  const { getCourseProgress } = useProgress();
  const progress = getCourseProgress(String(course.id), course.totalLessons);

  return (
    <div className="space-y-6">
      {/* NÂNG CẤP: Thêm khối Tiến độ học tập (BONUS) */}
      <div className="bg-base border border-base p-6 rounded-lg shadow-md">
        <div className="flex justify-between items-center mb-3">
          <h2 className="text-2xl font-semibold text-base flex items-center gap-2">
            <FaTasks className="text-[var(--accent-color)]" />
            Tiến độ học tập
          </h2>
          <span className="text-lg font-bold text-[var(--accent-color)]">
            {progress}%
          </span>
        </div>
        <p className="text-[var(--text-muted)] mb-4">
          Hoàn thành các bài học để cập nhật tiến độ của bạn.
        </p>
        <ProgressBar progress={progress} />
      </div>

      {/* 3. Danh sách bài học */}
      <div className="bg-base border border-base p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-base flex items-center gap-2">
          <FaListOl className="text-[var(--accent-color)]" />
          Nội dung khóa học ({course.lessons.length} bài)
        </h2>
        <div className="space-y-3">
          {course.lessons.map((lesson) => (
            <LessonItem
              key={lesson.id}
              lesson={lesson}
              courseId={course.id}
            />
          ))}
        </div>
      </div>
    </div>
  );
};