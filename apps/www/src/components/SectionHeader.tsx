import { type ReactNode } from "react";

interface SectionHeaderProps {
  /** Optional badge/tag displayed above the title */
  badge?: string;
  /** Badge color variant */
  badgeVariant?: "primary" | "accent";
  /** Main section title */
  title: string | ReactNode;
  /** Optional subtitle/description */
  description?: string;
  /** Text alignment */
  align?: "left" | "center";
  /** Additional CSS classes */
  className?: string;
}

/**
 * Reusable section header with optional badge, title and description.
 * Used for consistent section styling across the app.
 */
export function SectionHeader({
  badge,
  badgeVariant = "primary",
  title,
  description,
  align = "center",
  className = "",
}: SectionHeaderProps) {
  const alignmentClasses = align === "center" ? "text-center" : "text-left";
  const badgeColors =
    badgeVariant === "primary"
      ? "bg-primary/8 text-primary border border-primary/15"
      : "bg-accent/8 text-accent border border-accent/15";

  return (
    <div className={`mb-14 ${alignmentClasses} ${className}`}>
      {badge && (
        <span
          className={`inline-block px-3.5 py-1 mb-5 text-xs font-semibold uppercase tracking-wider rounded-full ${badgeColors}`}
        >
          {badge}
        </span>
      )}
      <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
        {title}
      </h2>
      {description && (
        <p
          className={`text-muted-foreground text-base md:text-lg max-w-2xl leading-relaxed ${
            align === "center" ? "mx-auto" : ""
          }`}
        >
          {description}
        </p>
      )}
    </div>
  );
}
