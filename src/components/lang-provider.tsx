"use client";

import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { htmlLang, LANG_COOKIE, langLabel, LANGS, makeTr, numberLocale, type Lang, type Tr } from "@/lib/i18n/core";

const Ctx = createContext<{ lang: Lang; tr: Tr }>({ lang: "en", tr: makeTr("en") });

export function LangProvider({ lang, children }: { lang: Lang; children: ReactNode }) {
  const value = useMemo(() => ({ lang, tr: makeTr(lang) }), [lang]);
  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export const useLang = () => useContext(Ctx).lang;
export const useTr = () => useContext(Ctx).tr;
export const useNumberLocale = () => numberLocale[useContext(Ctx).lang];

/** Saves the choice for the server and updates the page language right away. */
function persistLang(l: Lang) {
  document.cookie = `${LANG_COOKIE}=${l}; path=/; max-age=31536000; samesite=lax`;
  document.documentElement.lang = htmlLang[l];
}

/** EN / PT / ES switcher: stores the choice in a cookie and re-renders the server components. */
export function LangSwitch({ className = "" }: { className?: string }) {
  const { lang, tr } = useContext(Ctx);
  const router = useRouter();
  function choose(l: Lang) {
    persistLang(l);
    router.refresh();
  }
  return (
    <div role="group" aria-label={tr("Language")} className={`inline-flex items-center gap-0.5 rounded-lg border border-border p-0.5 text-[11px] font-semibold uppercase ${className}`}>
      {LANGS.map((l) => (
        <button key={l} type="button" onClick={() => choose(l)} aria-pressed={l === lang} title={langLabel[l]} lang={htmlLang[l]}
          className={`min-h-7 min-w-8 rounded-md px-1.5 transition ${l === lang ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}>
          <span aria-hidden="true">{l}</span>
          <span className="sr-only">{langLabel[l]}</span>
        </button>
      ))}
    </div>
  );
}

/** Translates a plain string child; anything else renders unchanged. Usable from server and client components. */
export function T({ children }: { children?: ReactNode }) {
  const tr = useTr();
  return <>{typeof children === "string" ? tr(children) : children}</>;
}
