'use client';

import Image from 'next/image';
import { useState } from 'react';
import { Tag } from 'antd';
import { LeftOutlined, RightOutlined } from '@ant-design/icons';

interface ProductImageGalleryProps {
  images: string[];
  thumbnail?: string;
  discountPercentage?: number;
  title: string;
}

export default function ProductImageGallery({
  images,
  thumbnail,
  discountPercentage = 0,
  title,
}: ProductImageGalleryProps) {
     console.log("images" , images)
  const [selectedImage, setSelectedImage] = useState(0);

  const imageList =
    images?.length > 0
      ? images
      : [thumbnail || '/images/placeholder.jpg'];

  const nextImage = () => {
    setSelectedImage((prev) => (prev + 1) % imageList.length);
  };

  const prevImage = () => {
    setSelectedImage((prev) => (prev - 1 + imageList.length) % imageList.length);
  };

  return (
    <div className="space-y-4">
      <div className="relative overflow-hidden rounded-lg border border-gray-200 bg-gray-50">
        <Image
          src={imageList[selectedImage]}
          alt={`${title} - تصویر ${selectedImage + 1}`}
          width={800}
          height={800}
          priority
          sizes="(max-width:768px) 100vw, 50vw"
          className="w-full h-auto aspect-square object-contain p-4"
        />

        {imageList.length > 1 && (
          <>
            <button
              onClick={prevImage}
              aria-label="تصویر قبلی"
              className="absolute left-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            >
              <LeftOutlined />
            </button>

            <button
              onClick={nextImage}
              aria-label="تصویر بعدی"
              className="absolute right-2 top-1/2 -translate-y-1/2 z-10 rounded-full bg-black/50 p-2 text-white hover:bg-black/70 transition-colors"
            >
              <RightOutlined />
            </button>
          </>
        )}

        {discountPercentage > 0 && (
          <Tag
            color="red"
            className="absolute top-4 right-4 z-10 px-3 py-1"
          >
            {Math.round(discountPercentage)}% تخفیف
          </Tag>
        )}

        {imageList.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-black/50 px-3 py-1 text-xs text-white">
            {selectedImage + 1} / {imageList.length}
          </div>
        )}
      </div>

      {/* تصاویر کوچک */}
      {imageList.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {imageList.map((image, index) => (
            <button
              key={index}
              onClick={() => setSelectedImage(index)}
              className={`overflow-hidden rounded-lg border-2 transition-all ${
                selectedImage === index
                  ? 'border-blue-500 shadow-md'
                  : 'border-gray-200 hover:border-gray-400'
              }`}
            >
              <Image
                src={image}
                alt={`${title} - تصویر کوچک ${index + 1}`}
                width={80}
                height={80}
                className="h-20 w-20 object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}