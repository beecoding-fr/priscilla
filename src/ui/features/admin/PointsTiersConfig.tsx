"use client";

import { useState, useEffect } from "react";
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
import { Label } from "@/components/ui/label";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Plus,
  Pencil,
  Trash2,
  Loader2,
  Check,
  X,
  Award,
  AlertTriangle,
} from "lucide-react";
import { toast } from "sonner";
import {
  AdminListContainer,
  AdminListHeader,
  AdminListTableWrapper,
  AdminListFooter,
  AdminListEmptyState,
} from "./AdminListLayout";

interface PointsTier {
  id: string;
  minAmountCents: number;
  maxAmountCents: number | null;
  pointsAwarded: number;
  label: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

interface TierFormData {
  minAmountCents: number;
  maxAmountCents: number | null;
  pointsAwarded: number;
  label: string;
}

const defaultFormData: TierFormData = {
  minAmountCents: 0,
  maxAmountCents: null,
  pointsAwarded: 1,
  label: "",
};

export function PointsTiersConfig() {
  const [tiers, setTiers] = useState<PointsTier[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [isCreating, setIsCreating] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [formData, setFormData] = useState<TierFormData>(defaultFormData);
  const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [tierToDelete, setTierToDelete] = useState<string | null>(null);

  useEffect(() => {
    fetchTiers();
  }, []);

  const fetchTiers = async () => {
    try {
      const response = await fetch("/api/admin/points-tiers");
      if (!response.ok) throw new Error("Erreur lors du chargement");
      const data = await response.json();
      setTiers(data.tiers);
    } catch (error) {
      toast.error("Erreur lors du chargement des tranches");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = async () => {
    setSaving(true);
    try {
      const response = await fetch("/api/admin/points-tiers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          minAmountCents: formData.minAmountCents,
          maxAmountCents: formData.maxAmountCents,
          pointsAwarded: formData.pointsAwarded,
          label: formData.label || undefined,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la création");
      }

      toast.success("Tranche créée avec succès");
      setIsCreating(false);
      setFormData(defaultFormData);
      fetchTiers();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erreur lors de la création"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleUpdate = async () => {
    if (!editingId) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/points-tiers/${editingId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          minAmountCents: formData.minAmountCents,
          maxAmountCents: formData.maxAmountCents,
          pointsAwarded: formData.pointsAwarded,
          label: formData.label || null,
        }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la mise à jour");
      }

      toast.success("Tranche mise à jour avec succès");
      setEditingId(null);
      setFormData(defaultFormData);
      fetchTiers();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erreur lors de la mise à jour"
      );
    } finally {
      setSaving(false);
    }
  };

  const confirmDelete = (id: string) => {
    setTierToDelete(id);
    setDeleteDialogOpen(true);
  };

  const handleDelete = async () => {
    if (!tierToDelete) return;

    try {
      const response = await fetch(`/api/admin/points-tiers/${tierToDelete}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la suppression");
      }

      toast.success("Tranche supprimée avec succès");
      fetchTiers();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erreur lors de la suppression"
      );
    } finally {
      setDeleteDialogOpen(false);
      setTierToDelete(null);
    }
  };

  const handleToggleActive = async (tier: PointsTier) => {
    try {
      const response = await fetch(`/api/admin/points-tiers/${tier.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ isActive: !tier.isActive }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || "Erreur lors de la mise à jour");
      }

      toast.success(tier.isActive ? "Tranche désactivée" : "Tranche activée");
      fetchTiers();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Erreur lors de la mise à jour"
      );
    }
  };

  const startEditing = (tier: PointsTier) => {
    setEditingId(tier.id);
    setIsCreating(false);
    setFormData({
      minAmountCents: tier.minAmountCents,
      maxAmountCents: tier.maxAmountCents,
      pointsAwarded: tier.pointsAwarded,
      label: tier.label || "",
    });
  };

  const cancelEdit = () => {
    setEditingId(null);
    setIsCreating(false);
    setFormData(defaultFormData);
  };

  const formatAmount = (cents: number): string => {
    return (cents / 100).toLocaleString("fr-FR", {
      style: "currency",
      currency: "EUR",
    });
  };

  // Format compact pour mobile (ex: 1k€, 5k€, 100€)
  const formatAmountCompact = (cents: number): string => {
    const euros = cents / 100;
    if (euros >= 1000) {
      const k = euros / 1000;
      // Si c'est un nombre entier de milliers, pas de décimale
      return k % 1 === 0 ? `${k}k€` : `${k.toFixed(1).replace(".0", "")}k€`;
    }
    return `${euros}€`;
  };

  const formatRange = (min: number, max: number | null): string => {
    if (max === null) {
      return `≥ ${formatAmount(min)}`;
    }
    return `${formatAmount(min)} - ${formatAmount(max)}`;
  };

  // Format compact pour mobile
  const formatRangeCompact = (min: number, max: number | null): string => {
    if (max === null) {
      return `≥ ${formatAmountCompact(min)}`;
    }
    return `${formatAmountCompact(min)} → ${formatAmountCompact(max)}`;
  };

  const activeTiers = tiers.filter((t) => t.isActive);
  const inactiveTiers = tiers.filter((t) => !t.isActive);

  return (
    <AdminListContainer loading={loading}>
      {/* Header with action button */}
      {tiers.length !== 0 && (
        <AdminListHeader
          title="Tranches de points"
          actionButton={
            !isCreating && !editingId
              ? {
                  label: "Nouvelle tranche",
                  onClick: () => setIsCreating(true),
                  icon: <Plus className="h-4 w-4" />,
                }
              : undefined
          }
        />
      )}

      {/* Form for creating/editing */}
      {(isCreating || editingId) && (
        <div className="rounded-lg border border-border/50 bg-card shadow-sm p-6">
          <h4 className="mb-4 font-medium">
            {isCreating ? "Nouvelle tranche" : "Modifier la tranche"}
          </h4>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            <div className="space-y-2">
              <Label htmlFor="minAmount">Montant minimum (€)</Label>
              <Input
                id="minAmount"
                type="number"
                min="0"
                step="1"
                value={formData.minAmountCents / 100}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    minAmountCents: Math.round(
                      parseFloat(e.target.value || "0") * 100
                    ),
                  }))
                }
                placeholder="0"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="maxAmount">Montant maximum (€)</Label>
              <Input
                id="maxAmount"
                type="number"
                min="0"
                step="1"
                value={
                  formData.maxAmountCents !== null
                    ? formData.maxAmountCents / 100
                    : ""
                }
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    maxAmountCents: e.target.value
                      ? Math.round(parseFloat(e.target.value) * 100)
                      : null,
                  }))
                }
                placeholder="Illimité"
                className="h-11"
              />
              <p className="text-xs text-muted-foreground">
                Laisser vide pour illimité
              </p>
            </div>
            <div className="space-y-2">
              <Label htmlFor="points">Points attribués</Label>
              <Input
                id="points"
                type="number"
                min="0"
                step="1"
                value={formData.pointsAwarded}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    pointsAwarded: parseInt(e.target.value || "0"),
                  }))
                }
                placeholder="1"
                className="h-11"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="label">Libellé (optionnel)</Label>
              <Input
                id="label"
                type="text"
                value={formData.label}
                onChange={(e) =>
                  setFormData((prev) => ({ ...prev, label: e.target.value }))
                }
                placeholder="Ex: Bronze, Silver..."
                className="h-11"
              />
            </div>
          </div>
          <div className="mt-4 flex gap-2">
            <Button
              onClick={isCreating ? handleCreate : handleUpdate}
              disabled={saving}
              className="gap-2"
            >
              {saving ? (
                <Loader2 className="h-4 w-4 animate-spin" />
              ) : (
                <Check className="h-4 w-4" />
              )}
              {isCreating ? "Créer" : "Enregistrer"}
            </Button>
            <Button variant="outline" onClick={cancelEdit} className="gap-2">
              <X className="h-4 w-4" />
              Annuler
            </Button>
          </div>
        </div>
      )}

      {/* Empty state */}
      {tiers.length === 0 && !isCreating && (
        <AdminListEmptyState
          icon={<AlertTriangle className="h-12 w-12" />}
          title="Aucune tranche configurée"
          description="Créez des tranches pour attribuer automatiquement des points aux transactions"
          action={{
            label: "Créer la première tranche",
            onClick: () => setIsCreating(true),
          }}
        />
      )}

      {/* Table */}
      {tiers.length > 0 && (
        <AdminListTableWrapper>
          <Table>
            <TableHeader>
              <TableRow className="bg-muted/50">
                <TableHead className="font-semibold text-right">
                  <span className="sm:hidden">Tranche</span>
                  <span className="hidden sm:inline">Tranche de montant</span>
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Points
                </TableHead>
                <TableHead className="font-semibold text-left hidden sm:table-cell">
                  Libellé
                </TableHead>
                <TableHead className="font-semibold text-center hidden sm:table-cell">
                  Statut
                </TableHead>
                <TableHead className="font-semibold text-center">
                  Actions
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {tiers.map((tier) => (
                <TableRow key={tier.id} className="hover:bg-muted/30">
                  <TableCell className="font-medium text-right">
                    {/* Format compact sur mobile, complet sur desktop */}
                    <span className="sm:hidden">
                      {formatRangeCompact(
                        tier.minAmountCents,
                        tier.maxAmountCents
                      )}
                    </span>
                    <span className="hidden sm:inline">
                      {formatRange(tier.minAmountCents, tier.maxAmountCents)}
                    </span>
                  </TableCell>
                  <TableCell className="text-center">
                    <Badge
                      variant="secondary"
                      className="gap-1 bg-primary/10 text-primary"
                    >
                      <Award className="h-3 w-3" />
                      {tier.pointsAwarded}{" "}
                      {tier.pointsAwarded > 1 ? "points" : "point"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-left hidden sm:table-cell">
                    {tier.label || (
                      <span className="text-muted-foreground">—</span>
                    )}
                  </TableCell>
                  <TableCell className="text-center hidden sm:table-cell">
                    <Badge
                      className={
                        tier.isActive
                          ? "bg-green-100 text-green-700 border-green-200"
                          : "bg-muted text-muted-foreground"
                      }
                    >
                      {tier.isActive ? "Actif" : "Inactif"}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleToggleActive(tier)}
                        title={tier.isActive ? "Désactiver" : "Activer"}
                        className="h-8 w-8"
                      >
                        {tier.isActive ? (
                          <X className="h-4 w-4" />
                        ) : (
                          <Check className="h-4 w-4" />
                        )}
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => startEditing(tier)}
                        title="Modifier"
                        className="h-8 w-8"
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => confirmDelete(tier.id)}
                        className="h-8 w-8 text-destructive hover:text-destructive"
                        title="Supprimer"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </AdminListTableWrapper>
      )}

      {/* Footer */}
      {tiers.length > 0 && (
        <AdminListFooter
          filteredCount={tiers.length}
          totalCount={tiers.length}
          label="tranche"
          statusSummary={
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-green-500" />
                {activeTiers.length} active{activeTiers.length > 1 ? "s" : ""}
              </span>
              <span className="flex items-center gap-1">
                <span className="w-2 h-2 rounded-full bg-muted-foreground" />
                {inactiveTiers.length} inactive
                {inactiveTiers.length > 1 ? "s" : ""}
              </span>
            </div>
          }
        />
      )}

      {/* Info box */}
      {/* <div className="rounded-lg border border-border/50 bg-card shadow-sm p-4">
        <h4 className="font-medium">Exemple de configuration</h4>
        <ul className="mt-2 space-y-1 text-sm text-muted-foreground"> */}
      {/* Format compact sur mobile */}
      {/* <li className="sm:hidden">• 0€ → 1k€ = 1 point</li>
          <li className="sm:hidden">• 1k€ → 5k€ = 2 points</li>
          <li className="sm:hidden">• ≥ 5k€ = 3 points</li> */}
      {/* Format complet sur desktop */}
      {/* <li className="hidden sm:list-item">• 0 € – 1 000 € → 1 point</li>
          <li className="hidden sm:list-item">
            • 1 001 € – 5 000 € → 2 points
          </li>
          <li className="hidden sm:list-item">• &gt; 5 000 € → 3 points</li>
        </ul>
        <p className="mt-3 text-xs text-muted-foreground">
          Les points sont automatiquement attribués lors de la validation
          d&apos;une transaction en fonction du montant.
        </p>
      </div> */}

      {/* Delete confirmation dialog */}
      <AlertDialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Confirmer la suppression</AlertDialogTitle>
            <AlertDialogDescription>
              Êtes-vous sûr de vouloir supprimer cette tranche de points ? Cette
              action est irréversible.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleDelete}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Supprimer
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </AdminListContainer>
  );
}
