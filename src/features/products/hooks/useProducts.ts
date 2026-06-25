'use client';

import { useQuery } from '@tanstack/react-query';
import { keepPreviousData } from '@tanstack/react-query'
import { getProducts } from '@/shared/config/apis/productsApi';
import { ProductsResponse } from '@/shared/types/product.types';

export const useProducts = (page: number = 1, limit: number = 9) => {
  return useQuery<ProductsResponse>({
    queryKey: ['products', 'list', { page, limit }],
    queryFn: () => getProducts(page, limit),
    staleTime: 5 * 60 * 1000,
    placeholderData: keepPreviousData,
  });
};