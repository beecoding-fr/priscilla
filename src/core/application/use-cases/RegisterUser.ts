import bcrypt from "bcryptjs";
import { UserRole, Email } from "@/core/domain";
import { UserRepositoryPort, EmailSenderPort } from "../ports";
import { ValidationError } from "@/core/domain/errors";

export interface RegisterUserInput {
  email: string;
  password: string;
  name: string;
  role?: "JE"; // Seuls les JE peuvent s'auto-inscrire, les ES sont créées par l'admin
}

export interface RegisterUserOutput {
  user: {
    id: string;
    email: string;
    name: string | null;
    role: UserRole;
  };
}

export class RegisterUser {
  constructor(
    private readonly userRepository: UserRepositoryPort,
    private readonly emailSender: EmailSenderPort
  ) {}

  async execute(input: RegisterUserInput): Promise<RegisterUserOutput> {
    // Validate email format
    try {
      Email.create(input.email);
    } catch {
      throw new ValidationError("Invalid email format");
    }

    // Check if user already exists
    const existingUser = await this.userRepository.findByEmail(input.email);
    if (existingUser) {
      throw new ValidationError("A user with this email already exists");
    }

    // Validate password
    if (input.password.length < 8) {
      throw new ValidationError("Password must be at least 8 characters long");
    }

    // Hash password
    const passwordHash = await bcrypt.hash(input.password, 12);

    // Create user
    const user = await this.userRepository.create({
      email: input.email,
      name: input.name,
      passwordHash,
      role: input.role ?? "JE",
    });

    // Send welcome email
    try {
      await this.emailSender.sendWelcomeEmail(
        user.email.getValue(),
        user.name ?? "there"
      );
    } catch (error) {
      // Log but don't fail registration
      console.error("Failed to send welcome email:", error);
    }

    return {
      user: {
        id: user.id,
        email: user.email.getValue(),
        name: user.name,
        role: user.role,
      },
    };
  }
}
