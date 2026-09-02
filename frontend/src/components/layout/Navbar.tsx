import { NavLink, Link } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import { Menu, X, Sun, Moon, User, LogOut, ChevronDown, LayoutDashboard } from "lucide-react";
import { company } from "@/data/company";
import Button, { LinkButton } from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { cn } from "@/lib/utils";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useCompany } from "@/hooks/useCompany";
import { useUpdateProfile } from "@/hooks/useAuth";
import { toast } from "sonner";
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
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const [profileDialogOpen, setProfileDialogOpen] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const [editingName, setEditingName] = useState(false);
  const updateProfile = useUpdateProfile();
  const { theme, toggleTheme } = useTheme();
  const { user, logout, isAuthenticated } = useAuth();
  const { data: companyFromDb } = useCompany();
  const activeCompany = companyFromDb || company;
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const linkBase =
    "rounded-md px-3 py-2 text-sm font-medium text-foreground/75 transition-colors hover:text-primary";

  const handleLogout = () => {
    setDropdownOpen(false);
    setOpen(false);
    setLogoutDialogOpen(true);
  };

  const confirmLogout = () => {
    logout();
    setLogoutDialogOpen(false);
  };

  const openProfileEditor = () => {
    setNameDraft(user?.name || "");
    setDropdownOpen(false);
    setOpen(false);
    setEditingName(false);
    setProfileDialogOpen(true);
  };

  const saveProfile = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nameDraft.trim()) {
      toast.error("Please enter your full name.");
      return;
    }
    try {
      await updateProfile.mutateAsync({ name: nameDraft.trim() });
      toast.success("Full name updated.");
      setEditingName(false);
      setProfileDialogOpen(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update full name.");
    }
  };

  const isAdmin = user?.role === "Admin" || user?.role === "Superadmin";
  const initials = user?.name
    ? user.name.split(" ").filter(Boolean).map((part) => part[0]).join("").slice(0, 2).toUpperCase()
    : "U";

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md shadow-[0_1px_24px_-8px_oklch(0.22_0.04_252_/_0.12)]">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6 lg:px-8">
        <Link to="/" className="flex min-w-0 items-center gap-3" onClick={() => setOpen(false)}>
          <Logo />
          <span className="min-w-0">
            <span className="block truncate font-display text-base font-bold leading-tight text-foreground sm:text-lg">
              {activeCompany.shortName}
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
          
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="ml-3 rounded-md p-2 text-foreground/75 hover:bg-muted hover:text-primary transition-colors cursor-pointer"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>

          {/* Conditional User authentication block */}
          {isAuthenticated && user ? (
            <div className="relative ml-4" ref={dropdownRef}>
              <button
                type="button"
                onClick={() => setDropdownOpen(!dropdownOpen)}
                 aria-label="Open user menu"
                 className="flex items-center gap-2 rounded-lg border border-border/80 bg-card/60 backdrop-blur-md px-2 py-1.5 text-sm font-semibold text-foreground/80 hover:text-primary hover:border-primary/30 transition-all cursor-pointer"
               >
                 <div className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-primary">
                   <span className="text-xs font-bold">{initials}</span>
                 </div>
                 <ChevronDown className={cn("h-4 w-4 transition-transform duration-200", dropdownOpen && "rotate-180")} />
              </button>

              {/* Dropdown Menu */}
              {dropdownOpen && (
                <div className="absolute right-0 top-full z-50 mt-2 w-56 max-w-[calc(100vw-1rem)] origin-top-right rounded-xl border border-border/85 bg-card p-2.5 shadow-raised ring-1 ring-black/5 animate-fade-in">
                  {isAdmin && (
                    <Link
                      to="/admin/dashboard"
                      onClick={() => setDropdownOpen(false)}
                      className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-primary-soft hover:text-primary transition-colors"
                    >
                      <LayoutDashboard className="h-4.5 w-4.5" />
                      Admin Dashboard
                    </Link>
                  )}

                  <button
                    type="button"
                    onClick={openProfileEditor}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-primary-soft hover:text-primary transition-colors"
                  >
                    <User className="h-4.5 w-4.5" />
                    Profile
                  </button>

                  <button
                    type="button"
                    onClick={handleLogout}
                    className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive-foreground/10 transition-colors cursor-pointer"
                  >
                    <LogOut className="h-4.5 w-4.5" />
                    Log Out
                  </button>
                </div>
              )}
            </div>
          ) : (
            <LinkButton to="/login" variant="primary" size="sm" className="ml-3">
              Login
            </LinkButton>
          )}
        </nav>

        {/* Mobile menu trigger */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="rounded-md p-2 text-foreground/75 hover:bg-muted hover:text-primary transition-colors cursor-pointer"
          >
            {theme === "dark" ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
          </button>
          
           {isAuthenticated && user && (
             <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary border border-primary/20">
               <span className="text-xs font-bold">{initials}</span>
             </div>
           )}

          <button
            type="button"
            onClick={() => setOpen((value) => !value)}
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            className="grid h-11 w-11 place-items-center rounded-md border border-border text-foreground"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Drawer */}
      <div
        className={cn(
          "overflow-hidden border-t border-border bg-background transition-[max-height] duration-300 xl:hidden",
          open ? "max-h-[36rem]" : "max-h-0",
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
                cn("rounded-md px-3 py-3 text-sm font-medium text-foreground/80 transition-colors hover:bg-muted", isActive && "bg-primary-soft text-primary")
              }
            >
              {item.label}
            </NavLink>
          ))}

          {/* Mobile Auth options */}
          {isAuthenticated && user ? (
            <div className="border-t border-border/80 mt-3 pt-3">
              <button
                type="button"
                onClick={openProfileEditor}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-foreground/80 hover:bg-muted text-left"
              >
                <User className="h-4.5 w-4.5" />
                Profile
              </button>
              
              {isAdmin && (
                <Link
                  to="/admin/dashboard"
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-foreground/80 hover:bg-muted"
                >
                  <LayoutDashboard className="h-4.5 w-4.5" />
                  Admin Dashboard
                </Link>
              )}

              <button
                type="button"
                onClick={handleLogout}
                className="flex w-full items-center gap-2 rounded-lg px-3 py-2.5 text-sm text-destructive hover:bg-destructive-foreground/10 text-left cursor-pointer"
              >
                <LogOut className="h-4.5 w-4.5" />
                Log Out
              </button>
            </div>
          ) : (
            <LinkButton to="/login" size="md" className="mt-2" onClick={() => setOpen(false)}>
              Login
            </LinkButton>
          )}
        </nav>
      </div>

      <Modal
        isOpen={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        title="Confirm Logout"
        className="max-w-md"
      >
        <div className="space-y-5">
          <p className="text-sm leading-6 text-muted-foreground">
            Are you sure you want to log out of your account?
          </p>
          <div className="flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
            <Button
              type="button"
              variant="outline"
              size="sm"
              onClick={() => setLogoutDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              size="sm"
              onClick={confirmLogout}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/85"
            >
              Log Out
            </Button>
          </div>
        </div>
      </Modal>

      <Modal
        isOpen={profileDialogOpen}
        onClose={() => setProfileDialogOpen(false)}
        title="Edit profile"
        className="max-w-md"
      >
        <div className="space-y-5">
          <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4 text-sm">
            <div><p className="text-xs uppercase tracking-wide text-muted-foreground">Name</p><p className="mt-1 font-medium text-foreground">{user?.name}</p></div>
            <div><p className="text-xs uppercase tracking-wide text-muted-foreground">Email</p><p className="mt-1 break-all text-foreground">{user?.email}</p></div>
          </div>
          {editingName ? (
            <form onSubmit={saveProfile} className="space-y-4">
              <label className="block text-sm font-medium text-card-foreground">Edit full name<input required value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/25" /></label>
              <div className="flex justify-end gap-3"><Button type="button" variant="outline" size="sm" onClick={() => setEditingName(false)}>Cancel</Button><Button type="submit" size="sm" disabled={updateProfile.isPending}>{updateProfile.isPending ? "Saving..." : "Save name"}</Button></div>
            </form>
          ) : (
            <div className="flex justify-end"><Button type="button" size="sm" onClick={() => setEditingName(true)}>Edit name</Button></div>
          )}
        </div>
      </Modal>
    </header>
  );
}
