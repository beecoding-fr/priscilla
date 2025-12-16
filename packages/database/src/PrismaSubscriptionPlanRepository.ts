import { PrismaClient, $Enums } from "@prisma/client";
import { SubscriptionPlan, SubscriptionPlanCode } from "@priscilla/core/domain";
import { SubscriptionPlanRepositoryPort } from "@priscilla/core/application/ports";
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
      where: { code: code as $Enums.SubscriptionPlanCode },
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
