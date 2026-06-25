'use client';

import React, { useState, useCallback, useRef, useEffect, useMemo } from 'react';
import { InputRef } from 'antd';
import { SearchOutlined, CloseOutlined } from '@ant-design/icons';
import { useDebounce } from '@/shared/hooks/useDebounce';
import { AutocompleteProps } from './type';
import { cn } from '@/utils/cn';
import Input from '../Input';
import SearchResults from './SearchResults';

function Autocomplete<T = unknown>({
  placeholder = 'جستجو...',
  debounceDelay = 400,
  minChars = 2,
  maxResults = 5,
  onSearch,
  onResultClick,
  onSearchSubmit,
  loading: externalLoading ,
  results = [],
  totalResults = 0,
  error = null,
  variant = 'default',
  size = 'md',
  status = 'default',
  disabled = false,
  fullWidth = true,
  className = '',
  inputClassName = '',
  renderItem,
  getItemKey,
  emptyText = 'نتیجه‌ای یافت نشد',
  loadingText = 'در حال جستجو...',
  errorText = 'خطا در جستجو',
  showHeader = true,
  showCount = true,
  maxHeight = 400,
  ...restProps
}: AutocompleteProps<T>): React.ReactElement {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const inputRef = useRef<InputRef>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  const isOpenRef = useRef<boolean>(false); // ✅ اضافه شده

  const debouncedTerm = useDebounce(searchTerm, debounceDelay);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
        isOpenRef.current = false;
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }

    if (searchTerm.length >= minChars) {
      timeoutRef.current = setTimeout(() => {
        onSearch?.(searchTerm);
      }, debounceDelay);
    } else if (searchTerm.length === 0) {
      onSearch?.('');
    }

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [searchTerm, minChars, debounceDelay, onSearch]);

  useEffect(() => {
    let shouldBeOpen = false;
    
    if (searchTerm.length >= minChars) {
      if (results.length > 0 || externalLoading || error) {
        shouldBeOpen = true;
      } else if (!externalLoading && !error && results.length === 0) {
        shouldBeOpen = true;
      }
    }
    if (shouldBeOpen !== isOpenRef.current) {
      isOpenRef.current = shouldBeOpen;
      setIsOpen(shouldBeOpen);
    }
  }, [searchTerm, minChars, results.length, externalLoading, error]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    
    if (value.length < minChars) {
      setIsOpen(false);
      isOpenRef.current = false;
    }
  }, [minChars]);

  const handleClear = useCallback(() => {
    setSearchTerm('');
    onSearch?.('');
    setIsOpen(false);
    isOpenRef.current = false;
    inputRef.current?.focus();
  }, [onSearch]);

  const handleResultClick = useCallback(
    (item: T) => {
      setSearchTerm('');
      setIsOpen(false);
      isOpenRef.current = false;
      onResultClick?.(item);
      inputRef.current?.blur();
    },
    [onResultClick]
  );

  const handleShowAll = useCallback(() => {
    if (searchTerm.trim()) {
      onSearchSubmit?.(searchTerm.trim());
      setIsOpen(false);
      isOpenRef.current = false;
      inputRef.current?.blur();
    }
  }, [onSearchSubmit, searchTerm]);

  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Enter' && searchTerm.trim().length >= minChars) {
        onSearchSubmit?.(searchTerm.trim());
        setIsOpen(false);
        isOpenRef.current = false;
        inputRef.current?.blur();
      }
    },
    [searchTerm, minChars, onSearchSubmit]
  );

  const handleFocus = useCallback(() => {
    if (searchTerm.length >= minChars) {
      setIsOpen(true);
      isOpenRef.current = true;
    }
  }, [searchTerm, minChars]);


const showResults = useMemo(() => {
  return (
    isOpen && 
    !disabled && 
    searchTerm.length >= minChars
  );
}, [isOpen, disabled, searchTerm, minChars])

  const searchButton = useMemo(() => (
    <button
      type="button"
      onClick={handleShowAll}
      disabled={!searchTerm || externalLoading || disabled}
      className={cn(
        'w-8 h-8',
        'rounded-full',
        'flex items-center justify-center',
        'transition-all duration-200',
        'focus:outline-none focus:ring-2 focus:ring-primary/50',
        {
          'bg-primary/10 hover:bg-primary/20': searchTerm && !disabled,
          'bg-gray-100 hover:bg-gray-200': !searchTerm || disabled,
          'opacity-50 cursor-not-allowed': !searchTerm || externalLoading || disabled,
        }
      )}
      aria-label="جستجو"
    >
      <SearchOutlined
        className={cn(
          'text-base transition-colors duration-200',
          {
            'text-primary': searchTerm && !disabled,
            'text-gray-400': !searchTerm || disabled,
          }
        )}
      />
    </button>
  ), [searchTerm, externalLoading, disabled, handleShowAll]);

  // آیکون‌های سمت راست (Suffix)
  const rightIcons = useMemo(() => (
    <div className="flex items-center gap-1">
      {searchTerm && !externalLoading && !disabled && (
        <button
          type="button"
          onClick={handleClear}
          className={cn(
            'w-7 h-7',
            'rounded-full',
            'hover:bg-gray-100',
            'transition-all duration-200',
            'flex items-center justify-center',
            'text-gray-400 hover:text-gray-600',
            'focus:outline-none'
          )}
          aria-label="پاک کردن"
        >
          <CloseOutlined className="text-xs" />
        </button>
      )}

      {externalLoading && (
        <div className="w-7 h-7 flex items-center justify-center">
          <div className="animate-spin h-4 w-4 border-2 border-primary border-t-transparent rounded-full" />
        </div>
      )}
    </div>
  ), [searchTerm, externalLoading, disabled, handleClear]);

  // کلاس‌های wrapper
  const wrapperClasses = useMemo(() => cn(
    'relative w-full',
    'border-2 rounded-xl',
    'transition-all duration-300 ease-in-out',
    'bg-white',
    'shadow-sm',
    {
      'border-gray-200 hover:border-gray-300': 
        !isOpen && !error && !disabled,
      
      'border-primary shadow-lg shadow-primary/25 ring-4 ring-primary/15': 
        isOpen && !error,
      
      'border-error shadow-lg shadow-error/25 ring-4 ring-error/15': 
        isOpen && error,
      
      'border-error bg-error/5': 
        error && !isOpen,
      
      'border-gray-200 bg-gray-50 cursor-not-allowed opacity-70': 
        disabled,
    },
  ), [isOpen, error, disabled]);

  return (
    <div
      ref={wrapperRef}
      className={cn('relative w-full z-[9999]', className)}
      {...restProps}
    >
      <div className={wrapperClasses}>
        <Input
          ref={inputRef}
          type="text"
          value={searchTerm}
          onChange={handleChange}
          onFocus={handleFocus}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          variant={variant}
          size={size}
          status={status}
          disabled={externalLoading || disabled}
          fullWidth={fullWidth}
          className={cn(
            '!border-0',
            '!shadow-none',
            '!bg-transparent',
            'focus:!ring-0',
            '!px-3',
            'placeholder-gray-400',
            'text-gray-800',
            inputClassName
          )}
          suffix={rightIcons}
          prefix={searchButton}
        />
      </div>

      <SearchResults
        show={showResults}
        searchTerm={debouncedTerm}
        isLoading={externalLoading ?? false}
        error={error}
        results={results}
        totalResults={totalResults}
        maxResults={maxResults}
        onResultClick={handleResultClick}
        onShowAll={handleShowAll}
        renderItem={renderItem}
        getItemKey={getItemKey}
        emptyText={emptyText}
        loadingText={loadingText}
        errorText={errorText}
        showHeader={showHeader}
        showCount={showCount}
        maxHeight={maxHeight}
      />
    </div>
  );
}

Autocomplete.displayName = 'Autocomplete';

export default React.memo(Autocomplete) as typeof Autocomplete;