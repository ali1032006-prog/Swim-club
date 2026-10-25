/** Cookie names shared by the server layout (reads) and the client providers (writes). */
export const COOKIE_LOCALE = "tw-lang";
export const COOKIE_THEME = "tw-theme";

const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

export function writeCookie(name: string, value: string): void {
  document.cookie = `${name}=${encodeURIComponent(value)}; path=/; max-age=${ONE_YEAR_SECONDS}; samesite=lax`;
}
