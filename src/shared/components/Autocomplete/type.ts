import { ReactNode } from 'react';

export interface AutocompleteProps<T = unknown> {
  placeholder?: string;
  debounceDelay?: number;
  minChars?: number;
  onSearch?: (term: string) => void;
  onResultClick?: (item: T) => void;
  onSearchSubmit?: (term: string) => void;
  loading?: boolean;
  results?: T[];
  totalResults?: number;
  maxResults?: number;
  error?: string | null;
  variant?: 'default' | 'filled' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  status?: 'default' | 'error' | 'warning' | 'success';
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
  inputClassName?: string;
  renderItem?: (item: T, index: number) => ReactNode;
  getItemKey?: (item: T, index: number) => string | number;
  emptyText?: string;
  loadingText?: string;
  errorText?: string;
  maxHeight?: number;
  allowClear?: boolean;
  showHeader?: boolean;
  showCount?: boolean;
}