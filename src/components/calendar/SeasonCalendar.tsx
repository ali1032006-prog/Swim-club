"use client";

import { CALENDAR_MONTHS, PERIODS, TIME_SLOTS } from "@/config/season";
import { buildMonthCells } from "@/lib/calendar";
import { useI18n } from "@/providers/I18nProvider";
import { CalendarGrid } from "./CalendarGrid";
import styles from "./SeasonCalendar.module.css";

/** The winter calendar with a colour-coded legend of the four periods beside it. */
export function SeasonCalendar() {
  const { t, locale } = useI18n();
  const timeNames = TIME_SLOTS.map((slot) => slot.name[locale]).join(" / ");

  return (
    <div className={styles.calendar}>
      <div className={styles.months}>
        {CALENDAR_MONTHS.map(({ year, month }) => (
          <section key={`${year}-${month}`} className={styles.month}>
            <h3>
              {t.calendar.months[month]} {year}
            </h3>
            <CalendarGrid
              cells={buildMonthCells(year, month)}
              getTitle={(cell) => `${PERIODS[cell.periodIndex].name[locale]} · ${timeNames}`}
            />
          </section>
        ))}
      </div>
      <ul className={styles.legend}>
        {PERIODS.map((period) => (
          <li key={period.id} className={styles.legendItem}>
            <span className={styles.swatch} style={{ background: period.color }} aria-hidden="true" />
            <span className={styles.legendText}>
              <b>{period.name[locale]}</b>
              <span>{period.range[locale]}</span>
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
