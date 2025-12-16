import { User as PrismaUser } from "@prisma/client";
import { User, Email, UserRole, UserStatus } from "@priscilla/core/domain";

export class UserMapper {
  static toDomain(prismaUser: PrismaUser): User {
    return User.create({
      id: prismaUser.id,
      email: Email.create(prismaUser.email),
      firstName: prismaUser.firstName,
      lastName: prismaUser.lastName,
      role: prismaUser.role as UserRole,
      status: prismaUser.status as UserStatus,
      businessSector: prismaUser.businessSector,
      department: prismaUser.department,
      region: prismaUser.region,
      emailVerified: prismaUser.emailVerified,
      createdAt: prismaUser.createdAt,
      updatedAt: prismaUser.updatedAt,
    });
  }
}
