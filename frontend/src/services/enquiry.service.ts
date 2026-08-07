import { apiFetch } from "./api";
import { Enquiry, EnquiryPayload } from "@/types/api";

export const enquiryService = {
  getEnquiries: async (): Promise<Enquiry[]> => {
    const res = await apiFetch<{ ok: boolean; data: Enquiry[] }>("/enquiries");
    return res.data || [];
  },

  submitEnquiry: async (payload: EnquiryPayload): Promise<{ ok: boolean; message: string }> => {
    const res = await apiFetch<{ ok: boolean; message: string }>("/enquiries", {
      method: "POST",
      body: JSON.stringify(payload),
    });
    return res;
  },

  updateStatus: async (id: string, status: Enquiry["status"]): Promise<Enquiry> => {
    const res = await apiFetch<{ ok: boolean; data: Enquiry }>(`/enquiries/${id}/status`, {
      method: "PATCH",
      body: JSON.stringify({ status }),
    });
    return res.data;
  },
};
