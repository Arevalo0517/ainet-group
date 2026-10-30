import { en } from "./en";
import { es, type Dict } from "./es";

export type Lang = "es" | "en";
export const dict: Record<Lang, Dict> = { es, en };
export type { Dict };
