import { SolidarityCompany } from "../../domain";

export interface CreateSolidarityCompanyData {
  userId: string;
  companyName: string;
  description?: string;
  sector?: string;
  address?: string;
  phone?: string;
  website?: string;
}

export interface UpdateSolidarityCompanyData {
  companyName?: string;
  description?: string;
  sector?: string;
  address?: string;
  phone?: string;
  website?: string;
  isVerified?: boolean;
}

export interface SolidarityCompanyRepositoryPort {
  findById(id: string): Promise<SolidarityCompany | null>;
  findByUserId(userId: string): Promise<SolidarityCompany | null>;
  findAll(): Promise<SolidarityCompany[]>;
  findVerified(): Promise<SolidarityCompany[]>;
  create(data: CreateSolidarityCompanyData): Promise<SolidarityCompany>;
  update(
    id: string,
    data: UpdateSolidarityCompanyData
  ): Promise<SolidarityCompany>;
  delete(id: string): Promise<void>;
}
