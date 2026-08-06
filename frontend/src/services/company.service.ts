import { delay } from "./api";
import { company } from "@/data/company";
import { CompanyInfo } from "@/types/company";

let mockCompany = { ...company };

export const companyService = {
  getCompanyInfo: async (): Promise<CompanyInfo> => {
    return delay(mockCompany);
  },

  updateCompanyInfo: async (updates: Partial<CompanyInfo>): Promise<CompanyInfo> => {
    mockCompany = { ...mockCompany, ...updates };
    return delay(mockCompany);
  },
};
