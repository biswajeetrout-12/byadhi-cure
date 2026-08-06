import React from "react";
import { BadgeCheck, FileCheck2 } from "lucide-react";
import { PageHeader, Section, SectionHeading } from "@/components/common/Section";
import { certifications, complianceItems, qualityPolicy } from "@/data/site";

export function Quality() {
  return (
    <>
      <PageHeader
        eyebrow="Quality & certifications"
        title="Certified systems you can audit"
        description="Quality is a documented system here, not a claim — from vendor approval through to finished-goods release."
      />

      <Section>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
          <SectionHeading eyebrow="Quality policy" title="Our commitment" />
          <ul className="space-y-4">
            {qualityPolicy.map((item) => (
              <li key={item} className="flex gap-3 rounded-lg border border-border bg-card p-5 text-sm leading-relaxed text-muted-foreground">
                <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Certifications" title="Independently certified operations" />
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {certifications.map((cert) => (
            <article key={cert.id} className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
              <div className="grid h-40 place-items-center border-b border-border bg-primary-soft">
                <FileCheck2 className="h-12 w-12 text-primary" />
              </div>
              <div className="p-5">
                <h3 className="font-display text-lg font-bold text-card-foreground">{cert.name}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{cert.description}</p>
                <p className="mt-4 text-xs uppercase tracking-[0.12em] text-muted-foreground">
                  {cert.issuer} · {cert.year}
                </p>
              </div>
            </article>
          ))}
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Regulatory compliance" title="Documentation and oversight" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2">
          {complianceItems.map((item) => (
            <div key={item.title} className="rounded-lg border border-border bg-background p-6">
              <h3 className="font-display text-base font-bold text-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Certificate gallery" title="Scanned certificates" description="Certificate images will be served from the media library once uploaded." />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {certifications.map((cert) => (
            <figure key={cert.id} className="overflow-hidden rounded-lg border border-border bg-card">
              <div className="grid aspect-[3/4] place-items-center bg-muted text-xs uppercase tracking-[0.14em] text-muted-foreground">
                Certificate image
              </div>
              <figcaption className="border-t border-border p-3 text-sm font-medium text-card-foreground">{cert.name}</figcaption>
            </figure>
          ))}
        </div>
      </Section>
    </>
  );
}

export default Quality;
