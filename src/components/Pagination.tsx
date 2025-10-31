'use client';

import Link from 'next/link';
import { useSearchParams, usePathname } from 'next/navigation';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
}

export const Pagination = ({ currentPage, totalPages }: PaginationProps) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createPageURL = (pageNumber: number | string) => {
    const params = new URLSearchParams(searchParams);
    params.set('page', pageNumber.toString());
    return `${pathname}?${params.toString()}`;
  };

  if (totalPages <= 1) {
    return null; // Ẩn phân trang nếu chỉ có 1 trang
  }
  
  // Tạo 1 mảng các số trang, ví dụ: [1, 2, 3]
  const allPages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <nav className="flex items-center justify-center gap-2 mt-12">
      {/* Nút Lùi */}
      <Link
        href={createPageURL(currentPage - 1)}
        className={`px-3 py-2 rounded-lg bg-base hover:bg-muted
          ${currentPage === 1 ? 'pointer-events-none opacity-50' : ''}`}
      >
        <FaChevronLeft className="text-sm" />
      </Link>
      
      {/* Các nút số trang */}
      {allPages.map((page) => (
        <Link
          key={page}
          href={createPageURL(page)}
          className={`px-4 py-2 rounded-lg text-sm font-semibold
            ${currentPage === page
              ? 'bg-blue-600 text-white'
              : 'bg-base hover:bg-muted'
            }`}
        >
          {page}
        </Link>
      ))}

      {/* Nút Tiến */}
      <Link
        href={createPageURL(currentPage + 1)}
        className={`px-3 py-2 rounded-lg bg-base hover:bg-muted
          ${currentPage === totalPages ? 'pointer-events-none opacity-50' : ''}`}
      >
        <FaChevronRight className="text-sm" />
      </Link>
    </nav>
  );
};