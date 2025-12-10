import { redirect, notFound } from "next/navigation";
import { auth } from "@/lib/auth";
import { GetJeDetails } from "@/core/application";
import { prisma, PrismaUserRepository } from "@/core/infrastructure";
import { JeDetailsCard } from "@/ui/features/admin";
import { User } from "lucide-react";

interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function AdminUserDetailsPage({ params }: PageProps) {
  const session = await auth();

  if (!session?.user) {
    redirect("/login");
  }

  if (session.user.role !== "ADMIN") {
    redirect("/dashboard");
  }

  const { id } = await params;

  // Create dependencies and execute use case
  const userRepository = new PrismaUserRepository(prisma);
  const getJeDetails = new GetJeDetails(userRepository);

  try {
    const { je } = await getJeDetails.execute({ jeId: id });

    return (
      <div className="min-h-screen bg-muted/20">
        <div className="container mx-auto py-8 px-4">
          {/* Header */}
          <div className="mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
              <User className="h-4 w-4" />
              Détails du Jeune Entrepreneur
            </div>
          </div>

          {/* Détails du JE */}
          <JeDetailsCard je={je} />
        </div>
      </div>
    );
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Jeune Entrepreneur non trouvé"
    ) {
      notFound();
    }
    throw error;
  }
}
