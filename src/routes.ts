import type { Lang } from "./i18n";

export type Page = "group" | "healthcare" | "hospitality";

export const pages: { key: Page; label: string }[] = [
  { key: "group", label: "AINET GROUP" },
  { key: "healthcare", label: "AINET HEALTHCARE" },
  { key: "hospitality", label: "AINET HOSPITALITY" },
];

export const colorFor: Record<Page, string> = {
  group: "#4DD6EA",
  healthcare: "#3DD6B5",
  hospitality: "#FF7A45",
};

export const pathFor = (lang: Lang, page: Page) =>
  page === "group" ? (lang === "en" ? "/en" : "/") : lang === "en" ? `/en/${page}` : `/${page}`;
