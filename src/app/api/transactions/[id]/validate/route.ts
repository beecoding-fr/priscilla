import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { ValidateTransaction } from "@/core/application";
import {
  prisma,
  PrismaUserRepository,
  PrismaTransactionRepository,
  PrismaPointsWalletRepository,
} from "@/core/infrastructure";
import {
  ValidationError,
  NotFoundError,
  UnauthorizedError,
} from "@/core/domain";

export async function POST(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();

    if (!session?.user) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    if (session.user.role !== "ES" && session.user.role !== "ADMIN") {
      return NextResponse.json(
        {
          error: "Only ES representatives or admins can validate transactions",
        },
        { status: 403 }
      );
    }

    const { id } = await params;
    const body = await request.json();
    const { approve } = body;

    if (typeof approve !== "boolean") {
      return NextResponse.json(
        { error: "approve field is required and must be boolean" },
        { status: 400 }
      );
    }

    // Create dependencies
    const userRepository = new PrismaUserRepository(prisma);
    const transactionRepository = new PrismaTransactionRepository(prisma);
    const pointsWalletRepository = new PrismaPointsWalletRepository(prisma);

    // Execute use case
    const validateTransaction = new ValidateTransaction(
      userRepository,
      transactionRepository,
      pointsWalletRepository
    );

    const result = await validateTransaction.execute({
      transactionId: id,
      esUserId: session.user.id,
      approve,
    });

    return NextResponse.json(result);
  } catch (error) {
    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    if (error instanceof NotFoundError) {
      return NextResponse.json({ error: error.message }, { status: 404 });
    }

    if (error instanceof UnauthorizedError) {
      return NextResponse.json({ error: error.message }, { status: 403 });
    }

    console.error("Validate transaction error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
