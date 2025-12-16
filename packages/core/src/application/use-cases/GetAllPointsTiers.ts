import { PointsTierRepositoryPort } from "../ports";

export interface GetAllPointsTiersOutput {
  tiers: Array<{
    id: string;
    minAmountCents: number;
    maxAmountCents: number | null;
    pointsAwarded: number;
    label: string | null;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
  }>;
}

export class GetAllPointsTiers {
  constructor(
    private readonly pointsTierRepository: PointsTierRepositoryPort
  ) {}

  async execute(): Promise<GetAllPointsTiersOutput> {
    const tiers = await this.pointsTierRepository.findAll();

    return {
      tiers: tiers.map((tier) => ({
        id: tier.id,
        minAmountCents: tier.minAmountCents,
        maxAmountCents: tier.maxAmountCents,
        pointsAwarded: tier.pointsAwarded,
        label: tier.label,
        isActive: tier.isActive,
        createdAt: tier.createdAt,
        updatedAt: tier.updatedAt,
      })),
    };
  }
}
