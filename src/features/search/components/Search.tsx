"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Product } from "@/shared/types/product.types";
import { useProductSearch } from "../hooks/useProductSearch";
import Autocomplete from "@/shared/components/Autocomplete";
import { Avatar } from "antd";

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

  const renderProductItem = (product: Product) => {
    return (
      <div className="flex items-center gap-3">
        {product.thumbnail && (
          <Avatar
            src={product.thumbnail}
            shape="square"
            size={48}
            className="rounded-lg shrink-0 border border-gray-200"
          />
        )}
        
        <div className="flex-1 min-w-0">
          <div className="font-medium text-gray-800 truncate">
            {product.title || "محصول"}
          </div>
          
          {product.description && (
            <div className="text-sm text-gray-500 truncate">
              {product.description}
            </div>
          )}
          
          <div className="flex items-center gap-2 mt-0.5">
            {product.brand && (
              <span className="text-xs text-gray-400">
                {product.brand}
              </span>
            )}
            {product.category && (
              <>
                <span className="text-xs text-gray-300">•</span>
                <span className="text-xs text-gray-400">
                  {product.category}
                </span>
              </>
            )}
          </div>
        </div>
        
        {product.price !== undefined && (
          <div className="text-primary font-bold text-sm shrink-0">
            ${product.price.toFixed(2)}
          </div>
        )}
      </div>
    );
  };

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