'use client'; 

import { useEffect } from 'react';
import { Button } from 'antd';

interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps) {
  useEffect(() => {
    console.error('Product page error:', error);
  }, [error]);

  return (
    <div className="text-center py-10">
      <h2 className="text-2xl font-bold text-red-600 mb-4">خطا در بارگذاری محصول</h2>
      <p className="text-gray-600 mb-6">{error.message || 'مشکلی پیش آمده است'}</p>
      <Button 
        type="primary"
        onClick={reset}
        size="large"
      >
        تلاش مجدد
      </Button>
    </div>
  );
}