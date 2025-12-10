import { UserRepositoryPort } from "../ports";

export interface ReactivateJeAccountInput {
  jeId: string;
  adminId: string;
}

export interface ReactivateJeAccountOutput {
  success: boolean;
  message: string;
}

export class ReactivateJeAccount {
  constructor(private readonly userRepository: UserRepositoryPort) {}

  async execute(
    input: ReactivateJeAccountInput
  ): Promise<ReactivateJeAccountOutput> {
    // Verify admin exists and has admin role
    const admin = await this.userRepository.findById(input.adminId);
    if (!admin || !admin.isAdmin()) {
      throw new Error(
        "Action non autorisée. Seul un administrateur peut réactiver un compte."
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

    if (je.isActive()) {
      throw new Error("Ce compte est déjà actif");
    }

    // Reactivate the account using domain logic
    const reactivatedJe = je.reactivate();

    // Persist the change
    await this.userRepository.updateStatus(input.jeId, "ACTIVE");

    return {
      success: true,
      message: `Le compte de ${reactivatedJe.fullName} a été réactivé avec succès`,
    };
  }
}
