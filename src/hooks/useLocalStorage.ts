'use client';

import { useState, useEffect } from 'react';

function getStorageValue<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') {
    return defaultValue;
  }
  
  const saved = localStorage.getItem(key);
  try {
    return saved ? (JSON.parse(saved) as T) : defaultValue;
  } catch (error) {
    console.error('Failed to parse localStorage item', error);
    return defaultValue;
  }
}

export function useLocalStorage<T>(key: string, defaultValue: T) {
  const [value, setValue] = useState<T>(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }, [key, value]);

  return [value, setValue] as const;
}