import { SubscriptionPlan as PrismaSubscriptionPlan } from "@prisma/client";
import { SubscriptionPlan, SubscriptionPlanCode } from "@priscilla/core/domain";

export class SubscriptionPlanMapper {
  static toDomain(prismaPlan: PrismaSubscriptionPlan): SubscriptionPlan {
    return SubscriptionPlan.create({
      id: prismaPlan.id,
      code: prismaPlan.code as SubscriptionPlanCode,
      name: prismaPlan.name,
      description: prismaPlan.description,
      priceMonthly: prismaPlan.priceMonthly,
      priceYearly: prismaPlan.priceYearly,
      features: prismaPlan.features,
    });
  }
}
