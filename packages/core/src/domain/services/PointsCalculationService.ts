import { PointsTier } from "../entities/PointsTier";
import { TransactionAmount } from "../value-objects/TransactionAmount";
import { Points } from "../value-objects/Points";

/**
 * Domain service for calculating points based on transaction amount and configured tiers
 */
export class PointsCalculationService {
  /**
   * Calculate points for a given transaction amount using the provided tiers
   * Returns 0 points if no matching tier is found
   */
  static calculatePoints(
    amount: TransactionAmount,
    tiers: PointsTier[]
  ): Points {
    // Filter only active tiers
    const activeTiers = tiers.filter((tier) => tier.isActive);

    if (activeTiers.length === 0) {
      // Fallback: no tiers configured, return 0 points
      return Points.zero();
    }

    // Sort tiers by minAmountCents ascending to find the correct tier
    const sortedTiers = [...activeTiers].sort(
      (a, b) => a.minAmountCents - b.minAmountCents
    );

    // Find the matching tier (the one where amount falls within the range)
    for (const tier of sortedTiers.reverse()) {
      if (tier.matchesAmount(amount)) {
        return tier.getPoints();
      }
    }

    // No matching tier found
    return Points.zero();
  }

  /**
   * Get the tier that matches the given amount
   */
  static findMatchingTier(
    amount: TransactionAmount,
    tiers: PointsTier[]
  ): PointsTier | null {
    const activeTiers = tiers.filter((tier) => tier.isActive);
    const sortedTiers = [...activeTiers].sort(
      (a, b) => b.minAmountCents - a.minAmountCents
    );

    for (const tier of sortedTiers) {
      if (tier.matchesAmount(amount)) {
        return tier;
      }
    }

    return null;
  }

  /**
   * Validate that tiers don't have overlapping ranges
   */
  static validateTiersNoOverlap(tiers: PointsTier[]): boolean {
    const activeTiers = tiers.filter((tier) => tier.isActive);
    const sortedTiers = [...activeTiers].sort(
      (a, b) => a.minAmountCents - b.minAmountCents
    );

    for (let i = 0; i < sortedTiers.length - 1; i++) {
      const current = sortedTiers[i];
      const next = sortedTiers[i + 1];

      // If current tier has no max (unlimited), it should be the last tier
      if (current.maxAmountCents === null) {
        return false;
      }

      // Check for overlap: current's max should be <= next's min
      if (current.maxAmountCents > next.minAmountCents) {
        return false;
      }
    }

    return true;
  }

  /**
   * Check for gaps in tier coverage
   */
  static findGapsInCoverage(
    tiers: PointsTier[]
  ): Array<{ from: number; to: number }> {
    const activeTiers = tiers.filter((tier) => tier.isActive);
    const sortedTiers = [...activeTiers].sort(
      (a, b) => a.minAmountCents - b.minAmountCents
    );

    const gaps: Array<{ from: number; to: number }> = [];

    for (let i = 0; i < sortedTiers.length - 1; i++) {
      const current = sortedTiers[i];
      const next = sortedTiers[i + 1];

      if (
        current.maxAmountCents !== null &&
        current.maxAmountCents < next.minAmountCents
      ) {
        gaps.push({
          from: current.maxAmountCents,
          to: next.minAmountCents,
        });
      }
    }

    return gaps;
  }
}
