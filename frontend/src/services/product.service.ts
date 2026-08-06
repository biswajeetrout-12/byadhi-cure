import { delay } from "./api";
import { products, Product } from "@/data/products";

// Use a local copy of mock products that can be manipulated in-memory for admin functions
let mockProducts = [...products];

export const productService = {
  getProducts: async (): Promise<Product[]> => {
    return delay(mockProducts);
  },

  getProductById: async (id: string): Promise<Product | undefined> => {
    const item = mockProducts.find((p) => p.id === id);
    return delay(item);
  },

  createProduct: async (product: Omit<Product, "id">): Promise<Product> => {
    const newProduct: Product = {
      ...product,
      id: product.name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    };
    mockProducts = [newProduct, ...mockProducts];
    return delay(newProduct);
  },

  updateProduct: async (id: string, updates: Partial<Product>): Promise<Product> => {
    mockProducts = mockProducts.map((p) => (p.id === id ? { ...p, ...updates } : p));
    const updated = mockProducts.find((p) => p.id === id)!;
    return delay(updated);
  },

  deleteProduct: async (id: string): Promise<boolean> => {
    mockProducts = mockProducts.filter((p) => p.id !== id);
    return delay(true);
  },
};
