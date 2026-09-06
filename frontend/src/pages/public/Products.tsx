import React from "react";
import { PageHeader, Section } from "@/components/common/Section";
import ProductGrid from "@/components/products/ProductGrid";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import { useProducts } from "@/hooks/useProducts";
import PageMetadata from "@/components/layout/PageMetadata";

export function Products() {
  const { data: productsList, isLoading, isError } = useProducts();

  return (
    <>
      <PageMetadata
        title="Pharmaceutical Products | Byadhi Cure Lab"
        description="Browse pharmaceutical and nutritional healthcare products from Byadhi Cure Lab Private Limited."
        path="/products"
      />
      <PageHeader
        eyebrow="Our products"
        title="Product range"
        description="Each formulation is manufactured under validated processes and released only after full quality control testing."
      />
      <Section>
        {isLoading ? (
          <Loader size="lg" />
        ) : isError ? (
          <EmptyState
            title="Unable to load products"
            description="We could not fetch the current product list from the backend API."
          />
        ) : productsList && productsList.length === 0 ? (
          <EmptyState
            title="No products available"
            description="The backend did not return any products yet."
          />
        ) : (
          <ProductGrid products={productsList || []} />
        )}
      </Section>
    </>
  );
}

export default Products;
