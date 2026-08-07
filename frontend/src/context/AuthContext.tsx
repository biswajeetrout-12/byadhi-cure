import React, { createContext, useContext, ReactNode, useEffect } from "react";
import { useAuthUser, useLogin, useLogout, useRegister } from "@/hooks/useAuth";
import { User } from "@/types/user";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  login: (payload: Parameters<ReturnType<typeof useLogin>["mutate"]>[0]) => Promise<any>;
  register: (payload: Parameters<ReturnType<typeof useRegister>["mutate"]>[0]) => Promise<any>;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const { data: user, isLoading, refetch } = useAuthUser();
  const loginMutation = useLogin();
  const registerMutation = useRegister();
  const logoutMutation = useLogout();

  const login = async (payload: Parameters<ReturnType<typeof useLogin>["mutate"]>[0]) => {
    return new Promise((resolve, reject) => {
      loginMutation.mutate(payload, {
        onSuccess: (data) => {
          if (data.ok) {
            refetch().then(() => resolve(data));
          } else {
            reject(new Error("Invalid credentials"));
          }
        },
        onError: (err) => reject(err),
      });
    });
  };

  const register = async (payload: Parameters<ReturnType<typeof useRegister>["mutate"]>[0]) => {
    return new Promise((resolve, reject) => {
      registerMutation.mutate(payload, {
        onSuccess: (data) => {
          if (data.ok) {
            refetch().then(() => resolve(data));
          } else {
            reject(new Error("Registration failed"));
          }
        },
        onError: (err) => reject(err),
      });
    });
  };

  const logout = () => {
    logoutMutation.mutate();
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        isLoading,
        login,
        register,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
