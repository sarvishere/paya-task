"use client";

import { useState } from "react";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { useProducts } from "@/features/products/hooks/useProducts";
import { Search } from "@/features/search/components";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const limit = 9;

  const { data, isLoading, isFetching } = useProducts(page, limit);

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
   <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto p-4 md:p-6">
        <div className="flex flex-col md:flex-row justify-between flex-wrap gap-4 md:gap-6 mb-6">
          <div className="md:max-w-lg w-full">
            <Search />
          </div>
          <div className="md:max-w-sm w-full">
            {/* filter */}
          </div>
        </div>

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
