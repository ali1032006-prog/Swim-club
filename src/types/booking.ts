import type { PeriodId, TimeSlotId } from "@/config/season";

export interface ChildEntry {
  id: number;
  name: string;
  /** ISO date (yyyy-mm-dd) from the date input, or "" when empty or incomplete. */
  dob: string;
  period: PeriodId;
  time: TimeSlotId;
}

export interface ParentDetails {
  name: string;
  email: string;
  phone: string;
}

export type ParentField = keyof ParentDetails;

/** Why a child entry can't be booked yet. Kept as data so messages follow the active language. */
export interface ChildProblem {
  childId: number;
  /** 1-based position in the list, for messages like "Add a name for child 2". */
  position: number;
  childName: string;
  field: "name" | "dob";
}
