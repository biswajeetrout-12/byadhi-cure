import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { company } from "@/data/company";
import { LinkButton } from "./Button";
import { cn } from "@/lib/utils";
import logo from "@/assets/logos/logo.png";

const navItems = [
  { label: "Home", to: "/" },
  { label: "About Us", to: "/about" },
  { label: "Products", to: "/products" },
  { label: "Manufacturing", to: "/manufacturing" },
  { label: "Contact Us", to: "/contact" },
] as const;

function Logo() {
  return (
    <img
      src={logo}
      alt="Byadhi Cure Lab Logo"
      className="h-11 w-11 shrink-0 rounded-full object-cover"
    />
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const linkBase =
    "rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-background/95 backdrop-blur">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <Logo />
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-bold leading-tight text-foreground sm:text-lg">
              {company.shortName}
            </span>
            <span className="block truncate text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Private Limited
            </span>
          </span>
        </Link>

        <nav className="hidden items-center gap-0.5 xl:flex">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              className={({ isActive }) =>
                cn(linkBase, isActive && "text-primary bg-primary-soft")
              }
            >
              {item.label}
            </NavLink>
          ))}
          <LinkButton to="/login" variant="primary" size="sm" className="ml-3">
            Login
          </LinkButton>
        </nav>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          className="grid h-11 w-11 place-items-center rounded-md border border-border text-foreground xl:hidden"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-[max-height] duration-300 xl:hidden",
          open ? "max-h-[32rem]" : "max-h-0",
        )}
      >
        <nav className="flex flex-col gap-1 px-4 py-4 sm:px-6">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={() => setOpen(false)}
              className={({ isActive }) =>
                cn(
                  "rounded-md px-3 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted",
                  isActive && "bg-primary-soft text-primary"
                )
              }
            >
              {item.label}
            </NavLink>
          ))}
          <LinkButton to="/login" size="md" className="mt-2" onClick={() => setOpen(false)}>
            Login
          </LinkButton>
        </nav>
      </div>
    </header>
  );
}
