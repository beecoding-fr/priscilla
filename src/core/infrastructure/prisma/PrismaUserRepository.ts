import { PrismaClient, Prisma } from "@prisma/client";
import { User, UserRole, UserStatus } from "@/core/domain";
import {
  UserRepositoryPort,
  CreateUserData,
  UpdateUserData,
  JeWithStats,
  JeListFilters,
} from "@/core/application/ports";
import { UserMapper } from "./mappers";

export class PrismaUserRepository implements UserRepositoryPort {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email: email.toLowerCase() },
    });
    return user ? UserMapper.toDomain(user) : null;
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      orderBy: { createdAt: "desc" },
    });
    return users.map(UserMapper.toDomain);
  }

  async findByRole(role: UserRole): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: { role },
      orderBy: { createdAt: "desc" },
    });
    return users.map(UserMapper.toDomain);
  }

  async create(data: CreateUserData): Promise<User> {
    const user = await this.prisma.user.create({
      data: {
        email: data.email.toLowerCase(),
        firstName: data.firstName,
        lastName: data.lastName,
        passwordHash: data.passwordHash,
        role: data.role,
        businessSector: data.businessSector,
        department: data.department,
        region: data.region,
      },
    });
    return UserMapper.toDomain(user);
  }

  async update(id: string, data: UpdateUserData): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        firstName: data.firstName,
        lastName: data.lastName,
        role: data.role,
        status: data.status,
        businessSector: data.businessSector,
        department: data.department,
        region: data.region,
      },
    });
    return UserMapper.toDomain(user);
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }

  async getPasswordHash(userId: string): Promise<string | null> {
    const user = await this.prisma.user.findUnique({
      where: { id: userId },
      select: { passwordHash: true },
    });
    return user?.passwordHash ?? null;
  }

  async findAllJeWithStats(filters?: JeListFilters): Promise<JeWithStats[]> {
    const where: Prisma.UserWhereInput = {
      role: "JE",
    };

    if (filters?.status) {
      where.status = filters.status;
    }
    if (filters?.businessSector) {
      where.businessSector = filters.businessSector;
    }
    if (filters?.department) {
      where.department = filters.department;
    }
    if (filters?.region) {
      where.region = filters.region;
    }
    if (filters?.searchQuery) {
      where.OR = [
        { firstName: { contains: filters.searchQuery, mode: "insensitive" } },
        { lastName: { contains: filters.searchQuery, mode: "insensitive" } },
        { email: { contains: filters.searchQuery, mode: "insensitive" } },
      ];
    }

    const users = await this.prisma.user.findMany({
      where,
      include: {
        subscription: {
          include: {
            plan: true,
          },
        },
        pointsWallet: true,
        transactions: {
          where: {
            status: "VALIDATED",
          },
        },
      },
      orderBy: { createdAt: "desc" },
    });

    return users.map((user) => ({
      user: UserMapper.toDomain(user),
      subscriptionPlanName: user.subscription?.plan?.name ?? null,
      subscriptionStatus: user.subscription?.status ?? null,
      totalTransactions: user.transactions.length,
      totalPoints: user.pointsWallet?.totalPoints ?? 0,
    }));
  }

  async findJeWithStatsById(id: string): Promise<JeWithStats | null> {
    const user = await this.prisma.user.findUnique({
      where: { id, role: "JE" },
      include: {
        subscription: {
          include: {
            plan: true,
          },
        },
        pointsWallet: true,
        transactions: {
          where: {
            status: "VALIDATED",
          },
        },
      },
    });

    if (!user) {
      return null;
    }

    return {
      user: UserMapper.toDomain(user),
      subscriptionPlanName: user.subscription?.plan?.name ?? null,
      subscriptionStatus: user.subscription?.status ?? null,
      totalTransactions: user.transactions.length,
      totalPoints: user.pointsWallet?.totalPoints ?? 0,
    };
  }

  async updateStatus(id: string, status: UserStatus): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: { status },
    });
    return UserMapper.toDomain(user);
  }
}
