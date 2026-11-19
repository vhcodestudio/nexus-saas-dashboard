"use client";

import { useEffect } from "react";
import { useTr } from "@/components/lang-provider";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const tr = useTr();
  useEffect(() => {
    console.error(error);
  }, [error]);
  return (
    <html lang="en">
      <body>
        <main
          style={{
            minHeight: "100vh",
            display: "grid",
            placeItems: "center",
            padding: 24,
            background: "#0e0e11",
            color: "#f4f4f5",
            fontFamily: tr("Arial,sans-serif"),
            textAlign: "center",
          }}
        >
          <div style={{ maxWidth: 440 }}>
            <div
              style={{
                margin: "0 auto",
                display: "grid",
                placeItems: "center",
                width: 48,
                height: 48,
                borderRadius: 15,
                background: "#7c5cff",
                fontWeight: 700,
              }}
            >
              {tr("N")}
            </div>
            <h1 style={{ marginTop: 28, fontSize: 32 }}>
              {tr("The signal was interrupted.")}
            </h1>
            <p style={{ color: "#a1a1aa", lineHeight: 1.6 }}>
              {tr("Nexus could not load this view. Try again, or return to the public demo.")}
            </p>
            <button
              onClick={reset}
              style={{
                marginTop: 20,
                border: 0,
                borderRadius: 9,
                padding: "11px 18px",
                background: "#7c5cff",
                color: "white",
                fontWeight: 600,
              }}
            >
              {tr("Try again")}
            </button>
          </div>
        </main>
      </body>
    </html>
  );
}
