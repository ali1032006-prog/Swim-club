"use client";

import { cx } from "@/lib/cx";
import { usePriceLabels } from "@/hooks/usePriceLabels";
import { useBooking } from "@/providers/BookingProvider";
import { useI18n } from "@/providers/I18nProvider";
import styles from "./PriceBreakdown.module.css";

/** Live running total shown while children are being added. */
export function PriceBreakdown() {
  const { t } = useI18n();
  const { totals } = useBooking();
  const labels = usePriceLabels();
  const { price } = t.booking;
  const activeTier = Math.min(totals.count, price.tiers.length) - 1;

  return (
    <div className={styles.box} aria-live="polite">
      <h3>{price.title}</h3>
      <div className={styles.tiers}>
        {price.tiers.map((tier, index) => (
          <span key={tier.label} className={cx(styles.tier, index === activeTier && styles.active)}>
            {tier.label}: {tier.note}
          </span>
        ))}
      </div>
      <dl className={styles.lines}>
        <dt>{labels.subtotalLine}</dt>
        <dd>{labels.subtotal}</dd>
        <dt>{labels.discountLabel}</dt>
        <dd className={styles.discount}>{labels.discountValue}</dd>
        <dt className={styles.grand}>{price.currentTotal}</dt>
        <dd className={styles.grand}>{labels.total}</dd>
      </dl>
    </div>
  );
}
