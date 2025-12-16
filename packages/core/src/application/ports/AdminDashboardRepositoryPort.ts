/**
 * Subscription plan codes (mirror of Prisma enum)
 */
export type SubscriptionPlanCode = "STARTER" | "GROWTH" | "PREMIUM";

/**
 * DTO for subscription distribution by plan
 */
export interface SubscriptionDistributionDTO {
  planId: string;
  planName: string;
  planCode: SubscriptionPlanCode | string;
  count: number;
}

/**
 * DTO for top JE by points
 */
export interface TopJEByPointsDTO {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  totalPoints: number;
}

/**
 * DTO for top JE by transactions
 */
export interface TopJEByTransactionsDTO {
  id: string;
  firstName: string | null;
  lastName: string | null;
  email: string;
  transactionCount: number;
}

/**
 * DTO for top ES by solicitations
 */
export interface TopESBySolicitationsDTO {
  id: string;
  companyName: string;
  sector: string | null;
  transactionCount: number;
}

/**
 * Complete admin dashboard statistics
 */
export interface AdminDashboardStatsDTO {
  totalJE: number;
  totalES: number;
  validatedTransactions: number;
  totalPointsDistributed: number;
  subscriptionDistribution: SubscriptionDistributionDTO[];
  topJEByPoints: TopJEByPointsDTO[];
  topJEByTransactions: TopJEByTransactionsDTO[];
  topESBySolicitations: TopESBySolicitationsDTO[];
}

/**
 * Port for accessing admin dashboard statistics.
 * This abstracts the data access layer from the application layer.
 */
export interface AdminDashboardRepositoryPort {
  /**
   * Get all admin dashboard statistics in a single call
   */
  getStats(): Promise<AdminDashboardStatsDTO>;

  /**
   * Get total count of JE (Jeunes Entrepreneurs)
   */
  countJE(): Promise<number>;

  /**
   * Get total count of ES (Entreprises Solidaires)
   */
  countES(): Promise<number>;

  /**
   * Get total count of validated transactions
   */
  countValidatedTransactions(): Promise<number>;

  /**
   * Get total points distributed across all wallets
   */
  getTotalPointsDistributed(): Promise<number>;

  /**
   * Get distribution of JE subscriptions by plan
   */
  getSubscriptionDistribution(): Promise<SubscriptionDistributionDTO[]>;

  /**
   * Get top JE by points
   * @param limit Number of results to return (default: 5)
   */
  getTopJEByPoints(limit?: number): Promise<TopJEByPointsDTO[]>;

  /**
   * Get top JE by transaction count
   * @param limit Number of results to return (default: 5)
   */
  getTopJEByTransactions(limit?: number): Promise<TopJEByTransactionsDTO[]>;

  /**
   * Get top ES by solicitations (number of transactions)
   * @param limit Number of results to return (default: 5)
   */
  getTopESBySolicitations(limit?: number): Promise<TopESBySolicitationsDTO[]>;
}
