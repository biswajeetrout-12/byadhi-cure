import React from "react";
import { Button } from "@/components/common/Button";

const fieldClass =
  "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/25";

export function Settings() {
  return (
    <div className="grid max-w-4xl gap-6 lg:grid-cols-2">
      <form className="rounded-lg border border-border bg-card p-6 shadow-card" onSubmit={(e) => e.preventDefault()}>
        <h2 className="font-display text-lg font-bold text-card-foreground">Account</h2>
        <label className="mt-5 block text-sm font-medium text-card-foreground">
          Display name
          <input className={fieldClass} defaultValue="Tuna Swain" />
        </label>
        <label className="mt-4 block text-sm font-medium text-card-foreground">
          Email
          <input className={fieldClass} defaultValue="[EMAIL_ADDRESS]" />
        </label>
        <Button type="submit" className="mt-6">
          Update account
        </Button>
      </form>

      <form className="rounded-lg border border-border bg-card p-6 shadow-card" onSubmit={(e) => e.preventDefault()}>
        <h2 className="font-display text-lg font-bold text-card-foreground">Security</h2>
        <label className="mt-5 block text-sm font-medium text-card-foreground">
          Current password
          <input type="password" className={fieldClass} placeholder="••••••••" />
        </label>
        <label className="mt-4 block text-sm font-medium text-card-foreground">
          New password
          <input type="password" className={fieldClass} placeholder="••••••••" />
        </label>
        <Button type="submit" variant="outline" className="mt-6">
          Change password
        </Button>
      </form>
    </div>
  );
}

export default Settings;
