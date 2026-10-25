/** "system" means the visitor hasn't chosen, so the OS setting decides. */
export type ThemePreference = "light" | "dark" | "system";

export function parseTheme(value: string | undefined | null): ThemePreference {
  return value === "light" || value === "dark" ? value : "system";
}
