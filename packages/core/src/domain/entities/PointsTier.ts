import { TransactionAmount } from "../value-objects/TransactionAmount";
import { Points } from "../value-objects/Points";
import { DomainError } from "../errors/DomainError";

export interface PointsTierProps {
  id: string;
  minAmountCents: number;
  maxAmountCents: number | null; // null = unlimited
  pointsAwarded: number;
  label: string | null;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class PointsTier {
  private constructor(private readonly props: PointsTierProps) {}

  static create(props: PointsTierProps): PointsTier {
    if (props.minAmountCents < 0) {
      throw new DomainError("Minimum amount cannot be negative");
    }
    if (
      props.maxAmountCents !== null &&
      props.maxAmountCents <= props.minAmountCents
    ) {
      throw new DomainError(
        "Maximum amount must be greater than minimum amount"
      );
    }
    if (props.pointsAwarded < 0) {
      throw new DomainError("Points awarded cannot be negative");
    }
    return new PointsTier(props);
  }

  get id(): string {
    return this.props.id;
  }

  get minAmountCents(): number {
    return this.props.minAmountCents;
  }

  get maxAmountCents(): number | null {
    return this.props.maxAmountCents;
  }

  get pointsAwarded(): number {
    return this.props.pointsAwarded;
  }

  get label(): string | null {
    return this.props.label;
  }

  get isActive(): boolean {
    return this.props.isActive;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  /**
   * Check if the given amount falls within this tier's range
   */
  matchesAmount(amount: TransactionAmount): boolean {
    const cents = amount.getCents();
    if (cents < this.props.minAmountCents) {
      return false;
    }
    if (
      this.props.maxAmountCents !== null &&
      cents >= this.props.maxAmountCents
    ) {
      return false;
    }
    return true;
  }

  /**
   * Get the points that would be awarded for a transaction in this tier
   */
  getPoints(): Points {
    return Points.create(this.props.pointsAwarded);
  }

  /**
   * Get formatted range display
   */
  formatRange(): string {
    const minEuros = this.props.minAmountCents / 100;
    if (this.props.maxAmountCents === null) {
      return `> ${minEuros.toLocaleString("fr-FR")} €`;
    }
    const maxEuros = this.props.maxAmountCents / 100;
    return `${minEuros.toLocaleString("fr-FR")} € - ${maxEuros.toLocaleString(
      "fr-FR"
    )} €`;
  }

  toJSON(): PointsTierProps {
    return { ...this.props };
  }
}
