import { redirect } from "next/navigation";
import { auth } from "@priscilla/auth";
import { PointsTiersConfig, AdminPageLayout } from "@/components/features/admin";
import { Settings } from "lucide-react";

export default async function ConfigurationPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  return (
    <AdminPageLayout
      badge={{
        icon: <Settings className="h-4 w-4" />,
        label: "Configuration métier",
      }}
      title="Configuration"
      description="Paramètres métier de la plateforme : tranches de points, règles de calcul et autres configurations."
    >
      <PointsTiersConfig />
    </AdminPageLayout>
  );
}
