import React from "react";
import directorImage from "@/assets/images/director.jpg";
import { PageHeader, Section, SectionHeading } from "@/components/common/Section";
import { company, director, infrastructure, mission, timeline, values, vision } from "@/data/company";

export function About() {
  return (
    <>
      <PageHeader
        eyebrow="About us"
        title="A pharmaceutical company built around quality"
        description={company.intro}
      />

      <Section>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-lg border border-border bg-card p-7 shadow-card">
            <p className="eyebrow">Our mission</p>
            <p className="mt-3 leading-relaxed text-card-foreground">{mission}</p>
          </div>
          <div className="rounded-lg border border-border bg-card p-7 shadow-card">
            <p className="eyebrow">Our vision</p>
            <p className="mt-3 leading-relaxed text-card-foreground">{vision}</p>
          </div>
        </div>

        <div className="mt-14">
          <SectionHeading eyebrow="Our values" title="Principles that govern our operations" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((value) => (
              <div key={value.title} className="rounded-lg border border-border bg-background p-6">
                <h3 className="font-display text-base font-bold text-foreground">{value.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{value.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Leadership" title="A message from our Director" />
        <div className="mt-10 grid gap-0 overflow-hidden rounded-lg border border-border bg-card shadow-card md:grid-cols-[minmax(0,20rem)_minmax(0,1fr)]">
          <img
            src={directorImage}
            alt={`${director.name}, ${director.designation}`}
            loading="lazy"
            width={900}
            height={1100}
            className="h-full w-full object-cover"
          />
          <div className="p-7 md:p-10">
            <h3 className="font-display text-2xl font-bold text-card-foreground">{director.name}</h3>
            <p className="mt-1 text-sm font-semibold uppercase tracking-[0.14em] text-accent">{director.designation}</p>
            <p className="mt-5 leading-relaxed text-muted-foreground">{director.bio}</p>
            <blockquote className="mt-6 border-l-2 border-accent pl-5 font-display text-lg italic leading-relaxed text-card-foreground">
              “{director.message}”
            </blockquote>
          </div>
        </div>
      </Section>

      <Section>
        <SectionHeading eyebrow="Company journey" title="Milestones since 2023" />
        <ol className="mt-10 space-y-0 border-l border-border pl-6">
          {timeline.map((item) => (
            <li key={item.year} className="relative pb-9 last:pb-0">
              <span className="absolute -left-[1.9rem] top-1.5 grid h-3 w-3 place-items-center rounded-full bg-accent ring-4 ring-background" />
              <p className="font-display text-sm font-bold text-primary">{item.year}</p>
              <h3 className="mt-1 font-display text-lg font-bold text-foreground">{item.title}</h3>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Infrastructure" title="Facilities that support consistent output" />
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {infrastructure.map((item) => (
            <div key={item.title} className="rounded-lg border border-border bg-card p-6">
              <h3 className="font-display text-base font-bold text-card-foreground">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}

export default About;
