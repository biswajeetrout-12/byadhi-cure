import { Bell, Menu, Sun, Moon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { sidebarItems } from "./Sidebar";
import { useTheme } from "@/context/ThemeContext";

interface HeaderProps {
  onOpenSidebar: () => void;
}

export function Header({ onOpenSidebar }: HeaderProps) {
  const location = useLocation();
  const current = sidebarItems.find((item) => item.to === location.pathname);
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="sticky top-0 z-30 border-b border-border bg-background">
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
          <span className="grid h-10 w-10 place-items-center rounded-full bg-primary font-display text-sm font-bold text-primary-foreground">
            RB
          </span>
        </div>
      </div>
    </header>
  );
}

export default Header;
