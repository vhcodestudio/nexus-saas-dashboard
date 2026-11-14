"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Counts the first number inside a formatted string (e.g. "$46,820" or "2.4%")
 * up from zero, keeping its prefix, suffix, separators and decimals.
 */
export function AnimatedValue({ value, duration = 1100 }: { value: string; duration?: number }) {
  const [shown, setShown] = useState(value);
  const done = useRef(false);

  useEffect(() => {
    const match = value.match(/-?[\d,]*\.?\d+/);
    if (!match || done.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    done.current = true;
    const raw = match[0];
    const target = Number(raw.replace(/,/g, ""));
    const decimals = raw.includes(".") ? raw.split(".")[1].length : 0;
    const grouped = raw.includes(",");
    const [before, after] = [value.slice(0, match.index), value.slice((match.index ?? 0) + raw.length)];
    const t0 = performance.now();
    let raf = 0;
    const step = (t: number) => {
      const k = Math.min(1, (t - t0) / duration);
      const n = target * (1 - Math.pow(1 - k, 3));
      const text = grouped
        ? n.toLocaleString("en-US", { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
        : n.toFixed(decimals);
      setShown(before + text + after);
      if (k < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [value, duration]);

  return <span className="tabular-nums">{shown}</span>;
}
