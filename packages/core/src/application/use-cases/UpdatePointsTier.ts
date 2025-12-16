import { NotFoundError, ValidationError } from "../../domain/errors";
import { PointsTierRepositoryPort } from "../ports";

export interface UpdatePointsTierInput {
  id: string;
  minAmountCents?: number;
  maxAmountCents?: number | null;
  pointsAwarded?: number;
  label?: string | null;
  isActive?: boolean;
}

export interface UpdatePointsTierOutput {
  tier: {
    id: string;
    minAmountCents: number;
    maxAmountCents: number | null;
    pointsAwarded: number;
    label: string | null;
    isActive: boolean;
    updatedAt: Date;
  };
}

export class UpdatePointsTier {
  constructor(
    private readonly pointsTierRepository: PointsTierRepositoryPort
  ) {}

  async execute(input: UpdatePointsTierInput): Promise<UpdatePointsTierOutput> {
    // Check tier exists
    const existingTier = await this.pointsTierRepository.findById(input.id);
    if (!existingTier) {
      throw new NotFoundError("PointsTier", input.id);
    }

    // Prepare new values
    const newMin = input.minAmountCents ?? existingTier.minAmountCents;
    const newMax =
      input.maxAmountCents !== undefined
        ? input.maxAmountCents
        : existingTier.maxAmountCents;
    const newPoints = input.pointsAwarded ?? existingTier.pointsAwarded;

    // Validate
    if (newMin < 0) {
      throw new ValidationError("Le montant minimum ne peut pas être négatif");
    }

    if (newMax !== null && newMax <= newMin) {
      throw new ValidationError(
        "Le montant maximum doit être supérieur au montant minimum"
      );
    }

    if (newPoints < 0) {
      throw new ValidationError("Le nombre de points ne peut pas être négatif");
    }

    // Check for overlapping tiers (excluding current tier)
    const allTiers = await this.pointsTierRepository.findAllActive();
    const otherTiers = allTiers.filter((t) => t.id !== input.id);

    for (const other of otherTiers) {
      const otherMin = other.minAmountCents;
      const otherMax = other.maxAmountCents;

      const newMaxEffective = newMax ?? Infinity;
      const otherMaxEffective = otherMax ?? Infinity;

      if (newMin < otherMaxEffective && newMaxEffective > otherMin) {
        throw new ValidationError(
          `Cette tranche chevauche une tranche existante (${other.formatRange()})`
        );
      }
    }

    const updatedTier = await this.pointsTierRepository.update(input.id, {
      minAmountCents: input.minAmountCents,
      maxAmountCents: input.maxAmountCents,
      pointsAwarded: input.pointsAwarded,
      label: input.label,
      isActive: input.isActive,
    });

    return {
      tier: {
        id: updatedTier.id,
        minAmountCents: updatedTier.minAmountCents,
        maxAmountCents: updatedTier.maxAmountCents,
        pointsAwarded: updatedTier.pointsAwarded,
        label: updatedTier.label,
        isActive: updatedTier.isActive,
        updatedAt: updatedTier.updatedAt,
      },
    };
  }
}
