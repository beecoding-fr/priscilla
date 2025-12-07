import { NextResponse } from "next/server";
import { contactSchema } from "@/lib/validations";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validatedData = contactSchema.parse(body);

    const userTypeLabels = {
      JE: "Jeune Entrepreneur",
      ES: "Entreprise Solidaire",
      OTHER: "Autre",
    };

    // Send email to Priscillia
    await resend.emails.send({
      from: "SaaS Jeunes Entrepreneurs <onboarding@resend.dev>",
      to: process.env.CONTACT_EMAIL || "contact@example.com",
      replyTo: validatedData.email,
      subject: `[Contact] ${validatedData.subject}`,
      html: `
        <h2>Nouvelle demande de contact</h2>
        
        <h3>Informations du contact</h3>
        <ul>
          <li><strong>Nom :</strong> ${validatedData.firstName} ${
        validatedData.lastName
      }</li>
          <li><strong>Email :</strong> ${validatedData.email}</li>
          <li><strong>Téléphone :</strong> ${
            validatedData.phone || "Non renseigné"
          }</li>
          <li><strong>Profil :</strong> ${
            userTypeLabels[validatedData.userType]
          }</li>
          <li><strong>Entreprise :</strong> ${
            validatedData.companyName || "Non renseignée"
          }</li>
        </ul>
        
        <h3>Sujet</h3>
        <p>${validatedData.subject}</p>
        
        <h3>Message</h3>
        <p style="white-space: pre-wrap;">${validatedData.message}</p>
        
        <hr />
        <p style="color: #666; font-size: 12px;">
          Ce message a été envoyé via le formulaire de contact du site SaaS Jeunes Entrepreneurs.
        </p>
      `,
    });

    // Send confirmation email to the user
    await resend.emails.send({
      from: "SaaS Jeunes Entrepreneurs <onboarding@resend.dev>",
      to: validatedData.email,
      subject: "Confirmation de votre demande - SaaS Jeunes Entrepreneurs",
      html: `
        <h2>Bonjour ${validatedData.firstName},</h2>
        
        <p>Merci pour votre message ! Nous avons bien reçu votre demande concernant :</p>
        <p><strong>${validatedData.subject}</strong></p>
        
        <p>Priscillia vous recontactera dans les plus brefs délais pour échanger sur votre projet.</p>
        
        <p>En attendant, n'hésitez pas à découvrir nos offres d'accompagnement sur notre site.</p>
        
        <p>À très bientôt,<br />
        L'équipe SaaS Jeunes Entrepreneurs</p>
        
        <hr />
        <p style="color: #666; font-size: 12px;">
          Ceci est un email automatique, merci de ne pas y répondre directement.
        </p>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Erreur lors de l'envoi du message" },
      { status: 500 }
    );
  }
}
