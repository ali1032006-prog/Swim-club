import type { ComponentPropsWithoutRef } from "react";
import { cx } from "@/lib/cx";
import styles from "./ErrorText.module.css";

/**
 * Error message that stays in the DOM when empty, so screen readers announce it
 * when text appears. It hides itself while empty.
 */
export function ErrorText({ className, ...props }: ComponentPropsWithoutRef<"p">) {
  return <p role="alert" className={cx(styles.error, className)} {...props} />;
}
