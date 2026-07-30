import "./Navbar.css";
import Button from "../Button/Button";

function Navbar() {
    return (
        <header className="navbar">

            <div className="container navbar-container">

                <a href="/" className="logo">
                    Giyotinin Eşiğinde
                </a>

                <nav className="nav-links">

                    <a href="/">Ana Sayfa</a>

                    <a href="/articles">Araştırmalar</a>

                    <a href="/categories">Kategoriler</a>

                    <a href="/authors">Yazarlar</a>

                    <a href="/about">Hakkımızda</a>

                </nav>

                <div className="nav-actions">

                    <Button
                        variant="secondary"
                        size="sm"
                    >
                        Giriş Yap
                    </Button>

                    <Button
                        size="sm"
                    >
                        Kayıt Ol
                    </Button>

                </div>

            </div>

        </header>
    );
}

export default Navbar;