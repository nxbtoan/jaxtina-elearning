'use client'; // Trang này cần 'use client' vì có nút "Mark as Completed"

import { use, useEffect, useState } from 'react';
import { useParams, useRouter } from 'next/navigation';
import { getCourseDetailApi } from '@/lib/api';
import { Course, Lesson } from '@/types';
import { useProgress } from '@/hooks/useProgress';
import Link from 'next/link';
import { FaCheckCircle } from 'react-icons/fa';

export default function LessonDetailPage() {
  const router = useRouter();
  const params = useParams(); // Hook để lấy { id: '...', lessonId: '...' }
  const { id, lessonId } = params;
  
  const { markLessonAsCompleted, isLessonCompleted } = useProgress();

  const [lesson, setLesson] = useState<Lesson | null>(null);
  const [courseTitle, setCourseTitle] = useState('');
  const [loading, setLoading] = useState(true);
  
  const courseId = id as string;
  const currentLessonId = lessonId as string;

  useEffect(() => {
    if (courseId) {
      getCourseDetailApi(courseId)
        .then(course => {
          setCourseTitle(course.title);
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
    return <div>Đang tải bài học...</div>;
  }

  if (!lesson) {
    return <div>Không tìm thấy bài học.</div>;
  }

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-md">
      {/* Nút Back */}
      <Link 
        href={`/courses/${courseId}`}
        className="text-blue-600 hover:underline mb-4 inline-block"
      >
        &larr; Back to Course
      </Link>
      
      {/* Tên bài học + số thứ tự */}
      <h1 className="text-3xl font-bold mb-2">
        {lesson.order}. {lesson.title}
      </h1>
      
      {/* Thời lượng */}
      <p className="text-gray-500 mb-4">{lesson.duration} phút</p>
      
      {/* Mô tả chi tiết */}
      <div className="prose max-w-none">
        <p>{lesson.description}</p>
        <p>Đây là nội dung chi tiết của bài học. (API dummyjson không có mô tả chi tiết cho bài học, nên chúng ta dùng mô tả ngắn).</p>
      </div>

      <hr className="my-6" />

      {/* Nút "Mark as Completed" */}
      <button
        onClick={handleMarkAsCompleted}
        disabled={isCompleted}
        className="w-full flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white 
                   font-semibold rounded-lg shadow-md
                   hover:bg-blue-700 transition-colors
                   disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {isCompleted ? (
          <>
            <FaCheckCircle /> Đã hoàn thành
          </>
        ) : (
          "Mark as Completed"
        )}
      </button>
    </div>
  );
}