import { type ReactNode } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@priscilla/ui/card";

interface FeatureCardProps {
  /** Icon component to display */
  icon: ReactNode;
  /** Card title */
  title: string;
  /** Card description */
  description: string;
  /** Color variant for the icon and hover effects */
  variant?: "primary" | "accent";
}

/**
 * Feature card with icon, title, and description.
 * Used on the homepage to showcase platform features.
 */
export function FeatureCard({
  icon,
  title,
  description,
  variant = "primary",
}: FeatureCardProps) {
  const colorClasses =
    variant === "primary"
      ? {
          border: "hover:border-primary/20",
          iconBg: "bg-primary/8",
          iconColor: "text-primary",
          ring: "group-hover:ring-primary/10",
        }
      : {
          border: "hover:border-accent/20",
          iconBg: "bg-accent/10",
          iconColor: "text-accent",
          ring: "group-hover:ring-accent/10",
        };

  return (
    <Card
      className={`group relative overflow-hidden bg-card/50 backdrop-blur-sm border border-border/50 ${colorClasses.border} hover:shadow-lg transition-all duration-300`}
    >
      <CardHeader className="relative pb-3 pt-6">
        <div
          className={`w-12 h-12 rounded-xl ${colorClasses.iconBg} flex items-center justify-center mb-5 ring-4 ring-transparent ${colorClasses.ring} transition-all duration-300`}
        >
          <span className={colorClasses.iconColor}>{icon}</span>
        </div>
        <CardTitle className="text-lg font-semibold mb-3">{title}</CardTitle>
      </CardHeader>
      <CardContent className="relative pt-0 pb-6">
        <CardDescription className="text-sm leading-relaxed">
          {description}
        </CardDescription>
      </CardContent>
    </Card>
  );
}
