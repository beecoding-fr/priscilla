"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@priscilla/ui/card";
import { Badge } from "@priscilla/ui/badge";
import { Button } from "@priscilla/ui/button";
import { Separator } from "@priscilla/ui/separator";
import {
  ArrowLeft,
  Mail,
  Building2,
  MapPin,
  Calendar,
  Star,
  ClipboardList,
  CreditCard,
  UserX,
  UserCheck,
  Loader2,
  CheckCircle,
  XCircle,
} from "lucide-react";
import { JeDetailsDTO } from "@priscilla/core/application/use-cases/GetJeDetails";
import { toast } from "sonner";

interface JeDetailsCardProps {
  je: JeDetailsDTO;
}

export function JeDetailsCard({ je: initialJe }: JeDetailsCardProps) {
  const router = useRouter();
  const [je, setJe] = useState(initialJe);
  const [isLoading, setIsLoading] = useState(false);

  const handleStatusChange = async (action: "suspend" | "reactivate") => {
    setIsLoading(true);
    try {
      const response = await fetch(`/api/admin/jeunes/${je.id}/status`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Une erreur est survenue");
      }

      toast.success(data.message);

      // Update local state
      setJe((prev) => ({
        ...prev,
        status: action === "suspend" ? "SUSPENDED" : "ACTIVE",
      }));

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erreur lors de la mise à jour"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getStatusBadge = () => {
    if (je.status === "ACTIVE") {
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200 gap-1">
          <CheckCircle className="h-3 w-3" />
          Actif
        </Badge>
      );
    }
    return (
      <Badge
        variant="destructive"
        className="bg-red-100 text-red-700 border-red-200 gap-1"
      >
        <XCircle className="h-3 w-3" />
        Suspendu
      </Badge>
    );
  };

  const getSubscriptionBadge = () => {
    if (!je.subscriptionPlanName) {
      return (
        <Badge variant="secondary" className="bg-muted text-muted-foreground">
          Aucun
        </Badge>
      );
    }

    const colors: Record<string, string> = {
      ESSENTIEL: "bg-blue-100 text-blue-700 border-blue-200",
      STANDARD: "bg-purple-100 text-purple-700 border-purple-200",
      PREMIUM: "bg-amber-100 text-amber-700 border-amber-200",
    };

    return (
      <Badge
        className={colors[je.subscriptionPlanName.toUpperCase()] || "bg-muted"}
      >
        {je.subscriptionPlanName}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Back button */}
      <Button variant="ghost" asChild className="gap-2 pl-2">
        <Link href="/dashboard/admin/users">
          <ArrowLeft className="h-4 w-4" />
          Retour à la liste
        </Link>
      </Button>

      {/* Main card */}
      <Card className="border-border/50 shadow-lg">
        <CardHeader className="pb-4">
          <div className="flex flex-col gap-4">
            <div>
              <CardTitle className="text-2xl">{je.fullName}</CardTitle>
              <CardDescription className="flex items-center gap-2 mt-1">
                <Mail className="h-4 w-4" />
                <span className="truncate">{je.email}</span>
              </CardDescription>
            </div>
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3">
              {getStatusBadge()}
              {je.status === "ACTIVE" ? (
                <Button
                  variant="destructive"
                  size="sm"
                  className="gap-2 w-full sm:w-auto"
                  onClick={() => handleStatusChange("suspend")}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <UserX className="h-4 w-4" />
                  )}
                  Suspendre le compte
                </Button>
              ) : (
                <Button
                  variant="default"
                  size="sm"
                  className="gap-2 bg-green-600 hover:bg-green-700 w-full sm:w-auto"
                  onClick={() => handleStatusChange("reactivate")}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <UserCheck className="h-4 w-4" />
                  )}
                  Réactiver le compte
                </Button>
              )}
            </div>
          </div>
        </CardHeader>

        <Separator />

        <CardContent className="pt-6">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Informations de base */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <Building2 className="h-5 w-5 text-primary" />
                Informations professionnelles
              </h3>
              <div className="space-y-3 pl-7">
                <div>
                  <p className="text-sm text-muted-foreground">
                    Secteur d&apos;activité
                  </p>
                  <p className="font-medium">
                    {je.businessSector || "Non renseigné"}
                  </p>
                </div>
              </div>
            </div>

            {/* Localisation */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg flex items-center gap-2">
                <MapPin className="h-5 w-5 text-primary" />
                Localisation
              </h3>
              <div className="space-y-3 pl-7">
                <div>
                  <p className="text-sm text-muted-foreground">Département</p>
                  <p className="font-medium">
                    {je.department || "Non renseigné"}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Région</p>
                  <p className="font-medium">{je.region || "Non renseigné"}</p>
                </div>
              </div>
            </div>
          </div>

          <Separator className="my-6" />

          {/* Métriques */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Métriques</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {/* Abonnement */}
              <Card className="bg-muted/30 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <CreditCard className="h-4 w-4" />
                    <span className="text-sm">Abonnement</span>
                  </div>
                  {getSubscriptionBadge()}
                  {je.subscriptionStatus &&
                    je.subscriptionStatus !== "ACTIVE" && (
                      <p className="text-xs text-muted-foreground mt-1">
                        Statut: {je.subscriptionStatus}
                      </p>
                    )}
                </CardContent>
              </Card>

              {/* Transactions */}
              <Card className="bg-muted/30 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <ClipboardList className="h-4 w-4" />
                    <span className="text-sm">Transactions</span>
                  </div>
                  <p className="text-2xl font-bold">{je.totalTransactions}</p>
                  <p className="text-xs text-muted-foreground">validées</p>
                </CardContent>
              </Card>

              {/* Points */}
              <Card className="bg-muted/30 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Star className="h-4 w-4" />
                    <span className="text-sm">Points</span>
                  </div>
                  <p className="text-2xl font-bold text-primary">
                    {je.totalPoints}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    total accumulés
                  </p>
                </CardContent>
              </Card>

              {/* Date d'inscription */}
              <Card className="bg-muted/30 border-border/50">
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 text-muted-foreground mb-2">
                    <Calendar className="h-4 w-4" />
                    <span className="text-sm">Inscrit le</span>
                  </div>
                  <p className="font-medium">
                    {format(new Date(je.createdAt), "d MMMM yyyy", {
                      locale: fr,
                    })}
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Additional info */}
          <Separator className="my-6" />

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm text-muted-foreground">
            <p>
              Email vérifié:{" "}
              {je.emailVerified ? (
                <span className="text-green-600 font-medium">
                  Oui (
                  {format(new Date(je.emailVerified), "d MMMM yyyy", {
                    locale: fr,
                  })}
                  )
                </span>
              ) : (
                <span className="text-amber-600 font-medium">Non</span>
              )}
            </p>
            <p>
              Dernière mise à jour:{" "}
              {format(new Date(je.updatedAt), "d MMMM yyyy à HH:mm", {
                locale: fr,
              })}
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
