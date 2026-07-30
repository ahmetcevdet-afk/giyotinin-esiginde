import { useState } from "react";
import { supabase } from "../lib/supabase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function register() {
    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else {
      alert("Kayıt başarılı! E-postanı doğrula.");
    }
  }

  return (
    <div>
      <h1>Üye Ol</h1>

      <input
        type="email"
        placeholder="E-posta"
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Şifre"
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={register}>
        Üye Ol
      </button>
    </div>
  );
}