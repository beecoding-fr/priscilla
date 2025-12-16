import { PrismaClient } from "@prisma/client";
import { PointsWallet } from "@priscilla/core/domain";
import { PointsWalletRepositoryPort } from "@priscilla/core/application/ports";
import { PointsWalletMapper } from "./mappers";

export class PrismaPointsWalletRepository
  implements PointsWalletRepositoryPort
{
  constructor(private readonly prisma: PrismaClient) {}

  async findByUserId(userId: string): Promise<PointsWallet | null> {
    const wallet = await this.prisma.pointsWallet.findUnique({
      where: { userId },
    });
    return wallet ? PointsWalletMapper.toDomain(wallet) : null;
  }

  async create(userId: string): Promise<PointsWallet> {
    const wallet = await this.prisma.pointsWallet.create({
      data: {
        userId,
        totalPoints: 0,
      },
    });
    return PointsWalletMapper.toDomain(wallet);
  }

  async addPoints(userId: string, points: number): Promise<PointsWallet> {
    // Create wallet if it doesn't exist
    const existingWallet = await this.prisma.pointsWallet.findUnique({
      where: { userId },
    });

    if (!existingWallet) {
      const wallet = await this.prisma.pointsWallet.create({
        data: {
          userId,
          totalPoints: points,
        },
      });
      return PointsWalletMapper.toDomain(wallet);
    }

    const wallet = await this.prisma.pointsWallet.update({
      where: { userId },
      data: {
        totalPoints: {
          increment: points,
        },
      },
    });
    return PointsWalletMapper.toDomain(wallet);
  }
}
