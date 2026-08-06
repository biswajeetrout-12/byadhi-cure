import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { galleryService } from "@/services/gallery.service";
import { GalleryItem } from "@/data/site";

export function useGallery() {
  return useQuery({
    queryKey: ["gallery"],
    queryFn: () => galleryService.getGalleryItems(),
  });
}

export function useAddGalleryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (item: Omit<GalleryItem, "id">) => galleryService.addGalleryItem(item),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}

export function useDeleteGalleryItem() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (id: string) => galleryService.deleteGalleryItem(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["gallery"] });
    },
  });
}
