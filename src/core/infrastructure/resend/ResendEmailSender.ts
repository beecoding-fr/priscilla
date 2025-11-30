import { Resend } from "resend";
import { EmailSenderPort } from "@/core/application/ports";

export class ResendEmailSender implements EmailSenderPort {
  private readonly resend: Resend;
  private readonly fromEmail: string;

  constructor() {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error("RESEND_API_KEY is not set");
    }
    this.resend = new Resend(apiKey);
    this.fromEmail = process.env.EMAIL_FROM ?? "noreply@example.com";
  }

  async sendWelcomeEmail(to: string, name: string): Promise<void> {
    await this.resend.emails.send({
      from: this.fromEmail,
      to,
      subject: "Bienvenue sur SaaS Jeunes Entrepreneurs !",
      html: `
        <h1>Bienvenue ${name} !</h1>
        <p>Nous sommes ravis de vous accueillir sur notre plateforme.</p>
        <p>Vous pouvez maintenant :</p>
        <ul>
          <li>Explorer les offres d'entreprises solidaires</li>
          <li>Souscrire à un plan pour accéder au coaching</li>
          <li>Gagner des points à chaque transaction</li>
        </ul>
        <p>À bientôt !</p>
        <p>L'équipe SaaS Jeunes Entrepreneurs</p>
      `,
    });
  }

  async sendSubscriptionConfirmation(
    to: string,
    name: string,
    planName: string
  ): Promise<void> {
    await this.resend.emails.send({
      from: this.fromEmail,
      to,
      subject: "Confirmation de votre abonnement",
      html: `
        <h1>Félicitations ${name} !</h1>
        <p>Votre abonnement au plan <strong>${planName}</strong> est maintenant actif.</p>
        <p>Vous avez désormais accès à toutes les fonctionnalités incluses dans votre plan.</p>
        <p>Merci de votre confiance !</p>
        <p>L'équipe SaaS Jeunes Entrepreneurs</p>
      `,
    });
  }

  async sendPasswordReset(to: string, resetLink: string): Promise<void> {
    await this.resend.emails.send({
      from: this.fromEmail,
      to,
      subject: "Réinitialisation de votre mot de passe",
      html: `
        <h1>Réinitialisation de mot de passe</h1>
        <p>Vous avez demandé la réinitialisation de votre mot de passe.</p>
        <p>Cliquez sur le lien ci-dessous pour définir un nouveau mot de passe :</p>
        <p><a href="${resetLink}">Réinitialiser mon mot de passe</a></p>
        <p>Ce lien expire dans 1 heure.</p>
        <p>Si vous n'avez pas demandé cette réinitialisation, ignorez cet email.</p>
        <p>L'équipe SaaS Jeunes Entrepreneurs</p>
      `,
    });
  }

  async sendTransactionConfirmation(
    to: string,
    name: string,
    amount: string,
    companyName: string,
    pointsEarned: number
  ): Promise<void> {
    await this.resend.emails.send({
      from: this.fromEmail,
      to,
      subject: "Transaction validée - Points gagnés !",
      html: `
        <h1>Bravo ${name} !</h1>
        <p>Votre transaction de <strong>${amount}</strong> chez <strong>${companyName}</strong> a été validée.</p>
        <p>Vous avez gagné <strong>${pointsEarned} points</strong> !</p>
        <p>Continuez à soutenir les entreprises solidaires pour gagner encore plus de points.</p>
        <p>L'équipe SaaS Jeunes Entrepreneurs</p>
      `,
    });
  }
}

// Export a factory function for easier testing
export function createResendEmailSender(): EmailSenderPort {
  return new ResendEmailSender();
}
