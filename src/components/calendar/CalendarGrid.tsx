"use client";

import type { CSSProperties } from "react";
import { PERIODS } from "@/config/season";
import { isWeekend, type DayCell } from "@/lib/calendar";
import { cx } from "@/lib/cx";
import { useI18n } from "@/providers/I18nProvider";
import styles from "./CalendarGrid.module.css";

interface CalendarGridProps {
  /** `null` entries are blank cells before the 1st of the month. */
  cells: ReadonlyArray<DayCell | null>;
  /** Larger touch targets, used inside the booking pop-up. */
  compact?: boolean;
  /** Fade weekdays that fall outside the period (the pop-up shows whole weeks). */
  dimOutside?: boolean;
  /** Tooltip for a day that has sessions. */
  getTitle?: (cell: DayCell) => string;
}

/** Sunday-first month grid. Days with sessions are filled with their period's colour. */
export function CalendarGrid({ cells, compact = false, dimOutside = false, getTitle }: CalendarGridProps) {
  const { t } = useI18n();

  return (
    <div className={cx(styles.grid, compact && styles.compact)}>
      {t.calendar.weekdays.map((name, weekday) => (
        <span key={weekday} className={cx(styles.dow, isWeekend(weekday) && styles.weekend)}>
          {name}
        </span>
      ))}
      {cells.map((cell, index) => {
        if (!cell) return <span key={`blank-${index}`} className={styles.day} />;

        const period = PERIODS[cell.periodIndex];
        if (!period) {
          return (
            <span
              key={cell.key}
              className={cx(
                styles.day,
                isWeekend(cell.weekday) ? styles.weekendDay : dimOutside && styles.outside,
              )}
            >
              {cell.day}
            </span>
          );
        }

        return (
          <span
            key={cell.key}
            className={cx(styles.day, styles.inPeriod, cell.start && styles.start, cell.end && styles.end)}
            style={{ "--pc": period.color, "--i": cell.order } as CSSProperties}
            title={getTitle?.(cell)}
          >
            {cell.day}
          </span>
        );
      })}
    </div>
  );
}
