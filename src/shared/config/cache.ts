import { cache } from 'react';
import {api} from '@/shared/config/axiosConfig';

export const cachedApiCall = cache(async <T>(
  url: string,
  params?: Record<string, any>
): Promise<T> => {
  const response = await api.get<T>(url, { params });
  return response.data;
});

export const fetchWithCache = async <T>(
  url: string,
  options: {
    tags?: string[];
    revalidate?: number;
    params?: Record<string, any>;
  } = {}
): Promise<T> => {
  const { tags = [], revalidate = 60, params = {} } = options;
  
  const response = await api.get<T>(url, {
    params,
    next: {
      tags,
      revalidate,
    },
  });
  
  return response.data;
};