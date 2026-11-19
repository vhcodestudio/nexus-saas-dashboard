import "server-only";
import { cookies, headers } from "next/headers";
import { fromAcceptLanguage, isLang, LANG_COOKIE, makeTr, type Lang } from "./core";

export async function getLang(): Promise<Lang> {
  const c = (await cookies()).get(LANG_COOKIE)?.value;
  if (isLang(c)) return c;
  return fromAcceptLanguage((await headers()).get("accept-language"));
}

export async function getTr() {
  return makeTr(await getLang());
}
