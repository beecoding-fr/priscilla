import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { createCompanyProfileSchema } from "@/lib/validations";
import { CreateSolidarityCompanyProfile } from "@/core/application";
import {
  prisma,
  PrismaUserRepository,
  PrismaSolidarityCompanyRepository,
} from "@/core/infrastructure";
import { ValidationError, NotFoundError } from "@/core/domain";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ES") {
      return NextResponse.json(
        { error: "Only ES users can create company profiles" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = createCompanyProfileSchema.parse(body);

    // Create dependencies
    const userRepository = new PrismaUserRepository(prisma);
    const companyRepository = new PrismaSolidarityCompanyRepository(prisma);

    // Execute use case
    const createProfile = new CreateSolidarityCompanyProfile(
      userRepository,
      companyRepository
    );

    const result = await createProfile.execute({
      userId: session.user.id,
      companyName: validatedData.companyName,
      description: validatedData.description,
      sector: validatedData.sector,
      address: validatedData.address,
      phone: validatedData.phone,
      website: validatedData.website || undefined,
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    console.error("Create company profile error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const companyRepository = new PrismaSolidarityCompanyRepository(prisma);

    // JEs can only see verified companies
    // Admins and ES can see all
    const companies =
      session.user.role === "JE"
        ? await companyRepository.findVerified()
        : await companyRepository.findAll();

    return NextResponse.json({
      companies: companies.map((c) => ({
        id: c.id,
        companyName: c.companyName,
        description: c.description,
        sector: c.sector,
        isVerified: c.isVerified,
      })),
    });
  } catch (error) {
    console.error("Get companies error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
