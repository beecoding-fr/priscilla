import { PointsTier as PrismaPointsTier } from "@prisma/client";
import { PointsTier } from "@/core/domain";

export class PointsTierMapper {
  static toDomain(prismaTier: PrismaPointsTier): PointsTier {
    return PointsTier.create({
      id: prismaTier.id,
      minAmountCents: prismaTier.minAmountCents,
      maxAmountCents: prismaTier.maxAmountCents,
      pointsAwarded: prismaTier.pointsAwarded,
      label: prismaTier.label,
      isActive: prismaTier.isActive,
      createdAt: prismaTier.createdAt,
      updatedAt: prismaTier.updatedAt,
    });
  }
}
