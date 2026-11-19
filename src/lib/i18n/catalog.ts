import { A } from "./catalog-a";
import { B } from "./catalog-b";
import { C } from "./catalog-c";

const ALL: Record<string, [string, string]> = { ...A, ...B, ...C };
export const PT: Record<string, string> = Object.fromEntries(Object.entries(ALL).map(([en, [pt]]) => [en, pt]));
export const ES: Record<string, string> = Object.fromEntries(Object.entries(ALL).map(([en, [, es]]) => [en, es]));
