'use client';

import { useQuery } from '@tanstack/react-query';
import { searchProducts } from '@/shared/config/apis/productsApi';
import { ProductsResponse } from '@/shared/types/product.types';

export const useProductSearch = (debouncedTerm: string) => {
  return useQuery<ProductsResponse, Error>({
    queryKey: ['products', 'search', debouncedTerm],
    queryFn: () => searchProducts(debouncedTerm),
    enabled: debouncedTerm.length >= 2,
    staleTime: 30 * 1000,
    gcTime: 5 * 60 * 1000,
  });
};