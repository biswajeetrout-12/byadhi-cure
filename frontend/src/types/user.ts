export type UserRole = "Superadmin" | "Admin" | "Editor" | "Customer";
export type UserStatus = "Active" | "Pending" | "Suspended";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
