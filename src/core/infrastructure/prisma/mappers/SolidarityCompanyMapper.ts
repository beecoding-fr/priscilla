import { SolidarityCompany as PrismaSolidarityCompany } from "@prisma/client";
import { SolidarityCompany } from "@/core/domain";

export class SolidarityCompanyMapper {
  static toDomain(prismaCompany: PrismaSolidarityCompany): SolidarityCompany {
    return SolidarityCompany.create({
      id: prismaCompany.id,
      userId: prismaCompany.userId,
      companyName: prismaCompany.companyName,
      description: prismaCompany.description,
      sector: prismaCompany.sector,
      address: prismaCompany.address,
      phone: prismaCompany.phone,
      website: prismaCompany.website,
      isVerified: prismaCompany.isVerified,
      createdAt: prismaCompany.createdAt,
      updatedAt: prismaCompany.updatedAt,
    });
  }
}
