import React from "react";
import { PageHeader, Section } from "@/components/common/Section";
import ProductGrid from "@/components/products/ProductGrid";
import Loader from "@/components/common/Loader";
import { useProducts } from "@/hooks/useProducts";

export function Products() {
  const { data: productsList, isLoading } = useProducts();

  return (
    <>
      <PageHeader
        eyebrow="Our products"
        title="Product range"
        description="Each formulation is manufactured under validated processes and released only after full quality control testing."
      />
      <Section>
        {isLoading ? (
          <Loader size="lg" />
        ) : (
          <ProductGrid products={productsList || []} />
        )}
      </Section>
    </>
  );
}

export default Products;
