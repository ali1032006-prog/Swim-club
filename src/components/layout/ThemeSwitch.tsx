"use client";

import { useI18n } from "@/providers/I18nProvider";
import { useTheme } from "@/providers/ThemeProvider";
import styles from "./ThemeSwitch.module.css";

/** Sliding sun/moon toggle. `data-theme-ui` keeps it out of the page-wide colour transition. */
export function ThemeSwitch() {
  const { t } = useI18n();
  const { isDark, toggle } = useTheme();

  return (
    <button
      type="button"
      role="switch"
      aria-checked={isDark}
      aria-label={t.header.darkMode}
      className={styles.switch}
      onClick={toggle}
      data-theme-ui=""
    >
      <span className={styles.track} aria-hidden="true">
        <span className={styles.wave} />
        <span className={styles.thumb}>
          <svg className={styles.sun} width="16" height="16" viewBox="0 0 24 24" focusable="false">
            <circle cx="12" cy="12" r="4.5" fill="currentColor" />
            <g stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
              <path d="M12 2.5v2.2M12 19.3v2.2M2.5 12h2.2M19.3 12h2.2M5.3 5.3l1.6 1.6M17.1 17.1l1.6 1.6M5.3 18.7l1.6-1.6M17.1 6.9l1.6-1.6" />
            </g>
          </svg>
          <svg className={styles.moon} width="15" height="15" viewBox="0 0 24 24" focusable="false">
            <path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z" fill="currentColor" />
          </svg>
        </span>
      </span>
    </button>
  );
}
