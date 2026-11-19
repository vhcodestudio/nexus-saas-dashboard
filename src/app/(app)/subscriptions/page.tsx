import { PageHead, Metric, SectionTitle } from "@/components/page-kit";
import { Badge, Card } from "@/components/ui";
import { SubscriptionPlans } from "@/components/subscription-plans";
import { getSubscriptionOverview } from "@/lib/queries";
import { getTr } from "@/lib/i18n/server";

const statusTone = (status: string): "green" | "blue" | "red" | "amber" =>
  status === "active"
    ? "green"
    : status === "trialing"
      ? "blue"
      : status === "canceled"
        ? "red"
        : "amber";
const statusLabel = (status: string) =>
  status.replace("_", " ").replace(/^./, (letter) => letter.toUpperCase());

export default async function Subscriptions() {
  const tr = await getTr();
  const overview = await getSubscriptionOverview();
  if (!overview) return null;
  const customerCount = overview.plans.reduce(
    (total, plan) => total + plan.customerCount,
    0,
  );
  const revenue = overview.plans.reduce(
    (total, plan) => total + plan.revenue,
    0,
  );
  const currentPlan = overview.plans.find(
    (plan) => plan.id === overview.currentPlanId,
  );
  return (
    <>
      <PageHead
        title={tr("Subscriptions")}
        description={tr("Workspace tier, customer subscriptions and recurring revenue from one source of truth.")}
      />
      <div className="mb-6 grid gap-4 sm:grid-cols-3">
        <Metric
          label={tr("Subscribed customers")}
          value={String(customerCount)}
          change="Live"
          detail="Across all database plans"
        />
        <Metric
          label={tr("Subscription revenue")}
          value={"$" + revenue.toLocaleString()}
          change="Live"
          detail="Current subscription amounts"
        />
        <Metric
          label={tr("Workspace plan")}
          value={currentPlan?.name ?? tr("Unknown")}
          change="Current"
          detail="Monthly billing cycle"
        />
      </div>
      <SubscriptionPlans
        plans={overview.plans}
        currentPlanId={overview.currentPlanId}
        canChangePlan={overview.canChangePlan}
      />
      <Card className="mt-6 overflow-hidden">
        <SectionTitle
          title={tr("Revenue by plan")}
          description={tr("Customer distribution and status from this workspace")}
        />
        <div className="overflow-x-auto">
          <table className="w-full min-w-[680px] text-left text-sm">
            <thead className="bg-muted/40 text-xs text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-medium">{tr("Plan")}</th>
                <th className="px-5 py-3 font-medium">{tr("Customers")}</th>
                <th className="px-5 py-3 font-medium">{tr("Revenue")}</th>
                <th className="px-5 py-3 font-medium">{tr("Subscription status")}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {overview.plans.map((plan) => (
                <tr key={plan.id}>
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{plan.name}</span>
                      {plan.id === overview.currentPlanId && (
                        <Badge tone="blue">{tr("Workspace plan")}</Badge>
                      )}
                    </div>
                  </td>
                  <td className="px-5 py-4 font-mono">{plan.customerCount}</td>
                  <td className="px-5 py-4 font-mono font-medium">
                    ${plan.revenue.toLocaleString()}
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex flex-wrap gap-2">
                      {Object.keys(plan.statuses).length ? (
                        Object.entries(plan.statuses).map(([status, count]) => (
                          <Badge key={status} tone={statusTone(status)}>
                            {statusLabel(status)} · {count}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-muted-foreground">
                          {tr("No subscriptions")}
                        </span>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  );
}
