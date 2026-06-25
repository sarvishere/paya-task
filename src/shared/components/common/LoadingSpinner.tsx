// components/LoadingSpinner.tsx
import { Spin } from 'antd';

interface LoadingSpinnerProps {
  fullScreen?: boolean;
  tip?: string;
}

export const LoadingSpinner = ({ 
  fullScreen = false, 
  tip = 'در حال بارگذاری...' 
}: LoadingSpinnerProps) => {
  if (fullScreen) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Spin size="large" tip={tip} />
      </div>
    );
  }
  
  return (
    <div className="flex items-center justify-center py-12">
      <Spin size="default" tip={tip} />
    </div>
  );
};