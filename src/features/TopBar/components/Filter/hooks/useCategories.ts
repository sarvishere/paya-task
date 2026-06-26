'use client';

import { useQuery } from '@tanstack/react-query';
import { getCategories } from '@/shared/config/apis/productsApi';

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: getCategories,
    staleTime: 5 * 60 * 1000,
    gcTime: 10 * 60 * 1000, 
    retry: 2, 
  });
};

export const useCategoriesWithStatus = () => {
  const { data, isLoading, error } = useCategories();
  
  return {
    categories: data || [],
    isLoading,
    error: error?.message || null,
  };
};