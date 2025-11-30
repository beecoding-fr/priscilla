import {
  NotFoundError,
  ValidationError,
  UnauthorizedError,
} from "@/core/domain/errors";
import {
  UserRepositoryPort,
  TransactionRepositoryPort,
  PointsWalletRepositoryPort,
} from "../ports";

export interface ValidateTransactionInput {
  transactionId: string;
  esUserId: string; // The ES user validating the transaction
  approve: boolean;
}

export interface ValidateTransactionOutput {
  transaction: {
    id: string;
    status: string;
    pointsEarned: number;
    validatedAt: Date | null;
  };
}

const POINTS_MULTIPLIER = 1; // 1 point per euro

export class ValidateTransaction {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly transactionRepository: TransactionRepositoryPort,
    private readonly pointsWalletRepository: PointsWalletRepositoryPort
  ) {}

  async execute(
    input: ValidateTransactionInput
  ): Promise<ValidateTransactionOutput> {
    // Validate ES user
    const esUser = await this.userRepository.findById(input.esUserId);
    if (!esUser) {
      throw new NotFoundError("User", input.esUserId);
    }
    if (!esUser.isES() && !esUser.isAdmin()) {
      throw new UnauthorizedError(
        "Only ES representatives or admins can validate transactions"
      );
    }

    // Get transaction
    const transaction = await this.transactionRepository.findById(
      input.transactionId
    );
    if (!transaction) {
      throw new NotFoundError("Transaction", input.transactionId);
    }

    // Check transaction is pending
    if (!transaction.isPending()) {
      throw new ValidationError("Transaction has already been processed");
    }

    if (input.approve) {
      // Calculate points earned
      const pointsEarned =
        transaction.amount.calculatePoints(POINTS_MULTIPLIER);

      // Update transaction to validated
      const updatedTransaction = await this.transactionRepository.update(
        input.transactionId,
        {
          status: "VALIDATED",
          pointsEarned,
          validatedAt: new Date(),
        }
      );

      // Add points to JE's wallet
      await this.pointsWalletRepository.addPoints(
        transaction.jeUserId,
        pointsEarned
      );

      return {
        transaction: {
          id: updatedTransaction.id,
          status: updatedTransaction.status,
          pointsEarned: updatedTransaction.pointsEarned.getValue(),
          validatedAt: updatedTransaction.validatedAt,
        },
      };
    } else {
      // Reject transaction
      const updatedTransaction = await this.transactionRepository.update(
        input.transactionId,
        {
          status: "REJECTED",
          validatedAt: new Date(),
        }
      );

      return {
        transaction: {
          id: updatedTransaction.id,
          status: updatedTransaction.status,
          pointsEarned: 0,
          validatedAt: updatedTransaction.validatedAt,
        },
      };
    }
  }
}
