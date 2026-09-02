export interface ApiResponse<T = any> {
  ok: boolean;
  message?: string;
  data?: T;
}

export interface EnquiryPayload {
  name: string;
  email: string;
  phone?: string;
  company?: string;
  subject: string;
  message: string;
  productId?: string;
}

export interface Enquiry {
  id: string;
  name: string;
  email?: string;
  phone?: string;
  company?: string;
  subject: string;
  message?: string;
  productId?: string;
  date: string;
  status: "New" | "In progress" | "Closed";
}
