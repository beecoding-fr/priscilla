import { PointsTier } from "@/core/domain/entities/PointsTier";

export interface CreatePointsTierData {
  minAmountCents: number;
  maxAmountCents: number | null;
  pointsAwarded: number;
  label?: string;
}

export interface UpdatePointsTierData {
  minAmountCents?: number;
  maxAmountCents?: number | null;
  pointsAwarded?: number;
  label?: string | null;
  isActive?: boolean;
}

export interface PointsTierRepositoryPort {
  /**
   * Find a tier by ID
   */
  findById(id: string): Promise<PointsTier | null>;

  /**
   * Find all tiers (active and inactive)
   */
  findAll(): Promise<PointsTier[]>;

  /**
   * Find only active tiers
   */
  findAllActive(): Promise<PointsTier[]>;

  /**
   * Create a new points tier
   */
  create(data: CreatePointsTierData): Promise<PointsTier>;

  /**
   * Update an existing tier
   */
  update(id: string, data: UpdatePointsTierData): Promise<PointsTier>;

  /**
   * Delete a tier
   */
  delete(id: string): Promise<void>;

  /**
   * Find the tier that matches a given amount
   */
  findTierForAmount(amountCents: number): Promise<PointsTier | null>;
}
