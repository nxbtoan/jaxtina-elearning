'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname, useSearchParams } from 'next/navigation';
import { FaSearch, FaChevronDown } from 'react-icons/fa';
import { motion } from 'framer-motion';

export function SearchAndFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // State cho 3 bộ lọc
  const [searchTerm, setSearchTerm] = useState(searchParams.get('q') || '');
  const [level, setLevel] = useState(searchParams.get('level') || 'All');
  const [kind, setKind] = useState(searchParams.get('kind') || 'All'); // THÊM MỚI
  
  const [debouncedSearchTerm, setDebouncedSearchTerm] = useState(searchTerm);

  // Debounce search input
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedSearchTerm(searchTerm);
    }, 500);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  // Hook chính để cập nhật URL
  useEffect(() => {
    const params = new URLSearchParams(searchParams);
    
    // 1. Xử lý Search Term
    if (debouncedSearchTerm) {
      params.set('q', debouncedSearchTerm);
    } else {
      params.delete('q');
    }
    
    // 2. Xử lý Level
    if (level && level !== 'All') {
      params.set('level', level);
    } else {
      params.delete('level');
    }

    // 3. Xử lý Kind (MỚI)
    if (kind && kind !== 'All') {
      params.set('kind', kind);
    } else {
      params.delete('kind');
    }
    
    // 4. RESET TRANG (QUAN TRỌNG)
    // Khi filter, luôn quay về trang 1
    params.delete('page');

    // Chỉ push nếu URL thực sự thay đổi
    if (params.toString() !== searchParams.toString()) {
      router.push(`${pathname}?${params.toString()}`);
    }
  // Thêm `kind` vào dependencies
  }, [debouncedSearchTerm, level, kind, pathname, router]);


  const inputStyle = `
    w-full pl-10 pr-4 py-2.5 rounded-lg 
    bg-base 
    text-base 
    border border-base 
    focus:outline-none focus:ring-2 focus:ring-[var(--accent-color)] focus:border-[var(--accent-color)]
    transition-all
  `;
  
  const selectWrapperStyle = "relative w-full md:w-auto md:min-w-[180px]";
  const selectStyle = `${inputStyle} pr-10 appearance-none`;
  const selectIcon = "absolute top-1/2 right-4 -translate-y-1/2 text-[var(--text-muted)] pointer-events-none";

  return (
    <motion.div 
      className="flex flex-col md:flex-row gap-4"
    >
      {/* Search Input */}
      <div className="relative flex-grow">
        <FaSearch 
          className="absolute top-1/2 left-3 -translate-y-1/2 text-[var(--text-muted)]" 
        />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Tìm kiếm khóa học..."
          className={inputStyle}
        />
      </div>
      
      {/* Filter Level */}
      <div className={selectWrapperStyle}>
        <select
          value={level}
          onChange={(e) => setLevel(e.target.value)}
          className={selectStyle}
        >
          <option value="All">Tất cả độ khó</option>
          <option value="S">S</option>
          <option value="Pres">Pres</option>
          <option value="TC">TC</option>
          <option value="MTC">MTC</option>
        </select>
        <FaChevronDown className={selectIcon} />
      </div>

      {/* Filter Kind (MỚI) */}
      <div className={selectWrapperStyle}>
        <select
          value={kind}
          onChange={(e) => setKind(e.target.value)}
          className={selectStyle}
        >
          <option value="All">Tất cả loại</option>
          <option value="IELTS">IELTS</option>
          <option value="TOEIC">TOEIC</option>
          <option value="4SKILLS">4SKILLS</option>
          <option value="VSTEP">VSTEP</option>
        </select>
        <FaChevronDown className={selectIcon} />
      </div>
      
    </motion.div>
  );
}