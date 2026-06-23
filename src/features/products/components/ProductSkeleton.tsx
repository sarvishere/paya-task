// components/products/ProductSkeleton.tsx
'use client';

import { Card, Skeleton } from 'antd';

export const ProductSkeleton = () => {
  return (
    <Card
      className="h-full"
      style={{ borderRadius: '12px' }}
      bodyStyle={{ padding: '16px' }}
    >
      <div className="flex flex-col items-center">
        <Skeleton.Image 
          active 
          className="w-full h-40 rounded-lg mb-3"
          style={{ width: '100%', height: '160px' }}
        />
        <Skeleton 
          active 
          paragraph={{ rows: 3 }}
          className="w-full"
        />
      </div>
    </Card>
  );
};