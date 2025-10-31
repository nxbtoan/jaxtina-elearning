'use client';

import { useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCourseDetailApi } from '@/lib/api';
import { Lesson } from '@/types';
import { useProgress } from '@/hooks/useProgress';
import Link from 'next/link';
import { FaCheckCircle, FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import { LessonDetailSkeleton } from '@/components/LoadingSkeleton';

const pageVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function LessonDetailPage() {
  const router = useRouter();
  const params = useParams();
  const { id, lessonId } = params;
  
  const { markLessonAsCompleted, isLessonCompleted } = useProgress();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);
  
  const courseId = id as string;
  const currentLessonId = lessonId as string;

  useEffect(() => {
    if (courseId) {
      setLoading(true);
      getCourseDetailApi(courseId)
        .then(course => {
          const foundLesson = course.lessons.find(l => l.id.toString() === currentLessonId);
          setLesson(foundLesson || null);
        })
        .catch(err => console.error(err))
        .finally(() => setLoading(false));
    }
  }, [courseId, currentLessonId]);

  const handleMarkAsCompleted = () => {
    markLessonAsCompleted(courseId, currentLessonId);
  };
  
  const isCompleted = isLessonCompleted(courseId, currentLessonId);

  if (loading) {
    return <LessonDetailSkeleton />;
  }

  if (!lesson) {
    return (
      <div className="text-center text-base">
        Không tìm thấy bài học.
      </div>
    );
  }

  return (
    <motion.div 
      className="max-w-3xl mx-auto bg-base border border-base p-6 md:p-8 rounded-lg shadow-lg" 
      variants={pageVariants}
      initial="hidden"
      animate="visible"
    >
      <motion.div variants={itemVariants}>
        <Link 
          href={`/courses/${courseId}`}
          className="
            text-[var(--accent-color)] hover:underline mb-4 inline-flex items-center gap-2
            transition-colors
          "
        >
          <FaArrowLeft />
          Trở về khóa học
        </Link>
      </motion.div>
      
      {/* Tên bài học & Thời lượng */}
      <motion.div variants={itemVariants}>
        <h1 className="text-3xl font-bold mb-2 text-base">
          {lesson.order}. {lesson.title}
        </h1>
        <p className="text-[var(--text-muted)] mb-6">
          {lesson.duration} phút
        </p>
      </motion.div>

      <motion.div variants={itemVariants} className="mb-6">
        <div 
          className="
            aspect-video w-full bg-gray-200 dark:bg-gray-800 
            rounded-lg flex items-center justify-center
            border border-[var(--border-color)]
          "
        >
          <video 
            className="w-full h-full object-cover" 
            controls 
            poster="/video-placeholder.png"
          >
            <source src="/video-placeholder.mp4" type="video/mp4" />
          </video>
          {/* <span className="text-[var(--text-muted)]">Video Player Placeholder</span> */}
        </div>
      </motion.div>
      
      {/* Mô tả chi tiết */}
      <motion.div 
        variants={itemVariants} // item 4
        className="
          prose prose-lg dark:prose-invert max-w-none 
          text-base mb-6
        "
      >
        <p>
          {lesson.description}
        </p>

      </motion.div>

      <hr className="my-6 border-base" />

      <motion.button
        onClick={handleMarkAsCompleted}
        disabled={isCompleted}
        className={`
          w-full flex items-center justify-center gap-2 px-6 py-3 
          font-semibold rounded-lg shadow-md transition-all duration-300
          ${isCompleted
            ? 'bg-green-500 text-white opacity-90 cursor-not-allowed'
            : 'bg-[var(--accent-color)] text-white hover:bg-blue-700 dark:hover:bg-blue-500'
          }
        `}
        whileTap={{ scale: 0.98 }}
      >
        <AnimatePresence mode="wait">
          {isCompleted ? (
            <motion.span
              key="completed"
              className="flex items-center justify-center gap-2"
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.5 }}
            >
              <FaCheckCircle /> Đã hoàn thành
            </motion.span>
          ) : (
            <motion.span
              key="incomplete"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              Đánh dấu là đã hoàn thành
            </motion.span>
          )}
        </AnimatePresence>
      </motion.button>
    </motion.div>
  );
}