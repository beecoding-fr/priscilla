import { NextResponse } from "next/server";
import { z } from "zod";
import { auth } from "@/lib/auth";
import { createTransactionSchema } from "@/lib/validations";
import { CreateTransaction } from "@/core/application";
import {
  prisma,
  PrismaUserRepository,
  PrismaSolidarityCompanyRepository,
  PrismaTransactionRepository,
} from "@/core/infrastructure";
import {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
} from "@/core/domain";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "JE") {
      return NextResponse.json(
        { error: "Only Young Entrepreneurs can create transactions" },
        { status: 403 }
      );
    }

    const body = await request.json();
    const validatedData = createTransactionSchema.parse(body);

    // Create dependencies
    const userRepository = new PrismaUserRepository(prisma);
    const companyRepository = new PrismaSolidarityCompanyRepository(prisma);
    const transactionRepository = new PrismaTransactionRepository(prisma);

    // Execute use case
    const createTransaction = new CreateTransaction(
      userRepository,
      companyRepository,
      transactionRepository
    );

    const result = await createTransaction.execute({
      jeUserId: session.user.id,
      solidarityCompanyId: validatedData.solidarityCompanyId,
      amountCents: validatedData.amountCents,
      description: validatedData.description,
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

    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    console.error("Create transaction error:", error);
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

    const transactionRepository = new PrismaTransactionRepository(prisma);

    let transactions: Awaited<ReturnType<typeof transactionRepository.findAll>>;
    if (session.user.role === "ADMIN") {
      // Admin can see all transactions
      transactions = await transactionRepository.findAll();
    } else if (session.user.role === "JE") {
      // JE sees their own transactions
      transactions = await transactionRepository.findByJeUserId(
        session.user.id
      );
    } else {
      // ES sees transactions for their company
      const companyRepository = new PrismaSolidarityCompanyRepository(prisma);
      const company = await companyRepository.findByUserId(session.user.id);
      if (company) {
        transactions = await transactionRepository.findBySolidarityCompanyId(
          company.id
        );
      } else {
        transactions = [];
      }
    }

    return NextResponse.json({
      transactions: transactions.map((t) => ({
        id: t.id,
        amountCents: t.amount.getCents(),
        description: t.description,
        status: t.status,
        pointsEarned: t.pointsEarned.getValue(),
        createdAt: t.createdAt,
        validatedAt: t.validatedAt,
      })),
    });
  } catch (error) {
    console.error("Get transactions error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
