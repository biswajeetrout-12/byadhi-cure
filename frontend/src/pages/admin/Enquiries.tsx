import React from "react";
import { adminEnquiries } from "@/data/site";

export function Enquiries() {
  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
      <div className="overflow-x-auto">
        <table className="w-full min-w-[48rem] text-left text-sm">
          <thead className="border-b border-border bg-secondary/60 text-xs uppercase tracking-[0.1em] text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-semibold">Ref</th>
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Company</th>
              <th className="px-5 py-3 font-semibold">Subject</th>
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3 font-semibold">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {adminEnquiries.map((enquiry) => (
              <tr key={enquiry.id}>
                <td className="px-5 py-4 font-medium text-card-foreground">{enquiry.id}</td>
                <td className="px-5 py-4 text-muted-foreground">{enquiry.name}</td>
                <td className="px-5 py-4 text-muted-foreground">{enquiry.company}</td>
                <td className="px-5 py-4 text-muted-foreground">{enquiry.subject}</td>
                <td className="px-5 py-4 text-muted-foreground">{enquiry.date}</td>
                <td className="px-5 py-4">
                  <span className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                    {enquiry.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Enquiries;
