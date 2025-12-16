import { redirect } from "next/navigation";
import { auth } from "@priscilla/auth";
import { GetAllJeunes } from "@priscilla/core/application";
import { prisma, PrismaUserRepository } from "@priscilla/database";
import { JeunesList, AdminPageLayout } from "@/components/features/admin";
import { Users } from "lucide-react";

export default async function AdminUsersPage() {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  // Create dependencies and execute use case
  const userRepository = new PrismaUserRepository(prisma);
  const getAllJeunes = new GetAllJeunes(userRepository);
  const { jeunes } = await getAllJeunes.execute({});

  return (
    <AdminPageLayout
      badge={{
        icon: <Users className="h-4 w-4" />,
        label: "Gestion des Jeunes Entrepreneurs",
      }}
      title="Jeunes Entrepreneurs"
      description="Gérez les comptes des Jeunes Entrepreneurs, consultez leurs informations et métriques."
    >
      <JeunesList initialJeunes={jeunes} />
    </AdminPageLayout>
  );
}
