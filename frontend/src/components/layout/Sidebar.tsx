import { NavLink, Link } from "react-router-dom";
import {
  Building2,
  Images,
  LayoutDashboard,
  Mail,
  Package,
  Settings,
  ShieldCheck,
  Users,
  X,
} from "lucide-react";
import { company } from "@/data/company";
import { cn } from "@/lib/utils";

export const sidebarItems = [
  { label: "Dashboard", to: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Company Information", to: "/admin/company", icon: Building2 },
  { label: "Products Management", to: "/admin/products", icon: Package },
  { label: "Gallery Management", to: "/admin/gallery", icon: Images },
  { label: "Certifications", to: "/admin/certifications", icon: ShieldCheck },
  { label: "Enquiries", to: "/admin/enquiries", icon: Mail },
  { label: "Users", to: "/admin/users", icon: Users },
  { label: "Settings", to: "/admin/settings", icon: Settings },
] as const;

interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ isOpen, onClose }: SidebarProps) {
  return (
    <>
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-64 shrink-0 overflow-y-auto bg-sidebar text-sidebar-foreground transition-transform duration-300 lg:static lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex items-center justify-between gap-2 border-b border-sidebar-border px-5 py-4">
          <Link to="/" className="min-w-0">
            <p className="truncate font-display text-sm font-bold">{company.shortName}</p>
            <p className="text-[11px] uppercase tracking-[0.16em] text-sidebar-foreground/60">Admin panel</p>
          </Link>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close sidebar"
            className="grid h-8 w-8 place-items-center rounded-md hover:bg-sidebar-accent lg:hidden"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <nav className="flex flex-col gap-1 p-3">
          {sidebarItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              onClick={onClose}
              className={({ isActive }) =>
                cn(
                  "flex items-center gap-3 rounded-md px-3 py-2.5 text-sm font-medium text-sidebar-foreground/75 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
                  isActive && "bg-sidebar-accent text-sidebar-primary"
                )
              }
            >
              <item.icon className="h-4 w-4 shrink-0" />
              <span className="truncate">{item.label}</span>
            </NavLink>
          ))}
        </nav>
      </aside>

      {isOpen ? (
        <button
          type="button"
          aria-label="Close sidebar overlay"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-foreground/40 lg:hidden"
        />
      ) : null}
    </>
  );
}

export default Sidebar;
