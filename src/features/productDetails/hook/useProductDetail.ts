'use client';

import { useQuery } from '@tanstack/react-query';
import { getProduct } from '@/shared/config/apis/productsApi';

export function useProductDetail(id: string) {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => getProduct(id),
    enabled: !!id,
    staleTime: 5 * 60 * 1000, 
    gcTime: 10 * 60 * 1000, 
    retry: 2,
    refetchOnWindowFocus: false,
  });
}