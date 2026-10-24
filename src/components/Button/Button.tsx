import type { ButtonHTMLAttributes } from "react";
import styles from "./Button.module.css";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "secondary" | "danger";
  loading?: boolean;
}

export default function Button({
  variant = "primary",
  loading = false,
  children,
  disabled,
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      disabled={disabled || loading}
      {...rest}
    >
      {loading ? "Подождите..." : children}
    </button>
  );
};