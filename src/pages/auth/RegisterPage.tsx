import RegisterForm from "../../features/auth/RegisterForm";

export default function RegisterPage() {
  return (
    <main
      style={{
        display: "flex",
        justifyContent: "center",
        padding: "10vh 16px",
      }}
    >
      <RegisterForm />
    </main>
  );
}
