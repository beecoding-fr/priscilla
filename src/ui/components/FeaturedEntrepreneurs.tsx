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
    <section className="py-20 px-4">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">
          Jeunes Entrepreneurs à la une
        </h2>
        <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
          Découvrez les entrepreneurs mis en avant par Priscilla ce mois-ci.
        </p>

        <div className="relative max-w-5xl mx-auto">
          {/* Navigation Buttons */}
          <Button
            variant="outline"
            size="icon"
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 z-10 hidden md:flex"
            onClick={goLeft}
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>

          <Button
            variant="outline"
            size="icon"
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 z-10 hidden md:flex"
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
                className="transition-all duration-300 hover:shadow-lg"
              >
                <CardHeader className="text-center pb-2">
                  <Avatar className="w-16 h-16 mx-auto mb-3">
                    <AvatarFallback className="bg-primary/10 text-primary text-lg">
                      {entrepreneur.name
                        .split(" ")
                        .map((n) => n[0])
                        .join("")}
                    </AvatarFallback>
                  </Avatar>
                  <CardTitle className="text-lg">{entrepreneur.name}</CardTitle>
                  <p className="text-primary font-medium">
                    {entrepreneur.project}
                  </p>
                </CardHeader>
                <CardContent className="text-center">
                  <Badge variant="secondary" className="mb-3">
                    {entrepreneur.sector}
                  </Badge>
                  <p className="text-sm text-muted-foreground mb-4">
                    {entrepreneur.description}
                  </p>
                  <div className="flex items-center justify-center gap-1 text-sm">
                    <span className="text-yellow-500">⭐</span>
                    <span className="font-semibold">{entrepreneur.points}</span>
                    <span className="text-muted-foreground">points</span>
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
