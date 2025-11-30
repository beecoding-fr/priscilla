import { User as PrismaUser } from "@prisma/client";
import { User, Email, UserRole } from "@/core/domain";

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return User.create({
      id: prismaUser.id,
      email: Email.create(prismaUser.email),
      name: prismaUser.name,
      role: prismaUser.role as UserRole,
      emailVerified: prismaUser.emailVerified,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    });
  }
}
