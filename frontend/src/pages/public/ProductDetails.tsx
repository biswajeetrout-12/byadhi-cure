import React from "react";
import { useParams, Link } from "react-router-dom";
import { Download, MessageSquare } from "lucide-react";
import { Button, LinkButton } from "@/components/common/Button";
import { Section, SectionHeading } from "@/components/common/Section";
import ProductGrid from "@/components/products/ProductGrid";
import Loader from "@/components/common/Loader";
import { useProduct, useProducts } from "@/hooks/useProducts";

function ProductNotFound() {
  return (
    <Section>
      <div className="max-w-md mx-auto text-center py-12">
        <h1 className="text-2xl font-bold text-foreground">Product not found</h1>
        <p className="mt-2 text-muted-foreground">This product may have been renamed or removed.</p>
        <LinkButton to="/products" className="mt-6">
          Back to products
        </LinkButton>
      </div>
    </Section>
  );
}

function DetailBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6">
      <h3 className="font-display text-base font-bold text-card-foreground">{title}</h3>
      <div className="mt-3 text-sm leading-relaxed text-muted-foreground">{children}</div>
    </div>
  );
}

function List({ items }: { items: string[] }) {
  return (
    <ul className="space-y-1.5">
      {items.map((item) => (
        <li key={item} className="flex gap-2">
          <span className="mt-[0.45rem] h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
          {item}
        </li>
      ))}
    </ul>
  );
}

export function ProductDetails() {
  const { id } = useParams<{ id: string }>();
  const { data: product, isLoading, isError } = useProduct(id || "");
  const { data: allProducts } = useProducts();

  if (isLoading) {
    return (
      <div className="min-h-[50vh] flex items-center justify-center">
        <Loader size="lg" />
      </div>
    );
  }

  if (isError || !product) {
    return <ProductNotFound />;
  }

  const related = allProducts
    ? allProducts.filter((p) => p.id !== product.id).slice(0, 3)
    : [];

  return (
    <>
      <Section>
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary">
            Home
          </Link>
          <span className="px-2">/</span>
          <Link to="/products" className="hover:text-primary">
            Products
          </Link>
          <span className="px-2">/</span>
          <span className="text-foreground">{product.name}</span>
        </nav>

        <div className="grid gap-10 lg:grid-cols-2">
          <div className="overflow-hidden rounded-lg border border-border bg-muted">
            <img src={product.image} alt={product.name} width={1000} height={800} className="h-full w-full object-cover" />
          </div>
          <div>
            <p className="eyebrow">{product.category}</p>
            <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">{product.name}</h1>
            <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>

            <div className="mt-7 rounded-lg border border-border bg-secondary/50 p-6">
              <h2 className="font-display text-sm font-bold uppercase tracking-[0.14em] text-foreground">Composition</h2>
              <div className="mt-3 text-sm text-muted-foreground">
                <List items={product.composition} />
              </div>
            </div>

            <div className="mt-7 flex flex-wrap gap-3">
              <Button>
                <Download className="h-4 w-4" />
                Download Brochure
              </Button>
              <LinkButton to="/contact" variant="outline">
                <MessageSquare className="h-4 w-4" />
                Product Enquiry
              </LinkButton>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <DetailBlock title="Uses & applications">
            <List items={product.uses} />
          </DetailBlock>
          <DetailBlock title="Benefits">
            <List items={product.benefits} />
          </DetailBlock>
          <DetailBlock title="Dosage information">
            <p>{product.dosage}</p>
          </DetailBlock>
          <DetailBlock title="Packaging">
            <p>{product.packaging}</p>
          </DetailBlock>
          <DetailBlock title="Storage">
            <p>{product.storage}</p>
          </DetailBlock>
          <DetailBlock title="Manufacturing details">
            <p>{product.manufacturing}</p>
          </DetailBlock>
        </div>
      </Section>

      <Section muted>
        <SectionHeading eyebrow="Related products" title="You may also be interested in" />
        <div className="mt-10">
          <ProductGrid products={related} />
        </div>
      </Section>
    </>
  );
}

export default ProductDetails;
