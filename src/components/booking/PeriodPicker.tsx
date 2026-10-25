"use client";

import { useEffect, useRef, useState } from "react";
import { PERIODS, type PeriodId } from "@/config/season";
import { useI18n } from "@/providers/I18nProvider";
import { Field } from "@/components/ui/Field";
import { MiniCalendar } from "./MiniCalendar";
import styles from "./PeriodPicker.module.css";

interface PeriodPickerProps {
  id: string;
  label: string;
  value: PeriodId;
  onChange: (value: PeriodId) => void;
}

/** Period dropdown that pops up a small calendar of the chosen period's dates. */
export function PeriodPicker({ id, label, value, onChange }: PeriodPickerProps) {
  const { locale } = useI18n();
  const [open, setOpen] = useState(false);
  const wrapper = useRef<HTMLDivElement>(null);

  // While open: Escape or a click elsewhere closes the pop-up.
  useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: MouseEvent) {
      if (!wrapper.current?.contains(event.target as Node)) setOpen(false);
    }
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setOpen(false);
    }

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  function close() {
    setOpen(false);
    document.getElementById(id)?.focus();
  }

  return (
    <div ref={wrapper} className={styles.wrapper}>
      <Field id={id} label={label}>
        {(aria) => (
          <select
            id={id}
            {...aria}
            value={value}
            onChange={(event) => {
              onChange(event.target.value as PeriodId);
              setOpen(true);
            }}
          >
            {PERIODS.map((period) => (
              <option key={period.id} value={period.id}>
                {period.range[locale]}
              </option>
            ))}
          </select>
        )}
      </Field>
      {open && (
        // Keyed by period so the pop-in animation replays when the choice changes.
        <div key={value} className={styles.pop} role="dialog" aria-label={label}>
          <MiniCalendar periodId={value} onClose={close} />
        </div>
      )}
    </div>
  );
}
