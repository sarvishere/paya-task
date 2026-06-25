export type Variant = 'default' | 'filled' | 'outline' | 'ghost';
export type Size = 'sm' | 'md' | 'lg';
export type Status = 'default' | 'error' | 'success' | 'warning';

export interface BaseComponentProps {
  variant?: Variant;
  size?: Size;
  status?: Status;
  disabled?: boolean;
  fullWidth?: boolean;
  className?: string;
}