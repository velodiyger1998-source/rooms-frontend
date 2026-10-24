import { Navigate, Route, Routes } from "react-router-dom";
import LoginPage from "../pages/auth/LoginPage";
import RoomsPage from "../pages/user/RoomsPage";
import AdminPage from "../pages/admin/AdminPage";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/rooms" element={<RoomsPage />} />
      <Route path="/admin" element={<AdminPage />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}