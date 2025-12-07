import { type ReactNode } from "react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ChevronRightIcon } from "./Icons";

interface DashboardCardProps {
  /** Icon component to display */
  icon: ReactNode;
  /** Card title */
  title: string;
  /** Card subtitle/description */
  description: string;
  /** Main content of the card */
  children: ReactNode;
  /** Color variant for styling */
  variant?: "primary" | "accent";
  /** Optional badge content (e.g., points count) */
  badge?: string | { text: string; variant?: "primary" | "accent" };
  /** Optional link for a "View more" action */
  actionLink?: {
    href: string;
    text: string;
  };
}

/**
 * Dashboard card component with icon, gradient background, and optional actions.
 * Used in JE, ES, and Admin dashboards.
 */
export function DashboardCard({
  icon,
  title,
  description,
  children,
  variant = "primary",
  badge,
  actionLink,
}: DashboardCardProps) {
  // Normalize badge to object format
  const badgeConfig =
    typeof badge === "string" ? { text: badge, variant: variant } : badge;

  const badgeVariant = badgeConfig?.variant ?? variant;

  const colorClasses =
    variant === "primary"
      ? {
          gradient: "from-primary/5",
          iconBg: "bg-primary/10",
          iconColor: "text-primary",
        }
      : {
          gradient: "from-accent/5",
          iconBg: "bg-accent/10",
          iconColor: "text-accent",
        };

  const badgeClasses =
    badgeVariant === "primary"
      ? "bg-primary/10 text-primary hover:bg-primary/20"
      : "bg-accent/10 text-accent hover:bg-accent/20";

  return (
    <Card className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300">
      <div
        className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient} to-transparent`}
      />
      <CardHeader className="relative">
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <div
              className={`w-10 h-10 rounded-xl ${colorClasses.iconBg} flex items-center justify-center`}
            >
              <span className={`w-5 h-5 ${colorClasses.iconColor}`}>
                {icon}
              </span>
            </div>
            {title}
          </span>
          {badgeConfig && (
            <Badge className={`${badgeClasses} border-0`}>
              {badgeConfig.text}
            </Badge>
          )}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="relative">
        {children}
        {actionLink && (
          <Link
            href={actionLink.href}
            className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium mt-3"
          >
            {actionLink.text}
            <ChevronRightIcon className="w-4 h-4" />
          </Link>
        )}
      </CardContent>
    </Card>
  );
}
