export interface Product {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  thumbnail: string;
  images: string[];
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductFilters {
  limit?: number;
  skip?: number;
  search?: string;
  category?: string;
  sortBy?: 'price' | 'rating' | 'title' | 'stock';
  order?: 'asc' | 'desc';
}

export interface SearchResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ApiError {
  status?: number;
  message: string;
  details?: unknown;
}

export interface ProductStatus {
  inStock: boolean;
  hasDiscount: boolean;
  discountAmount?: number;
  finalPrice?: number;
}