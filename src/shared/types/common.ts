// 📌 پاسخ استاندارد API
export interface ApiResponse<T = any> {
  data: T;
  status: number;
  message?: string;
}

// 📌 وضعیت‌های لودینگ
export type LoadingState = 'idle' | 'loading' | 'success' | 'error';

// 📌 خطای API
export interface ApiError {
  status: number;
  message: string;
  data?: any;
}