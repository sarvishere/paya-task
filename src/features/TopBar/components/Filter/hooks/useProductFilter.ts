'use client';

import { useProducts } from "@/features/products/hooks/useProducts";


interface UseProductFilterProps {
  category: string | null;
  search?: string; 
  page?: number;
  limit?: number;
}

export const useProductFilter = ({
  category,
  page = 1,
  limit = 9,
}: UseProductFilterProps) => {
  return useProducts(page, limit, category);
};