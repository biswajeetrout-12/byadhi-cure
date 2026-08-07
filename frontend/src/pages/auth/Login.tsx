import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, UserPlus } from "lucide-react";
import { Button } from "@/components/common/Button";
import { company } from "@/data/company";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const fieldClass =
  "mt-1.5 w-full rounded-md border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/25";

export function Login() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password || (activeTab === "signup" && !name)) {
      toast.error("Please fill in all required fields.");
      return;
    }

    setIsSubmitting(true);
    try {
      if (activeTab === "signin") {
        const data = await login({ email, password });
        toast.success("Signed in successfully!");
        if (data.user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        const data = await register({ name, email, password });
        toast.success("Account created successfully!");
        if (data.user?.role === "admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      }
    } catch (err: any) {
      toast.error(err.message || "Authentication failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="mx-auto flex max-w-md flex-col justify-center px-4 py-20 sm:px-6">
      <div className="rounded-lg border border-border bg-card p-8 shadow-raised">
        <div className="flex justify-center mb-5">
          <span className="grid h-11 w-11 place-items-center rounded-md bg-primary-soft text-primary">
            {activeTab === "signin" ? <Lock className="h-5 w-5" /> : <UserPlus className="h-5 w-5" />}
          </span>
        </div>

        {/* Tab Buttons */}
        <div className="flex border-b border-border mb-6">
          <button
            type="button"
            className={`flex-1 pb-3 text-sm font-semibold transition-colors ${
              activeTab === "signin"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => {
              setActiveTab("signin");
              setEmail("");
              setPassword("");
              setName("");
            }}
          >
            Sign In
          </button>
          <button
            type="button"
            className={`flex-1 pb-3 text-sm font-semibold transition-colors ${
              activeTab === "signup"
                ? "border-b-2 border-primary text-primary"
                : "text-muted-foreground hover:text-foreground"
            }`}
            onClick={() => {
              setActiveTab("signup");
              setEmail("");
              setPassword("");
              setName("");
            }}
          >
            Sign Up
          </button>
        </div>

        <h1 className="font-display text-2xl font-bold text-card-foreground">
          {activeTab === "signin" ? "Welcome Back" : "Create Account"}
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          {activeTab === "signin"
            ? `Access your ${company.shortName} partner or administrator account.`
            : `Join ${company.shortName} as a registered healthcare partner.`}
        </p>

        <form className="mt-6 space-y-5" onSubmit={handleSubmit}>
          {activeTab === "signup" && (
            <label className="block text-sm font-medium text-card-foreground">
              Full name
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={fieldClass}
                placeholder="John Doe"
                required
              />
            </label>
          )}

          <label className="block text-sm font-medium text-card-foreground">
            Email address
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={fieldClass}
              placeholder="you@company.com"
              autoComplete="email"
              required
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
              autoComplete={activeTab === "signin" ? "current-password" : "new-password"}
              required
            />
          </label>

          {activeTab === "signin" && (
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-muted-foreground">
                <input type="checkbox" className="h-4 w-4 rounded border-input accent-primary" />
                Remember me
              </label>
              <Link to="/forgot-password" className="font-medium text-primary hover:underline">
                Forgot password?
              </Link>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? "Processing..." : activeTab === "signin" ? "Login" : "Register"}
          </Button>
        </form>

        <p className="mt-6 border-t border-border pt-5 text-xs text-muted-foreground text-center">
          {activeTab === "signin" ? (
            <>
              Administrator credentials seeded. Email:{" "}
              <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono">
                admin@byadhicurelab.com
              </code>
            </>
          ) : (
            "Self-registered accounts default to 'user' role."
          )}
        </p>
      </div>
    </section>
  );
}

export default Login;
