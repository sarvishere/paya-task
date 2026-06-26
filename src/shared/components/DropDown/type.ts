export interface DropdownOption {
  value: string;
  label: string;
  [key: string]: unknown;
}

export interface DropdownProps {
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