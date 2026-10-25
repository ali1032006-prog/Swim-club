"use client";

import { SEASON, findGroupForAge, getPeriod, getTimeSlot } from "@/config/season";
import { usePriceLabels } from "@/hooks/usePriceLabels";
import { ageOnSeasonStart } from "@/lib/age";
import { useBooking } from "@/providers/BookingProvider";
import { useI18n } from "@/providers/I18nProvider";
import { Button } from "@/components/ui/Button";
import { ErrorText } from "@/components/ui/ErrorText";
import { PanelTitle } from "@/components/ui/Panel";
import styles from "./BookingSummary.module.css";

interface BookingSummaryProps {
  submitting: boolean;
  submitError: boolean;
  onConfirm: () => void;
}

/** Itemised order, totals, the confirm button and the confirmation message. */
export function BookingSummary({ submitting, submitError, onConfirm }: BookingSummaryProps) {
  const { t, locale } = useI18n();
  const { children, confirmed } = useBooking();
  const labels = usePriceLabels();
  const { summary, children: childCopy, price } = t.booking;

  return (
    <section className={styles.summary} aria-labelledby="summary-title">
      <PanelTitle id="summary-title">{summary.title}</PanelTitle>

      <ul className={styles.lines}>
        {children.map((child, index) => {
          const group = findGroupForAge(ageOnSeasonStart(child.dob));
          const details = [
            getPeriod(child.period).range[locale],
            getTimeSlot(child.time).name[locale],
            group?.name[locale],
          ].filter(Boolean);

          return (
            <li key={child.id}>
              <div>
                {child.name.trim() || `${childCopy.name} ${index + 1}`}
                <small>{details.join(" · ")}</small>
              </div>
              <span>{labels.money(SEASON.pricePerChild)}</span>
            </li>
          );
        })}
      </ul>

      <dl className={styles.totals}>
        <dt>{price.subtotal}</dt>
        <dd>{labels.subtotal}</dd>
        <dt>{labels.discountLabel}</dt>
        <dd className={styles.discount}>{labels.discountValue}</dd>
        <dt className={styles.grand}>{price.total}</dt>
        <dd className={styles.grand}>{labels.total}</dd>
      </dl>

      <ErrorText>{submitError ? summary.submitFailed : undefined}</ErrorText>
      <Button fullWidth loading={submitting} onClick={onConfirm}>
        {submitting ? summary.confirming : summary.confirm}
      </Button>

      <div className={styles.confirmed} hidden={!confirmed} aria-live="polite">
        <strong>{summary.received}</strong>
        <span>{summary.confirmMessage(children.length)}</span>
      </div>
    </section>
  );
}
