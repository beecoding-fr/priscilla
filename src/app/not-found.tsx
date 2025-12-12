"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft, Search } from "lucide-react";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="flex flex-col min-h-[calc(100vh-4rem)] items-center justify-center px-4 py-16">
      {/* Background decorative elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-accent/5 rounded-full blur-[80px]" />
      </div>

      <div className="relative z-10 text-center max-w-lg mx-auto">
        {/* 404 Number */}
        <div className="mb-8">
          <h1 className="text-8xl md:text-9xl font-bold text-gradient tracking-tight">
            404
          </h1>
        </div>

        {/* Icon */}
        <div className="w-20 h-20 mx-auto mb-8 rounded-2xl bg-primary/10 flex items-center justify-center">
          <Search className="w-10 h-10 text-primary" />
        </div>

        {/* Message */}
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground mb-4">
          Page introuvable
        </h2>
        <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
          Désolé, la page que vous recherchez n&apos;existe pas ou a été
          déplacée. Vérifiez l&apos;URL ou retournez à l&apos;accueil.
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link href="/">
            <Button
              size="lg"
              className="text-base px-8 h-13 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group"
            >
              <Home className="w-4 h-4 mr-2" />
              Retour à l&apos;accueil
            </Button>
          </Link>
          <Button
            variant="outline"
            size="lg"
            className="text-base px-8 h-13 rounded-xl border-border/60 hover:bg-secondary/80 transition-all duration-300"
            onClick={() => router.back()}
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Page précédente
          </Button>
        </div>

        {/* Additional help */}
        <div className="mt-16 pt-8 border-t border-border/40">
          <p className="text-sm text-muted-foreground">
            Besoin d&apos;aide ?{" "}
            <Link
              href="/contact"
              className="text-primary hover:underline font-medium"
            >
              Contactez-nous
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
