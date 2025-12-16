import { Email } from "../value-objects/Email";

export type UserRole = "ADMIN" | "JE" | "ES";
export type UserStatus = "ACTIVE" | "SUSPENDED";

export interface UserProps {
  id: string;
  email: Email;
  firstName: string | null;
  lastName: string | null;
  role: UserRole;
  status: UserStatus;
  businessSector: string | null;
  department: string | null;
  region: string | null;
  emailVerified: Date | null;
  createdAt: Date;
  updatedAt: Date;
}

export class User {
  private constructor(private readonly props: UserProps) {}

  static create(props: UserProps): User {
    return new User(props);
  }

  get id(): string {
    return this.props.id;
  }

  get email(): Email {
    return this.props.email;
  }

  get firstName(): string | null {
    return this.props.firstName;
  }

  get lastName(): string | null {
    return this.props.lastName;
  }

  get fullName(): string {
    const parts = [this.props.firstName, this.props.lastName].filter(Boolean);
    return parts.length > 0 ? parts.join(" ") : "Utilisateur";
  }

  get role(): UserRole {
    return this.props.role;
  }

  get status(): UserStatus {
    return this.props.status;
  }

  get businessSector(): string | null {
    return this.props.businessSector;
  }

  get department(): string | null {
    return this.props.department;
  }

  get region(): string | null {
    return this.props.region;
  }

  get emailVerified(): Date | null {
    return this.props.emailVerified;
  }

  get createdAt(): Date {
    return this.props.createdAt;
  }

  get updatedAt(): Date {
    return this.props.updatedAt;
  }

  isAdmin(): boolean {
    return this.props.role === "ADMIN";
  }

  isJE(): boolean {
    return this.props.role === "JE";
  }

  isES(): boolean {
    return this.props.role === "ES";
  }

  isActive(): boolean {
    return this.props.status === "ACTIVE";
  }

  isSuspended(): boolean {
    return this.props.status === "SUSPENDED";
  }

  suspend(): User {
    if (this.props.status === "SUSPENDED") {
      throw new Error("L'utilisateur est déjà suspendu");
    }
    return User.create({
      ...this.props,
      status: "SUSPENDED",
      updatedAt: new Date(),
    });
  }

  reactivate(): User {
    if (this.props.status === "ACTIVE") {
      throw new Error("L'utilisateur est déjà actif");
    }
    return User.create({
      ...this.props,
      status: "ACTIVE",
      updatedAt: new Date(),
    });
  }

  toJSON(): UserProps {
    return { ...this.props };
  }
}
