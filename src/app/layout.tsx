import type { Metadata, Viewport } from "next";
import { cookies } from "next/headers";
import type { ReactNode } from "react";
import { Header } from "@/components/layout/Header";
import { LocaleTransition } from "@/components/layout/LocaleTransition";
import { NetworkBanner } from "@/components/layout/NetworkBanner";
import { DIRECTIONS, parseLocale } from "@/i18n/config";
import { COOKIE_LOCALE, COOKIE_THEME } from "@/lib/cookies";
import { AppProviders } from "@/providers/AppProviders";
import { parseTheme } from "@/lib/theme";
import { fontVariables } from "./fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: { default: "Tidewell Swim Club", template: "%s · Tidewell Swim Club" },
  description:
    "Swimming lessons for children aged 6 to 18. Winter season 2026–27, Sunday to Thursday. Registration is open.",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default async function RootLayout({ children }: { children: ReactNode }) {
  // Language and theme are remembered in cookies so the server can render the right
  // <html lang dir data-theme> on the very first paint, with no flash.
  const cookieStore = await cookies();
  const locale = parseLocale(cookieStore.get(COOKIE_LOCALE)?.value);
  const theme = parseTheme(cookieStore.get(COOKIE_THEME)?.value);

  return (
    <html
      lang={locale}
      dir={DIRECTIONS[locale]}
      data-theme={theme === "system" ? undefined : theme}
      className={fontVariables}
      suppressHydrationWarning
    >
      <body>
        <AppProviders initialLocale={locale} initialTheme={theme}>
          <Header />
          <NetworkBanner />
          <LocaleTransition>{children}</LocaleTransition>
        </AppProviders>
      </body>
    </html>
  );
}
