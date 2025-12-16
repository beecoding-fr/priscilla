import { TransactionAmount } from "../value-objects/TransactionAmount";
import { Points } from "../value-objects/Points";

export type TransactionStatus = "PENDING" | "VALIDATED" | "REJECTED";

export interface TransactionProps {
  id: string;
  jeUserId: string;
  solidarityCompanyId: string;
  amount: TransactionAmount;
  description: string | null;
  status: TransactionStatus;
  pointsEarned: Points;
  validatedAt: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class Transaction {
  private constructor(private readonly props: TransactionProps) {}

  static create(props: TransactionProps): Transaction {
    return new Transaction(props);
  }

  get id(): string {
    return this.props.id;
  }

  get jeUserId(): string {
    return this.props.jeUserId;
  }

  get solidarityCompanyId(): string {
    return this.props.solidarityCompanyId;
  }

  get amount(): TransactionAmount {
    return this.props.amount;
  }

  get description(): string | null {
    return this.props.description;
  }

  get status(): TransactionStatus {
    return this.props.status;
  }

  get pointsEarned(): Points {
    return this.props.pointsEarned;
  }

  get validatedAt(): Date | null {
    return this.props.validatedAt;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  isPending(): boolean {
    return this.props.status === "PENDING";
  }

  isValidated(): boolean {
    return this.props.status === "VALIDATED";
  }

  isRejected(): boolean {
    return this.props.status === "REJECTED";
  }

  toJSON(): TransactionProps {
    return { ...this.props };
  }
}
