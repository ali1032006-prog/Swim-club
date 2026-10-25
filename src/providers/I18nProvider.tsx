"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { DIRECTIONS, type Locale } from "@/i18n/config";
import { dictionaries } from "@/i18n/dictionaries";
import type { Dictionary } from "@/i18n/en";
import { COOKIE_LOCALE, writeCookie } from "@/lib/cookies";

interface I18nContextValue {
  locale: Locale;
  t: Dictionary;
  setLocale: (locale: Locale) => void;
}

const I18nContext = createContext<I18nContextValue | null>(null);

interface I18nProviderProps {
  /** Read from the cookie on the server so the first paint is already in the right language. */
  initialLocale: Locale;
  children: ReactNode;
}

export function I18nProvider({ initialLocale, children }: I18nProviderProps) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale);

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    writeCookie(COOKIE_LOCALE, next);
  }, []);

  // The <html> element is rendered by the server layout, so keep its attributes in step.
  useEffect(() => {
    document.documentElement.lang = locale;
    document.documentElement.dir = DIRECTIONS[locale];
  }, [locale]);

  const value = useMemo(
    () => ({ locale, t: dictionaries[locale], setLocale }),
    [locale, setLocale],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const context = useContext(I18nContext);
  if (!context) throw new Error("useI18n must be used inside <I18nProvider>");
  return context;
}
