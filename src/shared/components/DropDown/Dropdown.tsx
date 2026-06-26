'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { InputRef } from 'antd';
import { DownOutlined, UpOutlined, CloseOutlined } from '@ant-design/icons';
import { DropdownProps } from './type';
import styles from './Dropdown.module.css';
import Input from '../Input';
import { getClasses } from '@/utils/getClasses';


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
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<InputRef>(null);

  const filteredOptions = options.filter((opt) =>
    opt.label.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opt.value.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const selectedOption = options.find((opt) => opt.value === value);

  const inputClasses = getClasses({
    variant,
    size,
    status,
    disabled,
    fullWidth,
  });

  const dropdownClasses = getClasses({
    variant,
    size,
    status,
    disabled,
    fullWidth,
  });

  const handleSelect = useCallback(
    (selectedValue: string) => {
      if (value === selectedValue) {
        onChange?.(null);
        setSearchTerm('');
      } else {
        onChange?.(selectedValue);
        const selected = options.find((o) => o.value === selectedValue);
        setSearchTerm(selected?.label || '');
      }
      setIsOpen(false);
      inputRef.current?.blur();
    },
    [value, onChange, options]
  );

  const handleClear = useCallback(() => {
    onChange?.(null);
    setSearchTerm('');
    setIsOpen(false);
    inputRef.current?.focus();
  }, [onChange]);

  const toggleDropdown = useCallback((e?: React.MouseEvent) => {
    e?.stopPropagation(); 
    if (!disabled) {
      setIsOpen((prev) => !prev);
      if (!isOpen) {
        setTimeout(() => inputRef.current?.focus(), 100);
      }
    }
  }, [isOpen, disabled]);

  const handleFocus = useCallback(() => {
    if (options.length > 0 && !disabled) {
      setIsOpen(true);
    }
  }, [options.length, disabled]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div ref={containerRef} className={`${styles.container} ${className}`}>
      <Input
        ref={inputRef}
        label={label}
        placeholder={placeholder}
        value={searchTerm || selectedOption?.label || ''}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          if (!isOpen) setIsOpen(true);
        }}
        onFocus={handleFocus}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            setIsOpen(false);
            inputRef.current?.blur();
          }
          if (e.key === 'Enter' && filteredOptions.length === 1) {
            handleSelect(filteredOptions[0].value);
          }
        }}
        disabled={disabled}
        suffix={
          <div className="flex items-center gap-1">
            {allowClear && value && (
              <CloseOutlined
                className="cursor-pointer text-gray-400 hover:text-gray-600 text-sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
              />
            )}
            <span
              className={`cursor-pointer text-gray-400 hover:text-gray-600 transition-colors ${
                disabled ? 'cursor-not-allowed opacity-50' : ''
              }`}
              onClick={toggleDropdown} 
              onMouseDown={(e) => e.preventDefault()} 
            >
              {isOpen ? <UpOutlined /> : <DownOutlined />}
            </span>
          </div>
        }
        fullWidth={fullWidth}
        className={`${inputClasses} w-full`}
      />

      {isOpen && !disabled && (
        <div className={`${styles.dropdown} ${dropdownClasses}`}>
          {loading ? (
            <div className={styles.loadingText}>در حال بارگذاری...</div>
          ) : filteredOptions.length === 0 ? (
            <div className={styles.emptyText}>{emptyText}</div>
          ) : (
            <ul className={styles.dropdownList}>
              {filteredOptions.map((option) => {
                const isSelected = value === option.value;
                return (
                  <li
                    key={option.value}
                    onClick={() => handleSelect(option.value)}
                    className={`${styles.dropdownItem} ${
                      isSelected ? styles.dropdownItemSelected : ''
                    }`}
                  >
                    <span>{option.label}</span>
                    {isSelected && (
                      <span className={styles.checkMark}>✓</span>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}