"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import { cn } from "@/lib/utils";
import {
  LayoutDashboard,
  Building2,
  Users,
  Settings,
  ClipboardList,
  Star,
  CreditCard,
  BarChart3,
  FileText,
  CheckCircle,
} from "lucide-react";

type MenuItem = {
  label: string;
  href: string;
  icon: React.ReactNode;
};

type MenuConfig = {
  ADMIN: MenuItem[];
  JE: MenuItem[];
  ES: MenuItem[];
};

const menuConfig: MenuConfig = {
  ADMIN: [
    {
      label: "Tableau de bord",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Entreprises Solidaires",
      href: "/dashboard/admin/companies",
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      label: "Jeunes Entrepreneurs",
      href: "/dashboard/admin/users",
      icon: <Users className="w-5 h-5" />,
    },
    {
      label: "Transactions",
      href: "/dashboard/admin/transactions",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      label: "Configuration",
      href: "/dashboard/admin/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ],
  JE: [
    {
      label: "Tableau de bord",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Mes Points",
      href: "/dashboard/points",
      icon: <Star className="w-5 h-5" />,
    },
    {
      label: "Mes Transactions",
      href: "/dashboard/transactions",
      icon: <ClipboardList className="w-5 h-5" />,
    },
    {
      label: "Mon Abonnement",
      href: "/dashboard/subscription",
      icon: <CreditCard className="w-5 h-5" />,
    },
    {
      label: "Entreprises Solidaires",
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
      label: "Tableau de bord",
      href: "/dashboard",
      icon: <LayoutDashboard className="w-5 h-5" />,
    },
    {
      label: "Mon Entreprise",
      href: "/dashboard/company",
      icon: <Building2 className="w-5 h-5" />,
    },
    {
      label: "Transactions à valider",
      href: "/dashboard/transactions/pending",
      icon: <CheckCircle className="w-5 h-5" />,
    },
    {
      label: "Historique",
      href: "/dashboard/transactions",
      icon: <FileText className="w-5 h-5" />,
    },
    {
      label: "Statistiques",
      href: "/dashboard/stats",
      icon: <BarChart3 className="w-5 h-5" />,
    },
    {
      label: "Paramètres",
      href: "/dashboard/settings",
      icon: <Settings className="w-5 h-5" />,
    },
  ],
};

export function DashboardSidebar() {
  const { data: session } = useSession();
  const pathname = usePathname();

  const role = (session?.user?.role as keyof MenuConfig) || "JE";
  const menuItems = menuConfig[role] || menuConfig.JE;

  const isActive = (href: string) => {
    if (href === "/dashboard") {
      return pathname === "/dashboard";
    }
    return pathname.startsWith(href);
  };

  return (
    <aside className="hidden lg:flex lg:flex-col lg:w-64 lg:min-h-[calc(100vh-4rem)] lg:border-r lg:border-border/50 lg:bg-card/50">
      <div className="sticky top-16">
        <nav className="flex flex-col gap-1 p-3">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200",
                isActive(item.href)
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              {item.icon}
              <span>{item.label}</span>
            </Link>
          ))}
        </nav>
      </div>
    </aside>
  );
}
