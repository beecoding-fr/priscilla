import { SubscriptionPlan, SubscriptionPlanCode } from "../../domain";

export interface SubscriptionPlanRepositoryPort {
  findById(id: string): Promise<SubscriptionPlan | null>;
  findByCode(code: SubscriptionPlanCode): Promise<SubscriptionPlan | null>;
  findAll(): Promise<SubscriptionPlan[]>;
}
