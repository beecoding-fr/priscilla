import { PointsWallet } from "../../domain";

export interface PointsWalletRepositoryPort {
  findByUserId(userId: string): Promise<PointsWallet | null>;
  create(userId: string): Promise<PointsWallet>;
  addPoints(userId: string, points: number): Promise<PointsWallet>;
}
