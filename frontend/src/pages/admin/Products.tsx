import React, { useState } from "react";
import { Pencil, Plus, Search, Trash2, X } from "lucide-react";
import { Button } from "@/components/common/Button";
import { products } from "@/data/products";

const fieldClass =
  "mt-1.5 w-full rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground outline-none transition-colors placeholder:text-muted-foreground focus:border-primary focus:ring-2 focus:ring-ring/25";

function ProductForm({ onClose }: { onClose: () => void }) {
  return (
    <div className="rounded-lg border border-border bg-card p-6 shadow-card">
      <div className="grid grid-cols-[minmax(0,1fr)_auto] items-center gap-4">
        <h2 className="truncate font-display text-lg font-bold text-card-foreground">Add / edit product</h2>
        <button type="button" onClick={onClose} aria-label="Close form" className="grid h-9 w-9 place-items-center rounded-md border border-border">
          <X className="h-4 w-4" />
        </button>
      </div>

      <form className="mt-6 grid gap-5 md:grid-cols-2" onSubmit={(event) => event.preventDefault()}>
        <label className="text-sm font-medium text-card-foreground">
          Product name
          <input className={fieldClass} placeholder="e.g. Cureflam-SP Tablets" />
        </label>
        <label className="text-sm font-medium text-card-foreground">
          Category
          <input className={fieldClass} placeholder="e.g. Antibiotic" />
        </label>
        <label className="text-sm font-medium text-card-foreground md:col-span-2">
          Product image
          <input type="file" className={`${fieldClass} file:mr-3 file:rounded file:border-0 file:bg-secondary file:px-3 file:py-1 file:text-xs`} />
        </label>
        <label className="text-sm font-medium text-card-foreground md:col-span-2">
          Short description
          <input className={fieldClass} placeholder="One-line summary shown on the product card" />
        </label>
        <label className="text-sm font-medium text-card-foreground md:col-span-2">
          Full description
          <textarea rows={4} className={fieldClass} placeholder="Detailed product description" />
        </label>
        <label className="text-sm font-medium text-card-foreground">
          Composition
          <textarea rows={3} className={fieldClass} placeholder="One ingredient per line" />
        </label>
        <label className="text-sm font-medium text-card-foreground">
          Uses
          <textarea rows={3} className={fieldClass} placeholder="One indication per line" />
        </label>
        <label className="text-sm font-medium text-card-foreground">
          Benefits
          <textarea rows={3} className={fieldClass} placeholder="One benefit per line" />
        </label>
        <label className="text-sm font-medium text-card-foreground">
          Packaging
          <input className={fieldClass} placeholder="e.g. 10 x 10 alu-alu blister" />
        </label>
        <label className="text-sm font-medium text-card-foreground md:col-span-2">
          Storage
          <input className={fieldClass} placeholder="e.g. Store below 30°C in a dry place" />
        </label>
        <div className="flex flex-wrap gap-3 md:col-span-2">
          <Button type="submit">Save product</Button>
          <Button type="button" variant="outline" onClick={onClose}>
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

  const filtered = products.filter((product) =>
    `${product.name} ${product.category}`.toLowerCase().includes(query.toLowerCase()),
  );

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
        <Button onClick={() => setShowForm(true)}>
          <Plus className="h-4 w-4" />
          Add Product
        </Button>
      </div>

      {showForm ? <ProductForm onClose={() => setShowForm(false)} /> : null}

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
              {filtered.map((product) => (
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
                        onClick={() => setShowForm(true)}
                        className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-primary"
                      >
                        <Pencil className="h-4 w-4" />
                      </button>
                      <button
                        type="button"
                        aria-label={`Delete ${product.name}`}
                        className="grid h-9 w-9 place-items-center rounded-md border border-border text-muted-foreground hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
              {filtered.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-5 py-10 text-center text-muted-foreground">
                    No products match your search.
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Products;
