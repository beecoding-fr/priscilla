import { Subscription, SubscriptionStatus } from "@/core/domain";

export interface CreateSubscriptionData {
  userId: string;
  planId: string;
  stripeCustomerId?: string;
  stripeSubscriptionId?: string;
  status?: SubscriptionStatus;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
}

export interface UpdateSubscriptionData {
  status?: SubscriptionStatus;
  stripeSubscriptionId?: string;
  currentPeriodStart?: Date;
  currentPeriodEnd?: Date;
  cancelAtPeriodEnd?: boolean;
}

export interface SubscriptionRepositoryPort {
  findById(id: string): Promise<Subscription | null>;
  findByUserId(userId: string): Promise<Subscription | null>;
  findByStripeSubscriptionId(
    stripeSubscriptionId: string
  ): Promise<Subscription | null>;
  create(data: CreateSubscriptionData): Promise<Subscription>;
  update(id: string, data: UpdateSubscriptionData): Promise<Subscription>;
  delete(id: string): Promise<void>;
}
