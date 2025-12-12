import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { GetAllPointsTiers, CreatePointsTier } from "@/core/application";
import { prismaPointsTierRepository } from "@/core/infrastructure";
import { z } from "zod";

// Validation schema for creating a tier
const createTierSchema = z.object({
  minAmountCents: z
    .number()
    .int()
    .min(0, "Le montant minimum doit être positif"),
  maxAmountCents: z.number().int().positive().nullable(),
  pointsAwarded: z.number().int().min(0, "Les points doivent être positifs"),
  label: z.string().optional(),
});

export async function GET() {
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

    const getAllPointsTiers = new GetAllPointsTiers(prismaPointsTierRepository);
    const result = await getAllPointsTiers.execute();

    return NextResponse.json(result);
  } catch (error) {
    console.error("Get all points tiers error:", error);
    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
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

    const body = await request.json();
    const validationResult = createTierSchema.safeParse(body);

    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0].message },
        { status: 400 }
      );
    }

    const createPointsTier = new CreatePointsTier(prismaPointsTierRepository);
    const result = await createPointsTier.execute(validationResult.data);

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    console.error("Create points tier error:", error);

    if (error instanceof Error && error.name === "ValidationError") {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    return NextResponse.json(
      { error: "Erreur interne du serveur" },
      { status: 500 }
    );
  }
}
