"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm, zodResolver } from "@priscilla/ui";
import { Button } from "@priscilla/ui/button";
import { Input } from "@priscilla/ui/input";
import { Label } from "@priscilla/ui/label";
import { Card } from "@priscilla/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@priscilla/ui/form";
import {
  ArrowRight,
  Mail,
  User,
  Phone,
  Building2,
  MessageSquare,
  Send,
  CheckCircle2,
  Briefcase,
  Users,
  HelpCircle,
} from "lucide-react";
import { contactSchema, type ContactInput } from "@/lib/validations";
import { toast } from "sonner";
import { Footer } from "@priscilla/ui/footer";

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const form = useForm<ContactInput>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      userType: undefined,
      companyName: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactInput) => {
    setIsSubmitting(true);
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Erreur lors de l'envoi du message");
      }

      setIsSuccess(true);
      toast.success("Message envoyé avec succès !");
    } catch {
      toast.error("Une erreur est survenue. Veuillez réessayer.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const userTypeOptions = [
    {
      value: "JE" as const,
      label: "Jeune Entrepreneur",
      icon: <Briefcase className="w-5 h-5" />,
      description: "Je souhaite développer mon activité",
    },
    {
      value: "ES" as const,
      label: "Entreprise Solidaire",
      icon: <Users className="w-5 h-5" />,
      description: "Je veux soutenir des entrepreneurs",
    },
    {
      value: "OTHER" as const,
      label: "Autre",
      icon: <HelpCircle className="w-5 h-5" />,
      description: "Question générale ou partenariat",
    },
  ];

  if (isSuccess) {
    return (
      <div className="flex flex-col min-h-screen">
        <section className="relative flex-1 flex items-center justify-center py-28 px-4">
          <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
          <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/4 rounded-full blur-[120px]" />

          <Card className="relative z-10 max-w-lg w-full p-10 text-center border border-border/50 shadow-xl shadow-primary/5 bg-card/80 backdrop-blur-sm">
            <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 className="w-8 h-8 text-success" />
            </div>
            <h1 className="text-2xl font-bold mb-4">Message envoyé !</h1>
            <p className="text-muted-foreground mb-8">
              Merci pour votre message. Priscillia vous recontactera dans les
              plus brefs délais pour échanger sur votre projet.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/">
                <Button
                  variant="outline"
                  className="rounded-xl h-11 px-6 group"
                >
                  Retour à l'accueil
                </Button>
              </Link>
              <Link href="/#plans">
                <Button className="rounded-xl h-11 px-6 shadow-md shadow-primary/20 group">
                  Voir les offres
                  <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
              </Link>
            </div>
          </Card>
        </section>

        <Footer />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/4 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-size-[60px_60px]" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary/5 text-primary border border-primary/10">
              <MessageSquare className="w-4 h-4" />
              <span>Contact</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
              Parlons de votre
              <span className="text-gradient"> projet</span>
            </h1>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Vous êtes jeune entrepreneur ou entreprise solidaire ? Laissez vos
              coordonnées et décrivez vos besoins, Priscillia vous recontactera
              personnellement.
            </p>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section className="pb-28 px-4">
        <div className="container mx-auto max-w-3xl">
          <Card className="p-8 md:p-10 border border-border/50 shadow-xl shadow-primary/5 bg-card/80 backdrop-blur-sm">
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                {/* User Type Selection */}
                <FormField
                  control={form.control}
                  name="userType"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-base font-semibold">
                        Vous êtes...
                      </FormLabel>
                      <FormControl>
                        <div className="grid sm:grid-cols-3 gap-4 mt-3">
                          {userTypeOptions.map((option) => (
                            <button
                              key={option.value}
                              type="button"
                              onClick={() => field.onChange(option.value)}
                              className={`p-4 rounded-xl border-2 text-left transition-all ${
                                field.value === option.value
                                  ? "border-primary bg-primary/5"
                                  : "border-border/50 hover:border-border"
                              }`}
                            >
                              <div
                                className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 ${
                                  field.value === option.value
                                    ? "bg-primary text-primary-foreground"
                                    : "bg-muted"
                                }`}
                              >
                                {option.icon}
                              </div>
                              <p className="font-medium text-sm">
                                {option.label}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                {option.description}
                              </p>
                            </button>
                          ))}
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Name Fields */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="firstName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Prénom</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              placeholder="Votre prénom"
                              className="pl-10 h-11 rounded-lg"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="lastName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Nom</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              placeholder="Votre nom"
                              className="pl-10 h-11 rounded-lg"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Contact Fields */}
                <div className="grid sm:grid-cols-2 gap-5">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              type="email"
                              placeholder="votre@email.com"
                              className="pl-10 h-11 rounded-lg"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>
                          Téléphone{" "}
                          <span className="text-muted-foreground font-normal">
                            (optionnel)
                          </span>
                        </FormLabel>
                        <FormControl>
                          <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                            <Input
                              type="tel"
                              placeholder="06 12 34 56 78"
                              className="pl-10 h-11 rounded-lg"
                              {...field}
                            />
                          </div>
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                {/* Company Name (optional) */}
                <FormField
                  control={form.control}
                  name="companyName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>
                        Nom de l'entreprise{" "}
                        <span className="text-muted-foreground font-normal">
                          (optionnel)
                        </span>
                      </FormLabel>
                      <FormControl>
                        <div className="relative">
                          <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                          <Input
                            placeholder="Votre entreprise"
                            className="pl-10 h-11 rounded-lg"
                            {...field}
                          />
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Subject */}
                <FormField
                  control={form.control}
                  name="subject"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Sujet</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Objet de votre demande"
                          className="h-11 rounded-lg"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Message */}
                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Votre message</FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Décrivez votre projet, vos besoins et vos objectifs..."
                          className="flex min-h-[150px] w-full rounded-lg border border-input bg-background px-3 py-3 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 resize-none"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Submit Button */}
                <Button
                  type="submit"
                  size="lg"
                  disabled={isSubmitting}
                  className="w-full h-12 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                      Envoi en cours...
                    </>
                  ) : (
                    <>
                      Envoyer le message
                      <Send className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </Button>
              </form>
            </Form>
          </Card>
        </div>
      </section>

      <Footer />
    </div>
  );
}
