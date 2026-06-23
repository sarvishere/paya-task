'use client';

import { useState } from 'react';
import { Row, Col, Empty, Pagination } from 'antd';
import { Product } from '@/types/product.types';
import styles from './ProductGrid.module.css'
import { ProductSkeleton } from './ProductSkeleton';
import { ProductCard } from './ProductCard';

interface ProductGridProps {
  products: Product[];
  loading?: boolean;
  pageSize?: number;
}

export const ProductGrid = ({ 
  products, 
  loading = false,
  pageSize = 9 
}: ProductGridProps) => {
  const [currentPage, setCurrentPage] = useState(1);

  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const currentProducts = products.slice(startIndex, endIndex);
  const totalPages = Math.ceil(products.length / pageSize);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  if (loading) {
    return (
      <Row gutter={[16, 24]} justify="center">
        {Array.from({ length: pageSize }).map((_, index) => (
          <Col key={index} xs={24} sm={12} md={8} lg={8}>
            <ProductSkeleton />
          </Col>
        ))}
      </Row>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex justify-center items-center h-96">
        <Empty 
          description="محصولی وجود ندارد" 
          image={Empty.PRESENTED_IMAGE_SIMPLE}
        />
      </div>
    );
  }

  return (
    <div className="w-full">
      <Row gutter={[16, 24]} justify="center">
        {currentProducts.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={8}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {totalPages > 1 && (
        <div className="flex justify-center mt-8">
          <Pagination
  current={currentPage}
  total={products.length}
  pageSize={pageSize}
  onChange={handlePageChange}
  showSizeChanger={false}
  showQuickJumper={false}
  showTotal={() => null}
  className={styles.pagination}
/>
        </div>
      )}
    </div>
  );
};