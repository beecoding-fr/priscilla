import {
  Subscription as PrismaSubscription,
  SubscriptionPlan as PrismaSubscriptionPlan,
} from "@prisma/client";
import {
  Subscription,
  SubscriptionStatus,
  SubscriptionPlanCode,
} from "@priscilla/core/domain";

type PrismaSubscriptionWithPlan = PrismaSubscription & {
  plan: PrismaSubscriptionPlan;
};

export class SubscriptionMapper {
  static toDomain(
    prismaSubscription: PrismaSubscriptionWithPlan
  ): Subscription {
    return Subscription.create({
      id: prismaSubscription.id,
      userId: prismaSubscription.userId,
      planId: prismaSubscription.planId,
      planCode: prismaSubscription.plan.code as SubscriptionPlanCode,
      status: prismaSubscription.status as SubscriptionStatus,
      currentPeriodStart: prismaSubscription.currentPeriodStart,
      currentPeriodEnd: prismaSubscription.currentPeriodEnd,
      cancelAtPeriodEnd: prismaSubscription.cancelAtPeriodEnd,
      createdAt: prismaSubscription.createdAt,
      updatedAt: prismaSubscription.updatedAt,
    });
  }
}
