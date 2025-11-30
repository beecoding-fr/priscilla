import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

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
            <span className="text-gradient">{user.name || "Utilisateur"}</span>{" "}
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
      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
                <svg
                  className="w-5 h-5 text-accent"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                  />
                </svg>
              </div>
              Mes Points
            </span>
            <Badge className="bg-accent/10 text-accent hover:bg-accent/20 border-0">
              0 pts
            </Badge>
          </CardTitle>
          <CardDescription>
            Gagnez des points à chaque transaction
          </CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-sm text-muted-foreground">
            Effectuez des transactions avec des entreprises solidaires pour
            accumuler des points.
          </p>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
            Transactions
          </CardTitle>
          <CardDescription>Vos dernières transactions</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-sm text-muted-foreground">
            Aucune transaction pour le moment.
          </p>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 5v2m0 4v2m0 4v2M5 5a2 2 0 00-2 2v3a2 2 0 110 4v3a2 2 0 002 2h14a2 2 0 002-2v-3a2 2 0 110-4V7a2 2 0 00-2-2H5z"
                />
              </svg>
            </div>
            Abonnement
          </CardTitle>
          <CardDescription>Votre plan actuel</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-sm text-muted-foreground mb-3">
            Aucun abonnement actif.
          </p>
          <a
            href="#"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium"
          >
            Voir les plans
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

function ESDashboard() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
            Mon Entreprise
          </CardTitle>
          <CardDescription>Profil de votre entreprise</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-sm text-muted-foreground mb-3">
            Complétez votre profil entreprise pour être visible.
          </p>
          <a
            href="/dashboard/company"
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium"
          >
            Configurer
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </a>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
            Transactions à valider
          </CardTitle>
          <CardDescription>Transactions en attente</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <p className="text-sm text-muted-foreground">
            Aucune transaction en attente.
          </p>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <CardHeader className="relative">
          <CardTitle className="flex items-center gap-2">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                />
              </svg>
            </div>
            Statistiques
          </CardTitle>
          <CardDescription>Aperçu de votre activité</CardDescription>
        </CardHeader>
        <CardContent className="relative">
          <div className="space-y-3 text-sm">
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-muted-foreground">
                Transactions validées
              </span>
              <span className="font-semibold">0</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-lg bg-muted/50">
              <span className="text-muted-foreground">Volume total</span>
              <span className="font-semibold">0 €</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <CardHeader className="relative pb-2">
          <div className="flex items-center justify-between">
            <CardDescription>Utilisateurs</CardDescription>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                />
              </svg>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative pt-0">
          <p className="text-4xl font-bold text-gradient">0</p>
          <p className="text-xs text-muted-foreground mt-1">
            Total des utilisateurs
          </p>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent" />
        <CardHeader className="relative pb-2">
          <div className="flex items-center justify-between">
            <CardDescription>Entreprises</CardDescription>
            <div className="w-10 h-10 rounded-xl bg-accent/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-accent"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                />
              </svg>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative pt-0">
          <p className="text-4xl font-bold text-accent">0</p>
          <p className="text-xs text-muted-foreground mt-1">
            Entreprises solidaires
          </p>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent" />
        <CardHeader className="relative pb-2">
          <div className="flex items-center justify-between">
            <CardDescription>Transactions</CardDescription>
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                />
              </svg>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative pt-0">
          <p className="text-4xl font-bold text-primary">0</p>
          <p className="text-xs text-muted-foreground mt-1">Ce mois-ci</p>
        </CardContent>
      </Card>

      <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-primary to-primary/80">
        <CardHeader className="relative pb-2">
          <div className="flex items-center justify-between">
            <CardDescription className="text-primary-foreground/80">
              Revenus
            </CardDescription>
            <div className="w-10 h-10 rounded-xl bg-primary-foreground/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
            </div>
          </div>
        </CardHeader>
        <CardContent className="relative pt-0">
          <p className="text-4xl font-bold text-primary-foreground">0 €</p>
          <p className="text-xs text-primary-foreground/80 mt-1">MRR actuel</p>
        </CardContent>
      </Card>
    </div>
  );
}
