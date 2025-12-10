import { DashboardSidebar } from "@/ui/components/DashboardSidebar";
import { MobileBottomNav } from "@/ui/components/MobileBottomNav";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-[calc(100vh-4rem)]">
      {/* Desktop sidebar */}
      <DashboardSidebar />

      {/* Main content */}
      <div className="flex-1 pb-20 lg:pb-0">{children}</div>

      {/* Mobile bottom navigation */}
      <MobileBottomNav />
    </div>
  );
}
