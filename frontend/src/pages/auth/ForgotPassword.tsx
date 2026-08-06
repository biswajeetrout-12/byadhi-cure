import React from "react";
import { Link } from "react-router-dom";
import { Link as LinkIcon } from "lucide-react";
import { Button, LinkButton } from "@/components/common/Button";

export function ForgotPassword() {
  return (
    <section className="mx-auto flex max-w-md flex-col justify-center px-4 py-20 sm:px-6">
      <div className="rounded-lg border border-border bg-card p-8 shadow-raised">
        <span className="grid h-11 w-11 place-items-center rounded-md bg-primary-soft text-primary">
          <LinkIcon className="h-5 w-5" />
        </span>
        <h1 className="mt-5 font-display text-2xl font-bold text-card-foreground">Reset password</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Enter your email address and we'll send you a link to reset your password.
        </p>

        <form className="mt-7 space-y-5" onSubmit={(e) => e.preventDefault()}>
          <label className="block text-sm font-medium text-card-foreground">
            Email address
            <input
              type="email"
              className="mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/25"
              placeholder="you@company.com"
              autoComplete="email"
            />
          </label>
          <Button type="submit" className="w-full">
            Send reset link
          </Button>
        </form>

        <p className="mt-6 border-t border-border pt-5 text-xs text-muted-foreground">
          Remember your password?{" "}
          <Link to="/login" className="font-medium text-primary hover:underline">
            Back to login
          </Link>
        </p>
      </div>
    </section>
  );
}

export default ForgotPassword;
