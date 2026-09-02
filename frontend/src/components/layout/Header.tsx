import { Bell, ExternalLink, LogOut, Menu, Sun, Moon, User } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useState, type FormEvent } from "react";
import { Button } from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { sidebarItems } from "./Sidebar";
import { useTheme } from "@/context/ThemeContext";
import { useAuth } from "@/context/AuthContext";
import { useUpdateProfile } from "@/hooks/useAuth";
import { toast } from "sonner";

interface HeaderProps {
  onOpenSidebar: () => void;
}

export function Header({ onOpenSidebar }: HeaderProps) {
  const location = useLocation();
  const current = sidebarItems.find((item) => item.to === location.pathname);
  const { theme, toggleTheme } = useTheme();
  const { user, logout } = useAuth();
  const updateProfile = useUpdateProfile();
  const [menuOpen, setMenuOpen] = useState(false);
  const [logoutOpen, setLogoutOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [editingName, setEditingName] = useState(false);
  const [nameDraft, setNameDraft] = useState("");
  const initials = user?.name
    ? user.name.split(" ").map((part) => part[0]).join("").slice(0, 2).toUpperCase()
    : "AD";

  const openProfile = () => {
    setNameDraft(user?.name || "");
    setEditingName(false);
    setMenuOpen(false);
    setProfileOpen(true);
  };

  const saveName = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!nameDraft.trim()) return toast.error("Please enter your full name.");
    try {
      await updateProfile.mutateAsync({ name: nameDraft.trim() });
      toast.success("Full name updated.");
      setEditingName(false);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to update full name.");
    }
  };

  return (
    <header className="sticky top-0 z-30 shrink-0 border-b border-border bg-background">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4 px-4 py-3 sm:px-6">
        <div className="flex min-w-0 items-center gap-3">
          <button
            type="button"
            onClick={onOpenSidebar}
            aria-label="Open sidebar"
            className="grid h-10 w-10 shrink-0 place-items-center rounded-md border border-border lg:hidden"
          >
            <Menu className="h-4 w-4" />
          </button>
          <h1 className="truncate font-display text-lg font-bold text-foreground">
            {current?.label ?? "Admin"}
          </h1>
        </div>
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={toggleTheme}
            aria-label="Toggle theme"
            className="grid h-10 w-10 place-items-center rounded-md border border-border text-muted-foreground hover:text-primary transition-colors cursor-pointer"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <button
            type="button"
            aria-label="Notifications"
            className="grid h-10 w-10 place-items-center rounded-md border border-border text-muted-foreground hover:text-primary"
          >
            <Bell className="h-4 w-4" />
          </button>
          <div className="relative">
            <button type="button" aria-label="Open admin user menu" onClick={() => setMenuOpen((open) => !open)} className="grid h-10 w-10 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
              {initials}
            </button>
            {menuOpen ? (
              <div className="absolute right-0 top-full z-50 mt-2 w-56 max-w-[calc(100vw-1rem)] origin-top-right rounded-xl border border-border bg-card p-2.5 shadow-raised">
                <button type="button" onClick={openProfile} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-primary-soft hover:text-primary"><User className="h-4 w-4" />Profile</button>
                <Link to="/" onClick={() => setMenuOpen(false)} className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-foreground/80 hover:bg-primary-soft hover:text-primary"><ExternalLink className="h-4 w-4" />Visit Company Home</Link>
                <button type="button" onClick={() => { setMenuOpen(false); setLogoutOpen(true); }} className="flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm text-destructive hover:bg-destructive-foreground/10"><LogOut className="h-4 w-4" />Log out</button>
              </div>
            ) : null}
          </div>
        </div>
      </div>

      <Modal isOpen={profileOpen} onClose={() => setProfileOpen(false)} title="Profile" className="max-w-md">
        <div className="space-y-5">
          <div className="space-y-3 rounded-lg border border-border bg-muted/30 p-4 text-sm"><div><p className="text-xs uppercase tracking-wide text-muted-foreground">Name</p><p className="mt-1 font-medium text-foreground">{user?.name}</p></div><div><p className="text-xs uppercase tracking-wide text-muted-foreground">Email</p><p className="mt-1 break-all text-foreground">{user?.email}</p></div></div>
          {editingName ? <form onSubmit={saveName} className="space-y-4"><label className="block text-sm font-medium text-card-foreground">Edit full name<input required value={nameDraft} onChange={(event) => setNameDraft(event.target.value)} className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground" /></label><div className="flex justify-end gap-3"><Button type="button" variant="outline" size="sm" onClick={() => setEditingName(false)}>Cancel</Button><Button type="submit" size="sm" disabled={updateProfile.isPending}>Save name</Button></div></form> : <div className="flex justify-end"><Button type="button" size="sm" onClick={() => setEditingName(true)}>Edit name</Button></div>}
        </div>
      </Modal>

      <Modal isOpen={logoutOpen} onClose={() => setLogoutOpen(false)} title="Confirm Logout" className="max-w-md"><p className="text-sm text-muted-foreground">Are you sure you want to log out?</p><div className="mt-6 flex justify-end gap-3"><Button type="button" variant="outline" size="sm" onClick={() => setLogoutOpen(false)}>Cancel</Button><Button type="button" size="sm" className="bg-destructive text-destructive-foreground" onClick={() => { logout(); setLogoutOpen(false); }}>Log out</Button></div></Modal>
    </header>
  );
}

export default Header;
