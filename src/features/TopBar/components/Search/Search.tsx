"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/shared/types/product.types";
import { useProductSearch } from "./hooks/useProductSearch";

import { renderProductItem } from "./renderProductItem";
import Autocomplete from "@/shared/components/Autocomplete";

interface SearchProps {
  className?: string;
}

export function Search({ className = "" }: SearchProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useProductSearch(searchTerm);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleResultClick = (product: Product) => {
    router.push(`/product/${product.id}`);
    setSearchTerm("");
  };

  const handleSearchSubmit = (term: string) => {
    if (term.trim()) {
      router.push(`/search?q=${encodeURIComponent(term)}`);
      setSearchTerm("");
    }
  };

  const getProductKey = (product: Product) => product.id;



  return (
    <div className={className}>
      <div className="min-h-25">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            جستجوی محصولات
          </h1>

          <Autocomplete<Product>
            placeholder="جستجوی محصولات..."
            onSearch={handleSearch}
            onResultClick={handleResultClick}
            onSearchSubmit={handleSearchSubmit}
            loading={isLoading}
            results={data?.products || []}
            totalResults={data?.total || 0}
            error={error?.message || null}
            minChars={2}
            debounceDelay={300}
            maxResults={8}
            variant="filled"
            size="lg"
            status={error ? "error" : "default"}
            disabled={isLoading}
            fullWidth={true}
            className="w-full"
            inputClassName="!text-base !py-3"
            renderItem={renderProductItem}
            getItemKey={getProductKey}
            emptyText="محصولی یافت نشد"
            loadingText="در حال جستجوی محصولات..."
            errorText="خطا در جستجوی محصولات"
            showHeader={true}
            showCount={true}
            maxHeight={500}
          />
        </div>
      </div>
    </div>
  );
}
