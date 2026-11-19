import { PageHead, Metric } from "@/components/page-kit";
import { Button } from "@/components/ui";
import { CustomersTable } from "@/components/customers-table";
import { Plus } from "lucide-react";
import { getCustomers } from "@/lib/queries";
import { getTr } from "@/lib/i18n/server";

export default async function Customers() {
  const tr = await getTr();
  const customers = await getCustomers();
  const monthlyRevenue = customers.reduce(
    (total, customer) => total + customer.mrr,
    0,
  );
  return (
    <>
      <PageHead
        title={tr("Customers")}
        description={tr("Manage customer relationships, plans and health.")}
        action={
          <Button>
            <Plus className="size-4" />
            {tr("Add customer")}
          </Button>
        }
      />
      <div className="mb-4 grid gap-4 sm:grid-cols-3">
        <Metric
          label={tr("Total customers")}
          value={String(customers.length)}
          change="Live"
        />
        <Metric
          label={tr("Monthly revenue")}
          value={`$${monthlyRevenue.toLocaleString()}`}
          change="Live"
        />
        <Metric
          label={tr("Average revenue")}
          value={
            customers.length
              ? `$${Math.round(monthlyRevenue / customers.length).toLocaleString()}`
              : "$0"
          }
          change="Live"
        />
      </div>
      <CustomersTable customers={customers} />
    </>
  );
}
