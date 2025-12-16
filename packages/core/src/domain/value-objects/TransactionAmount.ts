import { DomainError } from "../errors/DomainError";

export class TransactionAmount {
  private readonly cents: number;

  private constructor(cents: number) {
    this.cents = cents;
  }

  static fromCents(cents: number): TransactionAmount {
    if (cents < 0) {
      throw new DomainError("Transaction amount cannot be negative");
    }
    if (!Number.isInteger(cents)) {
      throw new DomainError("Transaction amount must be in whole cents");
    }
    return new TransactionAmount(cents);
  }

  static fromEuros(euros: number): TransactionAmount {
    const cents = Math.round(euros * 100);
    return TransactionAmount.fromCents(cents);
  }

  getCents(): number {
    return this.cents;
  }

  getEuros(): number {
    return this.cents / 100;
  }

  format(): string {
    return `${this.getEuros().toFixed(2)} €`;
  }

  add(other: TransactionAmount): TransactionAmount {
    return new TransactionAmount(this.cents + other.cents);
  }

  equals(other: TransactionAmount): boolean {
    return this.cents === other.cents;
  }

  /**
   * Calculate points based on transaction amount
   * Default: 1 point per euro spent
   */
  calculatePoints(multiplier: number = 1): number {
    return Math.floor(this.getEuros() * multiplier);
  }
}
