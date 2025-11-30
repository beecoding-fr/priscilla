import { SubscriptionPlanCode } from "./SubscriptionPlan";

export type SubscriptionStatus =
  | "ACTIVE"
  | "CANCELED"
  | "PAST_DUE"
  | "TRIALING"
  | "UNPAID";

export interface SubscriptionProps {
  id: string;
  userId: string;
  planId: string;
  planCode: SubscriptionPlanCode;
  status: SubscriptionStatus;
  currentPeriodStart: Date | null;
  currentPeriodEnd: Date | null;
  cancelAtPeriodEnd: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Subscription {
  private constructor(private readonly props: SubscriptionProps) {}

  static create(props: SubscriptionProps): Subscription {
    return new Subscription(props);
  }

  get id(): string {
    return this.props.id;
  }

  get userId(): string {
    return this.props.userId;
  }

  get planId(): string {
    return this.props.planId;
  }

  get planCode(): SubscriptionPlanCode {
    return this.props.planCode;
  }

  get status(): SubscriptionStatus {
    return this.props.status;
  }

  get currentPeriodStart(): Date | null {
    return this.props.currentPeriodStart;
  }

  get currentPeriodEnd(): Date | null {
    return this.props.currentPeriodEnd;
  }

  get cancelAtPeriodEnd(): boolean {
    return this.props.cancelAtPeriodEnd;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  isActive(): boolean {
    return this.props.status === "ACTIVE" || this.props.status === "TRIALING";
  }

  isCanceled(): boolean {
    return this.props.status === "CANCELED";
  }

  isExpired(): boolean {
    if (!this.props.currentPeriodEnd) return false;
    return new Date() > this.props.currentPeriodEnd;
  }

  toJSON(): SubscriptionProps {
    return { ...this.props };
  }
}
