import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Lock } from "lucide-react";
import { Button } from "@/components/common/Button";
import { company } from "@/data/company";

const fieldClass =
  "mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/25";

export function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <section className="mx-auto flex max-w-md flex-col justify-center px-4 py-20 sm:px-6">
      <div className="rounded-lg border border-border bg-card p-8 shadow-raised">
        <span className="grid h-11 w-11 place-items-center rounded-md bg-primary-soft text-primary">
          <Lock className="h-5 w-5" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-bold text-card-foreground">Sign in</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Access your {company.shortName} partner or administrator account.
        </p>

        <form className="mt-7 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <label className="block text-sm font-medium text-card-foreground">
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
              placeholder="you@company.com"
              autoComplete="email"
            />
          </label>
          <label className="block text-sm font-medium text-card-foreground">
            Password
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={fieldClass}
              placeholder="••••••••"
              autoComplete="current-password"
            />
          </label>
          <div className="flex items-center justify-between text-sm">
            <label className="flex items-center gap-2 text-muted-foreground">
              <input type="checkbox" className="h-4 w-4 rounded border-input accent-primary" />
              Remember me
            </label>
            <Link to="/forgot-password" className="font-medium text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
          <Button type="submit" className="w-full">
            Login
          </Button>
        </form>

        <p className="mt-6 border-t border-border pt-5 text-xs text-muted-foreground">
          Authentication will support customer and superadmin roles once the backend is connected. Admin preview:{" "}
          <Link to="/admin/dashboard" className="font-medium text-primary hover:underline">
            open dashboard UI
          </Link>
          .
        </p>
      </div>
    </section>
  );
}

export default Login;
