import { PointsWallet as PrismaPointsWallet } from "@prisma/client";
import { PointsWallet, Points } from "@priscilla/core/domain";

export class PointsWalletMapper {
  static toDomain(prismaWallet: PrismaPointsWallet): PointsWallet {
    return PointsWallet.create({
      id: prismaWallet.id,
      userId: prismaWallet.userId,
      totalPoints: Points.create(prismaWallet.totalPoints),
      createdAt: prismaWallet.createdAt,
      updatedAt: prismaWallet.updatedAt,
    });
  }
}
