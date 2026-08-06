import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { enquiryService } from "@/services/enquiry.service";
import { EnquiryPayload, Enquiry } from "@/types/api";

export function useEnquiries() {
  return useQuery({
    queryKey: ["enquiries"],
    queryFn: () => enquiryService.getEnquiries(),
  });
}

export function useSubmitEnquiry() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (payload: EnquiryPayload) => enquiryService.submitEnquiry(payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },
  });
}

export function useUpdateEnquiryStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: Enquiry["status"] }) =>
      enquiryService.updateStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquiries"] });
    },
  });
}
