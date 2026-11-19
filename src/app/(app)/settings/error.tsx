"use client";

import { AlertTriangle, RotateCcw } from "lucide-react";
import { Button, Card } from "@/components/ui";
import { useTr } from "@/components/lang-provider";

export default function SettingsError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const tr = useTr();
  return (
    <Card className="grid min-h-96 place-items-center p-8 text-center">
      <div>
        <span className="mx-auto grid size-12 place-items-center rounded-xl bg-red-500/10">
          <AlertTriangle className="size-5 text-red-500" />
        </span>
        <h1 className="mt-4 text-lg font-semibold">
          {tr("Settings could not be loaded")}
        </h1>
        <p className="mx-auto mt-1 max-w-md text-sm text-muted-foreground">
          {tr("Your workspace settings were not changed. Please try again.")}
        </p>
        <Button className="mt-5" onClick={reset}>
          <RotateCcw className="size-4" />
          {tr("Try again")}
        </Button>
      </div>
    </Card>
  );
}
