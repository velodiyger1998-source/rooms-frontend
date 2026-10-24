export type Role = "ADMIN" | "USER";

export interface User {
  id: number;
  role: Role;
}
