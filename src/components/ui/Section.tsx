import type { ReactNode } from "react";
import styles from "./Section.module.css";

interface SectionProps {
  /** Also the scroll target for in-page links. */
  id: string;
  title: string;
  intro?: string;
  children: ReactNode;
}

/** Titled home-page section, labelled for assistive tech and offset for the sticky header. */
export function Section({ id, title, intro, children }: SectionProps) {
  const titleId = `${id}-title`;
  return (
    <section id={id} className={styles.section} aria-labelledby={titleId}>
      <h2 id={titleId} className={styles.title}>
        {title}
      </h2>
      {intro && <p className={styles.intro}>{intro}</p>}
      {children}
    </section>
  );
}
