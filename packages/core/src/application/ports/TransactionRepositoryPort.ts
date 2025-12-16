import { Transaction, TransactionStatus } from "../../domain";

export interface CreateTransactionData {
  jeUserId: string;
  solidarityCompanyId: string;
  amountCents: number;
  description?: string;
}

export interface UpdateTransactionData {
  status?: TransactionStatus;
  pointsEarned?: number;
  validatedAt?: Date;
}

export interface TransactionFilters {
  jeUserId?: string;
  solidarityCompanyId?: string;
  status?: TransactionStatus;
}

export interface TransactionRepositoryPort {
  findById(id: string): Promise<Transaction | null>;
  findAll(filters?: TransactionFilters): Promise<Transaction[]>;
  findByJeUserId(jeUserId: string): Promise<Transaction[]>;
  findBySolidarityCompanyId(companyId: string): Promise<Transaction[]>;
  create(data: CreateTransactionData): Promise<Transaction>;
  update(id: string, data: UpdateTransactionData): Promise<Transaction>;
  delete(id: string): Promise<void>;
}
