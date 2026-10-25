import { SEASON } from "@/config/season";

/** Highest matching tier wins. Keep sorted from largest to smallest `minChildren`. */
export const DISCOUNT_TIERS = [
  { minChildren: 3, rate: 0.15 },
  { minChildren: 2, rate: 0.1 },
] as const;

/** Booking sizes shown as examples on the home page fee card. */
export const FEE_EXAMPLE_COUNTS = [1, 2, 3] as const;

export interface PriceTotals {
  count: number;
  subtotal: number;
  rate: number;
  discount: number;
  total: number;
}

export function discountRateFor(childCount: number): number {
  return DISCOUNT_TIERS.find((tier) => childCount >= tier.minChildren)?.rate ?? 0;
}

export function calculateTotals(childCount: number): PriceTotals {
  const subtotal = childCount * SEASON.pricePerChild;
  const rate = discountRateFor(childCount);
  const discount = subtotal * rate;
  return { count: childCount, subtotal, rate, discount, total: subtotal - discount };
}

export function formatMoney(amount: number, currency: string): string {
  return `${amount.toFixed(3)} ${currency}`;
}

export const toPercent = (rate: number): number => Math.round(rate * 100);
