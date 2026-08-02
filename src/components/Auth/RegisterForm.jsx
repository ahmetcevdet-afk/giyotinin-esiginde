import { useState } from "react";
import { Link } from "react-router-dom";

import "./RegisterForm.css";

import Input from "./Input";
import PasswordInput from "./PasswordInput";
import Button from "../Button/Button";

import { supabase } from "../../lib/supabase";

function RegisterForm() {

    const [fullName, setFullName] = useState("");
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [acceptTerms, setAcceptTerms] = useState(false);

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [success, setSuccess] = useState(false);

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        if (!fullName.trim()) {
            setError("Lütfen ad soyadınızı giriniz.");
            return;
        }

        if (!username.trim()) {
            setError("Lütfen kullanıcı adınızı giriniz.");
            return;
        }

        if (username.length < 3) {
            setError("Kullanıcı adı en az 3 karakter olmalıdır.");
            return;
        }

        if (!/^[a-zA-Z0-9._]+$/.test(username)) {
            setError("Kullanıcı adı sadece harf, rakam, nokta ve alt çizgi içerebilir.");
            return;
        }

        if (!email.trim()) {
            setError("Lütfen e-posta adresinizi giriniz.");
            return;
        }

        if (!password.trim()) {
            setError("Lütfen şifrenizi giriniz.");
            return;
        }

        if (password.length < 8) {
            setError("Şifre en az 8 karakter olmalıdır.");
            return;
        }

        if (password !== confirmPassword) {
            setError("Şifreler eşleşmiyor.");
            return;
        }

        if (!acceptTerms) {
            setError("Lütfen Kullanım Koşulları'nı ve Gizlilik Politikası'nı kabul edin.");
            return;
        }

        try {

            setLoading(true);

            // Kullanıcı adı benzersiz mi?
            const { data: existingUser } = await supabase
                .from("profiles")
                .select("id")
                .eq("username", username.toLowerCase())
                .maybeSingle();

            if (existingUser) {
                setError("Bu kullanıcı adı zaten kullanılıyor.");
                setLoading(false);
                return;
            }

            const { error } = await supabase.auth.signUp({

                email,

                password,

                options: {

                    emailRedirectTo: `${window.location.origin}/email-confirmed`,

                    data: {

                        full_name: fullName,
                        username: username.toLowerCase(),

                    },

                },

            });

            if (error) {

                if (error.message.toLowerCase().includes("already")) {

                    setError("Bu e-posta adresi zaten kayıtlı.");

                } else {

                    setError(error.message);

                }

                return;

            }

            setSuccess(true);

        } catch (err) {

            console.error(err);

            setError("Beklenmeyen bir hata oluştu.");

        } finally {

            setLoading(false);

        }

    }

    if (success) {

        return (

            <div className="register-success">

                <h2>
                    Hesabınız Oluşturuldu 🎉
                </h2>

                <p>

                    Doğrulama bağlantısını e-posta adresinize gönderdik.

                    <br /><br />

                    Lütfen e-postanızı kontrol ederek hesabınızı etkinleştirin.

                </p>

                <Link to="/login">

                    <Button>
                        Giriş Sayfasına Dön
                    </Button>

                </Link>

            </div>

        );

    }

    return (

        <div className="register-form-container">

            <div className="register-header">

                <h2>
                    Hesap Oluştur
                </h2>

                <p>
                    Giyotinin Eşiğinde topluluğuna katılın,
                    araştırmalarınızı paylaşın ve yeni akademik çalışmalar keşfedin.
                </p>

            </div>

            <form
                className="register-form"
                onSubmit={handleSubmit}
            >

                <Input
                    label="Ad Soyad"
                    type="text"
                    placeholder="Ahmet Cevdet"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                />

                <Input
                    label="Kullanıcı Adı"
                    type="text"
                    placeholder="ahmetcevdet"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />

                <Input
                    label="E-posta"
                    type="email"
                    placeholder="ornek@mail.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />

                <PasswordInput
                    label="Şifre"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />

                <PasswordInput
                    label="Şifre Tekrar"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />

                <label className="terms-checkbox">

                    <input
                        type="checkbox"
                        checked={acceptTerms}
                        onChange={(e) => setAcceptTerms(e.target.checked)}
                    />

                    <span>

                        <Link
                            to="/terms"
                            target="_blank"
                        >
                            Kullanım Koşulları
                        </Link>

                        {" "}ve{" "}

                        <Link
                            to="/privacy"
                            target="_blank"
                        >
                            Gizlilik Politikası
                        </Link>

                        'nı okudum ve kabul ediyorum.

                    </span>

                </label>

                {error && (

                    <div className="register-error">

                        {error}

                    </div>

                )}

                <Button
                    type="submit"
                    disabled={loading}
                >

                    {loading
                        ? "Hesap Oluşturuluyor..."
                        : "Hesap Oluştur"}

                </Button>

            </form>

            <div className="register-footer">

                Zaten bir hesabın var mı?

                <Link to="/login">

                    Giriş Yap

                </Link>

            </div>

        </div>

    );

}

export default RegisterForm;