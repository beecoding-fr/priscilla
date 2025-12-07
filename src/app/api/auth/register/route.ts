import { NextResponse } from "next/server";
import { z } from "zod";
import { registerSchema } from "@/lib/validations";
import { RegisterUser, EmailSenderPort } from "@/core/application";
import {
  prisma,
  PrismaUserRepository,
  ResendEmailSender,
} from "@/core/infrastructure";
import { ValidationError } from "@/core/domain";

/** Stub email sender for development when RESEND_API_KEY is not set */
const stubEmailSender: EmailSenderPort = {
  sendWelcomeEmail: async (_to: string, _name: string): Promise<void> => {
    console.log("[Stub] Welcome email would be sent");
  },
  sendSubscriptionConfirmation: async (
    _to: string,
    _name: string,
    _planName: string
  ): Promise<void> => {
    console.log("[Stub] Subscription confirmation would be sent");
  },
  sendPasswordReset: async (_to: string, _resetLink: string): Promise<void> => {
    console.log("[Stub] Password reset email would be sent");
  },
  sendTransactionConfirmation: async (
    _to: string,
    _name: string,
    _amount: string,
    _companyName: string,
    _pointsEarned: number
  ): Promise<void> => {
    console.log("[Stub] Transaction confirmation would be sent");
  },
};

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate input
    const validatedData = registerSchema.parse(body);

    // Create dependencies
    const userRepository = new PrismaUserRepository(prisma);
    const emailSender = process.env.RESEND_API_KEY
      ? new ResendEmailSender()
      : stubEmailSender;

    // Execute use case
    // Note: Seuls les JE peuvent s'inscrire via ce formulaire
    // Les ES sont créées par l'admin Priscilla
    const registerUser = new RegisterUser(userRepository, emailSender);
    const result = await registerUser.execute({
      email: validatedData.email,
      password: validatedData.password,
      name: validatedData.name,
      role: "JE",
    });

    return NextResponse.json(result, { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: "Validation error", details: error.issues },
        { status: 400 }
      );
    }

    if (error instanceof ValidationError) {
      return NextResponse.json({ error: error.message }, { status: 400 });
    }

    console.error("Registration error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
