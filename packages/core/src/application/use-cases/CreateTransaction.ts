import { NotFoundError, ValidationError } from "../../domain/errors";
import {
  UserRepositoryPort,
  SolidarityCompanyRepositoryPort,
  TransactionRepositoryPort,
} from "../ports";

export interface CreateTransactionInput {
  jeUserId: string;
  solidarityCompanyId: string;
  amountCents: number;
  description?: string;
}

export interface CreateTransactionOutput {
  transaction: {
    id: string;
    amountCents: number;
    description: string | null;
    status: string;
    createdAt: Date;
  };
}

export class CreateTransaction {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly companyRepository: SolidarityCompanyRepositoryPort,
    private readonly transactionRepository: TransactionRepositoryPort
  ) {}

  async execute(
    input: CreateTransactionInput
  ): Promise<CreateTransactionOutput> {
    // Validate JE user
    const jeUser = await this.userRepository.findById(input.jeUserId);
    if (!jeUser) {
      throw new NotFoundError("User", input.jeUserId);
    }
    if (!jeUser.isJE()) {
      throw new ValidationError(
        "Only Young Entrepreneurs can create transactions"
      );
    }

    // Validate solidarity company
    const company = await this.companyRepository.findById(
      input.solidarityCompanyId
    );
    if (!company) {
      throw new NotFoundError("SolidarityCompany", input.solidarityCompanyId);
    }
    if (!company.isVerified) {
      throw new ValidationError("Can only transact with verified companies");
    }

    // Validate amount
    if (input.amountCents <= 0) {
      throw new ValidationError("Transaction amount must be positive");
    }

    // Create transaction
    const transaction = await this.transactionRepository.create({
      jeUserId: input.jeUserId,
      solidarityCompanyId: input.solidarityCompanyId,
      amountCents: input.amountCents,
      description: input.description,
    });

    return {
      transaction: {
        id: transaction.id,
        amountCents: transaction.amount.getCents(),
        description: transaction.description,
        status: transaction.status,
        createdAt: transaction.createdAt,
      },
    };
  }
}
