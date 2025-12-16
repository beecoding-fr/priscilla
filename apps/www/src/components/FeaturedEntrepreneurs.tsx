"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@priscilla/ui/card";
import { Button } from "@priscilla/ui/button";
import { Avatar, AvatarFallback } from "@priscilla/ui/avatar";
import { Badge } from "@priscilla/ui/badge";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";

const entrepreneurs = [
  {
    id: 1,
    name: "Sophie Martin",
    project: "EcoFood",
    sector: "Alimentation durable",
    points: 1250,
    description: "Livraison de repas bio et locaux pour les entreprises.",
  },
  {
    id: 2,
    name: "Lucas Dubois",
    project: "TechForGood",
    sector: "Tech sociale",
    points: 980,
    description: "Applications mobiles pour associations caritatives.",
  },
  {
    id: 3,
    name: "Emma Bernard",
    project: "GreenStyle",
    sector: "Mode éthique",
    points: 1520,
    description: "Vêtements recyclés et upcyclés pour jeunes actifs.",
  },
  {
    id: 4,
    name: "Thomas Petit",
    project: "UrbanFarm",
    sector: "Agriculture urbaine",
    points: 870,
    description: "Fermes verticales en milieu urbain.",
  },
  {
    id: 5,
    name: "Léa Moreau",
    project: "CareBuddy",
    sector: "Santé",
    points: 1100,
    description: "Plateforme de mise en relation aide à domicile.",
  },
];

export function FeaturedEntrepreneurs() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const visibleCount = 3;
  const maxIndex = entrepreneurs.length - visibleCount;

  const goLeft = () => {
    setCurrentIndex((prev) => Math.max(0, prev - 1));
  };

  const goRight = () => {
    setCurrentIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  const visibleEntrepreneurs = entrepreneurs.slice(
    currentIndex,
    currentIndex + visibleCount
  );

  return (
    <section className="py-28 px-4">
      <div className="container mx-auto max-w-6xl">
        <div className="text-center mb-14">
          <span className="inline-block px-3.5 py-1 mb-5 text-xs font-semibold uppercase tracking-wider rounded-full bg-accent/8 text-accent border border-accent/15">
            Communauté
          </span>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            Entrepreneurs à la une
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-2xl mx-auto leading-relaxed">
            Découvrez les talents qui font avancer l&apos;entrepreneuriat
            solidaire.
          </p>
        </div>

        <div className="relative">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-14 z-10 hidden md:flex rounded-full h-10 w-10 border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
            onClick={goLeft}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-14 z-10 hidden md:flex rounded-full h-10 w-10 border-border/50 hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-200"
            onClick={goRight}
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Cards Container */}
          <div className="grid md:grid-cols-3 gap-5">
            {visibleEntrepreneurs.map((entrepreneur) => (
              <Card
                key={entrepreneur.id}
                className="group relative overflow-hidden border border-border/50 bg-card/50 backdrop-blur-sm hover:border-border hover:shadow-lg transition-all duration-300"
              >
                <CardHeader className="text-center pb-4 pt-6 relative">
                  <Avatar className="w-16 h-16 mx-auto mb-4 ring-2 ring-border/50 group-hover:ring-primary/20 transition-all">
                    <AvatarFallback className="bg-muted text-foreground text-base font-medium">
                      {entrepreneur.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-base font-semibold mb-1">
                    {entrepreneur.name}
                  </CardTitle>
                  <p className="text-primary font-medium text-sm">
                    {entrepreneur.project}
                  </p>
                </CardHeader>
                <CardContent className="text-center relative pt-0 pb-6">
                  <Badge
                    variant="secondary"
                    className="mb-4 text-xs font-medium"
                  >
                    {entrepreneur.sector}
                  </Badge>
                  <p className="text-sm text-muted-foreground mb-5 line-clamp-2 leading-relaxed">
                    {entrepreneur.description}
                  </p>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-accent/8 border border-accent/15">
                    <Star className="w-3.5 h-3.5 text-accent fill-accent" />
                    <span className="font-semibold text-sm text-foreground">
                      {entrepreneur.points.toLocaleString("fr-FR")}
                    </span>
                    <span className="text-muted-foreground text-xs">pts</span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-3 mt-6 md:hidden">
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-9 w-9"
              onClick={goLeft}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              className="rounded-full h-9 w-9"
              onClick={goRight}
              disabled={currentIndex === maxIndex}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-1.5 mt-8">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  index === currentIndex
                    ? "bg-primary w-4"
                    : "bg-muted-foreground/25 hover:bg-muted-foreground/40"
                }`}
                onClick={() => setCurrentIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
