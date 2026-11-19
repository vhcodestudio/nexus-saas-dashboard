import { PageHead } from "@/components/page-kit";
import { SettingsForm } from "@/components/settings-form";
import { getSettingsData } from "@/lib/settings";
import { redirect } from "next/navigation";
import { getCurrentIdentity } from "@/lib/workspace";
import { getTr } from "@/lib/i18n/server";

export default async function Settings() {
  const tr = await getTr();
  const [data, identity] = await Promise.all([
    getSettingsData(),
    getCurrentIdentity(),
  ]);
  if (!data) redirect(identity ? "/onboarding" : "/login");

  return (
    <>
      <PageHead
        title={tr("Settings")}
        description={tr("Manage your profile, workspace and security preferences.")}
      />
      <SettingsForm data={data} />
    </>
  );
}
