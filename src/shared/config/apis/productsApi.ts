import { unstable_cache } from 'next/cache';
import { api } from '../axiosConfig';
import { ProductsResponse } from '../../types/product.types';

export interface Category {
  slug: string;
  name: string;
  url?: string;
}

export const getCategories = async (): Promise<Category[]> => {
  const response = await api.get<Category[]>('/products/categories');
  return response.data;
};

export const getCategoryList = async (): Promise<string[]> => {
  const response = await api.get<string[]>('/products/category-list');
  return response.data;
};


export const searchProducts = unstable_cache(
  async (query: string, limit?: number) => {
    if (!query.trim()) {
      return { products: [], total: 0, skip: 0, limit: limit || 0 };
    }

    const params: Record<string, unknown> = {
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
  async (page: number = 1, limit: number = 9, category: string | null = null) => {
    const skip = (page - 1) * limit;

    const endpoint = category
      ? `/products/category/${category}`
      : '/products';

    const response = await api.get<ProductsResponse>(endpoint, {
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