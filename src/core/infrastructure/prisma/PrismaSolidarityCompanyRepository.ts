import { PrismaClient } from "@prisma/client";
import { SolidarityCompany } from "@/core/domain";
import {
  SolidarityCompanyRepositoryPort,
  CreateSolidarityCompanyData,
  UpdateSolidarityCompanyData,
} from "@/core/application/ports";
import { SolidarityCompanyMapper } from "./mappers";

export class PrismaSolidarityCompanyRepository
  implements SolidarityCompanyRepositoryPort
{
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<SolidarityCompany | null> {
    const company = await this.prisma.solidarityCompany.findUnique({
      where: { id },
    });
    return company ? SolidarityCompanyMapper.toDomain(company) : null;
  }

  async findByUserId(userId: string): Promise<SolidarityCompany | null> {
    const company = await this.prisma.solidarityCompany.findUnique({
      where: { userId },
    });
    return company ? SolidarityCompanyMapper.toDomain(company) : null;
  }

  async findAll(): Promise<SolidarityCompany[]> {
    const companies = await this.prisma.solidarityCompany.findMany({
      orderBy: { createdAt: "desc" },
    });
    return companies.map(SolidarityCompanyMapper.toDomain);
  }

  async findVerified(): Promise<SolidarityCompany[]> {
    const companies = await this.prisma.solidarityCompany.findMany({
      where: { isVerified: true },
      orderBy: { companyName: "asc" },
    });
    return companies.map(SolidarityCompanyMapper.toDomain);
  }

  async create(data: CreateSolidarityCompanyData): Promise<SolidarityCompany> {
    const company = await this.prisma.solidarityCompany.create({
      data: {
        userId: data.userId,
        companyName: data.companyName,
        description: data.description,
        sector: data.sector,
        address: data.address,
        phone: data.phone,
        website: data.website,
      },
    });
    return SolidarityCompanyMapper.toDomain(company);
  }

  async update(
    id: string,
    data: UpdateSolidarityCompanyData
  ): Promise<SolidarityCompany> {
    const company = await this.prisma.solidarityCompany.update({
      where: { id },
      data: {
        companyName: data.companyName,
        description: data.description,
        sector: data.sector,
        address: data.address,
        phone: data.phone,
        website: data.website,
        isVerified: data.isVerified,
      },
    });
    return SolidarityCompanyMapper.toDomain(company);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.solidarityCompany.delete({
      where: { id },
    });
  }
}
