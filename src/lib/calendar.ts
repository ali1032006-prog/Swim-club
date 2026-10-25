import { PERIODS } from "@/config/season";

/** Sessions run Sunday (0) to Thursday (4). */
const LAST_SESSION_WEEKDAY = 4;

export const isWeekend = (weekday: number): boolean => weekday > LAST_SESSION_WEEKDAY;

export interface DayCell {
  key: string;
  day: number;
  weekday: number;
  /** Index into PERIODS, or -1 when this day has no sessions. */
  periodIndex: number;
  /** First / last session day of a run, used to round the ends of the highlight. */
  start: boolean;
  end: boolean;
  /** Position among highlighted days, used to stagger the entry animation. */
  order: number;
}

function periodIndexOn(year: number, month: number, day: number): number {
  const weekday = new Date(year, month, day).getDay();
  if (isWeekend(weekday)) return -1;
  return PERIODS.findIndex(
    ({ span }) => span.year === year && span.month === month && day >= span.from && day <= span.to,
  );
}

/** Cells for a full month grid (weeks start on Sunday). Leading blanks are `null`. */
export function buildMonthCells(year: number, month: number): Array<DayCell | null> {
  const leadingBlanks = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const cells: Array<DayCell | null> = Array.from({ length: leadingBlanks }, () => null);
  let order = 0;

  for (let day = 1; day <= daysInMonth; day++) {
    const weekday = new Date(year, month, day).getDay();
    const periodIndex = periodIndexOn(year, month, day);
    const inPeriod = periodIndex >= 0;
    const span = PERIODS[periodIndex]?.span;

    cells.push({
      key: `${year}-${month}-${day}`,
      day,
      weekday,
      periodIndex,
      start: inPeriod && (weekday === 0 || day === span.from),
      end: inPeriod && (weekday === LAST_SESSION_WEEKDAY || day === span.to),
      order: inPeriod ? order++ : 0,
    });
  }

  return cells;
}

/** Cells for the whole weeks that contain one period, so the mini calendar always shows full rows. */
export function buildPeriodCells(periodIndex: number): DayCell[] {
  const { year, month, from, to } = PERIODS[periodIndex].span;
  const first = from - new Date(year, month, from).getDay();
  const last = to + (6 - new Date(year, month, to).getDay());
  const cells: DayCell[] = [];
  let order = 0;

  for (let d = first; d <= last; d++) {
    const date = new Date(year, month, d);
    const weekday = date.getDay();
    const inPeriod = d >= from && d <= to && !isWeekend(weekday);

    cells.push({
      key: `${year}-${month}-${d}`,
      day: date.getDate(),
      weekday,
      periodIndex: inPeriod ? periodIndex : -1,
      start: inPeriod && (weekday === 0 || d === from),
      end: inPeriod && (weekday === LAST_SESSION_WEEKDAY || d === to),
      order: inPeriod ? order++ : 0,
    });
  }

  return cells;
}
