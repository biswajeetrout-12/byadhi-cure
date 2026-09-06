import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/common/Button";
import Modal from "@/components/common/Modal";
import { useAuth } from "@/context/AuthContext";
import { useChangePassword, useUpdateProfile } from "@/hooks/useAuth";
import { toast } from "sonner";

const fieldClass = "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none focus:border-primary focus:ring-2 focus:ring-ring/25";

export function Settings() {
  const { user } = useAuth();
  const updateProfile = useUpdateProfile();
  const changePassword = useChangePassword();
  const [profile, setProfile] = useState({ name: "", email: "" });
  const [passwords, setPasswords] = useState({ currentPassword: "", newPassword: "" });
  const [visiblePasswords, setVisiblePasswords] = useState({ current: false, next: false });
  const [confirmAction, setConfirmAction] = useState<"profile" | "password" | null>(null);

  useEffect(() => {
    if (user) setProfile({ name: user.name, email: user.email });
  }, [user]);

  const submitProfile = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConfirmAction("profile");
  };

  const submitPassword = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setConfirmAction("password");
  };

  const confirmUpdate = async () => {
    if (!confirmAction) return;
    try {
      if (confirmAction === "profile") {
        await updateProfile.mutateAsync(profile);
        toast.success("Account details updated.");
      } else {
        await changePassword.mutateAsync(passwords);
        setPasswords({ currentPassword: "", newPassword: "" });
        toast.success("Password updated.");
      }
      setConfirmAction(null);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "The update failed.");
    }
  };

  return (
    <div className="grid w-full max-w-5xl gap-6 lg:grid-cols-2">
      <form className="rounded-lg border border-border bg-card p-6 shadow-card" onSubmit={submitProfile}>
        <h2 className="font-display text-lg font-bold text-card-foreground">Account</h2>
        <label className="mt-5 block text-sm font-medium text-card-foreground">Display name<input required className={fieldClass} value={profile.name} onChange={(event) => setProfile({ ...profile, name: event.target.value })} /></label>
        <label className="mt-4 block text-sm font-medium text-card-foreground">Email<input required type="email" className={fieldClass} value={profile.email} onChange={(event) => setProfile({ ...profile, email: event.target.value })} /></label>
        <Button type="submit" className="mt-6" disabled={updateProfile.isPending}>{updateProfile.isPending ? "Updating..." : "Update account"}</Button>
      </form>

      <form className="rounded-lg border border-border bg-card p-6 shadow-card" onSubmit={submitPassword}>
        <h2 className="font-display text-lg font-bold text-card-foreground">Security</h2>
        <label className="mt-5 block text-sm font-medium text-card-foreground">Current password<div className="relative"><input required type={visiblePasswords.current ? "text" : "password"} className={`${fieldClass} pr-10`} value={passwords.currentPassword} onChange={(event) => setPasswords({ ...passwords, currentPassword: event.target.value })} /><button type="button" aria-label={visiblePasswords.current ? "Hide current password" : "Show current password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setVisiblePasswords({ ...visiblePasswords, current: !visiblePasswords.current })}>{visiblePasswords.current ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div></label>
        <label className="mt-4 block text-sm font-medium text-card-foreground">New password<div className="relative"><input required minLength={8} pattern="^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$" type={visiblePasswords.next ? "text" : "password"} className={`${fieldClass} pr-10`} value={passwords.newPassword} onChange={(event) => setPasswords({ ...passwords, newPassword: event.target.value })} /><button type="button" aria-label={visiblePasswords.next ? "Hide new password" : "Show new password"} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground" onClick={() => setVisiblePasswords({ ...visiblePasswords, next: !visiblePasswords.next })}>{visiblePasswords.next ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}</button></div><span className="mt-1 block text-xs font-normal text-muted-foreground">At least 8 characters, using letters and numbers only, including at least one of each.</span></label>
        <Button type="submit" variant="outline" className="mt-6" disabled={changePassword.isPending}>{changePassword.isPending ? "Updating..." : "Change password"}</Button>
      </form>

      <Modal isOpen={!!confirmAction} onClose={() => setConfirmAction(null)} title="Confirm update" className="max-w-md">
        <p className="text-sm leading-relaxed text-muted-foreground">
          {confirmAction === "password" ? "Update your password now?" : "Save these account details now?"}
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => setConfirmAction(null)}>Cancel</Button>
          <Button type="button" onClick={confirmUpdate} disabled={updateProfile.isPending || changePassword.isPending}>Confirm update</Button>
        </div>
      </Modal>
    </div>
  );
}

export default Settings;
