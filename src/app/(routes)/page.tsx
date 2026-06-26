"use client";

import { useState } from "react";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { useProductFilter } from "@/features/TopBar/components/Filter/hooks/useProductFilter";
import TopBar from "@/features/TopBar/TopBar";

export default function HomePage() {
  const [page, setPage] = useState(1);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const limit = 9;

  const { data, isLoading, isFetching, error } = useProductFilter({
    category: selectedCategory,
    page,
    limit,
  });

  const handlePageChange = (newPage: number) => {
    setPage(newPage);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category: string | null) => {
    setSelectedCategory(category);
    setPage(1);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* TopBar */}
      <TopBar
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        totalProducts={data?.total}
        error={error}
      />

      {/* ProductGrid */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-6">
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