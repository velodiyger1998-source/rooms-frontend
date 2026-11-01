import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";
import Button from "../../components/Button";
import styles from "./AdminLayout.module.css";

export default function AdminLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.left}>
          <b>Админ-панель</b>
          <nav className={styles.nav}>
            <NavLink
              to="/admin/bookings"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              Заявки
            </NavLink>
            <NavLink
              to="/admin/rooms"
              className={({ isActive }) =>
                isActive ? styles.active : styles.link
              }
            >
              Комнаты
            </NavLink>
          </nav>
        </div>
        <Button variant="secondary" onClick={handleLogout}>
          Выйти
        </Button>
      </header>
      <main className={styles.main}>
        <Outlet />
      </main>
    </div>
  );
}
