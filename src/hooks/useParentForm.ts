"use client";

import { useCallback, useMemo, useState } from "react";
import { parentFieldId } from "@/lib/dom";
import { PARENT_FIELDS, isParentFieldValid } from "@/lib/validation";
import { useBooking } from "@/providers/BookingProvider";
import type { ParentField } from "@/types/booking";

type FieldFlags = Partial<Record<ParentField, boolean>>;

/**
 * Parent form behaviour: a field shows its error only after it has been left with something
 * typed (or after a submit attempt), then keeps validating live as the visitor edits.
 * Values live in the booking context so they survive going back to the previous step.
 */
export function useParentForm() {
  const { parent, updateParent } = useBooking();
  const [touched, setTouched] = useState<FieldFlags>({});

  const errors = useMemo<FieldFlags>(() => {
    const result: FieldFlags = {};
    for (const field of PARENT_FIELDS) {
      if (touched[field] && !isParentFieldValid(field, parent[field])) result[field] = true;
    }
    return result;
  }, [touched, parent]);

  const onBlur = useCallback(
    (field: ParentField) => {
      if (parent[field]) setTouched((previous) => ({ ...previous, [field]: true }));
    },
    [parent],
  );

  /** Reveals every error and focuses the first invalid field. Returns true when all fields are valid. */
  const validateAll = useCallback((): boolean => {
    setTouched({ name: true, email: true, phone: true });
    const firstInvalid = PARENT_FIELDS.find((field) => !isParentFieldValid(field, parent[field]));
    if (firstInvalid) document.getElementById(parentFieldId(firstInvalid))?.focus();
    return !firstInvalid;
  }, [parent]);

  return { values: parent, errors, onChange: updateParent, onBlur, validateAll };
}

export type ParentFormApi = ReturnType<typeof useParentForm>;
