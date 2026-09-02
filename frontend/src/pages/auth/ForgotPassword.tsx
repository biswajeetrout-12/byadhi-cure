import React from "react";
import { Link } from "react-router-dom";
import { Link as LinkIcon, ArrowLeft } from "lucide-react";
import { Button } from "@/components/common/Button";

export function ForgotPassword() {
  return (
    <div className="rounded-2xl border border-border/80 bg-card p-8 shadow-raised relative overflow-hidden">
      {/* Top subtle decoration line */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent" />

      <span className="grid h-11 w-11 place-items-center rounded-xl bg-primary-soft text-primary shadow-glow-primary">
        <LinkIcon className="h-5 w-5" />
      </span>
      <h1 className="mt-5 font-display text-2xl font-bold text-foreground">Reset password</h1>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
        Enter your email address and we'll send you a link to reset your password.
      </p>

      <form className="mt-7 space-y-5" onSubmit={(e) => e.preventDefault()}>
        <label className="block text-sm font-semibold text-foreground/80">
          Email address
          <input
            type="email"
            className="mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20"
            autoComplete="email"
            required
          />
        </label>
        <Button type="submit" className="w-full">
          Send reset link
        </Button>
      </form>

      <p className="mt-6 border-t border-border/80 pt-5 text-xs text-muted-foreground flex items-center justify-center gap-2">
        <ArrowLeft className="h-3.5 w-3.5" />
        Remember your password?{" "}
        <Link to="/login" className="font-semibold text-primary hover:underline">
          Back to login
        </Link>
      </p>
    </div>
  );
}

export default ForgotPassword;
