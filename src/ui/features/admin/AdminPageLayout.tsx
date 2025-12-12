import { ReactNode } from "react";

interface AdminPageLayoutProps {
  badge: {
    icon: ReactNode;
    label: string;
  };
  title: string;
  description: string;
  children: ReactNode;
}

export function AdminPageLayout({
  badge,
  title,
  description,
  children,
}: AdminPageLayoutProps) {
  return (
    <div className="bg-muted/20">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            {badge.icon}
            {badge.label}
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">{title}</h1>
          <p className="text-muted-foreground text-lg">{description}</p>
        </div>

        {/* Content */}
        {children}
      </div>
    </div>
  );
}
