// src/shared/config/apis/productsApi.ts
import { unstable_cache } from 'next/cache';
import { api } from '../axiosConfig';
import { ProductsResponse } from '../../types/product.types';

export const searchProducts = unstable_cache(
  async (query: string, limit?: number) => {  
    if (!query.trim()) {
      return { products: [], total: 0, skip: 0, limit: limit || 0 };
    }

    const params: any = {
      q: query.trim(),
      select: 'title,price,thumbnail,description,brand,category',
    };

    if (limit) {
      params.limit = limit;
    }

    const response = await api.get<ProductsResponse>('/products/search', {
      params,
    });

    return response.data;
  },
  ['products', 'search'],
  {
    revalidate: 30,
    tags: ['products', 'search'],
  }
);

export const getProducts = unstable_cache(
  async (page: number = 1, limit: number = 9) => {
    const skip = (page - 1) * limit;
    const response = await api.get<ProductsResponse>('/products', {
      params: { limit, skip },
    });
    return response.data;
  },
  ['products'],
  {
    revalidate: 60,
    tags: ['products'],
  }
);