"use client";

import { useState, useEffect } from "react";
import { Spin } from "antd";
import { ProductGrid } from "@/features/products/components/ProductGrid";

// Mock data با محصولات بیشتر برای تست صفحه‌بندی
const mockProducts = [
  { id: 1, title: "کیف چرمی لوکس", category: "کیف", price: 2500000, stock: 15, rating: 4.5, brand: "چرم ایران" },
  { id: 2, title: "کفش اسپرت نایک", category: "کفش", price: 1800000, stock: 8, rating: 4.2, brand: "نایک" },
  { id: 3, title: "عطر شنل شماره ۵", category: "عطر", price: 3200000, stock: 3, rating: 4.8, brand: "شنل" },
  { id: 4, title: "ساعت مچی اپل", category: "ساعت", price: 4500000, stock: 0, rating: 4.6, brand: "اپل" },
  { id: 5, title: "لپ‌تاپ ایسوس", category: "الکترونیک", price: 28000000, stock: 5, rating: 4.3, brand: "ایسوس" },
  { id: 6, title: "هدفون بی‌سیم سونی", category: "الکترونیک", price: 3200000, stock: 12, rating: 4.4, brand: "سونی" },
  { id: 7, title: "کیف دوشی زنانه", category: "کیف", price: 1800000, stock: 7, rating: 4.1, brand: "چرم ایران" },
  { id: 8, title: "کفش مجلسی زنانه", category: "کفش", price: 2200000, stock: 4, rating: 4.0, brand: "ایران کفش" },
  { id: 9, title: "عطر دیور ساواج", category: "عطر", price: 2800000, stock: 6, rating: 4.7, brand: "دیور" },
  { id: 10, title: "کیف پول مردانه", category: "کیف", price: 800000, stock: 20, rating: 4.0, brand: "چرم ایران" },
  { id: 11, title: "کفش کوهنوردی", category: "کفش", price: 3500000, stock: 3, rating: 4.5, brand: "کوهنورد" },
  { id: 12, title: "عطر گوچی بلوم", category: "عطر", price: 3000000, stock: 2, rating: 4.3, brand: "گوچی" },
  { id: 13, title: "ساعت کاسیو", category: "ساعت", price: 1200000, stock: 10, rating: 3.8, brand: "کاسیو" },
  { id: 14, title: "تبلت سامسونگ", category: "الکترونیک", price: 12000000, stock: 4, rating: 4.2, brand: "سامسونگ" },
  { id: 15, title: "هدفون بیتس", category: "الکترونیک", price: 2800000, stock: 8, rating: 4.0, brand: "بیتس" },
  { id: 16, title: "کیف لپ‌تاپ", category: "کیف", price: 1500000, stock: 15, rating: 3.9, brand: "چرم ایران" },
  { id: 17, title: "کفش ورزشی آدیداس", category: "کفش", price: 2000000, stock: 6, rating: 4.4, brand: "آدیداس" },
];

export default function HomePage() {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 800);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Spin size="large" tip="در حال بارگذاری..." />
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 bg-gray-50">
      <div className="max-w-7xl mx-auto">
        <ProductGrid 
          products={mockProducts} 
          loading={loading}
          pageSize={9}
        />
      </div>
    </div>
  );
}