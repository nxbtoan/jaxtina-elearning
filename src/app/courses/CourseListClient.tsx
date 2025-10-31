'use client';

import { Course } from '@/types';
import { CourseCard } from '@/components/CourseCard';
import { motion } from 'framer-motion';
import { FaSearchMinus } from 'react-icons/fa';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export const CourseListClient = ({ courses }: { courses: Course[] }) => {
  if (courses.length === 0) {
    return (
      <motion.div 
        className="flex flex-col items-center justify-center text-center py-16 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <FaSearchMinus className="text-6xl text-[var(--text-muted)] mb-4" />
        <h2 className="text-2xl font-semibold text-base">
          Không tìm thấy kết quả
        </h2>
        <p className="text-[var(--text-muted)] max-w-xs">
          Hãy thử tìm kiếm với từ khóa hoặc bộ lọc khác nhé.
        </p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {courses.map((course: Course, index) => (
        <CourseCard key={`${course.id}-${index}`} course={course} />
      ))}
    </motion.div>
  );
};