import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { GetAdminDashboardStats } from "@/core/application/use-cases";
import { prismaAdminDashboardRepository } from "@/core/infrastructure/prisma";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  StatCard,
  PointsIcon,
  ClipboardIcon,
  TicketIcon,
  BuildingIcon,
  CheckCircleIcon,
  ChartIcon,
  UsersIcon,
  StarFilledIcon,
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
                ? `${user.firstName}`
                : "Utilisateur"}
            </span>{" "}
            !
          </h1>
          {/* <p className="text-muted-foreground text-lg">
            Voici votre tableau de bord personnalisé.
          </p> */}
        </div>

        {/* Role-based content */}
        {user.role === "JE" && <JEDashboard />}
        {user.role === "ES" && <ESDashboard />}
        {user.role === "ADMIN" && <AdminDashboard />}
      </div>
    </div>
  );
}

// =============================================================================
// Admin Dashboard with Statistics
// =============================================================================

/**
 * Factory function to create the GetAdminDashboardStats use case.
 * Following DDD/Clean Architecture, the use case receives its dependencies
 * through constructor injection (here via a factory for server component usage).
 */
function createGetAdminDashboardStatsUseCase() {
  return new GetAdminDashboardStats(prismaAdminDashboardRepository);
}

async function AdminDashboard() {
  // Use the application layer use case instead of calling Prisma directly
  const getAdminDashboardStats = createGetAdminDashboardStatsUseCase();
  const stats = await getAdminDashboardStats.execute();

  return (
    <div className="space-y-8">
      {/* Section 2.1: Statistiques Générales */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <ChartIcon className="w-5 h-5 text-primary" />
          Statistiques Générales
        </h2>
        <div className="grid md:grid-cols-4 gap-6">
          <StatCard
            label="Jeunes Entrepreneurs"
            value={stats.totalJE}
            subLabel="Total des JE inscrits"
            icon={<UsersIcon />}
            variant="primary"
          />
          <StatCard
            label="Entreprises Solidaires"
            value={stats.totalES}
            subLabel="ES enregistrées"
            icon={<BuildingIcon />}
            variant="accent"
          />
          <StatCard
            label="Transactions Validées"
            value={stats.validatedTransactions}
            subLabel="Total validé"
            icon={<ClipboardIcon />}
            variant="primary"
          />
          <StatCard
            label="Points Distribués"
            value={stats.totalPointsDistributed.toLocaleString("fr-FR")}
            subLabel="Points au total"
            icon={<PointsIcon />}
            variant="highlight"
          />
        </div>
      </section>

      {/* Section 2.2: Répartition et Analyse */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <ChartIcon className="w-5 h-5 text-primary" />
          Répartition et Analyse
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          {/* Répartition des JE par abonnement */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <TicketIcon className="w-5 h-5 text-primary" />
                </div>
                Répartition par Abonnement
              </CardTitle>
              <CardDescription>JE par type de plan</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.subscriptionDistribution.length > 0 ? (
                <div className="space-y-3">
                  {stats.subscriptionDistribution.map((sub) => (
                    <div
                      key={sub.planCode}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <span className="font-medium">{sub.planName}</span>
                      <Badge
                        variant="secondary"
                        className={
                          sub.planCode === "PREMIUM"
                            ? "bg-accent/10 text-accent"
                            : sub.planCode === "STANDARD"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }
                      >
                        {sub.count} JE
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Aucun abonnement actif pour le moment.
                </p>
              )}
            </CardContent>
          </Card>

          {/* Top JE les plus actifs */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                  <StarFilledIcon className="w-5 h-5 text-accent" />
                </div>
                JE les Plus Actifs
              </CardTitle>
              <CardDescription>Par points et transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.topJEByPoints.length > 0 ? (
                <div className="space-y-3">
                  {stats.topJEByPoints.map((je, index) => (
                    <div
                      key={je.id}
                      className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                    >
                      <div className="flex items-center gap-3">
                        <span
                          className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                            index === 0
                              ? "bg-accent text-white"
                              : index === 1
                              ? "bg-primary/20 text-primary"
                              : "bg-muted-foreground/20 text-muted-foreground"
                          }`}
                        >
                          {index + 1}
                        </span>
                        <div>
                          <p className="font-medium text-sm">
                            {je.firstName || je.lastName
                              ? `${je.firstName || ""} ${
                                  je.lastName || ""
                                }`.trim()
                              : je.email}
                          </p>
                        </div>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-accent/10 text-accent"
                      >
                        {je.totalPoints} pts
                      </Badge>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Aucun JE avec des points pour le moment.
                </p>
              )}

              {/* Link to view by transactions */}
              {stats.topJEByTransactions.some(
                (je) => je.transactionCount > 0
              ) && (
                <div className="mt-4 pt-4 border-t">
                  <p className="text-xs text-muted-foreground mb-2">
                    Par nombre de transactions :
                  </p>
                  <div className="space-y-2">
                    {stats.topJEByTransactions
                      .filter((je) => je.transactionCount > 0)
                      .slice(0, 3)
                      .map((je) => (
                        <div
                          key={je.id}
                          className="flex items-center justify-between text-sm"
                        >
                          <span className="text-muted-foreground truncate max-w-[150px]">
                            {je.firstName || je.lastName
                              ? `${je.firstName || ""} ${
                                  je.lastName || ""
                                }`.trim()
                              : je.email}
                          </span>
                          <span className="font-medium">
                            {je.transactionCount} tx
                          </span>
                        </div>
                      ))}
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* ES les plus sollicitées */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-lg">
                <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                  <BuildingIcon className="w-5 h-5 text-primary" />
                </div>
                ES les Plus Sollicitées
              </CardTitle>
              <CardDescription>Par nombre de transactions</CardDescription>
            </CardHeader>
            <CardContent>
              {stats.topESBySolicitations.some(
                (es) => es.transactionCount > 0
              ) ? (
                <div className="space-y-3">
                  {stats.topESBySolicitations
                    .filter((es) => es.transactionCount > 0)
                    .map((es, index) => (
                      <div
                        key={es.id}
                        className="flex items-center justify-between p-3 rounded-lg bg-muted/50"
                      >
                        <div className="flex items-center gap-3">
                          <span
                            className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${
                              index === 0
                                ? "bg-primary text-white"
                                : index === 1
                                ? "bg-primary/20 text-primary"
                                : "bg-muted-foreground/20 text-muted-foreground"
                            }`}
                          >
                            {index + 1}
                          </span>
                          <div>
                            <p className="font-medium text-sm">
                              {es.companyName}
                            </p>
                            {es.sector && (
                              <p className="text-xs text-muted-foreground">
                                {es.sector}
                              </p>
                            )}
                          </div>
                        </div>
                        <Badge variant="secondary">
                          {es.transactionCount} tx
                        </Badge>
                      </div>
                    ))}
                </div>
              ) : (
                <p className="text-sm text-muted-foreground">
                  Aucune ES sollicitée pour le moment.
                </p>
              )}
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
}

// =============================================================================
// JE Dashboard (Jeune Entrepreneur)
// =============================================================================

function JEDashboard() {
  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <ChartIcon className="w-5 h-5 text-primary" />
          Résumé
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            label="Mes Points"
            value={0}
            subLabel="Points accumulés"
            icon={<PointsIcon />}
            variant="accent"
          />
          <StatCard
            label="Transactions"
            value={0}
            subLabel="Transactions effectuées"
            icon={<ClipboardIcon />}
            variant="primary"
          />
          <StatCard
            label="Abonnement"
            value="—"
            subLabel="Aucun plan actif"
            icon={<TicketIcon />}
            variant="primary"
          />
        </div>
      </section>

      {/* Recent activity */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <ClipboardIcon className="w-5 h-5 text-primary" />
          Activité récente
        </h2>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground text-center py-8">
              Aucune activité récente. Utilisez le menu pour découvrir les
              entreprises solidaires et effectuer des transactions.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}

// =============================================================================
// ES Dashboard (Entreprise Solidaire)
// =============================================================================

function ESDashboard() {
  return (
    <div className="space-y-8">
      {/* Summary cards */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <ChartIcon className="w-5 h-5 text-primary" />
          Résumé
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <StatCard
            label="Transactions à valider"
            value={0}
            subLabel="En attente de validation"
            icon={<CheckCircleIcon className="w-5 h-5" />}
            variant="accent"
          />
          <StatCard
            label="Transactions validées"
            value={0}
            subLabel="Total validé"
            icon={<ClipboardIcon />}
            variant="primary"
          />
          <StatCard
            label="Volume total"
            value="0 €"
            subLabel="Montant des transactions"
            icon={<ChartIcon />}
            variant="primary"
          />
        </div>
      </section>

      {/* Company profile status */}
      <section>
        <h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
          <BuildingIcon className="w-5 h-5 text-primary" />
          Profil Entreprise
        </h2>
        <Card className="border-0 shadow-lg">
          <CardContent className="p-6">
            <p className="text-sm text-muted-foreground text-center py-8">
              Complétez votre profil entreprise via le menu pour être visible
              auprès des jeunes entrepreneurs.
            </p>
          </CardContent>
        </Card>
      </section>
    </div>
  );
}
