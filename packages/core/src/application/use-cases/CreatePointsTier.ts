import { ValidationError } from "../../domain/errors";
import { PointsTierRepositoryPort } from "../ports";

export interface CreatePointsTierInput {
  minAmountCents: number;
  maxAmountCents: number | null;
  pointsAwarded: number;
  label?: string;
}

export interface CreatePointsTierOutput {
  tier: {
    id: string;
    minAmountCents: number;
    maxAmountCents: number | null;
    pointsAwarded: number;
    label: string | null;
    isActive: boolean;
    createdAt: Date;
  };
}

export class CreatePointsTier {
  constructor(
    private readonly pointsTierRepository: PointsTierRepositoryPort
  ) {}

  async execute(input: CreatePointsTierInput): Promise<CreatePointsTierOutput> {
    // Validate input
    if (input.minAmountCents < 0) {
      throw new ValidationError("Le montant minimum ne peut pas être négatif");
    }

    if (
      input.maxAmountCents !== null &&
      input.maxAmountCents <= input.minAmountCents
    ) {
      throw new ValidationError(
        "Le montant maximum doit être supérieur au montant minimum"
      );
    }

    if (input.pointsAwarded < 0) {
      throw new ValidationError("Le nombre de points ne peut pas être négatif");
    }

    // Check for overlapping tiers
    const existingTiers = await this.pointsTierRepository.findAllActive();

    for (const existing of existingTiers) {
      const newMin = input.minAmountCents;
      const newMax = input.maxAmountCents;
      const existingMin = existing.minAmountCents;
      const existingMax = existing.maxAmountCents;

      // Check overlap
      const newMaxEffective = newMax ?? Infinity;
      const existingMaxEffective = existingMax ?? Infinity;

      if (newMin < existingMaxEffective && newMaxEffective > existingMin) {
        throw new ValidationError(
          `Cette tranche chevauche une tranche existante (${existing.formatRange()})`
        );
      }
    }

    const tier = await this.pointsTierRepository.create({
      minAmountCents: input.minAmountCents,
      maxAmountCents: input.maxAmountCents,
      pointsAwarded: input.pointsAwarded,
      label: input.label,
    });

    return {
      tier: {
        id: tier.id,
        minAmountCents: tier.minAmountCents,
        maxAmountCents: tier.maxAmountCents,
        pointsAwarded: tier.pointsAwarded,
        label: tier.label,
        isActive: tier.isActive,
        createdAt: tier.createdAt,
      },
    };
  }
}
