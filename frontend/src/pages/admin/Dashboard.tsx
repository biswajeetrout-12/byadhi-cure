import React from "react";
import { adminEnquiries, adminStats } from "@/data/site";
import { products } from "@/data/products";

export function Dashboard() {
  return (
    <div className="space-y-6">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {adminStats.map((stat) => (
          <div key={stat.label} className="rounded-lg border border-border bg-card p-5 shadow-card">
            <p className="text-sm text-muted-foreground">{stat.label}</p>
            <p className="mt-2 font-display text-3xl font-bold text-primary">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)]">
        <div className="rounded-lg border border-border bg-card shadow-card">
          <div className="border-b border-border px-5 py-4">
            <h2 className="font-display text-base font-bold text-card-foreground">Recent enquiries</h2>
          </div>
          <ul className="divide-y divide-border">
            {adminEnquiries.map((enquiry) => (
              <li key={enquiry.id} className="grid grid-cols-[minmax(0,1fr)_auto] gap-3 px-5 py-4">
                <div className="min-w-0">
                  <p className="truncate text-sm font-medium text-card-foreground">{enquiry.subject}</p>
                  <p className="truncate text-xs text-muted-foreground">
                    {enquiry.name} · {enquiry.company}
                  </p>
                </div>
                <span className="self-center rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                  {enquiry.status}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <div className="rounded-lg border border-border bg-card shadow-card">
          <div className="border-b border-border px-5 py-4">
            <h2 className="font-display text-base font-bold text-card-foreground">Recently updated products</h2>
          </div>
          <ul className="divide-y divide-border">
            {products.slice(0, 5).map((product) => (
              <li key={product.id} className="px-5 py-4">
                <p className="truncate text-sm font-medium text-card-foreground">{product.name}</p>
                <p className="truncate text-xs text-muted-foreground">{product.category}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
