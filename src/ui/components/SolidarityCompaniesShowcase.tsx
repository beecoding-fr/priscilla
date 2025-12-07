import { Building2, Plus } from "lucide-react";

const solidarityCompanies = [
  { id: 1, name: "BioLocal", sector: "Distribution alimentaire" },
  { id: 2, name: "EcoConstruct", sector: "BTP durable" },
  { id: 3, name: "SolidariTech", sector: "Services numériques" },
  { id: 4, name: "VertHorizon", sector: "Énergies renouvelables" },
  { id: 5, name: "InsertPro", sector: "Insertion professionnelle" },
  { id: 6, name: "CarePartners", sector: "Aide à la personne" },
  { id: 7, name: "CircularHub", sector: "Économie circulaire" },
  { id: 8, name: "FairTrade+", sector: "Commerce équitable" },
];

export function SolidarityCompaniesShowcase() {
  return (
    <section className="py-24 px-4 bg-muted/20 border-y border-border/50">
      <div className="container mx-auto max-w-5xl">
        <div className="text-center mb-12">
          <span className="inline-block px-3.5 py-1 mb-5 text-xs font-semibold uppercase tracking-wider rounded-full bg-primary/8 text-primary border border-primary/15">
            Partenaires
          </span>
          <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground">
            Ils font confiance à notre réseau solidaire
          </h2>
        </div>

        {/* Logo Grid */}
        <div className="flex flex-wrap justify-center items-center gap-4 md:gap-6">
          {solidarityCompanies.map((company) => (
            <div
              key={company.id}
              className="group flex flex-col items-center gap-2.5 p-4 rounded-xl hover:bg-background transition-all duration-200"
            >
              {/* Placeholder Logo */}
              <div className="w-14 h-14 md:w-16 md:h-16 rounded-xl bg-background border border-border/50 flex items-center justify-center group-hover:border-primary/20 group-hover:shadow-sm transition-all duration-200">
                <span className="text-xl md:text-2xl font-bold text-gradient">
                  {company.name.charAt(0)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-medium group-hover:text-foreground transition-colors">
                {company.name}
              </span>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-sm text-muted-foreground mb-5">
            Et plus de{" "}
            <span className="font-semibold text-foreground">
              150+ entreprises solidaires
            </span>{" "}
            dans notre réseau
          </p>
          <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary/8 hover:bg-primary/12 text-primary text-sm font-medium border border-primary/15 transition-colors">
            <Plus className="w-4 h-4" />
            Rejoindre le réseau
          </button>
        </div>
      </div>
    </section>
  );
}
