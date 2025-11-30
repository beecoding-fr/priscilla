import { Email } from "../value-objects/Email";

export type UserRole = "ADMIN" | "JE" | "ES";

export interface UserProps {
  id: string;
  email: Email;
  name: string | null;
  role: UserRole;
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

  get name(): string | null {
    return this.props.name;
  }

  get role(): UserRole {
    return this.props.role;
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

  toJSON(): UserProps {
    return { ...this.props };
  }
}
