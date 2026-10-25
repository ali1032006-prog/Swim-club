"use client";

import { cx } from "@/lib/cx";
import { useI18n } from "@/providers/I18nProvider";
import styles from "./Brand.module.css";

function Logo({ size }: { size: number }) {
  return (
    <svg width={size} height={size} viewBox="0 0 40 40" aria-hidden="true" focusable="false">
      <circle cx="20" cy="20" r="19" fill="var(--aqua)" />
      <path
        d="M7 23c3 0 3-2.5 6.5-2.5S17 23 20 23s3.5-2.5 6.5-2.5S30 23 33 23"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M7 29c3 0 3-2.5 6.5-2.5S17 29 20 29s3.5-2.5 6.5-2.5S30 29 33 29"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity=".6"
      />
      <circle cx="24" cy="13" r="3.2" fill="#ffffff" />
    </svg>
  );
}

interface BrandProps {
  size?: "sm" | "md";
  className?: string;
}

/** Club logo and name. */
export function Brand({ size = "md", className }: BrandProps) {
  const { t } = useI18n();
  return (
    <span className={cx(styles.brand, size === "sm" ? styles.sm : styles.md, className)}>
      <Logo size={size === "sm" ? 30 : 34} />
      <b>{t.common.clubName}</b>
    </span>
  );
}
