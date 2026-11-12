import { useState, type SyntheticEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { useAuth } from "./useAuth";
import { registerRequest } from "../../api/authApi";
import { getErrorMessage } from "../../utils/getErrorMessage";
import { getHomePath } from "../../utils/getHomePath";
import Input from "../../components/Input";
import Button from "../../components/Button";
import type { RegisterPayload } from "../../types/auth";
import styles from "./LoginForm.module.css";

export default function RegisterForm() {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [localError, setLocalError] = useState("");

  const { mutate, isPending, error } = useMutation({
    mutationFn: async (data: RegisterPayload) => {
      await registerRequest(data);
      return login(data);
    },
    onSuccess: (user) => navigate(getHomePath(user.role), { replace: true }),
  });

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    setLocalError("");

    if (password !== confirm) {
      setLocalError("Пароли не совпадают");
      return;
    }

    mutate({ email, password });
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h1>Регистрация</h1>
      <Input
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
      />
      <Input
        label="Пароль (минимум 8 символов)"
        type="password"
        minLength={8}
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <Input
        label="Повторите пароль"
        type="password"
        value={confirm}
        onChange={(e) => setConfirm(e.target.value)}
        required
      />
      {(localError || error) && (
        <p className={styles.error}>{localError || getErrorMessage(error)}</p>
      )}
      <Button type="submit" loading={isPending}>
        Зарегистрироваться
      </Button>
      <p className={styles.hint}>
        Уже есть аккаунт? <Link to="/login">Войти</Link>
      </p>
    </form>
  );
}