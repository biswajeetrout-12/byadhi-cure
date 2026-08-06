import React from "react";
import { FileCheck2, Pencil, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/common/Button";
import { certifications } from "@/data/site";

export function Certifications() {
  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button>
          <Plus className="h-4 w-4" />
          Add certification
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {certifications.map((cert) => (
          <article key={cert.id} className="rounded-lg border border-border bg-card p-5 shadow-card">
            <div className="grid grid-cols-[auto_minmax(0,1fr)] items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-md bg-primary-soft text-primary">
                <FileCheck2 className="h-5 w-5" />
              </span>
              <h2 className="truncate font-display text-base font-bold text-card-foreground">{cert.name}</h2>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{cert.description}</p>
            <p className="mt-3 text-xs uppercase tracking-[0.12em] text-muted-foreground">
              {cert.issuer} · {cert.year}
            </p>
            <div className="mt-4 flex gap-2">
              <button type="button" className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-primary">
                <Pencil className="h-3.5 w-3.5" /> Edit
              </button>
              <button type="button" className="inline-flex items-center gap-1.5 rounded-md border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:text-destructive">
                <Trash2 className="h-3.5 w-3.5" /> Delete
              </button>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

export default Certifications;
