import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { companyService } from "@/services/company.service";
import { CompanyInfo } from "@/types/company";

export function useCompany() {
  return useQuery({
    queryKey: ["company"],
    queryFn: () => companyService.getCompanyInfo(),
  });
}

export function useUpdateCompany() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (updates: Partial<CompanyInfo>) => companyService.updateCompanyInfo(updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["company"] });
    },
  });
}
