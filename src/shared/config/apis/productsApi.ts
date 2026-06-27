'use server';

import { unstable_cache } from 'next/cache';
import { Product, ProductsResponse } from '../../types/product.types';
import { serverApi } from '../axiosConfig';

export interface Category {
  slug: string;
  name: string;
  url?: string;
}

const fetchCategories = unstable_cache(
  async (): Promise<Category[]> => {
    const res = await serverApi.get<Category[]>('/products/categories');
    return res.data;
  },
  ['categories'],
  { revalidate: 5 * 60, tags: ['categories'] }
);

const fetchProducts = unstable_cache(
  async (page: number, limit: number, category: string | null) => {
    const skip = (page - 1) * limit;
    const endpoint = category ? `/products/category/${category}` : '/products';
    const res = await serverApi.get<ProductsResponse>(endpoint, {
      params: { limit, skip },
    });
    return res.data;
  },
  ['products-list'],
  { revalidate: 60, tags: ['products'] }
);

const fetchSearchProducts = unstable_cache(
  async (query: string, limit?: number) => {
    if (!query.trim()) return { products: [], total: 0, skip: 0, limit: limit || 0 };
    const res = await serverApi.get<ProductsResponse>('/products/search', {
      params: {
        q: query.trim(),
        select: 'title,price,thumbnail,description,brand,category',
        ...(limit ? { limit } : {}),
      },
    });
    return res.data;
  },
  ['products-search'],
  { revalidate: 30, tags: ['products', 'search'] }
);

const fetchProduct = unstable_cache(
  async (id: string): Promise<Product> => {
    const res = await serverApi.get<Product>(`/products/${id}`);
    return res.data;
  },
  ['product-detail'],
  { revalidate: 60, tags: ['products', 'detail'] }
);

export async function getCategories() {
  return fetchCategories();
}

export async function getProducts(
  page: number = 1,
  limit: number = 9,
  category: string | null = null
) {
  return fetchProducts(page, limit, category);
}

export async function searchProducts(query: string, limit?: number) {
  return fetchSearchProducts(query, limit);
}

export async function getProduct(id: string) {
  return fetchProduct(id);
}