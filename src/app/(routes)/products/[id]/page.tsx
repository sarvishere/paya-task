'use client';

import { useParams } from 'next/navigation';
import ProductDetailClient from '@/features/productDetails/component/ProductDetail';

export default function ProductPage() {
  const params = useParams();
  const id = params.id as string;

  return (
    <div className="container mx-auto px-4 py-8">
      <ProductDetailClient productId={id} />
    </div>
  );
}