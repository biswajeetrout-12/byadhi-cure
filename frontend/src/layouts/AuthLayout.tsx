import { Link, Outlet } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { company } from "@/data/company";
import { useCompany } from "@/hooks/useCompany";
import logo from "@/assets/logos/logo.png";

export function AuthLayout() {
  const { data: companyFromDb } = useCompany();
  const activeCompany = companyFromDb || company;

  return (
    <div className="relative min-h-screen flex flex-col justify-center items-center py-12 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-primary/5 via-background to-accent/5 overflow-hidden">
      {/* Background patterns */}
      <div className="absolute inset-0 bg-grid opacity-30 pointer-events-none" />
      <div className="absolute inset-0 bg-dots opacity-40 pointer-events-none" />
      
      {/* Dynamic light glows */}
      <div className="absolute top-1/4 left-1/4 h-72 w-72 rounded-full bg-primary/10 blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 h-72 w-72 rounded-full bg-accent/10 blur-3xl pointer-events-none" />

      {/* Floating Header Actions */}
      <div className="absolute top-6 left-6 sm:left-8 z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 rounded-lg border border-border/80 bg-card/60 backdrop-blur-md px-4.5 py-2 text-sm font-semibold text-foreground/80 shadow-sm transition-all hover:bg-card hover:text-primary hover:border-primary/30"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Home
        </Link>
      </div>

      <div className="relative w-full max-w-md z-10">
        {/* Brand Header */}
        <div className="flex flex-col items-center mb-8 text-center">
          <Link to="/" className="flex items-center gap-2.5 mb-2 hover:opacity-90 transition-opacity">
            <img
              src={logo}
              alt="Byadhi Cure Lab Logo"
              className="h-10 w-10 shrink-0 rounded-full object-cover"
            />
            <div className="text-left">
              <span className="block font-display text-base font-bold leading-tight text-foreground">
                {activeCompany.shortName}
              </span>
              <span className="block text-[10px] uppercase tracking-[0.18em] text-muted-foreground">
                Private Limited
              </span>
            </div>
          </Link>
        </div>

        {/* Auth Page Content */}
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
