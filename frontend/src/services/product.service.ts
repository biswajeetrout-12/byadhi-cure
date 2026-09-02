import { apiFetch } from "./api";
import { Product } from "@/types/product";

export type ProductSubmission = {
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  composition: string;
  uses: string;
  benefits: string;
  dosage: string;
  packaging: string;
  storage: string;
  manufacturing: string;
  imageFile?: File | null;
};

function buildProductFormData(product: ProductSubmission): FormData {
  const formData = new FormData();

  formData.append("name", product.name);
  formData.append("category", product.category);
  formData.append("shortDescription", product.shortDescription);
  formData.append("description", product.description);
  formData.append("composition", product.composition);
  formData.append("uses", product.uses);
  formData.append("benefits", product.benefits);
  formData.append("dosage", product.dosage);
  formData.append("packaging", product.packaging);
  formData.append("storage", product.storage);
  formData.append("manufacturing", product.manufacturing);

  if (product.imageFile) {
    formData.append("image", product.imageFile);
  }

  return formData;
}

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    const res = await apiFetch<{ ok: boolean; data: Product[] }>("/products");
    return res.data || [];
  },

  getProductBySlug: async (slug: string): Promise<Product | undefined> => {
    const res = await apiFetch<{ ok: boolean; data: Product }>(`/products/slug/${encodeURIComponent(slug)}`);
    return res.data;
  },

  createProduct: async (product: ProductSubmission): Promise<Product> => {
    const res = await apiFetch<{ ok: boolean; data: Product }>("/products", {
      method: "POST",
      body: buildProductFormData(product),
    });
    return res.data;
  },

  updateProduct: async (id: string, updates: ProductSubmission): Promise<Product> => {
    const res = await apiFetch<{ ok: boolean; data: Product }>(`/products/${id}`, {
      method: "PUT",
      body: buildProductFormData(updates),
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
