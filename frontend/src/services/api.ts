/**
 * Base API Service layer configurations.
 */
export const API_BASE_URL = import.meta.env["VITE_API_BASE_URL"] ?? "/api";

export const delay = <T,>(data: T, ms = 300): Promise<T> => 
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export async function apiFetch<T>(
  endpoint: string,
  options: RequestInit = {}
): Promise<T> {
  const token = localStorage.getItem("auth_token");
  const isFormData =
    typeof FormData !== "undefined" && options.body instanceof FormData;
  const headers: Record<string, string> = {
    ...((options.headers as Record<string, string>) || {}),
  };

  if (!isFormData) {
    headers["Content-Type"] = headers["Content-Type"] || "application/json";
  }

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  const data = await response.json().catch(() => ({}));
  
  if (!response.ok) {
    throw new Error(data.message || "An error occurred");
  }

  return data;
}
