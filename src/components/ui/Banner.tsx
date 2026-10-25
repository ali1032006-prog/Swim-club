import type { ReactNode } from "react";
import { cx } from "@/lib/cx";
import { Container } from "./Container";
import styles from "./Banner.module.css";

interface BannerProps {
  /** "hero" is the tall home-page banner; "compact" is the slim banner above the booking steps. */
  variant?: "hero" | "compact";
  children: ReactNode;
}

/** Aqua gradient banner with lane ropes drawn behind the content. */
export function Banner({ variant = "compact", children }: BannerProps) {
  return (
    <section className={cx(styles.banner, variant === "hero" && styles.hero)}>
      <Container className={styles.inner}>
        <div className={styles.ropes} aria-hidden="true">
          <span className={styles.rope} />
          <span className={styles.rope} />
          <span className={styles.rope} />
          <span className={styles.rope} />
        </div>
        <div className={styles.content}>{children}</div>
      </Container>
    </section>
  );
}

export function BannerTitle({ children }: { children: ReactNode }) {
  return <h1 className={styles.title}>{children}</h1>;
}

export function BannerText({ children }: { children: ReactNode }) {
  return <p className={styles.text}>{children}</p>;
}

/** Small uppercase label above a banner title. */
export function BannerTag({ children }: { children: ReactNode }) {
  return <p className={styles.tag}>{children}</p>;
}
