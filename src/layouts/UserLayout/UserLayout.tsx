import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";
import Button from "../../components/Button";
import styles from "./UserLayout.module.css";

export default function UserLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login", { replace: true });
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    isActive ? styles.active : styles.link;

  return (
    <div>
      <header className={styles.header}>
        <div className={styles.left}>
          <b>Бронирование комнат</b>
          <nav className={styles.nav}>
            <NavLink to="/rooms" className={linkClass}>
              Комнаты
            </NavLink>
            <NavLink to="/my-bookings" className={linkClass}>
              Мои брони
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