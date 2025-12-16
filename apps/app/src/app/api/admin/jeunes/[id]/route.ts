import { NextResponse } from "next/server";
import { auth } from "@priscilla/auth";
import { GetJeDetails } from "@priscilla/core/application";
import { prisma, PrismaUserRepository } from "@priscilla/database";

interface Params {
  params: Promise<{ id: string }>;
}

export async function GET(request: Request, { params }: Params) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    if (session.user.role !== "ADMIN") {
      return NextResponse.json(
        { error: "Accès réservé aux administrateurs" },
        { status: 403 }
      );
    }

    const { id } = await params;

    // Create dependencies
    const userRepository = new PrismaUserRepository(prisma);

    // Execute use case
    const getJeDetails = new GetJeDetails(userRepository);

    const result = await getJeDetails.execute({ jeId: id });

    return NextResponse.json(result);
  } catch (error) {
    if (
      error instanceof Error &&
      error.message === "Jeune Entrepreneur non trouvé"
    ) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    console.error("Get JE details error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
