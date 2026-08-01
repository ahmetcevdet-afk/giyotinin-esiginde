import "./AuthLayout.css";

import logoLight from "../../assets/images/logo-light.png";
import logoDark from "../../assets/images/logo-dark.png";

function AuthLayout({ children, theme }) {
    const currentLogo = theme === "dark" ? logoDark : logoLight;

    return (
        <section className="auth-layout">

            <div className="auth-wrapper">

                <div className="auth-left">

                    <img
                        src={currentLogo}
                        alt="Giyotinin Eşiğinde"
                        className="auth-logo"
                    />

                    <h1>Giyotinin Eşiğinde</h1>

                    <p className="auth-description">
                        Akademik araştırmaların, eleştirel düşüncenin ve nitelikli
                        yayıncılığın buluştuğu bağımsız dijital platform.
                    </p>
                    <div className="auth-quote">

    “Bilgi paylaşıldıkça büyür.”

    <span>
        Giyotinin Eşiğinde
    </span>

</div>

                    <div className="auth-stats">

                        <div className="stat">
                            <h2>120+</h2>
                            <span>Makale</span>
                        </div>

                        <div className="stat">
                            <h2>35+</h2>
                            <span>Yazar</span>
                        </div>

                        <div className="stat">
                            <h2>8</h2>
                            <span>Kategori</span>
                        </div>

                    </div>

                </div>

                <div className="auth-right">
                    {children}
                </div>

            </div>

        </section>
    );
}

export default AuthLayout;