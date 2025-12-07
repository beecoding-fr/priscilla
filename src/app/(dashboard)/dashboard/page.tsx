import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  DashboardCard,
  StatCard,
  PointsIcon,
  ClipboardIcon,
  TicketIcon,
  BuildingIcon,
  CheckCircleIcon,
  ChartIcon,
  UsersIcon,
  CurrencyIcon,
} from "@/ui/components";

export default async function DashboardPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  const { user } = session;

  return (
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto py-8 px-4">
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
            </span>
            Tableau de bord
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Bienvenue,{" "}
            <span className="text-gradient">
              {user.firstName || user.lastName
                ? `${user.firstName} ${user.lastName}`.trim()
                : "Utilisateur"}
            </span>{" "}
            !
          </h1>
          <p className="text-muted-foreground text-lg">
            Voici votre tableau de bord personnalisé.
          </p>
        </div>

        {/* Role-based content */}
        {user.role === "JE" && <JEDashboard />}
        {user.role === "ES" && <ESDashboard />}
        {user.role === "ADMIN" && <AdminDashboard />}
      </div>
    </div>
  );
}

function JEDashboard() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <DashboardCard
        title="Mes Points"
        description="Gagnez des points à chaque transaction"
        icon={<PointsIcon />}
        badge={{ text: "0 pts", variant: "accent" }}
        variant="accent"
      >
        <p className="text-sm text-muted-foreground">
          Effectuez des transactions avec des entreprises solidaires pour
          accumuler des points.
        </p>
      </DashboardCard>

      <DashboardCard
        title="Transactions"
        description="Vos dernières transactions"
        icon={<ClipboardIcon />}
        variant="primary"
      >
        <p className="text-sm text-muted-foreground">
          Aucune transaction pour le moment.
        </p>
      </DashboardCard>

      <DashboardCard
        title="Abonnement"
        description="Votre plan actuel"
        icon={<TicketIcon />}
        variant="primary"
        actionLink={{ href: "#", text: "Voir les plans" }}
      >
        <p className="text-sm text-muted-foreground mb-3">
          Aucun abonnement actif.
        </p>
      </DashboardCard>
    </div>
  );
}

function ESDashboard() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <DashboardCard
        title="Mon Entreprise"
        description="Profil de votre entreprise"
        icon={<BuildingIcon />}
        variant="primary"
        actionLink={{ href: "/dashboard/company", text: "Configurer" }}
      >
        <p className="text-sm text-muted-foreground mb-3">
          Complétez votre profil entreprise pour être visible.
        </p>
      </DashboardCard>

      <DashboardCard
        title="Transactions à valider"
        description="Transactions en attente"
        icon={<CheckCircleIcon className="w-5 h-5" />}
        variant="accent"
      >
        <p className="text-sm text-muted-foreground">
          Aucune transaction en attente.
        </p>
      </DashboardCard>

      <DashboardCard
        title="Statistiques"
        description="Aperçu de votre activité"
        icon={<ChartIcon />}
        variant="primary"
      >
        <div className="space-y-3 text-sm">
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <span className="text-muted-foreground">Transactions validées</span>
            <span className="font-semibold">0</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
            <span className="text-muted-foreground">Volume total</span>
            <span className="font-semibold">0 €</span>
          </div>
        </div>
      </DashboardCard>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <StatCard
        label="Utilisateurs"
        value="0"
        subLabel="Total des utilisateurs"
        icon={<UsersIcon />}
        variant="primary"
      />
      <StatCard
        label="Entreprises"
        value="0"
        subLabel="Entreprises solidaires"
        icon={<BuildingIcon />}
        variant="accent"
      />
      <StatCard
        label="Transactions"
        value="0"
        subLabel="Ce mois-ci"
        icon={<ClipboardIcon />}
        variant="primary"
      />
      <StatCard
        label="Revenus"
        value="0 €"
        subLabel="MRR actuel"
        icon={<CurrencyIcon />}
        variant="highlight"
      />
    </div>
  );
}
