
export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  sku: string; 
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: 'In Stock' | 'Low Stock' | 'Out of Stock';
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  tags: string[];
  reviews: Review[];
  thumbnail: string;
  images: string[];
}

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductMeta {
  createdAt: string;
  updatedAt: string;
  barcode: string;
  qrCode: string;
}

export type AvailabilityStatus = 'In Stock' | 'Low Stock' | 'Out of Stock';

export interface Review {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductFilters {
  category?: string;
  brand?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  rating?: number;
  search?: string;
  sortBy?: 'price' | 'rating' | 'title' | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  pageSize?: number;
  currentPage: number;
  total: number;
  onPageChange: (page: number) => void;

  columns?: 2 | 3 | 4 | 5;
  showPagination?: boolean;
  onProductClick?: (product: Product) => void;
  emptyMessage?: string;
  className?: string;
}

export interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
  showActions?: boolean;
  onAddToCart?: (product: Product) => void;
  onAddToWishlist?: (product: Product) => void;
}