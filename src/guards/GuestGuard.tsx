import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../features/auth/useAuth";
import { getHomePath } from "../utils/getHomePath";


export default function GuestGuard() {
  const { user } = useAuth();

  if (user) {
    return <Navigate to={getHomePath(user.role)} replace />;
  }

  return <Outlet />;
}