import {
  PrismaClient,
  SubscriptionPlanCode as PrismaSubscriptionPlanCode,
} from "@prisma/client";
import { SubscriptionPlan, SubscriptionPlanCode } from "@/core/domain";
import { SubscriptionPlanRepositoryPort } from "@/core/application/ports";
import { SubscriptionPlanMapper } from "./mappers";

export class PrismaSubscriptionPlanRepository
  implements SubscriptionPlanRepositoryPort
{
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<SubscriptionPlan | null> {
    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { id },
    });
    return plan ? SubscriptionPlanMapper.toDomain(plan) : null;
  }

  async findByCode(
    code: SubscriptionPlanCode
  ): Promise<SubscriptionPlan | null> {
    const plan = await this.prisma.subscriptionPlan.findUnique({
      where: { code: code as PrismaSubscriptionPlanCode },
    });
    return plan ? SubscriptionPlanMapper.toDomain(plan) : null;
  }

  async findAll(): Promise<SubscriptionPlan[]> {
    const plans = await this.prisma.subscriptionPlan.findMany({
      orderBy: { priceMonthly: "asc" },
    });
    return plans.map(SubscriptionPlanMapper.toDomain);
  }
}
