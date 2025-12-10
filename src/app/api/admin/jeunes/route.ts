import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { GetAllJeunes } from "@/core/application";
import { prisma, PrismaUserRepository } from "@/core/infrastructure";
import { UserStatus } from "@/core/domain";

export async function GET(request: Request) {
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

    // Parse query parameters for filtering
    const { searchParams } = new URL(request.url);
    const status = searchParams.get("status") as UserStatus | null;
    const businessSector = searchParams.get("businessSector");
    const department = searchParams.get("department");
    const region = searchParams.get("region");
    const searchQuery = searchParams.get("search");

    // Create dependencies
    const userRepository = new PrismaUserRepository(prisma);

    // Execute use case
    const getAllJeunes = new GetAllJeunes(userRepository);

    const result = await getAllJeunes.execute({
      filters: {
        status: status || undefined,
        businessSector: businessSector || undefined,
        department: department || undefined,
        region: region || undefined,
        searchQuery: searchQuery || undefined,
      },
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Get all JE error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
