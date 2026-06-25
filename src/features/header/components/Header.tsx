"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Product } from "@/shared/types/product.types";

import { cn } from "@/utils/cn";
import { useProductSearch } from "../hooks/useProductSearch";
import HeaderSearch from "./HeaderSearch";

interface HeaderProps {
  className?: string;
}

export default function Header({ className = "" }: HeaderProps) {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading, error } = useProductSearch(searchTerm);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
  };

  const handleResultClick = (product: Product) => {
    console.log("محصول انتخاب شد:", product.title);
    router.push(`/product/${product.id}`);
    setSearchTerm("");
  };

  const handleSearchSubmit = (term: string) => {
    router.push(`/search?q=${encodeURIComponent(term)}`);
    setSearchTerm("");
  };

  return (
    <header
      className={cn(
        "sticky top-0 z-50",
        "bg-white border-b border-gray-200",
        "py-3",
        className,
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          {/* لوگو */}
          <Link href="/" className="shrink-0 ml-4">
            <span className="text-2xl font-bold text-primary">لوگو</span>
          </Link>

          <div className="flex-1 max-w-2xl"></div>
        </div>
      </div>
    </header>
  );
}
