import { PT, ES } from "./catalog";

export const LANGS = ["en", "pt", "es"] as const;
export type Lang = (typeof LANGS)[number];
export const LANG_COOKIE = "nexus-lang";
export const isLang = (v: unknown): v is Lang => typeof v === "string" && (LANGS as readonly string[]).includes(v);
export const htmlLang: Record<Lang, string> = { en: "en", pt: "pt-BR", es: "es" };
export const langLabel: Record<Lang, string> = { en: "English", pt: "Português", es: "Español" };
export const numberLocale: Record<Lang, string> = { en: "en-US", pt: "pt-BR", es: "es-ES" };

export type Vars = Record<string, string | number>;
export type Tr = (english: string, vars?: Vars) => string;

/** Messages are keyed by their English text; Portuguese and Spanish fall back to English when missing. */
export function translate(lang: Lang, english: string, vars?: Vars) {
  const table = lang === "pt" ? PT : lang === "es" ? ES : undefined;
  let out = table?.[english] ?? english;
  if (vars) for (const [k, v] of Object.entries(vars)) out = out.split(`{${k}}`).join(String(v));
  return out;
}

export const makeTr = (lang: Lang): Tr => (english, vars) => translate(lang, english, vars);

/** Picks a language from an Accept-Language header. */
export function fromAcceptLanguage(header: string | null): Lang {
  const h = (header ?? "").toLowerCase();
  const first = h.split(",")[0] ?? "";
  return first.startsWith("pt") ? "pt" : first.startsWith("es") ? "es" : "en";
}
