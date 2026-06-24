import axios from 'axios';
import { cache } from 'react'; 

export const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const cachedGet = cache(async (url: string, params?: any) => {
  const response = await api.get(url, { params });
  return response.data;
});