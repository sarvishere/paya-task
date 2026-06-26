"use client";

import { Card, Typography, Tag, Rate, Button, Space } from "antd";
import { ShoppingCartOutlined } from "@ant-design/icons";
import Link from "next/link";
import { Product } from "@/shared/types/product.types";


const { Text, Title } = Typography;

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const isInStock = product.stock > 0;
  const discount = product.discountPercentage || 0;
  const finalPrice = Math.round(product.price * (1 - discount / 100));

  return (
    <Link href={`/products/${product.id}`}>
      <Card
        hoverable
        className="h-full transition-all duration-300 hover:shadow-strong"
        style={{
          borderRadius: "12px",
          overflow: "hidden",
          borderColor: "var(--color-gray-200)",
        }}
        bodyStyle={{ padding: "16px" }}
      >
        <div className="flex flex-col items-center">
          {/* تصویر */}
          <div className="relative w-full h-40 rounded-lg mb-3 overflow-hidden bg-gray-100">
            {product.thumbnail ? (
              <img
                src={product.thumbnail}
                alt={product.title}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
              />
            ) : (
              <div
                className="w-full h-full flex items-center justify-center"
                style={{
                  background:
                    "linear-gradient(135deg, var(--color-primary), var(--color-primary-dark))",
                }}
              >
                <span className="text-white text-4xl font-bold">
                  {product.title.charAt(0)}
                </span>
              </div>
            )}

            {/* تخفیف */}
            {discount > 0 && (
              <Tag
                color="red"
                className="absolute top-2 left-2 text-xs font-bold"
              >
                {discount}% تخفیف
              </Tag>
            )}
          </div>

          {/* عنوان */}
          <Title
            level={5}
            className="text-center mb-1"
            style={{ marginBottom: 4, color: "var(--color-gray-800)" }}
          >
            {product.title}
          </Title>

          {/* برند */}
          {product.brand && (
            <Text
              type="secondary"
              className="text-xs"
              style={{ color: "var(--color-gray-500)" }}
            >
              {product.brand}
            </Text>
          )}

          {/* امتیاز */}
          {product.rating && (
            <Rate
              disabled
              defaultValue={product.rating}
              className="text-xs mt-1"
              style={{ fontSize: "14px" }}
            />
          )}

          {/* قیمت */}
          <div className="mt-2 flex items-center gap-2">
            {discount > 0 ? (
              <>
                <Text
                  delete
                  className="text-sm"
                  style={{ color: "var(--color-gray-400)" }}
                >
                  {product.price.toLocaleString()} تومان
                </Text>
                <Text
                  strong
                  className="text-base"
                  style={{ color: "var(--color-success)" }}
                >
                  {finalPrice.toLocaleString()} تومان
                </Text>
              </>
            ) : (
              <Text
                strong
                className="text-base"
                style={{ color: "var(--color-gray-800)" }}
              >
                {product.price.toLocaleString()} تومان
              </Text>
            )}
          </div>

          {/* دکمه‌ها */}
          <Space className="w-full mt-3" direction="vertical" size={4}>
            <Tag
              color={isInStock ? "success" : "error"}
              className="text-xs w-full text-center"
            >
              {isInStock ? `موجود (${product.stock})` : "ناموجود"}
            </Tag>

            <Button
              type="primary"
              size="small"
              icon={<ShoppingCartOutlined />}
              disabled={!isInStock}
              className="w-full"
              onClick={(e) => e.preventDefault()}
            >
              افزودن به سبد خرید
            </Button>
          </Space>
        </div>
      </Card>
    </Link>
  );
};
