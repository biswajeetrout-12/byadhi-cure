import { delay } from "./api";
import { adminEnquiries } from "@/data/site";
import { Enquiry, EnquiryPayload } from "@/types/api";

let mockEnquiries = [...adminEnquiries] as Enquiry[];

export const enquiryService = {
  getEnquiries: async (): Promise<Enquiry[]> => {
    return delay(mockEnquiries);
  },

  submitEnquiry: async (payload: EnquiryPayload): Promise<{ ok: boolean; message: string }> => {
    const newEnquiry: Enquiry = {
      id: `ENQ-${1000 + mockEnquiries.length + 1}`,
      name: payload.name,
      company: payload.company || "Individual",
      subject: payload.subject,
      date: new Date().toISOString().split("T")[0]!,
      status: "New",
    };
    mockEnquiries = [newEnquiry, ...mockEnquiries];
    return delay({ ok: true, message: "Enquiry submitted successfully." });
  },

  updateStatus: async (id: string, status: Enquiry["status"]): Promise<Enquiry> => {
    mockEnquiries = mockEnquiries.map((e) => (e.id === id ? { ...e, status } : e));
    const updated = mockEnquiries.find((e) => e.id === id)!;
    return delay(updated);
  },
};
