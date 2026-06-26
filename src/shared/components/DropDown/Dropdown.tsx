'use client';

import { useCallback, useRef, useMemo } from 'react';
import { Select, Spin } from 'antd';
import { SelectProps } from 'antd/es/select';
import { DownOutlined, CloseOutlined } from '@ant-design/icons';
import styles from './Dropdown.module.css';
import { getClasses } from '@/utils/getClasses';

interface DropdownOption {
  label: string;
  value: string;
}

interface DropdownProps {
  options: DropdownOption[];
  value?: string | null;
  onChange?: (value: string | null) => void;
  placeholder?: string;
  label?: string;
  className?: string;
  disabled?: boolean;
  allowClear?: boolean;
  loading?: boolean;
  emptyText?: string;
  variant?: 'default' | 'filled' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  status?: 'default' | 'error' | 'success' | 'warning';
  fullWidth?: boolean;
}

export default function Dropdown({
  options,
  value,
  onChange,
  placeholder = 'انتخاب کنید...',
  label,
  className = '',
  disabled = false,
  allowClear = true,
  loading = false,
  emptyText = 'گزینه‌ای یافت نشد',
  variant = 'default',
  size = 'md',
  status = 'default',
  fullWidth = false,
}: DropdownProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const selectOptions = useMemo(
    () => options.map((opt) => ({
      label: opt.label,
      value: opt.value,
    })),
    [options]
  );

  const handleChange = useCallback(
    (selectedValue: string | string[]) => {
      if (Array.isArray(selectedValue)) {
        onChange?.(selectedValue[0] || null);
      } else {
        onChange?.(selectedValue || null);
      }
    },
    [onChange]
  );

  const getSize = (): SelectProps['size'] => {
    switch (size) {
      case 'sm':
        return 'small';
      case 'lg':
        return 'large';
      default:
        return 'middle';
    }
  };

  const getStatus = (): SelectProps['status'] => {
    switch (status) {
      case 'error':
        return 'error';
      case 'warning':
        return 'warning';
      default:
        return undefined;
    }
  };

  const getAntdVariant = (): 'outlined' | 'filled' | 'borderless' => {
    switch (variant) {
      case 'filled':
        return 'filled';
      case 'outline':
        return 'outlined';
      case 'ghost':
        return 'borderless';
      default:
        return 'outlined';
    }
  };

  const selectClasses = getClasses({
    variant,
    size,
    status,
    disabled,
    fullWidth,
  });

  const suffixIcon = (
    <div className={styles.suffixWrapper}>
      {allowClear && value && (
        <CloseOutlined 
          className={styles.clearIcon}
          onClick={(e) => {
            e.stopPropagation();
            onChange?.(null);
          }}
        />
      )}
      <DownOutlined className={styles.arrowIcon} />
    </div>
  );

  return (
    <div 
      ref={containerRef} 
      className={`${styles.container} ${className}`}
    >
      {label && (
        <label className={styles.label}>
          {label}
        </label>
      )}
      
      <Select
        className={`${styles.select} ${selectClasses}`}
        placeholder={placeholder}
        value={value || undefined}
        onChange={handleChange}
        disabled={disabled}
        loading={loading}
        allowClear={false}
        size={getSize()}
        status={getStatus()}
        options={selectOptions}
        showSearch
        notFoundContent={loading ? <Spin size="small" /> : emptyText}
        variant={getAntdVariant()}
        suffixIcon={suffixIcon}
        getPopupContainer={(triggerNode) => triggerNode.parentNode as HTMLElement}
        {...(variant === 'ghost' && {
          bordered: false,
        })}
      />
    </div>
  );
}