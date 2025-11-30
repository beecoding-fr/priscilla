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
    <section className="py-20 px-4 bg-gradient-to-b from-muted/30 to-background border-y">
      <div className="container mx-auto">
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1.5 mb-4 text-sm font-medium rounded-full bg-primary/10 text-primary">
            Partenaires
          </span>
          <h2 className="text-xl md:text-2xl font-semibold text-muted-foreground mb-2">
            Ils font confiance à notre réseau d&apos;entreprises solidaires
          </h2>
        </div>

        {/* Logo Grid */}
        <div className="flex flex-wrap justify-center items-center gap-6 md:gap-10 max-w-4xl mx-auto">
          {solidarityCompanies.map((company) => (
            <div
              key={company.id}
              className="group flex flex-col items-center gap-2 p-4 rounded-2xl hover:bg-muted/50 transition-all duration-300"
            >
              {/* Placeholder Logo */}
              <div className="w-16 h-16 md:w-18 md:h-18 rounded-2xl bg-gradient-to-br from-background to-muted border-2 border-border/50 flex items-center justify-center shadow-sm group-hover:shadow-md group-hover:border-primary/30 group-hover:scale-105 transition-all duration-300">
                <span className="text-2xl md:text-3xl font-bold text-gradient">
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
          <p className="text-sm text-muted-foreground mb-4">
            Et plus de{" "}
            <span className="font-semibold text-foreground">
              150+ entreprises solidaires
            </span>{" "}
            partenaires
          </p>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-accent/10 text-accent text-sm font-medium">
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 6v6m0 0v6m0-6h6m-6 0H6"
              />
            </svg>
            Rejoindre le réseau
          </div>
        </div>
      </div>
    </section>
  );
}
