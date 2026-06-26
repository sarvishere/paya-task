'use client';

import Dropdown, { DropdownOption } from '@/shared/components/DropDown';
import { useMemo } from 'react';
import { useCategories } from './hooks/useCategories';

interface CategoryFilterProps {
  onCategoryChange: (category: string | null) => void;
  selectedCategory: string | null;
  className?: string;
}

export default function CategoryFilter({ 
  onCategoryChange, 
  selectedCategory,
  className = ''
}: CategoryFilterProps) {
  const { data: categoriesData, isLoading, error } = useCategories();

  const categoryOptions: DropdownOption[] = useMemo(
    () =>
      categoriesData?.map((cat) => ({
        value: cat.slug,
        label: cat.name,
      })) || [],
    [categoriesData]
  );

  return (
    <div className={className}>
      <Dropdown
        options={categoryOptions}
        value={selectedCategory}
        onChange={onCategoryChange}
        placeholder="همه دسته‌بندی‌ها"
        label="فیلتر بر اساس دسته‌بندی"
        allowClear={true}
        loading={isLoading}
        emptyText={error ? 'خطا در دریافت دسته‌بندی‌ها' : 'دسته‌بندی‌ای یافت نشد'}
      />
    </div>
  );
}