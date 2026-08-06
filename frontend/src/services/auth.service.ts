import { delay } from "./api";
import { User } from "@/types/user";

export const authService = {
  login: async (payload: { email: string; password: string }): Promise<{ ok: boolean; user?: User; token?: string }> => {
    // Mock login validation
    if (payload.email && payload.password) {
      const mockUser: User = {
        id: "U-01",
        name: "Ramesh Byadhi",
        email: payload.email,
        role: payload.email.includes("admin") ? "Superadmin" : "Customer",
        status: "Active",
      };
      return delay({ ok: true, user: mockUser, token: "mock-jwt-token" });
    }
    return delay({ ok: false });
  },

  getCurrentUser: async (): Promise<User | null> => {
    const token = localStorage.getItem("auth_token");
    if (!token) return delay(null);
    return delay({
      id: "U-01",
      name: "Ramesh Byadhi",
      email: "ramesh@byadhicurelab.com",
      role: "Superadmin",
      status: "Active",
    });
  },

  logout: async (): Promise<boolean> => {
    localStorage.removeItem("auth_token");
    return delay(true);
  }
};
