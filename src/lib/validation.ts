import { findGroupForAge } from "@/config/season";
import type { ChildEntry, ChildProblem, ParentField } from "@/types/booking";
import { ageOnSeasonStart } from "./age";

export const PARENT_FIELDS: readonly ParentField[] = ["name", "email", "phone"];

const parentRules: Record<ParentField, (value: string) => boolean> = {
  name: (value) => value.trim().length >= 2,
  email: (value) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(value.trim()),
  phone: (value) => value.replace(/\D/g, "").length >= 8,
};

export function isParentFieldValid(field: ParentField, value: string): boolean {
  return parentRules[field](value);
}

/** Everything that stops the children list from being booked, in on-screen order. */
export function findChildProblems(children: readonly ChildEntry[]): ChildProblem[] {
  const problems: ChildProblem[] = [];

  children.forEach((child, index) => {
    const base = { childId: child.id, position: index + 1, childName: child.name.trim() };
    if (!base.childName) problems.push({ ...base, field: "name" });
    if (!findGroupForAge(ageOnSeasonStart(child.dob))) problems.push({ ...base, field: "dob" });
  });

  return problems;
}
