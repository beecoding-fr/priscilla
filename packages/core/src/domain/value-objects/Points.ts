import { DomainError } from "../errors/DomainError";

export class Points {
  private readonly value: number;

  private constructor(points: number) {
    this.value = points;
  }

  static create(points: number): Points {
    if (points < 0) {
      throw new DomainError("Points cannot be negative");
    }
    if (!Number.isInteger(points)) {
      throw new DomainError("Points must be a whole number");
    }
    return new Points(points);
  }

  static zero(): Points {
    return new Points(0);
  }

  getValue(): number {
    return this.value;
  }

  add(other: Points): Points {
    return new Points(this.value + other.value);
  }

  subtract(other: Points): Points {
    const result = this.value - other.value;
    if (result < 0) {
      throw new DomainError("Cannot subtract more points than available");
    }
    return new Points(result);
  }

  equals(other: Points): boolean {
    return this.value === other.value;
  }

  isGreaterThan(other: Points): boolean {
    return this.value > other.value;
  }

  format(): string {
    return `${this.value} pts`;
  }
}
