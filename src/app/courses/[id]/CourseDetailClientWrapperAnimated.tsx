'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Course } from '@/types';
import { CourseDetailClientWrapper } from './CourseDetailClientWrapper';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export function CourseDetailClientWrapperAnimated({ course }: { course: Course }) {
  return (
    <motion.div
      className="max-w-4xl mx-auto space-y-6 pb-12"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Header */}
      <motion.div
        className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg"
        variants={itemVariants}
      >
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <div className="flex gap-2 mb-2">
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/90 text-[var(--accent-color)]">
              {course.kindOfCourse}
            </span>
            <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-white/90 text-gray-800">
              {course.level}
            </span>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white shadow-text">
            {course.title}
          </h1>
        </div>
      </motion.div>

      {/* Mô tả */}
      <motion.div
        className="bg-base border border-base p-6 rounded-lg shadow-md"
        variants={itemVariants}
      >
        <h2 className="text-2xl font-semibold mb-3 text-base">
          Mô tả khóa học
        </h2>
        <p className="text-[var(--text-muted)] leading-relaxed whitespace-pre-line">
          {course.description}
        </p>
      </motion.div>

      {/* Phần nội dung client */}
      <motion.div variants={itemVariants}>
        <CourseDetailClientWrapper course={course} />
      </motion.div>
    </motion.div>
  );
}
