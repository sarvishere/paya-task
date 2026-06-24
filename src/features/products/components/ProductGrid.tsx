"use client";

import { useState } from "react";
import { Row, Col, Empty, Pagination } from "antd";
import { Product , ProductGridProps } from "@/features/products/types/product.types";
import styles from "./ProductGrid.module.css";
import { ProductSkeleton } from "./ProductSkeleton";
import { ProductCard } from "./ProductCard";


export const ProductGrid = ({
  products,
  loading = false,
  pageSize = 9,
  currentPage,
  total,
  onPageChange,
}: ProductGridProps) => {

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
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={8}>
            <ProductCard product={product} />
          </Col>
        ))}
      </Row>

      {total > pageSize && (
        <div className="flex justify-center mt-8">
          <Pagination
            current={currentPage}          
            total={total}                  
            pageSize={pageSize}
            onChange={onPageChange}       
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