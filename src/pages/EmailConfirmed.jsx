import { Link } from "react-router-dom";

import Button from "../components/Button/Button";

import "./EmailConfirmed.css";

function EmailConfirmed() {

    return (

        <section className="email-confirmed">

            <div className="email-confirmed-card">

                <div className="success-icon">
                    ✓
                </div>

                <h1>
                    E-posta Doğrulandı
                </h1>

                <p>

                    Hesabınız başarıyla doğrulandı.

                    <br /><br />

                    Artık giriş yapabilir ve
                    profilinizi oluşturmaya
                    başlayabilirsiniz.

                </p>

                <Link to="/login">

                    <Button>

                        Giriş Yap

                    </Button>

                </Link>

            </div>

        </section>

    );

}

export default EmailConfirmed;