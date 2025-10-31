'use client';

import { motion } from 'framer-motion';
import { Suspense } from 'react';
import { CourseListClient } from './CourseListClient';
import { CourseListSkeleton } from '@/components/LoadingSkeleton';
import { SearchAndFilter } from './SearchAndFilter';
import { Pagination } from '@/components/Pagination'; // 1. Import component mới

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

// 2. Nhận props mới: totalPages và currentPage
export function CoursesClientWrapper({ 
  query, 
  level, 
  kind, // Nhận kind
  courses, 
  totalPages, 
  currentPage 
}: any) {
  return (
    <motion.div
      className="container mx-auto px-4 py-8 space-y-8"
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.h1 className="text-3xl font-bold text-base" variants={itemVariants}>
        Khám phá Khóa học
      </motion.h1>

      <motion.div variants={itemVariants}>
        {/* SearchAndFilter sẽ tự lấy state từ URL, không cần truyền props */}
        <SearchAndFilter />
      </motion.div>

      <motion.div variants={itemVariants}>
        {/* Suspense key cần update để re-render khi filter */}
        <Suspense key={query + level + kind} fallback={<CourseListSkeleton />}>
          {/* CourseListClient chỉ nhận 9 item, render siêu nhanh */}
          <CourseListClient courses={courses} />
        </Suspense>
      </motion.div>

      {/* 3. Render Pagination */}
      <motion.div variants={itemVariants}>
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </motion.div>
    </motion.div>
  );
}