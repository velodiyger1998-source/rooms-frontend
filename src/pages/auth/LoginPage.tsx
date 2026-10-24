import LoginForm from "../../features/auth/LoginForm";

export default function LoginPage() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "10vh 16px",
      }}
    >
      <LoginForm />
    </main>
  );
}
