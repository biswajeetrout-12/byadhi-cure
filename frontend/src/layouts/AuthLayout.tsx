import { Outlet } from "react-router-dom";

export function AuthLayout() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/30 px-4 py-12 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8 rounded-lg border border-border bg-card p-8 shadow-card">
        <Outlet />
      </div>
    </div>
  );
}

export default AuthLayout;
