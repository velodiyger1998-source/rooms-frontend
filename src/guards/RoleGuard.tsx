import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";
import { getHomePath } from "../utils/getHomePath";
import type { Role } from "../types/user";

export default function RoleGuard({ role }: { role: Role}) {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== role) {
    return <Navigate to={getHomePath(user.role)} replace />;
  }

  return <Outlet />;
}