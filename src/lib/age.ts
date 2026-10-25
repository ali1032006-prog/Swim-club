import { SEASON } from "@/config/season";

const ISO_DATE = /^(\d{4})-(\d{2})-(\d{2})$/;

/** Age on the first day of the season, or null if `dob` isn't a complete yyyy-mm-dd date. */
export function ageOnSeasonStart(dob: string): number | null {
  const match = ISO_DATE.exec(dob);
  if (!match) return null;

  const year = Number(match[1]);
  const month = Number(match[2]);
  const day = Number(match[3]);
  const ref = SEASON.ageReferenceDate;

  let age = ref.year - year;
  if (ref.month < month || (ref.month === month && ref.day < day)) age -= 1;
  return age;
}
