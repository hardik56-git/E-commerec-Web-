/**
 * Formats a number into Japanese Yen currency format.
 * Example: 185000 -> "¥185,000"
 */
export function formatJpy(amount: number): string {
  return new Intl.NumberFormat('ja-JP', {
    style: 'currency',
    currency: 'JPY',
    maximumFractionDigits: 0,
  }).format(amount);
}
