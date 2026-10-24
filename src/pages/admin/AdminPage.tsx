import { useNavigate } from "react-router-dom";
import { useAuth } from "../../features/auth/useAuth";
import Button from "../../components/Button";

export default function AdminPage() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <main style={{ padding: 24 }}>
      <h1>Страница админа</h1>
      <p>Роль: {user?.role}</p>
      <Button
        variant="secondary"
        onClick={() => {
          logout();
          navigate("/login");
        }}
      >
        Выйти
      </Button>
    </main>
  );
}