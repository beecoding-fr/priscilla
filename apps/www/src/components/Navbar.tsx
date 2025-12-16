"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@priscilla/ui/button";
import { Sparkles, LogIn } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();

  // URL de l'application
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3001";

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Sparkles className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold hidden sm:block tracking-tight">
            Priscilla
          </span>
        </Link>

        <nav className="flex items-center gap-3">
          {session?.user ? (
            <div className="flex items-center gap-2">
              <Link href={appUrl}>
                <Button
                  size="sm"
                  className="rounded-lg shadow-md shadow-primary/20"
                >
                  Mon espace
                </Button>
              </Link>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => signOut({ callbackUrl: "/" })}
              >
                Déconnexion
              </Button>
            </div>
          ) : (
            <Link href="/login">
              <Button
                variant="ghost"
                size="sm"
                className="text-muted-foreground hover:text-foreground"
              >
                <LogIn className="w-4 h-4 mr-1" />
                Connexion
              </Button>
            </Link>
          )}
        </nav>
      </div>
    </header>
  );
}
