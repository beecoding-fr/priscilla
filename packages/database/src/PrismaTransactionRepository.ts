import { PrismaClient } from "@prisma/client";
import { Transaction } from "@priscilla/core/domain";
import {
  TransactionRepositoryPort,
  CreateTransactionData,
  UpdateTransactionData,
  TransactionFilters,
} from "@priscilla/core/application/ports";
import { TransactionMapper } from "./mappers";

export class PrismaTransactionRepository implements TransactionRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Transaction | null> {
    const transaction = await this.prisma.transaction.findUnique({
      where: { id },
    });
    return transaction ? TransactionMapper.toDomain(transaction) : null;
  }

  async findAll(filters?: TransactionFilters): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: {
        jeUserId: filters?.jeUserId,
        solidarityCompanyId: filters?.solidarityCompanyId,
        status: filters?.status,
      },
      orderBy: { createdAt: "desc" },
    });
    return transactions.map(TransactionMapper.toDomain);
  }

  async findByJeUserId(jeUserId: string): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { jeUserId },
      orderBy: { createdAt: "desc" },
    });
    return transactions.map(TransactionMapper.toDomain);
  }

  async findBySolidarityCompanyId(companyId: string): Promise<Transaction[]> {
    const transactions = await this.prisma.transaction.findMany({
      where: { solidarityCompanyId: companyId },
      orderBy: { createdAt: "desc" },
    });
    return transactions.map(TransactionMapper.toDomain);
  }

  async create(data: CreateTransactionData): Promise<Transaction> {
    const transaction = await this.prisma.transaction.create({
      data: {
        jeUserId: data.jeUserId,
        solidarityCompanyId: data.solidarityCompanyId,
        amountCents: data.amountCents,
        description: data.description,
      },
    });
    return TransactionMapper.toDomain(transaction);
  }

  async update(id: string, data: UpdateTransactionData): Promise<Transaction> {
    const transaction = await this.prisma.transaction.update({
      where: { id },
      data: {
        status: data.status,
        pointsEarned: data.pointsEarned,
        validatedAt: data.validatedAt,
      },
    });
    return TransactionMapper.toDomain(transaction);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.transaction.delete({
      where: { id },
    });
  }
}
