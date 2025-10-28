'use client';

import { useLocalStorage } from '@/hooks/useLocalStorage';

export function useProgress() {
    // Lưu toàn bộ tiến độ học của user trong localStorage
    const [progress, setProgress] = useLocalStorage<Record<string, string[]>>(
        'lesson-progress',
        {}
    );

    // Đánh dấu bài học là đã hoàn thành
    const markLessonAsCompleted = (courseId: string, lessonId: string) => {
        setProgress(prev => {
        const completed = prev[courseId] || [];
        if (!completed.includes(lessonId)) {
            return { ...prev, [courseId]: [...completed, lessonId] };
        }
        return prev;
        });
    };

    // Kiểm tra xem bài học đã hoàn thành chưa
    const isLessonCompleted = (courseId: string, lessonId: string) => {
        const completed = progress[courseId] || [];
        return completed.includes(lessonId);
    };

    // Tính phần trăm tiến độ của khóa học
    const getCourseProgress = (courseId: string, totalLessons: number) => {
        const completed = progress[String(courseId)] || [];
        if (totalLessons === 0) return 0;
        const percent = Math.round((completed.length / totalLessons) * 100);
        return percent;
    };

    return { 
        progress, 
        markLessonAsCompleted, 
        isLessonCompleted,
        getCourseProgress,
    };
}
