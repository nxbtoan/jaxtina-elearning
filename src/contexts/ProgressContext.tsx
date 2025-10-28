'use client';

import { createContext, ReactNode, useContext } from 'react';
import { useLocalStorage } from '@/hooks/useLocalStorage';
import { Lesson } from '@/types';

type ProgressState = Record<string | number, (string | number)[]>;

interface ProgressContextType {
  progress: ProgressState;
  isLessonCompleted: (courseId: string | number, lessonId: string | number) => boolean;
  markLessonAsCompleted: (courseId: string | number, lessonId: string | number) => void;
  getCourseProgress: (courseId: string | number, totalLessons: number) => number;
}

const ProgressContext = createContext<ProgressContextType | undefined>(undefined);

export const ProgressProvider = ({ children }: { children: ReactNode }) => {
  const [progress, setProgress] = useLocalStorage<ProgressState>('lessonProgress', {});

  // 1. Hàm check xem bài học đã hoàn thành chưa
  const isLessonCompleted = (courseId: string | number, lessonId: string | number) => {
    return progress[courseId]?.includes(lessonId) || false;
  };

  // 2. Hàm đánh dấu hoàn thành
  const markLessonAsCompleted = (courseId: string | number, lessonId: string | number) => {
    setProgress(prevProgress => {
      const courseLessons = prevProgress[courseId] || [];
      if (courseLessons.includes(lessonId)) {
        return prevProgress;
      }
      
      const newCourseProgress = [...courseLessons, lessonId];
      
      return {
        ...prevProgress,
        [courseId]: newCourseProgress,
      };
    });
  };
  
  // 3. Hàm tính % tiến độ khóa học
  const getCourseProgress = (courseId: string | number, totalLessons: number) => {
    if (totalLessons === 0) return 0;
    const completedCount = progress[courseId]?.length || 0;
    return Math.round((completedCount / totalLessons) * 100);
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      isLessonCompleted,
      markLessonAsCompleted,
      getCourseProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
};

// 4. Custom hook
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (context === undefined) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};