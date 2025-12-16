import {
  AdminDashboardRepositoryPort,
  AdminDashboardStatsDTO,
} from "../ports/AdminDashboardRepositoryPort";

/**
 * Output DTO for GetAdminDashboardStats use case
 */
export type GetAdminDashboardStatsOutput = AdminDashboardStatsDTO;

/**
 * Use case: Get Admin Dashboard Statistics
 *
 * This use case retrieves all statistics needed for the admin dashboard,
 * including counts of JE, ES, transactions, points, and various rankings.
 *
 * Following DDD principles, this use case:
 * - Depends only on abstractions (ports/interfaces)
 * - Contains no infrastructure concerns
 * - Can be easily tested with mock repositories
 */
export class GetAdminDashboardStats {
  constructor(
    private readonly adminDashboardRepository: AdminDashboardRepositoryPort
  ) {}

  /**
   * Execute the use case
   * @returns Admin dashboard statistics
   */
  async execute(): Promise<GetAdminDashboardStatsOutput> {
    return this.adminDashboardRepository.getStats();
  }
}
