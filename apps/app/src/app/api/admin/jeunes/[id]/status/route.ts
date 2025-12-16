import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@priscilla/auth";
import { SuspendJeAccount, ReactivateJeAccount } from "@priscilla/core/application";
import { prisma, PrismaUserRepository } from "@priscilla/database";

const updateStatusSchema = z.object({
  action: z.enum(["suspend", "reactivate"]),
});

interface Params {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: Params) {
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
    const body = await request.json();
    const { action } = updateStatusSchema.parse(body);

    // Create dependencies
    const userRepository = new PrismaUserRepository(prisma);

    if (action === "suspend") {
      const suspendJeAccount = new SuspendJeAccount(userRepository);
      const result = await suspendJeAccount.execute({
        jeId: id,
        adminId: session.user.id,
      });
      return NextResponse.json(result);
    } else {
      const reactivateJeAccount = new ReactivateJeAccount(userRepository);
      const result = await reactivateJeAccount.execute({
        jeId: id,
        adminId: session.user.id,
      });
      return NextResponse.json(result);
    }
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Erreur de validation", details: error.issues },
        { status: 400 }
      );
    }

    if (error instanceof Error) {
      // Handle domain errors
      if (
        error.message.includes("non trouvé") ||
        error.message.includes("n'est pas un Jeune")
      ) {
        return NextResponse.json({ error: error.message }, { status: 404 });
      }
      if (
        error.message.includes("déjà suspendu") ||
        error.message.includes("déjà actif")
      ) {
        return NextResponse.json({ error: error.message }, { status: 409 });
      }
      if (error.message.includes("non autorisée")) {
        return NextResponse.json({ error: error.message }, { status: 403 });
      }
    }

    console.error("Update JE status error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
