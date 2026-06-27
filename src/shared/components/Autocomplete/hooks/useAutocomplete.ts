'use client';

import { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { InputRef } from 'antd';

interface UseAutocompleteProps<T = unknown> {
  minChars: number;
  debounceDelay: number;
  onSearch?: (term: string) => void;
  onSearchSubmit?: (term: string) => void;
  onResultClick?: (item: T) => void;
  results: T[];
  externalLoading: boolean;
  error: string | null;
  disabled: boolean;
  renderItem?: (item: T, index: number) => React.ReactNode;
  getItemKey?: (item: T, index: number) => string | number;
}

export function useAutocomplete<T = unknown>({
  minChars,
  debounceDelay,
  onSearch,
  onSearchSubmit,
  onResultClick,
  results,
  externalLoading,
  error,
  disabled,
}: UseAutocompleteProps<T>) {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [manualOpen, setManualOpen] = useState<boolean | null>(null);
  const inputRef = useRef<InputRef>(null);
  const blurTimeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedTerm = useDebounce(searchTerm, debounceDelay);

  useEffect(() => {
    if (searchTerm.length >= minChars) {
      onSearch?.(searchTerm);
    } else if (searchTerm.length === 0) {
      onSearch?.('');
    }
  }, [debouncedTerm, minChars, onSearch, searchTerm]);

  const autoOpen = useMemo(() => {
    if (searchTerm.length < minChars || disabled) {
      return false;
    }
    return externalLoading || !!error || results.length > 0;
  }, [searchTerm, minChars, disabled, externalLoading, error, results.length]);

  const isOpen = manualOpen !== null ? manualOpen : autoOpen;

  const handleChange = useCallback((value: string) => {
    setSearchTerm(value);
    setManualOpen(null); 
  }, []);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    onSearch?.('');
    setManualOpen(false);
    inputRef.current?.focus();
  }, [onSearch]);

const handleResultClick = useCallback(
  (item: T) => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    setSearchTerm('');
    setManualOpen(false);
    onResultClick?.(item);
  },
  [onResultClick]
);

  const handleSearchSubmit = useCallback(() => {
    if (searchTerm.trim()) {
      onSearchSubmit?.(searchTerm.trim());
      setManualOpen(false);
      inputRef.current?.blur();
    }
  }, [onSearchSubmit, searchTerm]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && searchTerm.trim().length >= minChars) {
        onSearchSubmit?.(searchTerm.trim());
        setManualOpen(false);
        inputRef.current?.blur();
      }
    },
    [searchTerm, minChars, onSearchSubmit]
  );

  const handleFocus = useCallback(() => {
    if (searchTerm.length >= minChars && !disabled) {
      if (results.length > 0 || externalLoading || error) {
        setManualOpen(true);
      }
    }
  }, [searchTerm, minChars, disabled, results.length, externalLoading, error]);

  const handleBlur = useCallback(() => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    blurTimeoutRef.current = setTimeout(() => {
      setManualOpen(false);
    }, 150);
  }, []);

  useEffect(() => {
    return () => {
      if (blurTimeoutRef.current) {
        clearTimeout(blurTimeoutRef.current);
      }
    };
  }, []);

  const setIsOpen = useCallback((open: boolean) => {
    if (blurTimeoutRef.current) {
      clearTimeout(blurTimeoutRef.current);
    }
    setManualOpen(open);
  }, []);

  const options = results;

  return {
    searchTerm,
    isOpen,
    inputRef,
    options,
    handleChange,
    handleClear,
    handleResultClick,
    handleSearchSubmit,
    handleKeyDown,
    handleFocus, 
    handleBlur, 
    setIsOpen,
  };
}