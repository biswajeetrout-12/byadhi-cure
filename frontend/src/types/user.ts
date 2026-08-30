export type UserRole = "Admin" | "User";
export type UserStatus = "Active" | "Pending" | "Suspended";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  status: UserStatus;
}
