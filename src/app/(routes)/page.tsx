'use client';

import { useState } from "react";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { useProducts } from "@/features/products/hooks/useProducts";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const limit = 9;

  const {
    data,
    isLoading,
    isFetching,
  } = useProducts(page, limit);  

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen p-6 ">
      <div className="max-w-7xl mx-auto">
        <ProductGrid
          products={data?.products || []}
          loading={isLoading || isFetching}
          pageSize={limit}
          currentPage={page}
          total={data?.total || 0} 
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}