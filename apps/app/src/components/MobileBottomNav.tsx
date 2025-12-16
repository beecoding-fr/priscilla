"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@priscilla/ui/utils";
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  ClipboardList,
  Star,
  CheckCircle,
} from "lucide-react";

type BottomNavItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type BottomNavConfig = {
  ADMIN: BottomNavItem[];
  JE: BottomNavItem[];
  ES: BottomNavItem[];
};

// Mobile bottom nav shows only the 4-5 most important items
const bottomNavConfig: BottomNavConfig = {
  ADMIN: [
    {
      label: "Accueil",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "ES",
      href: "/dashboard/admin/companies",
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      label: "JE",
      href: "/dashboard/admin/users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      label: "Config",
      href: "/dashboard/admin/configuration",
      icon: <Settings className="w-5 h-5" />,
    },
  ],
  JE: [
    {
      label: "Accueil",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Points",
      href: "/dashboard/points",
      icon: <Star className="w-5 h-5" />,
    },
    {
      label: "Transactions",
      href: "/dashboard/transactions",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      label: "ES",
      href: "/dashboard/companies",
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      label: "Paramètres",
      href: "/dashboard/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ],
  ES: [
    {
      label: "Accueil",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Entreprise",
      href: "/dashboard/company",
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      label: "À valider",
      href: "/dashboard/transactions/pending",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      label: "Historique",
      href: "/dashboard/transactions",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      label: "Paramètres",
      href: "/dashboard/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ],
};

interface MobileBottomNavProps {
  userRole?: string;
}

export function MobileBottomNav({ userRole }: MobileBottomNavProps) {
  const pathname = usePathname();

  const role = (userRole as keyof BottomNavConfig) || "JE";
  const navItems = bottomNavConfig[role] || bottomNavConfig.JE;

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 lg:hidden bg-card/95 backdrop-blur-xl border-t border-border/50 safe-area-inset-bottom">
      <div className="flex items-center justify-around h-16 px-2">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "flex flex-col items-center justify-center gap-1 px-3 py-2 rounded-xl transition-all duration-200 min-w-[60px]",
              isActive(item.href)
                ? "text-primary"
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <div
              className={cn(
                "p-1 rounded-lg transition-all duration-200",
                isActive(item.href) && "bg-primary/10"
              )}
            >
              {item.icon}
            </div>
            <span className="text-[10px] font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
