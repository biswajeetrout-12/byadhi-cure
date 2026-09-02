import React from "react";
import type { Product } from "@/types/product";

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="relative overflow-hidden bg-secondary/30 border-b border-border py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 items-start">
          <div>
            <p className="eyebrow">{product.category}</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {product.shortDescription}
            </p>
          </div>
          <div className="aspect-[4/3] overflow-hidden rounded-lg border border-border bg-background shadow-card">
            <img
              src={product.image}
              alt={product.name}
              className="h-full w-full object-contain p-3"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductHero;
