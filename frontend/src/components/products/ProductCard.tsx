import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { Product } from "@/types/product";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <article className="group flex flex-col overflow-hidden rounded-2xl border border-border/70 bg-card shadow-card card-hover">
      {/* Image with gradient overlay */}
      <div className="relative aspect-[5/4] overflow-hidden bg-gradient-to-br from-primary/8 to-accent/6">
        <img
          src={product.image}
          alt={product.name}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.05]"
        />
        {/* Category pill overlay on image */}
        <div className="absolute top-3 left-3">
          <span className="badge-accent text-[0.65rem]">{product.category}</span>
        </div>
      </div>

      {/* Content */}
      <div className="flex flex-1 flex-col p-5">
        <h3 className="mt-1 font-display text-lg font-bold text-card-foreground group-hover:text-primary transition-colors duration-200">
          {product.name}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
          {product.shortDescription}
        </p>

        {/* Divider */}
        <div className="mt-4 h-px bg-gradient-to-r from-border via-primary/20 to-transparent" />

        <Link
          to={`/products/${product.slug || product.id}`}
          className="mt-4 inline-flex items-center gap-1.5 self-start text-sm font-semibold text-primary transition-all duration-200 hover:gap-2.5 group/link"
        >
          View Details
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover/link:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}
