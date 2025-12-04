import { PrismaClient } from "@prisma/client";
import { Subscription } from "@/core/domain";
import {
  SubscriptionRepositoryPort,
  CreateSubscriptionData,
  UpdateSubscriptionData,
} from "@/core/application/ports";
import { SubscriptionMapper } from "./mappers";

export class PrismaSubscriptionRepository
  implements SubscriptionRepositoryPort
{
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Subscription | null> {
    const subscription = await this.prisma.subscription.findUnique({
      where: { id },
      include: { plan: true },
    });
    return subscription ? SubscriptionMapper.toDomain(subscription) : null;
  }

  async findByUserId(userId: string): Promise<Subscription | null> {
    const subscription = await this.prisma.subscription.findUnique({
      where: { userId },
      include: { plan: true },
    });
    return subscription ? SubscriptionMapper.toDomain(subscription) : null;
  }

  async findByStripeSubscriptionId(
    stripeSubscriptionId: string
  ): Promise<Subscription | null> {
    const subscription = await this.prisma.subscription.findFirst({
      where: { stripeSubscriptionId },
      include: { plan: true },
    });
    return subscription ? SubscriptionMapper.toDomain(subscription) : null;
  }

  async create(data: CreateSubscriptionData): Promise<Subscription> {
    const subscription = await this.prisma.subscription.create({
      data: {
        userId: data.userId,
        planId: data.planId,
        stripeCustomerId: data.stripeCustomerId,
        stripeSubscriptionId: data.stripeSubscriptionId,
        status: data.status ?? "ACTIVE",
        currentPeriodStart: data.currentPeriodStart,
        currentPeriodEnd: data.currentPeriodEnd,
      },
      include: { plan: true },
    });
    return SubscriptionMapper.toDomain(subscription);
  }

  async update(
    id: string,
    data: UpdateSubscriptionData
  ): Promise<Subscription> {
    const subscription = await this.prisma.subscription.update({
      where: { id },
      data: {
        status: data.status,
        stripeSubscriptionId: data.stripeSubscriptionId,
        currentPeriodStart: data.currentPeriodStart,
        currentPeriodEnd: data.currentPeriodEnd,
        cancelAtPeriodEnd: data.cancelAtPeriodEnd,
      },
      include: { plan: true },
    });
    return SubscriptionMapper.toDomain(subscription);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.subscription.delete({
      where: { id },
    });
  }
}
