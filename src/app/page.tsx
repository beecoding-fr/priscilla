import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Footer } from "@/components/ui/footer";
import {
  FeaturedEntrepreneurs,
  SolidarityCompaniesShowcase,
  SectionHeader,
  FeatureCard,
  PricingCard,
} from "@/ui/components";
import {
  Rocket,
  Users,
  Sparkles,
  Award,
  CheckCircle2,
  ArrowRight,
  Zap,
  Target,
  TrendingUp,
} from "lucide-react";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative flex flex-col items-center justify-center py-28 md:py-40 px-4 text-center gradient-hero overflow-hidden">
        {/* Decorative elements - more subtle */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/4 rounded-full blur-[120px]" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-size-[60px_60px]" />{" "}
        <div className="relative z-10 max-w-5xl mx-auto">
          {/* Badge */}
          {/* <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm font-medium rounded-full bg-primary/5 text-primary border border-primary/10 backdrop-blur-sm">
            <Zap className="w-4 h-4" />
            <span>Plateforme #1 pour jeunes entrepreneurs</span>
          </div> */}

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-8 leading-[1.1]">
            Construisez votre
            <span className="block text-gradient mt-2">
              succès entrepreneurial
            </span>
          </h1>
          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed">
            Rejoignez la plateforme qui connecte les jeunes entrepreneurs aux
            entreprises solidaires. Coaching personnalisé, partenariats
            stratégiques et récompenses à chaque étape.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="#plans">
              <Button
                size="lg"
                className="text-base px-8 h-13 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group"
              >
                Commencer maintenant
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link href="#features">
              <Button
                size="lg"
                variant="ghost"
                className="text-base px-8 h-13 rounded-xl text-muted-foreground hover:text-foreground"
              >
                En savoir plus
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-8 sm:gap-12 mt-16 pt-8 border-t border-border/50">
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-accent/10">
                <Users className="w-5 h-5 text-accent" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold">500+</p>
                <p className="text-sm text-muted-foreground">
                  Entrepreneurs actifs
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-primary/10">
                <Target className="w-5 h-5 text-primary" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold">150+</p>
                <p className="text-sm text-muted-foreground">
                  Partenaires solidaires
                </p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-success/10">
                <TrendingUp className="w-5 h-5 text-success" />
              </div>
              <div className="text-left">
                <p className="text-2xl font-bold">95%</p>
                <p className="text-sm text-muted-foreground">
                  Taux de satisfaction
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-28 px-4 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <SectionHeader
            badge="Fonctionnalités"
            badgeVariant="primary"
            title="Tout pour réussir votre parcours"
            description="Des outils et ressources conçus pour accélérer votre croissance entrepreneuriale"
          />
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <FeatureCard
              icon={<Rocket className="w-6 h-6" />}
              title="Coaching expert"
              description="Sessions individuelles avec des mentors expérimentés pour structurer et développer votre projet."
              variant="primary"
            />
            <FeatureCard
              icon={<Users className="w-6 h-6" />}
              title="Réseau solidaire"
              description="Accédez à un écosystème d'entreprises engagées qui soutiennent les jeunes talents."
              variant="accent"
            />
            <FeatureCard
              icon={<Award className="w-6 h-6" />}
              title="Programme fidélité"
              description="Cumulez des points à chaque collaboration et débloquez des avantages exclusifs."
              variant="primary"
            />
          </div>
        </div>
      </section>

      {/* Featured Entrepreneurs Section */}
      <FeaturedEntrepreneurs />

      {/* Solidarity Companies Showcase */}
      <SolidarityCompaniesShowcase />

      {/* Plans Section */}
      <section id="plans" className="py-28 px-4 relative overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/2 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[100px]" />

        <div className="container mx-auto max-w-5xl relative">
          <SectionHeader
            badge="Tarifs"
            badgeVariant="accent"
            title="Des offres adaptées à vos besoins"
            description="Choisissez le plan qui correspond à votre stade de développement et évoluez à votre rythme."
          />
          <div className="grid md:grid-cols-3 gap-6 lg:gap-8">
            <PricingCard
              name="Essentiel"
              price={27}
              features={[
                { text: "Accès au réseau solidaire" },
                { text: "Programme de points (x1)" },
                { text: "Support par email" },
              ]}
              ctaText="Choisir Essentiel"
              ctaHref="/register"
              checkVariant="accent"
            />
            <PricingCard
              name="Standard"
              price={97}
              isPopular
              features={[
                { text: "Tout Essentiel inclus" },
                { text: "2 sessions coaching/mois" },
                { text: "Programme de points (x2)" },
                { text: "Support prioritaire" },
              ]}
              ctaText="Choisir Standard"
              ctaHref="/register"
              checkVariant="primary"
            />
            <PricingCard
              name="Premium"
              price={197}
              features={[
                { text: "Tout Standard inclus" },
                { text: "Coaching illimité" },
                { text: "Programme de points (x3)" },
                { text: "Matching prioritaire" },
                { text: "Événements VIP" },
              ]}
              ctaText="Choisir Premium"
              ctaHref="/register"
              checkVariant="accent"
            />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
