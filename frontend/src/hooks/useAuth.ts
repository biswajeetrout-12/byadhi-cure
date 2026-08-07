import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/auth.service";

export function useAuthUser() {
  return useQuery({
    queryKey: ["auth-user"],
    queryFn: () => authService.getCurrentUser(),
    retry: false,
  });
}

export function useLogin() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      if (data.ok && data.token) {
        localStorage.setItem("auth_token", data.token);
        queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      }
    },
  });
}

export function useRegister() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.register,
    onSuccess: (data) => {
      if (data.ok && data.token) {
        localStorage.setItem("auth_token", data.token);
        queryClient.invalidateQueries({ queryKey: ["auth-user"] });
      }
    },
  });
}

export function useLogout() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      queryClient.setQueryData(["auth-user"], null);
      queryClient.invalidateQueries();
    },
  });
}
