import { prisma } from "./client";
import {
  AdminDashboardRepositoryPort,
  AdminDashboardStatsDTO,
  SubscriptionDistributionDTO,
  TopJEByPointsDTO,
  TopJEByTransactionsDTO,
  TopESBySolicitationsDTO,
} from "@/core/application/ports/AdminDashboardRepositoryPort";

/**
 * Prisma implementation of AdminDashboardRepositoryPort.
 *
 * This class handles all database queries for admin dashboard statistics.
 * It follows the Repository pattern from DDD, isolating data access logic
 * from the domain and application layers.
 */
export class PrismaAdminDashboardRepository
  implements AdminDashboardRepositoryPort
{
  /**
   * Get all admin dashboard statistics in a single optimized call.
   * Uses Promise.all for parallel execution of independent queries.
   */
  async getStats(): Promise<AdminDashboardStatsDTO> {
    const [
      totalJE,
      totalES,
      validatedTransactions,
      totalPointsDistributed,
      subscriptionDistribution,
      topJEByPoints,
      topJEByTransactions,
      topESBySolicitations,
    ] = await Promise.all([
      this.countJE(),
      this.countES(),
      this.countValidatedTransactions(),
      this.getTotalPointsDistributed(),
      this.getSubscriptionDistribution(),
      this.getTopJEByPoints(),
      this.getTopJEByTransactions(),
      this.getTopESBySolicitations(),
    ]);

    return {
      totalJE,
      totalES,
      validatedTransactions,
      totalPointsDistributed,
      subscriptionDistribution,
      topJEByPoints,
      topJEByTransactions,
      topESBySolicitations,
    };
  }

  /**
   * Count total JE users
   */
  async countJE(): Promise<number> {
    return prisma.user.count({
      where: { role: "JE" },
    });
  }

  /**
   * Count total ES (Solidarity Companies)
   */
  async countES(): Promise<number> {
    return prisma.solidarityCompany.count();
  }

  /**
   * Count validated transactions
   */
  async countValidatedTransactions(): Promise<number> {
    return prisma.transaction.count({
      where: { status: "VALIDATED" },
    });
  }

  /**
   * Get total points distributed across all wallets
   */
  async getTotalPointsDistributed(): Promise<number> {
    const result = await prisma.pointsWallet.aggregate({
      _sum: { totalPoints: true },
    });
    return result._sum.totalPoints ?? 0;
  }

  /**
   * Get subscription distribution by plan with plan details
   */
  async getSubscriptionDistribution(): Promise<SubscriptionDistributionDTO[]> {
    // First, get the grouped subscriptions
    const subscriptionsByPlan = await prisma.subscription.groupBy({
      by: ["planId"],
      _count: { id: true },
      where: { status: "ACTIVE" },
    });

    // If no subscriptions, return empty array
    if (subscriptionsByPlan.length === 0) {
      return [];
    }

    // Get all plans to map names
    const plans = await prisma.subscriptionPlan.findMany();
    const planMap = new Map(plans.map((p) => [p.id, p]));

    // Map to DTO with plan details
    return subscriptionsByPlan.map((sub) => {
      const plan = planMap.get(sub.planId);
      return {
        planId: sub.planId,
        planName: plan?.name ?? "Inconnu",
        planCode: plan?.code ?? "UNKNOWN",
        count: sub._count.id,
      };
    });
  }

  /**
   * Get top JE by points
   */
  async getTopJEByPoints(limit: number = 5): Promise<TopJEByPointsDTO[]> {
    const wallets = await prisma.pointsWallet.findMany({
      take: limit,
      orderBy: { totalPoints: "desc" },
      where: { totalPoints: { gt: 0 } },
      include: {
        user: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            email: true,
          },
        },
      },
    });

    return wallets.map((wallet) => ({
      id: wallet.user.id,
      firstName: wallet.user.firstName,
      lastName: wallet.user.lastName,
      email: wallet.user.email,
      totalPoints: wallet.totalPoints,
    }));
  }

  /**
   * Get top JE by transaction count
   */
  async getTopJEByTransactions(
    limit: number = 5
  ): Promise<TopJEByTransactionsDTO[]> {
    const users = await prisma.user.findMany({
      where: { role: "JE" },
      take: limit,
      select: {
        id: true,
        firstName: true,
        lastName: true,
        email: true,
        _count: {
          select: {
            transactions: {
              where: { status: "VALIDATED" },
            },
          },
        },
      },
      orderBy: {
        transactions: { _count: "desc" },
      },
    });

    return users.map((user) => ({
      id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      transactionCount: user._count.transactions,
    }));
  }

  /**
   * Get top ES by solicitations (transaction count)
   */
  async getTopESBySolicitations(
    limit: number = 5
  ): Promise<TopESBySolicitationsDTO[]> {
    const companies = await prisma.solidarityCompany.findMany({
      take: limit,
      select: {
        id: true,
        companyName: true,
        sector: true,
        _count: {
          select: { transactions: true },
        },
      },
      orderBy: {
        transactions: { _count: "desc" },
      },
    });

    return companies.map((company) => ({
      id: company.id,
      companyName: company.companyName,
      sector: company.sector,
      transactionCount: company._count.transactions,
    }));
  }
}

/**
 * Singleton instance for use in the application
 */
export const prismaAdminDashboardRepository =
  new PrismaAdminDashboardRepository();
