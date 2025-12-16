import { UserRepositoryPort, JeWithStats, JeListFilters } from "../ports";

export interface GetAllJeunesInput {
  filters?: JeListFilters;
}

export interface JeOutputDTO {
  id: string;
  email: string;
  firstName: string | null;
  lastName: string | null;
  fullName: string;
  status: string;
  businessSector: string | null;
  department: string | null;
  region: string | null;
  subscriptionPlanName: string | null;
  subscriptionStatus: string | null;
  totalTransactions: number;
  totalPoints: number;
  createdAt: Date;
}

export interface GetAllJeunesOutput {
  jeunes: JeOutputDTO[];
  total: number;
}

export class GetAllJeunes {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(input: GetAllJeunesInput = {}): Promise<GetAllJeunesOutput> {
    const jeunesWithStats = await this.userRepository.findAllJeWithStats(
      input.filters
    );

    const jeunes = jeunesWithStats.map((je) => this.toDTO(je));

    return {
      jeunes,
      total: jeunes.length,
    };
  }

  private toDTO(je: JeWithStats): JeOutputDTO {
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
      subscriptionPlanName: je.subscriptionPlanName,
      subscriptionStatus: je.subscriptionStatus,
      totalTransactions: je.totalTransactions,
      totalPoints: je.totalPoints,
      createdAt: je.user.createdAt,
    };
  }
}
