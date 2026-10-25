"use client";

import { SEASON, TIME_SLOTS, findGroupForAge } from "@/config/season";
import { ageOnSeasonStart } from "@/lib/age";
import { cx } from "@/lib/cx";
import { childFieldId } from "@/lib/dom";
import { useI18n } from "@/providers/I18nProvider";
import type { ChildEntry } from "@/types/booking";
import { SegmentedControl } from "@/components/ui/SegmentedControl";
import { TextField } from "@/components/ui/Field";
import { PeriodPicker } from "./PeriodPicker";
import styles from "./ChildCard.module.css";

interface ChildCardProps {
  child: ChildEntry;
  /** 1-based position, used in accessible labels. */
  position: number;
  canRemove: boolean;
  autoFocusName: boolean;
  onChange: (patch: Partial<Omit<ChildEntry, "id">>) => void;
  onRemove: () => void;
}

/** Form for one swimmer: name, date of birth, period and session time. */
export function ChildCard({ child, position, canRemove, autoFocusName, onChange, onRemove }: ChildCardProps) {
  const { t, locale } = useI18n();
  const copy = t.booking.children;

  const age = ageOnSeasonStart(child.dob);
  const group = findGroupForAge(age);
  const showGroup = child.dob !== "" && age !== null;

  return (
    <article className={styles.card}>
      {(showGroup || canRemove) && (
        <div className={styles.head}>
          {showGroup &&
            (group ? (
              <span className={styles.pill}>
                {group.name[locale]} · {group.ages[locale]}
              </span>
            ) : (
              <span className={cx(styles.pill, styles.pillBad)}>{copy.ageOutOfRange}</span>
            ))}
          {canRemove && (
            <button
              type="button"
              className={styles.remove}
              aria-label={copy.removeAria(position)}
              onClick={onRemove}
            >
              {copy.remove}
            </button>
          )}
        </div>
      )}

      <div className={styles.fields}>
        <TextField
          id={childFieldId(child.id, "name")}
          label={copy.name}
          type="text"
          value={child.name}
          placeholder={copy.namePlaceholder}
          autoComplete="off"
          autoFocus={autoFocusName}
          onChange={(event) => onChange({ name: event.target.value })}
        />
        <TextField
          id={childFieldId(child.id, "dob")}
          label={copy.dob}
          type="date"
          min={SEASON.dobMin}
          max={SEASON.dobMax}
          value={child.dob}
          onChange={(event) => onChange({ dob: event.target.value })}
        />
      </div>

      <PeriodPicker
        id={`child-period-${child.id}`}
        label={copy.period}
        value={child.period}
        onChange={(period) => onChange({ period })}
      />

      <SegmentedControl
        legend={copy.sessionTime}
        name={`child-time-${child.id}`}
        value={child.time}
        options={TIME_SLOTS.map((slot) => ({
          value: slot.id,
          label: slot.name[locale],
          detail: slot.hours[locale],
        }))}
        onChange={(time) => onChange({ time })}
      />
    </article>
  );
}
