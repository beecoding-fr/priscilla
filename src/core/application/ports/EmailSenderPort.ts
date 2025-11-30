export interface EmailSenderPort {
  sendWelcomeEmail(to: string, name: string): Promise<void>;

  sendSubscriptionConfirmation(
    to: string,
    name: string,
    planName: string
  ): Promise<void>;

  sendPasswordReset(to: string, resetLink: string): Promise<void>;

  sendTransactionConfirmation(
    to: string,
    name: string,
    amount: string,
    companyName: string,
    pointsEarned: number
  ): Promise<void>;
}
