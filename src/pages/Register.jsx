import AuthLayout from "../components/Auth/AuthLayout";
import RegisterForm from "../components/Auth/RegisterForm";

function Register({ theme, setTheme }) {
    return (
        <AuthLayout
            theme={theme}
            setTheme={setTheme}
        >
            <RegisterForm />
        </AuthLayout>
    );
}

export default Register;