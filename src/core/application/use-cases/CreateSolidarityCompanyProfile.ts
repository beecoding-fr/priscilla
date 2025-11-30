import { NotFoundError, ValidationError } from "@/core/domain/errors";
import { UserRepositoryPort, SolidarityCompanyRepositoryPort } from "../ports";

export interface CreateSolidarityCompanyProfileInput {
  userId: string;
  companyName: string;
  description?: string;
  sector?: string;
  address?: string;
  phone?: string;
  website?: string;
}

export interface CreateSolidarityCompanyProfileOutput {
  company: {
    id: string;
    companyName: string;
    description: string | null;
    sector: string | null;
    isVerified: boolean;
  };
}

export class CreateSolidarityCompanyProfile {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly companyRepository: SolidarityCompanyRepositoryPort
  ) {}

  async execute(
    input: CreateSolidarityCompanyProfileInput
  ): Promise<CreateSolidarityCompanyProfileOutput> {
    // Validate user exists and is ES
    const user = await this.userRepository.findById(input.userId);
    if (!user) {
      throw new NotFoundError("User", input.userId);
    }
    if (!user.isES()) {
      throw new ValidationError("Only ES users can create company profiles");
    }

    // Check if user already has a company
    const existingCompany = await this.companyRepository.findByUserId(
      input.userId
    );
    if (existingCompany) {
      throw new ValidationError("User already has a company profile");
    }

    // Create company
    const company = await this.companyRepository.create({
      userId: input.userId,
      companyName: input.companyName,
      description: input.description,
      sector: input.sector,
      address: input.address,
      phone: input.phone,
      website: input.website,
    });

    return {
      company: {
        id: company.id,
        companyName: company.companyName,
        description: company.description,
        sector: company.sector,
        isVerified: company.isVerified,
      },
    };
  }
}
