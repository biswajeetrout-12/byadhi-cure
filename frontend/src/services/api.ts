/**
 * Base API Service layer configurations.
 */
export const API_BASE_URL = import.meta.env["VITE_API_BASE_URL"] ?? "/api";

export const delay = <T,>(data: T, ms = 300): Promise<T> => 
  new Promise((resolve) => setTimeout(() => resolve(data), ms));
