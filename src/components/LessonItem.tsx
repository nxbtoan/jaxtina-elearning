import Link from 'next/link';
import { Lesson } from '@/types';
import { FaPlayCircle, FaCheckCircle, FaLock } from 'react-icons/fa';

interface LessonItemProps {
  lesson: Lesson;
  courseId: string | number;
}

export const LessonItem = ({ lesson, courseId }: LessonItemProps) => {
  const getIcon = () => {
    if (lesson.status === 'completed') {
      return <FaCheckCircle className="text-green-500" />;
    }
    // Giả sử (tạm thời) chỉ bài 1 là mở
    if (lesson.order > 1) {
      // return <FaLock className="text-gray-400" />; // Khóa
      return <FaPlayCircle className="text-gray-400" />; // Mở khóa để test
    }
    return <FaPlayCircle className="text-blue-500" />;
  };

  return (
    <Link
      href={`/courses/${courseId}/lessons/${lesson.id}`}
      className="flex items-center justify-between p-4 bg-gray-50 
                 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
    >
      <div className="flex items-center gap-4">
        <div className="text-xl">{getIcon()}</div>
        
        <div>
          [cite_start]{/* 2. Tên bài học & Số thứ tự */}
          <h3 className="text-md font-medium text-gray-900">
            {lesson.order}. {lesson.title}
          </h3>
          
          [cite_start]{/* 3. Thời lượng */}
          <span className="text-sm text-gray-500">{lesson.duration} phút</span>
        </div>
      </div>

      [cite_start]{/* 4. Trạng thái (text) */}
      <span className="text-sm font-medium">
        {lesson.status === 'completed' ? (
          <span className="text-green-600">Hoàn thành</span>
        ) : (
          <span className="text-gray-500">Chưa học</span>
        )}
      </span>
    </Link>
  );
};