'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useProductDetail } from '../hook/useProductDetail';

interface ProductDetailClientProps {
  productId: string;
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const { data: product, isLoading, error, refetch } = useProductDetail(productId);

  if (isLoading) {
    return <div>در حال بارگذاری...</div>;
  }

  if (error) {
    return <div>خطا در دریافت اطلاعات</div>;
  }

  if (!product) {
    return <div>محصولی یافت نشد</div>;
  }

  console.log("data", product);

  return (
    <div>
      <h2>{product.title}</h2>
      {/* نمایش اطلاعات محصول */}
    </div>
  );
}