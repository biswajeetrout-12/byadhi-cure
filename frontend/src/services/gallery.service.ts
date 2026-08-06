import { delay } from "./api";
import { galleryItems, GalleryItem } from "@/data/site";

let mockGallery = [...galleryItems];

export const galleryService = {
  getGalleryItems: async (): Promise<GalleryItem[]> => {
    return delay(mockGallery);
  },

  addGalleryItem: async (item: Omit<GalleryItem, "id">): Promise<GalleryItem> => {
    const newItem: GalleryItem = {
      ...item,
      id: `g${mockGallery.length + 1}`,
    };
    mockGallery = [newItem, ...mockGallery];
    return delay(newItem);
  },

  deleteGalleryItem: async (id: string): Promise<boolean> => {
    mockGallery = mockGallery.filter((item) => item.id !== id);
    return delay(true);
  },
};
