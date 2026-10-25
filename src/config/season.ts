import type { Localized } from "@/i18n/config";

/** Season-wide rules. Change these, not the components, when the season changes. */
export const SEASON = {
  /** Ages are worked out as of this date (month is 1-based). */
  ageReferenceDate: { year: 2026, month: 12, day: 6 },
  minAge: 6,
  maxAge: 18,
  /** Date-input bounds that match minAge / maxAge on the reference date. */
  dobMin: "2007-12-07",
  dobMax: "2020-12-06",
  pricePerChild: 120,
  sessionsPerPeriod: 10,
} as const;

export const CLUB = {
  frontDeskPhone: "+965 2200 0000",
} as const;

/* ---------- Periods ---------- */

export type PeriodId = "p1" | "p2" | "p3" | "p4";

export interface Period {
  id: PeriodId;
  /** CSS colour token used on calendars and legends. */
  color: string;
  /** Sessions run Sunday–Thursday between `from` and `to`. `month` is 0-based like Date. */
  span: { year: number; month: number; from: number; to: number };
  name: Localized;
  range: Localized;
  detail: Localized;
}

export const PERIODS: readonly Period[] = [
  {
    id: "p1",
    color: "var(--p1)",
    span: { year: 2026, month: 11, from: 6, to: 17 },
    name: { en: "Period 1", ar: "الفترة 1" },
    range: { en: "6 – 17 Dec 2026", ar: "6 – 17 ديسمبر 2026" },
    detail: { en: "Sun 6 Dec – Thu 17 Dec", ar: "الأحد 6 ديسمبر – الخميس 17 ديسمبر" },
  },
  {
    id: "p2",
    color: "var(--p2)",
    span: { year: 2026, month: 11, from: 20, to: 31 },
    name: { en: "Period 2", ar: "الفترة 2" },
    range: { en: "20 – 31 Dec 2026", ar: "20 – 31 ديسمبر 2026" },
    detail: { en: "Sun 20 Dec – Thu 31 Dec", ar: "الأحد 20 ديسمبر – الخميس 31 ديسمبر" },
  },
  {
    id: "p3",
    color: "var(--p3)",
    span: { year: 2027, month: 0, from: 3, to: 14 },
    name: { en: "Period 3", ar: "الفترة 3" },
    range: { en: "3 – 14 Jan 2027", ar: "3 – 14 يناير 2027" },
    detail: { en: "Sun 3 Jan – Thu 14 Jan", ar: "الأحد 3 يناير – الخميس 14 يناير" },
  },
  {
    id: "p4",
    color: "var(--p4)",
    span: { year: 2027, month: 0, from: 17, to: 28 },
    name: { en: "Period 4", ar: "الفترة 4" },
    range: { en: "17 – 28 Jan 2027", ar: "17 – 28 يناير 2027" },
    detail: { en: "Sun 17 Jan – Thu 28 Jan", ar: "الأحد 17 يناير – الخميس 28 يناير" },
  },
];

/** Months shown on the home page calendar (month is 0-based). */
export const CALENDAR_MONTHS: readonly { year: number; month: number }[] = [
  { year: 2026, month: 11 },
  { year: 2027, month: 0 },
];

export const DEFAULT_PERIOD: PeriodId = "p1";

export function getPeriod(id: PeriodId): Period {
  return PERIODS.find((period) => period.id === id) ?? PERIODS[0];
}

/* ---------- Daily session times ---------- */

export type TimeSlotId = "morning" | "afternoon" | "evening";

export interface TimeSlot {
  id: TimeSlotId;
  name: Localized;
  hours: Localized;
}

export const TIME_SLOTS: readonly TimeSlot[] = [
  {
    id: "morning",
    name: { en: "Morning", ar: "الصباح" },
    hours: { en: "8:00 – 10:00 am", ar: "8:00 – 10:00 ص" },
  },
  {
    id: "afternoon",
    name: { en: "Afternoon", ar: "بعد الظهر" },
    hours: { en: "1:00 – 3:00 pm", ar: "1:00 – 3:00 م" },
  },
  {
    id: "evening",
    name: { en: "Evening", ar: "المساء" },
    hours: { en: "5:00 – 7:00 pm", ar: "5:00 – 7:00 م" },
  },
];

export const DEFAULT_TIME_SLOT: TimeSlotId = "morning";

export function getTimeSlot(id: TimeSlotId): TimeSlot {
  return TIME_SLOTS.find((slot) => slot.id === id) ?? TIME_SLOTS[0];
}

/* ---------- Age groups ---------- */

export interface SwimGroup {
  id: string;
  minAge: number;
  maxAge: number;
  name: Localized;
  ages: Localized;
}

export const GROUPS: readonly SwimGroup[] = [
  {
    id: "minnows",
    minAge: 6,
    maxAge: 8,
    name: { en: "Minnows", ar: "السمكات الصغيرة" },
    ages: { en: "Ages 6–8", ar: "من 6 إلى 8 سنوات" },
  },
  {
    id: "dolphins",
    minAge: 9,
    maxAge: 11,
    name: { en: "Dolphins", ar: "الدلافين" },
    ages: { en: "Ages 9–11", ar: "من 9 إلى 11 سنة" },
  },
  {
    id: "marlins",
    minAge: 12,
    maxAge: 13,
    name: { en: "Marlins", ar: "أسماك المرلين" },
    ages: { en: "Ages 12–13", ar: "من 12 إلى 13 سنة" },
  },
  {
    id: "sharks",
    minAge: 14,
    maxAge: 18,
    name: { en: "Sharks", ar: "أسماك القرش" },
    ages: { en: "Ages 14–18", ar: "من 14 إلى 18 سنة" },
  },
];

export function findGroupForAge(age: number | null): SwimGroup | undefined {
  if (age === null) return undefined;
  return GROUPS.find((group) => age >= group.minAge && age <= group.maxAge);
}
