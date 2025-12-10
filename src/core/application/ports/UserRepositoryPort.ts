import { User, UserRole, UserStatus } from "@/core/domain";

export interface CreateUserData {
  email: string;
  firstName: string | null;
  lastName: string | null;
  passwordHash: string;
  role: UserRole;
  businessSector?: string | null;
  department?: string | null;
  region?: string | null;
}

export interface UpdateUserData {
  firstName?: string;
  lastName?: string;
  role?: UserRole;
  status?: UserStatus;
  businessSector?: string | null;
  department?: string | null;
  region?: string | null;
}

export interface JeWithStats {
  user: User;
  subscriptionPlanName: string | null;
  subscriptionStatus: string | null;
  totalTransactions: number;
  totalPoints: number;
}

export interface JeListFilters {
  status?: UserStatus;
  businessSector?: string;
  department?: string;
  region?: string;
  searchQuery?: string;
}

export interface UserRepositoryPort {
  findById(id: string): Promise<User | null>;
  findByEmail(email: string): Promise<User | null>;
  findAll(): Promise<User[]>;
  findByRole(role: UserRole): Promise<User[]>;
  create(data: CreateUserData): Promise<User>;
  update(id: string, data: UpdateUserData): Promise<User>;
  delete(id: string): Promise<void>;
  getPasswordHash(userId: string): Promise<string | null>;

  // JE-specific methods for admin management
  findAllJeWithStats(filters?: JeListFilters): Promise<JeWithStats[]>;
  findJeWithStatsById(id: string): Promise<JeWithStats | null>;
  updateStatus(id: string, status: UserStatus): Promise<User>;
}
