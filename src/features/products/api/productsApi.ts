import { cache } from 'react';
import {api} from '@/shared/config/axiosConfig';
import { ProductsResponse } from '../types/product.types';

export const getProducts = cache(async (
  page: number = 1,
  limit: number = 9
): Promise<ProductsResponse> => {
  const skip = (page - 1) * limit;
  
  const response = await api.get<ProductsResponse>('/products', {
    params: { limit, skip },
    next: {
      tags: ['products'],
      revalidate: 60, 
    },
  });
  
  return response.data;
});