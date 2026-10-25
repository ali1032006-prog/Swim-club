import { Bricolage_Grotesque, IBM_Plex_Sans_Arabic, Nunito_Sans } from "next/font/google";

const display = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-bricolage",
  display: "swap",
});

const body = Nunito_Sans({
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  variable: "--font-nunito",
  display: "swap",
});

const arabic = IBM_Plex_Sans_Arabic({
  subsets: ["arabic", "latin"],
  weight: ["400", "600", "700"],
  variable: "--font-plex-arabic",
  display: "swap",
});

/** Class names that define the --font-* CSS variables. Apply to <html>. */
export const fontVariables = [display.variable, body.variable, arabic.variable].join(" ");
