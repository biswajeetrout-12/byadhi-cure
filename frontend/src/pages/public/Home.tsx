import React from "react";
import { Link } from "react-router-dom";
import { Award, Factory, FlaskConical, ShieldCheck, ArrowRight } from "lucide-react";
import heroImage from "@/assets/images/hero-facility.jpg";
import labImage from "@/assets/images/lab-quality.jpg";
import { LinkButton } from "@/components/common/Button";
import { Section, SectionHeading } from "@/components/common/Section";
import ProductGrid from "@/components/products/ProductGrid";
import { company as fallbackCompany, highlights } from "@/data/company";
import { certifications } from "@/data/site";
import { useProducts } from "@/hooks/useProducts";
import Loader from "@/components/common/Loader";
import { useCompany } from "@/hooks/useCompany";
import PageMetadata, { getSiteUrl } from "@/components/layout/PageMetadata";

const icons = [Award, FlaskConical, ShieldCheck, Factory];

export function Home() {
  const { data: productsList, isLoading } = useProducts();
  const { data: companyFromDb } = useCompany();
  const company = companyFromDb || fallbackCompany;
  const metadataName = companyFromDb?.name || "Byadhi Cure Lab Private Limited";
  const metadataDescription = companyFromDb?.seoDescription || companyFromDb?.intro || "Pharmaceutical manufacturing and healthcare products from Byadhi Cure Lab Private Limited.";
  const featured = productsList ? productsList.slice(0, 3) : [];

  return (
    <>
      <PageMetadata
        title={metadataName}
        description={metadataDescription}
        path="/"
        structuredData={[
          { "@context": "https://schema.org", "@type": "Organization", name: metadataName, url: `${getSiteUrl()}/` },
          { "@context": "https://schema.org", "@type": "WebSite", name: metadataName, url: `${getSiteUrl()}/` },
        ]}
      />
      <section className="relative isolate overflow-hidden">
        <img
          src={heroImage}
          alt="Pharmaceutical production line at the Byadhi Cure Lab facility"
          width={1600}
          height={1008}
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div className="hero-overlay absolute inset-0" />
        <div className="relative mx-auto max-w-7xl px-4 py-24 sm:px-6 md:py-32 lg:px-8">
          <div className="fade-up max-w-2xl">
            <p className="inline-flex rounded-full border border-white/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-white/90">
              WHO-GMP certified manufacturing
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-white md:text-5xl">
              {company.name}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-white/85 md:text-lg">{company.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <LinkButton to="/products" size="lg">
                Explore Products
              </LinkButton>
              <LinkButton to="/contact" variant="onDark" size="lg">
                Contact Us
              </LinkButton>
            </div>
          </div>
        </div>
      </section>

      <Section>
        <SectionHeading
          eyebrow="Company highlights"
          title="Built on consistency, compliance and capacity"
          description="Our facility, systems and people are structured around one objective — releasing every batch to specification, on time."
        />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((item, index) => {
            const Icon = icons[index % icons.length]!;
            const cardStyles = [
              { grad: "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30", border: "border-blue-200/50 dark:border-blue-800/40", bar: "bg-gradient-to-r from-blue-400 to-blue-600", iconBg: "bg-blue-100 dark:bg-blue-900/40", iconCol: "text-blue-500 dark:text-blue-400", valCol: "text-blue-600 dark:text-blue-400" },
              { grad: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30", border: "border-emerald-200/50 dark:border-emerald-800/40", bar: "bg-gradient-to-r from-emerald-400 to-teal-500", iconBg: "bg-emerald-100 dark:bg-emerald-900/40", iconCol: "text-emerald-500 dark:text-emerald-400", valCol: "text-emerald-600 dark:text-emerald-400" },
              { grad: "from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30", border: "border-violet-200/50 dark:border-violet-800/40", bar: "bg-gradient-to-r from-violet-400 to-purple-500", iconBg: "bg-violet-100 dark:bg-violet-900/40", iconCol: "text-violet-500 dark:text-violet-400", valCol: "text-violet-600 dark:text-violet-400" },
              { grad: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30", border: "border-amber-200/50 dark:border-amber-800/40", bar: "bg-gradient-to-r from-amber-400 to-orange-500", iconBg: "bg-amber-100 dark:bg-amber-900/40", iconCol: "text-amber-500 dark:text-amber-400", valCol: "text-amber-600 dark:text-amber-400" },
            ];
            const s = cardStyles[index % cardStyles.length]!;
            return (
              <div key={item.label} className={`relative overflow-hidden rounded-2xl border bg-gradient-to-br ${s.grad} ${s.border} p-6 shadow-card card-hover`}>
                {/* Top accent bar */}
                <div className={`absolute top-0 left-0 right-0 h-0.5 ${s.bar}`} />
                <div className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${s.iconBg}`}>
                  <Icon className={`h-5 w-5 ${s.iconCol}`} />
                </div>
                <p className={`mt-4 font-display text-3xl font-bold ${s.valCol}`}>{item.value}</p>
                <p className="mt-1 font-display text-sm font-semibold text-foreground/80">{item.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section muted dots>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Featured products"
            title="A formulary built around everyday clinical needs"
            description="From acute care antibiotics to daily nutraceuticals, each product is manufactured under validated processes."
          />
          <Link to="/products" className="inline-flex items-center gap-1.5 rounded-lg border border-primary/30 bg-primary/8 px-4 py-2 text-sm font-semibold text-primary transition-all hover:bg-primary hover:text-primary-foreground">
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <Loader size="lg" />
            </div>
          ) : (
            <ProductGrid products={featured} />
          )}
        </div>
      </Section>

      <Section dots>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-2xl border border-border/60 shadow-raised">
            <img
              src={heroImage}
              alt="Automated tablet packing line"
              loading="lazy"
              width={1600}
              height={1008}
              className="h-full w-full object-cover"
            />
          </div>
          <div>
            <SectionHeading
              eyebrow="Manufacturing"
              title="Eight production lines under one controlled roof"
              description="Segregated blocks for oral solids, liquid orals and external preparations, supported by validated HVAC, purified water systems and in-process quality checks at every stage."
            />
            <ul className="mt-6 space-y-2">
              {["2 million units monthly capacity", "ISO Class 8 clean room areas", "Automated blister and strip packing", "Batch-level traceability and retention samples"].map(
                (item) => (
                  <li key={item} className="flex items-center gap-3 rounded-lg bg-accent-soft/60 px-4 py-2.5 text-sm text-foreground/80">
                    <ShieldCheck className="h-4 w-4 shrink-0 text-accent" />
                    {item}
                  </li>
                ),
              )}
            </ul>
            <LinkButton to="/manufacturing" variant="outline" className="mt-8">
              View manufacturing
            </LinkButton>
          </div>
        </div>
      </Section>

      <Section muted grid>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Quality assurance"
              title="Certified systems, documented at every step"
              description="Our quality management system is independently certified and audited, covering raw material qualification through to finished-goods release."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {certifications.slice(0, 4).map((cert, i) => {
                const certColors = [
                  "border-l-blue-400 from-blue-50/60 dark:from-blue-950/20",
                  "border-l-emerald-400 from-emerald-50/60 dark:from-emerald-950/20",
                  "border-l-violet-400 from-violet-50/60 dark:from-violet-950/20",
                  "border-l-amber-400 from-amber-50/60 dark:from-amber-950/20",
                ];
                return (
                  <div key={cert.id} className={`rounded-xl border-l-2 border border-border bg-gradient-to-br to-card/80 p-4 shadow-card ${certColors[i % certColors.length]}`}>
                    <p className="font-display text-sm font-bold text-card-foreground">{cert.name}</p>
                    <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{cert.description}</p>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="order-first overflow-hidden rounded-2xl border border-border/60 shadow-raised lg:order-last">
            <img
              src={labImage}
              alt="Quality control analyst working in the laboratory"
              loading="lazy"
              width={1400}
              height={1000}
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Section>
    </>
  );
}

export default Home;
