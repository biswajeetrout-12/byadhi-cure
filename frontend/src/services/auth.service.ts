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

  logout: async (): Promise<boolean> => {
    localStorage.removeItem("auth_token");
    return true;
  }
};
