"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
    <section className="py-24 px-4">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-accent/10 text-accent">
            Communauté
          </span>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Jeunes Entrepreneurs à la une
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Découvrez les entrepreneurs mis en avant par Priscilla ce mois-ci.
          </p>
        </div>

        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 hidden md:flex rounded-full shadow-lg hover:shadow-xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            onClick={goLeft}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 hidden md:flex rounded-full shadow-lg hover:shadow-xl hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all"
            onClick={goRight}
            disabled={currentIndex === maxIndex}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>

          {/* Cards Container */}
          <div className="grid md:grid-cols-3 gap-6">
            {visibleEntrepreneurs.map((entrepreneur) => (
              <Card
                key={entrepreneur.id}
                className="group relative overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 opacity-0 group-hover:opacity-100 transition-opacity" />
                <CardHeader className="text-center pb-2 relative">
                  <Avatar className="w-18 h-18 mx-auto mb-4 ring-4 ring-primary/10 group-hover:ring-primary/20 transition-all">
                    <AvatarFallback className="bg-gradient-to-br from-primary/20 to-accent/20 text-primary text-lg font-semibold">
                      {entrepreneur.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{entrepreneur.name}</CardTitle>
                  <p className="text-primary font-semibold">
                    {entrepreneur.project}
                  </p>
                </CardHeader>
                <CardContent className="text-center relative">
                  <Badge variant="secondary" className="mb-3 bg-secondary/80">
                    {entrepreneur.sector}
                  </Badge>
                  <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
                    {entrepreneur.description}
                  </p>
                  <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-accent/10">
                    <svg
                      className="w-4 h-4 text-accent"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="font-semibold text-sm">
                      {entrepreneur.points}
                    </span>
                    <span className="text-muted-foreground text-sm">
                      points
                    </span>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Mobile Navigation */}
          <div className="flex justify-center gap-4 mt-6 md:hidden">
            <Button
              variant="outline"
              size="icon"
              onClick={goLeft}
              disabled={currentIndex === 0}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={goRight}
              disabled={currentIndex === maxIndex}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>

          {/* Dots Indicator */}
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: maxIndex + 1 }).map((_, index) => (
              <button
                key={index}
                className={`w-2 h-2 rounded-full transition-colors ${
                  index === currentIndex
                    ? "bg-primary"
                    : "bg-muted-foreground/30"
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
