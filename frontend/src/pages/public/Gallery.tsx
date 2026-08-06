import React, { useState } from "react";
import { ImageIcon } from "lucide-react";
import { PageHeader, Section } from "@/components/common/Section";
import Loader from "@/components/common/Loader";
import { useGallery } from "@/hooks/useGallery";
import { galleryCategories, GalleryCategory } from "@/data/site";
import { cn } from "@/lib/utils";

type Filter = GalleryCategory | "All";

export function Gallery() {
  const [filter, setFilter] = useState<Filter>("All");
  const { data: galleryItems, isLoading } = useGallery();

  const items = galleryItems
    ? filter === "All"
      ? galleryItems
      : galleryItems.filter((item) => item.category === filter)
    : [];

  return (
    <>
      <PageHeader
        eyebrow="Gallery"
        title="Inside Byadhi Cure Lab"
        description="A look at our facility, product range, infrastructure and company events."
      />

      <Section>
        <div className="flex flex-wrap gap-2">
          {(["All", ...galleryCategories] as Filter[]).map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setFilter(category)}
              className={cn(
                "rounded-md border px-4 py-2 text-sm font-medium transition-colors",
                filter === category
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-primary hover:text-primary",
              )}
            >
              {category}
            </button>
          ))}
        </div>

        {isLoading ? (
          <div className="mt-12">
            <Loader size="lg" />
          </div>
        ) : (
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {items.map((item) => (
              <figure key={item.id} className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
                {item.image ? (
                  <img src={item.image} alt={item.title} loading="lazy" className="aspect-[4/3] w-full object-cover" />
                ) : (
                  <div className="grid aspect-[4/3] place-items-center bg-muted text-muted-foreground">
                    <ImageIcon className="h-8 w-8" />
                  </div>
                )}
                <figcaption className="border-t border-border p-4">
                  <p className="font-display text-sm font-bold text-card-foreground">{item.title}</p>
                  <p className="mt-1 text-xs uppercase tracking-[0.12em] text-muted-foreground">{item.category}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </Section>
    </>
  );
}

export default Gallery;
