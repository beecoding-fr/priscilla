import { DashboardSidebar } from "@/ui/components/DashboardSidebar";
import { MobileBottomNav } from "@/ui/components/MobileBottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Desktop sidebar (fixed) */}
      <DashboardSidebar />

      {/* Main content - offset by sidebar width on desktop */}
      <div className="lg:ml-64 pb-20 lg:pb-0">{children}</div>

      {/* Mobile bottom navigation */}
      <MobileBottomNav />
    </div>
  );
}
