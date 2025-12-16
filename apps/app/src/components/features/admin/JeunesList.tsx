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
} from "@priscilla/ui/table";
import { Badge } from "@priscilla/ui/badge";
import { Button } from "@priscilla/ui/button";
import { Eye, Star, ClipboardList, Users } from "lucide-react";
import { JeOutputDTO } from "@priscilla/core/application/use-cases/GetAllJeunes";
import {
  AdminListContainer,
  AdminListHeader,
  AdminListTableWrapper,
  AdminListFooter,
  AdminListEmptyState,
} from "./AdminListLayout";

interface JeunesListProps {
  initialJeunes: JeOutputDTO[];
}

export function JeunesList({ initialJeunes }: JeunesListProps) {
  const router = useRouter();
  const [jeunes] = useState(initialJeunes);
  const [searchQuery, setSearchQuery] = useState("");

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

  const activeCount = jeunes.filter((je) => je.status === "ACTIVE").length;
  const suspendedCount = jeunes.filter(
    (je) => je.status === "SUSPENDED"
  ).length;

  return (
    <AdminListContainer>
      {/* Search bar */}
      <AdminListHeader
        searchPlaceholder="Rechercher par nom, email, secteur..."
        searchValue={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Empty state */}
      {filteredJeunes.length === 0 && jeunes.length === 0 && (
        <AdminListEmptyState
          icon={<Users className="h-12 w-12" />}
          title="Aucun Jeune Entrepreneur"
          description="Il n'y a pas encore de Jeunes Entrepreneurs inscrits sur la plateforme."
        />
      )}

      {/* Table */}
      {jeunes.length > 0 && (
        <AdminListTableWrapper>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold">Nom</TableHead>
                <TableHead className="font-semibold hidden md:table-cell">
                  Email
                </TableHead>
                <TableHead className="font-semibold hidden lg:table-cell">
                  Secteur
                </TableHead>
                <TableHead className="font-semibold hidden lg:table-cell">
                  Localisation
                </TableHead>
                <TableHead className="font-semibold hidden sm:table-cell">
                  Abonnement
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <div className="flex items-center justify-center gap-1">
                    <ClipboardList className="h-4 w-4" />
                    <span className="hidden sm:inline">Trans.</span>
                  </div>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  <div className="flex items-center justify-center gap-1">
                    <Star className="h-4 w-4" />
                    <span className="hidden sm:inline">Points</span>
                  </div>
                </TableHead>
                <TableHead className="font-semibold hidden md:table-cell">
                  Statut
                </TableHead>
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
                    <TableCell className="font-medium">
                      <div>
                        {je.fullName}
                        {/* Mobile: show email below name */}
                        <span className="block text-xs text-muted-foreground md:hidden">
                          {je.email}
                        </span>
                      </div>
                    </TableCell>
                    <TableCell className="text-muted-foreground hidden md:table-cell">
                      {je.email}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {je.businessSector || "-"}
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      {je.department && je.region
                        ? `${je.department}, ${je.region}`
                        : je.department || je.region || "-"}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
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
                    <TableCell className="hidden md:table-cell">
                      {getStatusBadge(je.status)}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center justify-end">
                        <Button variant="ghost" size="icon-sm" asChild>
                          <Link href={`/dashboard/admin/users/${je.id}`}>
                            <Eye className="h-4 w-4" />
                            <span className="sr-only">Voir détails</span>
                          </Link>
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </AdminListTableWrapper>
      )}

      {/* Footer with summary */}
      {jeunes.length > 0 && (
        <AdminListFooter
          filteredCount={filteredJeunes.length}
          totalCount={jeunes.length}
          label="JE"
          statusSummary={
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {activeCount} actif{activeCount > 1 ? "s" : ""}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-red-500" />
                {suspendedCount} suspendu{suspendedCount > 1 ? "s" : ""}
              </span>
            </div>
          }
        />
      )}
    </AdminListContainer>
  );
}
