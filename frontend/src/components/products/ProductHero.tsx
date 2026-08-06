import React from "react";
import type { Product } from "@/types/product";

interface ProductHeroProps {
  product: Product;
}

export function ProductHero({ product }: ProductHeroProps) {
  return (
    <section className="relative overflow-hidden bg-secondary/30 border-b border-border py-12 md:py-16">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <p className="eyebrow">{product.category}</p>
            <h1 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl md:text-5xl">
              {product.name}
            </h1>
            <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
              {product.shortDescription}
            </p>
          </div>
          <div className="overflow-hidden rounded-lg border border-border bg-background shadow-card max-h-[350px]">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default ProductHero;
