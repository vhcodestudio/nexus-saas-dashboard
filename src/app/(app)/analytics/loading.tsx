import { Card } from "@/components/ui";
import { getTr } from "@/lib/i18n/server";
export default async function AnalyticsLoading() {
  const tr = await getTr();
  return (
    <div aria-label={tr("Loading analytics")}>
      <div className="mb-7 h-20 animate-pulse rounded-2xl bg-muted" />
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <Card key={item} className="h-32 animate-pulse bg-muted/60" />
        ))}
      </div>
      <Card className="mt-4 h-96 animate-pulse bg-muted/40" />
      <div className="mt-4 grid gap-4 xl:grid-cols-2">
        <Card className="h-96 animate-pulse bg-muted/40" />
        <Card className="h-96 animate-pulse bg-muted/40" />
      </div>
    </div>
  );
}
