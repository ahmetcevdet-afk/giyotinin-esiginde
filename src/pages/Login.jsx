import AuthLayout from "../components/Auth/AuthLayout";
import LoginForm from "../components/Auth/LoginForm";

function Login({ theme, setTheme }) {
  return (
    <AuthLayout
      theme={theme}
      setTheme={setTheme}
    >
      <LoginForm />
    </AuthLayout>
  );
}

export default Login;