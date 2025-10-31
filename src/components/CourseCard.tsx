'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Course } from '@/types';
import { ProgressBar } from './ProgressBar';
import { useProgress } from '@/hooks/useProgress';
import { motion } from 'framer-motion';

interface CourseCardProps {
  course: Course;
}

const cardVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export const CourseCard = ({ course }: CourseCardProps) => {
  const { getCourseProgress } = useProgress();
  const progress = getCourseProgress(String(course.id), course.totalLessons);

  const MotionLink = motion(Link);

  return (
    <MotionLink
      href={`/courses/${course.id}`}
      className="
        flex flex-col bg-base border border-base rounded-lg shadow-md
        transition-shadow duration-300 overflow-hidden h-full group"
      variants={cardVariants}
      whileHover={{ y: -6 }}
      transition={{ type: 'spring', stiffness: 300, damping: 20 }}
    >
      {/* Ảnh khóa học */}
      <div className="aspect-video w-full relative overflow-hidden">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          unoptimized
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover transition-transform duration-300 ease-in-out group-hover:scale-105"
        />
      </div>

      {/* Nội dung */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Loại & cấp độ */}
        <div className="flex justify-between items-center text-sm mb-2 gap-2">
          <span
            className="font-semibold text-xs
              bg-[var(--accent-color)]/10 text-[var(--accent-color)]
              px-2 py-0.5 rounded-full
            "
          >
            {course.kindOfCourse}
          </span>
          <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[var(--tag-bg)] text-[var(--tag-text)]">
            {course.level}
          </span>
        </div>

        {/* Tiêu đề */}
        <h3 className="text-lg font-bold text-base mb-2 line-clamp-2 h-[3.25rem]">
          {course.title}
        </h3>

        {/* Mô tả */}
        <p className="text-sm text-[var(--text-muted)] mb-4 line-clamp-2 h-[2.5rem]">
          {course.description}
        </p>

        {/* Tiến độ */}
        <div className="mt-auto">
          <div className="flex justify-between text-sm text-[var(--text-muted)] mb-2">
            <span>{course.totalLessons} bài học</span>
            <span>{progress}%</span>
          </div>

          <ProgressBar progress={progress} />
        </div>
      </div>
    </MotionLink>
  );
};