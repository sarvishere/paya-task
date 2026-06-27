"use client";

import { useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { ProductGrid } from "@/features/products/components/ProductGrid";
import { useProductFilter } from "@/features/TopBar/components/Filter/hooks/useProductFilter";
import TopBar from "@/features/TopBar/TopBar";

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const limit = 9;

  const page = Number(searchParams.get("page") ?? "1");
  const selectedCategory = searchParams.get("category") ?? null;
  const search = searchParams.get("search") ?? "";

  const updateParams = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());
      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });
      router.push(`?${params.toString()}`, { scroll: false });
    },
    [router, searchParams]
  );

  const handlePageChange = (newPage: number) => {
    updateParams({ page: String(newPage) });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleCategoryChange = (category: string | null) => {
    updateParams({ category, page: null });
  };

  const handleSearchChange = (value: string) => {
    updateParams({ search: value, page: null });
  };

  const { data, isLoading, isFetching, error } = useProductFilter({
    category: selectedCategory,
    search,
    page,
    limit,
  });

  return (
    <div className="min-h-screen bg-gray-50">
      <TopBar
        selectedCategory={selectedCategory}
        onCategoryChange={handleCategoryChange}
        search={search}
        onSearchChange={handleSearchChange}
        totalProducts={data?.total}
        error={error}
      />

      <div className="max-w-7xl mx-auto px-4 md:px-6 pb-6">
        <ProductGrid
          products={data?.products ?? []}
          loading={isLoading || isFetching}
          pageSize={limit}
          currentPage={page}
          total={data?.total ?? 0}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
}