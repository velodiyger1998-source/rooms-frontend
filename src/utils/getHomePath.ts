import type { Role } from "../types/user";

export function getHomePath(role: Role): string {
  return role === "ADMIN" ? "/admin" : "/rooms";
}