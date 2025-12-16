import Link from "next/link";
import { Button } from "@priscilla/ui/button";
import { Card } from "@priscilla/ui/card";
import { Footer } from "@priscilla/ui/footer";
import {
  Sparkles,
  ArrowRight,
  Target,
  TrendingUp,
  Users,
  Briefcase,
  Award,
  Linkedin,
  Mail,
  CheckCircle2,
} from "lucide-react";

export default function AboutPage() {
  const expertise = [
    {
      icon: <TrendingUp className="w-6 h-6" />,
      title: "Stratégie de croissance",
      description:
        "Analyse de l'environnement et structuration de stratégies commerciales efficaces.",
    },
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Développement d'activité",
      description:
        "Mise en place d'actions concrètes sur le terrain pour booster la croissance.",
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Accompagnement des dirigeants",
      description:
        "Partenaire de confiance présente du diagnostic à la mise en œuvre opérationnelle.",
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Optimisation & Transmission",
      description:
        "Optimisation de la rémunération et préparation à la transmission d'entreprise.",
    },
  ];

  const values = [
    "Vision globale du développement d'activité",
    "Compréhension concrète des enjeux dirigeants",
    "Passion pour la relation client",
    "Motivation par les défis business",
  ];

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative py-28 md:py-36 px-4 overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-primary/3 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/4 rounded-full blur-[120px]" />
        <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(0,0,0,0.015)_1px,transparent_1px)] bg-size-[60px_60px]" />

        <div className="container mx-auto max-w-5xl relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary/5 text-primary border border-primary/10">
                <Sparkles className="w-4 h-4" />
                <span>Fondatrice</span>
              </div>

              <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6 leading-[1.1]">
                Priscillia
                <span className="block text-gradient mt-2">Duhin</span>
              </h1>

              <p className="text-lg text-muted-foreground mb-4 font-medium">
                Experte en Développement d'Activité
              </p>

              <p className="text-muted-foreground mb-8 leading-relaxed">
                Stratégie de croissance & commerciale • Accompagnement des
                dirigeants • Optimisation de la rémunération • Préparation à la
                transmission d'entreprise
              </p>

              <div className="flex flex-wrap gap-4">
                <Link
                  href="https://www.linkedin.com/in/priscillia-duhin/"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button
                    variant="outline"
                    className="rounded-xl h-11 px-6 group"
                  >
                    <Linkedin className="w-4 h-4 mr-2" />
                    LinkedIn
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button className="rounded-xl h-11 px-6 shadow-md shadow-primary/20 group">
                    Me contacter
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>

            {/* Profile Image Placeholder */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="w-72 h-72 md:w-80 md:h-80 rounded-3xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center border border-border/50 shadow-xl shadow-primary/5">
                  <div className="w-64 h-64 md:w-72 md:h-72 rounded-2xl bg-muted/50 flex items-center justify-center">
                    <span className="text-8xl font-bold text-gradient">PD</span>
                  </div>
                </div>
                {/* Decorative badge */}
                <div className="absolute -bottom-4 -right-4 bg-card border border-border/50 rounded-2xl px-4 py-3 shadow-lg">
                  <div className="flex items-center gap-2">
                    <Target className="w-5 h-5 text-primary" />
                    <span className="text-sm font-medium">
                      10+ ans d'expérience
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-28 px-4 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-accent/10 text-accent border border-accent/20">
              <Users className="w-4 h-4" />
              <span>Mon parcours</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Une vision globale du développement
            </h2>
          </div>

          <Card className="p-8 md:p-10 border border-border/50 shadow-xl shadow-primary/5 bg-card/80 backdrop-blur-sm">
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                J'ai choisi de construire un{" "}
                <span className="text-foreground font-medium">
                  parcours varié
                </span>{" "}
                afin d'acquérir des compétences complémentaires en{" "}
                <span className="text-foreground font-medium">
                  stratégie commerciale, finance et accompagnement des
                  entreprises
                </span>
                .
              </p>
              <p>
                Chaque expérience a enrichi ma vision globale du développement
                d'activité et m'a permis de{" "}
                <span className="text-foreground font-medium">
                  comprendre concrètement les enjeux des dirigeants
                </span>
                .
              </p>
              <p>
                Aujourd'hui, j'aide les entreprises à{" "}
                <span className="text-foreground font-medium">
                  analyser leur environnement
                </span>
                ,{" "}
                <span className="text-foreground font-medium">
                  structurer leur stratégie
                </span>{" "}
                et{" "}
                <span className="text-foreground font-medium">
                  mettre en place des actions concrètes
                </span>{" "}
                sur le terrain pour booster leur croissance.
              </p>
              <p>
                Passionnée par la relation client et motivée par les défis
                business, j'aime être un{" "}
                <span className="text-foreground font-medium">
                  partenaire de confiance
                </span>{" "}
                présent aux côtés des dirigeants, du diagnostic à la mise en
                œuvre opérationnelle.
              </p>
            </div>
          </Card>
        </div>
      </section>

      {/* Expertise Section */}
      <section className="py-28 px-4">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-primary/5 text-primary border border-primary/10">
              <Award className="w-4 h-4" />
              <span>Expertise</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Domaines d'intervention
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Des compétences complémentaires au service de votre réussite
              entrepreneuriale.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {expertise.map((item, index) => (
              <Card
                key={index}
                className="p-6 border border-border/50 hover:border-border transition-colors shadow-xl shadow-primary/5 bg-card/80 backdrop-blur-sm group"
              >
                <div className="flex gap-5">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold mb-2">{item.title}</h3>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-28 px-4 bg-muted/20">
        <div className="container mx-auto max-w-4xl">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 mb-6 text-sm font-medium rounded-full bg-accent/10 text-accent border border-accent/20">
              <Target className="w-4 h-4" />
              <span>Ce qui me définit</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-4">Mes valeurs</h2>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {values.map((value, index) => (
              <div
                key={index}
                className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border/50 shadow-lg"
              >
                <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0" />
                <span className="font-medium">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-28 px-4 relative overflow-hidden">
        <div className="absolute top-0 left-1/4 w-[600px] h-[600px] bg-primary/2 rounded-full blur-[100px]" />
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-accent/3 rounded-full blur-[100px]" />

        <div className="container mx-auto max-w-3xl text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Prêt à développer votre activité ?
          </h2>
          <p className="text-lg text-muted-foreground mb-10 max-w-xl mx-auto">
            Rejoignez la plateforme et bénéficiez d'un accompagnement
            personnalisé pour accélérer votre croissance.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/#plans">
              <Button
                size="lg"
                className="text-base px-8 h-13 rounded-xl shadow-lg shadow-primary/20 hover:shadow-xl hover:shadow-primary/25 transition-all duration-300 group"
              >
                Commencer maintenant
                <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            {/* <Link href="/#plans">
              <Button
                size="lg"
                variant="ghost"
                className="text-base px-8 h-13 rounded-xl text-muted-foreground hover:text-foreground"
              >
                Voir les offres
              </Button>
            </Link> */}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
