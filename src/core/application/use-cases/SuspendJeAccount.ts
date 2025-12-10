import { UserRepositoryPort } from "../ports";

export interface SuspendJeAccountInput {
  jeId: string;
  adminId: string;
}

export interface SuspendJeAccountOutput {
  success: boolean;
  message: string;
}

export class SuspendJeAccount {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(input: SuspendJeAccountInput): Promise<SuspendJeAccountOutput> {
    // Verify admin exists and has admin role
    const admin = await this.userRepository.findById(input.adminId);
    if (!admin || !admin.isAdmin()) {
      throw new Error(
        "Action non autorisée. Seul un administrateur peut suspendre un compte."
      );
    }

    // Find the JE user
    const je = await this.userRepository.findById(input.jeId);
    if (!je) {
      throw new Error("Jeune Entrepreneur non trouvé");
    }

    if (!je.isJE()) {
      throw new Error("L'utilisateur n'est pas un Jeune Entrepreneur");
    }

    if (je.isSuspended()) {
      throw new Error("Ce compte est déjà suspendu");
    }

    // Suspend the account using domain logic
    const suspendedJe = je.suspend();

    // Persist the change
    await this.userRepository.updateStatus(input.jeId, "SUSPENDED");

    return {
      success: true,
      message: `Le compte de ${suspendedJe.fullName} a été suspendu avec succès`,
    };
  }
}
