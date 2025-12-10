import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import { GetAllJeunes } from "@/core/application";
import { prisma, PrismaUserRepository } from "@/core/infrastructure";
import { JeunesList } from "@/ui/features/admin";
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
    <div className="min-h-screen bg-muted/20">
      <div className="container mx-auto py-8 px-4">
        {/* Header */}
        <div className="mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            <Users className="h-4 w-4" />
            Gestion des Jeunes Entrepreneurs
          </div>
          <h1 className="text-3xl md:text-4xl font-bold mb-2">
            Jeunes Entrepreneurs
          </h1>
          <p className="text-muted-foreground text-lg">
            Gérez les comptes des Jeunes Entrepreneurs, consultez leurs
            informations et métriques.
          </p>
        </div>

        {/* Liste des JE */}
        <JeunesList initialJeunes={jeunes} />
      </div>
    </div>
  );
}
