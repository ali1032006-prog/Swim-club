"use client";

import { useEffect, useRef, type ReactNode } from "react";
import { useI18n } from "@/providers/I18nProvider";
import styles from "./LocaleTransition.module.css";

/**
 * Fades page content in again after a language change. It restarts a CSS animation instead of
 * remounting the content, so open FAQ items, form focus and scroll position are all kept.
 */
export function LocaleTransition({ children }: { children: ReactNode }) {
  const { locale } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const shownLocale = useRef(locale);

  useEffect(() => {
    if (shownLocale.current === locale) return;
    shownLocale.current = locale;

    const element = ref.current;
    if (!element) return;
    element.classList.remove(styles.swap);
    void element.offsetWidth; // force a reflow so the animation restarts
    element.classList.add(styles.swap);
  }, [locale]);

  return <div ref={ref}>{children}</div>;
}
