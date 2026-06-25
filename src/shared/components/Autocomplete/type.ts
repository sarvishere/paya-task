import { BaseComponentProps } from '@/shared/types/style';

export interface SearchResultsProps<T = unknown> {
  show: boolean;
  searchTerm: string;
  isLoading: boolean;
  error: string | null;
  results: T[];
  totalResults: number;
  maxResults: number;
  onResultClick: (item: T) => void;
  onShowAll?: () => void;
  renderItem?: (item: T, index: number) => React.ReactNode;
  getItemKey?: (item: T, index: number) => string | number;
  className?: string;
  
  emptyText?: string;
  loadingText?: string;
  errorText?: string;
  showHeader?: boolean;
  showCount?: boolean;
  maxHeight?: number;
}

export interface AutocompleteProps<T = unknown> 
  extends Pick<BaseComponentProps, 'variant' | 'size' | 'status' | 'disabled' | 'fullWidth' | 'className'> {
  placeholder?: string;
  debounceDelay?: number;
  minChars?: number;
  maxResults?: number;
  onSearch?: (term: string) => void;
  onResultClick?: (item: T) => void;
  onSearchSubmit?: (term: string) => void;
  loading?: boolean;
  results?: T[];
  totalResults?: number;
  error?: string | null;
  
  emptyText?: string;
  loadingText?: string;
  errorText?: string;
  showHeader?: boolean;
  showCount?: boolean;
  maxHeight?: number;
  
  inputClassName?: string;
  resultsClassName?: string;
  renderItem?: (item: T, index: number) => React.ReactNode;
  getItemKey?: (item: T, index: number) => string | number;
}