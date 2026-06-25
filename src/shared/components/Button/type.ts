import type { ButtonProps as AntdButtonProps } from 'antd';

export type Variant = 'default' | 'filled' | 'outline' | 'ghost';
export type Size = 'sm' | 'md' | 'lg';
export type Status = 'default' | 'error' | 'success' | 'warning';

export interface ButtonProps extends Omit<AntdButtonProps, 'size' | 'type' | 'danger' | 'variant'> {
  variant?: Variant;
  size?: Size;
  status?: Status;
  fullWidth?: boolean;
  loading?: boolean;
  disabled?: boolean;
  className?: string;
  children?: React.ReactNode;
  icon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  htmlType?: 'button' | 'submit' | 'reset';
}