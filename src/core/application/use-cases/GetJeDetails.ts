import { UserRepositoryPort, JeWithStats } from "../ports";

export interface GetJeDetailsInput {
  jeId: string;
}

export interface JeDetailsDTO {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string;
  status: string;
  businessSector: string | null;
  department: string | null;
  region: string | null;
  emailVerified: Date | null;
  subscriptionPlanName: string | null;
  subscriptionStatus: string | null;
  totalTransactions: number;
  totalPoints: number;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetJeDetailsOutput {
  je: JeDetailsDTO;
}

export class GetJeDetails {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(input: GetJeDetailsInput): Promise<GetJeDetailsOutput> {
    const jeWithStats = await this.userRepository.findJeWithStatsById(
      input.jeId
    );

    if (!jeWithStats) {
      throw new Error("Jeune Entrepreneur non trouvé");
    }

    return {
      je: this.toDTO(jeWithStats),
    };
  }

  private toDTO(je: JeWithStats): JeDetailsDTO {
    return {
      id: je.user.id,
      email: je.user.email.toString(),
      firstName: je.user.firstName,
      lastName: je.user.lastName,
      fullName: je.user.fullName,
      status: je.user.status,
      businessSector: je.user.businessSector,
      department: je.user.department,
      region: je.user.region,
      emailVerified: je.user.emailVerified,
      subscriptionPlanName: je.subscriptionPlanName,
      subscriptionStatus: je.subscriptionStatus,
      totalTransactions: je.totalTransactions,
      totalPoints: je.totalPoints,
      createdAt: je.user.createdAt,
      updatedAt: je.user.updatedAt,
    };
  }
}
