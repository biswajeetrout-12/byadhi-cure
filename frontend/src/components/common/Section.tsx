import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function PageHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
}) {
  return (
    <section className="relative overflow-hidden border-b border-border">
      {/* Gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-background to-accent/6 pointer-events-none" />
      {/* Dot pattern overlay */}
      <div className="absolute inset-0 bg-dots opacity-50 pointer-events-none" />
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        {eyebrow ? (
          <span className="badge-primary mb-4 inline-flex">{eyebrow}</span>
        ) : null}
        <h1 className="mt-2 max-w-3xl text-3xl font-bold md:text-5xl text-gradient-primary">
          {title}
        </h1>
        {description ? (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-muted-foreground">
            {description}
          </p>
        ) : null}
      </div>
    </section>
  );
}

export function Section({
  children,
  className,
  muted = false,
  dots = false,
  grid = false,
}: {
  children: ReactNode;
  className?: string;
  muted?: boolean;
  dots?: boolean;
  grid?: boolean;
}) {
  return (
    <section className={cn("relative overflow-hidden", muted && "section-gradient", className)}>
      {dots && <div className="absolute inset-0 bg-dots opacity-60 pointer-events-none" />}
      {grid && <div className="absolute inset-0 bg-grid opacity-80 pointer-events-none" />}
      <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 md:py-20 lg:px-8">
        {children}
      </div>
    </section>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "left",
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center")}>
      {eyebrow ? (
        <span className="badge-accent inline-flex mb-3">{eyebrow}</span>
      ) : null}
      <h2 className="mt-2 text-2xl font-bold text-foreground md:text-3xl">{title}</h2>
      {description ? (
        <p className="mt-3 leading-relaxed text-muted-foreground">{description}</p>
      ) : null}
    </div>
  );
}
