import { type ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
} from "@/components/ui/card";

interface StatCardProps {
  /** Label for the stat */
  label: string;
  /** Main value to display */
  value: string | number;
  /** Icon component to display */
  icon: ReactNode;
  /** Optional subtitle below the value */
  subLabel?: string;
  /** Color variant for styling */
  variant?: "primary" | "accent" | "gradient" | "highlight";
}

/**
 * Statistics card component for admin dashboard.
 * Displays a single metric with icon and optional subtitle.
 */
export function StatCard({
  label,
  value,
  icon,
  subLabel,
  variant = "primary",
}: StatCardProps) {
  const isGradient = variant === "gradient" || variant === "highlight";

  const colorClasses = isGradient
    ? {
        card: "bg-gradient-to-br from-primary to-primary/80",
        gradient: "",
        iconBg: "bg-primary-foreground/20",
        iconColor: "text-primary-foreground",
        valueColor: "text-primary-foreground",
        labelColor: "text-primary-foreground/80",
        subtitleColor: "text-primary-foreground/80",
      }
    : variant === "primary"
    ? {
        card: "",
        gradient: "from-primary/5",
        iconBg: "bg-primary/10",
        iconColor: "text-primary",
        valueColor: "text-primary",
        labelColor: "",
        subtitleColor: "text-muted-foreground",
      }
    : {
        card: "",
        gradient: "from-accent/5",
        iconBg: "bg-accent/10",
        iconColor: "text-accent",
        valueColor: "text-accent",
        labelColor: "",
        subtitleColor: "text-muted-foreground",
      };

  return (
    <Card
      className={`group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 ${colorClasses.card}`}
    >
      {!isGradient && (
        <div
          className={`absolute inset-0 bg-gradient-to-br ${colorClasses.gradient} to-transparent`}
        />
      )}
      <CardHeader className="relative pb-2">
        <div className="flex items-center justify-between">
          <CardDescription className={colorClasses.labelColor}>
            {label}
          </CardDescription>
          <div
            className={`w-10 h-10 rounded-xl ${colorClasses.iconBg} flex items-center justify-center`}
          >
            <span className={`w-5 h-5 ${colorClasses.iconColor}`}>{icon}</span>
          </div>
        </div>
      </CardHeader>
      <CardContent className="relative pt-0">
        <p className={`text-4xl font-bold ${colorClasses.valueColor}`}>
          {value}
        </p>
        {subLabel && (
          <p className={`text-xs mt-1 ${colorClasses.subtitleColor}`}>
            {subLabel}
          </p>
        )}
      </CardContent>
    </Card>
  );
}
