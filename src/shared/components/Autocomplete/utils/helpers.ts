export function getItemTitle(item: any): string {
  if (typeof item === 'string') return item;
  if (typeof item === 'number') return String(item);
  if (typeof item === 'object' && item !== null) {
    return item.title || item.name || item.label || item.value || 'بدون عنوان';
  }
  return 'بدون عنوان';
}

