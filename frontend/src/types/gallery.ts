export type GalleryCategory = "Manufacturing Facility" | "Products" | "Infrastructure" | "Events";

export interface GalleryItem {
  id: string;
  title: string;
  category: GalleryCategory;
  image?: string;
}
