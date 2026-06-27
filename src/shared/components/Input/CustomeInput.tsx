'use client';

import { forwardRef, memo, useMemo, useCallback } from 'react';
import { Input as AntdInput, InputRef, Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';
import { getClasses } from '@/utils/getClasses';
import styles from './Input.module.css';
import { InputProps } from './type';

const CustomInput = forwardRef<InputRef, InputProps>(
  (
    {
      variant = 'default',
      size = 'md',
      status = 'default',
      disabled = false,
      fullWidth = true,
      className = '',
      label,
      suffix,
      prefix,
      loading = false,
      error = null,
      onChange,
      onFocus,
      onBlur,
      ...restProps
    },
    ref
  ) => {
    const globalClasses = useMemo(
      () => getClasses({ variant, size, status, disabled, fullWidth }),
      [variant, size, status, disabled, fullWidth]
    );

    const inputClasses = useMemo(
      () => [styles.input, className, globalClasses].filter(Boolean).join(' '),
      [className, globalClasses]
    );

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => onChange?.(e),
      [onChange]
    );
    const handleFocus = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => onFocus?.(e),
      [onFocus]
    );
    const handleBlur = useCallback(
      (e: React.FocusEvent<HTMLInputElement>) => onBlur?.(e),
      [onBlur]
    );

    const finalSuffix = (
      <div className="flex items-center gap-1">
        {loading && (
          <Spin indicator={<LoadingOutlined style={{ fontSize: 12 }} spin />} />
        )}
        {suffix}
      </div>
    );

    return (
      <div className="flex flex-col gap-1 w-full">
        {label && (
          <label className="text-sm font-medium text-gray-700">{label}</label>
        )}
        <AntdInput
          {...restProps}
          ref={ref}
          className={inputClasses}
          disabled={disabled || loading}
          status={error ? 'error' : status === 'default' ? undefined : status}
          suffix={finalSuffix}
          prefix={prefix}
          onChange={handleChange}
          onFocus={handleFocus}
          onBlur={handleBlur}
        />
        {error && (
          <span className="text-xs text-red-500 mt-1">{error}</span>
        )}
      </div>
    );
  }
);

CustomInput.displayName = 'CustomInput';

export default memo(CustomInput);