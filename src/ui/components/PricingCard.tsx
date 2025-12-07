import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Star } from "lucide-react";

interface PricingFeature {
  text: string;
}

interface PricingCardProps {
  /** Plan name */
  name: string;
  /** Monthly price in euros */
  price: number;
  /** List of features included in the plan */
  features: PricingFeature[];
  /** Whether this is the highlighted/popular plan */
  isPopular?: boolean;
  /** CTA button text */
  ctaText: string;
  /** Link for the CTA button */
  ctaHref: string;
  /** Color variant for check icons */
  checkVariant?: "primary" | "accent";
}

/**
 * Pricing card component for subscription plans.
 * Supports highlighting a "popular" plan with special styling.
 */
export function PricingCard({
  name,
  price,
  features,
  isPopular = false,
  ctaText,
  ctaHref,
  checkVariant = "accent",
}: PricingCardProps) {
  const cardClasses = isPopular
    ? "relative border-2 border-primary shadow-xl shadow-primary/10 scale-[1.02] z-10 flex flex-col bg-card"
    : "relative border border-border/50 shadow-sm hover:shadow-md hover:border-border transition-all duration-300 flex flex-col bg-card/50 backdrop-blur-sm";

  const titleClasses = isPopular
    ? "text-base font-semibold text-primary uppercase tracking-wide"
    : "text-base font-semibold text-muted-foreground uppercase tracking-wide";

  const checkColor =
    checkVariant === "primary" ? "text-primary" : "text-accent";

  return (
    <Card className={cardClasses}>
      {isPopular && (
        <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
          <span className="inline-flex items-center gap-1.5 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
            <Star className="w-3 h-3 fill-current" />
            Recommandé
          </span>
        </div>
      )}
      <CardHeader className="pb-2 pt-8 text-center">
        <CardTitle className={titleClasses}>{name}</CardTitle>
        <div className="pt-4 pb-2">
          <span className="text-5xl font-bold tracking-tight">{price}</span>
          <span className="text-lg text-muted-foreground ml-1">€</span>
          <span className="text-muted-foreground text-sm">/mois</span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col flex-1 pt-4">
        <ul className="space-y-3.5 text-sm flex-1">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start gap-3">
              <Check
                className={`w-4 h-4 shrink-0 mt-0.5 ${checkColor}`}
                strokeWidth={2.5}
              />
              <span className="text-muted-foreground">{feature.text}</span>
            </li>
          ))}
        </ul>
        <Link href={ctaHref} className="block mt-8">
          <Button
            variant={isPopular ? "default" : "outline"}
            className={`w-full h-11 rounded-xl font-medium ${
              isPopular ? "shadow-md shadow-primary/20" : ""
            }`}
          >
            {ctaText}
          </Button>
        </Link>
      </CardContent>
    </Card>
  );
}
