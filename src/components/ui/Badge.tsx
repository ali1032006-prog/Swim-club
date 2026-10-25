import type { ReactNode } from "react";
import styles from "./Badge.module.css";

/** Small pill, e.g. "10% off". */
export function Badge({ children }: { children: ReactNode }) {
  return <span className={styles.badge}>{children}</span>;
}
