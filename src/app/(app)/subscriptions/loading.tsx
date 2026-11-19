import { Card } from "@/components/ui";
import { getTr } from "@/lib/i18n/server";

export default async function SubscriptionsLoading() {
  const tr = await getTr();
  return (
    <div aria-label={tr("Loading subscriptions")}>
      <div className="mb-7 h-20 animate-pulse rounded-2xl bg-muted" />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        {[1, 2, 3].map((item) => (
          <Card key={item} className="h-32 animate-pulse bg-muted/60" />
        ))}
      </div>
      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {[1, 2, 3, 4].map((item) => (
          <Card key={item} className="h-96 animate-pulse bg-muted/40" />
        ))}
      </div>
    </div>
  );
}
