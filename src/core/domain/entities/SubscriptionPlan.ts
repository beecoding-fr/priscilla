export type SubscriptionPlanCode = "ESSENTIEL" | "STANDARD" | "PREMIUM";

export interface SubscriptionPlanProps {
  id: string;
  code: SubscriptionPlanCode;
  name: string;
  description: string | null;
  priceMonthly: number; // in cents
  priceYearly: number; // in cents
  features: string[];
}

export class SubscriptionPlan {
  private constructor(private readonly props: SubscriptionPlanProps) {}

  static create(props: SubscriptionPlanProps): SubscriptionPlan {
    return new SubscriptionPlan(props);
  }

  get id(): string {
    return this.props.id;
  }

  get code(): SubscriptionPlanCode {
    return this.props.code;
  }

  get name(): string {
    return this.props.name;
  }

  get description(): string | null {
    return this.props.description;
  }

  get priceMonthly(): number {
    return this.props.priceMonthly;
  }

  get priceYearly(): number {
    return this.props.priceYearly;
  }

  get features(): string[] {
    return [...this.props.features];
  }

  getMonthlyPriceFormatted(): string {
    return `${(this.props.priceMonthly / 100).toFixed(2)} €`;
  }

  getYearlyPriceFormatted(): string {
    return `${(this.props.priceYearly / 100).toFixed(2)} €`;
  }

  toJSON(): SubscriptionPlanProps {
    return { ...this.props };
  }
}
