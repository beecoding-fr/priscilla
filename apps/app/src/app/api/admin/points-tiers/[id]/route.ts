import { NextResponse } from "next/server";
import { auth } from "@priscilla/auth";
import { UpdatePointsTier, DeletePointsTier } from "@priscilla/core/application";
import { prismaPointsTierRepository } from "@priscilla/database";
import { z } from "zod";

// Validation schema for updating a tier
const updateTierSchema = z.object({
  minAmountCents: z.number().int().min(0).optional(),
  maxAmountCents: z.number().int().positive().nullable().optional(),
  pointsAwarded: z.number().int().min(0).optional(),
  label: z.string().nullable().optional(),
  isActive: z.boolean().optional(),
});

interface RouteParams {
  params: Promise<{ id: string }>;
}

export async function PATCH(request: Request, { params }: RouteParams) {
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
    const validationResult = updateTierSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const updatePointsTier = new UpdatePointsTier(prismaPointsTierRepository);
    const result = await updatePointsTier.execute({
      id,
      ...validationResult.data,
    });

    return NextResponse.json(result);
  } catch (error) {
    console.error("Update points tier error:", error);

    if (error instanceof Error && error.name === "NotFoundError") {
      return NextResponse.json(
        { error: "Tranche non trouvée" },
        { status: 404 }
      );
    }

    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request, { params }: RouteParams) {
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

    const deletePointsTier = new DeletePointsTier(prismaPointsTierRepository);
    await deletePointsTier.execute({ id });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Delete points tier error:", error);

    if (error instanceof Error && error.name === "NotFoundError") {
      return NextResponse.json(
        { error: "Tranche non trouvée" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
