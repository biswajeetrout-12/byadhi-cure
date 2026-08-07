import { apiFetch } from "./api";
import { Product } from "@/types/product";

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    const res = await apiFetch<{ ok: boolean; data: Product[] }>("/products");
    return res.data || [];
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    const res = await apiFetch<{ ok: boolean; data: Product }>(`/products/${id}`);
    return res.data;
  },

  createProduct: async (product: Omit<Product, "id">): Promise<Product> => {
    const res = await apiFetch<{ ok: boolean; data: Product }>("/products", {
      method: "POST",
      body: JSON.stringify(product),
    });
    return res.data;
  },

  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product> => {
    const res = await apiFetch<{ ok: boolean; data: Product }>(`/products/${id}`, {
      method: "PUT",
      body: JSON.stringify(updates),
    });
    return res.data;
  },

  deleteProduct: async (id: string): Promise<boolean> => {
    await apiFetch<{ ok: boolean; message: string }>(`/products/${id}`, {
      method: "DELETE",
    });
    return true;
  },
};
