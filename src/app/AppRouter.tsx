import { Navigate, Route, Routes } from "react-router-dom";
import RoleGuard from "../guards/RoleGuard";
import GuestGuard from "../guards/GuestGuard";
import LoginPage from "../pages/auth/LoginPage";
import RoomsPage from "../pages/user/RoomsPage";
import AdminLayout from "../layouts/AdminLayout/AdminLayout";
import AdminRoomsPage from "../pages/admin/AdminRoomsPage";
import UserLayout from "../layouts/UserLayout/UserLayout";
import MyBookingsPage from "../pages/user/MyBookingsPage";
import AdminBookingsPage from "../pages/admin/AdminBookingsPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route element={<GuestGuard />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<RoleGuard role="USER" />}>
        <Route element={<UserLayout />}>
          <Route path="/rooms" element={<RoomsPage />} />
          <Route path="/my-bookings" element={<MyBookingsPage />} />
        </Route>
      </Route>

      <Route element={<RoleGuard role="ADMIN" />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Navigate to="bookings" replace />} />
          <Route path="bookings" element={<AdminBookingsPage />} />
          <Route path="rooms" element={<AdminRoomsPage />} />
        </Route>
      </Route>

      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}
