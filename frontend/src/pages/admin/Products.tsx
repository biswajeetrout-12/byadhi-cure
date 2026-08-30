import React, { useEffect, useState } from "react";
import { Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { Button } from "@/components/common/Button";
import Loader from "@/components/common/Loader";
import EmptyState from "@/components/common/EmptyState";
import { useCreateProduct, useDeleteProduct, useProducts as useProductList, useUpdateProduct } from "@/hooks/useProducts";
import type { Product } from "@/types/product";
import type { ProductSubmission } from "@/services/product.service";

const fieldClass =
  "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/25";

type ProductFormValues = ProductSubmission;

const EMPTY_FORM: ProductFormValues = {
  name: "",
  category: "",
  shortDescription: "",
  description: "",
  composition: "",
  uses: "",
  benefits: "",
  dosage: "",
  packaging: "",
  storage: "",
  manufacturing: "",
  imageFile: null,
};

function productToFormValues(product: Product | null): ProductFormValues {
  if (!product) {
    return { ...EMPTY_FORM, imageFile: null };
  }

  return {
    name: product.name,
    category: product.category,
    shortDescription: product.shortDescription,
    description: product.description,
    composition: product.composition.join("\n"),
    uses: product.uses.join("\n"),
    benefits: product.benefits.join("\n"),
    dosage: product.dosage,
    packaging: product.packaging,
    storage: product.storage,
    manufacturing: product.manufacturing,
    imageFile: null,
  };
}

function ProductForm({
  product,
  onClose,
  onSubmit,
  isSubmitting,
  error,
}: {
  product: Product | null;
  onClose: () => void;
  onSubmit: (values: ProductSubmission) => Promise<void>;
  isSubmitting: boolean;
  error: string | null;
}) {
  const [values, setValues] = useState<ProductFormValues>(productToFormValues(product));
  const [preview, setPreview] = useState<string>(product?.image || "");

  useEffect(() => {
    setValues(productToFormValues(product));
    setPreview(product?.image || "");
  }, [product]);

  useEffect(() => {
    if (!values.imageFile) {
      setPreview(product?.image || "");
      return undefined;
    }

    const objectUrl = URL.createObjectURL(values.imageFile);
    setPreview(objectUrl);

    return () => URL.revokeObjectURL(objectUrl);
  }, [values.imageFile, product?.image]);

  const updateField = (field: keyof ProductFormValues, value: string) => {
    setValues((current) => ({ ...current, [field]: value }));
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0] ?? null;
    setValues((current) => ({ ...current, imageFile: file }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await onSubmit(values);
  };

  const submitLabel = product ? "Update product" : "Save product";

  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-card">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <h2 className="truncate font-display text-lg font-bold text-card-foreground">
          {product ? "Edit product" : "Add product"}
        </h2>
        <button
          type="button"
          onClick={onClose}
          aria-label="Close form"
          className="grid h-9 w-9 place-items-center rounded-md border border-border"
        >
          <X className="h-4 w-4" />
        </button>
      </div>

      <form className="mt-6 grid gap-5 md:grid-cols-2" onSubmit={handleSubmit}>
        <label className="text-sm font-medium text-card-foreground">
          Product name
          <input
            className={fieldClass}
            placeholder="e.g. Example Product Name"
            value={values.name}
            onChange={(event) => updateField("name", event.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-card-foreground">
          Category
          <input
            className={fieldClass}
            placeholder="e.g. Antibiotic"
            value={values.category}
            onChange={(event) => updateField("category", event.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-card-foreground md:col-span-2">
          Product image
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className={`${fieldClass} file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1 file:text-xs`}
          />
          <p className="mt-1 text-xs text-muted-foreground">
            {product ? "Leave blank to keep the current image." : "An image is required for new products."}
          </p>
        </label>

        {preview ? (
          <div className="md:col-span-2">
            <p className="text-sm font-medium text-card-foreground">Image preview</p>
            <div className="mt-2 overflow-hidden rounded-lg border border-border bg-secondary/30">
              <img src={preview} alt="Product preview" className="h-44 w-full object-cover" />
            </div>
          </div>
        ) : null}

        <label className="text-sm font-medium text-card-foreground md:col-span-2">
          Short description
          <input
            className={fieldClass}
            placeholder="One-line summary shown on the product card"
            value={values.shortDescription}
            onChange={(event) => updateField("shortDescription", event.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-card-foreground md:col-span-2">
          Full description
          <textarea
            rows={4}
            className={fieldClass}
            placeholder="Detailed product description"
            value={values.description}
            onChange={(event) => updateField("description", event.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-card-foreground">
          Composition
          <textarea
            rows={3}
            className={fieldClass}
            placeholder="One ingredient per line"
            value={values.composition}
            onChange={(event) => updateField("composition", event.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-card-foreground">
          Uses
          <textarea
            rows={3}
            className={fieldClass}
            placeholder="One indication per line"
            value={values.uses}
            onChange={(event) => updateField("uses", event.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-card-foreground">
          Benefits
          <textarea
            rows={3}
            className={fieldClass}
            placeholder="One benefit per line"
            value={values.benefits}
            onChange={(event) => updateField("benefits", event.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-card-foreground">
          Packaging
          <input
            className={fieldClass}
            placeholder="e.g. 10 x 10 alu-alu blister"
            value={values.packaging}
            onChange={(event) => updateField("packaging", event.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-card-foreground md:col-span-2">
          Dosage
          <input
            className={fieldClass}
            placeholder="Dosage guidance"
            value={values.dosage}
            onChange={(event) => updateField("dosage", event.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-card-foreground md:col-span-2">
          Storage
          <input
            className={fieldClass}
            placeholder="e.g. Store below 30 C in a dry place"
            value={values.storage}
            onChange={(event) => updateField("storage", event.target.value)}
          />
        </label>
        <label className="text-sm font-medium text-card-foreground md:col-span-2">
          Manufacturing details
          <textarea
            rows={3}
            className={fieldClass}
            placeholder="Manufacturing information"
            value={values.manufacturing}
            onChange={(event) => updateField("manufacturing", event.target.value)}
          />
        </label>

        {error ? <p className="text-sm text-destructive md:col-span-2">{error}</p> : null}

        <div className="flex flex-wrap gap-3 md:col-span-2">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : submitLabel}
          </Button>
          <Button type="button" variant="outline" onClick={onClose} disabled={isSubmitting}>
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}

export function Products() {
  const [query, setQuery] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [formError, setFormError] = useState<string | null>(null);
  const { data: products, isLoading, isError } = useProductList();
  const createProduct = useCreateProduct();
  const updateProduct = useUpdateProduct();
  const deleteProduct = useDeleteProduct();

  const filtered = (products || []).filter((product) =>
    `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase()),
  );

  const isSubmitting = createProduct.isPending || updateProduct.isPending;

  const openCreateForm = () => {
    setSelectedProduct(null);
    setFormError(null);
    setShowForm(true);
  };

  const openEditForm = (product: Product) => {
    setSelectedProduct(product);
    setFormError(null);
    setShowForm(true);
  };

  const closeForm = () => {
    setShowForm(false);
    setSelectedProduct(null);
    setFormError(null);
  };

  const handleSubmit = async (values: ProductSubmission) => {
    setFormError(null);

    if (!selectedProduct && !values.imageFile) {
      setFormError("Please choose an image for the new product.");
      return;
    }

    try {
      if (selectedProduct) {
        await updateProduct.mutateAsync({ id: selectedProduct.id, updates: values });
      } else {
        await createProduct.mutateAsync(values);
      }
      closeForm();
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Failed to save product");
    }
  };

  const handleDelete = async (product: Product) => {
    const confirmed = window.confirm(`Delete ${product.name}? This will remove the backend product and its Cloudinary image.`);
    if (!confirmed) return;

    try {
      await deleteProduct.mutateAsync(product.id);
    } catch (error) {
      setFormError(error instanceof Error ? error.message : "Failed to delete product");
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_auto] md:items-center">
        <div className="relative min-w-0">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search products or categories"
            className="w-full rounded-md border border-input bg-background py-2.5 pl-9 pr-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/25"
          />
        </div>
        <Button onClick={openCreateForm}>
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {showForm ? (
        <ProductForm
          product={selectedProduct}
          onClose={closeForm}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
          error={formError}
        />
      ) : null}

      <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[46rem] text-left text-sm">
            <thead className="border-b border-border bg-secondary/60 text-xs uppercase tracking-[0.1em] text-muted-foreground">
              <tr>
                <th className="px-5 py-3 font-semibold">Product</th>
                <th className="px-5 py-3 font-semibold">Category</th>
                <th className="px-5 py-3 font-semibold">Packaging</th>
                <th className="px-5 py-3 text-right font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {isLoading ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10">
                    <Loader size="lg" />
                  </td>
                </tr>
              ) : isError ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10">
                    <EmptyState
                      className="border-0 p-0"
                      title="Unable to load products"
                      description="The admin table could not fetch products from the API."
                    />
                  </td>
                </tr>
              ) : filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-muted-foreground">
                    No products match your search.
                  </td>
                </tr>
              ) : (
                filtered.map((product) => (
                  <tr key={product.id} className="align-middle">
                    <td className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <img src={product.image} alt="" loading="lazy" className="h-10 w-10 rounded object-cover" />
                        <span className="font-medium text-card-foreground">{product.name}</span>
                      </div>
                    </td>
                    <td className="px-5 py-4 text-muted-foreground">{product.category}</td>
                    <td className="px-5 py-4 text-muted-foreground">{product.packaging}</td>
                    <td className="px-5 py-4">
                      <div className="flex justify-end gap-2">
                        <button
                          type="button"
                          aria-label={`Edit ${product.name}`}
                          onClick={() => openEditForm(product)}
                          className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-primary"
                        >
                          <Pencil className="h-4 w-4" />
                        </button>
                        <button
                          type="button"
                          aria-label={`Delete ${product.name}`}
                          onClick={() => handleDelete(product)}
                          disabled={deleteProduct.isPending}
                          className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-destructive disabled:cursor-not-allowed disabled:opacity-60"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;
