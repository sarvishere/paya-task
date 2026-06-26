'use client';

import React, { useRef, ReactNode, useCallback, useMemo } from 'react';
import { AutoComplete, Spin, ConfigProvider, Input } from 'antd';
import { SearchOutlined, LoadingOutlined, CloseOutlined } from '@ant-design/icons';
import type { BaseOptionType } from 'antd/es/select';
import { cn } from '@/utils/cn';
import { AutocompleteProps } from './type';
import { useAutocomplete } from './hooks/useAutocomplete';
import styles from './Autocomplete.module.css';

interface OptionType extends BaseOptionType {
  key: string;
  value: string;
  label: ReactNode;
  item: unknown;
}

function Autocomplete<T = unknown>({
  placeholder = 'جستجو...',
  debounceDelay = 400,
  minChars = 2,
  onSearch,
  onResultClick,
  onSearchSubmit,
  loading: externalLoading = false,
  results = [],
  totalResults = 0,
  maxResults = 10,
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
  maxHeight = 400,
  allowClear = true,
  showHeader = false,
  showCount = false,
  ...restProps
}: AutocompleteProps<T>): React.ReactElement {
  const containerRef = useRef<HTMLDivElement>(null);

  const {
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
  } = useAutocomplete({
    minChars,
    debounceDelay,
    onSearch,
    onSearchSubmit,
    onResultClick,
    results,
    externalLoading,
    error,
    disabled,
    renderItem,
    getItemKey,
  });

  // سافیکس مثل دراپ‌دان
  const suffixIcon = (
    <div className={styles.suffixWrapper}>
      {allowClear && searchTerm && (
        <CloseOutlined
          className={styles.clearIcon}
          onClick={(e) => {
            e.stopPropagation();
            handleClear();
          }}
        />
      )}
      {externalLoading ? (
        <Spin indicator={<LoadingOutlined style={{ fontSize: 12 }} spin />} />
      ) : (
        <SearchOutlined className={styles.searchIcon} />
      )}
    </div>
  );

  const handleSelect = useCallback((value: string, option: OptionType | OptionType[]) => {
    const selectedOption = Array.isArray(option) ? option[0] : option;
    if (selectedOption?.item) {
      handleResultClick(selectedOption.item as T);
    }
  }, [handleResultClick]);

  const formattedOptions = useMemo((): OptionType[] => {
    return options.map((item: T, index: number) => {
      const key = getItemKey ? getItemKey(item, index) : index;

      return {
        key: String(key),
        value: typeof item === 'string' ? item : String(key),
        label: renderItem ? renderItem(item, index) : String(item),
        item: item,
      };
    });
  }, [options, renderItem, getItemKey]);

  const renderPopup = useCallback((menu: ReactNode) => {
    if (externalLoading) {
      return (
        <div className={styles.loadingState}>
          <Spin size="small" />
          <span>{loadingText}</span>
        </div>
      );
    }

    if (error) {
      return (
        <div className={styles.errorState}>
          {errorText}: {error}
        </div>
      );
    }

    if (!formattedOptions || formattedOptions.length === 0) {
      return <div className={styles.emptyState}>{emptyText}</div>;
    }

    const header = showHeader && (
      <div className={styles.popupHeader}>
        {showCount && totalResults > 0 && (
          <span className={styles.count}>{totalResults} نتیجه</span>
        )}
        {showCount && maxResults > 0 && totalResults > maxResults && (
          <span className={styles.subCount}>
            نمایش {Math.min(maxResults, formattedOptions.length)} از {totalResults}
          </span>
        )}
        {showCount && totalResults === 0 && (
          <span className={styles.count}>نتیجه‌ای یافت نشد</span>
        )}
      </div>
    );

    return (
      <>
        {header}
        {menu}
      </>
    );
  }, [externalLoading, loadingText, error, errorText, formattedOptions, emptyText, showHeader, showCount, totalResults, maxResults]);

  return (
    <ConfigProvider
      theme={{
        components: {
          Select: {
            zIndexPopup: 9999,
          },
        },
        token: {
          zIndexPopupBase: 9999,
        },
      }}
    >
      <div
        ref={containerRef}
        className={`${styles.container} ${className}`}
        {...restProps}
      >

        <AutoComplete<string, OptionType>
          value={searchTerm}
          options={formattedOptions}
          open={isOpen}
          onSelect={handleSelect}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={styles.autocomplete}
          notFoundContent={null}
          popupMatchSelectWidth={true}
          getPopupContainer={(triggerNode) =>
            triggerNode.parentElement || document.body
          }
          allowClear={false}
          onClear={handleClear}
          popupRender={renderPopup}
          showSearch={{
            onSearch: handleChange,
          }}
        >
          <Input
            // ref={inputRef}
            placeholder={placeholder}
            disabled={externalLoading || disabled}
            className={cn(
              '!shadow-none !bg-transparent focus:!ring-0',
              inputClassName
            )}
            suffix={suffixIcon}
            onKeyDown={handleKeyDown}
            onPressEnter={handleSearchSubmit}
          />
        </AutoComplete>
      </div>
    </ConfigProvider>
  );
}

Autocomplete.displayName = 'Autocomplete';

export default React.memo(Autocomplete) as typeof Autocomplete;