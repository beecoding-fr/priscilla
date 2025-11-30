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
    <section className="py-16 px-4 bg-muted/30 border-y">
      <div className="container mx-auto">
        <h2 className="text-xl font-semibold text-center text-muted-foreground mb-8">
          Ils font confiance à notre réseau d&apos;entreprises solidaires
        </h2>

        {/* Logo Grid */}
        <div className="flex flex-wrap justify-center items-center gap-8 md:gap-12">
          {solidarityCompanies.map((company) => (
            <div
              key={company.id}
              className="flex flex-col items-center gap-2 opacity-70 hover:opacity-100 transition-opacity cursor-default"
            >
              {/* Placeholder Logo */}
              <div className="w-16 h-16 md:w-20 md:h-20 rounded-lg bg-background border-2 border-muted flex items-center justify-center shadow-sm">
                <span className="text-2xl md:text-3xl font-bold text-primary/60">
                  {company.name.charAt(0)}
                </span>
              </div>
              <span className="text-xs text-muted-foreground font-medium">
                {company.name}
              </span>
            </div>
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Et plus de{" "}
          <span className="font-semibold text-foreground">
            150+ entreprises solidaires
          </span>{" "}
          partenaires
        </p>
      </div>
    </section>
  );
}
