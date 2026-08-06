import React from "react";
import { ImageIcon, Trash2, Upload } from "lucide-react";
import { Button } from "@/components/common/Button";
import { galleryCategories, galleryItems } from "@/data/site";

export function Gallery() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 rounded-lg border border-border bg-card p-6 shadow-card md:grid-cols-[minmax(0,1fr)_auto] md:items-end">
        <div className="grid gap-4 sm:grid-cols-2">
          <label className="text-sm font-medium text-card-foreground">
            Category
            <select className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary">
              {galleryCategories.map((category) => (
                <option key={category}>{category}</option>
              ))}
            </select>
          </label>
          <label className="text-sm font-medium text-card-foreground">
            Image title
            <input
              className="mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
              placeholder="e.g. Blister packing line"
            />
          </label>
        </div>
        <Button>
          <Upload className="h-4 w-4" />
          Upload image
        </Button>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {galleryItems.map((item) => (
          <figure key={item.id} className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
            <div className="grid aspect-[4/3] place-items-center bg-muted text-muted-foreground">
              <ImageIcon className="h-7 w-7" />
            </div>
            <figcaption className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-2 border-t border-border p-3">
              <span className="min-w-0">
                <span className="block truncate text-sm font-medium text-card-foreground">{item.title}</span>
                <span className="block truncate text-xs text-muted-foreground">{item.category}</span>
              </span>
              <button
                type="button"
                aria-label={`Delete ${item.title}`}
                className="grid h-8 w-8 shrink-0 place-items-center rounded-md border border-border text-muted-foreground hover:text-destructive"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </figcaption>
          </figure>
        ))}
      </div>
    </div>
  );
}

export default Gallery;
