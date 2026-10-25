"use client";

import { createContext, useContext, useMemo, useReducer, type ReactNode } from "react";
import { DEFAULT_PERIOD, DEFAULT_TIME_SLOT } from "@/config/season";
import { calculateTotals, type PriceTotals } from "@/lib/pricing";
import { findChildProblems } from "@/lib/validation";
import type { ChildEntry, ChildProblem, ParentDetails, ParentField } from "@/types/booking";

/* ---------- State ---------- */

interface BookingState {
  children: ChildEntry[];
  nextChildId: number;
  parent: ParentDetails;
  /** True once the visitor has tried to continue, so children errors start showing. */
  childrenChecked: boolean;
  confirmed: boolean;
}

function createChild(id: number, template?: Pick<ChildEntry, "period" | "time">): ChildEntry {
  return {
    id,
    name: "",
    dob: "",
    period: template?.period ?? DEFAULT_PERIOD,
    time: template?.time ?? DEFAULT_TIME_SLOT,
  };
}

const initialState: BookingState = {
  children: [createChild(1)],
  nextChildId: 2,
  parent: { name: "", email: "", phone: "" },
  childrenChecked: false,
  confirmed: false,
};

type BookingAction =
  | { type: "child/add" }
  | { type: "child/remove"; id: number }
  | { type: "child/update"; id: number; patch: Partial<Omit<ChildEntry, "id">> }
  | { type: "parent/update"; field: ParentField; value: string }
  | { type: "children/checked" }
  | { type: "booking/confirmed" };

function reducer(state: BookingState, action: BookingAction): BookingState {
  switch (action.type) {
    case "child/add": {
      // A new child starts from the previous child's period and time, which is usually what siblings want.
      const previous = state.children[state.children.length - 1];
      return {
        ...state,
        children: [...state.children, createChild(state.nextChildId, previous)],
        nextChildId: state.nextChildId + 1,
        confirmed: false,
      };
    }
    case "child/remove":
      if (state.children.length <= 1) return state;
      return {
        ...state,
        children: state.children.filter((child) => child.id !== action.id),
        confirmed: false,
      };
    case "child/update":
      return {
        ...state,
        children: state.children.map((child) =>
          child.id === action.id ? { ...child, ...action.patch } : child,
        ),
        confirmed: false,
      };
    case "parent/update":
      return { ...state, parent: { ...state.parent, [action.field]: action.value } };
    case "children/checked":
      return state.childrenChecked ? state : { ...state, childrenChecked: true };
    case "booking/confirmed":
      return { ...state, confirmed: true };
  }
}

/* ---------- Context ---------- */

interface BookingContextValue {
  children: ChildEntry[];
  /** The id the next added child will receive, so callers can focus it after adding. */
  nextChildId: number;
  parent: ParentDetails;
  childrenChecked: boolean;
  confirmed: boolean;
  totals: PriceTotals;
  problems: ChildProblem[];
  addChild: () => void;
  removeChild: (id: number) => void;
  updateChild: (id: number, patch: Partial<Omit<ChildEntry, "id">>) => void;
  updateParent: (field: ParentField, value: string) => void;
  markChildrenChecked: () => void;
  confirm: () => void;
}

const BookingContext = createContext<BookingContextValue | null>(null);

export function BookingProvider({ children: content }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  const value = useMemo<BookingContextValue>(
    () => ({
      children: state.children,
      nextChildId: state.nextChildId,
      parent: state.parent,
      childrenChecked: state.childrenChecked,
      confirmed: state.confirmed,
      totals: calculateTotals(state.children.length),
      problems: findChildProblems(state.children),
      addChild: () => dispatch({ type: "child/add" }),
      removeChild: (id) => dispatch({ type: "child/remove", id }),
      updateChild: (id, patch) => dispatch({ type: "child/update", id, patch }),
      updateParent: (field, fieldValue) =>
        dispatch({ type: "parent/update", field, value: fieldValue }),
      markChildrenChecked: () => dispatch({ type: "children/checked" }),
      confirm: () => dispatch({ type: "booking/confirmed" }),
    }),
    [state],
  );

  return <BookingContext.Provider value={value}>{content}</BookingContext.Provider>;
}

export function useBooking(): BookingContextValue {
  const context = useContext(BookingContext);
  if (!context) throw new Error("useBooking must be used inside <BookingProvider>");
  return context;
}
