export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];
  discountPercentage:number;
}

export interface ProductsResponse {
  products: Product[];
  total: number;
  skip: number;
  limit: number;
}

export interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  pageSize?: number;
  currentPage: number;       
  total: number;            
  onPageChange: (page: number) => void; 
}