'use client';

import { Button, Result } from 'antd';

export const GlobalErrorFallback = ({ 
  error, 
  reset 
}: { 
  error?: Error; 
  reset?: () => void;
}) => {
  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Result
        status="error"
        title="خطا در بارگذاری برنامه"
        subTitle={error?.message || 'مشکلی پیش آمده است. لطفاً دوباره تلاش کنید.'}
        extra={[
          <Button 
            key="retry" 
            type="primary" 
            onClick={reset || (() => window.location.reload())}
          >
            تلاش مجدد
          </Button>,
        ]}
      />
    </div>
  );
};