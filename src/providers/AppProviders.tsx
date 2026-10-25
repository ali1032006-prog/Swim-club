"use client";

import type { ReactNode } from "react";
import type { Locale } from "@/i18n/config";
import { BookingProvider } from "./BookingProvider";
import { I18nProvider } from "./I18nProvider";
import type { ThemePreference } from "@/lib/theme";
import { ThemeProvider } from "./ThemeProvider";

interface AppProvidersProps {
  initialLocale: Locale;
  initialTheme: ThemePreference;
  children: ReactNode;
}

/**
 * Providers live in the root layout so language, theme and the in-progress booking
 * survive navigation between the home page and the booking steps.
 */
export function AppProviders({ initialLocale, initialTheme, children }: AppProvidersProps) {
  return (
    <I18nProvider initialLocale={initialLocale}>
      <ThemeProvider initialTheme={initialTheme}>
        <BookingProvider>{children}</BookingProvider>
      </ThemeProvider>
    </I18nProvider>
  );
}
