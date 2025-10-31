export const CourseCardSkeleton = () => {
  return (
    <div className="
      block bg-[var(--bg-color)]
      border border-[var(--border-color)]
      rounded-lg shadow-md overflow-hidden animate-pulse
    ">
      <div className="aspect-video w-full bg-[var(--border-color)]"></div>

      <div className="p-4">
        <div className="flex justify-between items-center mb-2">
          <div className="h-4 bg-[var(--border-color)] rounded w-1/4"></div>
          <div className="h-4 bg-[var(--border-color)] rounded w-1/6"></div>
        </div>

        <div className="h-6 bg-[var(--border-color)] rounded w-3/4 mb-2"></div>
        <div className="h-4 bg-[var(--border-color)] rounded w-full mb-1"></div>
        <div className="h-4 bg-[var(--border-color)] rounded w-5/6 mb-4"></div>

        <div className="mt-auto">
          <div className="h-4 bg-[var(--border-color)] rounded w-1/3 mb-2"></div>
          <div className="w-full bg-[var(--border-color)] rounded-full h-2.5"></div>
        </div>
      </div>
    </div>
  );
};

export const CourseListSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: 6 }).map((_, index) => (
        <CourseCardSkeleton key={index} />
      ))}
    </div>
  );
};

export const LessonDetailSkeleton = () => {
  return (
    <div className="max-w-3xl mx-auto p-6 md:p-8 space-y-6 animate-pulse">
      {/* Back link */}
      <div className="h-4 bg-[var(--border-color)] rounded w-1/4 mb-4"></div>
      
      {/* Title */}
      <div className="h-8 bg-[var(--border-color)] rounded w-3/4 mb-2"></div>
      {/* Duration */}
      <div className="h-4 bg-[var(--border-color)] rounded w-1/6 mb-6"></div>
      
      {/* Video Placeholder */}
      <div className="aspect-video w-full bg-[var(--border-color)] rounded-lg"></div>
      
      {/* Description */}
      <div className="space-y-3 pt-4">
        <div className="h-4 bg-[var(--border-color)] rounded w-full"></div>
        <div className="h-4 bg-[var(--border-color)] rounded w-full"></div>
        <div className="h-4 bg-[var(--border-color)] rounded w-5/6"></div>
      </div>
      
      <hr className="my-6 border-[var(--border-color)]" />
      
      {/* Button */}
      <div className="h-12 bg-[var(--border-color)] rounded-lg w-full"></div>
    </div>
  );
};