import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import styles from "./StepView.module.css";

/** Wrapper for one booking step; fades in each time a step mounts. */
export function StepView({ children }: { children: ReactNode }) {
  return <div className={styles.view}>{children}</div>;
}

/** Bottom row of back / next buttons. */
export function StepNav({ children, end = false }: { children: ReactNode; end?: boolean }) {
  return <div className={cx(styles.nav, end && styles.end)}>{children}</div>;
}
