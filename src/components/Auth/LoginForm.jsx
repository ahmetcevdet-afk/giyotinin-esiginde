import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import "./LoginForm.css";

import Input from "./Input";
import PasswordInput from "./PasswordInput";
import Button from "../Button/Button";

import { supabase } from "../../lib/supabase";

function LoginForm() {

    const navigate = useNavigate();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [remember, setRemember] = useState(false);

    const [loading, setLoading] = useState(false);

    const [error, setError] = useState("");


    const handleSubmit = async (e) => {

        e.preventDefault();

        setError("");


        if (!email.trim()) {

            setError(
                "Lütfen e-posta adresinizi giriniz."
            );

            return;

        }


        if (!password.trim()) {

            setError(
                "Lütfen şifrenizi giriniz."
            );

            return;

        }


        try {

            setLoading(true);


            const {
                error,
            } = await supabase.auth.signInWithPassword({

                email: email.trim(),

                password,

            });


            if (error) {

                setError(
                    error.message
                );

                return;

            }


            /*
             * Beni Hatırla seçiminin
             * sonraki oturum işlemlerinde
             * kullanılabilmesi için localStorage'a
             * kaydediyoruz.
             */

            if (remember) {

                localStorage.setItem(
                    "rememberLogin",
                    "true"
                );

            } else {

                localStorage.removeItem(
                    "rememberLogin"
                );

            }


            navigate("/");


        } catch (err) {

            console.error(err);

            setError(
                "Beklenmeyen bir hata oluştu."
            );

        } finally {

            setLoading(false);

        }

    };


    return (

        <div className="login-form-container">


            {/* ==========================================
                HEADER
            ========================================== */}

            <div className="login-header">

                <h2>

                    Hoş Geldiniz

                </h2>


                <p>

                    Giyotinin Eşiğinde hesabınıza giriş
                    yaparak araştırmalarınızı okumaya
                    ve paylaşmaya devam edin.

                </p>

            </div>


            {/* ==========================================
                FORM
            ========================================== */}

            <form
                className="login-form"
                onSubmit={handleSubmit}
            >


                <Input

                    label="E-posta"

                    type="email"

                    name="email"

                    placeholder="ornek@mail.com"

                    value={email}

                    onChange={(e) =>
                        setEmail(e.target.value)
                    }

                    autoComplete="email"

                    required

                />


                <PasswordInput

                    label="Şifre"

                    name="password"

                    value={password}

                    onChange={(e) =>
                        setPassword(e.target.value)
                    }

                    autoComplete="current-password"

                    required

                />


                {/* ==========================================
                    LOGIN OPTIONS
                ========================================== */}

                <div className="login-options">


                    <label
                        className="remember-me"
                    >

                        <input
                            type="checkbox"
                            checked={remember}
                            onChange={(e) =>
                                setRemember(
                                    e.target.checked
                                )
                            }
                        />

                        <span>

                            Beni Hatırla

                        </span>

                    </label>


                    <Link
                        to="/forgot-password"
                    >

                        Şifremi Unuttum

                    </Link>


                </div>


                {/* ==========================================
                    ERROR
                ========================================== */}

                {error && (

                    <div className="login-error">

                        {error}

                    </div>

                )}


                {/* ==========================================
                    SUBMIT
                ========================================== */}

                <Button
                    type="submit"
                    disabled={loading}
                >

                    {

                        loading

                            ? "Giriş Yapılıyor..."

                            : "Giriş Yap"

                    }

                </Button>


            </form>


            {/* ==========================================
                REGISTER
            ========================================== */}

            <div className="login-footer">

                <span>

                    Hesabın yok mu?

                </span>


                <Link to="/register">

                    Kayıt Ol

                </Link>

            </div>


        </div>

    );

}


export default LoginForm;