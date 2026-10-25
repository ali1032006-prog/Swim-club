"use client";

import type { CSSProperties } from "react";
import { PERIODS, getPeriod, type PeriodId } from "@/config/season";
import { buildPeriodCells } from "@/lib/calendar";
import { useI18n } from "@/providers/I18nProvider";
import { CalendarGrid } from "@/components/calendar/CalendarGrid";
import styles from "./MiniCalendar.module.css";

interface MiniCalendarProps {
  periodId: PeriodId;
  onClose: () => void;
}

/** The whole weeks of one period, with a one-line reminder of what the period includes. */
export function MiniCalendar({ periodId, onClose }: MiniCalendarProps) {
  const { t, locale } = useI18n();
  const period = getPeriod(periodId);
  const periodIndex = PERIODS.indexOf(period);

  return (
    <>
      <div className={styles.head}>
        <b>
          {t.calendar.months[period.span.month]} {period.span.year}
        </b>
        <button type="button" className={styles.close} aria-label={t.common.close} onClick={onClose}>
          ×
        </button>
      </div>
      <CalendarGrid cells={buildPeriodCells(periodIndex)} compact dimOutside />
      <p className={styles.note}>
        <span className={styles.swatch} style={{ "--pc": period.color } as CSSProperties} aria-hidden="true" />
        {period.detail[locale]} · {t.booking.periodPopup.note}
      </p>
    </>
  );
}
