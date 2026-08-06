import React from "react";
import { Button } from "@/components/common/Button";
import { company } from "@/data/company";

const fieldClass =
  "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/25";

export function Company() {
  return (
    <form
      className="max-w-3xl rounded-lg border border-border bg-card p-6 shadow-card"
      onSubmit={(event) => event.preventDefault()}
    >
      <h2 className="font-display text-lg font-bold text-card-foreground">Company information</h2>
      <p className="mt-1 text-sm text-muted-foreground">These values populate the public website content.</p>

      <div className="mt-6 grid gap-5 md:grid-cols-2">
        <label className="text-sm font-medium text-card-foreground md:col-span-2">
          Company name
          <input className={fieldClass} defaultValue={company.name} />
        </label>
        <label className="text-sm font-medium text-card-foreground md:col-span-2">
          Introduction
          <textarea rows={4} className={fieldClass} defaultValue={company.intro} />
        </label>
        <label className="text-sm font-medium text-card-foreground">
          Phone
          <input className={fieldClass} defaultValue={company.phone} />
        </label>
        <label className="text-sm font-medium text-card-foreground">
          Email
          <input className={fieldClass} defaultValue={company.email} />
        </label>
        <label className="text-sm font-medium text-card-foreground md:col-span-2">
          Address
          <textarea
            rows={3}
            className={fieldClass}
            defaultValue={`${company.address.line1}, ${company.address.line2}, ${company.address.city} ${company.address.postalCode}`}
          />
        </label>
      </div>

      <Button type="submit" className="mt-6">
        Save changes
      </Button>
    </form>
  );
}

export default Company;
