import type { ComponentProps } from "react";
import { cx } from "@/lib/cx";
import styles from "./Panel.module.css";

/** Heading for a card or booking step. Pass `ref` and `tabIndex={-1}` to make it a focus target. */
export function PanelTitle({ className, ...props }: ComponentProps<"h2">) {
  return <h2 className={cx(styles.title, className)} {...props} />;
}

/** Short helper text under a PanelTitle. */
export function PanelNote({ className, ...props }: ComponentProps<"p">) {
  return <p className={cx(styles.note, className)} {...props} />;
}
