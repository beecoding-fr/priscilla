import { auth } from "@priscilla/auth";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { MobileBottomNav } from "@/components/MobileBottomNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();
  const userRole = session?.user?.role as string | undefined;

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Desktop sidebar (fixed) */}
      <DashboardSidebar userRole={userRole} />

      {/* Main content - offset by sidebar width on desktop */}
      <div className="lg:ml-64 pb-20 lg:pb-0">{children}</div>

      {/* Mobile bottom navigation */}
      <MobileBottomNav userRole={userRole} />
    </div>
  );
}
