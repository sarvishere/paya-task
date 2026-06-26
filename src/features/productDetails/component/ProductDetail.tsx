// features/productDetails/component/ProductDetail.tsx
'use client';

import { useState } from 'react';
import ProductImageGallery from './ProductImageGallery';
import { 
  HeartOutlined, 
  ShoppingCartOutlined, 
  ShareAltOutlined,
  MinusOutlined,
  PlusOutlined,
  SafetyOutlined,
  TruckOutlined,
  UndoOutlined,
  BarcodeOutlined,
  CalendarOutlined
} from '@ant-design/icons';
import { Button, Rate, Tag, message, Descriptions, Divider, Empty, Skeleton, Avatar } from 'antd';
import { useProductDetail } from '../hook/useProductDetail';

interface ProductDetailClientProps {
  productId: string;
}

export default function ProductDetailClient({ productId }: ProductDetailClientProps) {
  const { data: product, isLoading, error, refetch } = useProductDetail(productId);
  const [quantity, setQuantity] = useState(1);

  // حالت‌های مختلف
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <Skeleton.Image className="w-full aspect-square" />
          <div className="flex gap-2">
            {[1, 2, 3].map((i) => (
              <Skeleton.Image key={i} className="w-20 h-20" />
            ))}
          </div>
        </div>
        <div className="space-y-6">
          <Skeleton active paragraph={{ rows: 10 }} />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10">
        <p className="text-red-500 text-lg mb-4">خطا در دریافت اطلاعات محصول</p>
        <Button type="primary" onClick={() => refetch()} size="large">
          تلاش مجدد
        </Button>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="text-center py-10">
        <Empty description="محصولی یافت نشد" />
      </div>
    );
  }

  // محاسبات
  const discountedPrice = product.discountPercentage 
    ? product.price * (1 - product.discountPercentage / 100) 
    : product.price;

  const isInStock = product.stock > 0;
  const isLowStock = product.stock > 0 && product.stock < 10;

  // هندلرها
  const handleAddToCart = () => {
    message.success(`${product.title} به سبد خرید اضافه شد`);
  };

  const handleAddToWishlist = () => {
    message.success(`${product.title} به علاقه‌مندی‌ها اضافه شد`);
  };

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: product.title,
          text: product.description,
          url: window.location.href,
        });
      } else {
        await navigator.clipboard.writeText(window.location.href);
        message.success('لینک کپی شد');
      }
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                <ProductImageGallery
        images={product.images}
        thumbnail={product.thumbnail}
        discountPercentage={product.discountPercentage}
        title={product.title}
      />



        {/* ====== اطلاعات محصول ====== */}
        <div className="space-y-6">
          {/* برند و عنوان */}
          <div>
            {product.brand && (
              <Tag color="blue" className="mb-2 text-sm">
                {product.brand}
              </Tag>
            )}
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900">
              {product.title}
            </h1>
            
            {/* تگ‌ها */}
            {product.tags && product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1 mt-2">
                {product.tags.map((tag : string) => (
                  <Tag key={tag} className="text-xs">
                    #{tag}
                  </Tag>
                ))}
              </div>
            )}
          </div>

          {/* امتیاز و نظرات */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Rate allowHalf disabled value={product.rating || 0} />
              <span className="text-sm text-gray-600 font-medium">
                {product.rating?.toFixed(1) || 0}
              </span>
            </div>
            {product.reviews && (
              <span className="text-sm text-gray-500">
                {product.reviews.length} نظر
              </span>
            )}
          </div>

          {/* قیمت */}
          <div className="border-t border-b border-gray-200 py-4">
            <div className="flex items-baseline gap-3 flex-wrap">
              {product.discountPercentage > 0 ? (
                <>
                  <span className="text-3xl font-bold text-blue-600">
                    {Math.round(discountedPrice).toLocaleString()} تومان
                  </span>
                  <span className="text-lg text-gray-400 line-through">
                    {product.price.toLocaleString()} تومان
                  </span>
                </>
              ) : (
                <span className="text-3xl font-bold text-blue-600">
                  {product.price.toLocaleString()} تومان
                </span>
              )}
            </div>
            
            <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
              {product.minimumOrderQuantity && (
                <span>حداقل سفارش: {product.minimumOrderQuantity} عدد</span>
              )}
              {product.sku && (
                <span>SKU: {product.sku}</span>
              )}
            </div>
          </div>

          {/* توضیحات */}
          {product.description && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">توضیحات</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>
          )}

          {/* اطلاعات تکمیلی */}
          {(product.weight || product.dimensions || product.warrantyInformation || 
            product.shippingInformation || product.returnPolicy) && (
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">اطلاعات تکمیلی</h3>
              <Descriptions bordered size="small" column={1} className="bg-gray-50 rounded-lg">
                {product.weight && (
                  <Descriptions.Item label="وزن">{product.weight} گرم</Descriptions.Item>
                )}
                {product.dimensions && (
                  <Descriptions.Item label="ابعاد">
                    {product.dimensions.width} × {product.dimensions.height} × {product.dimensions.depth} سانتی‌متر
                  </Descriptions.Item>
                )}
                {product.warrantyInformation && (
                  <Descriptions.Item label="گارانتی">
                    <SafetyOutlined className="mr-1" /> {product.warrantyInformation}
                  </Descriptions.Item>
                )}
                {product.shippingInformation && (
                  <Descriptions.Item label="ارسال">
                    <TruckOutlined className="mr-1" /> {product.shippingInformation}
                  </Descriptions.Item>
                )}
                {product.returnPolicy && (
                  <Descriptions.Item label="بازگشت کالا">
                    <UndoOutlined className="mr-1" /> {product.returnPolicy}
                  </Descriptions.Item>
                )}
              </Descriptions>
            </div>
          )}

          {/* انتخاب تعداد */}
          <div className="flex items-center gap-4">
            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
                disabled={quantity <= 1}
              >
                <MinusOutlined />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="px-4 py-2 hover:bg-gray-100 transition-colors"
                disabled={quantity >= product.stock}
              >
                <PlusOutlined />
              </button>
            </div>
            <span className="text-sm text-gray-500">
              موجودی: {product.stock} عدد
            </span>
          </div>

          {/* دکمه‌های اقدام */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <Button 
              type="primary" 
              size="large"
              className="flex-1 h-12"
              icon={<ShoppingCartOutlined />}
              onClick={handleAddToCart}
              disabled={!isInStock}
            >
              {isInStock ? 'افزودن به سبد خرید' : 'ناموجود'}
            </Button>
            <Button 
              size="large"
              className="flex-1 h-12"
              icon={<HeartOutlined />}
              onClick={handleAddToWishlist}
            >
              علاقه‌مندی
            </Button>
            <Button 
              size="large"
              className="h-12"
              icon={<ShareAltOutlined />}
              onClick={handleShare}
            />
          </div>

          {/* وضعیت موجودی */}
          <div className="flex items-center gap-2 text-sm">
            <div className={`w-2 h-2 rounded-full ${
              isInStock ? (isLowStock ? 'bg-yellow-500' : 'bg-green-500') : 'bg-red-500'
            }`} />
            <span className={
              isInStock ? (isLowStock ? 'text-yellow-600' : 'text-green-600') : 'text-red-600'
            }>
              {isInStock ? (isLowStock ? 'موجودی محدود' : 'موجود در انبار') : 'ناموجود'}
            </span>
          </div>

          {/* متا اطلاعات */}
          {product.meta && (
            <div className="text-xs text-gray-400 border-t pt-3 mt-2 space-y-1">
              {product.meta.barcode && (
                <div className="flex items-center gap-1">
                  <BarcodeOutlined /> {product.meta.barcode}
                </div>
              )}
              <div className="flex flex-col gap-1">
                {product.meta.createdAt && (
                  <div className="flex items-center gap-1">
                    <CalendarOutlined /> تاریخ ثبت: {new Date(product.meta.createdAt).toLocaleDateString('fa-IR')}
                  </div>
                )}
                {product.meta.updatedAt && (
                  <div className="flex items-center gap-1">
                    <CalendarOutlined /> آخرین بروزرسانی: {new Date(product.meta.updatedAt).toLocaleDateString('fa-IR')}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ====== بخش نظرات ====== */}
      {product.reviews && product.reviews.length > 0 && (
        <div className="mt-12">
          <Divider plain>
            <span className="text-lg font-semibold">نظرات کاربران</span>
          </Divider>
          
          <div className="space-y-6">
            {/* میانگین امتیاز */}
            <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-lg">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">
                  {product.rating?.toFixed(1) || 0}
                </div>
                <Rate allowHalf disabled value={product.rating || 0} className="text-sm" />
                <div className="text-sm text-gray-500">
                  {product.reviews.length} نظر
                </div>
              </div>
            </div>

            {/* لیست نظرات */}
            {product.reviews.map((review, index) => (
              <div key={index} className="border-b pb-4 last:border-b-0">
                <div className="flex items-center gap-3">
                  <Avatar className="bg-blue-500">
                    {review.reviewerName.charAt(0).toUpperCase()}
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-medium">{review.reviewerName}</span>
                      <Rate disabled value={review.rating} className="text-xs" />
                      <span className="text-xs text-gray-400">
                        {new Date(review.date).toLocaleDateString('fa-IR')}
                      </span>
                    </div>
                    <p className="text-gray-700 mt-1">{review.comment}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}