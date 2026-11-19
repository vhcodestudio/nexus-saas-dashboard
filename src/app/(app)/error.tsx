"use client";
import { Button, Card } from "@/components/ui";
import { CircleAlert } from "lucide-react";
import { useTr } from "@/components/lang-provider";
export default function Error({ reset }: { reset: () => void }) {
  const tr = useTr();
  return (
    <Card className="mx-auto mt-20 max-w-lg p-8 text-center">
      <CircleAlert className="mx-auto size-9 text-red-500" />
      <h1 className="mt-4 text-xl font-semibold">{tr("Something went wrong")}</h1>
      <p className="mt-2 text-sm text-muted-foreground">
        {tr("We couldn’t load this view. Your data is safe—please try again.")}
      </p>
      <Button className="mt-6" onClick={reset}>
        {tr("Try again")}
      </Button>
    </Card>
  );
}
