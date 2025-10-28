import { use } from 'react';
import { getCourseDetailApi } from '@/lib/api';
import { LessonItem } from '@/components/LessonItem';
import Image from 'next/image';
import { notFound } from 'next/navigation';

interface CourseDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { id } = await params;

  let course;
  try {
    course = await getCourseDetailApi(id);
  } catch (error) {
    notFound(); 
  }

  if (!course) {
    notFound();
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      
      {/* 1. Header (Ảnh cover + Tên khóa học) */}
      <div className="relative h-64 w-full rounded-lg overflow-hidden shadow-lg">
        <Image
          src={course.thumbnail}
          alt={course.title}
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
        <div className="absolute bottom-0 left-0 p-6">
          <h1 className="text-3xl md:text-4xl font-bold text-white shadow-text">
            {course.title}
          </h1>
        </div>
      </div>

      {/* 2. Mô tả đầy đủ */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-3 text-gray-800">
          Mô tả khóa học
        </h2>
        <p className="text-gray-700 leading-relaxed whitespace-pre-line">
          {course.description}
        </p>
      </div>

      {/* 3. Danh sách bài học */}
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-semibold mb-4 text-gray-800">
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
}