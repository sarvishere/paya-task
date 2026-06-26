'use client';

import Filter from "./components/Filter/Filter";
import { Search } from "./components/Search/Search";


interface TopBarProps {
  selectedCategory: string | null;
  onCategoryChange: (category: string | null) => void;
  totalProducts?: number;
  error?: Error | null;
}

export default function TopBar({
  selectedCategory,
  onCategoryChange,
  totalProducts,
  error,
}: TopBarProps) {
  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6">
      {/* بخش جستجو و فیلتر */}
      <div className="flex flex-col md:flex-row justify-between flex-wrap gap-4 md:gap-6 mb-6">
        <div className="md:max-w-lg w-full">
          <Search />
        </div>
        <div className="md:max-w-sm w-full">
          <Filter 
            selectedCategory={selectedCategory}
            onCategoryChange={onCategoryChange}
          />
        </div>
      </div>

      {/* نمایش وضعیت فیلتر */}
      <div className="flex items-center justify-between mb-4">
        <div className="text-sm text-gray-500">
          {selectedCategory ? (
            <span>
              نمایش محصولات دسته‌بندی: 
              <span className="font-semibold text-blue-600 mr-1">
                {selectedCategory}
              </span>
            </span>
          ) : (
            <span>نمایش همه محصولات</span>
          )}
        </div>
        {totalProducts !== undefined && totalProducts > 0 && (
          <div className="text-sm text-gray-500">
            <span className="font-semibold">{totalProducts}</span> محصول
          </div>
        )}
      </div>

      {/* نمایش خطا */}
      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg mb-4">
          خطا در بارگذاری محصولات
        </div>
      )}
    </div>
  );
}