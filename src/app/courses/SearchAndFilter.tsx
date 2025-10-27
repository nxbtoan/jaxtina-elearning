'use client';

import { useState } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';

export function SearchAndFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Lấy giá trị từ URL để giữ state khi load lại trang
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [level, setLevel] = useState(searchParams.get('level') || 'All');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    updateURL();
  };
  
  const handleFilterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setLevel(e.target.value);
    // Cập nhật URL ngay khi filter
    updateURL(searchTerm, e.target.value); 
  };
  
  // Hàm này cập nhật URL mà không reload lại trang
  const updateURL = (query = searchTerm, filterLevel = level) => {
    const params = new URLSearchParams(searchParams);
    if (query) {
      params.set('q', query);
    } else {
      params.delete('q');
    }
    
    if (filterLevel && filterLevel !== 'All') {
      params.set('level', filterLevel);
    } else {
      params.delete('level');
    }
    
    // Dùng router.push để cập nhật URL, Server Component sẽ tự động re-fetch
    router.push(`${pathname}?${params.toString()}`);
  }

  return (
    <form onSubmit={handleSearch} className="flex flex-col md:flex-row gap-4">
      {/* Input Search  */}
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Tìm kiếm khóa học..."
        className="flex-grow px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      
      {/* Filter theo độ khó  */}
      <select
        value={level}
        onChange={handleFilterChange}
        className="px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
      >
        <option value="All">Tất cả độ khó</option>
        <option value="S">S</option>
        <option value="Pres">Pres</option>
        <option value="TC">TC</option>
        <option value="MTC">MTC</option>
      </select>
      
      <button 
        type="submit"
        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
      >
        Tìm
      </button>
    </form>
  );
}