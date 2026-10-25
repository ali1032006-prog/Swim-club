import type { ChildProblem, ParentField } from "@/types/booking";

/** Element ids shared between components that render a field and code that needs to focus it. */
export const childFieldId = (childId: number, field: "name" | "dob"): string =>
  `child-${field}-${childId}`;

export const parentFieldId = (field: ParentField): string => `parent-${field}`;

export function focusChildProblem(problem: ChildProblem): void {
  document.getElementById(childFieldId(problem.childId, problem.field))?.focus();
}

export function scrollToId(id: string): void {
  const element = document.getElementById(id);
  if (!element) return;
  const details = element.closest("details");
  if (details) details.open = true;
  element.scrollIntoView({ behavior: "smooth", block: "start" });
}

export function scrollToTop(): void {
  window.scrollTo({ top: 0, behavior: "smooth" });
}
