import { apiFetch } from "./api";
import { User } from "@/types/user";

export const authService = {
  login: async (payload: { email: string; password: string }): Promise<{ ok: boolean; user?: User; token?: string }> => {
    const data = await apiFetch<{ ok: boolean; user: User; token: string }>("/auth/login", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data;
  },

  googleLogin: async (credential: string): Promise<{ ok: boolean; user?: User; token?: string }> => {
    return apiFetch<{ ok: boolean; user: User; token: string }>("/auth/google", {
      method: "POST",
      body: JSON.stringify({ credential }),
    });
  },

  register: async (payload: { name: string; email: string; password: string }): Promise<{ ok: boolean; user?: User; token?: string }> => {
    const data = await apiFetch<{ ok: boolean; user: User; token: string }>("/auth/register", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data;
  },

  getCurrentUser: async (): Promise<User | null> => {
    const token = localStorage.getItem("auth_token");
    if (!token) return null;
    try {
      const data = await apiFetch<{ ok: boolean; user: User }>("/auth/me");
      return data.user;
    } catch (err) {
      localStorage.removeItem("auth_token");
      return null;
    }
  },

  getUsers: async (): Promise<User[]> => {
    const data = await apiFetch<{ ok: boolean; data: User[] }>("/auth/users");
    return data.data || [];
  },

  getRegisteredUserCount: async (): Promise<number> => {
    const data = await apiFetch<{ ok: boolean; data: { count: number } }>("/auth/registered-count");
    return data.data?.count || 0;
  },

  createAdminUser: async (payload: { name: string; email: string; password: string }): Promise<User> => {
    const data = await apiFetch<{ ok: boolean; data: User }>("/auth/users", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return data.data;
  },

  updateProfile: async (updates: { name: string; email: string }): Promise<User> => {
    const data = await apiFetch<{ ok: boolean; user: User }>("/auth/me", {
      method: "PATCH",
      body: JSON.stringify(updates),
    });
    return data.user;
  },

  changePassword: async (payload: { currentPassword: string; newPassword: string }): Promise<boolean> => {
    await apiFetch<{ ok: boolean }>("/auth/me/password", {
      method: "PATCH",
      body: JSON.stringify(payload),
    });
    return true;
  },

  logout: async (): Promise<boolean> => {
    localStorage.removeItem("auth_token");
    return true;
  }
};
