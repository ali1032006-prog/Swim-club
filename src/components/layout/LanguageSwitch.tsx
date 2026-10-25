"use client";

import type { Locale } from "@/i18n/config";
import { cx } from "@/lib/cx";
import { useI18n } from "@/providers/I18nProvider";
import styles from "./LanguageSwitch.module.css";

/** Each option is labelled in its own language and script, whatever the page language is. */
const OPTIONS: ReadonlyArray<{ locale: Locale; label: string; className: string }> = [
  { locale: "en", label: "EN", className: styles.optionEn },
  { locale: "ar", label: "عربي", className: styles.optionAr },
];

export function LanguageSwitch() {
  const { t, locale, setLocale } = useI18n();

  return (
    <div
      className={styles.switch}
      role="group"
      aria-label={t.header.language}
      data-sel={locale}
      data-theme-ui=""
    >
      <span className={styles.pill} aria-hidden="true" />
      {OPTIONS.map((option) => (
        <button
          key={option.locale}
          type="button"
          lang={option.locale}
          className={cx(styles.option, option.className)}
          aria-pressed={option.locale === locale}
          onClick={() => setLocale(option.locale)}
        >
          {option.label}
        </button>
      ))}
    </div>
  );
}
