import type { Locale } from "./config";
import { ar } from "./ar";
import { en, type Dictionary } from "./en";

export const dictionaries: Record<Locale, Dictionary> = { en, ar };
