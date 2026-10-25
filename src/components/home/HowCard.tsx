import type { ReactNode } from "react";
import styles from "./HowCard.module.css";

interface HowCardProps {
  id?: string;
  icon: ReactNode;
  title: string;
  note: string;
  children: ReactNode;
}

/** One step of "how the season works": icon, title, key/value rows and a short note. */
export function HowCard({ id, icon, title, note, children }: HowCardProps) {
  return (
    <article id={id} className={styles.card}>
      <div className={styles.head}>
        <span className={styles.icon}>{icon}</span>
        <h3>{title}</h3>
      </div>
      {children}
      <p className={styles.note}>{note}</p>
    </article>
  );
}

interface KeyValueListProps {
  rows: ReadonlyArray<{ label: string; value: ReactNode }>;
}

export function KeyValueList({ rows }: KeyValueListProps) {
  return (
    <dl className={styles.list}>
      {rows.map((row) => (
        <div key={row.label}>
          <dt>{row.label}</dt>
          <dd>{row.value}</dd>
        </div>
      ))}
    </dl>
  );
}
