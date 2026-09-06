import React, { useState } from "react";
import { Plus, X } from "lucide-react";
import { Button } from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import { useCreateAdminUser, useUsers } from "@/hooks/useAuth";

const fieldClass = "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/25";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/;

export function Users() {
  const { data: users, isLoading, isError } = useUsers();
  const createAdminUser = useCreateAdminUser();
  const [isOpen, setIsOpen] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState<string | null>(null);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
      setError(null);
      if (!emailPattern.test(form.email.trim())) {
        setError("Please enter a valid email address.");
        return;
      }
      if (!passwordPattern.test(form.password)) {
        setError("Password must be at least 8 characters, include a letter and a number, and may contain special characters.");
        return;
      }
    try {
      await createAdminUser.mutateAsync(form);
      setForm({ name: "", email: "", password: "" });
      setIsOpen(false);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Failed to create admin user");
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-end">
        <Button type="button" onClick={() => { setError(null); setIsOpen(true); }}>
          <Plus className="h-4 w-4" />
          Add admin user
        </Button>
      </div>
      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[40rem] text-left text-sm">
            <thead className="border-b border-border bg-secondary/60 text-xs uppercase tracking-[0.1em] text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Name</th>
                <th className="px-5 py-3 font-semibold">Email</th>
                <th className="px-5 py-3 font-semibold">Role</th>
                <th className="px-5 py-3 font-semibold">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? <tr><td colSpan={4}><Loader size="md" /></td></tr> : isError ? <tr><td colSpan={4}><EmptyState title="Unable to load users" description="The backend user list could not be loaded." /></td></tr> : users?.length === 0 ? <tr><td colSpan={4}><EmptyState title="No registered users" description="Users created through registration will appear here." /></td></tr> : users?.map((user) => (
                <tr key={user.id}>
                  <td className="px-5 py-4 font-medium text-card-foreground">{user.name}</td>
                  <td className="px-5 py-4 text-muted-foreground">{user.email}</td>
                  <td className="px-5 py-4 text-muted-foreground">{user.role}</td>
                  <td className="px-5 py-4">
                    <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                      {user.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal isOpen={isOpen} onClose={() => setIsOpen(false)} title="Add admin user" className="max-w-md">
        <form onSubmit={submit} className="space-y-4">
          <label className="block text-sm font-medium text-card-foreground">Name<input required className={fieldClass} value={form.name} onChange={(event) => setForm({ ...form, name: event.target.value })} /></label>
          <label className="block text-sm font-medium text-card-foreground">Email<input required type="email" pattern={emailPattern.source} className={fieldClass} value={form.email} onChange={(event) => setForm({ ...form, email: event.target.value })} /></label>
          <label className="block text-sm font-medium text-card-foreground">Password<input required minLength={8} pattern={passwordPattern.source} type="password" className={fieldClass} value={form.password} onChange={(event) => setForm({ ...form, password: event.target.value })} /></label>
          {error ? <p className="text-sm text-destructive">{error}</p> : null}
          <div className="flex justify-end gap-3">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}><X className="h-4 w-4" />Cancel</Button>
            <Button type="submit" disabled={createAdminUser.isPending}>{createAdminUser.isPending ? "Creating..." : "Create admin"}</Button>
          </div>
        </form>
      </Modal>
    </div>
  );
}

export default Users;
