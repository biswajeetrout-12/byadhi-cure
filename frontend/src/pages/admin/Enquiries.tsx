import React, { useState } from "react";
import { Button } from "@/components/common/Button";
import EmptyState from "@/components/common/EmptyState";
import Loader from "@/components/common/Loader";
import Modal from "@/components/common/Modal";
import { useDeleteEnquiry, useEnquiries, useUpdateEnquiryStatus } from "@/hooks/useEnquiries";
import type { Enquiry } from "@/types/api";

export function Enquiries() {
  const { data: enquiries, isLoading, isError } = useEnquiries();
  const updateStatus = useUpdateEnquiryStatus();
  const deleteEnquiry = useDeleteEnquiry();
  const [selectedEnquiry, setSelectedEnquiry] = useState<Enquiry | null>(null);
  const [enquiryToDelete, setEnquiryToDelete] = useState<Enquiry | null>(null);
  const [statusFilter, setStatusFilter] = useState<"All" | Enquiry["status"]>("All");
  const filteredEnquiries = enquiries?.filter((enquiry) => statusFilter === "All" || enquiry.status === statusFilter) || [];

  const confirmDelete = async () => {
    if (!enquiryToDelete) return;
    try {
      await deleteEnquiry.mutateAsync(enquiryToDelete.id);
      setEnquiryToDelete(null);
    } catch {
      // Keep the confirmation open so the admin can retry after a transient failure.
    }
  };

  return (
    <div className="overflow-hidden rounded-lg border border-border bg-card shadow-card">
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border p-5">
        <div>
          <h2 className="font-display text-lg font-bold text-card-foreground">Enquiries</h2>
          <p className="mt-1 text-sm text-muted-foreground">Review and manage incoming enquiries.</p>
        </div>
        <label className="text-sm font-medium text-card-foreground">
          Filter by status
          <select value={statusFilter} onChange={(event) => setStatusFilter(event.target.value as typeof statusFilter)} className="ml-2 rounded-md border border-input bg-background px-3 py-2 text-sm">
            <option value="All">All statuses</option>
            <option value="New">New</option>
            <option value="In progress">In progress</option>
            <option value="Closed">Closed</option>
          </select>
        </label>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full min-w-[48rem] text-left text-sm">
          <thead className="border-b border-border bg-secondary/60 text-xs uppercase tracking-[0.1em] text-muted-foreground">
            <tr>
              <th className="px-5 py-3 font-semibold">Name</th>
              <th className="px-5 py-3 font-semibold">Company</th>
              <th className="px-5 py-3 font-semibold">Subject</th>
              <th className="px-5 py-3 font-semibold">Date</th>
              <th className="px-5 py-3 font-semibold">Status</th>
              <th className="px-5 py-3 text-right font-semibold">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-border">
            {isLoading ? <tr><td colSpan={6} className="px-5 py-8"><Loader size="md" /></td></tr> : null}
            {isError ? <tr><td colSpan={6} className="px-5 py-8"><EmptyState title="Unable to load enquiries" description="The backend enquiry list could not be loaded." /></td></tr> : null}
            {!isLoading && !isError && !filteredEnquiries.length ? <tr><td colSpan={6} className="px-5 py-8"><EmptyState title={statusFilter === "All" ? "No enquiries yet" : "No matching enquiries"} description="Registered users' enquiries will appear here." /></td></tr> : null}
            {!isLoading && !isError ? filteredEnquiries.map((enquiry) => (
              <tr key={enquiry.id}>
                <td className="px-5 py-4 font-medium text-card-foreground">{enquiry.name}</td>
                <td className="px-5 py-4 text-muted-foreground">{enquiry.company || "Individual"}</td>
                <td className="px-5 py-4 text-muted-foreground">{enquiry.subject}</td>
                <td className="px-5 py-4 text-muted-foreground">{enquiry.date}</td>
                <td className="px-5 py-4">
                  <select value={enquiry.status} onChange={(event) => updateStatus.mutate({ id: enquiry.id, status: event.target.value as Enquiry["status"] })} className="rounded-full bg-secondary px-2.5 py-1 text-xs font-medium text-secondary-foreground">
                    <option>New</option>
                    <option>In progress</option>
                    <option>Closed</option>
                  </select>
                </td>
                <td className="px-5 py-4 text-right">
                  <div className="flex justify-end gap-2">
                    <Button type="button" variant="outline" size="sm" onClick={() => setSelectedEnquiry(enquiry)}>Open</Button>
                    <Button type="button" variant="outline" size="sm" className="text-destructive" onClick={() => setEnquiryToDelete(enquiry)}>Delete</Button>
                  </div>
                </td>
              </tr>
            )) : null}
          </tbody>
        </table>
      </div>

      <Modal isOpen={!!selectedEnquiry} onClose={() => setSelectedEnquiry(null)} title="Enquiry details" className="max-w-xl">
        {selectedEnquiry ? (
          <div className="space-y-4 text-sm">
            <div><p className="text-xs uppercase tracking-wide text-muted-foreground">Name</p><p className="mt-1 text-foreground">{selectedEnquiry.name}</p></div>
            <div><p className="text-xs uppercase tracking-wide text-muted-foreground">Email</p><p className="mt-1 break-all text-foreground">{selectedEnquiry.email || "Not provided"}</p></div>
            <div><p className="text-xs uppercase tracking-wide text-muted-foreground">Phone</p><p className="mt-1 text-foreground">{selectedEnquiry.phone || "Not provided"}</p></div>
            <div><p className="text-xs uppercase tracking-wide text-muted-foreground">Company</p><p className="mt-1 text-foreground">{selectedEnquiry.company || "Individual"}</p></div>
            <div><p className="text-xs uppercase tracking-wide text-muted-foreground">Subject</p><p className="mt-1 text-foreground">{selectedEnquiry.subject}</p></div>
            <div><p className="text-xs uppercase tracking-wide text-muted-foreground">Message</p><p className="mt-1 whitespace-pre-wrap leading-relaxed text-foreground">{selectedEnquiry.message || "No message provided"}</p></div>
          </div>
        ) : null}
      </Modal>

      <Modal isOpen={!!enquiryToDelete} onClose={() => setEnquiryToDelete(null)} title="Delete enquiry" className="max-w-md">
        <p className="text-sm leading-relaxed text-muted-foreground">
          Are you sure you want to permanently delete this enquiry? This action cannot be undone.
        </p>
        <div className="mt-6 flex justify-end gap-3">
          <Button type="button" variant="outline" onClick={() => setEnquiryToDelete(null)}>Cancel</Button>
          <Button type="button" className="bg-destructive text-destructive-foreground hover:bg-destructive/85" onClick={confirmDelete} disabled={deleteEnquiry.isPending}>
            {deleteEnquiry.isPending ? "Deleting..." : "Delete enquiry"}
          </Button>
        </div>
      </Modal>
    </div>
  );
}

export default Enquiries;
