import { Card } from "@/components/ui";
import { getTr } from "@/lib/i18n/server";

export default async function SettingsLoading() {
  const tr = await getTr();
  return (
    <div aria-label={tr("Loading settings")}>
      <div className="mb-7 h-20 animate-pulse rounded-2xl bg-muted" />
      <div className="grid gap-6 xl:grid-cols-[240px_minmax(0,1fr)]">
        <Card className="h-96 animate-pulse bg-muted/50" />
        <Card className="h-[34rem] animate-pulse bg-muted/40" />
      </div>
    </div>
  );
}
