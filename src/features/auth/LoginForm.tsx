import { useState, type SyntheticEvent } from "react";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { getHomePath } from "../../utils/getHomePath";
import Input from "../../components/Input";
import Button from "../../components/Button";
import styles from "./LoginForm.module.css";

export default function LoginForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const { mutate, isPending, error } = useMutation({
    mutationFn: login,
    onSuccess: (user) => navigate(getHomePath(user.role), { replace: true }),
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    mutate({ email, password });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Вход</h1>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Пароль"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      {error && <p className={styles.error}>{getErrorMessage(error)}</p>}
      <Button type="submit" loading={isPending}>
        Войти
      </Button>
    </form>
  );
}
