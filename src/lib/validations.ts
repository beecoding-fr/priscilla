import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z.string().min(1, "Mot de passe requis"),
});

export const registerSchema = z.object({
  email: z.string().email("Email invalide"),
  password: z
    .string()
    .min(8, "Le mot de passe doit contenir au moins 8 caractères"),
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
});

export type RegisterInput = z.input<typeof registerSchema>;

export const createTransactionSchema = z.object({
  solidarityCompanyId: z.string().min(1, "Entreprise requise"),
  amountCents: z.number().positive("Le montant doit être positif"),
  description: z.string().optional(),
});

export const createCompanyProfileSchema = z.object({
  companyName: z.string().min(2, "Le nom de l'entreprise est requis"),
  description: z.string().optional(),
  sector: z.string().optional(),
  address: z.string().optional(),
  phone: z.string().optional(),
  website: z.string().url("URL invalide").optional().or(z.literal("")),
});

export const contactSchema = z.object({
  firstName: z.string().min(2, "Le prénom doit contenir au moins 2 caractères"),
  lastName: z.string().min(2, "Le nom doit contenir au moins 2 caractères"),
  email: z.string().email("Email invalide"),
  phone: z.string().optional(),
  userType: z.enum(["JE", "ES", "OTHER"], {
    required_error: "Veuillez sélectionner votre profil",
  }),
  companyName: z.string().optional(),
  subject: z.string().min(5, "Le sujet doit contenir au moins 5 caractères"),
  message: z
    .string()
    .min(20, "Le message doit contenir au moins 20 caractères"),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type CreateTransactionInput = z.infer<typeof createTransactionSchema>;
export type CreateCompanyProfileInput = z.infer<
  typeof createCompanyProfileSchema
>;
export type ContactInput = z.infer<typeof contactSchema>;
