import { PrismaClient } from "@prisma/client";
import { User, UserRole } from "@/core/domain";
import {
  UserRepositoryPort,
  CreateUserData,
  UpdateUserData,
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
        name: data.name,
        passwordHash: data.passwordHash,
        role: data.role,
      },
    });
    return UserMapper.toDomain(user);
  }

  async update(id: string, data: UpdateUserData): Promise<User> {
    const user = await this.prisma.user.update({
      where: { id },
      data: {
        name: data.name,
        role: data.role,
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
}
