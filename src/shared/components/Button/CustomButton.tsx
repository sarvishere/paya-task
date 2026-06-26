"use client";

import React from 'react';
import { Button as AntdButton } from 'antd';
import { cn } from '@/utils/cn';
import { ButtonProps } from './type';
import { getClasses } from '@/utils/getClasses';
import styles from './Button.module.css';

const CustomButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      variant = 'default',
      size = 'md',
      status = 'default',
      fullWidth = false,
      loading = false,
      disabled = false,
      children,
      className = '',
      onClick,
      type = 'button',
      htmlType = 'button',
      icon,
      ...restProps
    },
    ref
  ) => {
    const globalClasses = getClasses({
      variant,
      size,
      status,
      disabled,
      fullWidth,
    });

    const buttonClasses = cn(
      styles.button,
      {
        [styles.loading]: loading,
        [styles.fullWidth]: fullWidth,
        [styles.ripple]: !disabled && !loading,
        [styles.focusVisible]: true,
      },
      globalClasses,
      className
    );

    return (
      <AntdButton
        ref={ref}
        className={buttonClasses}
        onClick={onClick}
        disabled={disabled || loading}
        loading={loading}
        icon={icon}
        htmlType={htmlType}
        {...restProps}
      >
        {loading ? (
          <span className={styles.loadingWrapper}>
            <span className={styles.spinner} />
            <span className={styles.content}>{children}</span>
          </span>
        ) : (
          children
        )}
      </AntdButton>
    );
  }
);

CustomButton.displayName = 'CustomButton';

export default CustomButton;