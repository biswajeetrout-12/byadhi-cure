import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Lock, UserPlus, Info, CheckCircle2, Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/common/Button";
import { company } from "@/data/company";
import { useAuth } from "@/context/AuthContext";
import { toast } from "sonner";

const fieldClass =
  "mt-1.5 w-full rounded-lg border border-input bg-background px-3.5 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20";

export function Login() {
  const [activeTab, setActiveTab] = useState<"signin" | "signup">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

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
        if (data.user?.role === "Admin") {
          navigate("/admin/dashboard");
        } else {
          navigate("/");
        }
      } else {
        const data = await register({ name, email, password });
        toast.success("Account created successfully!");
        if (data.user?.role === "Admin") {
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

  const handleGoogleSignIn = () => {
    toast.info("Google Sign-In is in demo mode. Auto-filling administrator credentials...");
    setEmail(import.meta.env['VITE_ADMIN_EMAIL'] || "");
    setPassword(import.meta.env['VITE_ADMIN_PASSWORD'] || "");
    setActiveTab("signin");
  };

  return (
    <div className="rounded-2xl border border-border/85 bg-card p-8 shadow-raised relative overflow-hidden">
      {/* Top brand-gradient line */}
      <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-primary via-blue-500 to-accent" />

      <div className="flex justify-center mb-6">
        <span className="grid h-12 w-12 place-items-center rounded-xl bg-primary-soft text-primary shadow-glow-primary">
          {activeTab === "signin" ? <Lock className="h-5.5 w-5.5" /> : <UserPlus className="h-5.5 w-5.5" />}
        </span>
      </div>

      {/* Tab Selectors */}
      <div className="flex bg-muted/60 p-1 rounded-xl mb-6">
        <button
          type="button"
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === "signin"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
            }`}
          onClick={() => {
            setActiveTab("signin");
            setEmail("");
            setPassword("");
            setName("");
            setShowPassword(false);
          }}
        >
          Sign In
        </button>
        <button
          type="button"
          className={`flex-1 py-2 text-sm font-semibold rounded-lg transition-all ${activeTab === "signup"
              ? "bg-card text-foreground shadow-sm"
              : "text-muted-foreground hover:text-foreground"
            }`}
          onClick={() => {
            setActiveTab("signup");
            setEmail("");
            setPassword("");
            setName("");
            setShowPassword(false);
          }}
        >
          Sign Up
        </button>
      </div>

      {/* Header Info */}
      <h1 className="font-display text-2xl font-bold text-foreground tracking-tight">
        {activeTab === "signin" ? "Welcome Back" : "Create Account"}
      </h1>
      <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
        {activeTab === "signin"
          ? `Access your ${company.shortName} partner or administrator account.`
          : `Join ${company.shortName} as a registered healthcare partner.`}
      </p>

      {/* Professional Callout: "If not registered, first register" */}
      {activeTab === "signin" ? (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-primary/20 bg-primary-soft/50 p-4 text-xs text-muted-foreground">
          <Info className="h-4.5 w-4.5 shrink-0 text-primary mt-0.5" />
          <div>
            <span className="font-bold text-foreground">New to Byadhi Cure?</span> If you do not have an active account yet, you must first register under the <button type="button" onClick={() => setActiveTab("signup")} className="font-bold text-primary underline hover:text-primary/80 transition-colors">Sign Up</button> tab to configure your partner access.
          </div>
        </div>
      ) : (
        <div className="mt-5 flex items-start gap-3 rounded-xl border border-accent/20 bg-accent-soft/40 p-4 text-xs text-muted-foreground">
          <CheckCircle2 className="h-4.5 w-4.5 shrink-0 text-accent mt-0.5" />
          <div>
            <span className="font-bold text-foreground">Partner Verification:</span> Submitting this registration form instantly configures a verified partner profile with default access status.
          </div>
        </div>
      )}

      {/* Third Party Auth */}
      <div className="mt-6">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-border/80 bg-card px-4 py-2.5 text-sm font-semibold text-foreground/80 shadow-sm transition-all hover:bg-muted/50 hover:border-primary/20"
        >
          <svg className="h-5 w-5" viewBox="0 0 24 24" width="24" height="24">
            <g transform="matrix(1, 0, 0, 1, 0, 0)">
              <path
                d="M21.35,11.1H12v2.7h5.38C17.11,14.88,16,16.5,14.28,17.22l2.36,1.83C18.02,17.75,21.35,14.65,21.35,11.1z"
                fill="#4285F4"
              />
              <path
                d="M12,20.4c2.7,0,4.96-0.89,6.61-2.42l-2.36-1.83c-0.65,0.44-1.49,0.7-2.42,0.7c-2.33,0-4.3-1.57-5-3.68l-2.43,1.88 C8.1,17.91,9.88,20.4,12,20.4z"
                fill="#34A853"
              />
              <path
                d="M7,13.17c-0.18-0.54-0.28-1.12-0.28-1.72c0-0.6,0.1-1.18,0.28-1.72L4.57,7.85C3.96,9.08,3.6,10.49,3.6,11.9 c0,1.41,0.36,2.82,0.97,4.05L7,13.17z"
                fill="#FBBC05"
              />
              <path
                d="M12,7.38c1.47,0,2.79,0.5,3.82,1.49l2.87-2.87C17.06,4.46,14.79,3.6,12,3.6C9.88,3.6,8.1,6.09,6.34,8.96 L8.77,10.84C9.47,8.73,11.44,7.38,12,7.38z"
                fill="#EA4335"
              />
            </g>
          </svg>
          Continue with Google
        </button>
      </div>

      <div className="relative my-6 flex items-center justify-center">
        <div className="absolute inset-x-0 h-px bg-border/60" />
        <span className="relative bg-card px-3.5 text-[11px] font-bold uppercase tracking-[0.14em] text-muted-foreground">
          Or use email
        </span>
      </div>

      {/* Main Form */}
      <form className="space-y-4" onSubmit={handleSubmit}>
        {activeTab === "signup" && (
          <label className="block text-sm font-semibold text-foreground/80">
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

        <label className="block text-sm font-semibold text-foreground/80">
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

        <label className="block text-sm font-semibold text-foreground/80">
          Password
          <div className="relative mt-1.5">
            <input
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg border border-input bg-background pl-3.5 pr-10 py-2.5 text-sm text-foreground outline-none transition-all placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/20"
              placeholder="••••••••"
              autoComplete={activeTab === "signin" ? "current-password" : "new-password"}
              required
            />
            <button
              type="button"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground focus:outline-none flex items-center justify-center"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? (
                <EyeOff className="h-4.5 w-4.5" />
              ) : (
                <Eye className="h-4.5 w-4.5" />
              )}
            </button>
          </div>
        </label>

        {activeTab === "signin" && (
          <div className="flex items-center justify-between text-sm pt-1">
            <label className="flex items-center gap-2 font-medium text-muted-foreground select-none cursor-pointer">
              <input type="checkbox" className="h-4.5 w-4.5 rounded border-input accent-primary cursor-pointer" />
              Remember me
            </label>
            <Link to="/forgot-password" className="font-semibold text-primary hover:underline">
              Forgot password?
            </Link>
          </div>
        )}

        <Button type="submit" className="w-full mt-2" disabled={isSubmitting}>
          {isSubmitting ? "Processing..." : activeTab === "signin" ? "Sign In" : "Create Account"}
        </Button>
      </form>

      {/* Helper text footer */}
      <p className="mt-6 border-t border-border/80 pt-5 text-[11px] text-muted-foreground text-center leading-relaxed">
        {activeTab === "signin" ? (
          <>
            Administrator credentials seeded:{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono font-bold">
              {import.meta.env['VITE_ADMIN_EMAIL'] || ""}
            </code>{" "}
            / Password:{" "}
            <code className="bg-muted px-1.5 py-0.5 rounded text-foreground font-mono font-bold">
              {import.meta.env['VITE_ADMIN_PASSWORD'] || ""}
            </code>
          </>
        ) : (
          "Self-registered partner accounts default to client-level verification."
        )}
      </p>
    </div>
  );
}

export default Login;
