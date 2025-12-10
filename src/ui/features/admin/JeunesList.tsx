"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Eye,
  Search,
  UserX,
  UserCheck,
  Star,
  ClipboardList,
  Loader2,
} from "lucide-react";
import { JeOutputDTO } from "@/core/application/use-cases/GetAllJeunes";
import { toast } from "sonner";

interface JeunesListProps {
  initialJeunes: JeOutputDTO[];
}

export function JeunesList({ initialJeunes }: JeunesListProps) {
  const router = useRouter();
  const [jeunes, setJeunes] = useState(initialJeunes);
  const [searchQuery, setSearchQuery] = useState("");
  const [loadingId, setLoadingId] = useState<string | null>(null);

  const filteredJeunes = jeunes.filter((je) => {
    const searchLower = searchQuery.toLowerCase();
    return (
      je.fullName.toLowerCase().includes(searchLower) ||
      je.email.toLowerCase().includes(searchLower) ||
      je.businessSector?.toLowerCase().includes(searchLower) ||
      je.department?.toLowerCase().includes(searchLower) ||
      je.region?.toLowerCase().includes(searchLower)
    );
  });

  const handleStatusChange = async (
    jeId: string,
    action: "suspend" | "reactivate"
  ) => {
    setLoadingId(jeId);
    try {
      const response = await fetch(`/api/admin/jeunes/${jeId}/status`, {
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
      setJeunes((prev) =>
        prev.map((je) =>
          je.id === jeId
            ? { ...je, status: action === "suspend" ? "SUSPENDED" : "ACTIVE" }
            : je
        )
      );

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erreur lors de la mise à jour"
      );
    } finally {
      setLoadingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    if (status === "ACTIVE") {
      return (
        <Badge className="bg-green-100 text-green-700 border-green-200">
          Actif
        </Badge>
      );
    }
    return (
      <Badge
        variant="destructive"
        className="bg-red-100 text-red-700 border-red-200"
      >
        Suspendu
      </Badge>
    );
  };

  const getSubscriptionBadge = (
    planName: string | null,
    status: string | null
  ) => {
    if (!planName) {
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
      <Badge className={colors[planName.toUpperCase()] || "bg-muted"}>
        {planName}
        {status && status !== "ACTIVE" && (
          <span className="ml-1 text-xs opacity-70">({status})</span>
        )}
      </Badge>
    );
  };

  return (
    <div className="space-y-6">
      {/* Search bar */}
      <div className="relative max-w-md">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par nom, email, secteur..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-10 h-11"
        />
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border/50 bg-card shadow-sm overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-muted/50">
              <TableHead className="font-semibold">Nom</TableHead>
              <TableHead className="font-semibold">Email</TableHead>
              <TableHead className="font-semibold">Secteur</TableHead>
              <TableHead className="font-semibold">Localisation</TableHead>
              <TableHead className="font-semibold">Abonnement</TableHead>
              <TableHead className="font-semibold text-center">
                <div className="flex items-center justify-center gap-1">
                  <ClipboardList className="h-4 w-4" />
                  Trans.
                </div>
              </TableHead>
              <TableHead className="font-semibold text-center">
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4" />
                  Points
                </div>
              </TableHead>
              <TableHead className="font-semibold">Statut</TableHead>
              <TableHead className="font-semibold text-right">
                Actions
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredJeunes.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={9}
                  className="text-center py-10 text-muted-foreground"
                >
                  {searchQuery
                    ? "Aucun résultat trouvé pour cette recherche"
                    : "Aucun Jeune Entrepreneur enregistré"}
                </TableCell>
              </TableRow>
            ) : (
              filteredJeunes.map((je) => (
                <TableRow key={je.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium">{je.fullName}</TableCell>
                  <TableCell className="text-muted-foreground">
                    {je.email}
                  </TableCell>
                  <TableCell>{je.businessSector || "-"}</TableCell>
                  <TableCell>
                    {je.department && je.region
                      ? `${je.department}, ${je.region}`
                      : je.department || je.region || "-"}
                  </TableCell>
                  <TableCell>
                    {getSubscriptionBadge(
                      je.subscriptionPlanName,
                      je.subscriptionStatus
                    )}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {je.totalTransactions}
                  </TableCell>
                  <TableCell className="text-center font-medium text-primary">
                    {je.totalPoints}
                  </TableCell>
                  <TableCell>{getStatusBadge(je.status)}</TableCell>
                  <TableCell>
                    <div className="flex items-center justify-end gap-2">
                      <Button variant="ghost" size="icon-sm" asChild>
                        <Link href={`/dashboard/admin/users/${je.id}`}>
                          <Eye className="h-4 w-4" />
                          <span className="sr-only">Voir détails</span>
                        </Link>
                      </Button>
                      {je.status === "ACTIVE" ? (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          onClick={() => handleStatusChange(je.id, "suspend")}
                          disabled={loadingId === je.id}
                        >
                          {loadingId === je.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <UserX className="h-4 w-4" />
                          )}
                          <span className="sr-only">Suspendre</span>
                        </Button>
                      ) : (
                        <Button
                          variant="ghost"
                          size="icon-sm"
                          className="text-green-600 hover:text-green-600 hover:bg-green-100"
                          onClick={() =>
                            handleStatusChange(je.id, "reactivate")
                          }
                          disabled={loadingId === je.id}
                        >
                          {loadingId === je.id ? (
                            <Loader2 className="h-4 w-4 animate-spin" />
                          ) : (
                            <UserCheck className="h-4 w-4" />
                          )}
                          <span className="sr-only">Réactiver</span>
                        </Button>
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between text-sm text-muted-foreground">
        <p>
          {filteredJeunes.length} JE affiché
          {filteredJeunes.length > 1 ? "s" : ""} sur {jeunes.length} au total
        </p>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-green-500" />
            {jeunes.filter((je) => je.status === "ACTIVE").length} actif(s)
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2 h-2 rounded-full bg-red-500" />
            {jeunes.filter((je) => je.status === "SUSPENDED").length}{" "}
            suspendu(s)
          </span>
        </div>
      </div>
    </div>
  );
}
