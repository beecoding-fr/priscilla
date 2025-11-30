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
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Bienvenue, {user.name || "Utilisateur"} !
        </h1>
        <p className="text-muted-foreground">
          Voici votre tableau de bord personnalisé.
        </p>
      </div>

      {/* Role-based content */}
      {user.role === "JE" && <JEDashboard />}
      {user.role === "ES" && <ESDashboard />}
      {user.role === "ADMIN" && <AdminDashboard />}
    </div>
  );
}

function JEDashboard() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            Mes Points
            <Badge>0 pts</Badge>
          </CardTitle>
          <CardDescription>
            Gagnez des points à chaque transaction
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Effectuez des transactions avec des entreprises solidaires pour
            accumuler des points.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Vos dernières transactions</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Aucune transaction pour le moment.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Abonnement</CardTitle>
          <CardDescription>Votre plan actuel</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Aucun abonnement actif.
          </p>
          <a
            href="#"
            className="text-sm text-primary hover:underline mt-2 inline-block"
          >
            Voir les plans →
          </a>
        </CardContent>
      </Card>
    </div>
  );
}

function ESDashboard() {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Mon Entreprise</CardTitle>
          <CardDescription>Profil de votre entreprise</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Complétez votre profil entreprise pour être visible.
          </p>
          <a
            href="/dashboard/company"
            className="text-sm text-primary hover:underline mt-2 inline-block"
          >
            Configurer →
          </a>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transactions à valider</CardTitle>
          <CardDescription>Transactions en attente</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-muted-foreground">
            Aucune transaction en attente.
          </p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Statistiques</CardTitle>
          <CardDescription>Aperçu de votre activité</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2 text-sm">
            <p>
              Transactions validées: <strong>0</strong>
            </p>
            <p>
              Volume total: <strong>0 €</strong>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

function AdminDashboard() {
  return (
    <div className="grid md:grid-cols-4 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>Utilisateurs</CardTitle>
          <CardDescription>Total des utilisateurs</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">0</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Entreprises</CardTitle>
          <CardDescription>Entreprises solidaires</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">0</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Transactions</CardTitle>
          <CardDescription>Ce mois-ci</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">0</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Revenus</CardTitle>
          <CardDescription>MRR actuel</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-3xl font-bold">0 €</p>
        </CardContent>
      </Card>
    </div>
  );
}
