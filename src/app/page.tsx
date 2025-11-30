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
      <section className="flex flex-col items-center justify-center py-20 px-4 text-center bg-gradient-to-b from-primary/5 to-background">
        <h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-6">
          SaaS <span className="text-primary">Jeunes Entrepreneurs</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mb-8">
          La plateforme qui connecte les jeunes entrepreneurs aux entreprises
          solidaires. Bénéficiez de coaching, créez des partenariats et gagnez
          des points à chaque transaction.
        </p>
        <div className="flex gap-4">
          <Link href="/register">
            <Button size="lg" className="text-lg px-8">
              Commencer
            </Button>
          </Link>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-muted/50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Pourquoi nous rejoindre ?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🎯 Coaching personnalisé
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Accédez à des sessions de coaching avec des experts pour
                  développer votre projet entrepreneurial.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  🤝 Matching intelligent
                </CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-base">
                  Trouvez les entreprises solidaires qui correspondent à vos
                  valeurs et à votre secteur d&apos;activité.
                </CardDescription>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  ⭐ Programme de points
                </CardTitle>
              </CardHeader>
              <CardContent>
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
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Nos offres d&apos;abonnement
          </h2>
          <p className="text-center text-muted-foreground mb-12 max-w-xl mx-auto">
            Choisissez le plan qui correspond à vos besoins et commencez votre
            aventure entrepreneuriale.
          </p>
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {/* Basic Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Basic</CardTitle>
                <div className="text-3xl font-bold">
                  9,99 €<span className="text-sm font-normal">/mois</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    ✓ Accès aux entreprises solidaires
                  </li>
                  <li className="flex items-center gap-2">
                    ✓ Programme de points (x1)
                  </li>
                  <li className="flex items-center gap-2">
                    ✓ Support par email
                  </li>
                </ul>
                <Link href="/register" className="block mt-6">
                  <Button variant="outline" className="w-full">
                    Choisir Basic
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Classic Plan */}
            <Card className="border-primary shadow-lg relative">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-primary-foreground text-xs px-3 py-1 rounded-full">
                Populaire
              </div>
              <CardHeader>
                <CardTitle>Classic</CardTitle>
                <div className="text-3xl font-bold">
                  19,99 €<span className="text-sm font-normal">/mois</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    ✓ Tout Basic inclus
                  </li>
                  <li className="flex items-center gap-2">
                    ✓ 2 sessions coaching/mois
                  </li>
                  <li className="flex items-center gap-2">
                    ✓ Programme de points (x2)
                  </li>
                  <li className="flex items-center gap-2">
                    ✓ Support prioritaire
                  </li>
                </ul>
                <Link href="/register" className="block mt-6">
                  <Button className="w-full">Choisir Classic</Button>
                </Link>
              </CardContent>
            </Card>

            {/* Premium Plan */}
            <Card>
              <CardHeader>
                <CardTitle>Premium</CardTitle>
                <div className="text-3xl font-bold">
                  39,99 €<span className="text-sm font-normal">/mois</span>
                </div>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 text-sm">
                  <li className="flex items-center gap-2">
                    ✓ Tout Classic inclus
                  </li>
                  <li className="flex items-center gap-2">
                    ✓ Coaching illimité
                  </li>
                  <li className="flex items-center gap-2">
                    ✓ Programme de points (x3)
                  </li>
                  <li className="flex items-center gap-2">
                    ✓ Matching prioritaire
                  </li>
                  <li className="flex items-center gap-2">✓ Événements VIP</li>
                </ul>
                <Link href="/register" className="block mt-6">
                  <Button variant="outline" className="w-full">
                    Choisir Premium
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t mt-auto">
        <div className="container mx-auto text-center text-sm text-muted-foreground">
          <p>© 2024 SaaS Jeunes Entrepreneurs. Tous droits réservés.</p>
        </div>
      </footer>
    </div>
  );
}
