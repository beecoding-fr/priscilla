"use client";

import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Sparkles, LayoutDashboard, Settings, LogOut } from "lucide-react";

export function Navbar() {
  const { data: session } = useSession();

  const getInitials = (name: string | null | undefined) => {
    if (!name) return "U";
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadge = (role: string) => {
    switch (role) {
      case "ADMIN":
        return "Admin";
      case "JE":
        return "Jeune Entrepreneur";
      case "ES":
        return "Entreprise Solidaire";
      default:
        return role;
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/80 backdrop-blur-xl supports-backdrop-filter:bg-background/60">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/20">
            <Sparkles className="w-4.5 h-4.5 text-primary-foreground" />
          </div>
          <span className="text-lg font-semibold hidden sm:block tracking-tight">
            Jeunes <span className="text-primary">Entrepreneurs</span>
          </span>
        </Link>

        <nav className="flex items-center gap-3">
          {session?.user ? (
            <>
              {/* <Link href="/dashboard">
                <Button
                  variant="ghost"
                  size="sm"
                  className="hidden sm:flex gap-2 text-muted-foreground hover:text-foreground"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  Dashboard
                </Button>
              </Link> */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    className="relative h-10 w-10 rounded-full p-0 ring-2 ring-border/50 hover:ring-primary/30 transition-all duration-200"
                  >
                    <Avatar className="h-9 w-9">
                      <AvatarFallback className="text-sm bg-muted text-foreground font-medium">
                        {getInitials(
                          `${session.user.firstName || ""} ${
                            session.user.lastName || ""
                          }`
                        )}
                      </AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1.5">
                      <p className="text-sm font-medium leading-none">
                        {session.user.firstName} {session.user.lastName}
                      </p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {session.user.email}
                      </p>
                      <span className="inline-flex w-fit text-[10px] font-medium uppercase tracking-wider px-2 py-0.5 rounded-full bg-primary/10 text-primary">
                        {getRoleBadge(session.user.role)}
                      </span>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <LayoutDashboard className="w-4 h-4" />
                      Dashboard
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="/dashboard/settings"
                      className="flex items-center gap-2 cursor-pointer"
                    >
                      <Settings className="w-4 h-4" />
                      Paramètres
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className="text-destructive cursor-pointer flex items-center gap-2"
                    onClick={() => signOut({ callbackUrl: "/" })}
                  >
                    <LogOut className="w-4 h-4" />
                    Se déconnecter
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              {/* <Link href="/login">
                <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground">
                  Connexion
                </Button>
              </Link> */}
              <Link href="/login">
                <Button
                  size="sm"
                  className="rounded-lg shadow-md shadow-primary/20"
                >
                  Se connecter
                </Button>
              </Link>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
}
