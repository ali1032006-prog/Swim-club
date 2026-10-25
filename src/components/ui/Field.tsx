import type { ComponentPropsWithoutRef, ReactNode } from "react";
import { cx } from "@/lib/cx";
import { ErrorText } from "./ErrorText";
import styles from "./Field.module.css";

interface FieldProps {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  className?: string;
  /** Receives the aria attributes that tie the control to its hint and error. */
  children: (aria: { "aria-describedby"?: string; "aria-invalid"?: boolean }) => ReactNode;
}

/** Label + control + hint + error. Use it for any control, e.g. a <select>. */
export function Field({ id, label, hint, error, className, children }: FieldProps) {
  const hintId = hint ? `${id}-hint` : undefined;
  const errorId = `${id}-error`;
  const describedBy = [hintId, errorId].filter(Boolean).join(" ");

  return (
    <div className={cx(styles.field, className)}>
      <label htmlFor={id}>{label}</label>
      {children({ "aria-describedby": describedBy, "aria-invalid": error ? true : undefined })}
      {hint && (
        <span className={styles.hint} id={hintId}>
          {hint}
        </span>
      )}
      <ErrorText id={errorId}>{error}</ErrorText>
    </div>
  );
}

type TextFieldProps = Omit<ComponentPropsWithoutRef<"input">, "id"> & {
  id: string;
  label: string;
  hint?: string;
  error?: string;
  fieldClassName?: string;
};

export function TextField({ id, label, hint, error, fieldClassName, ...inputProps }: TextFieldProps) {
  return (
    <Field id={id} label={label} hint={hint} error={error} className={fieldClassName}>
      {(aria) => <input id={id} {...aria} {...inputProps} />}
    </Field>
  );
}
