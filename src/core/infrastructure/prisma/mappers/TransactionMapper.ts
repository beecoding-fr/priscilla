import { Transaction as PrismaTransaction } from "@prisma/client";
import {
  Transaction,
  TransactionStatus,
  TransactionAmount,
  Points,
} from "@/core/domain";

export class TransactionMapper {
  static toDomain(prismaTransaction: PrismaTransaction): Transaction {
    return Transaction.create({
      id: prismaTransaction.id,
      jeUserId: prismaTransaction.jeUserId,
      solidarityCompanyId: prismaTransaction.solidarityCompanyId,
      amount: TransactionAmount.fromCents(prismaTransaction.amountCents),
      description: prismaTransaction.description,
      status: prismaTransaction.status as TransactionStatus,
      pointsEarned: Points.create(prismaTransaction.pointsEarned),
      validatedAt: prismaTransaction.validatedAt,
      createdAt: prismaTransaction.createdAt,
      updatedAt: prismaTransaction.updatedAt,
    });
  }
}
