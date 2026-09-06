import React from "react";
import heroImage from "@/assets/images/hero-facility.jpg";
import labImage from "@/assets/images/lab-quality.jpg";
import { PageHeader, Section, SectionHeading } from "@/components/common/Section";
import { capabilities, equipment, processSteps, safetyStandards } from "@/data/site";
import PageMetadata from "@/components/layout/PageMetadata";

export function Manufacturing() {
  return (
    <>
      <PageMetadata
        title="Pharmaceutical Manufacturing | Byadhi Cure Lab"
        description="Explore the controlled pharmaceutical manufacturing processes, quality systems and production capabilities at Byadhi Cure Lab."
        path="/manufacturing"
      />
      <PageHeader
        eyebrow="Manufacturing"
        title="Controlled processes, repeatable quality"
        description="Our plant is designed around segregation, cleanliness and documented control at every stage of production."
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <img
            src={heroImage}
            alt="Tablet production line inside the manufacturing block"
            loading="lazy"
            width={1600}
            height={1008}
            className="h-72 w-full rounded-lg border border-border object-cover md:h-96"
          />
          <img
            src={labImage}
            alt="Quality control laboratory testing samples"
            loading="lazy"
            width={1400}
            height={1000}
            className="h-72 w-full rounded-lg border border-border object-cover md:h-96"
          />
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Production process" title="From raw material to released batch" />
        <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {processSteps.map((step) => (
            <div key={step.step} className="rounded-lg border border-border bg-card p-6">
              <p className="font-display text-sm font-bold text-accent">{step.step}</p>
              <h3 className="mt-2 font-display text-lg font-bold text-card-foreground">{step.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{step.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <div className="grid gap-10 lg:grid-cols-2">
          <div>
            <SectionHeading eyebrow="Equipment" title="Machinery and instrumentation" />
            <ul className="mt-6 space-y-3">
              {equipment.map((item) => (
                <li key={item} className="flex gap-3 border-b border-border pb-3 text-sm text-muted-foreground last:border-0">
                  <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
          <div>
            <SectionHeading eyebrow="Quality control" title="Testing at every checkpoint" />
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Incoming raw materials are quarantined and sampled before release. In-process checks cover weight variation,
              hardness, friability, disintegration and fill volume. Finished goods undergo assay, dissolution and
              microbiological testing, and retention samples are held with accelerated and real-time stability data.
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {["Raw material testing", "In-process checks", "Finished goods analysis", "Stability studies"].map((item) => (
                <div key={item} className="rounded-md border border-border bg-secondary/50 p-4 text-sm font-medium text-foreground">
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Safety standards" title="Protecting people, product and environment" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {safetyStandards.map((item) => (
            <div key={item.title} className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-display text-base font-bold text-card-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Capabilities" title="Dosage forms we manufacture" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {capabilities.map((item) => (
            <div key={item.title} className="rounded-lg border border-border bg-background p-6">
              <h3 className="font-display text-base font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

export default Manufacturing;
