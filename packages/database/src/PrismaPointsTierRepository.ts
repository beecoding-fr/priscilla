import { prisma } from "./client";
import { PointsTier } from "@priscilla/core/domain";
import { PointsTierMapper } from "./mappers";
import {
  PointsTierRepositoryPort,
  CreatePointsTierData,
  UpdatePointsTierData,
} from "@priscilla/core/application/ports";

export class PrismaPointsTierRepository implements PointsTierRepositoryPort {
  async findById(id: string): Promise<PointsTier | null> {
    const tier = await prisma.pointsTier.findUnique({
      where: { id },
    });

    if (!tier) return null;
    return PointsTierMapper.toDomain(tier);
  }

  async findAll(): Promise<PointsTier[]> {
    const tiers = await prisma.pointsTier.findMany({
      orderBy: { minAmountCents: "asc" },
    });

    return tiers.map(PointsTierMapper.toDomain);
  }

  async findAllActive(): Promise<PointsTier[]> {
    const tiers = await prisma.pointsTier.findMany({
      where: { isActive: true },
      orderBy: { minAmountCents: "asc" },
    });

    return tiers.map(PointsTierMapper.toDomain);
  }

  async create(data: CreatePointsTierData): Promise<PointsTier> {
    const tier = await prisma.pointsTier.create({
      data: {
        minAmountCents: data.minAmountCents,
        maxAmountCents: data.maxAmountCents,
        pointsAwarded: data.pointsAwarded,
        label: data.label,
      },
    });

    return PointsTierMapper.toDomain(tier);
  }

  async update(id: string, data: UpdatePointsTierData): Promise<PointsTier> {
    const tier = await prisma.pointsTier.update({
      where: { id },
      data: {
        ...(data.minAmountCents !== undefined && {
          minAmountCents: data.minAmountCents,
        }),
        ...(data.maxAmountCents !== undefined && {
          maxAmountCents: data.maxAmountCents,
        }),
        ...(data.pointsAwarded !== undefined && {
          pointsAwarded: data.pointsAwarded,
        }),
        ...(data.label !== undefined && { label: data.label }),
        ...(data.isActive !== undefined && { isActive: data.isActive }),
      },
    });

    return PointsTierMapper.toDomain(tier);
  }

  async delete(id: string): Promise<void> {
    await prisma.pointsTier.delete({
      where: { id },
    });
  }

  async findTierForAmount(amountCents: number): Promise<PointsTier | null> {
    // Find the tier where amountCents >= minAmountCents AND (maxAmountCents is null OR amountCents < maxAmountCents)
    const tier = await prisma.pointsTier.findFirst({
      where: {
        isActive: true,
        minAmountCents: { lte: amountCents },
        OR: [{ maxAmountCents: null }, { maxAmountCents: { gt: amountCents } }],
      },
      orderBy: { minAmountCents: "desc" },
    });

    if (!tier) return null;
    return PointsTierMapper.toDomain(tier);
  }
}

// Singleton instance
export const prismaPointsTierRepository = new PrismaPointsTierRepository();
