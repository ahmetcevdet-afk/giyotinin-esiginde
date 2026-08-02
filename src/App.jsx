import { useEffect, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import "./styles/variables.css";

import { AuthProvider } from "./contexts/AuthContext";

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgotPassword from "./pages/ForgotPassword";
import Dashboard from "./pages/Dashboard";
import NotFound from "./pages/NotFound";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import EmailConfirmed from "./pages/EmailConfirmed";

function App() {
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "light";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  const pageProps = {
    theme,
    setTheme,
  };

  return (
    <AuthProvider>
      <BrowserRouter>

        <Routes>

          <Route
            path="/"
            element={<Home {...pageProps} />}
          />

          <Route
            path="/login"
            element={<Login {...pageProps} />}
          />

          <Route
            path="/register"
            element={<Register {...pageProps} />}
          />

          <Route
            path="/forgot-password"
            element={<ForgotPassword {...pageProps} />}
          />

          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <Dashboard {...pageProps} />
              </ProtectedRoute>
            }
          />
          <Route
          path="/email-confirmed"
          element={<EmailConfirmed/>}
          />
          <Route
            path="*"
            element={<NotFound {...pageProps} />}
          />
          <Route
    path="/privacy"
    element={<PrivacyPolicy />}
/>

<Route
    path="/terms"
    element={<Terms />}
/>

        </Routes>

      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;