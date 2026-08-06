import React from "react";
import { Link } from "react-router-dom";
import { Award, Factory, FlaskConical, ShieldCheck, ArrowRight } from "lucide-react";
import heroImage from "@/assets/images/hero-facility.jpg";
import labImage from "@/assets/images/lab-quality.jpg";
import { LinkButton } from "@/components/common/Button";
import { Section, SectionHeading } from "@/components/common/Section";
import ProductGrid from "@/components/products/ProductGrid";
import { company, highlights } from "@/data/company";
import { products } from "@/data/products";
import { certifications } from "@/data/site";

const icons = [Award, FlaskConical, ShieldCheck, Factory];

export function Home() {
  const featured = products.slice(0, 3);

  return (
    <>
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
            <p className="inline-flex rounded-full border border-primary-foreground/30 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-primary-foreground/90">
              WHO-GMP certified manufacturing
            </p>
            <h1 className="mt-5 text-3xl font-bold leading-tight text-primary-foreground md:text-5xl">
              {company.name}
            </h1>
            <p className="mt-5 text-base leading-relaxed text-primary-foreground/85 md:text-lg">{company.intro}</p>
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
            return (
              <div key={item.label} className="rounded-lg border border-border bg-card p-6 shadow-card">
                <Icon className="h-6 w-6 text-accent" />
                <p className="mt-4 font-display text-3xl font-bold text-primary">{item.value}</p>
                <p className="mt-1 font-display text-sm font-semibold text-card-foreground">{item.label}</p>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.detail}</p>
              </div>
            );
          })}
        </div>
      </Section>

      <Section muted>
        <div className="flex flex-wrap items-end justify-between gap-4">
          <SectionHeading
            eyebrow="Featured products"
            title="A formulary built around everyday clinical needs"
            description="From acute care antibiotics to daily nutraceuticals, each product is manufactured under validated processes."
          />
          <Link to="/products" className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
            View all products <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="mt-10">
          <ProductGrid products={featured} />
        </div>
      </Section>

      <Section>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-border">
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
            <ul className="mt-6 space-y-3">
              {["50 million units monthly capacity", "ISO Class 8 clean room areas", "Automated blister and strip packing", "Batch-level traceability and retention samples"].map(
                (item) => (
                  <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                    <ShieldCheck className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
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

      <Section muted>
        <div className="grid items-center gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading
              eyebrow="Quality assurance"
              title="Certified systems, documented at every step"
              description="Our quality management system is independently certified and audited, covering raw material qualification through to finished-goods release."
            />
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {certifications.slice(0, 4).map((cert) => (
                <div key={cert.id} className="rounded-md border border-border bg-card p-4">
                  <p className="font-display text-sm font-bold text-card-foreground">{cert.name}</p>
                  <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{cert.description}</p>
                </div>
              ))}
            </div>
            <LinkButton to="/quality" variant="outline" className="mt-8">
              Quality & certifications
            </LinkButton>
          </div>
          <div className="order-first overflow-hidden rounded-lg border border-border lg:order-last">
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
