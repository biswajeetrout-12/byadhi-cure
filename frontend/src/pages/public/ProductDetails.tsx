import React from "react";
import { useParams, Link } from "react-router-dom";
import { Download, MessageSquare, FlaskConical, Zap, Package, Thermometer, Factory, BookOpen } from "lucide-react";
import { Button, LinkButton } from "@/components/common/Button";
import { Section, SectionHeading } from "@/components/common/Section";
import ProductGrid from "@/components/products/ProductGrid";
import Loader from "@/components/common/Loader";
import { useProduct, useProducts } from "@/hooks/useProducts";
import { createProductBrochure } from "@/lib/productBrochure";
import PageMetadata, { getSiteUrl } from "@/components/layout/PageMetadata";

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

const CARD_STYLES = [
  {
    gradient: "from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30",
    border: "border-blue-200/60 dark:border-blue-800/40",
    icon: FlaskConical,
    iconColor: "text-blue-500 dark:text-blue-400",
    iconBg: "bg-blue-100 dark:bg-blue-900/40",
    accentBar: "bg-gradient-to-b from-blue-400 to-blue-600",
  },
  {
    gradient: "from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/30",
    border: "border-emerald-200/60 dark:border-emerald-800/40",
    icon: Zap,
    iconColor: "text-emerald-500 dark:text-emerald-400",
    iconBg: "bg-emerald-100 dark:bg-emerald-900/40",
    accentBar: "bg-gradient-to-b from-emerald-400 to-emerald-600",
  },
  {
    gradient: "from-violet-50 to-purple-50 dark:from-violet-950/30 dark:to-purple-950/30",
    border: "border-violet-200/60 dark:border-violet-800/40",
    icon: BookOpen,
    iconColor: "text-violet-500 dark:text-violet-400",
    iconBg: "bg-violet-100 dark:bg-violet-900/40",
    accentBar: "bg-gradient-to-b from-violet-400 to-violet-600",
  },
  {
    gradient: "from-amber-50 to-orange-50 dark:from-amber-950/30 dark:to-orange-950/30",
    border: "border-amber-200/60 dark:border-amber-800/40",
    icon: Package,
    iconColor: "text-amber-500 dark:text-amber-400",
    iconBg: "bg-amber-100 dark:bg-amber-900/40",
    accentBar: "bg-gradient-to-b from-amber-400 to-amber-600",
  },
  {
    gradient: "from-rose-50 to-pink-50 dark:from-rose-950/30 dark:to-pink-950/30",
    border: "border-rose-200/60 dark:border-rose-800/40",
    icon: Thermometer,
    iconColor: "text-rose-500 dark:text-rose-400",
    iconBg: "bg-rose-100 dark:bg-rose-900/40",
    accentBar: "bg-gradient-to-b from-rose-400 to-rose-600",
  },
  {
    gradient: "from-sky-50 to-cyan-50 dark:from-sky-950/30 dark:to-cyan-950/30",
    border: "border-sky-200/60 dark:border-sky-800/40",
    icon: Factory,
    iconColor: "text-sky-500 dark:text-sky-400",
    iconBg: "bg-sky-100 dark:bg-sky-900/40",
    accentBar: "bg-gradient-to-b from-sky-400 to-sky-600",
  },
];

function DetailBlock({
  title,
  children,
  index = 0,
}: {
  title: string;
  children: React.ReactNode;
  index?: number;
}) {
  const style = CARD_STYLES[index % CARD_STYLES.length]!;
  const Icon = style.icon;
  return (
    <div
      className={`relative overflow-hidden rounded-xl border bg-gradient-to-br ${style.gradient} ${style.border} p-6 shadow-card card-hover`}
    >
      {/* Accent bar */}
      <div className={`absolute left-0 top-0 bottom-0 w-1 ${style.accentBar}`} />
      {/* Icon */}
      <div className={`inline-flex items-center justify-center h-9 w-9 rounded-lg ${style.iconBg} mb-4`}>
        <Icon className={`h-4.5 w-4.5 ${style.iconColor}`} />
      </div>
      <h3 className="font-display text-sm font-bold uppercase tracking-[0.1em] text-foreground/80">
        {title}
      </h3>
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
  const { slug } = useParams<{ slug: string }>();
  const { data: product, isLoading, isError } = useProduct(slug || "");
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

  const description = product.seoDescription || product.shortDescription || product.description;
  const productUrl = `${getSiteUrl()}/products/${product.slug || slug}`;

  const related = allProducts
    ? allProducts.filter((p) => p.id !== product.id).slice(0, 3)
    : [];

  const downloadBrochure = () => {
    const url = URL.createObjectURL(createProductBrochure(product));
    const link = document.createElement("a");
    link.href = url;
    link.download = `${product.slug || "product"}-brochure.pdf`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <PageMetadata
        title={product.seoTitle || `${product.name} | Byadhi Cure Lab`}
        description={description}
        path={`/products/${product.slug || slug}`}
        {...(product.image ? { image: product.image } : {})}
        structuredData={[
          {
            "@context": "https://schema.org",
            "@type": "Product",
            name: product.name,
            url: productUrl,
            ...(product.image ? { image: [product.image] } : {}),
            description,
          },
          {
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: `${getSiteUrl()}/` },
              { "@type": "ListItem", position: 2, name: "Products", item: `${getSiteUrl()}/products` },
              { "@type": "ListItem", position: 3, name: product.name, item: productUrl },
            ],
          },
        ]}
      />
      <Section>
        {/* Breadcrumb */}
        <nav className="mb-8 text-sm text-muted-foreground">
          <Link to="/" className="hover:text-primary transition-colors">Home</Link>
          <span className="px-2">/</span>
          <Link to="/products" className="hover:text-primary transition-colors">Products</Link>
          <span className="px-2">/</span>
          <span className="text-foreground font-medium">{product.name}</span>
        </nav>

        {/* Hero grid */}
        <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
          {/* Image */}
          <div className="self-start overflow-hidden rounded-2xl border border-border/60 bg-gradient-to-br from-primary/5 to-accent/5 shadow-raised">
            <img
              src={product.image}
              alt={`${product.name} pharmaceutical product`}
              width={1000}
              height={800}
              className="h-auto w-full object-contain"
            />
          </div>

          {/* Info */}
          <div>
            <span className="badge-accent">{product.category}</span>
            <h1 className="mt-3 text-3xl font-bold text-foreground md:text-4xl">{product.name}</h1>
            <p className="mt-4 leading-relaxed text-muted-foreground">{product.description}</p>

            {/* Composition box with glass effect */}
            <div className="mt-7 relative overflow-hidden rounded-xl border border-primary/20 bg-gradient-to-br from-primary/6 to-accent/4 p-6 shadow-glow-primary">
              <div className="absolute top-0 right-0 h-24 w-24 rounded-full bg-primary/10 blur-2xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
              <h2 className="font-display text-xs font-bold uppercase tracking-[0.14em] text-primary">
                Composition
              </h2>
              <div className="mt-3 text-sm text-muted-foreground">
                <List items={product.composition} />
              </div>
            </div>

            {/* CTA buttons */}
            <div className="mt-7 flex flex-wrap gap-3">
              <Button type="button" onClick={downloadBrochure}>
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

        {/* Detail cards */}
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-3">
          <DetailBlock title="Uses & applications" index={0}>
            <List items={product.uses} />
          </DetailBlock>
          <DetailBlock title="Benefits" index={1}>
            <List items={product.benefits} />
          </DetailBlock>
          <DetailBlock title="Dosage information" index={2}>
            <p>{product.dosage}</p>
          </DetailBlock>
          <DetailBlock title="Packaging" index={3}>
            <p>{product.packaging}</p>
          </DetailBlock>
          <DetailBlock title="Storage" index={4}>
            <p>{product.storage}</p>
          </DetailBlock>
          <DetailBlock title="Manufacturing details" index={5}>
            <p>{product.manufacturing}</p>
          </DetailBlock>
        </div>
      </Section>

      <Section muted dots>
        <SectionHeading eyebrow="Related products" title="You may also be interested in" />
        <div className="mt-10">
          <ProductGrid products={related} />
        </div>
      </Section>
    </>
  );
}

export default ProductDetails;
