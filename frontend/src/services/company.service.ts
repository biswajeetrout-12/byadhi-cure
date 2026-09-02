import { apiFetch } from "./api";
import { CompanyInfo } from "@/types/company";

export const companyService = {
  getCompanyInfo: async (): Promise<CompanyInfo> => {
    const response = await apiFetch<{ ok: boolean; data: CompanyInfo }>("/company");
    return response.data;
  },

  updateCompanyInfo: async (updates: Partial<CompanyInfo>): Promise<CompanyInfo> => {
    const response = await apiFetch<{ ok: boolean; data: CompanyInfo }>("/company", {
      method: "PUT",
      body: JSON.stringify(updates),
    });
    return response.data;
  },
};
