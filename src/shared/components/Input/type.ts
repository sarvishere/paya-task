import { BaseComponentProps } from '@/shared/types/style';

export interface InputProps extends BaseComponentProps {
  label?: string;
  suffix?: React.ReactNode;
  prefix?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  placeholder?: string;
  type?: string;
  name?: string;
  id?: string;
  required?: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onFocus?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onBlur?: (e: React.FocusEvent<HTMLInputElement>) => void;
  onPressEnter?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  onKeyDown?: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  maxLength?: number;
  showCount?: boolean;
  autoFocus?: boolean;
  readOnly?: boolean;
  loading : boolean;
  error?: string | null;
}