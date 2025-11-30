import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FeaturedEntrepreneurs } from "@/ui/components/FeaturedEntrepreneurs";
import { SolidarityCompaniesShowcase } from "@/ui/components/SolidarityCompaniesShowcase";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-24 md:py-32 px-4 text-center gradient-hero overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />

        <div className="relative z-10">
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary/10 text-primary border border-primary/20">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Nouveau : Programme de matching intelligent
          </div> */}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            Propulsez votre
            <span className="block text-gradient">avenir entrepreneurial</span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10">
            La plateforme qui connecte les jeunes entrepreneurs aux entreprises
            solidaires. Bénéficiez de coaching, créez des partenariats et gagnez
            des points à chaque transaction.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/register">
              <Button
                size="lg"
                className="text-lg px-8 h-12 shadow-lg shadow-primary/25 hover:shadow-xl hover:shadow-primary/30 transition-all"
              >
                Commencer l&apos;aventure
              </Button>
            </Link>
            {/* <Link href="#features">
              <Button size="lg" variant="outline" className="text-lg px-8 h-12">
                Découvrir
              </Button>
            </Link> */}
          </div>

          <div className="flex items-center justify-center gap-8 mt-12 text-sm text-muted-foreground">
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-accent"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>+500 entrepreneurs</span>
            </div>
            <div className="flex items-center gap-2">
              <svg
                className="w-5 h-5 text-accent"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <span>150+ partenaires</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-24 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Pourquoi nous rejoindre ?
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Tout ce dont vous avez besoin pour réussir votre aventure
              entrepreneuriale
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="group relative overflow-hidden border-0 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-7 h-7 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl">Coaching personnalisé</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-base">
                  Accédez à des sessions de coaching avec des experts pour
                  développer votre projet entrepreneurial.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="group relative overflow-hidden border-0 shadow-lg shadow-accent/5 hover:shadow-xl hover:shadow-accent/10 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-accent/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-accent/15 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-7 h-7 text-accent"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl">Matching intelligent</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-base">
                  Trouvez les entreprises solidaires qui correspondent à vos
                  valeurs et à votre secteur d&apos;activité.
                </CardDescription>
              </CardContent>
            </Card>
            <Card className="group relative overflow-hidden border-0 shadow-lg shadow-primary/5 hover:shadow-xl hover:shadow-primary/10 transition-all duration-300">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <CardHeader className="relative">
                <div className="w-14 h-14 rounded-2xl bg-primary/10 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <svg
                    className="w-7 h-7 text-primary"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"
                    />
                  </svg>
                </div>
                <CardTitle className="text-xl">Programme de points</CardTitle>
              </CardHeader>
              <CardContent className="relative">
                <CardDescription className="text-base">
                  Gagnez des points à chaque transaction avec les entreprises
                  solidaires et débloquez des avantages exclusifs.
                </CardDescription>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Featured Entrepreneurs Section */}
      <FeaturedEntrepreneurs />

      {/* Solidarity Companies Showcase */}
      <SolidarityCompaniesShowcase />

      {/* Plans Section */}
      <section className="py-24 px-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />

        <div className="container mx-auto relative">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Nos offres d&apos;abonnement
            </h2>
            <p className="text-muted-foreground max-w-xl mx-auto">
              Choisissez le plan qui correspond à vos besoins et commencez votre
              aventure entrepreneuriale.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Essentiel Plan */}
            <Card className="relative border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="pb-4 pt-8 text-center">
                <CardTitle className="text-lg font-semibold text-muted-foreground">
                  Essentiel
                </CardTitle>
                <div className="pt-2">
                  <span className="text-4xl font-bold">27 €</span>
                  <span className="text-muted-foreground">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <ul className="space-y-3 text-sm flex-1">
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Accès aux entreprises solidaires
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Programme de points (x1)
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Support par email
                  </li>
                </ul>
                <Link href="/register" className="block mt-8">
                  <Button variant="outline" className="w-full h-11">
                    Choisir Essentiel
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Standard Plan */}
            <Card className="relative border-2 border-primary shadow-xl shadow-primary/10 scale-105 z-10 flex flex-col">
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                <span className="inline-flex items-center gap-1 bg-primary text-primary-foreground text-xs font-semibold px-4 py-1.5 rounded-full shadow-lg">
                  <svg
                    className="w-3.5 h-3.5"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Populaire
                </span>
              </div>
              <CardHeader className="pb-4 pt-8 text-center">
                <CardTitle className="text-lg font-semibold text-primary">
                  Standard
                </CardTitle>
                <div className="pt-2">
                  <span className="text-4xl font-bold">97 €</span>
                  <span className="text-muted-foreground">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <ul className="space-y-3 text-sm flex-1">
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Tout Essentiel inclus
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    2 sessions coaching/mois
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Programme de points (x2)
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-primary flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Support prioritaire
                  </li>
                </ul>
                <Link href="/register" className="block mt-8">
                  <Button className="w-full h-11 shadow-lg shadow-primary/25">
                    Choisir Standard
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card className="relative border-0 shadow-lg hover:shadow-xl transition-shadow duration-300 flex flex-col">
              <CardHeader className="pb-4 pt-8 text-center">
                <CardTitle className="text-lg font-semibold text-muted-foreground">
                  Premium
                </CardTitle>
                <div className="pt-2">
                  <span className="text-4xl font-bold">197 €</span>
                  <span className="text-muted-foreground">/mois</span>
                </div>
              </CardHeader>
              <CardContent className="flex flex-col flex-1">
                <ul className="space-y-3 text-sm flex-1">
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Tout Standard inclus
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Coaching illimité
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Programme de points (x3)
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Matching prioritaire
                  </li>
                  <li className="flex items-center gap-3">
                    <svg
                      className="w-5 h-5 text-accent flex-shrink-0"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path
                        fillRule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                        clipRule="evenodd"
                      />
                    </svg>
                    Événements VIP
                  </li>
                </ul>
                <Link href="/register" className="block mt-8">
                  <Button variant="outline" className="w-full h-11">
                    Choisir Premium
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 border-t mt-auto bg-muted/20">
        <div className="container mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-sm">
                  JE
                </span>
              </div>
              <span className="font-semibold">Jeunes Entrepreneurs</span>
            </div>
            <div className="flex items-center gap-8 text-sm text-muted-foreground">
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                À propos
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Contact
              </Link>
              <Link
                href="#"
                className="hover:text-foreground transition-colors"
              >
                Mentions légales
              </Link>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 SaaS Jeunes Entrepreneurs
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
