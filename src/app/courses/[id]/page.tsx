import { getCourseDetailApi } from '@/lib/api';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { CourseDetailClientWrapperAnimated } from './CourseDetailClientWrapperAnimated';

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

  if (!course) notFound();

  // Gửi course sang Client Component để render có animation
  return <CourseDetailClientWrapperAnimated course={course} />;
}
