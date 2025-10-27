export const CourseCardSkeleton = () => {
  return (
    <div className="block bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden animate-pulse">
      {/* 1. Hình ảnh */}
      <div className="aspect-video w-full bg-gray-300"></div>
      
      <div className="p-4">
        {/* 2. Loại và Level */}
        <div className="flex justify-between items-center mb-2">
          <div className="h-4 bg-gray-300 rounded w-1/4"></div>
          <div className="h-4 bg-gray-300 rounded w-1/6"></div>
        </div>
        
        {/* 3. Tên khóa học */}
        <div className="h-6 bg-gray-300 rounded w-3/4 mb-2"></div>
        
        {/* 4. Description */}
        <div className="h-4 bg-gray-300 rounded w-full mb-1"></div>
        <div className="h-4 bg-gray-300 rounded w-5/6 mb-4"></div>

        <div className="mt-auto">
          {/* 5. Số bài học */}
          <div className="h-4 bg-gray-300 rounded w-1/3 mb-2"></div>
          
          {/* 6. Progress Bar */}
          <div className="w-full bg-gray-300 rounded-full h-2.5"></div>
        </div>
      </div>
    </div>
  );
}

// Component Wrapper cho nhiều Skeleton
export const CourseListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <CourseCardSkeleton key={index} />
      ))}
    </div>
  );
};