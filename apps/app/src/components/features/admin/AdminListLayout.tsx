"use client";

import { ReactNode } from "react";
import { Button } from "@priscilla/ui/button";
import { Input } from "@priscilla/ui/input";
import { Search, Plus, Loader2 } from "lucide-react";

interface AdminListHeaderProps {
  title?: string;
  description?: string;
  count?: {
    filtered: number;
    total: number;
    label: string;
  };
  searchPlaceholder?: string;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  actionButton?: {
    label: string;
    onClick: () => void;
    icon?: ReactNode;
    disabled?: boolean;
  };
  statusSummary?: ReactNode;
}

export function AdminListHeader({
  searchPlaceholder,
  searchValue,
  onSearchChange,
  actionButton,
}: AdminListHeaderProps) {
  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      {/* Search bar */}
      {onSearchChange && (
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder={searchPlaceholder || "Rechercher..."}
            value={searchValue}
            onChange={(e) => onSearchChange(e.target.value)}
            className="pl-10 h-11"
          />
        </div>
      )}

      {/* Action button */}
      {actionButton && (
        <Button
          onClick={actionButton.onClick}
          disabled={actionButton.disabled}
          className="gap-2"
        >
          {actionButton.icon || <Plus className="h-4 w-4" />}
          {actionButton.label}
        </Button>
      )}
    </div>
  );
}

interface AdminListContainerProps {
  children: ReactNode;
  loading?: boolean;
}

export function AdminListContainer({
  children,
  loading,
}: AdminListContainerProps) {
  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-primary" />
      </div>
    );
  }

  return <div className="space-y-6">{children}</div>;
}

interface AdminListTableWrapperProps {
  children: ReactNode;
}

export function AdminListTableWrapper({
  children,
}: AdminListTableWrapperProps) {
  return (
    <div className="rounded-lg border border-border/50 bg-card shadow-sm overflow-hidden">
      {children}
    </div>
  );
}

interface AdminListFooterProps {
  filteredCount: number;
  totalCount: number;
  label: string;
  statusSummary?: ReactNode;
}

export function AdminListFooter({
  filteredCount,
  totalCount,
  label,
  statusSummary,
}: AdminListFooterProps) {
  return (
    <div className="flex items-center justify-between text-sm text-muted-foreground">
      <p>
        {filteredCount} {label}
        {filteredCount > 1 ? "s" : ""} affiché{filteredCount > 1 ? "s" : ""} sur{" "}
        {totalCount} au total
      </p>
      {statusSummary}
    </div>
  );
}

interface AdminListEmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function AdminListEmptyState({
  icon,
  title,
  description,
  action,
}: AdminListEmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-dashed border-border/50 py-12 bg-card">
      <div className="text-muted-foreground/50">{icon}</div>
      <h3 className="mt-4 text-lg font-medium">{title}</h3>
      <p className="mt-1 text-sm text-muted-foreground text-center max-w-md">
        {description}
      </p>
      {action && (
        <Button onClick={action.onClick} className="mt-4 gap-2">
          <Plus className="h-4 w-4" />
          {action.label}
        </Button>
      )}
    </div>
  );
}
