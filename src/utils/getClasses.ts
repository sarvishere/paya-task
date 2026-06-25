type Variant = 'default' | 'filled' | 'outline' | 'ghost';
type Size = 'sm' | 'md' | 'lg';
type Status = 'default' | 'error' | 'success' | 'warning';

interface ClassOptions {
  variant?: Variant;
  size?: Size;
  status?: Status;
  disabled?: boolean;
  fullWidth?: boolean;
}

export function getClasses(options: ClassOptions = {}): string {
  const {
    variant = 'default',
    size = 'md',
    status = 'default',
    disabled = false,
    fullWidth = false,
  } = options;

  const classes = [
    variant,
    size,
    status !== 'default' ? status : '',
    disabled ? 'disabled' : '',
    fullWidth ? 'w-full' : '',
  ]
    .filter(Boolean)
    .join(' ');

  return classes;
}